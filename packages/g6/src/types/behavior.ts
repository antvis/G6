import { CanvasEvent, ComboEvent, CommonEvent, EdgeEvent, NodeEvent } from '../constants';
import type { STDBehaviorOption } from '../spec/behavior';
import { Loose } from './enum';
import type { Listener } from './event';

export type BehaviorEventName =
  | Loose<CommonEvent>
  | `canvas:${CanvasEvent}`
  | `node:${NodeEvent}`
  | `edge:${EdgeEvent}`
  | `combo:${ComboEvent}`;

export type BehaviorEvent<T extends Event = Event> = T & {
  targetType: 'canvas' | 'node' | 'edge' | 'combo';
};

export interface Behavior {
  setOptions(options: Partial<STDBehaviorOption>): void;
  getEvents(): Partial<Record<BehaviorEventName, Listener>>;
  destroy(): void;
}
