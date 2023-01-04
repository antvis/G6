import GraphLib from "@antv/graphlib";
import { isString, isFunction } from "util";
import { GraphData, IGraph } from "../../types";
import stdlib from '../../stdlib';
import { getExtension } from "../../util/extension";

/**
 * Manage the interaction extensions; storage related data
 */
export class InteractionController {
  public extensions = {};
  public graph: IGraph;
  public mode: string;

  constructor(graph: IGraph) {
    this.graph = graph;
    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.extensions = this.getExtensions();
    this.graph.hooks.init.tap(() => this.onModeChange({ mode: 'default' }));
    this.graph.hooks.modechange.tap(this.onModeChange);
    this.graph.hooks.behaviorchange.tap(this.onBehaviorChange);
  }

  /**
   * Get the extensions from stdlib.
   * @returns 
   */
  private getExtensions() {
    const { modes = {} } = this.graph.getSpec();
    const modeBehaviors = {};
    Object.keys(modes).forEach(mode => {
      modeBehaviors[mode] = modes[mode].map(config => getExtension(config, stdlib, 'behavior')).filter(behavior => !!behavior);
    })
    return modeBehaviors;
  }

  /**
   * Listener of graph's init hook. Add listeners from behaviors to graph.
   * @param param contains the mode to switch to
   */
  private onModeChange(param: { mode: string }) {
    this.mode = param.mode;
    // TODO: add listeners from behaviors in mode
    // ...
  }


  /**
   * Listener of graph's behaviorchange hook. Update, add, or remove behaviors from modes.
   * @param param contains action, modes, and behaviors
   */
  private onBehaviorChange(param: { action: 'update' | 'add' | 'remove', modes: string[], behaviors: BehaviorCfg[] }) {
    const { action, modes, behaviors } = param;
    modes.forEach(mode => {
      switch (action) {
        case 'add':
          behaviors.forEach(config => this.extensions[mode].push(getExtension(config, stdlib, 'behavior')));
          break;
        case 'remove':
          behaviors.forEach(config => {
            const type = isString(config) ? config : config.type;
            this.extensions[mode] = this.extensions[mode].filter(behavior => behavior.getName() === type)
          });
          break;
        case 'update':
          behaviors.forEach(config => {
            const type = isString(config) ? config : config.type;
            const behaviorItem = this.extensions[mode].find(behavior => behavior.getName() === type);
            behaviorItem.updateConfig(config);
          });
          break;
        default:
          break;
      }
    });
  }
}