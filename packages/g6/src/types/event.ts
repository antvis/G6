import type {
  DisplayObject,
  Document,
  FederatedEvent,
  FederatedMouseEvent,
  FederatedPointerEvent,
  FederatedWheelEvent,
} from '@antv/g';
import { Edge, ElementType, Node } from './element';

export type Listener = (event: any) => void;

export type Target = Document | Node | Edge | null;

type BaseEvent<T extends Event | FederatedEvent = Event> = Omit<T, 'target'> & {
  targetType: 'canvas' | 'node' | 'edge' | 'combo';
  target: DisplayObject;
};

export interface IElementEvent extends BaseEvent<FederatedMouseEvent> {
  targetType: ElementType;
}

export interface IPointerEvent extends BaseEvent<FederatedPointerEvent> {}

export interface IWheelEvent extends BaseEvent<FederatedWheelEvent> {}

export interface IKeyboardEvent extends BaseEvent<KeyboardEvent> {}

export interface IDragEvent extends IPointerEvent {
  dx: number;
  dy: number;
}
