import { comboCollapseExpand, fade, translate } from '../animations';
import {
  ClickElement,
  CollapseExpand,
  CreateEdge,
  DragCanvas,
  DragElement,
  DragElementForce,
  FocusElement,
  HoverElement,
  ZoomCanvas,
} from '../behaviors';
import {
  Circle,
  CircleCombo,
  Cubic,
  CubicHorizontal,
  CubicVertical,
  Diamond,
  Ellipse,
  Hexagon,
  Image,
  Line,
  Polyline,
  Quadratic,
  Rect,
  RectCombo,
  Star,
  Triangle,
} from '../elements';
import {
  AntVDagreLayout,
  CircularLayout,
  ComboCombinedLayout,
  ConcentricLayout,
  D3Force3DLayout,
  D3ForceLayout,
  DagreLayout,
  ForceAtlas2Layout,
  ForceLayout,
  FruchtermanLayout,
  GridLayout,
  MDSLayout,
  RadialLayout,
  RandomLayout,
  compactBox,
  dendrogram,
  indented,
  mindmap,
} from '../layouts';
import { blues, greens, oranges, spectral, tableau } from '../palettes';
import { Contextmenu, GridLine, Legend, Toolbar, Tooltip, Watermark } from '../plugins';
import { dark, light } from '../themes';
import type { ExtensionRegistry } from './types';

/**
 * <zh/> 内置插件统一在这里注册。
 * <en/> Built-in extensions are registered here.
 */
export const BUILT_IN_EXTENSIONS: ExtensionRegistry = {
  animation: {
    fade,
    translate,
    'combo-collapse-expand': comboCollapseExpand,
  },
  behavior: {
    'zoom-canvas': ZoomCanvas,
    'drag-canvas': DragCanvas,
    'drag-element': DragElement,
    'drag-element-force': DragElementForce,
    'collapse-expand': CollapseExpand,
    'click-element': ClickElement,
    'hover-element': HoverElement,
    'focus-element': FocusElement,
    'create-edge': CreateEdge,
  },
  combo: {
    circle: CircleCombo,
    rect: RectCombo,
  },
  edge: {
    cubic: Cubic,
    line: Line,
    polyline: Polyline,
    quadratic: Quadratic,
    'cubic-horizontal': CubicHorizontal,
    'cubic-vertical': CubicVertical,
  },
  layout: {
    'antv-dagre': AntVDagreLayout,
    'combo-combined': ComboCombinedLayout,
    'compact-box': compactBox,
    'force-atlas2': ForceAtlas2Layout,
    circular: CircularLayout,
    concentric: ConcentricLayout,
    d3force: D3ForceLayout,
    'd3-force-3d': D3Force3DLayout,
    dagre: DagreLayout,
    dendrogram,
    force: ForceLayout,
    fruchterman: FruchtermanLayout,
    grid: GridLayout,
    indented,
    mds: MDSLayout,
    mindmap,
    radial: RadialLayout,
    random: RandomLayout,
  },
  node: {
    circle: Circle,
    ellipse: Ellipse,
    image: Image,
    rect: Rect,
    star: Star,
    triangle: Triangle,
    diamond: Diamond,
    hexagon: Hexagon,
  },
  palette: {
    spectral,
    tableau,
    oranges,
    greens,
    blues,
  },
  theme: {
    dark,
    light,
  },
  plugin: {
    'grid-line': GridLine,
    watermark: Watermark,
    tooltip: Tooltip,
    contextmenu: Contextmenu,
    toolbar: Toolbar,
    legend: Legend,
  },
};
