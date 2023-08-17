import type { ITEM_TYPE } from '../../../types/item';
import type { IGraph } from '../../../types';
import type { GroupedChanges } from '../../../util/event';
import { STACK_TYPE, type StackType } from '../../../types/history';
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

  private updateChangedData(graph, operationType: StackType, onlyMove = false) {
    let models;
    if (this.type === 'combo' && !onlyMove) {
      models = this.changes.map((data) => ({
        id: data.nodeId,
        data: {
          parentId: STACK_TYPE.undo ? data.oldParentId : data.newParentId,
        },
      }));
    } else {
      models = this.changes.map((data) => {
        return {
          id: data.id,
          data:
            operationType === STACK_TYPE.undo ? data.oldValue : data.newValue,
        };
      });
    }

    if (onlyMove) {
      graph.updatePosition(this.type, models, this.upsertAncestors, false);
    } else {
      graph.updateData(this.type, models, false);
    }
  }

  undo(graph: IGraph) {
    this.action === 'add' && this.removeChangedData(graph);
    this.action === 'remove' && this.addChangedData(graph);
    this.action === 'update' && this.updateChangedData(graph, STACK_TYPE.undo);
    this.action === 'updatePosition' &&
      this.updateChangedData(
        graph,
        STACK_TYPE.undo,
        this.action === 'updatePosition',
      );
  }

  redo(graph: IGraph) {
    this.action === 'remove' && this.removeChangedData(graph);
    this.action === 'add' && this.addChangedData(graph);
    this.action === 'update' && this.updateChangedData(graph, STACK_TYPE.redo);
    this.action === 'updatePosition' &&
      this.updateChangedData(
        graph,
        STACK_TYPE.redo,
        this.action === 'updatePosition',
      );
  }
}
