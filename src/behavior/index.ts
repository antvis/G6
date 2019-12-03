import each from '@antv/util/lib/each'
import wrapBehavior from '@antv/util/lib/wrap-behavior'
import { IModel, IModelCfg, IModelStyle } from '../interface'
import { G6Event, IEvent } from '../interface/event'
import { IGraph } from '../interface/graph'
import BehaviorOption from './behaviorOption'

interface IBehavior {
  [key: string]: <T>(event?: T) => unknown;
  getDefaultCfg?: () => IModelCfg;
  getEvents: () => { [key in G6Event]?: string };
  shouldBegin?: (cfg?: IModel) => any;
  shouldUpdate?: (cfg?: IModel) => boolean;
  shouldEnd?: (cfg?: IModel) => boolean;
}

export default class Behavior {
  private static types = {}
  public static registerBehavior(type: string, behavior: IBehavior) {
    if(!behavior) {
      throw new Error(`please specify handler for this behavior: ${type}`)
    }
    // TODO 将传进来的Behavior和默认的合并

    const instance = Object.assign({}, BehaviorOption.prototype, behavior)
    this.types[type] = instance
  }

  public static hasBehavior(type: string) {
    return !!this.types[type]
  }

  public static getBehavior(type: string) {
    return this.types[type]
  }
}
