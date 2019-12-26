import { IG6GraphEvent, Item } from "@g6/types";
declare const _default: {
    getDefaultCfg(): object;
    getEvents(): {
        click?: string;
        mousedown?: string;
        mouseup?: string;
        dblclick?: string;
        contextmenu?: string;
        mouseenter?: string;
        mouseout?: string;
        mouseover?: string;
        mousemove?: string;
        mouseleave?: string;
        dragstart?: string;
        dragend?: string;
        drag?: string;
        dragenter?: string;
        dragleave?: string;
        drop?: string;
        keyup?: string;
        keydown?: string;
        wheel?: string;
        "node:click"?: string;
        "node:contextmenu"?: string;
        "node:dblclick"?: string;
        "node:dragstart"?: string;
        "node:drag"?: string;
        "node:dragend"?: string;
        "node:mouseenter"?: string;
        "node:mouseleave"?: string;
        "node:mousemove"?: string;
        "edge:click"?: string;
        "edge:contextmenu"?: string;
        "edge:dblclick"?: string;
        "edge:mouseenter"?: string;
        "edge:mouseleave"?: string;
        "edge:mousemove"?: string;
        "canvas:mousedown"?: string;
        "canvas:mousemove"?: string;
        "canvas:mouseup"?: string;
        "canvas:click"?: string;
        "canvas:mouseleave"?: string;
    };
    onDragStart(e: IG6GraphEvent): void;
    onDrag(e: IG6GraphEvent): void;
    onDragEnd(e: IG6GraphEvent): void;
    onOutOfRange(e: IG6GraphEvent): void;
    update(item: Item, e: IG6GraphEvent, force: boolean): void;
    /**
     * 更新拖动元素时的delegate
     * @param {Event} e 事件句柄
     * @param {number} x 拖动单个元素时候的x坐标
     * @param {number} y 拖动单个元素时候的y坐标
     */
    updateDelegate(e: any, x: any, y: any): void;
    /**
     * 计算delegate位置，包括左上角左边及宽度和高度
     * @memberof ItemGroup
     * @return {object} 计算出来的delegate坐标信息及宽高
     */
    calculationGroupPosition(): {
        x: number;
        y: number;
        width: number;
        height: number;
        minX: number;
        minY: number;
    };
};
export default _default;
