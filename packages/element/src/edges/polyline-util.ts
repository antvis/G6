import { each } from '@antv/util';
import { INode, ICombo } from '@antv/g6-core';
import { Point } from '@antv/g-base';

export interface PolyPoint {
  x: number;
  y: number;
  id?: string;
}

export type PBBox = Partial<{
  x: number;
  y: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  height: number;
  width: number;
  centerX: number;
  centerY: number;
}>;

export const getBBoxFromPoint = (point: PolyPoint): PBBox => {
  const { x, y } = point;
  return {
    x,
    y,
    centerX: x,
    centerY: y,
    minX: x,
    minY: y,
    maxX: x,
    maxY: y,
    height: 0,
    width: 0,
  };
};
export const getBBoxFromPoints = (points: PolyPoint[] = []): PBBox => {
  const xs: number[] = [];
  const ys: number[] = [];
  points.forEach((p) => {
    xs.push(p.x);
    ys.push(p.y);
  });
  const minX = Math.min.apply(Math, xs);
  const maxX = Math.max.apply(Math, xs);
  const minY = Math.min.apply(Math, ys);
  const maxY = Math.max.apply(Math, ys);
  return {
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    maxX,
    maxY,
    minX,
    minY,
    height: maxY - minY,
    width: maxX - minX,
  };
};
export const isBBoxesOverlapping = (b1: PBBox, b2: PBBox) =>
  Math.abs(b1.centerX - b2.centerX) * 2 < b1.width + b2.width &&
  Math.abs(b1.centerY - b2.centerY) * 2 < b1.height + b2.height;

export const filterConnectPoints = (points: PolyPoint[]): PolyPoint[] => {
  // pre-process: remove duplicated points
  const result: any[] = [];
  const pointsMap: any = {};
  const pointsLength = points.length;
  for (let i = pointsLength - 1; i >= 0; i--) {
    const p = points[i];
    p.id = `${p.x}|||${p.y}`;
    pointsMap[p.id] = p;
    result.push(p);
  }
  return result;
};
export const simplifyPolyline = (points: PolyPoint[]): PolyPoint[] => {
  return filterConnectPoints(points);
};
export const getSimplePolyline = (sPoint: PolyPoint, tPoint: PolyPoint): PolyPoint[] => [
  sPoint,
  { x: sPoint.x, y: tPoint.y },
  tPoint,
];

export const getExpandedBBox = (bbox: any, offset: number): PBBox => {
  if (bbox.width || bbox.height) {
    return {
      centerX: bbox.centerX,
      centerY: bbox.centerY,
      minX: bbox.minX - offset,
      minY: bbox.minY - offset,
      maxX: bbox.maxX + offset,
      maxY: bbox.maxY + offset,
      height: bbox.height + 2 * offset,
      width: bbox.width + 2 * offset,
    };
  }
  // when it is a point
  return bbox;
};
export const isHorizontalPort = (port: PolyPoint, bbox: PBBox): boolean | number => {
  const dx = Math.abs(port.x - bbox.centerX);
  const dy = Math.abs(port.y - bbox.centerY);
  if (dx === 0 && dy === 0) return 0;
  return dx / bbox.width > dy / bbox.height;
};
export const getExpandedBBoxPoint = (
  bbox: any, // 将原来节点 bbox 扩展了 offset 后的 bbox，且被 gridSize 格式化
  point: PolyPoint, // 被 gridSize 格式化后的位置（anchorPoint）
  anotherPoint: PolyPoint, // 另一端被 gridSize 格式化后的位置
): PolyPoint => {
  const isHorizontal = isHorizontalPort(point, bbox);
  if (isHorizontal === 0) {
    // 说明锚点是节点中心，linkCenter: true。需要根据两个节点的相对关系决定方向
    let x = bbox.centerX;
    let y = bbox.centerY;
    if (anotherPoint.y < point.y) {
      // 另一端在左上/右上方时，总是从上方走
      y = bbox.minY;
    } else if (anotherPoint.x > point.x) {
      // 另一端在右下方，往右边走
      x = bbox.maxX;
    } else if (anotherPoint.x < point.x) {
      // 另一端在左下方，往左边走
      x = bbox.minX;
    } else if (anotherPoint.x === point.x) {
      // 另一段在正下方，往下走
      y = bbox.maxY;
    }
    return { x, y };
  }
  if (isHorizontal) {
    return {
      x: point.x > bbox.centerX ? bbox.maxX : bbox.minX,
      y: point.y,
    };
  }
  return {
    x: point.x,
    y: point.y > bbox.centerY ? bbox.maxY : bbox.minY,
  };
};
/**
 *
 * @param b1
 * @param b2
 */
