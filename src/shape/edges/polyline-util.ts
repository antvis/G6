import { BBox } from '@antv/g-canvas/lib/types';
import { each } from '@antv/util'
import { IShapeBase } from '../../../types';

interface PolyPoint {
  x: number,
  y: number;
  id?: string
}

export const getBBoxFromPoint = (point: PolyPoint): BBox => {
  const {
    x,
    y
  } = point;
  return {
    x,
    y,
    minX: x,
    minY: y,
    maxX: x,
    maxY: y,
    height: 0,
    width: 0
  };
};
export const getBBoxFromPoints = (points: PolyPoint[] = []): BBox => {
  const xs = [];
  const ys = [];
  points.forEach(p => {
    xs.push(p.x);
    ys.push(p.y);
  });
  const minX = Math.min.apply(Math, xs);
  const maxX = Math.max.apply(Math, xs);
  const minY = Math.min.apply(Math, ys);
  const maxY = Math.max.apply(Math, ys);
  return {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
    maxX,
    maxY,
    minX,
    minY,
    height: (maxY - minY),
    width: (maxX - minX)
  };
};
export const isBBoxesOverlapping = (b1: BBox, b2: BBox) => {
  return Math.abs(b1.x - b2.x) * 2 < (b1.width + b2.width) && Math.abs(b1.y - b2.y) * 2 < (b1.height + b2.height);
};
export const filterConnectPoints = (points: PolyPoint[]): PolyPoint[] => {
  // pre-process: remove duplicated points
  const result = [];
  const pointsMap = {};
  points.forEach(p => {
    const id = `${p.x}-${p.y}`;
    p.id = id;
    pointsMap[ id ] = p;
  });
  each(pointsMap, p => {
    result.push(p);
  });
  return result;
};
export const simplifyPolyline = (points: PolyPoint[]): PolyPoint[] => {
  points = filterConnectPoints(points);
  return points;
};
export const getSimplePolyline = (sPoint: PolyPoint, tPoint: PolyPoint): PolyPoint[] => {
  return [
    sPoint,
    { x: sPoint.x, y: tPoint.y },
    tPoint
  ];
};
export const getExpandedBBox = (bbox, offset: number): BBox => {
  if (bbox.width === 0 && bbox.height === 0) { // when it is a point
    return bbox;
  }
  return {
    x: bbox.centerX,
    y: bbox.centerY,
    minX: bbox.minX - offset,
    minY: bbox.minY - offset,
    maxX: bbox.maxX + offset,
    maxY: bbox.maxY + offset,
    height: bbox.height + 2 * offset,
    width: bbox.width + 2 * offset
  };
};
export const isHorizontalPort = (port: PolyPoint, bbox: BBox): boolean => {
  const dx = Math.abs(port.x - bbox.x);
  const dy = Math.abs(port.y - bbox.y);
  return (dx / bbox.width) > (dy / bbox.height);
};
export const getExpandedBBoxPoint = (bbox, point: PolyPoint): PolyPoint => {
  const isHorizontal = isHorizontalPort(point, bbox);
  if (isHorizontal) {
    return {
      x: point.x > bbox.centerX ? bbox.maxX : bbox.minX,
      y: point.y
    };
  }
  return {
    x: point.x,
    y: point.y > bbox.centerY ? bbox.maxY : bbox.minY
  };
};
/**
 * 
 * @param b1 
 * @param b2 
 */
