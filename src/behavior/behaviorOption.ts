import each from '@antv/util/lib/each'
import { IGraph } from '@g6/interface/graph'
import { G6Event } from '@g6/types';
import isPlainObject from '@antv/util/lib/is-plain-object';


// 自定义 Behavior 时候共有的方法
export default {
  getDefaultCfg() {
    return {

    }
  },

  /**
   * register event handler, behavior will auto bind events
   * for example:
   * return {
   *  clicl: 'onClick'
   * }
   */
  getEvents() {
    return {

    }
  },

  shouldBegin() {
    return true
  },

  shouldUpdate() {
    return true
  },

  shouldEnd() {
    return true
  },

  /**
   * auto bind events when register behavior
   * @param graph Graph instance
   */
  bind(graph: IGraph) {
    const events = this._events
    this.graph = graph
    each(events, (handler: () => void, event: G6Event) => {
      console.log('binding event', event, handler);
      graph.on(event, handler)
    })
  },

  unbind(graph: IGraph) {
    const events = this._events
    each(events, (handler: () => void, event: G6Event) => {
      graph.off(event, handler)
    })
  },

  get(val) {
    return this[val]
  },

  set(key, val) {
    this[key] = val
    return this
  }
}