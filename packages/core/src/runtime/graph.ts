import EventEmitter from '@antv/event-emitter';
import { isArray } from '@antv/util';
import { GraphData, IGraph, Specification } from '../types';
import { BehaviorCfg, BehaviorName } from '../types/behavior';
import { Hooks } from '../types/hook';
import { DataController } from './controller/data';
import { InteractionController } from './controller/interaction';
import Hook from './hooks';

export default class Graph extends EventEmitter implements IGraph {
  public hooks: Hooks;
  constructor(cfg: Specification) {
    super();
    // TODO: analyse cfg

    this.initHooks();
    this.initControllers();
  }

  /**
   * Initialize the controllers for different plugins.
   */
  private initControllers() {
    const dataController = new DataController(this);
    const interactionController = new InteractionController(this);
  }

  /**
   * Initialize the hooks for graph's lifecycles.
   */
  private initHooks() {
    this.hooks.init = new Hook<void>({ name: 'init' });
    this.hooks.datachange = new Hook<{ data: GraphData }>({ name: 'datachange' });
    this.hooks.modechange = new Hook<{ mode: string }>({ name: 'modechange' });
    this.hooks.behaviorchange = new Hook<{
      action: 'update' | 'add' | 'remove',
      modes: string[],
      behaviors: BehaviorName[] | BehaviorCfg[]
    }>({ name: 'behaviorchange' });
  }

  /**
   * Input data and render the graph.
   * @param data 
   * @returns 
   */
  public read(data: GraphData) {
    this.hooks.datachange.emit({ data });
  }

  /**
   * Input new data to replace the old one.
   * @param data 
   * @returns 
   */
  public changeData(data: GraphData) {
    this.hooks.datachange.emit({ data });
  }

  /**
   * Switch mode.
   * @param mode mode name
   * @returns 
   * @group Interaction
   */
  public setMode(mode: string) {
    this.hooks.modechange.emit({ mode });
  }

  /**
   * Add behavior(s) to mode(s).
   * @param behaviors behavior names or configs
   * @param modes mode names
   * @returns 
   */
  public addBehaviors(behaviors: BehaviorName | BehaviorCfg | BehaviorName[] | BehaviorCfg[], modes: string | string[]) {
    this.hooks.behaviorchange.emit({
      action: 'add',
      modes: isArray(modes) ? modes : [modes],
      behaviors: isArray(behaviors) ? behaviors : [behaviors]
    });
  }
  /**
   * Remove behavior(s) from mode(s).
   * @param behaviors behavior names or configs
   * @param modes mode names
   * @returns 
   * @group Interaction
   */
  public removeBehaviors(behaviors: BehaviorName | BehaviorCfg | BehaviorName[] | BehaviorCfg[], modes: string | string[]) {
    this.hooks.behaviorchange.emit({
      action: 'remove',
      modes: isArray(modes) ? modes : [modes],
      behaviors: isArray(behaviors) ? behaviors : [behaviors]
    });
  }
  /**
   * Update a behavior on a mode.
   * @param behavior behavior configs, whose name indicates the behavior to be updated
   * @param mode mode name
   * @returns 
   * @group Interaction
   */
  public updateBehavior(behavior: BehaviorCfg, mode?: string) {
    this.hooks.behaviorchange.emit({
      action: 'update',
      modes: [mode],
      behaviors: [behavior],
    });
  }
}