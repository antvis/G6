import { vec2 } from '@antv/matrix-util';
import { catmullRom2Bezier } from '@antv/path-util';
/**
 * 替换字符串中的字段
 * @param {String} str 模版字符串
 * @param {Object} o json data
 */
var substitute = function (str, o) {
    if (!str || !o) {
        return str;
    }
    return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
        if (match.charAt(0) === '\\') {
            return match.slice(1);
        }
        return o[name] || '';
    });
};
/**
 * 给定坐标获取三次贝塞尔曲线的 M 及 C 值
 * @param points coordinate set
 */
export var getSpline = function (points) {
    var data = [];
    if (points.length < 2) {
        console.warn("point length must largn than 2, now it's " + points.length);
    }
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        var x = point.x, y = point.y;
        data.push(x);
        data.push(y);
    }
    var spliePath = catmullRom2Bezier(data);
    spliePath.unshift(['M', points[0].x, points[0].y]);
    return spliePath;
};
/**
 * 根据起始点、相对位置、偏移量计算控制点
 * @param  {IPoint} startPoint 起始点，包含 x,y
 * @param  {IPoint} endPoint  结束点, 包含 x,y
 * @param  {Number} percent   相对位置,范围 0-1
 * @param  {Number} offset    偏移量
 * @return {IPoint} 控制点，包含 x,y
 */
export var getControlPoint = function (startPoint, endPoint, percent, offset) {
    if (percent === void 0) { percent = 0; }
    if (offset === void 0) { offset = 0; }
    var point = {
        x: (1 - percent) * startPoint.x + percent * endPoint.x,
        y: (1 - percent) * startPoint.y + percent * endPoint.y
    };
    var tangent = [];
    vec2.normalize(tangent, [endPoint.x - startPoint.x, endPoint.x - startPoint.y]);
    if (tangent.length === 0) {
        tangent = [0, 0];
    }
    var perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // 垂直向量
    point.x += perpendicular[0];
    point.y += perpendicular[1];
    return point;
};
/**
 * 点集转化为Path多边形
 * @param {Array} points 点集
 * @param {Boolen} z 是否封闭
 * @return {Array} Path
 */
export var pointsToPolygon = function (points, z) {
    if (!points.length) {
        return '';
    }
    var path = '';
    var str = '';
    for (var i = 0, length_1 = points.length; i < length_1; i++) {
        var item = points[i];
        if (i === 0) {
            str = 'M{x} {y}';
        }
        else {
            str = 'L{x} {y}';
        }
        path += substitute(str, item);
    }
    if (z) {
        path += 'Z';
    }
    return path;
};
//# sourceMappingURL=path.js.map