import each from '@antv/util/lib/each'
import wrapBehavior from '@antv/util/lib/wrap-behavior'
import { IBehavior } from '../interface/behavior' 
import { G6Event } from '../interface/event'
import { IGraph } from '../interface/graph'

export default class BehaviorOption {
  private _events = null
  private graph = null
  private _cfg
  constructor(cfg) {
    const events = this.getEvents()
    this._cfg = {}
    this._events = null
    Object.assign(this._cfg, this.getDefaultCfg(), cfg)
    const eventsToBind = {}
    if(events) {
      each(events, (handle, event) => {
        eventsToBind[event] = wrapBehavior(this, handle)
      })
      this._events = eventsToBind
    }
  }

  public getDefaultCfg() {
    return {

    }
  }

  /**
   * register event handler, behavior will auto bind events
   * for example:
   * return {
   *  clicl: 'onClick'
   * }
   */
  public getEvents() {
    return {

    }
  }

  public shouldBegin() {
    return true
  }

  public shouldUpdate() {
    return true
  }

  public shouldEnd() {
    return true
  }

  /**
   * auto bind events when register behavior
   * @param graph Graph instance
   */
  public bind(graph: IGraph) {
    const events = this._events
    this.graph = graph
    each(events, (handler: () => void, event: G6Event) => {
      graph.on(event, handler)
    })
  }

  public unbind(graph: IGraph) {
    const events = this._events
    each(events, (handler: () => void, event: G6Event) => {
      graph.off(event, handler)
    })
  }

  public get(val) {
    return this[val]
  }

  public set(key, val) {
    this[key] = val
    return this
  }
}