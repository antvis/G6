import type { IAnimation } from '@antv/g';
import type { AnimationType, GraphEvent } from '../../constants';
import type {
  ElementDatum,
  ElementType,
  IAnimateEvent,
  IElementLifeCycleEvent,
  IGraphLifeCycleEvent,
  IViewportEvent,
  TransformOptions,
} from '../../types';

export class BaseEvent {
  constructor(public type: string) {}
}

export class GraphLifeCycleEvent extends BaseEvent implements IGraphLifeCycleEvent {
  constructor(
    type:
      | GraphEvent.BEFORE_RENDER
      | GraphEvent.AFTER_RENDER
      | GraphEvent.BEFORE_DRAW
      | GraphEvent.AFTER_DRAW
      | GraphEvent.BEFORE_LAYOUT
      | GraphEvent.AFTER_LAYOUT
      | GraphEvent.BEFORE_STAGE_LAYOUT
      | GraphEvent.AFTER_STAGE_LAYOUT
      | GraphEvent.BEFORE_SIZE_CHANGE
      | GraphEvent.AFTER_SIZE_CHANGE
      | GraphEvent.BATCH_START
      | GraphEvent.BATCH_END
      | GraphEvent.BEFORE_DESTROY
      | GraphEvent.AFTER_DESTROY,
    public data?: any,
  ) {
    super(type);
  }
}

export class AnimateEvent extends BaseEvent implements IAnimateEvent {
  constructor(
    type: GraphEvent.BEFORE_ANIMATE | GraphEvent.AFTER_ANIMATE,
    public animationType: AnimationType,
    public animation: IAnimation | null,
    public data?: any,
  ) {
    super(type);
  }
}

export class ElementLifeCycleEvent extends BaseEvent implements IElementLifeCycleEvent {
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

export class ViewportEvent extends BaseEvent implements IViewportEvent {
  constructor(
    type: GraphEvent.BEFORE_TRANSFORM | GraphEvent.AFTER_TRANSFORM,
    public data: TransformOptions,
  ) {
    super(type);
  }
}
