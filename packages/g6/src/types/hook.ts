import { GraphCore, GraphData } from "./data";

export interface IHook<T> {
  name: string;
  listeners: Function[];
  tap: (listener: (param: T) => void) => void;
  unTap: (listener: (param: T) => void) => void;
  emit: (param: T) => void;
}

export interface Hooks {
  'init': IHook<void>;
  'datachange': IHook<{ data: GraphData }>;
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

  // 'additem': IHook<any>; // TODO: define param template
  // 'removeitem': IHook<any>; // TODO: define param template
  // 'updateitem': IHook<any>; // TODO: define param template
  // 'itemstatechange': IHook<any>; // TODO: define param template

  // 'destroy': IHook<any>; // TODO: define param template
  // TODO: more timecycles here
};
