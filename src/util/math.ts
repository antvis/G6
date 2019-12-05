import { IPoint } from '../interface/math'

/**
 * 是否在区间内
 * @param   {number}       value  值
 * @param   {number}       min    最小值
 * @param   {number}       max    最大值
 * @return  {boolean}      bool   布尔
 */
const isBetween = (value: number, min: number, max: number) => value >= min && value <= max

/**
 * 获取两条线段的交点
 * @param  {object}  p0 第一条线段起点
 * @param  {object}  p1 第一条线段终点
 * @param  {object}  p2 第二条线段起点
 * @param  {object}  p3 第二条线段终点
 * @return {object}  交点
 */
export const getLineIntersect = (p0: IPoint, p1: IPoint, p2: IPoint, p3: IPoint): IPoint => {
  const tolerance = 0.001;

  const E: IPoint = {
    x: p2.x - p0.x,
    y: p2.y - p0.y
  };
  const D0: IPoint = {
    x: p1.x - p0.x,
    y: p1.y - p0.y
  };
  const D1: IPoint = {
    x: p3.x - p2.x,
    y: p3.y - p2.y
  };
  const kross: number = D0.x * D1.y - D0.y * D1.x;
  const sqrKross: number = kross * kross;
  const sqrLen0: number = D0.x * D0.x + D0.y * D0.y;
  const sqrLen1: number = D1.x * D1.x + D1.y * D1.y;
  let point: IPoint;
  if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
    const s = (E.x * D1.y - E.y * D1.x) / kross;
    const t = (E.x * D0.y - E.y * D0.x) / kross;
    if (isBetween(s, 0, 1) && isBetween(t, 0, 1)) {
      point = {
        x: p0.x + s * D0.x,
        y: p0.y + s * D0.y
      };
    }
  }
  return point;
}

