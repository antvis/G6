import type { ID, IGraph } from '../../../types';
import { Command } from './command';

export class ComboCommand implements Command {
  private action: 'expandCombo' | 'collapseCombo';
  private ids: ID[];

  constructor(action, ids) {
    this.action = action;
    this.ids = ids;
  }

  undo(graph: IGraph) {
    this.action === 'expandCombo'
      ? graph.collapseCombo(this.ids, false)
      : graph.expandCombo(this.ids, false);
  }

  redo(graph: IGraph) {
    this.action === 'collapseCombo'
      ? graph.collapseCombo(this.ids, false)
      : graph.expandCombo(this.ids, false);
  }
}
