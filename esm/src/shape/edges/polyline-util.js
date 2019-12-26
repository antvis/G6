import { each } from '@antv/util';
export var getBBoxFromPoint = function (point) {
    var x = point.x, y = point.y;
    return {
        x: x,
        y: y,
        minX: x,
        minY: y,
        maxX: x,
        maxY: y,
        height: 0,
        width: 0
    };
};
export var getBBoxFromPoints = function (points) {
    if (points === void 0) { points = []; }
    var xs = [];
    var ys = [];
    points.forEach(function (p) {
        xs.push(p.x);
        ys.push(p.y);
    });
    var minX = Math.min.apply(Math, xs);
    var maxX = Math.max.apply(Math, xs);
    var minY = Math.min.apply(Math, ys);
    var maxY = Math.max.apply(Math, ys);
    return {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
        maxX: maxX,
        maxY: maxY,
        minX: minX,
        minY: minY,
        height: (maxY - minY),
        width: (maxX - minX)
    };
};
export var isBBoxesOverlapping = function (b1, b2) {
    return Math.abs(b1.x - b2.x) * 2 < (b1.width + b2.width) && Math.abs(b1.y - b2.y) * 2 < (b1.height + b2.height);
};
export var filterConnectPoints = function (points) {
    // pre-process: remove duplicated points
    var result = [];
    var pointsMap = {};
    points.forEach(function (p) {
        var id = p.x + "-" + p.y;
        p.id = id;
        pointsMap[id] = p;
    });
    each(pointsMap, function (p) {
        result.push(p);
    });
    return result;
};
export var simplifyPolyline = function (points) {
    points = filterConnectPoints(points);
    return points;
};
export var getSimplePolyline = function (sPoint, tPoint) {
    return [
        sPoint,
        { x: sPoint.x, y: tPoint.y },
        tPoint
    ];
};
export var getExpandedBBox = function (bbox, offset) {
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
export var isHorizontalPort = function (port, bbox) {
    var dx = Math.abs(port.x - bbox.x);
    var dy = Math.abs(port.y - bbox.y);
    return (dx / bbox.width) > (dy / bbox.height);
};
export var getExpandedBBoxPoint = function (bbox, point) {
    var isHorizontal = isHorizontalPort(point, bbox);
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
export var mergeBBox = function (b1, b2) {
    var minX = Math.min(b1.minX, b2.minX);
    var minY = Math.min(b1.minY, b2.minY);
    var maxX = Math.max(b1.maxX, b2.maxX);
    var maxY = Math.max(b1.maxY, b2.maxY);
    return {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY,
        height: maxY - minY,
        width: maxX - minX
    };
};
export var getPointsFromBBox = function (bbox) {
    // anticlockwise
    var minX = bbox.minX, minY = bbox.minY, maxX = bbox.maxX, maxY = bbox.maxY;
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
export var isPointOutsideBBox = function (point, bbox) {
    var x = point.x, y = point.y;
    return x < bbox.minX || x > bbox.maxX || y < bbox.minY || y > bbox.maxY;
};
export var getBBoxXCrossPoints = function (bbox, x) {
    if (x < bbox.minX || x > bbox.maxX) {
        return [];
    }
    return [{
            x: x,
            y: bbox.minY
        },
        {
            x: x,
            y: bbox.maxY
        }];
};
export var getBBoxYCrossPoints = function (bbox, y) {
    if (y < bbox.minY || y > bbox.maxY) {
        return [];
    }
    return [{
            x: bbox.minX,
            y: y
        },
        {
            x: bbox.maxX,
            y: y
        }];
};
export var getBBoxCrossPointsByPoint = function (bbox, point) {
    return getBBoxXCrossPoints(bbox, point.x).concat(getBBoxYCrossPoints(bbox, point.y));
};
export var distance = function (p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
};
export var _costByPoints = function (p, points) {
    var offset = -2;
    var result = 0;
    points.forEach(function (point) {
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
export var heuristicCostEstimate = function (p, ps, pt, source, target) {
    return (distance(p, ps) + distance(p, pt)) + _costByPoints(p, [ps, pt, source, target]);
};
export var reconstructPath = function (pathPoints, pointById, cameFrom, currentId, iterator) {
    if (iterator === void 0) { iterator = 0; }
    pathPoints.unshift(pointById[currentId]);
    if (cameFrom[currentId] && cameFrom[currentId] !== currentId && iterator <= 100) {
        reconstructPath(pathPoints, pointById, cameFrom, cameFrom[currentId], iterator + 1);
    }
};
export var removeFrom = function (arr, item) {
    var index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, 1);
    }
};
export var isSegmentsIntersected = function (p0, p1, p2, p3) {
    var s1_x = p1.x - p0.x;
    var s1_y = p1.y - p0.y;
    var s2_x = p3.x - p2.x;
    var s2_y = p3.y - p2.y;
    var s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
    var t = (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / (-s2_x * s1_y + s1_x * s2_y);
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
};
export var isSegmentCrossingBBox = function (p1, p2, bbox) {
    if (bbox.width === 0 && bbox.height === 0) {
        return false;
    }
    var _a = getPointsFromBBox(bbox), pa = _a[0], pb = _a[1], pc = _a[2], pd = _a[3];
    return isSegmentsIntersected(p1, p2, pa, pb) || isSegmentsIntersected(p1, p2, pa, pd) || isSegmentsIntersected(p1, p2, pb, pc) || isSegmentsIntersected(p1, p2, pc, pd);
};
export var getNeighborPoints = function (points, point, bbox1, bbox2) {
    var neighbors = [];
    points.forEach(function (p) {
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
export var pathFinder = function (points, start, goal, sBBox, tBBox, os, ot) {
    var closedSet = [];
    var openSet = [start];
    var cameFrom = {};
    var gScore = {}; // all default values are Infinity
    var fScore = {}; // all default values are Infinity
    gScore[start.x + "-" + start.y] = 0;
    fScore[start.x + "-" + start.y] = heuristicCostEstimate(start, goal, start);
    var pointById = {};
    points.forEach(function (p) {
        pointById[p.x + "-" + p.y] = p;
    });
    var _loop_1 = function () {
        var current;
        var lowestFScore = Infinity;
        openSet.forEach(function (p) {
            if (fScore[p.id] < lowestFScore) {
                lowestFScore = fScore[p.id];
                current = p;
            }
        });
        if (current === goal) { // ending condition
            var pathPoints = [];
            reconstructPath(pathPoints, pointById, cameFrom, goal.id);
            return { value: pathPoints };
        }
        removeFrom(openSet, current);
        closedSet.push(current);
        getNeighborPoints(points, current, sBBox, tBBox).forEach(function (neighbor) {
            if (closedSet.indexOf(neighbor) !== -1) {
                return;
            }
            if (openSet.indexOf(neighbor) === -1) {
                openSet.push(neighbor);
            }
            var tentativeGScore = fScore[current.id] + distance(current, neighbor); // + distance(neighbor, goal);
            if (gScore[neighbor.x + "-" + neighbor.y] && (tentativeGScore >= gScore[neighbor.x + "-" + neighbor.y])) {
                return;
            }
            cameFrom[neighbor.x + "-" + neighbor.y] = current.id;
            gScore[neighbor.x + "-" + neighbor.y] = tentativeGScore;
            fScore[neighbor.x + "-" + neighbor.y] = gScore[neighbor.x + "-" + neighbor.y] + heuristicCostEstimate(neighbor, goal, start, os, ot);
        });
    };
    while (openSet.length) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    // throw new Error('Cannot find path');
    return [start, goal];
};
export var isBending = function (p0, p1, p2) {
    return !((p0.x === p1.x && p1.x === p2.x) || (p0.y === p1.y && p1.y === p2.y));
};
export var getBorderRadiusPoints = function (p0, p1, p2, r) {
    var d0 = distance(p0, p1);
    var d1 = distance(p2, p1);
    if (d0 < r) {
        r = d0;
    }
    if (d1 < r) {
        r = d1;
    }
    var ps = {
        x: p1.x - r / d0 * (p1.x - p0.x),
        y: p1.y - r / d0 * (p1.y - p0.y)
    };
    var pt = {
        x: p1.x - r / d1 * (p1.x - p2.x),
        y: p1.y - r / d1 * (p1.y - p2.y)
    };
    return [ps, pt];
};
export var getPathWithBorderRadiusByPolyline = function (points, borderRadius) {
    // TODO
    var pathSegments = [];
    var startPoint = points[0];
    pathSegments.push("M" + startPoint.x + " " + startPoint.y);
    points.forEach(function (p, i) {
        var p1 = points[i + 1];
        var p2 = points[i + 2];
        if (p1 && p2) {
            if (isBending(p, p1, p2)) {
                var _a = getBorderRadiusPoints(p, p1, p2, borderRadius), ps = _a[0], pt = _a[1];
                pathSegments.push("L" + ps.x + " " + ps.y);
                pathSegments.push("Q" + p1.x + " " + p1.y + " " + pt.x + " " + pt.y);
                pathSegments.push("L" + pt.x + " " + pt.y);
            }
            else {
                pathSegments.push("L" + p1.x + " " + p1.y);
            }
        }
        else if (p1) {
            pathSegments.push("L" + p1.x + " " + p1.y);
        }
    });
    return pathSegments.join('');
};
export var getPolylinePoints = function (start, end, sNode, tNode, offset) {
    var sBBox = sNode && sNode.getBBox() ? sNode.getBBox() : getBBoxFromPoint(start);
    var tBBox = tNode && tNode.getBBox() ? tNode.getBBox() : getBBoxFromPoint(end);
    if (isBBoxesOverlapping(sBBox, tBBox)) { // source and target nodes are overlapping
        return simplifyPolyline(getSimplePolyline(start, end));
    }
    var sxBBox = getExpandedBBox(sBBox, offset);
    var txBBox = getExpandedBBox(tBBox, offset);
    if (isBBoxesOverlapping(sxBBox, txBBox)) { // the expanded bounding boxes of source and target nodes are overlapping
        return simplifyPolyline(getSimplePolyline(start, end));
    }
    var sPoint = getExpandedBBoxPoint(sxBBox, start);
    var tPoint = getExpandedBBoxPoint(txBBox, end);
    var lineBBox = getBBoxFromPoints([sPoint, tPoint]);
    var outerBBox = mergeBBox(sxBBox, txBBox);
    var sMixBBox = mergeBBox(sxBBox, lineBBox);
    var tMixBBox = mergeBBox(txBBox, lineBBox);
    var connectPoints = [];
    connectPoints = connectPoints.concat(getPointsFromBBox(sMixBBox) // .filter(p => !isPointIntersectBBox(p, txBBox))
    );
    connectPoints = connectPoints.concat(getPointsFromBBox(tMixBBox) // .filter(p => !isPointIntersectBBox(p, sxBBox))
    );
    var centerPoint = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
    };
    [lineBBox, sMixBBox, tMixBBox].forEach(function (bbox) {
        connectPoints = connectPoints.concat(getBBoxCrossPointsByPoint(bbox, centerPoint).filter(function (p) { return isPointOutsideBBox(p, sxBBox) && isPointOutsideBBox(p, txBBox); }));
    });
    [{
            x: sPoint.x,
            y: tPoint.y
        },
        {
            x: tPoint.x,
            y: sPoint.y
        }].forEach(function (p) {
        if (isPointOutsideBBox(p, sxBBox) && isPointOutsideBBox(p, txBBox) // &&
        // isPointInsideBBox(p, sMixBBox) && isPointInsideBBox(p, tMixBBox)
        ) {
            connectPoints.push(p);
        }
    });
    connectPoints.unshift(sPoint);
    connectPoints.push(tPoint);
    connectPoints = filterConnectPoints(connectPoints); // , sxBBox, txBBox, outerBBox
    var pathPoints = pathFinder(connectPoints, sPoint, tPoint, sBBox, tBBox, start, end);
    pathPoints.unshift(start);
    pathPoints.push(end);
    return simplifyPolyline(pathPoints);
};
//# sourceMappingURL=polyline-util.js.map