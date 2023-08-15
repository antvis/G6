import type { ITEM_TYPE } from '../../../types/item';
import type { IGraph } from '../../../types';
import type { GroupedChanges } from '../../../util/event';
import { Command } from './command';

export class ItemAddedCommand implements Command {
  private type: ITEM_TYPE;
  private changes: GroupedChanges['NodeAdded' | 'EdgeAdded'];

  constructor(type, changes) {
    this.type = type;
    this.changes = changes;
  }

  undo(graph: IGraph) {
    const ids = this.changes.map((data) => data.value.id);
    graph.removeData(this.type, ids, false);
  }

  redo(graph: IGraph) {
    const models = this.changes.map((data) => data.value);
    graph.addData(this.type, models, false);
  }
}
