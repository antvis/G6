/**
 * Inspired by Christopher Collins' bubble sets
 * https://github.com/JosuaKrause/bubblesets-js
 */
import type { AABB } from '@antv/g';
import type { ID } from '@antv/graphlib';
import type { Graph } from '../../runtime/graph';
import type { ComboData, NodeData } from '../../spec';
import type { Point, Position } from '../../types';
import { getBBoxHeight, getBBoxWidth } from '../../utils/bbox';
import { idOf } from '../../utils/id';
import { getLinesIntersection, isPointInPolygon } from '../../utils/point';
import { positionOf } from '../../utils/position';
import { add, distance, divide } from '../../utils/vector';
import { getClosedSpline } from './util';

export interface BubblesetsOptions {
  morphBuffer?: number; // DEFAULT_NODE_R0; the amount of space to move the virtual edge when wrapping around obstacles
  pixelGroupSize?: number; // the resolution of the algorithm in square pixels, 4 by default
  maxMarchingIterations?: number; // number of times to refine the boundary, 100 by default
  maxRoutingIterations?: number; // number of times to run the algorithm to refine the path finding in difficult areas
  nodeR0?: number; // the distance from nodes which energy is 1 (full influence)
  nodeR1?: number; // the distance from nodes at which energy is 0 (no influence)
  edgeR0?: number; // the distance from edges at which energy is 1 (full influence)
  edgeR1?: number; // the distance from edges at which energy is 0 (no influence)
  nodeInfluenceFactor?: number; // node influence factor
  negativeNodeInfluenceFactor?: number; // negativeNode influence factor
  edgeInfluenceFactor?: number; // edge influence factor
  memberInfluenceFactor?: number; // member influence factor
  nonMemberInfluenceFactor?: number; // nonMember influence factor
}

const defaultOps = {
  /** number of times to run the algorithm to refine the path finding in difficult areas */
  maxRoutingIterations: 100,
  /** number of times to refine the boundary */
  maxMarchingIterations: 100,
  /** the resolution of the algorithm in square pixels */
  pixelGroupSize: 2,
  /** the distance from edges at which energy is 1 (full influence) */
  edgeR0: 10,
  /** the distance from edges at which energy is 0 (no influence) */
  edgeR1: 10,
  /** the distance from nodes which energy is 1 (full influence) */
  nodeR0: 5,
  /** the distance from nodes at which energy is 0 (no influence) */
  nodeR1: 10,
  /** DEFAULT_NODE_R0; the amount of space to move the virtual edge when wrapping around obstacles */
  morphBuffer: 5,
  threshold: 0.001,
  skip: 16,
  nodeInfluenceFactor: 1,
  edgeInfluenceFactor: 1,
  negativeNodeInfluenceFactor: -0.5,
};

/**
 * Marching square algorithm for tracking the contour of a pixel group
 * https://www.emanueleferonato.com/2013/03/01/using-marching-squares-algorithm-to-trace-the-contour-of-an-image/
 * @param contour
 * @param potentialArea
 * @param threshold
 */
