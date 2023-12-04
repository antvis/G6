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
    let res = o[name];
    if (res === 0) res = '0';
    return res || '';
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

  let tangent: vec2 = [0, 0];
  vec2.normalize(tangent, [endPoint.x - startPoint.x, endPoint.y - startPoint.y]);

  if (!tangent || (!tangent[0] && !tangent[1])) {
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
export const pointsToPolygon = (
  points: IPoint[] | ({ x: number; y: number } | string)[],
  z?: boolean,
): string => {
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
  path.forEach((seg) => {
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
};

/**
 * 生成平滑的闭合曲线
 * @param points
 */
export const getClosedSpline = (points: IPoint[]) => {
  if (points.length < 2) {
    throw new Error(`point length must larger than 2, now it's ${points.length}`);
  }
  const first = points[0];
  const second = points[1];
  const last = points[points.length - 1];
  const lastSecond = points[points.length - 2];

  points.unshift(last);
  points.unshift(lastSecond);
  points.push(first);
  points.push(second);

  const closedPath = [];
  for (let i = 1; i < points.length - 2; i += 1) {
    const x0 = points[i - 1].x;
    const y0 = points[i - 1].y;
    const x1 = points[i].x;
    const y1 = points[i].y;
    const x2 = points[i + 1].x;
    const y2 = points[i + 1].y;
    const x3 = i !== points.length - 2 ? points[i + 2].x : x2;
    const y3 = i !== points.length - 2 ? points[i + 2].y : y2;

    const cp1x = x1 + (x2 - x0) / 6;
    const cp1y = y1 + (y2 - y0) / 6;
    const cp2x = x2 - (x3 - x1) / 6;
    const cp2y = y2 - (y3 - y1) / 6;
    closedPath.push(['C', cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }
  closedPath.unshift(['M', last.x, last.y]);
  return closedPath;
};

const vecScaleTo = (v: vec2, length: number) => {
  // Vector with direction of v with specified length
  return vec2.scale([0, 0], vec2.normalize([0, 0], v), length);
};

const unitNormal = (p0: vec2, p1: vec2): vec2 => {
  // Returns the unit normal to the line segment from p0 to p1.
  const n = [p0[1] - p1[1], p1[0] - p0[0]];
  const nLength = Math.sqrt(n[0] * n[0] + n[1] * n[1]);
  if (nLength === 0) {
    throw new Error('p0 should not be equal to p1');
  }
  return [n[0] / nLength, n[1] / nLength];
};

const vecFrom = (p0: vec2, p1: vec2): vec2 => {
  // Vector from p0 to p1
  return [p1[0] - p0[0], p1[1] - p0[1]] as vec2;
};

/**
 * 传入的节点作为多边形顶点，生成有圆角的多边形
 * @param polyPoints 多边形顶点
 * @param padding 在原多边形基础上增加最终轮廓和原多边形的空白间隔
 */
export function roundedHull(polyPoints: vec2[], padding: number) {
  // The rounded hull path around a single point
  const roundedHull1 = (points: vec2[]) => {
    const p1 = [points[0][0], points[0][1] - padding];
    const p2 = [points[0][0], points[0][1] + padding];

    return `M ${p1} A ${padding},${padding},0,0,0,${p2} A ${padding},${padding},0,0,0,${p1}`;
  };

  // The rounded hull path around two points
  const roundedHull2 = (points: vec2[]) => {
    const offsetVector = vec2.scale([0, 0], unitNormal(points[0], points[1]), padding);
    const invOffsetVector = vec2.scale([0, 0], offsetVector, -1);

    const p0 = vec2.add([0, 0], points[0], offsetVector);
    const p1 = vec2.add([0, 0], points[1], offsetVector);
    const p2 = vec2.add([0, 0], points[1], invOffsetVector);
    const p3 = vec2.add([0, 0], points[0], invOffsetVector);

    return `M ${p0} L ${p1} A ${[padding, padding, '0,0,0', p2].join(',')} L ${p3} A ${[
      padding,
      padding,
      '0,0,0',
      p0,
    ].join(',')}`;
  };

  // 特殊情况处理：节点数小于等于2
  if (!polyPoints || polyPoints.length < 1) return '';
  if (polyPoints.length === 1) return roundedHull1(polyPoints);
  if (polyPoints.length === 2) return roundedHull2(polyPoints);

  let segments = new Array(polyPoints.length);

  // Calculate each offset (outwards) segment of the convex hull.
  for (let segmentIndex = 0; segmentIndex < segments.length; ++segmentIndex) {
    const p0 =
      segmentIndex === 0 ? polyPoints[polyPoints.length - 1] : polyPoints[segmentIndex - 1];
    const p1 = polyPoints[segmentIndex];

    // Compute the offset vector for the line segment, with length = padding.
    const offset = vec2.scale([0, 0], unitNormal(p0, p1), padding);

    segments[segmentIndex] = [vec2.add([0, 0], p0, offset), vec2.add([0, 0], p1, offset)];
  }

  const arcData = `A ${[padding, padding, '0,0,0,'].join(',')}`;

  segments = segments.map((segment, index) => {
    let pathFragment = '';
    if (index === 0) {
      pathFragment = `M ${segments[segments.length - 1][1]} `;
    }
    pathFragment += `${arcData + segment[0]} L ${segment[1]}`;
    return pathFragment;
  });

  return segments.join(' ');
}

/**
 * 传入的节点作为多边形顶点，生成平滑的闭合多边形
 * @param polyPoints
 * @param padding
 */
export function paddedHull(polyPoints: vec2[], padding: number) {
  const pointCount = polyPoints.length;

  const smoothHull1 = (points) => {
    // Returns the path for a circular hull around a single point.

    const p1 = [points[0][0], points[0][1] - padding];
    const p2 = [points[0][0], points[0][1] + padding];

    return `M ${p1} A ${[padding, padding, '0,0,0', p2].join(',')} A ${[
      padding,
      padding,
      '0,0,0',
      p1,
    ].join(',')}`;
  };

  // Returns the path for a rounded hull around two points.
  const smoothHull2 = (points) => {
    const v = vecFrom(points[0], points[1]);
    const extensionVec = vecScaleTo(v, padding);

    const extension0 = vec2.add([0, 0], points[0], vec2.scale([0, 0], extensionVec, -1));
    const extension1 = vec2.add([0, 0], points[1], extensionVec);

    const tangentHalfLength = 1.2 * padding;
    const controlDelta = vecScaleTo(vec2.normalize([0, 0], v), tangentHalfLength);
    const invControlDelta = vec2.scale([0, 0], controlDelta, -1);

    const control0 = vec2.add([0, 0], extension0, invControlDelta);
    const control1 = vec2.add([0, 0], extension1, invControlDelta);
    const control3 = vec2.add([0, 0], extension0, controlDelta);

    // return [
    //   ['M', extension0[0], extension0[1]],
    //   ['C', control0, control1, extension1],
    //   ['S', control3, extension0],
    //   'Z',
    // ];
    return `M ${extension0} C ${[control0, control1, extension1].join(',')} S ${[
      control3,
      extension0,
    ].join(',')} Z`;
  };

  // Handle special cases
  if (!polyPoints || pointCount < 1) return '';
  if (pointCount === 1) return smoothHull1(polyPoints);
  if (pointCount === 2) return smoothHull2(polyPoints);

  const hullPoints = polyPoints.map((point, index) => {
    const pNext = polyPoints[(index + 1) % pointCount];
    return {
      p: point,
      v: vec2.normalize([0, 0], vecFrom(point, pNext)),
    };
  });

  // Compute the expanded hull points, and the nearest prior control point for each.
  for (let i = 0; i < hullPoints.length; ++i) {
    const priorIndex = i > 0 ? i - 1 : pointCount - 1;
    const extensionVec = vec2.normalize(
      [0, 0],
      vec2.add([0, 0], hullPoints[priorIndex].v, vec2.scale([0, 0], hullPoints[i].v, -1)),
    );
    hullPoints[i].p = vec2.add(
      [0, 0],
      hullPoints[i].p as vec2,
      vec2.scale([0, 0], extensionVec, padding),
    );
  }

  return hullPoints.map((obj) => {
    const point = obj.p;
    return { x: point[0], y: point[1] };
  });
}

/**
 * get a path of a star with outer radius and inner radius
 * @param outerR 
 * @param innerR 
 * @returns 
 */
export const getStarPath = (outerR: number, innerR: number) => {
  const path = [];
  for (let i = 0; i < 5; i++) {
    const x1 = Math.cos(((18 + 72 * i) / 180) * Math.PI) * outerR;
    const y1 = Math.sin(((18 + 72 * i) / 180) * Math.PI) * outerR;
    const x2 = Math.cos(((54 + 72 * i) / 180) * Math.PI) * innerR;
    const y2 = Math.sin(((54 + 72 * i) / 180) * Math.PI) * innerR;
    if (i === 0) {
      path.push(['M', x1, -y1]);
    } else {
      path.push(['L', x1, -y1]);
    }
    path.push(['L', x2, -y2]);
  }

  path.push(['Z']);
  return path;
}
