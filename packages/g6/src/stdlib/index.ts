import { registry as layoutRegistry } from '@antv/layout';
import { Lib } from '../types/stdlib';
import ActivateRelations from './behavior/activate-relations';
import BrushSelect from './behavior/brush-select';
import ClickSelect from './behavior/click-select';
import DragCanvas from './behavior/drag-canvas';
import LassoSelect from './behavior/lasso-select';
import DragNode from './behavior/drag-node';
import { comboFromNode } from './data/comboFromNode';
import { LineEdge } from './item/edge';
import { CircleNode, SphereNode, RectNode } from './item/node';
import DarkTheme from './theme/dark';
import LightTheme from './theme/light';
import SpecThemeSolver from './themeSolver/spec';
import SubjectThemeSolver from './themeSolver/subject';

import lassoSelector from './selector/lasso';
import rectSelector from './selector/rect';
import Minimap from './plugin/minimap';
import Fisheye from './plugin/fisheye';
import Legend from './plugin/legend';
import Tooltip from './plugin/tooltip';
import Menu from './plugin/menu';
import ZoomCanvas from './behavior/zoom-canvas';
import ZoomCanvas3D from './behavior/zoom-canvas-3d';
import RotateCanvas3D from './behavior/rotate-canvas-3d';
import TrackCanvas3D from './behavior/track-canvas-3d';
import OrbitCanvas3D from './behavior/orbit-canvas-3d';
import { HoverActivate } from './behavior/hover-activate';
import { CubicEdge } from './item/edge/cubic';
import { CubicHorizonEdge } from './item/edge/cubic-horizon';
import { CubicVerticalEdge } from './item/edge/cubic-vertical';
import { Quadratic } from './item/edge/quadratic';

const stdLib = {
  transforms: {
    comboFromNode,
  },
  themes: {
    light: LightTheme,
    dark: DarkTheme,
  },
  themeSolvers: {
    spec: SpecThemeSolver,
    subject: SubjectThemeSolver,
  },
  layouts: layoutRegistry,
  behaviors: {
    'activate-relations': ActivateRelations,
    'drag-canvas': DragCanvas,
    'hover-activate': HoverActivate,
    'zoom-canvas': ZoomCanvas,
    'drag-node': DragNode,
    'click-select': ClickSelect,
    'brush-select': BrushSelect,
    'lasso-select': LassoSelect,
    'zoom-canvas-3d': ZoomCanvas3D,
    'rotate-canvas-3d': RotateCanvas3D,
    'track-canvas-3d': TrackCanvas3D,
    'orbit-canvas-3d': OrbitCanvas3D,
  },
  plugins: {
    minimap: Minimap,
    fisheye: Fisheye,
    legend: Legend,
    tooltip: Tooltip,
    menu: Menu
  },
  nodes: {
    'circle-node': CircleNode,
    'sphere-node': SphereNode,
    'rect-node': RectNode,
  },
  edges: {
    'line-edge': LineEdge,
    'cubic-edge': CubicEdge,
    'cubic-horizon-edge': CubicHorizonEdge,
    'cubic-vertical-edge': CubicVerticalEdge,
    'quadratic-edge': Quadratic,
  },
  combos: {},
};

const useLib: Lib = {
  transforms: {},
  themes: {},
  layouts: {},
  behaviors: {},
  plugins: {},
  nodes: {},
  edges: {},
  combos: {},
};

const utils = {
  rectSelector,
  lassoSelector,
};

const registery = { useLib };
export default registery;
export { stdLib, registery, utils };
