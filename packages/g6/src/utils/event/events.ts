import type { IAnimation } from '@antv/g';
import type { AnimationType, GraphEvent } from '../../constants';
import type { ElementDatum, ElementType, TransformOptions } from '../../types';

export class BaseEvent {
  constructor(public type: string) {}
}

export class GraphLifeCycleEvent extends BaseEvent {
  constructor(
    type:
      | GraphEvent.BEFORE_RENDER
      | GraphEvent.AFTER_RENDER
      | GraphEvent.BEFORE_DRAW
      | GraphEvent.AFTER_DRAW
      | GraphEvent.BEFORE_LAYOUT
      | GraphEvent.AFTER_LAYOUT
      | GraphEvent.BEFORE_SIZE_CHANGE
      | GraphEvent.AFTER_SIZE_CHANGE,
    public data?: any,
  ) {
    super(type);
  }
}

export class AnimateEvent extends BaseEvent {
  constructor(
    type: GraphEvent.BEFORE_ANIMATE | GraphEvent.AFTER_ANIMATE,
    public animationType: AnimationType,
    public animation: IAnimation | null,
    public data?: any,
  ) {
    super(type);
  }
}

export class ElementLifeCycleEvent extends BaseEvent {
  constructor(
    type:
      | GraphEvent.BEFORE_ELEMENT_CREATE
      | GraphEvent.AFTER_ELEMENT_CREATE
      | GraphEvent.BEFORE_ELEMENT_UPDATE
      | GraphEvent.AFTER_ELEMENT_UPDATE
      | GraphEvent.BEFORE_ELEMENT_DESTROY
      | GraphEvent.AFTER_ELEMENT_DESTROY,
    public elementType: ElementType,
    public data: ElementDatum,
  ) {
    super(type);
  }
}

export class ViewportEvent extends BaseEvent {
  constructor(
    type: GraphEvent.BEFORE_TRANSFORM | GraphEvent.AFTER_TRANSFORM,
    public data: TransformOptions,
  ) {
    super(type);
  }
}