function MarchingSquares(contour: Point[], potentialArea, threshold: number) {
  let marched = false;
  const getVal = (x: number, y: number) => {
    return potentialArea.cells[x + y * potentialArea.width];
  };

  const getState = (x: number, y: number) => {
    let squareVal = 0;
    if (getVal(x - 1, y - 1) >= threshold) {
      squareVal += 1;
    }
    if (getVal(x, y - 1) > threshold) {
      squareVal += 2;
    }
    if (getVal(x - 1, y) > threshold) {
      squareVal += 4;
    }
    if (getVal(x, y) > threshold) {
      squareVal += 8;
    }
    return squareVal;
  };

  const doMarch = (xPos: number, yPos: number) => {
    let x = xPos;
    let y = yPos;
    let prevX;
    let prevY;

    for (let i = 0; i < potentialArea.width * potentialArea.height; i++) {
      prevX = x;
      prevY = y;
      if (contour.findIndex((item) => item.x === x && item.y === y) > -1) {
        if (contour[0].x !== x || contour[0].y !== y) {
          // encountered a loop but haven't returned to start: change direction using conditionals and continue back to start
        } else {
          return true;
        }
      } else {
        contour.push({ x, y });
      }

      const state = getState(x, y);
      // assign the move direction according to state of the square
      switch (state) {
        case -1:
          console.warn('Marched out of bounds');
          return true;
        case 0:
        case 3:
        case 2:
        case 7:
          x++; // go right
          break;
        case 12:
        case 14:
        case 4:
          x--; // go left
          break;
        case 6: // go left if come from up else go right
          if (prevX === 0) {
            if (prevY === -1) {
              x -= 1;
            } else {
              x += 1;
            }
          }
          break;
        case 1:
        case 13:
        case 5:
          y--; // go up
          break;
        case 9: // go up if come from right else go down
          if (prevX === 1) {
            if (prevY === 0) {
              y -= 1;
            } else {
              y += 1;
            }
          }
          break;
        case 10:
        case 8:
        case 11:
          y++; // go down
          break;
        default:
          console.warn(`Marching squares invalid state: ${state}`);
          return true;
      }
    }
  };

  this.march = () => {
    for (let x = 0; x < potentialArea.width && !marched; x += 1) {
      for (let y = 0; y < potentialArea.height && !marched; y += 1) {
        if (getVal(x, y) > threshold && getState(x, y) !== 15) {
          marched = doMarch(x, y);
        }
      }
    }
    return marched;
  };
}

/**
 * Space partition & assign value to each cell
 * @param width
 * @param height
 * @param pixelGroupSize
 */
const initGridCells = (width: number, height: number, pixelGroupSize: number) => {
  const scaleWidth = Math.ceil(width / pixelGroupSize);
  const scaleHeight = Math.ceil(height / pixelGroupSize);
  const gridCells = new Float32Array(Math.max(0, scaleWidth * scaleHeight)).fill(0);
  return {
    cells: gridCells,
    width: scaleWidth,
    height: scaleHeight,
  };
};

const getBBoxBoundLine = (bbox: AABB, direction: 'top' | 'left' | 'bottom' | 'right') => {
  const bounds = {
    top: [bbox.min[0], bbox.min[1], bbox.max[0], bbox.min[1]],
    left: [bbox.min[0], bbox.min[1], bbox.min[0], bbox.max[1]],
    bottom: [bbox.min[0], bbox.max[1], bbox.max[0], bbox.max[1]],
    right: [bbox.max[0], bbox.min[1], bbox.max[0], bbox.max[1]],
  };
  return bounds[direction];
};

/**
 * When calculating the intersection of two line segments, the division ratio of the intersection point to the first line segment.
 * @param la
 * @param lb
 */
const fractionAlongLineA = (la: LineStructure, lb: LineStructure) => {
  const uaT = (lb.x2 - lb.x1) * (la.y1 - lb.y1) - (lb.y2 - lb.y1) * (la.x1 - lb.x1);
  const ubT = (la.x2 - la.x1) * (la.y1 - lb.y1) - (la.y2 - la.y1) * (la.x1 - lb.x1);
  const uB = (lb.y2 - lb.y1) * (la.x2 - la.x1) - (lb.x2 - lb.x1) * (la.y2 - la.y1);
  if (uB) {
    const ua = uaT / uB;
    const ub = ubT / uB;
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return ua;
    }
  }
  return Number.POSITIVE_INFINITY;
};

export const fractionToLine = (graph: Graph, itemId: ID, line: LineStructure) => {
  const directions = ['top', 'left', 'bottom', 'right'];
  const bbox = graph.getElementRenderBounds(itemId);
  if (!bbox) return Infinity;
  let minDistance = Number.POSITIVE_INFINITY;
  let countIntersections = 0;
  for (let i = 0; i < 4; i++) {
    const [x1, y1, x2, y2] = getBBoxBoundLine(bbox, directions[i] as 'top' | 'left' | 'bottom' | 'right');
    let testDistance = fractionAlongLineA(line, new LineStructure(x1, y1, x2, y2));
    testDistance = Math.abs(testDistance - 0.5);
    if (testDistance >= 0 && testDistance <= 1) {
      countIntersections += 1;
      minDistance = testDistance < minDistance ? testDistance : minDistance;
    }
  }

  if (countIntersections === 0) return -1;
  return minDistance;
};

