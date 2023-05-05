import { Canvas } from '@antv/g';
import { GraphChange, ID } from '@antv/graphlib';
import { CameraAnimationOptions } from './animate';
import { BehaviorOptionsOf } from './behavior';
import { DataChangeType, GraphCore, GraphData } from './data';
import { EdgeModelData } from './edge';
import { ITEM_TYPE, ShapeStyle, SHAPE_TYPE } from './item';
import { LayoutOptions } from './layout';
import { NodeModelData } from './node';
import { ThemeSpecification } from './theme';
import { GraphTransformOptions } from './view';

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
  effectTiming?: CameraAnimationOptions;
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
    data: GraphData;
  }>;
  itemchange: IHook<{
    type: ITEM_TYPE;
    changes: GraphChange<NodeModelData, EdgeModelData>[];
    graphCore: GraphCore;
    theme: ThemeSpecification;
    action?: 'updateNodePosition';
  }>;
  render: IHook<{
    graphCore: GraphCore;
    theme: ThemeSpecification;
    transientCanvas: Canvas;
  }>; // TODO: define param template
  layout: IHook<{ graphCore: GraphCore; options?: LayoutOptions }>; // TODO: define param template
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
  }>;
  itemvisibilitychange: IHook<{
    ids: ID[];
    value?: boolean;
    animate?: boolean;
  }>;
  transientupdate: IHook<{
    type: ITEM_TYPE | SHAPE_TYPE;
    id: ID;
    canvas: Canvas;
    config: {
      style: ShapeStyle;
      action: 'remove' | 'add' | 'update' | undefined;
    };
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
  destroy: IHook<{}>;
  // TODO: more timecycles here
}
