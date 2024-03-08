import type { DisplayObject, FederatedEvent } from '@antv/g';

export type BehaviorEvent<T extends Event | FederatedEvent = Event> = Omit<T, 'target'> & {
  targetType: 'canvas' | 'node' | 'edge' | 'combo';
  target: DisplayObject;
};
