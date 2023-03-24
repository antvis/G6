import { IGraph } from '../../types';
import registry from '../../stdlib';
import { getExtension } from '../../util/extension';
import { Plugin } from "../../types/plugin";
import { IG6GraphEvent } from '../../types/event';

type Listener = (event: IG6GraphEvent) => void;

/**
 * Wraps the listener with error logging.
 * @returns a new listener with error logging.
 */
const wrapListener = (type: string, eventName: string, listener: Listener): Listener => {
  return (event: any) => {
    try {
      listener(event);
    } catch (error) {
      console.error(`G6: Error occurred in "${eventName}" phase of the plugin "${type}"!`)
      throw error;
    }
  };
}

/**
 * Manages free plugin extensions and graph layout.
 */
export class PluginController {
  public extensions: any = [];
  public graph: IGraph;

  /**
   * Plugins on graph.
   * @example
   * { 'minimap': Minimap, 'tooltip': Tooltip }
   */
  private pluginMap: Map<string, Plugin> = new Map();

  /**
   * Listeners added by all current plugins.
   * @example
   * {
   *   'minimap': { 'afterlayout': function },
   * }
   */
  private listenersMap: Record<string, Record<string, Listener>> = {};

  constructor(graph: IGraph<any, any>) {
    this.graph = graph;
    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.graph.hooks.init.tap(this.onPluginInit.bind(this));
  }

  private onPluginInit() {
    // 1. Initialize new behaviors.
    this.pluginMap.clear();
    const { graph } = this;
    const pluginConfigs = graph.getSpecification().plugins || [];
    pluginConfigs.forEach(config => {
      const Plugin = getExtension(config, registry.useLib, 'plugin');
      const options = typeof config === 'string' ? {} : config;
      const type = typeof config === 'string' ? config : (config as any).type;
      const plugin = new Plugin(options);
      plugin.init(graph);
      this.pluginMap.set(type, plugin);
    });

    // 2. Add listeners for each behavior.
    this.listenersMap = {};
    this.pluginMap.forEach((plugin, type) => {
      this.addListeners(type, plugin);
    });
  }

  private addListeners = (type: string, plugin: Plugin) => {
    const events = plugin.getEvents();
    this.listenersMap[type] = {};
    Object.keys(events).forEach(eventName => {
      // Wrap the listener with error logging.
      const listener = wrapListener(type, eventName, events[eventName].bind(plugin));
      this.graph.on(eventName, listener);
      this.listenersMap[type][eventName] = listener;
    });
  }

  destroy() {
  }
}
