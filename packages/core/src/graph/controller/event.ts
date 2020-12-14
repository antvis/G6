import { IAbstractGraph } from '../../interface/graph';

export default abstract class EventController {
  protected graph: IAbstractGraph;

  public destroyed: boolean;

  constructor(graph: IAbstractGraph) {
    this.graph = graph;
    this.destroyed = false;
    this.initEvents();
  }

  // 初始化 G6 中的事件
  protected abstract initEvents(): void;

  public abstract destroy(): void;
}
