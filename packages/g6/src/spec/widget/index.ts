export type WidgetOption = Abbr<BuiltInWidget | CustomWidget>[];

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

type CustomWidget = STDWidget;

export interface STDWidget {
  type: string;
  [key: string]: any;
}

type Abbr<R extends STDWidget> = (R & { key?: string }) | R['type'];
