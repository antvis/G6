import { groupBy } from '@antv/util';
import { IGraph } from '../../../types';
import { ItemAddedCommand } from './item-added-command';
import { StateUpdatedCommand } from './state-updated-command';
import { PositionUpdatedCommand } from './position-updated-command';
import { VisibilityUpdatedCommand } from './visibility-updated-command';

export interface Command {
  redo: (graph: IGraph) => void;
  undo: (graph: IGraph) => void;
}

export default class CommandFactory {
  static create(
    options,
    action?: 'updatePosition' | 'updateState' | 'updateVisibility',
  ) {
    const onlyMove = action === 'updatePosition';
    const groupedByType = groupBy(options, 'type');

    const commands = [];

    for (const type in groupedByType) {
      switch (type) {
        case 'NodeDataUpdated':
          if (onlyMove) {
            commands.push(new PositionUpdatedCommand(groupedByType[type]));
            break;
          }
        case 'NodeAdded': {
          commands.push(new ItemAddedCommand('node', groupedByType[type]));
          break;
        }
        default:
          break;
      }
    }

    if (action === 'updateState') {
      commands.push(new StateUpdatedCommand(options));
    }

    if (action === 'updateVisibility') {
      commands.push(new VisibilityUpdatedCommand(options));
    }

    return commands;
  }
}