/**
 * Find the optimal already visited member to item;
   Optimal: minimize cost(j) = distance(i,j) ∗ countObstacles(i,j)
 * @param graph
 * @param model
 * @param visited
 * @param nonMembers
 */
const pickBestNeighbor = (
  graph: Graph,
  model: NodeData | ComboData,
  visited: (NodeData | ComboData)[],
  nonMembers: (NodeData | ComboData)[],
): (NodeData | ComboData) | null => {
  let closestNeighbor = null;
  let minCost = Number.POSITIVE_INFINITY;

  visited.forEach((neighborModel) => {
    const itemP = positionOf(model);
    const neighborItemP = positionOf(neighborModel);
    const dist = distance(itemP, neighborItemP);
    const directLine = new LineStructure(itemP[0], itemP[1], neighborItemP[0], neighborItemP[1]);
    const numberObstacles = nonMembers.reduce((count, _item) => {
      if (fractionToLine(graph, idOf(_item), directLine) > 0) {
        return count + 1;
      }
      return count;
    }, 0);
    if (dist * (numberObstacles + 1) ** 2 < minCost) {
      closestNeighbor = neighborModel;
      minCost = dist * (numberObstacles + 1) ** 2;
    }
  });
  return closestNeighbor;
};

/**
 * 返回和线相交的item中，离边的起点最近的item
 * @param graph
 * @param items
 * @param line
 */
const getIntersectItem = (
  graph: Graph,
  items: (NodeData | ComboData)[],
  line: LineStructure,
): (NodeData | ComboData) | null => {
  let minDistance = Number.POSITIVE_INFINITY;
  let closestItem = null;

  items.forEach((item) => {
    const distance = fractionToLine(graph, item.id, line);
    // find closest intersection
    if (distance >= 0 && distance < minDistance) {
      closestItem = item;
      minDistance = distance;
    }
  });
  return closestItem;
};

export const isPointsOverlap = (p1: Point, p2: Point, e = 1e-3) => {
  return distance(p1, p2) < e ** 2;
};

/**
 * Modify the directLine and Route virtual edges around obstacles
 * @param graph
 * @param directLine
 * @param nonMembers
 * @param maxRoutingIterations
 * @param morphBuffer
 */
