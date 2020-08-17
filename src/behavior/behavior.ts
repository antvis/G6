import { clone, each, wrapBehavior } from '@antv/util/lib';
import { BehaviorOption } from '../types';
import behaviorOption from './behaviorOption';

export default class Behavior {
  // 所有自定义的 Behavior 的实例
  private static types = {};

  /**
   * 自定义 Behavior
   * @param type Behavior 名称
   * @param behavior Behavior 定义的方法集合
   */
  public static registerBehavior(type: string, behavior: BehaviorOption) {
    if (!behavior) {
      throw new Error(`please specify handler for this behavior: ${type}`);
    }

    const prototype = clone(behaviorOption);

    Object.assign(prototype, behavior);

    // eslint-disable-next-line func-names
    const base = function (cfg: object) {
      Object.assign(this, this.getDefaultCfg(), cfg);

      const events = this.getEvents();
      this.events = null;

      const eventsToBind = {};

      if (events) {
        each(events, (handle, event) => {
          eventsToBind[event] = wrapBehavior(this, handle);
        });
        this.events = eventsToBind;
      }
    };

    base.prototype = prototype;
    Behavior.types[type] = base;
  }

  public static hasBehavior(type: string) {
    return !!Behavior.types[type];
  }

  public static getBehavior(type: string) {
    return Behavior.types[type];
  }
}
