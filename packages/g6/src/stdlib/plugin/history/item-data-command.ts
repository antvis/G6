import type { ITEM_TYPE } from '../../../types/item';
import type { IGraph } from '../../../types';
import type { GroupedChanges } from '../../../util/event';
import {
  HISTORY_OPERATION_TYPE,
  type HistoryOperationType,
} from '../../../types/history';
import { Command } from './command';

export class ItemDataCommand implements Command {
  private action: 'add' | 'remove' | 'update' | 'updatePosition';
  private type: ITEM_TYPE;
  private changes: GroupedChanges[
    | 'NodeAdded'
    | 'EdgeAdded'
    | 'NodeRemoved'
    | 'EdgeRemoved'
    | 'NodeDataUpdated'
    | 'EdgeDataUpdated'
    | 'TreeStructureChanged'];
  private upsertAncestors?: boolean;

  constructor(action, type, changes, upsertAncestors?) {
    this.action = action;
    this.type = type;
    this.changes = changes;
    this.upsertAncestors = upsertAncestors;
  }

  private removeChangedData(graph) {
    const ids = this.changes.map((data) => data.value.id);
    graph.removeData(this.type, ids, false);
  }

  private addChangedData(graph) {
    const models = this.changes.map((data) => data.value);
    graph.addData(this.type, models, false);
  }

  private updateChangedData(
    graph,
    operationType: HistoryOperationType,
    onlyMove = false,
  ) {
    if (this.type === 'combo') {
      const models = this.changes.map((data) => {
        return {
          id: data.nodeId,
          data: {
            parentId: HISTORY_OPERATION_TYPE.undo
              ? data.oldParentId
              : data.newParentId,
          },
        };
      });
      graph.updateData('node', models, this.upsertAncestors, false);
      return;
    }
    const models = this.changes.map((data) => {
      return {
        id: data.id,
        data:
          operationType === HISTORY_OPERATION_TYPE.undo
            ? data.oldValue
            : data.newValue,
      };
    });
    if (onlyMove) {
      graph.updatePosition(this.type, models, this.upsertAncestors, false);
    } else {
      graph.updateData(this.type, models, false);
    }
  }

  undo(graph: IGraph) {
    this.action === 'add' && this.removeChangedData(graph);
    this.action === 'remove' && this.addChangedData(graph);
    this.action === 'update' &&
      this.updateChangedData(graph, HISTORY_OPERATION_TYPE.undo);
    this.action === 'updatePosition' &&
      this.updateChangedData(graph, HISTORY_OPERATION_TYPE.undo, true);
  }

  redo(graph: IGraph) {
    this.action === 'remove' && this.removeChangedData(graph);
    this.action === 'add' && this.addChangedData(graph);
    this.action === 'update' &&
      this.updateChangedData(graph, HISTORY_OPERATION_TYPE.redo);
    this.action === 'updatePosition' &&
      this.updateChangedData(graph, HISTORY_OPERATION_TYPE.redo, true);
  }
}
