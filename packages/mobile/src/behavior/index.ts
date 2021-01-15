import { each } from '@antv/util';
import { registerBehavior } from '@antv/g6-core';
// import Behavior from './behavior';
import DragCanvas from './drag-canvas';
import DragNode from './drag-node';
import ActivateRelations from './activate-relations';
import ClickSelect from './click-select';
import ZoomCanvas from './zoom-canvas';
import CollapseExpand from './collapse-expand';
import DragCombo from './drag-combo';
import CollapseExpandCombo from './collapse-expand-combo';
import CreateEdge from './create-edge';
import ShortcutsCall from './shortcuts-call';

const behaviors = {
  'drag-canvas': DragCanvas,
  'zoom-canvas': ZoomCanvas,
  'drag-node': DragNode,
  'activate-relations': ActivateRelations,
  'click-select': ClickSelect,
  'collapse-expand': CollapseExpand,
  'drag-combo': DragCombo,
  'collapse-expand-combo': CollapseExpandCombo,
  'create-edge': CreateEdge,
  'shortcuts-call': ShortcutsCall,
};

each(behaviors, (behavior, type: string) => {
  registerBehavior(type, behavior);
});

// export default Behavior;
