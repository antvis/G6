import { groupBy } from '@antv/util';
import { Graph, ID } from '../../../types';
import type { ITEM_TYPE } from '../../../types/item';
import { ComboCommand } from './combo-command';
import { ItemDataCommand } from './item-data-command';
import { LayerUpdatedCommand } from './layer-updated-command';
import { StateUpdatedCommand } from './state-updated-command';
import { VisibilityUpdatedCommand } from './visibility-updated-command';

export interface Command {
  redo: (graph: Graph) => void;
  undo: (graph: Graph) => void;
}
interface CreateProps {
  type: ITEM_TYPE;
  ids: ID[];
  changes: any;
  action?: 'updatePosition' | 'updateState' | 'updateVisibility' | 'front' | 'back' | 'expandCombo' | 'collapseCombo';
  upsertAncestors?: boolean;
  disableAnimate?: boolean;
}

export default class CommandFactory {
  static create({ type: itemType, action, changes, ...rest }: CreateProps): Command[] {
    const commands = [];

    const groupedByType = groupBy(changes, 'type');

    for (const type in groupedByType) {
      const itemDataCommandMap = {
        NodeDataUpdated: 'node',
        EdgeDataUpdated: 'edge',
        NodeAdded: 'node',
        EdgeAdded: 'edge',
        NodeRemoved: 'node',
        EdgeRemoved: 'edge',
        TreeStructureChanged: 'combo',
      };
      if (itemDataCommandMap[type]) {
        commands.push(
          new ItemDataCommand(
            action,
            itemType || itemDataCommandMap[type],
            groupedByType[type],
            type === 'NodeDataUpdated' ? rest.upsertAncestors : undefined,
          ),
        );
      }
    }

    const actionCommandMap = {
      updateState: new StateUpdatedCommand(changes),
      updateVisibility: new VisibilityUpdatedCommand(changes, rest.disableAnimate),
      front: new LayerUpdatedCommand('front', rest.ids),
      back: new LayerUpdatedCommand('back', rest.ids),
      expandCombo: new ComboCommand('expandCombo', rest.ids),
      collapseCombo: new ComboCommand('collapseCombo', rest.ids),
    };

    if (actionCommandMap[action]) {
      commands.push(actionCommandMap[action]);
    }

    return commands;
  }
}
