import { GraphData } from "./data";

export interface IHook<T> {
  name: string;
  listeners: Function[];
  tap: (listener: (param: T) => void) => void;
  unTap: (listener: (param: T) => void) => void;
  emit: (param: T) => void;
}

export interface Hooks {
  'init': IHook<void>,
  'datachange': IHook<{ data: GraphData }>,
  'render': IHook<any>, // TODO: define param template
  'layout': IHook<any>, // TODO: define param template
  'modechange': IHook<{ mode: string }>,
  'behaviorchange': IHook<{
    action: 'update' | 'add' | 'remove',
    modes: string[],
    behaviors: BehaviorCfg[]
  }>
};
export const hookNames: (keyof Hooks)[] = ['init', 'datachange', 'render', 'layout', 'modechange', 'behaviorchange'];