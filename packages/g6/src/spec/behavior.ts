import type { BuiltInBehaviorOptions } from '../behaviors/types';

export type BehaviorOptions = Abbr<BuiltInBehaviorOptions | CustomBehaviorOptions>[];

type CustomBehaviorOptions = STDBehaviorOptions;

export interface STDBehaviorOptions {
  type: string;
  [key: string]: unknown;
}

type Abbr<R extends STDBehaviorOptions> = (R & { key?: string }) | R['type'];
