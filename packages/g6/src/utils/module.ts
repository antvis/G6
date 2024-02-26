/**
 * @file module.ts
 * @description
 * <zh/> Behavior 和 Widget 作为可插拔的模块，具有较高的相似性，因此将其抽象为`模块`
 *
 * <en/> Behavior and Widget are pluggable modules with high similarity, so they are abstracted as `module`
 */
import type EventEmitter from '@antv/event-emitter';
import { getPlugin } from '../registry';
import type { RuntimeContext } from '../runtime/types';
import type { Listener, LooselyModuleOption, ModuleOptions, STDModuleOption } from '../types';
import { arrayDiff } from './diff';

export abstract class ModuleController<Module extends BaseModule<LooselyModuleOption>> {
  protected context: RuntimeContext;

  protected modules: STDModuleOption[] = [];

  protected moduleMap: Record<string, Module> = {};

  public abstract category: 'widget' | 'behavior';

  constructor(context: RuntimeContext) {
    this.context = context;
  }

  public setModules(modules: ModuleOptions) {
    const stdModules = parseModules(this.category, modules) as STDModuleOption[];
    const { enter, update, exit, keep } = arrayDiff(this.modules, stdModules, (module) => module.key);

    this.createModules(enter);
    this.updateModules([...update, ...keep]);
    this.destroyModules(exit);

    this.modules = stdModules;
  }

  protected createModule(module: STDModuleOption) {
    const { category } = this;

    const { key, type } = module;
    const Ctor = getPlugin(category as any, type);
    if (!Ctor) return;

    const instance = new Ctor(this.context, module);
    this.moduleMap[key] = instance;
  }

  protected createModules(modules: STDModuleOption[]) {
    modules.forEach((module) => this.createModule(module));
  }

  protected updateModule(module: STDModuleOption) {
    const { key } = module;
    const instance = this.moduleMap[key];
    if (instance) {
      instance.update(module);
    }
  }

  protected updateModules(modules: STDModuleOption[]) {
    modules.forEach((module) => this.updateModule(module));
  }

  protected destroyModule(key: string) {
    const instance = this.moduleMap[key];
    if (instance) {
      instance.destroy();
      delete this.moduleMap[key];
    }
  }

  protected destroyModules(modules: STDModuleOption[]) {
    modules.forEach(({ key }) => this.destroyModule(key));
  }

  public destroy() {
    Object.values(this.moduleMap).forEach((module) => module.destroy());
    // @ts-expect-error force delete
    delete this.context;
    // @ts-expect-error force delete
    delete this.modules;
    // @ts-expect-error force delete
    delete this.moduleMap;
  }
}

/**
 * <zh/> 模块实例基类
 *
 * <en/> Base class for module instance
 */
export class BaseModule<T extends LooselyModuleOption> {
  protected context: RuntimeContext;

  protected options: Required<T>;

  protected events: [EventEmitter | HTMLElement, string, Listener][] = [];

  public destroyed = false;

  public get defaultOptions(): Partial<T> {
    return {};
  }

  constructor(context: RuntimeContext, options: T) {
    this.context = context;
    this.options = Object.assign({}, this.defaultOptions, options) as Required<T>;
  }

  update(options: Partial<T>) {
    this.options = Object.assign(this.options, options);
  }

  public addEventListener(emitter: EventEmitter | HTMLElement, eventName: string, listener: Listener) {
    if (emitter instanceof HTMLElement) emitter.addEventListener(eventName, listener);
    else emitter.on(eventName, listener);
    this.events.push([emitter, eventName, listener]);
  }

  public removeEventListener(emitter: EventEmitter | HTMLElement, eventName: string, listener: Listener) {
    if (emitter instanceof HTMLElement) emitter.removeEventListener(eventName, listener);
    else emitter.off(eventName, listener);
    this.events = this.events.filter(
      (event) => !(event[0] === emitter && event[1] === eventName && event[2] === listener),
    );
  }

  public destroy() {
    this.events.forEach(([emitter, event, listener]) => {
      if (emitter instanceof HTMLElement) emitter.removeEventListener(event, listener);
      else emitter.off(event, listener);
    });

    // @ts-expect-error force delete
    delete this.context;
    // @ts-expect-error force delete
    delete this.options;

    this.destroyed = true;
  }
}

/**
 * <zh/> 将模块配置项转换为标准模块格式
 *
 * <en/> Convert module options to standard format
 * @param category - <zh/> 模块类型 <en/> module type
 * @param modules - <zh/> 模块配置项 <en/> module options
 * @returns <zh/> 标准模块配置项 <en/> Standard module options
 */
export function parseModules<T extends Record<string, unknown>>(
  category: 'widget' | 'behavior',
  modules: ModuleOptions<T>,
): STDModuleOption<T>[] {
  const counter: Record<string, number> = {};

  const getKey = (type: string) => {
    if (!(type in counter)) counter[type] = 0;
    return `${category}-${type}-${counter[type]++}`;
  };

  return modules.map((module) => {
    if (typeof module === 'string') {
      return { type: module, key: getKey(module) };
    }
    if (module.key) return module;
    return { ...module, key: getKey(module.type) };
  }) as STDModuleOption<T>[];
}
