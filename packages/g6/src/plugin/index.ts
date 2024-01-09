import Hierarchy from '@antv/hierarchy';
import * as Layouts from '@antv/layout';

import { Behavior as BaseBehavior } from '../types/behavior';
import { Plugin as BasePlugin } from '../types/plugin';
import * as Behaviors from './behavior';
import * as Transforms from './data';
import * as Combos from './item/combo';
import * as Edges from './item/edge';
import * as Nodes from './item/node';
import * as Themes from './theme';
import * as ThemeSolvers from './theme-solver';
import * as Widgets from './widget';

const { ValidateData, TransformV4Data, MapNodeSize, ProcessParallelEdges } = Transforms;

const { compactBox, dendrogram, indented, mindmap } = Hierarchy;

const { DarkTheme, LightTheme } = Themes;
const { SpecThemeSolver, SubjectThemeSolver } = ThemeSolvers;

const {
  CircleNode,
  RectNode,
  DiamondNode,
  DonutNode,
  SphereNode,
  StarNode,
  HexagonNode,
  TriangleNode,
  EllipseNode,
  ModelRectNode,
  ImageNode,
  CubeNode,
  PlaneNode,
  BaseNode,
  BaseNode3D,
} = Nodes;

const { LineEdge, CubicEdge, CubicHorizontalEdge, CubicVerticalEdge, LoopEdge, PolylineEdge, QuadraticEdge } = Edges;
const { CircleCombo, RectCombo } = Combos;
const {
  ActivateRelations,
  BrushSelect,
  HoverActivate,
  LassoSelect,
  OrbitCanvas3D,
  RotateCanvas3D,
  TrackCanvas3D,
  ZoomCanvas3D,
  ZoomCanvas,

  DragCanvas,
  CollapseExpandTree,
  CollapseExpandCombo,
  DragNode,
  DragCombo,
  ClickSelect,
  CreateEdge,
  ShortcutsCall,
  ScrollCanvas,
} = Behaviors;

const {
  Tooltip,
  Minimap,
  Grid,
  Menu,
  Fisheye,
  Legend,
  Toolbar,
  Timebar,
  Snapline,
  EdgeFilterLens,
  LodController,
  EdgeBundling,
} = Widgets;

const {
  ForceLayout,
  GridLayout,
  CircularLayout,
  ConcentricLayout,
  RandomLayout,
  MDSLayout,
  RadialLayout,
  FruchtermanLayout,
  D3ForceLayout,
  ForceAtlas2Layout,
  DagreLayout,
  ComboCombinedLayout,
} = Layouts;

import lassoSelector from './selector/lasso';
import rectSelector from './selector/rect';
import Hull from './widget/hull';
import { WaterMarker } from './widget/watermarker';

const stdPlugins = {
  transforms: {
    'validate-data': ValidateData,
    'transform-v4-data': TransformV4Data,
    'map-node-size': MapNodeSize,
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
    force: ForceLayout,
    grid: GridLayout,
    circular: CircularLayout,
    concentric: ConcentricLayout,
    ...Hierarchy,
  },
  behaviors: {
    'drag-canvas': DragCanvas,
    'zoom-canvas': ZoomCanvas,
    'drag-node': DragNode,
    'drag-combo': DragCombo,
    'collapse-expand-combo': CollapseExpandCombo,
    'collapse-expand-tree': CollapseExpandTree,
    'click-select': ClickSelect,
  },
  widgets: {
    'lod-controller': LodController,
  },
  nodes: {
    'circle-node': CircleNode,
    'rect-node': RectNode,
    'image-node': ImageNode,
  },
  edges: {
    'line-edge': LineEdge,
    'loop-edge': LoopEdge,
  },
  combos: {
    'circle-combo': CircleCombo,
    'rect-combo': RectCombo,
  },
};

const stdLib = {
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
      return [['M', x - l1, y + l2], ['L', x + l1, y + l2], ['L', x, y - r], ['Z']];
    },
    downTriangle: (x, y, r) => {
      const l1 = r * Math.cos(Math.PI / 6);
      const l2 = r * Math.sin(Math.PI / 6);
      return [['M', x - l1, y - l2], ['L', x + l1, y - l2], ['L', x, y + r], ['Z']];
    },
  },
};

const utils = {
  rectSelector,
  lassoSelector,
};

const Extensions = {
  // transforms
  ValidateData,
  TransformV4Data,
  MapNodeSize,
  ProcessParallelEdges,
  // themes
  LightTheme,
  DarkTheme,
  // themeSolvers
  SpecThemeSolver,
  SubjectThemeSolver,
  // layout
  ForceLayout,
  GridLayout,
  CircularLayout,
  ConcentricLayout,
  RandomLayout,
  MDSLayout,
  RadialLayout,
  FruchtermanLayout,
  D3ForceLayout,
  ForceAtlas2Layout,
  DagreLayout,
  ComboCombinedLayout,
  // Hierarchy
  compactBox,
  dendrogram,
  indented,
  mindmap,
  // nodes
  CircleNode,
  RectNode,
  DiamondNode,
  DonutNode,
  SphereNode,
  StarNode,
  HexagonNode,
  TriangleNode,
  EllipseNode,
  ModelRectNode,
  CubeNode,
  PlaneNode,
  BaseNode,
  BaseNode3D,
  // edges
  LineEdge,
  CubicEdge,
  CubicHorizontalEdge,
  CubicVerticalEdge,
  LoopEdge,
  PolylineEdge,
  QuadraticEdge,
  // combos
  CircleCombo,
  RectCombo,
  // behaviors
  BaseBehavior,
  ActivateRelations,
  BrushSelect,
  HoverActivate,
  LassoSelect,
  OrbitCanvas3D,
  RotateCanvas3D,
  TrackCanvas3D,
  ZoomCanvas3D,
  ZoomCanvas,
  DragCanvas,
  CollapseExpandTree,
  CollapseExpandCombo,
  DragNode,
  DragCombo,
  CreateEdge,
  ShortcutsCall,
  ScrollCanvas,
  // plugins
  BasePlugin,
  History,
  LodController,
  Toolbar,
  Tooltip,
  Minimap,
  Grid,
  Menu,
  Fisheye,
  Legend,
  Timebar,
  Hull,
  Snapline,
  EdgeFilterLens,
  WaterMarker,
  EdgeBundling,
};

export { Extensions, stdLib, stdPlugins, utils };
