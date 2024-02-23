import type { STDBehaviorOption } from '../spec/behavior';

export type BehaviorEvent<T extends Event = Event> = T & {
  targetType: 'canvas' | 'node' | 'edge' | 'combo';
};

export interface Behavior {
  update(options: Partial<STDBehaviorOption>): void;
  destroy(): void;
}
