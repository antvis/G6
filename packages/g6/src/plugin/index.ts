import { compactBox, dendrogram, indented, mindmap } from '@antv/hierarchy';
import {
  CircularLayout,
  ComboCombinedLayout,
  ConcentricLayout,
  D3ForceLayout,
  DagreLayout,
  ForceAtlas2Layout,
  ForceLayout,
  FruchtermanLayout,
  GridLayout,
  MDSLayout,
  RadialLayout,
  RandomLayout,
} from '@antv/layout';
import { FadeIn, FadeOut, LinkIn, LinkOut, MoveTo, TransientTo } from '../animation';
import { Behavior as BaseBehavior } from '../types/behavior';
import { Plugin as BasePlugin } from '../types/plugin';
import {
  ActivateRelations,
  BrushSelect,
  ClickSelect,
  CollapseExpandCombo,
  CollapseExpandTree,
  CreateEdge,
  DragCanvas,
  DragCombo,
  DragNode,
  HoverActivate,
  LassoSelect,
  OrbitCanvas3D,
  RotateCanvas3D,
  ScrollCanvas,
  ShortcutsCall,
  TrackCanvas3D,
  ZoomCanvas,
  ZoomCanvas3D,
} from './behavior';
import { CircleCombo, RectCombo } from './element/combo';
import {
  CubicEdge,
  CubicHorizontalEdge,
  CubicVerticalEdge,
  LineEdge,
  LoopEdge,
  PolylineEdge,
  QuadraticEdge,
} from './element/edge';
import {
  BaseNode,
  BaseNode3D,
  CircleNode,
  CubeNode,
  DiamondNode,
  DonutNode,
  EllipseNode,
  HexagonNode,
  ModelRectNode,
  PlaneNode,
  RectNode,
  SimpleNode,
  SphereNode,
  StarNode,
  TriangleNode,
} from './element/node';
import { DarkTheme, LightTheme } from './theme';
import {
  EdgeBundling,
  EdgeFilterLens,
  Fisheye,
  Grid,
  Legend,
  LodController,
  Menu,
  Minimap,
  Snapline,
  Timebar,
  Toolbar,
  Tooltip,
} from './widget';

import { SimpleCombo } from './element/combo/simple';
import { SimpleEdge } from './element/edge/simple';
import lassoSelector from './selector/lasso';
import rectSelector from './selector/rect';
import Hull from './widget/hull';
import { WaterMarker } from './widget/watermarker';

const builtInPlugins = {
  // TODO 待修改
  theme: {
    light: LightTheme,
    dark: DarkTheme,
  },
  layout: {
    force: ForceLayout,
    grid: GridLayout,
    circular: CircularLayout,
    concentric: ConcentricLayout,
    compactBox,
    dendrogram,
    indented,
    mindmap,
  },
  behavior: {
    'drag-canvas': DragCanvas,
    'zoom-canvas': ZoomCanvas,
    'drag-node': DragNode,
    'drag-combo': DragCombo,
    'collapse-expand-combo': CollapseExpandCombo,
    'collapse-expand-tree': CollapseExpandTree,
    'click-select': ClickSelect,
  },
  widget: {
    'lod-controller': LodController,
  },
  node: {
    'simple-node': SimpleNode,
    // 'circle-node': CircleNode,
    // 'rect-node': RectNode,
    // 'image-node': ImageNode,
  },
  edge: {
    'simple-edge': SimpleEdge,
    // 'line-edge': LineEdge,
    // 'loop-edge': LoopEdge,
  },
  combo: {
    'simple-combo': SimpleCombo,
    // 'circle-combo': CircleCombo,
    // 'rect-combo': RectCombo,
  },
  animate: {
    'fade-in': FadeIn,
    'fade-out': FadeOut,
    'move-to': MoveTo,
    'transient-to': TransientTo,
    'link-in': LinkIn,
    'link-out': LinkOut,
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
  // themes
  LightTheme,
  DarkTheme,
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

export { Extensions, builtInPlugins, stdLib, utils };
