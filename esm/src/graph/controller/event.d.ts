import { IGraph } from '@g6/interface/graph';
import { IG6GraphEvent } from '@g6/types';
export default class EventController {
    private graph;
    private extendEvents;
    private canvasHandler;
    private dragging;
    private preItem;
    constructor(graph: IGraph);
    private initEvents;
    private isViewportChanged;
    private getItemRoot;
    /**
     * 处理 canvas 事件
     * @param evt 事件句柄
     */
    protected onCanvasEvents(evt: IG6GraphEvent): void;
    /**
     * 处理扩展事件
     * @param evt 事件句柄
     */
    protected onExtendEvents(evt: IG6GraphEvent): void;
    /**
     * 处理滚轮事件
     * @param evt 事件句柄
     */
    protected onWheelEvent(evt: IG6GraphEvent): void;
    /**
     * 处理鼠标移动的事件
     * @param evt 事件句柄
     * @param type item 类型
     */
    private handleMouseMove;
    /**
     * 在 graph 上面 emit 事件
     * @param itemType item 类型
     * @param eventType 事件类型
     * @param evt 事件句柄
     */
    private emitCustomEvent;
    destroy(): void;
}
