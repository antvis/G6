import type { BaseStyleProps, IAnimation } from '@antv/g';
import type { ID } from '@antv/graphlib';
import type { AnimationTypeEnum, GraphEvent } from '../constants';
import type { GraphData } from '../spec';
import type { Positions, States, ZIndex } from '../types';

export class Event {
  constructor(public type: string) {}
}

export class DrawEvent extends Event {
  constructor(type: GraphEvent.BEFORE_DRAW | GraphEvent.AFTER_DRAW) {
    super(type);
  }
}

export class AnimateEvent extends Event {
  constructor(
    type: GraphEvent.BEFORE_ANIMATE | GraphEvent.AFTER_ANIMATE,
    public animationType: AnimationTypeEnum,
    public animation: IAnimation,
    public data?: any,
  ) {
    super(type);
  }
}

export class ElementLifeCycleEvent extends Event {
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

export class ElementStateChangeEvent extends Event {
  constructor(
    type: GraphEvent.BEFORE_ELEMENT_STATE_CHANGE | GraphEvent.AFTER_ELEMENT_STATE_CHANGE,
    public states: States,
  ) {
    super(type);
  }
}

export class ElementTranslateEvent extends Event {
  constructor(
    type: GraphEvent.BEFORE_ELEMENT_TRANSLATE | GraphEvent.AFTER_ELEMENT_TRANSLATE,
    public positions: Positions,
  ) {
    super(type);
  }
}

export class ElementVisibilityChangeEvent extends Event {
  constructor(
    type: GraphEvent.BEFORE_ELEMENT_VISIBILITY_CHANGE | GraphEvent.AFTER_ELEMENT_VISIBILITY_CHANGE,
    public ids: ID[],
    public visibility: BaseStyleProps['visibility'],
  ) {
    super(type);
  }
}

export class ElementZIndexChangeEvent extends Event {
  constructor(
    type: GraphEvent.BEFORE_ELEMENT_Z_INDEX_CHANGE | GraphEvent.AFTER_ELEMENT_Z_INDEX_CHANGE,
    public id: ID,
    public zIndex: ZIndex,
  ) {
    super(type);
  }
}
