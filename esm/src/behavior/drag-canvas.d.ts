import { IG6GraphEvent } from "@g6/types";
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
    updateViewport(e: IG6GraphEvent): void;
    onMouseDown(e: IG6GraphEvent): void;
    onMouseMove(e: IG6GraphEvent): void;
    onMouseUp(e: IG6GraphEvent): void;
    endDrag(): void;
    onOutOfRange(e: IG6GraphEvent): void;
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(): void;
};
export default _default;
