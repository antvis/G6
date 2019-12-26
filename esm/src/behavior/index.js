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
var behaviors = {
    'drag-canvas': DragCanvas,
    'zoom-canvas': ZoomCanvas,
    'drag-node': DragNode,
    'activate-relations': ActivateRelations,
    'brush-select': BrushSelect,
    'click-select': ClickSelect,
    'tooltip': Tooltip,
    'edge-tooltip': EdgeTooltip
};
each(behaviors, function (behavior, type) {
    Behavior.registerBehavior(type, behavior);
});
export default Behavior;
//# sourceMappingURL=index.js.map