import type { Graph } from '../../../types';
import { STACK_TYPE, type StackType } from '../../../types/history';
import type { ITEM_TYPE } from '../../../types/item';
import type { GroupedChanges } from '../../../utils/event';
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
    const ids = this.changes.map((data) => data.value?.id).filter(Boolean);
    graph.executeWithNoStack(() => {
      graph.removeData(this.type, ids);
    });
  }

  private addChangedData(graph) {
    const models = this.changes.map((data) => data.value).filter(Boolean);
    graph.executeWithNoStack(() => {
      graph.addData(this.type, models);
    });
  }

  private updateChangedData(graph: Graph, operationType: StackType, onlyMove = false) {
    const modelMap = new Map();
    if (this.type === 'combo' && !onlyMove) {
      this.changes.forEach((data) => {
        const model = modelMap.get(data.nodeId) || {};
        modelMap.set(data.nodeId, {
          id: data.nodeId,
          data: {
            ...model.data,
            parentId: STACK_TYPE.undo ? data.oldParentId : data.newParentId,
          },
        });
      });
    } else {
      this.changes.forEach((data) => {
        const value = operationType === STACK_TYPE.undo ? data.oldValue : data.newValue;
        if (
          (typeof value === 'number' && isNaN(value)) ||
          (['x', 'y'].includes(data.propertyName) && value === undefined)
        ) {
          return;
        }

        const model = modelMap.get(data.nodeId) || {};
        modelMap.set(data.id, {
          id: data.id,
          data: {
            ...model.data,
            [data.propertyName]: value,
          },
        });
      });
    }

    graph.pauseStack();
    const models = Array.from(modelMap.values());
    if (onlyMove) {
      // No matter it is node or combo, update the nodes' positions
      graph.updateNodePosition(models, this.upsertAncestors);
    } else {
      graph.updateData(this.type, models);
    }
    graph.resumeStack();
  }

  undo(graph: Graph) {
    this.action === 'add' && this.removeChangedData(graph);
    this.action === 'remove' && this.addChangedData(graph);
    this.action === 'update' && this.updateChangedData(graph, STACK_TYPE.undo);
    this.action === 'updatePosition' &&
      this.updateChangedData(graph, STACK_TYPE.undo, this.action === 'updatePosition');
  }

  redo(graph: Graph) {
    this.action === 'remove' && this.removeChangedData(graph);
    this.action === 'add' && this.addChangedData(graph);
    this.action === 'update' && this.updateChangedData(graph, STACK_TYPE.redo);
    this.action === 'updatePosition' &&
      this.updateChangedData(graph, STACK_TYPE.redo, this.action === 'updatePosition');
  }
}
