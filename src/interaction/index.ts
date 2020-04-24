
import {registerAction, registerInteraction, Interaction, createInteraction} from '@antv/interaction';

import MoveAction from './action/move';
import MoveDirection from './action/move-direction';
import Zoom from './action/zoom';
import { MoveNode, MoveNodeWithDelegate } from './action/move-node'
import { Select, MultiSelect } from './action/select-item'

registerAction('move', MoveAction);
registerAction('move-direction', MoveDirection);
registerAction('zoom', Zoom);
registerAction('move-node', MoveNode)
registerAction('move-node-delegate', MoveNodeWithDelegate)
registerAction('select', Select)
registerAction('multi-select', MultiSelect)

export {registerAction, registerInteraction, Interaction, createInteraction};
