import type { ITEM_TYPE } from '../../../types/item';
import type { IGraph } from '../../../types';
import type { GroupedChanges } from '../../../util/event';
import { Command } from './command';

export class ItemAddedCommand implements Command {
  private diffData: GroupedChanges['NodeAdded'];
  private type: ITEM_TYPE;

  constructor(type, options) {
    this.type = type;
    this.diffData = options;
  }

  undo(graph: IGraph) {
    const ids = this.diffData.map((data) => data.value.id);
    graph.removeData(this.type, ids, false);
  }

  redo(graph: IGraph) {
    const models = this.diffData.map((data) => data.value);
    graph.addData(this.type, models, false);
  }
}
