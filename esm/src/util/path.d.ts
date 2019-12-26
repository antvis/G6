import { IPoint } from '@g6/types';
/**
 * 给定坐标获取三次贝塞尔曲线的 M 及 C 值
 * @param points coordinate set
 */
export declare const getSpline: (points: IPoint[]) => any[][];
/**
 * 根据起始点、相对位置、偏移量计算控制点
 * @param  {IPoint} startPoint 起始点，包含 x,y
 * @param  {IPoint} endPoint  结束点, 包含 x,y
 * @param  {Number} percent   相对位置,范围 0-1
 * @param  {Number} offset    偏移量
 * @return {IPoint} 控制点，包含 x,y
 */
export declare const getControlPoint: (startPoint: IPoint, endPoint: IPoint, percent?: number, offset?: number) => IPoint;
/**
 * 点集转化为Path多边形
 * @param {Array} points 点集
 * @param {Boolen} z 是否封闭
 * @return {Array} Path
 */
export declare const pointsToPolygon: (points: IPoint[], z?: boolean) => string;
