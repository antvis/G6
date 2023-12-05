import { IPoint, IBBox, Item, BubblesetCfg } from '../../types';
import {
  squareDist,
  pointLineSquareDist,
  itemIntersectByLine,
  getPointsCenter,
  fractionToLine,
  isPointsOverlap,
  pointRectSquareDist,
  Line,
  isPointInPolygon,
} from '../../util/math';

const defaultOps = {
  maxRoutingIterations: 100, // number of times to run the algorithm to refine the path finding in difficult areas
  maxMarchingIterations: 100, // number of times to refine the boundary
  pixelGroupSize: 2, // the resolution of the algorithm in square pixels
  edgeR0: 10, // the distance from edges at which energy is 1 (full influence)
  edgeR1: 10, // the distance from edges at which energy is 0 (no influence)
  nodeR0: 5, // the distance from nodes which energy is 1 (full influence)
  nodeR1: 10, // the distance from nodes at which energy is 0 (no influence)
  morphBuffer: 5, // DEFAULT_NODE_R0; the amount of space to move the virtual edge when wrapping around obstacles
  threshold: 0.001,
  skip: 16,
  nodeInfluenceFactor: 1,
  edgeInfluenceFactor: 1,
  negativeNodeInfluenceFactor: -0.5,
};

/**
 * Marching square algorithm for traching the contour of a pixel group
 * https://www.emanueleferonato.com/2013/03/01/using-marching-squares-algorithm-to-trace-the-contour-of-an-image/
 * @param potentialArea
 * @param threshold
 */
