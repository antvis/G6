import type { ID, IGraph } from '../../../types';
import { Command } from './command';

interface StateOption {
  ids: ID | ID[];
  states: string | string[];
  value: boolean;
}

export class StateUpdatedCommand implements Command {
  private changes: {
    newValue: StateOption[];
    oldValue: StateOption[];
  };

  constructor(props) {
    this.changes = props;
  }

  undo(graph: IGraph) {
    graph.setItemStates(this.changes.oldValue, false);
  }

  redo(graph: IGraph) {
    graph.setItemStates(this.changes.newValue, false);
  }
}
