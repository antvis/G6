import { each } from '@antv/util';
import { registerBehavior } from '@antv/g6-core';
// import Behavior from './behavior';
import DragCanvas from './drag-canvas';
import DragNode from './drag-node';
import ActivateRelations from './activate-relations';
import BrushSelect from './brush-select';
import ClickSelect from './click-select';
import ZoomCanvas from './zoom-canvas';
import Tooltip from './tooltip';
import EdgeTooltip from './edge-tooltip';
import CollapseExpand from './collapse-expand';
import DragCombo from './drag-combo';
import CollapseExpandCombo from './collapse-expand-combo';
import LassoSelect from './lasso-select';
import CreateEdge from './create-edge';
import ShortcutsCall from './shortcuts-call';
import ScrollCanvas from './scroll-canvas';

const behaviors = {
  'drag-canvas': DragCanvas,
  'zoom-canvas': ZoomCanvas,
  'drag-node': DragNode,
  'activate-relations': ActivateRelations,
  'brush-select': BrushSelect,
  'click-select': ClickSelect,
  'lasso-select': LassoSelect,
  tooltip: Tooltip,
  'edge-tooltip': EdgeTooltip,
  'collapse-expand': CollapseExpand,
  'drag-combo': DragCombo,
  'collapse-expand-combo': CollapseExpandCombo,
  'create-edge': CreateEdge,
  'shortcuts-call': ShortcutsCall,
  'scroll-canvas': ScrollCanvas,
};

each(behaviors, (behavior, type: string) => {
  registerBehavior(type, behavior);
});

// export default Behavior;
