import type { ID, IGraph } from '../../../types';
import { Command } from './command';

export class LayerUpdatedCommand implements Command {
  private action: 'front' | 'back';
  private ids: ID[];

  constructor(action, ids) {
    this.action = action;
    this.ids = ids;
  }

  undo(graph: IGraph) {
    this.action === 'front'
      ? graph.backItem(this.ids, false)
      : graph.frontItem(this.ids, false);
  }

  redo(graph: IGraph) {
    this.action === 'front'
      ? graph.frontItem(this.ids, false)
      : graph.backItem(this.ids, false);
  }
}
