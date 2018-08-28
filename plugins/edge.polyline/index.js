/**
 * @fileOverview auto polyline
 * @author huangtonger@aliyun.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

function isHorizontalPort(port, bbox) {
  const dx = Math.abs(port.x - bbox.centerX);
  const dy = Math.abs(port.y - bbox.centerY);
  return (dx / bbox.width) > (dy / bbox.height);
}

/**
 * BBox Utils
 * BBox:
 * { centerX, centerY, height, maxX, maxY, minX, minY, width }
 **/

function mergeBBox(b1, b2) {
  const minX = Math.min(b1.minX, b2.minX);
  const minY = Math.min(b1.minY, b2.minY);
  const maxX = Math.max(b1.maxX, b2.maxX);
  const maxY = Math.max(b1.maxY, b2.maxY);
  return {
    centerX: (minX + maxX) / 2, centerY: (minY + maxY) / 2,
    minX, minY, maxX, maxY,
    height: maxY - minY, width: maxX - minX
  };
}

function isBBoxesOverlapping(b1, b2) {
  return Math.abs(b1.centerX - b2.centerX) * 2 < (b1.width + b2.width) &&
    Math.abs(b1.centerY - b2.centerY) * 2 < (b1.height + b2.height);
}

function getBBoxFromPoint(point) {
  const { x, y } = point;
  return {
    centerX: x, centerY: y,
    minX: x, minY: y, maxX: x, maxY: y,
    height: 0, width: 0
  };
}

function getBBoxFromPoints(points = []) {
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
    centerX: (minX + maxX) / 2, centerY: (minY + maxY) / 2,
    maxX, maxY, minX, minY,
    height: (maxY - minY), width: (maxX - minX)
  };
}

function getExpandedBBox(bbox, offset) {
  if (bbox.width === 0 && bbox.height === 0) { // when it is a point
    return bbox;
  }
  return {
    centerX: bbox.centerX, centerY: bbox.centerY,
    minX: bbox.minX - offset, minY: bbox.minY - offset, maxX: bbox.maxX + offset, maxY: bbox.maxY + offset,
    height: bbox.height + 2 * offset, width: bbox.width + 2 * offset
  };
}

function getExpandedBBoxPoint(bbox, point) {
  const isHorizontal = isHorizontalPort(point, bbox);
  if (isHorizontal) {
    return { x: point.x > bbox.centerX ? bbox.maxX : bbox.minX, y: point.y };
  }
  return { x: point.x, y: point.y > bbox.centerY ? bbox.maxY : bbox.minY };
}

function getPointsFromBBox(bbox) {
  // anticlockwise
  const { minX, minY, maxX, maxY } = bbox;
  return [
    { x: minX, y: minY },
    { x: maxX, y: minY },
    { x: maxX, y: maxY },
    { x: minX, y: maxY }
  ];
}

// function isPointInsideBBox(point, bbox) {
//   const { x, y } = point;
//   return x > bbox.minX && x < bbox.maxX && y > bbox.minY && y < bbox.maxY;
// }

function isPointOutsideBBox(point, bbox) {
  const { x, y } = point;
  return x < bbox.minX || x > bbox.maxX || y < bbox.minY || y > bbox.maxY;
}

// function isPointIntersectBBox(point, bbox) {
//   return !isPointInsideBBox(point, bbox) && !isPointOutsideBBox(point, bbox);
// }

function getBBoxXCrossPoints(bbox, x) {
  if (x < bbox.minX || x > bbox.maxX) {
    return [];
  }
  return [
    { x, y: bbox.minY },
    { x, y: bbox.maxY }
  ];
}

function getBBoxYCrossPoints(bbox, y) {
  if (y < bbox.minY || y > bbox.maxY) {
    return [];
  }
  return [
    { x: bbox.minX, y },
    { x: bbox.maxX, y }
  ];
}

function getBBoxCrossPointsByPoint(bbox, point) {
  return getBBoxXCrossPoints(bbox, point.x).concat(getBBoxYCrossPoints(bbox, point.y));
}

