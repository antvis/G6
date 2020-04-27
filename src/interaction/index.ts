
import {registerAction, registerInteraction, Interaction, createInteraction} from '@antv/interaction';

import MoveAction from './action/move';
import MoveDirection from './action/move-direction';
import Zoom from './action/zoom';
import { MoveNode, MoveNodeWithDelegate } from './action/move-node'
import { Select, MultiSelect, BrushSelect } from './action/select-item'
import { DelegateRect, DelegateCircle } from './action/delegate'
import { MaskRect, MaskCircle, MaskPath } from './action/mask'
import { HighlightMask } from './action/highlight'

registerAction('move', MoveAction);
registerAction('move-direction', MoveDirection);
registerAction('zoom', Zoom);
registerAction('move-node', MoveNode)
registerAction('move-node-delegate', MoveNodeWithDelegate)
registerAction('select', Select)
registerAction('multi-select', MultiSelect)
registerAction('brush-select', BrushSelect)
registerAction('delegate-rect', DelegateRect)
registerAction('delegate-circle', DelegateCircle)
registerAction('mask-rect', MaskRect)
registerAction('mask-circle', MaskCircle)
registerAction('mask-path', MaskPath)
registerAction('highlight-mask', HighlightMask)

export {registerAction, registerInteraction, Interaction, createInteraction};
