import { IGraph } from "../../types";
import { registery } from '../../stdlib';
import { getExtension } from "../../util/extension";
import { isObject } from "@antv/util";

/**
 * Manages the interaction extensions and graph modes;
 * Storage related data.
 */
export class InteractionController {
  public extensions = {};
  public graph: IGraph;
  public mode: string;

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.extensions = this.getExtensions();
    this.graph.hooks.init.tap(() => this.onModeChange(this, { mode: 'default' }));
    this.graph.hooks.modechange.tap((...params) => this.onModeChange(this, ...params));
    this.graph.hooks.behaviorchange.tap((...params) => this.onBehaviorChange(this, ...params));
  }

  /**
   * Get the extensions from useLib, stdLib is a sub set of useLib.
   * @returns 
   */
  private getExtensions() {
    const { modes = {} } = this.graph.getSpecification();
    const modeBehaviors = {};
    Object.keys(modes).forEach(mode => {
      modeBehaviors[mode] = modes[mode].map(config => getExtension(config, registery.useLib, 'behavior')).filter(behavior => !!behavior);
    })
    return modeBehaviors;
  }

  /**
   * Listener of graph's init hook. Add listeners from behaviors to graph.
   * @param param contains the mode to switch to
   */
  private onModeChange(self, param: { mode: string }) {
    self.mode = param.mode;
    // TODO: add listeners from behaviors in mode
    // ...
  }


  /**
   * Listener of graph's behaviorchange hook. Update, add, or remove behaviors from modes.
   * @param param contains action, modes, and behaviors
   */
  private onBehaviorChange(self, param: { action: 'update' | 'add' | 'remove', modes: string[], behaviors: (string | { key: string, type: string })[] }) {
    const { action, modes, behaviors } = param;
    modes.forEach(mode => {
      switch (action) {
        case 'add':
          behaviors.forEach(config => self.extensions[mode].push(getExtension(config, registery.useLib, 'behavior')));
          break;
        case 'remove':
          behaviors.forEach(key => {
            self.extensions[mode] = self.extensions[mode].filter(behavior => behavior.getKey() === key)
          });
          break;
        case 'update':
          behaviors.forEach(config => {
            if (isObject(config) && config.hasOwnProperty('key')) {
              const behaviorItem = self.extensions[mode].find(behavior => behavior.getKey() === config.key);
              debugger
              if (behaviorItem) behaviorItem.updateConfig(config);
            }
          });
          break;
        default:
          break;
      }
    });
  }
}