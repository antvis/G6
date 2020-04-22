
import {registerAction, registerInteraction, Interaction, createInteraction} from '@antv/interaction';

import MoveAction from './action/move';
import MoveDirection from './action/move-direction';
import Zoom from './action/zoom';
import MoveNode from './action/move-node'

registerAction('move', MoveAction);
registerAction('move-direction', MoveDirection);
registerAction('zoom', Zoom);
registerAction('moveNode', MoveNode)

export {registerAction, registerInteraction, Interaction, createInteraction};
