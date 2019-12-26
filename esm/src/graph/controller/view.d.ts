import { Point } from '@antv/g-base/lib/types';
import { IGraph } from "@g6/interface/graph";
import { Item } from '@g6/types';
export default class ViewController {
    private graph;
    destroyed: boolean;
    constructor(graph: IGraph);
    private getViewCenter;
    fitView(): void;
    getFormatPadding(): number[];
    focusPoint(point: Point): void;
    /**
     * 将 Canvas 坐标转成视口坐标
     * @param canvasX canvas x 坐标
     * @param canvasY canvas y 坐标
     */
    getPointByCanvas(canvasX: number, canvasY: number): Point;
    /**
     * 将页面坐标转成视口坐标
     * @param clientX 页面 x 坐标
     * @param clientY 页面 y 坐标
     */
    getPointByClient(clientX: number, clientY: number): Point;
    /**
     * 将视口坐标转成页面坐标
     * @param x 视口 x 坐标
     * @param y 视口 y 坐标
     */
    getClientByPoint(x: any, y: any): Point;
    /**
     * 将视口坐标转成 Canvas 坐标
     * @param x 视口 x 坐标
     * @param y 视口 y 坐标
     */
    getCanvasByPoint(x: any, y: any): Point;
    /**
     * 将元素移动到画布中心
     * @param item Item 实例或 id
     */
    focus(item: string | Item): void;
    /**
     * 改变 canvas 画布的宽度和高度
     * @param width canvas 宽度
     * @param height canvas 高度
     */
    changeSize(width: number, height: number): void;
    destroy(): void;
}