const computeRoute = (
  graph: Graph,
  directLine: LineStructure,
  nonMembers: (NodeData | ComboData)[],
  maxRoutingIterations: number,
  morphBuffer: number,
): LineStructure[] => {
  const checkedLines: LineStructure[] = [];
  const linesToCheck: LineStructure[] = [];
  linesToCheck.push(directLine);

  let hasIntersection = true;
  let iterations = 0;

  const pointExists = (point: Point, lines: LineStructure[]) => {
    let flag = false;
    lines.forEach((line) => {
      if (flag) return;
      if (isPointsOverlap(point, [line.x1, line.y1]) || isPointsOverlap(point, [line.x2, line.y2])) {
        flag = true;
      }
    });
    return flag;
  };

  const isPointInNonMembers = (graph: Graph, point: Point, _nonMembers: (NodeData | ComboData)[]) => {
    for (const model of _nonMembers) {
      const bbox = graph.getElementRenderBounds(idOf(model));
      if (!bbox) continue;
      const [x, y] = bbox.min;
      const itemContour = [
        [x, y],
        [bbox.max[0], y],
        [x, bbox.max[1]],
        [bbox.max[0], bbox.max[1]],
      ] as Point[];
      if (isPointInPolygon(point, itemContour)) {
        return true;
      }
    }
    return false;
  };

  const itemIntersectByLine = (graph: Graph, itemId: ID, line: LineStructure): [Point[], number] | null => {
    const directions = ['top', 'left', 'bottom', 'right'];
    const bbox = graph.getElementRenderBounds(itemId);
    if (!bbox) return null;
    let countIntersections = 0;
    const intersections: Point[] = [];

    for (let i = 0; i < 4; i++) {
      const [x1, y1, x2, y2] = getBBoxBoundLine(bbox, directions[i] as 'top' | 'left' | 'bottom' | 'right');
      intersections[i] = getLinesIntersection(
        [
          [x1, y1],
          [x2, y2],
        ],
        [
          [line.x1, line.y1],
          [line.x2, line.y2],
        ],
      )!; //TODO
      if (intersections[i]) {
        countIntersections += 1;
      }
    }
    return [intersections, countIntersections];
  };

  // outer loop end when no more intersections or out of iterations
  while (hasIntersection && iterations < maxRoutingIterations) {
    hasIntersection = false;
    // inner loop end when out of lines or found an intersection
    while (!hasIntersection && linesToCheck.length) {
      const line = linesToCheck.pop()!;
      const closestItem = getIntersectItem(graph, nonMembers, line);
      if (closestItem) {
        const intersect = itemIntersectByLine(graph, idOf(closestItem), line);
        if (!intersect) continue;
        const [intersections, countIntersections] = intersect;
        // if line passes through item
        if (countIntersections === 2) {
          const testReroute = (isFirst: boolean) => {
            let tempMorphBuffer = morphBuffer;
            let virtualNode = rerouteLine(graph, closestItem, tempMorphBuffer, intersections, isFirst);
            // test the virtualNode already exists
            let exist = pointExists(virtualNode, linesToCheck) || pointExists(virtualNode, checkedLines);
            let pointInside = isPointInNonMembers(graph, virtualNode, nonMembers);

            while (!exist && pointInside && tempMorphBuffer >= 1) {
              // try a smaller buffer
              tempMorphBuffer /= 1.5;
              virtualNode = rerouteLine(graph, closestItem, tempMorphBuffer, intersections, isFirst);
              exist = pointExists(virtualNode, linesToCheck) || pointExists(virtualNode, checkedLines);
              pointInside = isPointInNonMembers(graph, virtualNode, nonMembers);
            }

            // 第二次route时不要求pointInside
            if (virtualNode && !exist && (!isFirst || !pointInside)) {
              // add 2 rerouted lines to check
              linesToCheck.push(new LineStructure(line.x1, line.y1, virtualNode.x, virtualNode.y));
              linesToCheck.push(new LineStructure(virtualNode.x, virtualNode.y, line.x2, line.y2));
              hasIntersection = true;
            }
          };

          testReroute(true);
          if (!hasIntersection) {
            // if we didn't find a valid point around the first corner, try the second
            testReroute(false);
          }
        }
      }

      // no intersection found, mark this line as completed
      if (!hasIntersection) {
        checkedLines.push(line);
      }
      iterations += 1;
    }
  }

  // 加入剩余的线
  while (linesToCheck.length) {
    checkedLines.push(linesToCheck.pop());
  }
  return checkedLines;
};

/**
 *  Connect item with visited members using direct line or virtual edges
 * @param graph
 * @param currentModel
 * @param nonMembers
 * @param visited
 * @param maxRoutingIterations
 * @param morphBuffer
 */
function getRoute(
  graph: Graph,
  currentModel: NodeData | ComboData,
  nonMembers: (NodeData | ComboData)[],
  visited: (NodeData | ComboData)[],
  maxRoutingIterations: number,
  morphBuffer: number,
) {
  const optimalNeighbor = pickBestNeighbor(graph, currentModel, visited, nonMembers);
  if (optimalNeighbor === null) return [];

  //  merge the consecutive lines
  const mergeLines = (checkedLines: LineStructure[]): LineStructure[] => {
    const finalRoute: LineStructure[] = [];
    while (checkedLines.length > 0) {
      const line1 = checkedLines.pop()!;
      if (checkedLines.length === 0) {
        finalRoute.push(line1);
        break;
      }
      const line2 = checkedLines.pop()!;
      const mergeLine = new LineStructure(line1.x1, line1.y1, line2.x2, line2.y2);
      const closestItem = getIntersectItem(graph, nonMembers, mergeLine);
      // merge most recent line and previous line
      if (!closestItem) {
        checkedLines.push(mergeLine);
      } else {
        finalRoute.push(line1);
        checkedLines.push(line2);
      }
    }
    return finalRoute;
  };

  const directLine = new LineStructure(
    positionOf(currentModel)[0],
    positionOf(currentModel)[1],
    positionOf(optimalNeighbor)[0],
    positionOf(optimalNeighbor)[1],
  );
  const checkedLines = computeRoute(graph, directLine, nonMembers, maxRoutingIterations, morphBuffer);
  const finalRoute = mergeLines(checkedLines);
  return finalRoute;
}

