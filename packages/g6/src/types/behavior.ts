import type { FederatedEvent } from '@antv/g';

export type BehaviorEvent<T extends Event | FederatedEvent = Event> = T & {
  targetType: 'canvas' | 'node' | 'edge' | 'combo';
};
