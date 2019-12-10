import EventEmitter from '@antv/event-emitter'
import { IGraph, IGraphOptions } from '@g6/interface/graph';

export default class Graph extends EventEmitter implements IGraph {
  private _cfg: IGraphOptions
  constructor(cfg: IGraphOptions) {
    super()
    this._cfg = cfg
  }
  public get(key: string) {

  }
}