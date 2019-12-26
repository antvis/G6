import { mat3, transform, vec3 } from '@antv/matrix-util';
/**
 * 是否在区间内
 * @param   {number}       value  值
 * @param   {number}       min    最小值
 * @param   {number}       max    最大值
 * @return  {boolean}      bool   布尔
 */
var isBetween = function (value, min, max) { return value >= min && value <= max; };
/**
 * 获取两条线段的交点
 * @param  {Point}  p0 第一条线段起点
 * @param  {Point}  p1 第一条线段终点
 * @param  {Point}  p2 第二条线段起点
 * @param  {Point}  p3 第二条线段终点
 * @return {Point}  交点
 */
var getLineIntersect = function (p0, p1, p2, p3) {
    var tolerance = 0.001;
    var E = {
        x: p2.x - p0.x,
        y: p2.y - p0.y
    };
    var D0 = {
        x: p1.x - p0.x,
        y: p1.y - p0.y
    };
    var D1 = {
        x: p3.x - p2.x,
        y: p3.y - p2.y
    };
    var kross = D0.x * D1.y - D0.y * D1.x;
    var sqrKross = kross * kross;
    var sqrLen0 = D0.x * D0.x + D0.y * D0.y;
    var sqrLen1 = D1.x * D1.x + D1.y * D1.y;
    var point;
    if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
        var s = (E.x * D1.y - E.y * D1.x) / kross;
        var t = (E.x * D0.y - E.y * D0.x) / kross;
        if (isBetween(s, 0, 1) && isBetween(t, 0, 1)) {
            point = {
                x: p0.x + s * D0.x,
                y: p0.y + s * D0.y
            };
        }
    }
    return point;
};
/**
 * point and rectangular intersection point
 * @param  {IRect} rect  rect
 * @param  {Point} point point
 * @return {PointPoint} rst;
 */
export var getRectIntersectByPoint = function (rect, point) {
    var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
    var cx = x + width / 2;
    var cy = y + height / 2;
    var points = [];
    var center = {
        x: cx,
        y: cy
    };
    points.push({
        x: x,
        y: y
    });
    points.push({
        x: x + width,
        y: y
    });
    points.push({
        x: x + width,
        y: y + height
    });
    points.push({
        x: x,
        y: y + height
    });
    points.push({
        x: x,
        y: y
    });
    var rst;
    for (var i = 1; i < points.length; i++) {
        rst = getLineIntersect(points[i - 1], points[i], center, point);
        if (rst) {
            break;
        }
    }
    return rst;
};
/**
 * get point and circle inIntersect
 * @param {ICircle} circle 圆点，x,y,r
 * @param {Point} point 点 x,y
 * @return {Point} applied point
 */
export var getCircleIntersectByPoint = function (circle, point) {
    var cx = circle.x;
    var cy = circle.y;
    var r = circle.r;
    var x = point.x, y = point.y;
    var d = Math.sqrt(Math.pow((x - cx), 2) + Math.pow((y - cy), 2));
    if (d < r) {
        return null;
    }
    var dx = (x - cx);
    var dy = (y - cy);
    var signX = Math.sign(dx);
    var signY = Math.sign(dy);
    var angle = Math.atan(dy / dx);
    return {
        x: cx + Math.abs(r * Math.cos(angle)) * signX,
        y: cy + Math.abs(r * Math.sin(angle)) * signY
    };
};
/**
 * get point and ellipse inIntersect
 * @param {Object} ellipse 椭圆 x,y,rx,ry
 * @param {Object} point 点 x,y
 * @return {object} applied point
 */
export var getEllispeIntersectByPoint = function (ellipse, point) {
    var a = ellipse.rx;
    var b = ellipse.ry;
    var cx = ellipse.x;
    var cy = ellipse.y;
    var dx = (point.x - cx);
    var dy = (point.y - cy);
    // 直接通过 x,y 求夹角，求出来的范围是 -PI, PI
    var angle = Math.atan2(dy / b, dx / a);
    if (angle < 0) {
        angle += 2 * Math.PI; // 转换到 0，2PI
    }
    return {
        x: cx + a * Math.cos(angle),
        y: cy + b * Math.sin(angle)
    };
};
/**
 * coordinate matrix transformation
 * @param  {number} point   coordinate
 * @param  {Matrix} matrix  matrix
 * @param  {number} tag     could be 0 or 1
 * @return {Point} transformed point
 */
