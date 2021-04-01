import { wrapBehavior, each, deepMix } from '@antv/util';
import { IAbstractGraph as IGraph, IG6GraphEvent } from '@antv/g6-core';

export interface IPluginBaseConfig {
  container?: HTMLDivElement | string | null;
  className?: string;
  graph?: IGraph;
  [key: string]: any;
}

interface EventMapType {
  [key: string]: any;
}

export default abstract class PluginBase {
  private _events: EventMapType;

  public _cfgs: IPluginBaseConfig;

  public destroyed: boolean;

  /**
   * 插件基类的构造函数
   * @param cfgs 插件的配置项
   */
  constructor(cfgs?: IPluginBaseConfig) {
    this._cfgs = deepMix(this.getDefaultCfgs(), cfgs);
    this._events = {};
    this.destroyed = false;
  }

  /**
   * 获取默认的插件配置
   */
  public getDefaultCfgs() {
    return {};
  }

  /**
   * 初始化插件
   * @param graph IGraph 实例
   */
  public initPlugin(graph: IGraph) {
    const self = this;
    self.set('graph', graph);
    const events = self.getEvents();

    const bindEvents: EventMapType = {};

    each(events, (v, k) => {
      const event = wrapBehavior(self, v) as (e: IG6GraphEvent) => void;
      bindEvents[k] = event;
      graph.on(k, event);
    });
    this._events = bindEvents;

    this.init();
  }

  /**
   * 初始化方法，供子类实现
   */
  public abstract init();

  /**
   * 获取插件中的事件和事件处理方法，供子类实现
   */
  public getEvents() {
    return {};
  }

  /**
   * 获取配置项中的某个值
   * @param key 键值
   */
  public get(key: string) {
    return this._cfgs[key];
  }

  /**
   * 将指定的值存储到 cfgs 中
   * @param key 键值
   * @param val 设置的值
   */
  public set(key: string, val: any) {
    this._cfgs[key] = val;
  }

  /**
   * 销毁方法，供子类复写
   */
  public destroy() {}

  /**
   * 销毁插件
   */
  public destroyPlugin() {
    this.destroy();
    const graph = this.get('graph');
    const events = this._events;
    each(events, (v, k) => {
      graph.off(k, v);
    });
    (this._events as EventMapType | null) = null;
    (this._cfgs as IPluginBaseConfig | null) = null;
    this.destroyed = true;
  }
}
