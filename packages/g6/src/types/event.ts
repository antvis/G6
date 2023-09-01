import { FederatedPointerEvent } from '@antv/g';
import { ID } from '@antv/graphlib';
import { IGraph } from './graph';

/** Event type enum */
export enum CANVAS_EVENT_TYPE {
  // Pointer events
  'pointerover' = 'pointerover',
  'pointerenter' = 'pointerenter',
  'pointerdown' = 'pointerdown',
  'pointermove' = 'pointermove',
  'pointerup' = 'pointerup',
  'pointerleave' = 'pointerleave',

  // Mouse events
  'click' = 'click',
  'wheel' = 'wheel',

  'dragstart' = 'dragstart',
  'drag' = 'drag',
  'dragend' = 'dragend',
  'dragenter' = 'dragenter',
  'dragleave' = 'dragleave',
  'dragover' = 'dragover',
  'dragout' = 'dragout',
  'drop' = 'drop',
}

export enum DOM_EVENT_TYPE {
  'focus' = 'focus',
  'blur' = 'blur',
  'keyup' = 'keyup',
  'keydown' = 'keydown',
  'keypress' = 'keypress',
}

/** Event type union */
export type ICanvasEventType = `${CANVAS_EVENT_TYPE}`;

export interface IG6GraphEvent
  extends Omit<FederatedPointerEvent, 'currentTarget'> {
  currentTarget: IGraph;
  itemType: 'node' | 'edge' | 'combo' | 'canvas';
  itemId: ID;
  key?: string;
  /** Original event emitted by G */
  gEvent: Event;
}
