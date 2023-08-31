import { ID } from '@antv/graphlib';
import { ITEM_TYPE } from '../../types/item';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';

export interface HoverActivateOptions {
  /**
   * The time in milliseconds to throttle moving. Useful to avoid the frequent calculation.
   * Defaults to 0.
   */
  throttle?: number;
  /**
   * The state name to be considered as "selected".
   * Defaults to "selected".
   */
  activateState?: string;
  /**
   * Item types to be able to acitvate.
   * Defaults to `["node", "edge"]`.
   * Should be an array of "node", "edge", or "combo".
   */
  itemTypes: Array<'node' | 'edge' | 'combo'>;
  /**
   * The event name to trigger when drag end.
   */
  eventName?: string;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: Required<HoverActivateOptions> = {
  throttle: 16,
  activateState: 'active',
  eventName: '',
  itemTypes: ['node', 'edge', 'combo'],
  shouldBegin: () => true,
};

export class HoverActivate extends Behavior {
  private currentItemInfo: { id: ID; itemType: ITEM_TYPE };

  constructor(options: Partial<HoverActivateOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    super(finalOptions);
  }

  getEvents = () => {
    return {
      'node:pointerenter': this.onPointerEnter,
      'node:pointerleave': this.onPointerLeave,
      'edge:pointerenter': this.onPointerEnter,
      'edge:pointerleave': this.onPointerLeave,
      'combo:pointerenter': this.onPointerEnter,
      'combo:pointerleave': this.onPointerLeave,
    };
  };

  public onPointerEnter(event: IG6GraphEvent) {
    const { itemId, itemType } = event;
    const { graph, currentItemInfo } = this;
    const { activateState, itemTypes, eventName } = this.options;

    if (currentItemInfo && itemTypes.includes(currentItemInfo.itemType)) {
      graph.setItemState(currentItemInfo.id, activateState, false);
    }

    if (!itemTypes.includes(itemType as ITEM_TYPE)) return;
    graph.setItemState(itemId, activateState, true);
    this.currentItemInfo = { id: itemId, itemType: itemType as ITEM_TYPE };

    // Emit event.
    if (eventName) {
      this.graph.emit(eventName, {
        itemId,
        itemType,
        state: activateState,
        action: 'pointerenter',
      });
    }
  }

  public onPointerLeave(event: IG6GraphEvent) {
    const { itemId, itemType } = event;
    const { activateState, itemTypes, eventName } = this.options;
    if (!itemTypes.includes(itemType as ITEM_TYPE)) return;
    const { graph } = this;
    graph.setItemState(itemId, activateState, false);
    this.currentItemInfo = undefined;

    // Emit event.
    if (eventName) {
      this.graph.emit(eventName, {
        itemId,
        itemType,
        state: activateState,
        action: 'pointerleave',
      });
    }
  }
}
