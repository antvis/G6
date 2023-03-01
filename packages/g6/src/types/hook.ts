import { DataChangeType, GraphCore, GraphData } from "./data";
import { NodeModelData } from "./node";
import { EdgeModelData } from "./edge";
import { ITEM_TYPE } from "./item";
import { GraphChange, ID } from "@antv/graphlib";
import { LayoutOptions } from "./layout";

export interface IHook<T> {
  name: string;
  listeners: Function[];
  tap: (listener: (param: T) => void) => void;
  unTap: (listener: (param: T) => void) => void;
  emit: (param: T) => void;
  emitLinearAsync: (param: T) => Promise<void>;
}

export interface Hooks {
  init: IHook<void>;
  // data
  'datachange': IHook<{
    type: DataChangeType;
    data: GraphData
  }>;
  'itemchange': IHook<{
    type: ITEM_TYPE;
    changes: GraphChange<NodeModelData, EdgeModelData>[];
    graphCore: GraphCore;
  }>;
  render: IHook<{ graphCore: GraphCore }>; // TODO: define param template
  layout: IHook<{ graphCore: GraphCore; options?: LayoutOptions }>; // TODO: define param template
  // 'updatelayout': IHook<any>; // TODO: define param template
  modechange: IHook<{ mode: string }>;
  behaviorchange: IHook<{
    action: 'update' | 'add' | 'remove';
    modes: string[];
    behaviors: (string | { type: string; key: string })[];
  }>;
  'itemstatechange': IHook<{
    ids: ID[],
    states?: string[],
    value?: boolean
  }>; // TODO: define param template
  // 'viewportchange': IHook<any>; // TODO: define param template
  // 'destroy': IHook<any>; // TODO: define param template
  // TODO: more timecycles here
}
