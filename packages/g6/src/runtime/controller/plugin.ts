import { IGraph } from "../../types";
import registry from "../../stdlib";
import { getExtension } from "../../util/extension";
import { Plugin } from "../../types/plugin";
import { IG6GraphEvent } from "../../types/event";

type Listener = (event: IG6GraphEvent) => void;

/**
 * Wraps the listener with error logging.
 * @returns a new listener with error logging.
 */
const wrapListener = (
  type: string,
  eventName: string,
  listener: Listener
): Listener => {
  return (event: any) => {
    try {
      listener(event);
    } catch (error) {
      console.error(
        `G6: Error occurred in "${eventName}" phase of the plugin "${type}"!`
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
  private pluginMap: Map<string, { type: string; plugin: Plugin }> = new Map();

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
    pluginConfigs.forEach((config) => {
      this.initPlugin(config);
    });

    // 2. Add listeners for each behavior.
    this.listenersMap = {};
    this.pluginMap.forEach((item, key) => {
      const { plugin } = item;
      this.addListeners(key, plugin);
    });
  }

  private initPlugin(config) {
    const { graph } = this;
    const Plugin = getExtension(config, registry.useLib, "plugin");
    const options = typeof config === "string" ? {} : config;
    const type = typeof config === "string" ? config : config.type;
    const key = typeof config === "string" ? config : config.key || type;
    const plugin = new Plugin(options);
    plugin.init(graph);
    this.pluginMap.set(key, { type, plugin });
    return { key, type, plugin };
  }

  private onPluginChange(params: {
    action: "update" | "add" | "remove";
    plugins: (string | { key: string; type: string; options: any })[];
  }) {
    const { action, plugins: pluginCfgs } = params;
    if (action === "add") {
      pluginCfgs.forEach((config) => {
        const { key, plugin } = this.initPlugin(config);
        this.addListeners(key, plugin);
      });
      return;
    }

    if (action === "remove") {
      pluginCfgs.forEach((config) => {
        const key =
          typeof config === "string" ? config : config.key || config.type;
        const item = this.pluginMap.get(key);
        if (!item) return;
        const { plugin } = item;
        this.removeListeners(key);
        plugin.destroy();
        this.pluginMap.delete(key);
      });
      return;
    }

    if (action === "update") {
      pluginCfgs.forEach((config) => {
        if (typeof config === "string") return;
        const key = config.key || config.type;
        const item = this.pluginMap.get(key);
        if (!item) return;
        const { plugin } = item;
        plugin.updateCfgs(config);
        this.removeListeners(key);
        this.addListeners(key, plugin);
      });
      return;
    }
  }

  private addListeners = (key: string, plugin: Plugin) => {
    const events = plugin.getEvents();
    this.listenersMap[key] = {};
    Object.keys(events).forEach((eventName) => {
      // Wrap the listener with error logging.
      const listener = wrapListener(
        key,
        eventName,
        events[eventName].bind(plugin)
      );
      this.graph.on(eventName, listener);
      this.listenersMap[key][eventName] = listener;
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