function MarchingSquares(contour, potentialArea, threshold) {
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
 * @param points
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

/**
 * Find the optimal already visited member to item;
   Optimal: minimize cost(j) = distance(i,j) ∗ countObstacles(i,j)
 * @param item
 * @param visited
 */
const pickBestNeighbor = (item: Item, visited: Item[], nonMembers: Item[]): Item | null => {
  let closestNeighbour = null;
  let minCost = Number.POSITIVE_INFINITY;

  visited.forEach((neighbourItem) => {
    const itemP = { x: item.getModel().x, y: item.getModel().y };
    const neighbourItemP = { x: neighbourItem.getModel().x, y: neighbourItem.getModel().y };
    const dist = squareDist(itemP, neighbourItemP);
    const directLine = new Line(itemP.x, itemP.y, neighbourItemP.x, neighbourItemP.y);
    const numberObstacles = nonMembers.reduce((count, _item) => {
      if (fractionToLine(_item, directLine) > 0) {
        return count + 1;
      }
      return count;
    }, 0);
    if (dist * (numberObstacles + 1) ** 2 < minCost) {
      closestNeighbour = neighbourItem;
      minCost = dist * (numberObstacles + 1) ** 2;
    }
  });
  return closestNeighbour;
};

/**
 * 返回和线相交的item中，离边的起点最近的item
 * @param items
 * @param line
 */
const getIntersectItem = (items: Item[], line: Line): Item | null => {
  let minDistance = Number.POSITIVE_INFINITY;
  let closestItem = null;

  items.forEach((item) => {
    const distance = fractionToLine(item, line);
    // find closest intersection
    if (distance >= 0 && distance < minDistance) {
      closestItem = item;
      minDistance = distance;
    }
  });
  return closestItem;
};

/**
 * Modify the directLine and Route virtual edges around obstacles
 */
const computeRoute = (
  directLine: Line,
  nonMembers: Item[],
  maxRoutingIterations: number,
  morphBuffer: number,
): Line[] => {
  const checkedLines: Line[] = [];
  const linesToCheck: Line[] = [];
  linesToCheck.push(directLine);

  let hasIntersection = true;
  let iterations = 0;

  const pointExists = (point: IPoint, lines: Line[]) => {
    let flag = false;
    lines.forEach((line) => {
      if (flag) return;
      if (
        isPointsOverlap(point, { x: line.x1, y: line.y1 }) ||
        isPointsOverlap(point, { x: line.x2, y: line.y2 })
      ) {
        flag = true;
      }
    });
    return flag;
  };
  const isPointInNonMembers = (point: IPoint, _nonMembers: Item[]) => {
    for (const item of _nonMembers) {
      const bbox = item.getBBox();
      const itemContour = [
        [bbox.x, bbox.y],
        [bbox.x + bbox.width, bbox.y],
        [bbox.x, bbox.y + bbox.height],
        [bbox.x + bbox.width, bbox.y + bbox.height],
      ];
      if (isPointInPolygon(itemContour, point.x, point.y)) {
        return true;
      }
    }
    return false;
  };

  // outer loop end when no more intersections or out of iterations
  while (hasIntersection && iterations < maxRoutingIterations) {
    hasIntersection = false;
    // inner loop end when out of lines or found an intersection
    while (!hasIntersection && linesToCheck.length) {
      const line = linesToCheck.pop();
      const closestItem = getIntersectItem(nonMembers, line);
      if (closestItem) {
        const [intersections, countIntersections] = itemIntersectByLine(closestItem, line);
        // if line passes through item
        if (countIntersections === 2) {
          const testReroute = (isFirst: boolean) => {
            let tempMorphBuffer = morphBuffer;
            let virtualNode = rerouteLine(closestItem, tempMorphBuffer, intersections, isFirst);
            // test the virtualNode already exists
            let exist =
              pointExists(virtualNode, linesToCheck) || pointExists(virtualNode, checkedLines);
            let pointInside = isPointInNonMembers(virtualNode, nonMembers);

            while (!exist && pointInside && tempMorphBuffer >= 1) {
              // try a smaller buffer
              tempMorphBuffer /= 1.5;
              virtualNode = rerouteLine(closestItem, tempMorphBuffer, intersections, isFirst);
              exist =
                pointExists(virtualNode, linesToCheck) || pointExists(virtualNode, checkedLines);
              pointInside = isPointInNonMembers(virtualNode, nonMembers);
            }

            // 第二次route时不要求pointInside
            if (virtualNode && !exist && (!isFirst || !pointInside)) {
              // add 2 rerouted lines to check
              linesToCheck.push(new Line(line.x1, line.y1, virtualNode.x, virtualNode.y));
              linesToCheck.push(new Line(virtualNode.x, virtualNode.y, line.x2, line.y2));
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
 */
function getRoute(
  item: Item,
  nonMembers: Item[],
  visited: Item[],
  maxRoutingIterations: number,
  morphBuffer: number,
) {
  const optimalNeighbor = pickBestNeighbor(item, visited, nonMembers);
  if (optimalNeighbor === null) {
    return [];
  }

  //  merge the consecutive lines
  const mergeLines = (checkedLines: Line[]): Line[] => {
    const finalRoute: Line[] = [];
    while (checkedLines.length > 0) {
      const line1 = checkedLines.pop()!;
      if (checkedLines.length === 0) {
        finalRoute.push(line1);
        break;
      }
      const line2 = checkedLines.pop()!;
      const mergeLine = new Line(line1.x1, line1.y1, line2.x2, line2.y2);
      const closestItem = getIntersectItem(nonMembers, mergeLine);
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
  const directLine = new Line(
    item.getModel().x,
    item.getModel().y,
    optimalNeighbor.getModel().x,
    optimalNeighbor.getModel().y,
  );
  const checkedLines = computeRoute(directLine, nonMembers, maxRoutingIterations, morphBuffer);
  const finalRoute = mergeLines(checkedLines);
  return finalRoute;
}

/**
 * Calculate the counter that includes the  selected items and exclues the non-selected items
 * @param graph
 * @param members
 * @param nonMembers
 * @param options
 */
export const genBubbleSet = (members: Item[], nonMembers: Item[], ops?: BubblesetCfg) => {
  // eslint-disable-next-line no-redeclare
  const options = Object.assign(defaultOps, ops);
  const centroid = getPointsCenter(
    members.map((item) => ({ x: item.getModel().x, y: item.getModel().y })),
  );
  // 按照到中心距离远近排序
  members = members.sort(
    (a, b) =>
      squareDist({ x: a.getModel().x, y: a.getModel().y }, centroid) -
      squareDist({ x: b.getModel().x, y: b.getModel().y }, centroid),
  );
  const visited: Item[] = [];
  const virtualEdges: Line[] = [];
  members.forEach((item) => {
    const lines = getRoute(
      item,
      nonMembers,
      visited,
      options.maxRoutingIterations,
      options.morphBuffer,
    );
    lines.forEach((l) => {
      virtualEdges.push(l);
    });
    visited.push(item);
  });
  // 由于edge也可以作为member和nonMember传入，暂时不考虑把edges作为参数传入genBubbleSet
  // edges && edges.forEach(e => {
  //   virtualEdges.push(new Line(e.getSource().getModel().x, e.getSource().getModel().y, e.getTarget().getModel().x, e.getTarget().getModel().y));
  // });

  const activeRegion = getActiveRregion(members, virtualEdges, options.nodeR0);
  const potentialArea = initGridCells(
    activeRegion.width,
    activeRegion.height,
    options.pixelGroupSize,
  );

  // Use march squares to generate contour
  let contour = [];
  let hull = [];
  for (let iterations = 0; iterations < options.maxMarchingIterations; iterations++) {
    fillPotentialArea(members, nonMembers, virtualEdges, activeRegion, potentialArea, options);
    contour = [];
    hull = [];
    if (!new MarchingSquares(contour, potentialArea, options.threshold).march()) continue;
    const marchedPath = contour.map((point) => ({
      x: Math.round(point.x * options.pixelGroupSize + activeRegion.minX),
      y: Math.round(point.y * options.pixelGroupSize + activeRegion.minY),
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
        hull.push({ x: marchedPath[i].x, y: marchedPath[i].y });
      }
    }

    const isContourValid = () => {
      for (const item of members) {
        const hullPoints = hull.map((point) => [point.x, point.y]);
        if (!isPointInPolygon(hullPoints, item.getBBox().centerX, item.getBBox().centerY))
          return false;
      }
      // 不强制要求所有nonMembers都没有包含在内
      // for (const item of nonMembers) {
      //   if (isPointInPolygon({ x: item.getBBox().centerX, y: item.getBBox().centerY }, contour)) return false
      // }
      return true;
    };

    if (hull && isContourValid()) {
      return hull;
    }

    // update parameters for next iteration
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
  return hull;
};

/**
 * unionboundingbox
 * @param members
 * @param edges
 */
function getActiveRregion(members: Item[], edges: Line[], offset: number): IBBox {
  const activeRegion = {
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY,
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  };
  const bboxes = [];

  members.forEach((item) => {
    bboxes.push(item.getBBox());
  });
  edges.forEach((l) => {
    bboxes.push(l.getBBox());
  });

  for (const bbox of bboxes) {
    activeRegion.minX = (bbox.minX < activeRegion.minX ? bbox.minX : activeRegion.minX) - offset;
    activeRegion.minY = (bbox.minY < activeRegion.minY ? bbox.minY : activeRegion.minY) - offset;
    activeRegion.maxX = (bbox.maxX > activeRegion.maxX ? bbox.maxX : activeRegion.maxX) + offset;
    activeRegion.maxY = (bbox.maxY > activeRegion.maxY ? bbox.maxY : activeRegion.maxY) + offset;
  }
  activeRegion.width = activeRegion.maxX - activeRegion.minX;
  activeRegion.height = activeRegion.maxY - activeRegion.minY;
  activeRegion.x = activeRegion.minX;
  activeRegion.y = activeRegion.minY;
  return activeRegion;
}

function fillPotentialArea(
  members: Item[],
  nonMembers: Item[],
  edges: Line[],
  activeRegion: IBBox,
  potentialArea,
  options: BubblesetCfg,
) {
  function pos2GridIx(x, offset) {
    const gridIx = Math.floor((x - offset) / options.pixelGroupSize);
    return gridIx < 0 ? 0 : gridIx;
  }

  function gridIx2Pos(x, offset) {
    return x * options.pixelGroupSize + offset;
  }

  // using inverse a for numerical stability
  const nodeInfA = (options.nodeR0 - options.nodeR1) * (options.nodeR0 - options.nodeR1);
  const edgeInfA = (options.edgeR0 - options.edgeR1) * (options.edgeR0 - options.edgeR1);

  const getAffectedRegion = (bbox, thresholdR) => {
    const startX = Math.min(
      pos2GridIx(bbox.minX, thresholdR + activeRegion.minX),
      potentialArea.width,
    );
    const startY = Math.min(
      pos2GridIx(bbox.minY, thresholdR + activeRegion.minY),
      potentialArea.height,
    );
    const endX = Math.min(
      pos2GridIx(bbox.maxX, -thresholdR + activeRegion.minX),
      potentialArea.width,
    );
    const endY = Math.min(
      pos2GridIx(bbox.maxY, -thresholdR + activeRegion.minY),
      potentialArea.height,
    );
    return [startX, startY, endX, endY];
  };
  const addItemInfluence = (item: Item, influenceFactor: number) => {
    const bbox = item.getBBox();
    const [startX, startY, endX, endY] = getAffectedRegion(bbox, options.nodeR1);
    // calculate item influence for each cell
    for (let y = startY; y < endY; y += 1) {
      for (let x = startX; x < endX; x += 1) {
        if (influenceFactor < 0 && potentialArea[x + y * potentialArea.width] <= 0) {
          continue;
        }
        const tempX = gridIx2Pos(x, activeRegion.minX);
        const tempY = gridIx2Pos(y, activeRegion.minY);
        const distanceSq = pointRectSquareDist(
          { x: tempX, y: tempY },
          { x: bbox.minX, y: bbox.minY, width: bbox.width, height: bbox.height },
        );
        if (distanceSq < options.nodeR1 ** 2) {
          const dr = Math.sqrt(distanceSq) - options.nodeR1;
          potentialArea.cells[x + y * potentialArea.width] += influenceFactor * dr * dr;
        }
      }
    }
  };

  const addEdgeInfluence = (line: Line, influenceFactor: number) => {
    const bbox = line.getBBox();
    const [startX, startY, endX, endY] = getAffectedRegion(bbox, options.edgeR1);
    // for every point in active part of potentialArea, calculate distance to nearest point on line and add influence
    for (let y = startY; y < endY; y += 1) {
      for (let x = startX; x < endX; x += 1) {
        if (influenceFactor < 0 && potentialArea.cells[x + y * potentialArea.width] <= 0) {
          continue;
        }
        const tempX = gridIx2Pos(x, activeRegion.minX);
        const tempY = gridIx2Pos(y, activeRegion.minY);
        const minDistanceSq = pointLineSquareDist({ x: tempX, y: tempY }, line);
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
      addItemInfluence(item, options.nodeInfluenceFactor / nodeInfA);
    });
  }

  if (options.edgeInfluenceFactor) {
    edges.forEach((edge) => {
      addEdgeInfluence(edge, options.edgeInfluenceFactor / edgeInfA);
    });
  }
  if (options.negativeNodeInfluenceFactor) {
    nonMembers.forEach((item) => {
      addItemInfluence(item, options.negativeNodeInfluenceFactor / nodeInfA);
    });
  }
}

function rerouteLine(item, buffer: number, intersections: IPoint[], wrapNormal: boolean): IPoint {
  const bbox = item.getBBox();
  const [topIntersect, leftIntersect, bottomIntersect, rightIntersect] = intersections;
  const cornerPos = {
    topLeft: { x: bbox.minX - buffer, y: bbox.minY - buffer },
    topRight: { x: bbox.maxX + buffer, y: bbox.minY - buffer },
    bottomLeft: { x: bbox.minX - buffer, y: bbox.maxY + buffer },
    bottomRight: { x: bbox.maxX + buffer, y: bbox.maxY + buffer },
  };

  const totalArea = bbox.height * bbox.width;
  function calcHalfArea(intersect1, intersect2) {
    return bbox.width * ((intersect1.y - bbox.minY + (intersect2.y - bbox.minY)) * 0.5);
  }

  // 根据线和boundingbox相交的情况，确定control point的位置
  if (leftIntersect) {
    // 相交区域有三角形
    if (topIntersect) return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
    if (bottomIntersect) return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
    // 相交区域分成上下两个梯形，比较面积
    const topArea = calcHalfArea(leftIntersect, rightIntersect);
    if (topArea < totalArea * 0.5) {
      if (leftIntersect.y > rightIntersect.y)
        return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
      return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
    }
    if (leftIntersect.y < rightIntersect.y)
      return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
    return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
  }

  if (rightIntersect) {
    if (topIntersect) return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
    if (bottomIntersect) return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
  }

  // 相交区域分成左右两个梯形
  const leftArea = calcHalfArea(topIntersect, bottomIntersect);
  if (leftArea < totalArea * 0.5) {
    if (topIntersect.x > bottomIntersect.x)
      return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
    return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
  }
  if (topIntersect.x < bottomIntersect.x)
    return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
  return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
}
