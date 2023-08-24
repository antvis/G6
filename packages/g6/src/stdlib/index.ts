import Hierarchy from '@antv/hierarchy';
import { registry as layoutRegistry } from '@antv/layout';
import { Lib } from '../types/stdlib';
import ActivateRelations from './behavior/activate-relations';
import BrushSelect from './behavior/brush-select';
import ClickSelect from './behavior/click-select';
import DragCanvas from './behavior/drag-canvas';
import DragCombo from './behavior/drag-combo';
import DragNode from './behavior/drag-node';
import LassoSelect from './behavior/lasso-select';
import { comboFromNode } from './data/comboFromNode';
import { LineEdge } from './item/edge';
import {
  CircleNode,
  EllipseNode,
  RectNode,
  SphereNode,
  TriangleNode,
  HexagonNode,
  DonutNode,
  DiamondNode,
} from './item/node';
import DarkTheme from './theme/dark';
import LightTheme from './theme/light';
import SpecThemeSolver from './themeSolver/spec';
import SubjectThemeSolver from './themeSolver/subject';

import CollapseExpandCombo from './behavior/collapse-expand-combo';
import HoverActivate from './behavior/hover-activate';
import OrbitCanvas3D from './behavior/orbit-canvas-3d';
import RotateCanvas3D from './behavior/rotate-canvas-3d';
import TrackCanvas3D from './behavior/track-canvas-3d';
import ZoomCanvas from './behavior/zoom-canvas';
import ZoomCanvas3D from './behavior/zoom-canvas-3d';
import { CircleCombo } from './item/combo/circle';

import CollapseExpandTree from './behavior/collapse-expand-tree';
import { CubicEdge } from './item/edge/cubic';
import { CubicHorizonEdge } from './item/edge/cubic-horizon';
import { CubicVerticalEdge } from './item/edge/cubic-vertical';
import { Quadratic } from './item/edge/quadratic';
import Fisheye from './plugin/fisheye';
import Grid from './plugin/grid';
import Legend from './plugin/legend';
import Menu from './plugin/menu';
import Minimap from './plugin/minimap';
import toolbar from './plugin/toolbar';
import Tooltip from './plugin/tooltip';
import lassoSelector from './selector/lasso';
import rectSelector from './selector/rect';

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
  layouts: {
    ...layoutRegistry,
    ...Hierarchy,
  },
  behaviors: {
    'activate-relations': ActivateRelations,
    'drag-canvas': DragCanvas,
    'hover-activate': HoverActivate,
    'zoom-canvas': ZoomCanvas,
    'drag-node': DragNode,
    'drag-combo': DragCombo,
    'collapse-expand-combo': CollapseExpandCombo,
    'collapse-expand-tree': CollapseExpandTree,
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
    grid: Grid,
    tooltip: Tooltip,
    menu: Menu,
    toolbar,
  },
  nodes: {
    'circle-node': CircleNode,
    'sphere-node': SphereNode,
    'rect-node': RectNode,
    'hexagon-node': HexagonNode,
    'triangle-node': TriangleNode,
    'ellipse-node': EllipseNode,
    'donut-node': DonutNode,
    'diamond-node': DiamondNode,
  },
  edges: {
    'line-edge': LineEdge,
    'cubic-edge': CubicEdge,
    'cubic-horizon-edge': CubicHorizonEdge,
    'cubic-vertical-edge': CubicVerticalEdge,
    'quadratic-edge': Quadratic,
  },
  combos: {
    'circle-combo': CircleCombo,
  },
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
export { registery, stdLib, utils };
