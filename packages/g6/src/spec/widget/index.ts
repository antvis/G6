import type { UnknownObject } from '../../types/types';

// TODO needs to fill the options
declare type BuiltInWidget =
  | { type: 'edge-bundling' }
  | { type: 'edge-filter-lens' }
  | { type: 'fisheye' }
  | { type: 'grid' }
  | { type: 'hull' }
  | { type: 'legend' }
  | { type: 'lod-controller' }
  | { type: 'menu' }
  | { type: 'minimap' }
  | { type: 'snapline' }
  | { type: 'timebar' }
  | { type: 'toolbar' }
  | { type: 'tooltip' }
  | { type: 'watermarker' };

export interface BaseWidgetOption {
  type: string;
  [key: string]: unknown;
}

type Abbr<R extends BaseWidgetOption> = (R & { key?: string }) | R['type'];

export type WidgetOption<RegisterWidget extends BaseWidgetOption = BuiltInWidget> = Abbr<
  RegisterWidget | BuiltInWidget
>[];

export interface STDWidgetOption<T extends { type: string; options: UnknownObject }> {
  type: T['type'];
  key?: string;
  options?: T['options'];
}
