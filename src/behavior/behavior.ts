import { clone, each, wrapBehavior } from '@antv/util/lib';
import { BehaviorOpation } from '@g6/types';
import behaviorOption from './behaviorOption'

export default class Behavior {
  // 所有自定义的 Behavior 的实例
  private static types = {}
  /**
   * 自定义 Behavior
   * @param type Behavior 名称
   * @param behavior Behavior 定义的方法集合
   */
  public static registerBehavior<T, U>(type: string, behavior: BehaviorOpation<U>) {
    if(!behavior) {
      throw new Error(`please specify handler for this behavior: ${type}`)
    }

    const _proptype = clone(behaviorOption)
   
    Object.assign(_proptype, behavior)

    const base = function(cfg: object) {
      const self = this
      const events = self.getEvents()
      self._events = null

      Object.assign(self, self.getDefaultCfg(), cfg)
      
      const eventsToBind = {}

      if(events) {
        each(events, (handle, event) => {
          eventsToBind[event] = wrapBehavior(self, handle)
        })
        self._events = eventsToBind
      }
    }

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
