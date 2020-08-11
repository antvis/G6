import { vec2 } from '@antv/matrix-util';
import { catmullRom2Bezier } from '@antv/path-util';
import { IPoint } from '../types';

/**
 * 替换字符串中的字段
 * @param {String} str 模版字符串
 * @param {Object} o json data
 */
const substitute = (str: string, o: any): string => {
  if (!str || !o) {
    return str;
  }

  return str.replace(/\\?\{([^{}]+)\}/g, (match: string, name: string) => {
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
export const getSpline = (points: IPoint[]) => {
  const data: number[] = [];

  if (points.length < 2) {
    throw new Error(`point length must largn than 2, now it's ${points.length}`);
  }
  for (const point of points) {
    const { x, y } = point;
    data.push(x);
    data.push(y);
  }

  const spliePath = catmullRom2Bezier(data);
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
export const getControlPoint = (
  startPoint: IPoint,
  endPoint: IPoint,
  percent: number = 0,
  offset: number = 0,
): IPoint => {
  const point: IPoint = {
    x: (1 - percent) * startPoint.x + percent * endPoint.x,
    y: (1 - percent) * startPoint.y + percent * endPoint.y,
  };

  let tangent: number[] = [];
  vec2.normalize(tangent, [endPoint.x - startPoint.x, endPoint.y - startPoint.y]);

  if (tangent.length === 0) {
    tangent = [0, 0];
  }
  const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // 垂直向量
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
export const pointsToPolygon = (points: IPoint[], z?: boolean): string => {
  const { length } = points;
  if (!length) {
    return '';
  }

  let path = '';
  let str = '';

  for (let i = 0; i < length; i++) {
    const item = points[i];
    if (i === 0) {
      str = 'M{x} {y}';
    } else {
      str = 'L{x} {y}';
    }
    path += substitute(str, item);
  }

  if (z) {
    path += 'Z';
  }
  return path;
};

export const pathToPoints = (path: any[]) => {
  const points = [];
  path.forEach(seg => {
    const command = seg[0];
    if (command !== 'A') {
      for (let i = 1; i < seg.length; i = i + 2) {
        points.push([seg[i], seg[i + 1]]);
      }
    } else {
      const length = seg.length;
      points.push([seg[length - 2], seg[length - 1]]);
    }
  });
  return points;
}

/**
 * 生成平滑的闭合曲线
 * @param points
 */
export const getClosedSpline = (points: IPoint[]) => {
  if (points.length < 2) {
    throw new Error(`point length must largn than 2, now it's ${points.length}`);
  }
  let first = points[0];
  let second = points[1];
  let last = points[points.length - 1]
  let lastSecond = points[points.length - 2]

  points.unshift(last)
  points.unshift(lastSecond)
  points.push(first)
  points.push(second)

  let closedPath = []
  for (var i = 1; i < points.length - 2; i += 1) {
    var x0 = points[i - 1].x;
    var y0 = points[i - 1].y;
    var x1 = points[i].x;
    var y1 = points[i].y;
    var x2 = points[i + 1].x;
    var y2 = points[i + 1].y;
    var x3 = i !== points.length - 2 ? points[i + 2].x : x2;
    var y3 = i !== points.length - 2 ? points[i + 2].y : y2;

    var cp1x = x1 + (x2 - x0) / 6;
    var cp1y = y1 + (y2 - y0) / 6;
    var cp2x = x2 - (x3 - x1) / 6;
    var cp2y = y2 - (y3 - y1) / 6;
    closedPath.push(["C", cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }
  closedPath.unshift(['M', last.x, last.y]);
  return closedPath;
}

const vecScaleTo = (v: number[], length: number) => { // Vector with direction of v with specified length
  return vec2.scale([], vec2.normalize([], v), length);
}

const unitNormal = (p0: number[], p1: number[]) => {
  // Returns the unit normal to the line segment from p0 to p1.
  var n = [p0[1] - p1[1], p1[0] - p0[0]];
  var nLength = Math.sqrt(n[0] * n[0] + n[1] * n[1]);
  return [n[0] / nLength, n[1] / nLength];
};

const vecFrom = (p0: number[], p1: number[]) => {               // Vector from p0 to p1
  return [p1[0] - p0[0], p1[1] - p0[1]];
}

/**
 * 生成有圆角的多边形
 * 
 */
export function roundedHull(polyPoints: number[][], padding: number) {
  // The rounded hull path around a single point
  const roundedHull1 = (polyPoints) => {
    var p1 = [polyPoints[0][0], polyPoints[0][1] - padding];
    var p2 = [polyPoints[0][0], polyPoints[0][1] + padding];

    return 'M ' + p1
      + ' A ' + [padding, padding, '0,0,0', p2].join(',')
      + ' A ' + [padding, padding, '0,0,0', p1].join(',');
  };

  // The rounded hull path around two points
  const roundedHull2 = (polyPoints) => {
    var offsetVector = vec2.scale([], unitNormal(polyPoints[0], polyPoints[1]), padding);
    var invOffsetVector = vec2.scale([], offsetVector, -1);

    var p0 = vec2.add([], polyPoints[0], offsetVector);
    var p1 = vec2.add([], polyPoints[1], offsetVector);
    var p2 = vec2.add([], polyPoints[1], invOffsetVector);
    var p3 = vec2.add([], polyPoints[0], invOffsetVector);

    return 'M ' + p0
      + ' L ' + p1 + ' A ' + [padding, padding, '0,0,0', p2].join(',')
      + ' L ' + p3 + ' A ' + [padding, padding, '0,0,0', p0].join(',');
  };

  // 特殊情况处理：节点数小于等于2
  if (!polyPoints || polyPoints.length < 1) return "";
  if (polyPoints.length === 1) return roundedHull1(polyPoints);
  if (polyPoints.length === 2) return roundedHull2(polyPoints);

  var segments = new Array(polyPoints.length);

  // Calculate each offset (outwards) segment of the convex hull.
  for (var segmentIndex = 0; segmentIndex < segments.length; ++segmentIndex) {
    var p0 = (segmentIndex === 0) ? polyPoints[polyPoints.length - 1] : polyPoints[segmentIndex - 1];
    var p1 = polyPoints[segmentIndex];

    // Compute the offset vector for the line segment, with length = padding.
    var offset = vec2.scale([], unitNormal(p0, p1), padding);

    segments[segmentIndex] = [vec2.add([], p0, offset), vec2.add([], p1, offset)];
  }

  var arcData = 'A ' + [padding, padding, '0,0,0,'].join(',');

  segments = segments.map(function (segment, index) {
    var pathFragment = "";
    if (index === 0) {
      var pathFragment = 'M ' + segments[segments.length - 1][1] + ' ';
    }
    pathFragment += arcData + segment[0] + ' L ' + segment[1];

    return pathFragment;
  });

  return segments.join(' ');
}

// Returns the SVG path data string representing the polygon, expanded and smoothed.
export function paddedHull(polyPoints: number[][], padding: number) {
  var pointCount = polyPoints.length;

  const smoothHull1 = (polyPoints) => {
    // Returns the path for a circular hull around a single point.

    var p1 = [polyPoints[0][0], polyPoints[0][1] - padding];
    var p2 = [polyPoints[0][0], polyPoints[0][1] + padding];

    return 'M ' + p1
      + ' A ' + [padding, padding, '0,0,0', p2].join(',')
      + ' A ' + [padding, padding, '0,0,0', p1].join(',');
  };

  // Returns the path for a rounded hull around two points.
  const smoothHull2 = (polyPoints) => {
    var v = vecFrom(polyPoints[0], polyPoints[1]);
    var extensionVec = vecScaleTo(v, padding);

    var extension0 = vec2.add([], polyPoints[0], vec2.scale([], extensionVec, -1));
    var extension1 = vec2.add([], polyPoints[1], extensionVec);

    var tangentHalfLength = 1.2 * padding;
    var controlDelta = vecScaleTo(vec2.normalize([], v), tangentHalfLength);
    var invControlDelta = vec2.scale([], controlDelta, -1);

    var control0 = vec2.add([], extension0, invControlDelta);
    var control1 = vec2.add([], extension1, invControlDelta);
    var control3 = vec2.add([], extension0, controlDelta);

    return 'M ' + extension0
      + ' C ' + [control0, control1, extension1].join(',')
      + ' S ' + [control3, extension0].join(',')
      + ' Z';
  };

  // Handle special cases
  if (!polyPoints || pointCount < 1) return "";
  if (pointCount === 1) return smoothHull1(polyPoints);
  if (pointCount === 2) return smoothHull2(polyPoints);

  let hullPoints = polyPoints.map(function (point, index) {
    var pNext = polyPoints[(index + 1) % pointCount];
    return {
      p: point,
      v: vec2.normalize([], vecFrom(point, pNext))
    };
  });

  // Compute the expanded hull points, and the nearest prior control point for each.
  for (var i = 0; i < hullPoints.length; ++i) {
    var priorIndex = (i > 0) ? (i - 1) : (pointCount - 1);
    var extensionVec = vec2.normalize([], vec2.add([], hullPoints[priorIndex].v, vec2.scale([], hullPoints[i].v, -1)));
    hullPoints[i].p = vec2.add([], hullPoints[i].p, vec2.scale([], extensionVec, padding));
  }

  return hullPoints.map(obj => {
    const point = obj.p
    return { x: point[0], y: point[1] }
  });
}
