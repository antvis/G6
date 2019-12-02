import each from '@antv/util/lib/each'
import wrapBehavior from '@antv/util/lib/wrap-behavior'
import { IModel, IModelCfg, IModelStyle } from '../interface'
import { G6Event, IEvent } from '../interface/event'
import { IGraph } from '../interface/graph'

interface IBehavior {
  getDefaultCfg?: () => IModelCfg;
  getEvents: () => { [key: string]: string };
  shouldBegin: (cfg?: IModel) => boolean;
}
export default class Behavior {
  private _events
  public registerBehavior(type: string, behavior: IBehavior) {
    if(!behavior) {
      throw new Error(`please specify handler for this behavior: ${type}`)
    }

    const { getEvents } = behavior

    const events = getEvents()
    const eventsToBind = {}
    if(events) {
      each(events, (handle, event) => {
        eventsToBind[event] = wrapBehavior(events, handle)
      })
      this._events = eventsToBind
    }
  }

  public bind(graph: IGraph) {
    const events = this._events
    each(events, (handler, event) => {
      graph.on(event, handler)
    })
  }

  /**
   * 
   * @param cfg 默认的配置项
   */
  public getDefaultCfg(cfg: IModelCfg):IModelStyle {
    return {}
  }


} 