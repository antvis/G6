import type { Graph, ID } from '../../../types';
import { Command } from './command';

export class LayerUpdatedCommand implements Command {
  private action: 'front' | 'back';
  private ids: ID[];

  constructor(action, ids) {
    this.action = action;
    this.ids = ids;
  }

  undo(graph: Graph) {
    graph.executeWithNoStack(() => {
      this.action === 'front' ? graph.backItem(this.ids) : graph.frontItem(this.ids);
    });
  }

  redo(graph: Graph) {
    graph.executeWithNoStack(() => {
      this.action === 'front' ? graph.frontItem(this.ids) : graph.backItem(this.ids);
    });
  }
}