export class LineStructure {
  public x1: number;

  public y1: number;

  public x2: number;

  public y2: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  public getBBox() {
    const minX = Math.min(this.x1, this.x2);
    const minY = Math.min(this.y1, this.y2);
    const maxX = Math.max(this.x1, this.x2);
    const maxY = Math.max(this.y1, this.y2);
    const res = {
      min: [minX, minY],
      max: [maxX, maxY],
      center: [(minX + maxX) / 2, (minY + maxY) / 2],
      halfExtents: [(maxX - minX) / 2, (maxY - minY) / 2],
    };
    return res as AABB;
  }
}

/**
 * Calculate the counter that includes the  selected items and excludes the non-selected items
 * @param graph
 * @param members
 * @param nonMembers
 * @param ops
 */
export const genBubbleSetPath = (
  graph: Graph,
  members: (NodeData | ComboData)[],
  nonMembers: (NodeData | ComboData)[],
  ops?: BubblesetsOptions,
) => {
  const options = Object.assign(defaultOps, ops);
  const totalPosition = members.reduce((acc, datum) => add(acc, positionOf(datum)), [0, 0, 0] as Position);
  const centroid = divide(totalPosition, members.length);

  // 按照到中心距离远近排序
  members = members.sort((a, b) => distance(positionOf(a), centroid) - distance(positionOf(b), centroid));

  const visited: (NodeData | ComboData)[] = [];
  const virtualEdges: LineStructure[] = [];
  members.forEach((model) => {
    const lines = getRoute(graph, model, nonMembers, visited, options.maxRoutingIterations, options.morphBuffer);
    lines.forEach((l) => {
      virtualEdges.push(l);
    });
    visited.push(model);
  });
  // 由于edge也可以作为member和nonMember传入，暂时不考虑把edges作为参数传入genBubbleSet
  // edges && edges.forEach(e => {
  //   virtualEdges.push(new LineStructure(e.getSource().getModel().x, e.getSource().getModel().y, e.getTarget().getModel().x, e.getTarget().getModel().y));
  // });

  const activeRegion = getActiveRegion(graph, members, virtualEdges, options.nodeR0);
  const potentialArea = initGridCells(
    activeRegion.max[0] - activeRegion.min[0],
    activeRegion.max[1] - activeRegion.min[1],
    options.pixelGroupSize,
  );

  // Use march squares to generate contour
  let contour: Point[] = [];
  let hull: Point[] = [];

  for (let iterations = 0; iterations < options.maxMarchingIterations; iterations++) {
    fillPotentialArea(graph, members, nonMembers, virtualEdges, activeRegion, potentialArea, options);
    contour = [];
    hull = [];
    if (!new MarchingSquares(contour, potentialArea, options.threshold).march()) continue;
    const marchedPath = contour.map((point) => ({
      x: Math.round(point.x * options.pixelGroupSize + activeRegion.min[0]),
      y: Math.round(point.y * options.pixelGroupSize + activeRegion.min[1]),
    }));
    // const marchedPath = marchingSquares(potentialArea, options.threshold).map(point => ({ x: Math.round(point.x * options.pixelGroupSize + activeRegion.minX), y: Math.round(point.y * options.pixelGroupSize + activeRegion.minY) }))
    if (marchedPath) {
      let size = marchedPath.length;
      if (options.skip > 1) {
        size = Math.floor(marchedPath.length / options.skip);
        // if we reduced too much (fewer than three points in reduced surface) reduce skip and try again
        while (size < 3 && options.skip > 1) {
          options.skip -= 1;
          size = Math.floor(marchedPath.length / options.skip);
        }
      }
      // copy hull values
      for (let i = 0, j = 0; j < size; j += 1, i += options.skip) {
        hull.push([marchedPath[i].x, marchedPath[i].y]);
      }
    }

    const isContourValid = () => {
      for (const model of members) {
        const hullPoints = hull;
        const nodeBBox = graph.getElementRenderBounds(idOf(model));
        if (!nodeBBox) continue;
        if (!isPointInPolygon(nodeBBox.center, hullPoints)) return false;
      }
      // 不强制要求所有nonMembers都没有包含在内
      // for (const item of nonMembers) {
      //   if (isPointInPolygon({ x: item.getBBox().centerX, y: item.getBBox().centerY }, contour)) return false
      // }
      return true;
    };

    if (hull && isContourValid()) {
      return getClosedSpline(hull);
    }

    // update parameters for next interaction
    options.threshold *= 0.9;
    if (iterations <= options.maxMarchingIterations * 0.5) {
      options.memberInfluenceFactor *= 1.2;
      options.edgeInfluenceFactor *= 1.2;
    } else if (options.nonMemberInfluenceFactor !== 0 && nonMembers.length > 0) {
      // after half the iterations, start increasing positive energy and lowering the threshold
      options.nonMemberInfluenceFactor *= 0.8;
    } else {
      break;
    }
  }

  return getClosedSpline(hull);
};

