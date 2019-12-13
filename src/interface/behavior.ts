
import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { DefaultBehaviorType, G6Event, IG6GraphEvent } from '@g6/types';
import { IGraph } from './graph';
import { IItem } from './item';

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
  public item: IItem
  public canvasX: number
  public canvasY: number
  public wheelDelta: number
  public detail: number
  constructor(type, event) {
    super(type, event)
    this.item = event.item
    this.canvasX = event.canvasX
    this.canvasY = event.canvasY
    this.wheelDelta = event.wheelDelta
    this.detail = event.detail
  }
}