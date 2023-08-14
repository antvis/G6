import { GroupedChanges } from 'util/event';
import type { IGraph } from '../../../types';
import { Command } from './command';

export class ItemDataUpdatedCommand implements Command {
  private diffData: GroupedChanges['NodeDataUpdated' | 'EdgeDataUpdated'];

  constructor(options) {
    this.diffData = options;
  }

  undo(graph: IGraph) {}

  redo(graph: IGraph) {}
}
