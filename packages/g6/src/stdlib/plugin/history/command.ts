import { groupBy } from '@antv/util';
import { ID, IGraph } from '../../../types';
import { ItemAddedCommand } from './item-added-command';
import { LayerUpdatedCommand } from './layer-updated-command';
import { PositionUpdatedCommand } from './position-updated-command';
import { StateUpdatedCommand } from './state-updated-command';
import { VisibilityUpdatedCommand } from './visibility-updated-command';

export interface Command {
  redo: (graph: IGraph) => void;
  undo: (graph: IGraph) => void;
}
interface CreateProps {
  ids: ID[];
  changes: any;
  action?:
    | 'updatePosition'
    | 'updateState'
    | 'updateVisibility'
    | 'front'
    | 'back';
  upsertAncestors?: boolean;
}

export default class CommandFactory {
  static create(props: CreateProps): Command[] {
    const { action, changes, ...rest } = props;
    console.log('CommandFactory props', props);
    const onlyMove = action === 'updatePosition';
    const groupedByType = groupBy(changes, 'type');

    const commands = [];

    for (const type in groupedByType) {
      switch (type) {
        case 'NodeDataUpdated':
          if (onlyMove) {
            commands.push(
              new PositionUpdatedCommand(
                groupedByType[type],
                rest.upsertAncestors,
              ),
            );
            break;
          }
        case 'NodeAdded': {
          commands.push(new ItemAddedCommand('node', groupedByType[type]));
          break;
        }
        case 'EdgeAdded': {
          commands.push(new ItemAddedCommand('edge', groupedByType[type]));
          break;
        }
        default:
          break;
      }
    }

    switch (action) {
      case 'updateState':
        commands.push(new StateUpdatedCommand(changes));
        break;
      case 'updateVisibility':
        commands.push(new VisibilityUpdatedCommand(changes));
        break;
      case 'front':
        commands.push(new LayerUpdatedCommand('front', props.ids));
        break;
      case 'back':
        commands.push(new LayerUpdatedCommand('back', props.ids));
        break;
      default:
        break;
    }

    return commands;
  }
}
