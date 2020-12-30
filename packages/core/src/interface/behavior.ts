import { Event as GraphEvent, ICanvas } from '@antv/g-base';
import { G6Event, IG6GraphEvent, IShapeBase, Item } from '../types';
import { IAbstractGraph } from './graph';

export interface IBehavior {
  type: string;
  getEvents(): {
    [key in G6Event]?: string;
  };
  updateCfg(cfg: object): {};
  getDefaultCfg?(): object;
  shouldBegin?(e?: IG6GraphEvent): boolean;
  shouldUpdate?(e?: IG6GraphEvent): boolean;
  shouldEnd?(e?: IG6GraphEvent): boolean;
  bind?(e: IAbstractGraph): void;
  unbind?(e: IAbstractGraph): void;
}

export class G6GraphEvent extends GraphEvent implements IG6GraphEvent {
  public item: Item;

  public canvasX: number;

  public canvasY: number;

  public clientX: number;

  public clientY: number;

  public wheelDelta: number;

  public detail: number;

  public target!: IShapeBase & ICanvas;

  constructor(type: string, event: IG6GraphEvent) {
    super(type, event);
    this.item = event.item;
    this.canvasX = event.canvasX;
    this.canvasY = event.canvasY;
    this.wheelDelta = event.wheelDelta;
    this.detail = event.detail;
  }
}