export var applyMatrix = function (point, matrix, tag) {
    if (tag === void 0) { tag = 1; }
    var vector = [point.x, point.y, tag];
    vec3.transformMat3(vector, vector, matrix);
    return {
        x: vector[0],
        y: vector[1]
    };
};
/**
 * coordinate matrix invert transformation
 * @param  {number} point   coordinate
 * @param  {number} matrix  matrix
 * @param  {number} tag     could be 0 or 1
 * @return {object} transformed point
 */
export var invertMatrix = function (point, matrix, tag) {
    if (tag === void 0) { tag = 1; }
    if (!matrix)
        matrix = mat3.create();
    var inversedMatrix = mat3.invert([], matrix);
    var vector = [point.x, point.y, tag];
    vec3.transformMat3(vector, vector, inversedMatrix);
    return {
        x: vector[0],
        y: vector[1]
    };
};
/**
 *
 * @param p1 First coordinate
 * @param p2 second coordinate
 * @param p3 three coordinate
 */
export var getCircleCenterByPoints = function (p1, p2, p3) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    var c = p1.x - p3.x;
    var d = p1.y - p3.y;
    var e = (p1.x * p1.x - p2.x * p2.x - p2.y * p2.y + p1.y * p1.y) / 2;
    var f = (p1.x * p1.x - p3.x * p3.x - p3.y * p3.y + p1.y * p1.y) / 2;
    var denominator = b * c - a * d;
    return {
        x: -(d * e - b * f) / denominator,
        y: -(a * f - c * e) / denominator
    };
};
/**
 * get distance by two points
 * @param p1 first point
 * @param p2 second point
 */
export var distance = function (p1, p2) {
    var vx = p1.x - p2.x;
    var vy = p1.y - p2.y;
    return Math.sqrt(vx * vx + vy * vy);
};
/**
 * scale matrix
 * @param matrix [ [], [], [] ]
 * @param scale
 */
export var scaleMatrix = function (matrix, scale) {
    var result = [];
    matrix.forEach(function (row) {
        var newRow = [];
        row.forEach(function (v) {
            newRow.push(v * scale);
        });
        result.push(newRow);
    });
    return result;
};
/**
 * Floyd Warshall algorithm for shortest path distances matrix
 * @param  {array} adjMatrix   adjacency matrix
 * @return {array} distances   shortest path distances matrix
 */
export var floydWarshall = function (adjMatrix) {
    // initialize
    var dist = [];
    var size = adjMatrix.length;
    for (var i = 0; i < size; i += 1) {
        dist[i] = [];
        for (var j = 0; j < size; j += 1) {
            if (i === j) {
                dist[i][j] = 0;
            }
            else if (adjMatrix[i][j] === 0 || !adjMatrix[i][j]) {
                dist[i][j] = Infinity;
            }
            else {
                dist[i][j] = adjMatrix[i][j];
            }
        }
    }
    // floyd
    for (var k = 0; k < size; k += 1) {
        for (var i = 0; i < size; i += 1) {
            for (var j = 0; j < size; j += 1) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
};
/**
 * get adjacency matrix
 * @param data graph data
 * @param directed whether it's a directed graph
 */
export var getAdjMatrix = function (data, directed) {
    var nodes = data.nodes;
    var edges = data.edges;
    var matrix = [];
    // map node with index in data.nodes
    var nodeMap = new Map();
    nodes.forEach(function (node, i) {
        nodeMap.set(node.id, i);
        var row = [];
        matrix.push(row);
    });
    edges.forEach(function (e) {
        var source = e.source;
        var target = e.target;
        var sIndex = nodeMap.get(source);
        var tIndex = nodeMap.get(target);
        matrix[sIndex][tIndex] = 1;
        if (!directed) {
            matrix[tIndex][sIndex] = 1;
        }
    });
    return matrix;
};
/**
 * 平移group
 * @param group Group 实例
 * @param point 坐标
 */
export var translate = function (group, point) {
    var matrix = group.getMatrix();
    matrix = transform(matrix, [
        ['t', point.x, point.y]
    ]);
    group.setMatrix(matrix);
};
/**
 * 移动到指定坐标点
 * @param group Group 实例
 * @param point 移动到的坐标点
 */
export var move = function (group, point) {
    var matrix = group.getMatrix();
    transform(matrix, [
        ['t', point.x, point.y]
    ]);
    group.setMatrix(matrix);
};
//# sourceMappingURL=math.js.map