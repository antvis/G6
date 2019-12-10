import EventEmitter from '@antv/event-emitter'
import { GraphOptions, IGraph } from '@g6/interface/graph';

export default class Graph extends EventEmitter implements IGraph {
  private _cfg: GraphOptions
  constructor(cfg: GraphOptions) {
    super()
    this._cfg = cfg
  }
  public get(key: string) {
    return this._cfg[key]
  }
}