/**
 * union bounding box
 * @param graph
 * @param members
 * @param edges
 * @param offset
 */
function getActiveRegion(
  graph: Graph,
  members: (NodeData | ComboData)[],
  edges: LineStructure[],
  offset: number,
): AABB {
  const activeRegion = {
    min: [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 0],
    max: [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, 0],
    halfExtents: [0, 0, 0],
  } as AABB;
  const bboxes: AABB[] = [];

  members.forEach((model) => {
    bboxes.push(graph.getElementRenderBounds(idOf(model)));
  });
  edges.forEach((l) => {
    bboxes.push(l.getBBox());
  });

  for (const bbox of bboxes) {
    activeRegion.min[0] = (bbox.min[0] < activeRegion.min[0] ? bbox.min[0] : activeRegion.min[0]) - offset;
    activeRegion.min[1] = (bbox.min[1] < activeRegion.min[1] ? bbox.min[1] : activeRegion.min[1]) - offset;
    activeRegion.max[0] = (bbox.max[0] > activeRegion.max[0] ? bbox.max[0] : activeRegion.max[0]) + offset;
    activeRegion.max[1] = (bbox.max[1] > activeRegion.max[1] ? bbox.max[1] : activeRegion.max[1]) + offset;
  }
  activeRegion.halfExtents = [
    (activeRegion.max[0] - activeRegion.min[0]) / 2,
    (activeRegion.max[1] - activeRegion.min[1]) / 2,
    0,
  ];
  return activeRegion;
}

/**
 * The square of the distance from the point to the rectangle: the distance from the point inside the rectangle is 0, if the projection of the point outside falls on the side of the rectangle, it is the nearest vertical distance from the point to the side of the rectangle, otherwise it is the distance from the point to the vertex of the rectangle.
 * @param point Point
 * @param rect Rect
 * @param rect.width
 * @param rect.height
 * @param rect.x
 * @param rect.y
 */
export const pointRectSquareDist = (point: Point, rect: { width: number; height: number; x: number; y: number }) => {
  const isLeft = point[0] < rect.x;
  const isRight = point[0] > rect.x + rect.width;
  const isTop = point[1] > rect.y + rect.height;
  const isBottom = point[1] < rect.y;

  const isPointOutside = isLeft || isRight || isTop || isBottom;
  if (!isPointOutside) {
    return 0;
  }
  if (isTop && !isLeft && !isRight) {
    return (rect.y + rect.height - point[1]) ** 2;
  }
  if (isBottom && !isLeft && !isRight) {
    return (point[1] - rect.y) ** 2;
  }
  if (isLeft && !isTop && !isBottom) {
    return (rect.x - point[0]) ** 2;
  }
  if (isRight && !isTop && !isBottom) {
    return (rect.x + rect.width - point[0]) ** 2;
  }
  const dx = Math.min(Math.abs(rect.x - point[0]), Math.abs(rect.x + rect.width - point[0]));
  const dy = Math.min(Math.abs(rect.y - point[1]), Math.abs(rect.y + rect.height - point[1]));
  return dx * dx + dy * dy;
};

