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

export interface BaseWidget {
  type: string;
  [key: string]: unknown;
}

type Abbr<R extends BaseWidget> = (R & { key?: string }) | R['type'];

export type WidgetOption<RegisterWidget extends BaseWidget = BuiltInWidget> = Abbr<RegisterWidget | BuiltInWidget>[];

export interface STDWidgetOption<T extends { type: string; options: Record<string, unknown> }> {
  type: T['type'];
  key?: string;
  options?: T['options'];
}
