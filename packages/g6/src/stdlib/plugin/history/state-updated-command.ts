import type { ID, IGraph } from '../../../types';
import { Command } from './command';

interface StateOption {
  ids: ID | ID[];
  states: string | string[];
  value: boolean;
}

export class StateUpdatedCommand implements Command {
  private diffState: {
    newValue: StateOption[];
    oldValue: StateOption[];
  };

  constructor(options) {
    this.diffState = options;
  }

  undo(graph: IGraph) {
    graph.setItemStates(this.diffState.oldValue, false);
  }

  redo(graph: IGraph) {
    graph.setItemStates(this.diffState.newValue, false);
  }
}
