import type { BuiltInBehaviorOptions } from '../behaviors/types';

export type BehaviorOptions = Abbr<BuiltInBehaviorOptions | CustomBehaviorOption>[];

export type STDBehaviorOption = { type: string; key: string; [key: string]: unknown };

export type CustomBehaviorOption = { type: string; key?: string; [key: string]: unknown };

type Abbr<R extends CustomBehaviorOption> = (R & { key?: string }) | R['type'];
