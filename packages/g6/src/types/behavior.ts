export type BehaviorEvent<T extends Event = Event> = T & {
  targetType: 'canvas' | 'node' | 'edge' | 'combo';
};