export const mergeBBox = (b1: BBox, b2: BBox): BBox => {
  const minX = Math.min(b1.minX, b2.minX);
  const minY = Math.min(b1.minY, b2.minY);
  const maxX = Math.max(b1.maxX, b2.maxX);
  const maxY = Math.max(b1.maxY, b2.maxY);
  return {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
    minX,
    minY,
    maxX,
    maxY,
    height: maxY - minY,
    width: maxX - minX
  };
};
export const getPointsFromBBox = (bbox: BBox): PolyPoint[] => {
  // anticlockwise
  const {
    minX,
    minY,
    maxX,
    maxY
  } = bbox;
  return [{
    x: minX,
    y: minY
  },
  {
    x: maxX,
    y: minY
  },
  {
    x: maxX,
    y: maxY
  },
  {
    x: minX,
    y: maxY
  }];
};
export const isPointOutsideBBox = (point: PolyPoint, bbox: BBox): boolean => {
  const {
    x,
    y
  } = point;
  return x < bbox.minX || x > bbox.maxX || y < bbox.minY || y > bbox.maxY;
};
export const getBBoxXCrossPoints = (bbox: BBox, x: number): PolyPoint[] => {
  if (x < bbox.minX || x > bbox.maxX) {
    return [];
  }
  return [{
    x,
    y: bbox.minY
  },
  {
    x,
    y: bbox.maxY
  }];
};
export const getBBoxYCrossPoints = (bbox: BBox, y: number): PolyPoint[] => {
  if (y < bbox.minY || y > bbox.maxY) {
    return [];
  }
  return [{
    x: bbox.minX,
    y
  },
  {
    x: bbox.maxX,
    y
  }];
};
export const getBBoxCrossPointsByPoint = (bbox: BBox, point: PolyPoint): PolyPoint[] => {
  return getBBoxXCrossPoints(bbox, point.x).concat(getBBoxYCrossPoints(bbox, point.y));
};
export const distance = (p1: PolyPoint, p2: PolyPoint): number => {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
};
export const _costByPoints = (p: PolyPoint, points: PolyPoint[]): number => {
  const offset = -2;
  let result = 0;
  points.forEach(point => {
    if (point) {
      if (p.x === point.x) { result += offset; }
      if (p.y === point.y) { result += offset; }
    }
  });
  return result;
};
export const heuristicCostEstimate = (p: PolyPoint, ps: PolyPoint, pt: PolyPoint, source?: PolyPoint, target?: PolyPoint): number => {
  return (distance(p, ps) + distance(p, pt)) + _costByPoints(p, [ ps, pt, source, target ]);
};
export const reconstructPath = (pathPoints: PolyPoint[], pointById, cameFrom, currentId, iterator: number = 0) => {
  pathPoints.unshift(pointById[ currentId ]);
  if (cameFrom[ currentId ] && cameFrom[ currentId ] !== currentId && iterator <= 100) {
    reconstructPath(pathPoints, pointById, cameFrom, cameFrom[ currentId ], iterator + 1);
  }
};
export const removeFrom = (arr: PolyPoint[], item: PolyPoint) => {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
};
export const isSegmentsIntersected = (p0: PolyPoint, p1: PolyPoint, p2: PolyPoint, p3: PolyPoint): boolean => {
  const s1_x = p1.x - p0.x;
  const s1_y = p1.y - p0.y;
  const s2_x = p3.x - p2.x;
  const s2_y = p3.y - p2.y;

  const s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
  const t = (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / (-s2_x * s1_y + s1_x * s2_y);

  return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
};
export const isSegmentCrossingBBox = (p1: PolyPoint, p2: PolyPoint, bbox: BBox): boolean => {
  if (bbox.width === 0 && bbox.height === 0) {
    return false;
  }
  const [ pa, pb, pc, pd ] = getPointsFromBBox(bbox);
  return isSegmentsIntersected(p1, p2, pa, pb) || isSegmentsIntersected(p1, p2, pa, pd) || isSegmentsIntersected(p1, p2, pb, pc) || isSegmentsIntersected(p1, p2, pc, pd);
};
export const getNeighborPoints = (points: PolyPoint[], point: PolyPoint, bbox1, bbox2): PolyPoint[] => {
  const neighbors = [];
  points.forEach(p => {
    if (p !== point) {
      if (p.x === point.x || p.y === point.y) {
        if (!isSegmentCrossingBBox(p, point, bbox1) && !isSegmentCrossingBBox(p, point, bbox2)) {
          neighbors.push(p);
        }
      }
    }
  });
  return filterConnectPoints(neighbors);
};
export const pathFinder = (points: PolyPoint[], start: PolyPoint, goal, sBBox, tBBox, os, ot): PolyPoint[] => { // A-Star Algorithm
  const closedSet = [];
  const openSet = [ start ];
  const cameFrom = {};
  const gScore = {}; // all default values are Infinity
  const fScore = {}; // all default values are Infinity
  gScore[ `${start.x}-${start.y}` ] = 0;
  fScore[ `${start.x}-${start.y}` ] = heuristicCostEstimate(start, goal, start);

  const pointById = {};
  points.forEach(p => {
    pointById[ `${p.x}-${p.y}` ] = p;
  });

  while (openSet.length) {
    let current;
    let lowestFScore = Infinity;
    openSet.forEach(p => {
      if (fScore[ p.id ] < lowestFScore) {
        lowestFScore = fScore[ p.id ];
        current = p;
      }
    });

    if (current === goal) { // ending condition
      const pathPoints = [];
      reconstructPath(pathPoints, pointById, cameFrom, goal.id);
      return pathPoints;
    }

    removeFrom(openSet, current);
    closedSet.push(current);

    getNeighborPoints(points, current, sBBox, tBBox).forEach(neighbor => {
      if (closedSet.indexOf(neighbor) !== -1) { return; }

      if (openSet.indexOf(neighbor) === -1) {
        openSet.push(neighbor);
      }

      const tentativeGScore = fScore[ current.id ] + distance(current, neighbor); // + distance(neighbor, goal);
      if (gScore[ `${neighbor.x}-${neighbor.y}` ] && (tentativeGScore >= gScore[ `${neighbor.x}-${neighbor.y}` ])) { return; }

      cameFrom[ `${neighbor.x}-${neighbor.y}` ] = current.id;
      gScore[ `${neighbor.x}-${neighbor.y}` ] = tentativeGScore;
      fScore[ `${neighbor.x}-${neighbor.y}` ] = gScore[ `${neighbor.x}-${neighbor.y}` ] + heuristicCostEstimate(neighbor, goal, start, os, ot);
    });
  }
  // throw new Error('Cannot find path');
  return [ start, goal ];
};
export const isBending = (p0: PolyPoint, p1: PolyPoint, p2: PolyPoint): boolean => {
  return !((p0.x === p1.x && p1.x === p2.x) || (p0.y === p1.y && p1.y === p2.y));
};
export const getBorderRadiusPoints = (p0: PolyPoint, p1: PolyPoint, p2: PolyPoint, r: number): PolyPoint[] => {
  const d0 = distance(p0, p1);
  const d1 = distance(p2, p1);
  if (d0 < r) {
    r = d0;
  }
  if (d1 < r) {
    r = d1;
  }
  const ps = {
    x: p1.x - r / d0 * (p1.x - p0.x),
    y: p1.y - r / d0 * (p1.y - p0.y)
  };
  const pt = {
    x: p1.x - r / d1 * (p1.x - p2.x),
    y: p1.y - r / d1 * (p1.y - p2.y)
  };
  return [ ps, pt ];
};
export const getPathWithBorderRadiusByPolyline = (points: PolyPoint[], borderRadius: number): string => {
  // TODO
  const pathSegments = [];
  const startPoint = points[0];
  pathSegments.push(`M${startPoint.x} ${startPoint.y}`);
  points.forEach((p, i) => {
    const p1 = points[ i + 1 ];
    const p2 = points[ i + 2 ];
    if (p1 && p2) {
      if (isBending(p, p1, p2)) {
        const [ ps, pt ] = getBorderRadiusPoints(p, p1, p2, borderRadius);
        pathSegments.push(`L${ps.x} ${ps.y}`);
        pathSegments.push(`Q${p1.x} ${p1.y} ${pt.x} ${pt.y}`);
        pathSegments.push(`L${pt.x} ${pt.y}`);
      } else {
        pathSegments.push(`L${p1.x} ${p1.y}`);
      }
    } else if (p1) {
      pathSegments.push(`L${p1.x} ${p1.y}`);
    }
  });
  return pathSegments.join('');
};
export const getPolylinePoints = (start: PolyPoint, end: PolyPoint, sNode: IShapeBase, tNode: IShapeBase, offset: number): PolyPoint[] => {
  const sBBox = sNode && sNode.getBBox() ? sNode.getBBox() : getBBoxFromPoint(start);
  const tBBox = tNode && tNode.getBBox() ? tNode.getBBox() : getBBoxFromPoint(end);
  if (isBBoxesOverlapping(sBBox, tBBox)) { // source and target nodes are overlapping
    return simplifyPolyline(getSimplePolyline(start, end));
  }
  const sxBBox = getExpandedBBox(sBBox, offset);
  const txBBox = getExpandedBBox(tBBox, offset);
  if (isBBoxesOverlapping(sxBBox, txBBox)) { // the expanded bounding boxes of source and target nodes are overlapping
    return simplifyPolyline(getSimplePolyline(start, end));
  }
  const sPoint = getExpandedBBoxPoint(sxBBox, start);
  const tPoint = getExpandedBBoxPoint(txBBox, end);
  const lineBBox = getBBoxFromPoints([ sPoint, tPoint ]);
  const outerBBox = mergeBBox(sxBBox, txBBox);
  const sMixBBox = mergeBBox(sxBBox, lineBBox);
  const tMixBBox = mergeBBox(txBBox, lineBBox);
  let connectPoints = [];
  connectPoints = connectPoints.concat(getPointsFromBBox(sMixBBox) // .filter(p => !isPointIntersectBBox(p, txBBox))
  );
  connectPoints = connectPoints.concat(getPointsFromBBox(tMixBBox) // .filter(p => !isPointIntersectBBox(p, sxBBox))
  );
  const centerPoint = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2
  }; [ lineBBox, sMixBBox, tMixBBox ].forEach((bbox: BBox) => {
    connectPoints = connectPoints.concat(getBBoxCrossPointsByPoint(bbox, centerPoint).filter(p => isPointOutsideBBox(p, sxBBox) && isPointOutsideBBox(p, txBBox)));
  }); [{
    x: sPoint.x,
    y: tPoint.y
  },
  {
    x: tPoint.x,
    y: sPoint.y
  }].forEach(p => {
    if (isPointOutsideBBox(p, sxBBox) && isPointOutsideBBox(p, txBBox) // &&
    // isPointInsideBBox(p, sMixBBox) && isPointInsideBBox(p, tMixBBox)
    ) {
      connectPoints.push(p);
    }
  });
  connectPoints.unshift(sPoint);
  connectPoints.push(tPoint);
  connectPoints = filterConnectPoints(connectPoints); // , sxBBox, txBBox, outerBBox
  const pathPoints = pathFinder(connectPoints, sPoint, tPoint, sBBox, tBBox, start, end);
  pathPoints.unshift(start);
  pathPoints.push(end);

  return simplifyPolyline(pathPoints);
};
