
import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { IG6GraphEvent } from '@g6/types';
import { IItem } from './item';



export class G6GraphEvent extends GraphEvent implements IG6GraphEvent {
  public item: IItem
  constructor(type, event) {
    super(type, event)
    this.item = event.item
  }
}