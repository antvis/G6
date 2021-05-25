import * as pathUtil from '@antv/path-util';
import { Category, Linear } from '@antv/scale';
import { map, each, isEqual, head, isArray } from '@antv/util';

type Point = [number, number];

/**
 * 点数组转 path
 * @param points
 */
function pointsToPath(points: Point[]): any[][] {
  return map(points, (p: Point, idx: number) => {
    const command = idx === 0 ? 'M' : 'L';
    const [x, y] = p;
    return [command, x, y];
  });
}

/**
 * 将点连接成路径 path
 * @param points
 */
export function getLinePath(points: Point[]): any[][] {
  return pointsToPath(points);
}

/**
 * 将点连成平滑的曲线
 * @param points
 */
export function getSmoothLinePath(points: Point[]): any[][] {
  if (points.length <= 2) {
    // 两点以内直接绘制成路径
    return getLinePath(points);
  }

  const data = [];

  each(points, (p) => {
    // 当前点和上一个点一样的时候，忽略掉
    if (!isEqual(p, data.slice(data.length - 2))) {
      data.push(p[0], p[1]);
    }
  });

  const path = pathUtil.catmullRom2Bezier(data, false);
  const [x, y] = head(points);
  path.unshift(['M', x, y]);

  return path;
}

/**
 * 将数据转成 path，利用 scale 的归一化能力
 * @param data
 * @param width
 * @param height
 * @param smooth
 */
export function dataToPath(
  data: number[],
  width: number,
  height: number,
  smooth: boolean = true,
): any[][] {
  // 利用 scale 来获取 y 上的映射
  const y = new Linear({
    values: data,
  });

  const x = new Category({
    values: map(data, (v, idx) => idx),
  });

  const points = map(data, (v: number, idx: number) => {
    return [x.scale(idx) * width, height - y.scale(v) * height] as [number, number];
  });

  return smooth ? getSmoothLinePath(points) : getLinePath(points);
}

export function dataToRectPath(data: number[], width: number, height: number, barWidth: number = 5): any[][] {
  // 利用 scale 来获取 y 上的映射
  const y = new Linear({
    values: data,
  });

  const x = new Category({
    values: map(data, (v, idx) => idx),
  });

  const points = map(data, (v: number, idx: number) => {
    return [x.scale(idx) * width, height - y.scale(v) * height] as [number, number];
  });

  const rectPoints = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const param = {
      x: point[0],
      y: point[1],
      y0: height,
      size: barWidth,
    };
    const rectPoint = getRectPoints(param);
    rectPoints.push(...rectPoint);
  }

  return getRectPath(rectPoints);
}

/**
 * 获得 area 面积的横向连接线的 px 位置
 * @param data
 * @param width
 * @param height
 */
export function getAreaLineY(data: number[], height: number): number {
  const y = new Linear({
    values: data,
  });

  const lineY = Math.max(0, y.min);
  return height - y.scale(lineY) * height;
}

/**
 * 线 path 转 area path
 * @param path
 * @param width
 * @param height
 */
export function linePathToAreaPath(
  path: any[][],
  width: number,
  height: number,
  data: number[],
): any[][] {
  const areaPath = [...path];

  const lineYPx = getAreaLineY(data, height);

  areaPath.push(['L', width, lineYPx]);
  areaPath.push(['L', 0, lineYPx]);
  areaPath.push(['Z']);

  return areaPath;
}

/**
 * @ignore
 * 根据数据点生成矩形的四个关键点
 * @param pointInfo 数据点信息
 * @returns rect points 返回矩形四个顶点信息
 */
export function getRectPoints(pointInfo): { x: number; y: number }[] {
  const { x, y, y0, size } = pointInfo;
  // 有 4 种情况，
  // 1. x, y 都不是数组
  // 2. y是数组，x不是
  // 3. x是数组，y不是
  // 4. x, y 都是数组
  let yMin;
  let yMax;
  if (isArray(y)) {
    [yMin, yMax] = y;
  } else {
    yMin = y0;
    yMax = y;
  }

  let xMin;
  let xMax;
  if (isArray(x)) {
    [xMin, xMax] = x;
  } else {
    xMin = x - size / 2;
    xMax = x + size / 2;
  }

  const points = [
    { x: xMin, y: yMin },
    { x: xMin, y: yMax },
  ];

  // 矩形的四个关键点，结构如下（左下角顺时针连接）
  // 1 ---- 2
  // |      |
  // 0 ---- 3
  points.push({ x: xMax, y: yMax }, { x: xMax, y: yMin });

  return points;
}

/**
 * @ignore
 * 根据矩形关键点绘制 path
 * @param points 关键点数组
 * @param isClosed path 是否需要闭合
 * @returns 返回矩形的 path
 */
export function getRectPath(points: { x: number; y: number }[], isClosed: boolean = true) {
  const path = [];
  const firstPoint = points[0];
  path.push(['M', firstPoint.x, firstPoint.y]);
  for (let i = 1, len = points.length; i < len; i++) {
    path.push(['L', points[i].x, points[i].y]);
  }
  // 对于 shape="line" path 不应该闭合，否则会造成 lineCap 绘图属性失效
  if (isClosed) {
    path.push(['L', firstPoint.x, firstPoint.y]); // 需要闭合
    path.push(['z']);
  }
  return path;
}
