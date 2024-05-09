import type {
  DisplayObject,
  Document,
  FederatedEvent,
  FederatedPointerEvent,
  FederatedWheelEvent,
  IAnimation,
} from '@antv/g';
import type { AnimationType } from '../constants';
import type { ElementDatum } from './data';
import type { Element, ElementType } from './element';
import type { TransformOptions } from './viewport';

export type IEvent =
  | IGraphLifeCycleEvent
  | IAnimateEvent
  | IElementLifeCycleEvent
  | IViewportEvent
  | IPointerEvent
  | IWheelEvent
  | IKeyboardEvent
  | IDragEvent;

export interface IPointerEvent<T extends Target = Target> extends TargetedEvent<FederatedPointerEvent, T> {}

export interface IWheelEvent<T extends Target = Target> extends TargetedEvent<FederatedWheelEvent, T> {}

export interface IKeyboardEvent extends KeyboardEvent {}

export interface IElementEvent extends IPointerEvent<Element> {}

export interface IElementDragEvent extends IDragEvent<Element> {}

export interface IDragEvent<T extends Target = Target> extends TargetedEvent<FederatedPointerEvent, T> {
  dx: number;
  dy: number;
}

export interface IGraphLifeCycleEvent extends NativeEvent {
  data?: any;
}

export interface IElementLifeCycleEvent extends NativeEvent {
  elementType: ElementType;
  data: ElementDatum;
}

export interface IViewportEvent extends NativeEvent {
  data: TransformOptions;
}

export interface IAnimateEvent extends NativeEvent {
  animationType: AnimationType;
  animation: IAnimation | null;
  data?: any;
}

/**
 * <zh/> G6 原生事件
 *
 * <en/> G6 native event
 */
interface NativeEvent {
  type: string;
}

/**
 * <zh/> 具有目标的事件
 *
 * <en/> Event with target
 */
type TargetedEvent<E extends FederatedEvent, T extends Target = Target> = Omit<E, 'target'> & {
  originalTarget: DisplayObject;
  target: T;
  targetType: 'canvas' | 'node' | 'edge' | 'combo';
};

export type Target = Document | Element;
