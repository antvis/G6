import { GroupedChanges } from 'util/event';
import type { IGraph } from '../../../types';
import { Command } from './command';

export class PositionUpdatedCommand implements Command {
  private changes: GroupedChanges['NodeDataUpdated'];
  private upsertAncestors?: boolean;

  constructor(changes, upsertAncestors) {
    this.changes = changes;
    this.upsertAncestors = upsertAncestors;
  }

  undo(graph: IGraph) {
    const models = this.changes.map((data) => ({
      id: data.id,
      data: data.oldValue,
    }));
    graph.updatePosition('node', models, this.upsertAncestors, false);
  }

  redo(graph: IGraph) {
    const models = this.changes.map((data) => ({
      id: data.id,
      data: data.newValue,
    }));
    graph.updatePosition('node', models, this.upsertAncestors, false);
  }
}
