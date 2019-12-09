import { IBehavior } from '../interface/behavior'
import BehaviorOption from './behaviorOption'

export default class Behavior {
  private static types = {}
  public static registerBehavior<T, U>(type: string, behavior: IBehavior<U>) {
    if(!behavior) {
      throw new Error(`please specify handler for this behavior: ${type}`)
    }
    // TODO 将传进来的Behavior和默认的合并

    const instance = new BehaviorOption()
    Object.assign(instance, behavior)
    this.types[type] = instance
  }

  public static hasBehavior(type: string) {
    return !!this.types[type]
  }

  public static getBehavior(type: string) {
    return this.types[type]
  }
}
