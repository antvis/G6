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
   * Constructor for the Plugin Base Class.
   * @param options options for the plugin
   */
  constructor(options?: IPluginBaseConfig) {
    this.options = deepMix(this.getDefaultCfgs(), options);
    this.events = {};
    this.destroyed = false;
  }

  /**
   * Update the options for the plugin.
   * @param options
   */
  public updateCfgs(options?: IPluginBaseConfig) {
    this.options = deepMix(this.options, options);
    this.init(this.graph);
  }

  /**
   * Get the defualt options of the plugin.
   */
  public getDefaultCfgs() {
    return {};
  }

  /**
   * Init.
   */
  public init(graph: IGraph) {
    this.graph = graph;
  }

  /**
   * Returns the key(graph event name) value(listener) map.
   * Should be implemented by the plugin.
   */
  public getEvents() {
    return {};
  }
  /**
   * Destroy method, should be implemented by the plugin.
   */
  public destroy() {
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
