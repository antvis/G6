import GraphEvent from '@antv/g-base/lib/event/graph-event';
import {ICanvas} from '@antv/g-canvas/lib/interfaces';
import { G6Event, IG6GraphEvent, Item } from '../types';
import { IGraph } from './graph';

export interface IBehavior {
  getEvents(): {
    [key in G6Event]?: string;
  };
  getDefaultCfg?(): object;
  shouldBegin?(e?: IG6GraphEvent): boolean;
  shouldUpdate?(e?: IG6GraphEvent): boolean;
  shouldEnd?(e?: IG6GraphEvent): boolean;
  bind?(e: IGraph): void;
  unbind?(e: IGraph): void;
}

export class G6GraphEvent extends GraphEvent implements IG6GraphEvent {
  public item: Item;

  public canvasX: number;

  public canvasY: number;

  public wheelDelta: number;

  public detail: number;

  public target!: Item & ICanvas;

  constructor(type: string, event: IG6GraphEvent) {
    super(type, event);
    this.item = event.item;
    this.canvasX = event.canvasX;
    this.canvasY = event.canvasY;
    this.wheelDelta = event.wheelDelta;
    this.detail = event.detail;
  }
}