export const pointLineSquareDist = (point: Point, line: LineStructure) => {
  const x1 = line.x1;
  const y1 = line.y1;
  const x2 = line.x2 - x1;
  const y2 = line.y2 - y1;
  let px = point[0] - x1;
  let py = point[1] - y1;
  let dotprod = px * x2 + py * y2;
  let projlenSq;
  if (dotprod <= 0) {
    projlenSq = 0;
  } else {
    px = x2 - px;
    py = y2 - py;
    dotprod = px * x2 + py * y2;
    if (dotprod <= 0) {
      projlenSq = 0;
    } else {
      projlenSq = (dotprod * dotprod) / (x2 * x2 + y2 * y2);
    }
  }
  let lenSq = px * px + py * py - projlenSq;
  if (lenSq < 0) {
    lenSq = 0;
  }
  return lenSq;
};

/**
 *
 * @param graph
 * @param members
 * @param nonMembers
 * @param edges
 * @param activeRegion
 * @param potentialArea
 * @param options
 */
function fillPotentialArea(
  graph: Graph,
  members: (NodeData | ComboData)[],
  nonMembers: (NodeData | ComboData)[],
  edges: LineStructure[],
  activeRegion: AABB,
  potentialArea,
  options: Required<BubblesetsOptions>,
) {
  /**
   *
   * @param x
   * @param offset
   */
  function pos2GridIx(x, offset) {
    const gridIx = Math.floor((x - offset) / options.pixelGroupSize);
    return gridIx < 0 ? 0 : gridIx;
  }

  /**
   *
   * @param x
   * @param offset
   */
  function gridIx2Pos(x, offset) {
    return x * options.pixelGroupSize + offset;
  }

  // using inverse a for numerical stability
  const nodeInfA = (options.nodeR0 - options.nodeR1) * (options.nodeR0 - options.nodeR1);
  const edgeInfA = (options.edgeR0 - options.edgeR1) * (options.edgeR0 - options.edgeR1);

  const getAffectedRegion = (bbox: AABB, thresholdR) => {
    const startX = Math.min(pos2GridIx(bbox.min[0], thresholdR + activeRegion.min[0]), potentialArea.width);
    const startY = Math.min(pos2GridIx(bbox.min[1], thresholdR + activeRegion.min[1]), potentialArea.height);
    const endX = Math.min(pos2GridIx(bbox.max[0], -thresholdR + activeRegion.min[0]), potentialArea.width);
    const endY = Math.min(pos2GridIx(bbox.max[1], -thresholdR + activeRegion.min[1]), potentialArea.height);
    return [startX, startY, endX, endY];
  };
  const addItemInfluence = (graph: Graph, model: NodeData | ComboData, influenceFactor: number) => {
    const bbox = graph.getElementRenderBounds(idOf(model));
    if (!bbox) return;
    const [startX, startY, endX, endY] = getAffectedRegion(bbox, options.nodeR1);
    // calculate item influence for each cell
    for (let y = startY; y < endY; y += 1) {
      for (let x = startX; x < endX; x += 1) {
        if (influenceFactor < 0 && potentialArea[x + y * potentialArea.width] <= 0) {
          continue;
        }
        const tempX = gridIx2Pos(x, activeRegion.min[0]);
        const tempY = gridIx2Pos(y, activeRegion.min[1]);
        const distanceSq = pointRectSquareDist([tempX, tempY], {
          x: bbox.min[0],
          y: bbox.min[1],
          width: bbox.max[0] - bbox.min[0],
          height: bbox.max[1] - bbox.min[1],
        });
        if (distanceSq < options.nodeR1 ** 2) {
          const dr = Math.sqrt(distanceSq) - options.nodeR1;
          potentialArea.cells[x + y * potentialArea.width] += influenceFactor * dr * dr;
        }
      }
    }
  };

  const addEdgeInfluence = (line: LineStructure, influenceFactor: number) => {
    const bbox = line.getBBox();
    const [startX, startY, endX, endY] = getAffectedRegion(bbox, options.edgeR1);
    // for every point in active part of potentialArea, calculate distance to nearest point on line and add influence
    for (let y = startY; y < endY; y += 1) {
      for (let x = startX; x < endX; x += 1) {
        if (influenceFactor < 0 && potentialArea.cells[x + y * potentialArea.width] <= 0) {
          continue;
        }
        const tempX = gridIx2Pos(x, activeRegion.min[0]);
        const tempY = gridIx2Pos(y, activeRegion.min[1]);
        const minDistanceSq = pointLineSquareDist([tempX, tempY], line);
        // only influence if less than r1
        if (minDistanceSq < options.edgeR1 ** 2) {
          const mdr = Math.sqrt(minDistanceSq) - options.edgeR1;
          potentialArea.cells[x + y * potentialArea.width] += influenceFactor * mdr * mdr;
        }
      }
    }
  };

  if (options.nodeInfluenceFactor) {
    members.forEach((item) => {
      addItemInfluence(graph, item, options.nodeInfluenceFactor / nodeInfA);
    });
  }

  if (options.edgeInfluenceFactor) {
    edges.forEach((edge) => {
      addEdgeInfluence(edge, options.edgeInfluenceFactor / edgeInfA);
    });
  }
  if (options.negativeNodeInfluenceFactor) {
    nonMembers.forEach((item) => {
      addItemInfluence(graph, item, options.negativeNodeInfluenceFactor / nodeInfA);
    });
  }
}