function isSegmentsIntersected(p0, p1, p2, p3) {
  const s1_x = p1.x - p0.x;
  const s1_y = p1.y - p0.y;
  const s2_x = p3.x - p2.x;
  const s2_y = p3.y - p2.y;

  const s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
  const t = (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / (-s2_x * s1_y + s1_x * s2_y);

  return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}

function isSegmentCrossingBBox(p1, p2, bbox) {
  if (bbox.width === bbox.height === 0) {
    return false;
  }
  const [ pa, pb, pc, pd ] = getPointsFromBBox(bbox);
  return isSegmentsIntersected(p1, p2, pa, pb) ||
    isSegmentsIntersected(p1, p2, pa, pd) ||
    isSegmentsIntersected(p1, p2, pb, pc) ||
    isSegmentsIntersected(p1, p2, pc, pd);
}

function filterHVPoints(points) {
  const rst = [ points[0] ];
  for (let index = 1; index < points.length; index++) {
    const point = points[index];
    const next = points[index + 1];
    const last = points[index - 1];
    if (next && last && ((next.x === point.x && last.x === point.x)
     || (next.y === point.y && last.y === point.y))) {
      continue;
    }
    rst.push(point);
  }
  return rst;
}

/**
 * Polyline Utils
 * Polyline:
 * [ p1, p2, p3, ..., pn ]
 **/

function simplifyPolyline(points) {
  points = filterConnectPoints(points);
  points = filterHVPoints(points);
  return points;
}

function getSimplePolyline(sPoint, tPoint) {
  return [
    sPoint,
    { x: sPoint.x, y: tPoint.y },
    tPoint
  ];
}

function filterConnectPoints(points) {
  // pre-process: remove duplicated points
  const result = [];
  const pointsMap = {};
  points.forEach(p => {
    const id = p.id = `${p.x}-${p.y}`;
    pointsMap[id] = p;
  });
  Util.each(pointsMap, p => {
    result.push(p);
  });
  return result;
}

function distance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function _costByPoints(p, points) {
  const offset = -2;
  let result = 0;
  points.forEach(point => {
    if (point) {
      if (p.x === point.x) result += offset;
      if (p.y === point.y) result += offset;
    }
  });
  return result;
}
function heuristicCostEstimate(p, ps, pt, source, target) {
  return (distance(p, ps) + distance(p, pt)) + _costByPoints(p, [ ps, pt, source, target ]);
}

function removeFrom(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

function getNeighborPoints(points, point, bbox1, bbox2) {
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
}

function reconstructPath(pathPoints, pointById, cameFrom, currentId, iterator = 0) {
  pathPoints.unshift(pointById[currentId]);
  if (cameFrom[currentId] && cameFrom[currentId] !== currentId && iterator <= 100) {
    reconstructPath(pathPoints, pointById, cameFrom, cameFrom[currentId], iterator + 1);
  }
}

function pathFinder(points, start, goal, sBBox, tBBox, os, ot) { // A-Star Algorithm
  const closedSet = [];
  const openSet = [ start ];
  const cameFrom = {};
  const gScore = {}; // all default values are Infinity
  const fScore = {}; // all default values are Infinity

  gScore[start.id] = 0;
  fScore[start.id] = heuristicCostEstimate(start, goal, start);

  const pointById = {};
  points.forEach(p => {
    pointById[p.id] = p;
  });

  while (openSet.length) {
    let current;
    let lowestFScore = Infinity;
    openSet.forEach(p => {
      if (fScore[p.id] < lowestFScore) {
        lowestFScore = fScore[p.id];
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
      if (closedSet.indexOf(neighbor) !== -1) return;

      if (openSet.indexOf(neighbor) === -1) {
        openSet.push(neighbor);
      }

      const tentativeGScore = fScore[current.id] + distance(current, neighbor);// + distance(neighbor, goal);

      if (gScore[neighbor.id] && (tentativeGScore >= gScore[neighbor.id])) return;

      cameFrom[neighbor.id] = current.id;
      gScore[neighbor.id] = tentativeGScore;
      fScore[neighbor.id] = gScore[neighbor.id] + heuristicCostEstimate(neighbor, goal, start, os, ot);
    });
  }
  // throw new Error('Cannot find path');
  console.error('cannot find path: ', points, start, goal);
  return [ start, goal ];
}

function getPolylinePoints(start, end, sNode, tNode, offset) {
  const sBBox = sNode && sNode.bbox ? sNode.bbox : getBBoxFromPoint(start);
  const tBBox = tNode && tNode.bbox ? tNode.bbox : getBBoxFromPoint(end);
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
  connectPoints = connectPoints.concat(
    getPointsFromBBox(sMixBBox)// .filter(p => !isPointIntersectBBox(p, txBBox))
  );
  connectPoints = connectPoints.concat(
    getPointsFromBBox(tMixBBox)// .filter(p => !isPointIntersectBBox(p, sxBBox))
  );
  const centerPoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
  [
    lineBBox,
    sMixBBox,
    tMixBBox
  ].forEach(bbox => {
    connectPoints = connectPoints.concat(
      getBBoxCrossPointsByPoint(bbox, centerPoint).filter(
        p => isPointOutsideBBox(p, sxBBox) && isPointOutsideBBox(p, txBBox)
      )
    );
  });
  [
    { x: sPoint.x, y: tPoint.y },
    { x: tPoint.x, y: sPoint.y }
  ].forEach(p => {
    if (
      isPointOutsideBBox(p, sxBBox) && isPointOutsideBBox(p, txBBox)// &&
      // isPointInsideBBox(p, sMixBBox) && isPointInsideBBox(p, tMixBBox)
    ) {
      connectPoints.push(p);
    }
  });
  connectPoints.unshift(sPoint);
  connectPoints.push(tPoint);
  connectPoints = filterConnectPoints(connectPoints, sxBBox, txBBox, outerBBox);
  const pathPoints = pathFinder(connectPoints, sPoint, tPoint, sBBox, tBBox, start, end);
  pathPoints.unshift(start);
  pathPoints.push(end);

  return simplifyPolyline(pathPoints);
}

function isBending(p0, p1, p2) {
  return !((p0.x === p1.x === p2.x) || (p0.y === p1.y === p2.y));
}

function getBorderRadiusPoints(p0, p1, p2, r) {
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
}

function getPathWithBorderRadiusByPolyline(points, borderRadius) {
  // TODO
  const pathSegments = [];
  const startPoint = points[0];
  pathSegments.push([ 'M', startPoint.x, startPoint.y ]);
  points.forEach((p, i) => {
    const p1 = points[i + 1];
    const p2 = points[i + 2];
    if (p1 && p2) {
      if (isBending(p, p1, p2)) {
        const [ ps, pt ] = getBorderRadiusPoints(p, p1, p2, borderRadius);
        pathSegments.push([ 'L', ps.x, ps.y ]);
        pathSegments.push([ 'Q', p1.x, p1.y, pt.x, pt.y ]);
        pathSegments.push([ 'L', pt.x, pt.y ]);
      } else {
        pathSegments.push([ 'L', p1.x, p1.y ]);
      }
    } else if (p1) {
      pathSegments.push([ 'L', p1.x, p1.y ]);
    }
  });
  return pathSegments;
}

G6.registerEdge('polyline', {
  offset: 10,
  getPath(item) {
    const points = item.getPoints();
    const source = item.getSource();
    const target = item.getTarget();
    return this.getPathByPoints(points, source, target);
  },
  getPathByPoints(points, source, target) {
    const polylinePoints = getPolylinePoints(points[0], points[points.length - 1], source, target, this.offset);
    // FIXME default
    return Util.pointsToPolygon(polylinePoints);
  }
});

G6.registerEdge('polyline-round', {
  borderRadius: 9,
  getPathByPoints(points, source, target) {
    const polylinePoints = simplifyPolyline(
      getPolylinePoints(points[0], points[points.length - 1], source, target, this.offset)
    );
    // FIXME default
    return getPathWithBorderRadiusByPolyline(polylinePoints, this.borderRadius);
  }
}, 'polyline');

module.exports = true;
