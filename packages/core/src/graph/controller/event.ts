import { IGraph } from '../../interface/graph';

export default abstract class EventController {
  protected graph: IGraph;

  public destroyed: boolean;

  constructor(graph: IGraph) {
    this.graph = graph;
    this.destroyed = false;
    this.initEvents();
  }

  // 初始化 G6 中的事件
  protected abstract initEvents(): void;

  public abstract destroy(): void;
}
