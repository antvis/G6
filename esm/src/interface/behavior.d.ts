import GraphEvent from '@antv/g-base/lib/event/graph-event';
import Canvas from '@antv/g-canvas/lib/canvas';
import { G6Event, IG6GraphEvent, Item } from '@g6/types';
import { IGraph } from './graph';
export interface IBehavior {
    getEvents: () => {
        [key in G6Event]?: string;
    };
    shouldBegin: () => boolean;
    shouldUpdate: () => boolean;
    shouldEnd: () => boolean;
    bind: (graph: IGraph) => void;
    unbind: (graph: IGraph) => void;
    getDefaultCfg?: () => object;
}
export declare class G6GraphEvent extends GraphEvent implements IG6GraphEvent {
    item: Item;
    canvasX: number;
    canvasY: number;
    wheelDelta: number;
    detail: number;
    target: Item & Canvas;
    constructor(type: any, event: any);
}
