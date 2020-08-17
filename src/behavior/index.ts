import each from '@antv/util/lib/each';
import Behavior from './behavior';
import DragCanvas from './drag-canvas';
import DragNode from './drag-node';
import ActivateRelations from './activate-relations';
import BrushSelect from './brush-select';
import ClickSelect from './click-select';
import ZoomCanvas from './zoom-canvas';
import Tooltip from './tooltip';
import EdgeTooltip from './edge-tooltip';
import DragGroup from './drag-group';
import DragNodeWidthGroup from './drag-node-with-group';
import CollapseExpandGroup from './collapse-expand-group';
import CollapseExpand from './collapse-expand';
import DragCombo from './drag-combo';
import CollapseExpandCombo from './collapse-expand-combo';
import LassoSelect from './lasso-select';

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
  'drag-group': DragGroup,
  'drag-node-with-group': DragNodeWidthGroup,
  'collapse-expand-group': CollapseExpandGroup,
  'collapse-expand': CollapseExpand,
  'drag-combo': DragCombo,
  'collapse-expand-combo': CollapseExpandCombo,
};

each(behaviors, (behavior, type: string) => {
  Behavior.registerBehavior(type, behavior);
});

export default Behavior;
