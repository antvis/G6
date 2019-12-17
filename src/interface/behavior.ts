
import GraphEvent from '@antv/g-base/lib/event/graph-event';
import Canvas from '@antv/g-canvas/lib/canvas';
import { G6Event, IG6GraphEvent } from '@g6/types';
import { IGraph } from './graph';
import { IEdge, IItemBase, INode } from './item';



export interface IBehavior {
  // constructor: (cfg?: object) => void;
  getEvents: () => { [key in G6Event]?: string };
  shouldBegin: () => boolean;
  shouldUpdate: () => boolean;
  shouldEnd: () => boolean;
  bind: (graph: IGraph) => void;
  unbind: (graph: IGraph) => void;
  getDefaultCfg?: () => object;
  // [key: string]: (...args: DefaultBehaviorType[]) => unknown;
}

export class G6GraphEvent extends GraphEvent implements IG6GraphEvent {
  public item: IItemBase & INode & IEdge;
  public canvasX: number
  public canvasY: number
  public wheelDelta: number
  public detail: number
  public target: IItemBase & INode & IEdge & Canvas;
  constructor(type, event) {
    super(type, event)
    this.item = event.item
    this.canvasX = event.canvasX
    this.canvasY = event.canvasY
    this.wheelDelta = event.wheelDelta
    this.detail = event.detail
  }
}