export const mergeBBox = (b1: PBBox, b2: PBBox): PBBox => {
  const minX = Math.min(b1.minX, b2.minX);
  const minY = Math.min(b1.minY, b2.minY);
  const maxX = Math.max(b1.maxX, b2.maxX);
  const maxY = Math.max(b1.maxY, b2.maxY);
  return {
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    minX,
    minY,
    maxX,
    maxY,
    height: maxY - minY,
    width: maxX - minX,
  };
};
export const getPointsFromBBox = (bbox: PBBox): PolyPoint[] => {
  // anticlockwise
  // const { minX, minY, maxX, maxY } = bbox;
  return [
    {
      x: bbox.minX,
      y: bbox.minY,
    },
    {
      x: bbox.maxX,
      y: bbox.minY,
    },
    {
      x: bbox.maxX,
      y: bbox.maxY,
    },
    {
      x: bbox.minX,
      y: bbox.maxY,
    },
  ];
};
export const isPointOutsideBBox = (point: PolyPoint, bbox: PBBox): boolean => {
  const { x, y } = point;
  return x < bbox.minX || x > bbox.maxX || y < bbox.minY || y > bbox.maxY;
};
export const getBBoxXCrossPoints = (bbox: PBBox, x: number): PolyPoint[] => {
  if (x < bbox.minX || x > bbox.maxX) {
    return [];
  }
  return [
    {
      x,
      y: bbox.minY,
    },
    {
      x,
      y: bbox.maxY,
    },
  ];
};
export const getBBoxYCrossPoints = (bbox: PBBox, y: number): PolyPoint[] => {
  if (y < bbox.minY || y > bbox.maxY) {
    return [];
  }
  return [
    {
      x: bbox.minX,
      y,
    },
    {
      x: bbox.maxX,
      y,
    },
  ];
};
export const getBBoxCrossPointsByPoint = (bbox: PBBox, point: PolyPoint): PolyPoint[] =>
  getBBoxXCrossPoints(bbox, point.x).concat(getBBoxYCrossPoints(bbox, point.y));

/**
 * 曼哈顿距离
 */
export const distance = (p1: PolyPoint, p2: PolyPoint): number =>
  Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

/**
 * 如果 points 中的一个节点 x 与 p 相等，则消耗 -2。y 同
 * 即优先选择和 points 在同一水平线 / 垂直线上的点
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const _costByPoints = (p: PolyPoint, points: PolyPoint[]): number => {
  const offset = -2;
  let result = 0;
  points.forEach((point) => {
    if (point) {
      if (p.x === point.x) {
        result += offset;
      }
      if (p.y === point.y) {
        result += offset;
      }
    }
  });
  return result;
};

/**
 * ps 经过 p 到 pt 的距离，减去其他路过节点造成的消耗
 */
export const heuristicCostEstimate = (
  p: PolyPoint,
  ps: PolyPoint,
  pt: PolyPoint,
  source?: PolyPoint,
  target?: PolyPoint,
): number => distance(p, ps) + distance(p, pt) + _costByPoints(p, [ps, pt, source!, target!]);

export const reconstructPath = (
  pathPoints: PolyPoint[],
  pointById: any,
  cameFrom: any,
  currentId: string,
  iterator: number = 0,
) => {
  pathPoints.unshift(pointById[currentId]);
  if (cameFrom[currentId] && cameFrom[currentId] !== currentId && iterator <= 100) {
    reconstructPath(pathPoints, pointById, cameFrom, cameFrom[currentId], iterator + 1);
  }
};

/**
 * 从 arr 中删去 item
 */
export const removeFrom = (arr: PolyPoint[], item: PolyPoint) => {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
};
export const isSegmentsIntersected = (
  p0: PolyPoint,
  p1: PolyPoint,
  p2: PolyPoint,
  p3: PolyPoint,
): boolean => {
  const v1x = p2.x - p0.x;
  const v1y = p2.y - p0.y;
  const v2x = p3.x - p0.x;
  const v2y = p3.y - p0.y;
  const v3x = p2.x - p1.x;
  const v3y = p2.y - p1.y;
  const v4x = p3.x - p1.x;
  const v4y = p3.y - p1.y;

  const pd1 = v1x * v2y - v1y * v2x;
  const pd2 = v3x * v4y - v3y * v4x;
  const pd3 = v1x * v3y - v1y * v3x;
  const pd4 = v2x * v4y - v2y * v4x;

  return pd1 * pd2 <= 0 && pd3 * pd4 <= 0;
};
export const isSegmentCrossingBBox = (p1: PolyPoint, p2: PolyPoint, bbox: PBBox): boolean => {
  if (bbox.width || bbox.height) {
    const [pa, pb, pc, pd] = getPointsFromBBox(bbox);
    return (
      isSegmentsIntersected(p1, p2, pa, pb) ||
      isSegmentsIntersected(p1, p2, pa, pd) ||
      isSegmentsIntersected(p1, p2, pb, pc) ||
      isSegmentsIntersected(p1, p2, pc, pd)
    );
  }
  return false;
};
/**
 * 在 points 中找到满足 x 或 y 和 point 的 x 或 y 相等，且与 point 连线不经过 bbox1 与 bbox2 的点
 */
