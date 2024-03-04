import type { BaseStyleProps, IAnimation } from '@antv/g';
import type { ID } from '@antv/graphlib';
import type { AnimationType, GraphEvent } from '../../constants';
import type { GraphData } from '../../spec';
import type { Positions, States, TransformOptions, ZIndex } from '../../types';

export class BaseEvent {
  constructor(public type: string) {}
}

export class RenderEvent extends BaseEvent {
  constructor(type: GraphEvent.BEFORE_RENDER | GraphEvent.AFTER_RENDER) {
    super(type);
  }
}

export class DrawEvent extends BaseEvent {
  constructor(type: GraphEvent.BEFORE_DRAW | GraphEvent.AFTER_DRAW) {
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
    public data: GraphData,
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

export class ElementStateChangeEvent extends BaseEvent {
  constructor(
    type: GraphEvent.BEFORE_ELEMENT_STATE_CHANGE | GraphEvent.AFTER_ELEMENT_STATE_CHANGE,
    public states: States,
  ) {
    super(type);
  }
}

export class ElementTranslateEvent extends BaseEvent {
  constructor(
    type: GraphEvent.BEFORE_ELEMENT_TRANSLATE | GraphEvent.AFTER_ELEMENT_TRANSLATE,
    public positions: Positions,
  ) {
    super(type);
  }
}

export class ElementVisibilityChangeEvent extends BaseEvent {
  constructor(
    type: GraphEvent.BEFORE_ELEMENT_VISIBILITY_CHANGE | GraphEvent.AFTER_ELEMENT_VISIBILITY_CHANGE,
    public ids: ID[],
    public visibility: BaseStyleProps['visibility'],
  ) {
    super(type);
  }
}

export class ElementZIndexChangeEvent extends BaseEvent {
  constructor(
    type: GraphEvent.BEFORE_ELEMENT_Z_INDEX_CHANGE | GraphEvent.AFTER_ELEMENT_Z_INDEX_CHANGE,
    public id: ID,
    public zIndex: ZIndex,
  ) {
    super(type);
  }
}
