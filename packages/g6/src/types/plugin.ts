import { each, deepMix } from '@antv/util';
import { IGraph } from './graph';

export interface IPluginBaseConfig {
  container?: HTMLDivElement | string | null;
  className?: string;
  graph?: IGraph;
  [key: string]: any;
}

interface EventMapType {
  [key: string]: any;
}

export abstract class Plugin {
  private events: EventMapType;

  public options: IPluginBaseConfig;

  public destroyed: boolean;

  public graph: IGraph;

  /**
   * 插件基类的构造函数
   * @param cfgs 插件的配置项
   */
  constructor(options?: IPluginBaseConfig) {
    this.options = deepMix(this.getDefaultCfgs(), options);
    this.events = {};
    this.destroyed = false;
  }

  /**
   * 获取默认的插件配置
   */
  public getDefaultCfgs() {
    return {};
  }

  /**
   * 初始化方法，供子类实现
   */
  public init(graph: IGraph) {
    this.graph = graph;
  }

  /**
   * 获取插件中的事件和事件处理方法，供子类实现
   */
  public getEvents() {
    return {};
  }
  /**
   * 销毁方法，供子类复写
   */
  public destroy() { }

  /**
   * 销毁插件
   */
  public destroyPlugin() {
    this.destroy();
    const { graph } = this;
    const events = this.events;
    each(events, (v, k) => {
      graph.off(k, v);
    });
    (this.events as EventMapType | null) = null;
    (this.options as IPluginBaseConfig | null) = null;
    this.destroyed = true;
  }
}