export const getNeighborPoints = (
  points: PolyPoint[],
  point: PolyPoint,
  bbox1: PBBox,
  bbox2: PBBox,
): PolyPoint[] => {
  const neighbors: Point[] = [];
  points.forEach((p) => {
    if (p === point) return;
    if (p.x === point.x || p.y === point.y) {
      if (isSegmentCrossingBBox(p, point, bbox1) || isSegmentCrossingBBox(p, point, bbox2)) return;
      neighbors.push(p);
    }
  });
  return filterConnectPoints(neighbors);
};
export const pathFinder = (
  points: PolyPoint[],
  start: PolyPoint,
  goal: any,
  sBBox: PBBox,
  tBBox: PBBox,
  os: any,
  ot: any,
): PolyPoint[] => {
  // A-Star Algorithm
  const closedSet: any = [];
  const openSet = [start];
  const cameFrom: {
    [key: string]: any;
  } = {};

  const gScore: {
    [key: string]: number;
  } = {}; // all default values are Infinity

  const fScore: {
    [key: string]: number;
  } = {}; // all default values are Infinity

  gScore[start.id] = 0;
  fScore[start.id] = heuristicCostEstimate(start, goal, start);

  const pointById: {
    [key: string]: PolyPoint;
  } = {};

  points.forEach((p) => {
    pointById[p.id] = p;
  });

  let current, lowestFScore;
  while (openSet.length) {
    current = undefined;
    lowestFScore = Infinity;
    // 找到 openSet 中 fScore 最小的点
    openSet.forEach((p: any) => {
      if (fScore[p.id] <= lowestFScore) {
        lowestFScore = fScore[p.id];
        current = p;
      }
    });

    // 若 openSet 中 fScore 最小的点就是终点
    if (current === goal) {
      // ending condition
      const pathPoints: any = [];
      reconstructPath(pathPoints, pointById, cameFrom, goal.id);
      return pathPoints;
    }

    removeFrom(openSet, current);
    closedSet.push(current);

    getNeighborPoints(points, current, sBBox, tBBox).forEach((neighbor) => {
      if (closedSet.indexOf(neighbor) !== -1) {
        return;
      }

      if (openSet.indexOf(neighbor) === -1) {
        openSet.push(neighbor);
      }

      const tentativeGScore = fScore[current.id] + distance(current, neighbor); // + distance(neighbor, goal);
      if (gScore[neighbor.id] && tentativeGScore >= gScore[neighbor.id]) {
        return;
      }

      cameFrom[neighbor.id] = current.id;
      gScore[neighbor.id] = tentativeGScore;
      fScore[neighbor.id] =
        gScore[neighbor.id] + heuristicCostEstimate(neighbor, goal, start, os, ot);
    });
  }
  // throw new Error('Cannot find path');
  return [start, goal];
};
export const isBending = (p0: PolyPoint, p1: PolyPoint, p2: PolyPoint): boolean =>
  !((p0.x === p1.x && p1.x === p2.x) || (p0.y === p1.y && p1.y === p2.y));

