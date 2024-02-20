import type { BuiltInWidgetOptions } from '../widgets/types';

export type WidgetOptions = Abbr<BuiltInWidgetOptions | CustomWidgetOptions>[];

type CustomWidgetOptions = STDWidgetOptions;

export interface STDWidgetOptions {
  type: string;
  [key: string]: unknown;
}

type Abbr<R extends STDWidgetOptions> = (R & { key?: string }) | R['type'];
