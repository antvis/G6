import { GraphCore, GraphData } from "./data";
import { NodeUserModel } from "./node";
import { ComboUserModel } from "./combo";
import { EdgeUserModel } from "./edge";
import { ITEM_TYPE } from "./item";

export interface IHook<T> {
  name: string;
  listeners: Function[];
  tap: (listener: (param: T) => void) => void;
  unTap: (listener: (param: T) => void) => void;
  emit: (param: T) => void;
}

export interface Hooks {
  'init': IHook<void>;
  // data
  'datachange': IHook<{ data: GraphData }>;
  // data, item
  'additems': IHook<{ type: ITEM_TYPE, models: NodeUserModel[] | EdgeUserModel[] | ComboUserModel[] }>
  // data, item
  'removeitems': IHook<{ type: ITEM_TYPE, ids: (string | number)[] }>
  // data, item
  'updateitems': IHook<{ type: ITEM_TYPE, models: Partial<NodeUserModel>[] | Partial<EdgeUserModel>[] | Partial<ComboUserModel>[] }>

  'render': IHook<{ graphCore: GraphCore }>; // TODO: define param template
  // 'layout': IHook<any>; // TODO: define param template
  // 'updatelayout': IHook<any>; // TODO: define param template
  'modechange': IHook<{ mode: string }>;
  'behaviorchange': IHook<{
    action: 'update' | 'add' | 'remove';
    modes: string[];
    behaviors: (string | { type: string, key: string })[];
  }>;
  // 'viewportchange': IHook<any>; // TODO: define param template
  // 'itemstatechange': IHook<any>; // TODO: define param template
  // 'destroy': IHook<any>; // TODO: define param template
  // TODO: more timecycles here
};
