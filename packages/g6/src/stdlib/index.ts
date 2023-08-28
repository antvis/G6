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
import { validateData } from './data/validateData';
import { LineEdge } from './item/edge';
import {
  CircleNode,
  EllipseNode,
  RectNode,
  SphereNode,
  TriangleNode,
  StarNode,
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
import History from './plugin/history';

import CollapseExpandTree from './behavior/collapse-expand-tree';
import { CubicEdge } from './item/edge/cubic';
import { CubicHorizontalEdge } from './item/edge/cubic-horizontal';
import { CubicVerticalEdge } from './item/edge/cubic-vertical';
import { Quadratic } from './item/edge/quadratic';
import { Polyline } from './item/edge/polyline';
import Fisheye from './plugin/fisheye';
import Grid from './plugin/grid';
import Legend from './plugin/legend';
import Menu from './plugin/menu';
import Minimap from './plugin/minimap';
import toolbar from './plugin/toolbar';
import Tooltip from './plugin/tooltip';
import lassoSelector from './selector/lasso';
import rectSelector from './selector/rect';
import { RectCombo } from './item/combo/rect';
import { transformV4Data } from './data/transformV4Data';
import { mapNodeSize } from './data/mapNodeSize';

const stdLib = {
  transforms: {
    'validate-data': validateData,
    'transform-v4-data': transformV4Data,
    'map-node-size': mapNodeSize,
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
    history: History,
    toolbar,
  },
  nodes: {
    'circle-node': CircleNode,
    'sphere-node': SphereNode,
    'rect-node': RectNode,
    'star-node': StarNode,
    'hexagon-node': HexagonNode,
    'triangle-node': TriangleNode,
    'ellipse-node': EllipseNode,
    'donut-node': DonutNode,
    'diamond-node': DiamondNode,
  },
  edges: {
    'line-edge': LineEdge,
    'cubic-edge': CubicEdge,
    'cubic-horizontal-edge': CubicHorizontalEdge,
    'cubic-vertical-edge': CubicVerticalEdge,
    'quadratic-edge': Quadratic,
    'polyline-edge': Polyline,
  },
  combos: {
    'circle-combo': CircleCombo,
    'rect-combo': RectCombo,
  },
  markers: {
    collapse: (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x + r - 4, y],
      ];
    },
    expand: (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x - r + 2 * r - 4, y],
        ['M', x - r + r, y - r + 4],
        ['L', x, y + r - 4],
      ];
    },
    upTriangle: (x, y, r) => {
      const l1 = r * Math.cos(Math.PI / 6);
      const l2 = r * Math.sin(Math.PI / 6);
      return [
        ['M', x - l1, y + l2],
        ['L', x + l1, y + l2],
        ['L', x, y - r],
        ['Z'],
      ];
    },
    downTriangle: (x, y, r) => {
      const l1 = r * Math.cos(Math.PI / 6);
      const l2 = r * Math.sin(Math.PI / 6);
      return [
        ['M', x - l1, y - l2],
        ['L', x + l1, y - l2],
        ['L', x, y + r],
        ['Z'],
      ];
    },
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
