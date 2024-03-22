import type { DisplayObject, FederatedEvent } from '@antv/g';

export type PluginEvent<T extends Event | FederatedEvent = Event> = Omit<T, 'target'> & {
  targetType: 'canvas' | 'node' | 'edge' | 'combo';
  target: DisplayObject;
};
