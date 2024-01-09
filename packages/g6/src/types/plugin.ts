import { deepMix, each } from '@antv/util';
import { Graph } from './graph';

export interface IPluginBaseConfig {
  container?: HTMLElement | string | null;
  className?: string;
  graph?: Graph;
  [key: string]: any;
}

interface EventMapType {
  [key: string]: any;
}

export abstract class Plugin {
  public key: string;

  static required: boolean = false;

  private events: EventMapType;

  public options: IPluginBaseConfig;

  public destroyed: boolean;

  public graph: Graph;

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
   * Get the default options of the plugin.
   */
  public getDefaultCfgs() {
    return {};
  }

  /**
   * Init.
   * @param graph
   */
  public init(graph: Graph) {
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

export interface PluginRegistry {
  [key: string]: typeof Plugin;
}
