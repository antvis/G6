import { Canvas } from '@antv/g';
import { GraphChange, ID } from '@antv/graphlib';
import { CameraAnimationOptions } from './animate';
import { BehaviorOptionsOf } from './behavior';
import { DataChangeType, DataConfig, GraphCore } from './data';
import { EdgeModel, EdgeModelData } from './edge';
import { ITEM_TYPE, ShapeStyle, SHAPE_TYPE } from './item';
import { LayoutOptions } from './layout';
import { NodeModel, NodeModelData } from './node';
import { ThemeSpecification } from './theme';
import { GraphTransformOptions } from './view';
import { ComboModel } from './combo';
import { Plugin as PluginBase } from './plugin';
import { ComboMapper, EdgeMapper, NodeMapper } from './spec';

export interface IHook<T> {
  name: string;
  listeners: Function[];
  tap: (listener: (param: T) => void) => void;
  unTap: (listener: (param: T) => void) => void;
  emit: (param: T) => void;
  emitLinearAsync: (param: T) => Promise<void>;
}

export type ViewportChangeHookParams = {
  transform: GraphTransformOptions;
  effectTiming?: Partial<CameraAnimationOptions>;
  tileLodSize?: number;
};

export interface Hooks {
  init: IHook<{
    canvases: {
      background: Canvas;
      main: Canvas;
      transient: Canvas;
    };
  }>;
  // data
  datachange: IHook<{
    type: DataChangeType;
    data: DataConfig;
  }>;
  itemchange: IHook<{
    type: ITEM_TYPE;
    changes: GraphChange<NodeModelData, EdgeModelData>[];
    graphCore: GraphCore;
    theme: ThemeSpecification;
    upsertAncestors?: boolean;
    animate?: boolean;
    action?: 'updatePosition';
    callback?: (model: NodeModel | EdgeModel | ComboModel) => void;
  }>;
  render: IHook<{
    graphCore: GraphCore;
    theme: ThemeSpecification;
    transientCanvas: Canvas;
    tileOptimize?: {
      tileFirstRender?: boolean | number;
      tileFirstRenderSize?: number;
    };
  }>; // TODO: define param template
  layout: IHook<{
    graphCore: GraphCore;
    options?: LayoutOptions;
    animate?: boolean;
  }>; // TODO: define param template
  // 'updatelayout': IHook<any>; // TODO: define param template
  modechange: IHook<{ mode: string }>;
  behaviorchange: IHook<{
    action: 'update' | 'add' | 'remove';
    modes: string[];
    behaviors: (string | BehaviorOptionsOf<{}>)[];
  }>;
  itemstatechange: IHook<{
    ids: ID[];
    states?: string[];
    value?: boolean;
    action?: string;
    enableStack?: boolean;
    changes?: any;
  }>;
  itemvisibilitychange: IHook<{
    ids: ID[];
    graphCore?: GraphCore;
    value?: boolean;
    animate?: boolean;
    action?: string;
    enableStack?: boolean;
    changes?: any;
    keepKeyShape?: boolean;
    shapeIds?: string[];
  }>;
  itemzindexchange: IHook<{
    ids: ID[];
    action: 'front' | 'back';
    graphCore: GraphCore;
    enableStack?: boolean;
    changes?: any;
  }>;
  transientupdate: IHook<{
    type: ITEM_TYPE | SHAPE_TYPE;
    id: ID;
    canvas: Canvas;
    config: {
      style?: ShapeStyle;
      action?: 'remove' | 'add' | 'update';
      /** For type: 'edge' */
      drawSource?: boolean;
      /** For type: 'edge' */
      drawTarget?: boolean;
      /** Only shape with id in shapeIds will be cloned while type is ITEM_TYPE. If shapeIds is not assigned, the whole item will be cloned. */
      shapeIds?: string[];
      /** Whether show the shapes in shapeIds. True by default. */
      visible?: boolean;
      upsertAncestors?: boolean;
    };
    graphCore: GraphCore;
  }>;
  // TODO: define param template
  viewportchange: IHook<ViewportChangeHookParams>;
  pluginchange: IHook<{
    action: 'update' | 'add' | 'remove';
    plugins: (
      | string
      | { key: string; type: string; [cfgName: string]: unknown }
      | PluginBase
    )[];
  }>;
  themechange: IHook<{
    theme?: ThemeSpecification;
    canvases?: {
      background: Canvas;
      main: Canvas;
      transient: Canvas;
    };
  }>;
  mapperchange: IHook<{
    type: ITEM_TYPE;
    mapper: NodeMapper | EdgeMapper | ComboMapper;
  }>;
  treecollapseexpand: IHook<{
    ids: ID[];
    action: 'collapse' | 'expand';
    graphCore: GraphCore;
    animate?: boolean;
  }>;
  destroy: IHook<{}>;
}