/**
 *
 * @param graph
 * @param item
 * @param buffer
 * @param intersections
 * @param wrapNormal
 */
function rerouteLine(
  graph: Graph,
  item: NodeData | ComboData,
  buffer: number,
  intersections: Point[],
  wrapNormal: boolean,
): Point {
  const bbox = graph.getElementRenderBounds(idOf(item));
  const [topIntersect, leftIntersect, bottomIntersect, rightIntersect] = intersections;
  const cornerPos: Record<string, Position> = {
    topLeft: [bbox.min[0] - buffer, bbox.min[1] - buffer],
    topRight: [bbox.max[0] + buffer, bbox.min[1] - buffer],
    bottomLeft: [bbox.min[0] - buffer, bbox.max[1] + buffer],
    bottomRight: [bbox.max[0] + buffer, bbox.max[1] + buffer],
  };

  const totalArea = getBBoxHeight(bbox) * getBBoxWidth(bbox);

  /**
   *
   * @param intersect1
   * @param intersect2
   */
  function calcHalfArea(intersect1: Point, intersect2: Point) {
    return getBBoxWidth(bbox) * ((intersect1[1] - bbox.min[1] + (intersect2[1] - bbox.min[1])) * 0.5);
  }

  // Find the position of the control point according to the intersect of line and bounding box
  if (leftIntersect) {
    // If there is a triangle in the intersect area
    if (topIntersect) return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
    if (bottomIntersect) return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
    // Divide the intersect area into two trapezoids upper and down, compare the area
    const topArea = calcHalfArea(leftIntersect, rightIntersect);
    if (topArea < totalArea * 0.5) {
      if (leftIntersect[1] > rightIntersect[1]) return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
      return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
    }
    if (leftIntersect[1] < rightIntersect[1]) return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
    return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
  }

  if (rightIntersect) {
    if (topIntersect) return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
    if (bottomIntersect) return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
  }

  // Divide the intersect area into two trapezoids left and right
  const leftArea = calcHalfArea(topIntersect, bottomIntersect);
  if (leftArea < totalArea * 0.5) {
    if (topIntersect[0] > bottomIntersect[0]) return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
    return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
  }
  if (topIntersect[0] < bottomIntersect[0]) return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
  return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
}
