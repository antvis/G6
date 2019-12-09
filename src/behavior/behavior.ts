import clone from '@antv/util/lib/clone'
import { IBehaviorOpation } from '../../types';
import BehaviorOption from './behaviorOption'

export default class Behavior {
  private static types = {}
  public static registerBehavior<T, U>(type: string, behavior: IBehaviorOpation<U>) {
    if(!behavior) {
      throw new Error(`please specify handler for this behavior: ${type}`)
    }

    const _proptype = clone(BehaviorOption.prototype)
   
    Object.assign(_proptype, behavior)

    const base = function() {}
    base.prototype = _proptype
    
    this.types[type] = base
  }

  public static hasBehavior(type: string) {
    return !!this.types[type]
  }

  public static getBehavior(type: string) {
    return this.types[type]
  }
}
