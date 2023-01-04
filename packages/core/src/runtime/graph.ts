import EventEmitter from '@antv/event-emitter';
import { GraphData, IGraph, Specification } from '../types';
import { BehaviorCfg } from '../types/behavior';
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
}