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
      style: ShapeStyle;
      action: 'remove' | 'add' | 'update' | undefined;
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
  treecollapseexpand: IHook<{
    ids: ID[];
    action: 'collapse' | 'expand';
    graphCore: GraphCore;
    animate?: boolean;
  }>;
  destroy: IHook<{}>;
}
