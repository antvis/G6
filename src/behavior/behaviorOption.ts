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
<<<<<<< HEAD
  bind(graph: IGraph) {
    const events = this._events
=======
  public bind(graph: IGraph) {
    const events = this.get('_events')
>>>>>>> add: drag-node-spec test. update: g-canvas. fix: add find functions from g to replace findByClassName. fix: ts bugs
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

<<<<<<< HEAD
  get(val) {
    return this[val]
  },

  set(key, val) {
    this[key] = val
=======
  public get(key) {
    return this._cfg[key]
  }

  public set(key, val) {
    if(isPlainObject(key)) {
      this._cfg = Object.assign({}, this._cfg, key)
    } else {
      this._cfg[key] = val
    }
>>>>>>> add: drag-node-spec test. update: g-canvas. fix: add find functions from g to replace findByClassName. fix: ts bugs
    return this
  }
}