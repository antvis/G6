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
    graph.executeWithNoStack(() => {
      this.action === 'front' ? graph.backItem(this.ids) : graph.frontItem(this.ids);
    });
  }

  redo(graph: IGraph) {
    graph.executeWithNoStack(() => {
      this.action === 'front' ? graph.frontItem(this.ids) : graph.backItem(this.ids);
    });
  }
}
