import type { Graph, ID } from '../../../types';
import { Command } from './command';

interface StateOption {
  ids: ID | ID[];
  states: string;
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

  private updateItemsStates(graph, stateOptions) {
    stateOptions?.map((option) => {
      const { ids, states, value } = option;
      graph.executeWithNoStack(() => {
        graph.setItemState(ids, states, value);
      });
    });
  }

  undo(graph: Graph) {
    this.updateItemsStates(graph, this.changes.oldValue);
  }

  redo(graph: Graph) {
    this.updateItemsStates(graph, this.changes.newValue);
  }
}
