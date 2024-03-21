import type { Document, FederatedMouseEvent } from '@antv/g';
import type { BehaviorEvent } from './behavior';
import { Edge, ElementType, Node } from './element';

export type Listener = (event: any) => void;

export type Target = Document | Node | Edge | null;

export interface G6ElementEvent extends BehaviorEvent<FederatedMouseEvent> {
  targetType: ElementType;
}
