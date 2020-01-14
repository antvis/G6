import each from '@antv/util/lib/each'
import { IGraph } from '../interface/graph'
import { G6Event } from '../../types';

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
   *  click: 'onClick'
   * }
   */
  getEvents() {
    return {}
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