export const getBorderRadiusPoints = (
  p0: PolyPoint,
  p1: PolyPoint,
  p2: PolyPoint,
  r: number,
): PolyPoint[] => {
  const d0 = distance(p0, p1);
  const d1 = distance(p2, p1);
  if (d0 < r) {
    r = d0;
  }
  if (d1 < r) {
    r = d1;
  }
  const ps = {
    x: p1.x - (r / d0) * (p1.x - p0.x),
    y: p1.y - (r / d0) * (p1.y - p0.y),
  };
  const pt = {
    x: p1.x - (r / d1) * (p1.x - p2.x),
    y: p1.y - (r / d1) * (p1.y - p2.y),
  };
  return [ps, pt];
};
export const getPathWithBorderRadiusByPolyline = (
  points: PolyPoint[],
  borderRadius: number,
): string => {
  const pathSegments: string[] = [];
  const startPoint = points[0];
  pathSegments.push(`M${startPoint.x} ${startPoint.y}`);
  points.forEach((p, i) => {
    const p1 = points[i + 1];
    const p2 = points[i + 2];
    if (p1 && p2) {
      if (isBending(p, p1, p2)) {
        const [ps, pt] = getBorderRadiusPoints(p, p1, p2, borderRadius);
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
export const getPolylinePoints = (
  start: PolyPoint,
  end: PolyPoint,
  sNode: INode | ICombo,
  tNode: INode | ICombo,
  offset: number,
): PolyPoint[] => {
  let sBBox: PBBox, tBBox: PBBox;

  if (!sNode || !sNode.getType()) {
    sBBox = getBBoxFromPoint(start);
  } else if (sNode.getType() === 'combo') {
    const sNodeKeyShape = sNode.getKeyShape();
    sBBox = sNodeKeyShape.getCanvasBBox() || (getBBoxFromPoint(start) as PBBox);
    sBBox.centerX = (sBBox.minX + sBBox.maxX) / 2;
    sBBox.centerY = (sBBox.minY + sBBox.maxY) / 2;
  } else {
    sBBox = sNode.getBBox();
  }

  if (!tNode || !tNode.getType()) {
    tBBox = getBBoxFromPoint(end);
  }
  else if (tNode.getType() === 'combo') {
    const tKeyShapeBBox = tNode.getKeyShape().getBBox();
    if (tKeyShapeBBox) {
      const { x: tx, y: ty } = tNode.getModel();
      tBBox = {
        x: tx,
        y: ty,
        width: tKeyShapeBBox.width,
        height: tKeyShapeBBox.height,
        minX: tKeyShapeBBox.minX + tx,
        maxX: tKeyShapeBBox.maxX + tx,
        minY: tKeyShapeBBox.minY + ty,
        maxY: tKeyShapeBBox.maxY + ty,
      }
      tBBox.centerX = (tBBox.minX + tBBox.maxX) / 2;
      tBBox.centerY = (tBBox.minY + tBBox.maxY) / 2;
    } else {
      tBBox = getBBoxFromPoint(end) as PBBox
    }
  }
  else {
    tBBox = tNode && tNode.getBBox();
  }

  // if (isBBoxesOverlapping(sBBox, tBBox)) {
  //   // source and target nodes are overlapping
  //   return simplifyPolyline(getSimplePolyline(start, end));
  // }
  const sxBBox = getExpandedBBox(sBBox, offset);
  const txBBox = getExpandedBBox(tBBox, offset);
  // if (isBBoxesOverlapping(sxBBox, txBBox)) {
  //   // the expanded bounding boxes of source and target nodes are overlapping
  //   return simplifyPolyline(getSimplePolyline(start, end));
  // }
  const sPoint = getExpandedBBoxPoint(sxBBox, start, end);
  const tPoint = getExpandedBBoxPoint(txBBox, end, start);
  const lineBBox = getBBoxFromPoints([sPoint, tPoint]);
  const sMixBBox = mergeBBox(sxBBox, lineBBox);
  const tMixBBox = mergeBBox(txBBox, lineBBox);
  let connectPoints: any = [];
  connectPoints = connectPoints
    .concat(
      getPointsFromBBox(sMixBBox), // .filter(p => !isPointIntersectBBox(p, txBBox))
    )
    .concat(
      getPointsFromBBox(tMixBBox), // .filter(p => !isPointIntersectBBox(p, sxBBox))
    );
  const centerPoint = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
  [lineBBox, sMixBBox, tMixBBox].forEach((bbox: PBBox) => {
    connectPoints = connectPoints.concat(
      getBBoxCrossPointsByPoint(bbox, centerPoint).filter(
        (p) => isPointOutsideBBox(p, sxBBox) && isPointOutsideBBox(p, txBBox),
      ),
    );
  });
  [
    {
      x: sPoint.x,
      y: tPoint.y,
    },
    {
      x: tPoint.x,
      y: sPoint.y,
    },
  ].forEach((p) => {
    // impossible!!
    if (
      isPointOutsideBBox(p, sxBBox) &&
      isPointOutsideBBox(p, txBBox) // &&
      // isPointInsideBBox(p, sMixBBox) && isPointInsideBBox(p, tMixBBox)
    ) {
      connectPoints.push(p);
    }
  });
  connectPoints.unshift(sPoint);
  connectPoints.push(tPoint);
  // filter out dulplicated points in connectPoints
  connectPoints = filterConnectPoints(connectPoints); // , sxBBox, txBBox, outerBBox
  const pathPoints = pathFinder(connectPoints, sPoint, tPoint, sBBox, tBBox, start, end);
  pathPoints.unshift(start);
  pathPoints.push(end);

  return simplifyPolyline(pathPoints);
};
