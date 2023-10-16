import { uniqueId } from '@antv/util';
import registry from '../../stdlib';
import { IGraph } from '../../types';
import { getExtension } from '../../util/extension';
import { Plugin as PluginBase } from '../../types/plugin';
import { IG6GraphEvent } from '../../types/event';

type Listener = (event: IG6GraphEvent) => void;

/**
 * Wraps the listener with error logging.
 * @returns a new listener with error logging.
 */
const wrapListener = (
  type: string,
  eventName: string,
  listener: Listener,
): Listener => {
  return (event: any) => {
    try {
      listener(event);
    } catch (error) {
      console.error(
        `G6: Error occurred in "${eventName}" phase of the plugin "${type}"!`,
      );
      throw error;
    }
  };
};

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
  private pluginMap: Map<string, { type: string; plugin: PluginBase }> =
    new Map();

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
    this.graph.hooks.pluginchange.tap(this.onPluginChange.bind(this));
    this.graph.hooks.destroy.tap(this.onDestroy.bind(this));
  }

  private onPluginInit() {
    // 1. Initialize new behaviors.
    this.pluginMap.clear();
    const { graph } = this;
    const pluginConfigs = graph.getSpecification().plugins || [];
    const requiredPlugins = ['auto-lod'];
    pluginConfigs.concat(requiredPlugins).forEach(this.initPlugin.bind(this));

    // 2. Add listeners for each behavior.
    this.listenersMap = {};
    this.pluginMap.forEach((item, key) => {
      const { plugin } = item;
      this.addListeners(key, plugin);
    });
  }

  private initPlugin(config) {
    const { graph } = this;
    if (typeof config.init === 'function' && config.options) {
      config.init(graph);
      const key = config.key || config.options?.key || `plugin-${uniqueId()}`;
      this.pluginMap.set(key, { type: key, plugin: config });
      return { key, plugin: config };
    }
    const Plugin = getExtension(config, registry.useLib, 'plugin');

    const options = typeof config === 'string' ? {} : config;
    const type = typeof config === 'string' ? config : config.type;
    const key =
      typeof config === 'string'
        ? config
        : config.key || config.options?.key || type;
    if (!Plugin) {
      throw new Error(
        `Plugin ${type} not found, please make sure you have registered it first`,
      );
    }
    const plugin = new Plugin({ ...options, key });
    plugin.init(graph);
    this.pluginMap.set(key, { type, plugin });
    return { key, type, plugin };
  }

  private onPluginChange(params: {
    action: 'update' | 'add' | 'remove';
    plugins: (string | { key: string; type: string; options: any })[];
  }) {
    const { action, plugins: pluginCfgs } = params;
    if (action === 'add') {
      pluginCfgs.forEach((config) => {
        const { key, plugin } = this.initPlugin(config);
        this.addListeners(key, plugin, false);
      });
      return;
    }

    if (action === 'remove') {
      pluginCfgs.forEach((config) => {
        const key =
          (typeof config === 'string' ? config : config.key) ||
          (
            config as {
              key: string;
              type: string;
              options: any;
            }
          ).options?.key ||
          (
            config as {
              key: string;
              type: string;
              options: any;
            }
          ).type;
        const item = this.pluginMap.get(key);
        if (!item) return;
        const { plugin } = item;
        this.removeListeners(key);
        plugin.destroy();
        this.pluginMap.delete(key);
      });
      return;
    }

    if (action === 'update') {
      pluginCfgs.forEach((config) => {
        if (typeof config === 'string') return;
        const key = config.key || config.type;
        const item = this.pluginMap.get(key);
        if (!item) return;
        const { plugin } = item;
        plugin.updateCfgs(config);
        this.removeListeners(key);
        this.addListeners(key, plugin, false);
      });
      return;
    }
  }

  /**
   * Check if a plugin with the specified plugin key exists.
   * @param {string} pluginKey The key of the plugin to check.
   */
  public hasPlugin(pluginKey: string): boolean {
    return this.pluginMap.has(pluginKey);
  }

  /**
   * Retrieve the plugin with the specified plugin key.
   * @param {string} pluginKey The key of the plugin to check.
   */
  public getPlugin(pluginKey: string): PluginBase {
    const { plugin } = this.pluginMap.get(pluginKey);
    if (!plugin) {
      throw new Error('Plugin not found for key: ' + pluginKey);
    }
    return plugin;
  }

  private addListeners = (
    key: string,
    plugin: PluginBase,
    initWithGraph: boolean = true,
  ) => {
    const events = plugin.getEvents();
    this.listenersMap[key] = {};
    Object.keys(events).forEach((eventName) => {
      // Wrap the listener with error logging.
      const listener = wrapListener(
        key,
        eventName,
        events[eventName].bind(plugin),
      );
      this.graph.on(eventName, listener);
      this.listenersMap[key][eventName] = listener;
      // The plugin is not initiated with graph, some events are not listened, trigger them manually
      if (
        !initWithGraph &&
        ['afterrender', 'afterlayout'].includes(eventName)
      ) {
        listener({} as IG6GraphEvent);
      }
    });
  };

  private removeListeners = (key: string) => {
    const listeners = this.listenersMap[key];
    Object.keys(listeners).forEach((eventName) => {
      const listener = listeners[eventName];
      if (listener) {
        this.graph.off(eventName, listener);
      }
    });
  };

  private onDestroy() {
    this.pluginMap.forEach((item) => {
      const { plugin } = item;
      plugin.destroy();
    });
  }

  destroy() {}
}
