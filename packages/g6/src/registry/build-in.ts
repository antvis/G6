import {
  Circle as GCircle,
  Ellipse as GEllipse,
  Group as GGroup,
  HTML as GHTML,
  Line as GLine,
  Path as GPath,
  Polygon as GPolygon,
  Polyline as GPolyline,
  Rect as GRect,
  Text as GText,
} from '@antv/g';
import { ComboCollapse, ComboExpand, Fade, NodeCollapse, NodeExpand, PathIn, PathOut, Translate } from '../animations';
import {
  AutoAdaptLabel,
  BrushSelect,
  ClickSelect,
  CollapseExpand,
  CreateEdge,
  DragCanvas,
  DragElement,
  DragElementForce,
  FixElementSize,
  FocusElement,
  HoverActivate,
  LassoSelect,
  OptimizeViewportTransform,
  ScrollCanvas,
  ZoomCanvas,
} from '../behaviors';
import {
  Circle,
  CircleCombo,
  Cubic,
  CubicHorizontal,
  CubicRadial,
  CubicVertical,
  Diamond,
  Donut,
  Ellipse,
  HTML,
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
import { Badge as BadgeShape, Image as ImageShape, Label as LabelShape } from '../elements/shapes';
import {
  AntVDagreLayout,
  CircularLayout,
  ComboCombinedLayout,
  ConcentricLayout,
  D3ForceLayout,
  DagreLayout,
  FishboneLayout,
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
import {
  Background,
  BubbleSets,
  Contextmenu,
  EdgeBundling,
  EdgeFilterLens,
  Fisheye,
  Fullscreen,
  GridLine,
  History,
  Hull,
  Legend,
  Minimap,
  Snapline,
  Timebar,
  Toolbar,
  Tooltip,
  Watermark,
} from '../plugins';
import { dark, light } from '../themes';
import {
  ArrangeDrawOrder,
  CollapseExpandCombo,
  CollapseExpandNode,
  GetEdgeActualEnds,
  MapNodeSize,
  PlaceRadialLabels,
  ProcessParallelEdges,
  UpdateRelatedEdge,
} from '../transforms';
import type { ExtensionRegistry } from './types';

/**
 * <zh/> 内置插件统一在这里注册。
 * <en/> Built-in extensions are registered here.
 */
const BUILT_IN_EXTENSIONS: ExtensionRegistry = {
  animation: {
    'combo-collapse': ComboCollapse,
    'combo-expand': ComboExpand,
    'node-collapse': NodeCollapse,
    'node-expand': NodeExpand,
    'path-in': PathIn,
    'path-out': PathOut,
    fade: Fade,
    translate: Translate,
  },
  behavior: {
    'brush-select': BrushSelect,
    'click-select': ClickSelect,
    'collapse-expand': CollapseExpand,
    'create-edge': CreateEdge,
    'drag-canvas': DragCanvas,
    'drag-element-force': DragElementForce,
    'drag-element': DragElement,
    'fix-element-size': FixElementSize,
    'focus-element': FocusElement,
    'hover-activate': HoverActivate,
    'lasso-select': LassoSelect,
    'auto-adapt-label': AutoAdaptLabel,
    'optimize-viewport-transform': OptimizeViewportTransform,
    'scroll-canvas': ScrollCanvas,
    'zoom-canvas': ZoomCanvas,
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
    'cubic-radial': CubicRadial,
    'cubic-vertical': CubicVertical,
  },
  layout: {
    'antv-dagre': AntVDagreLayout,
    'combo-combined': ComboCombinedLayout,
    'compact-box': compactBox,
    'd3-force': D3ForceLayout,
    'force-atlas2': ForceAtlas2Layout,
    circular: CircularLayout,
    concentric: ConcentricLayout,
    dagre: DagreLayout,
    dendrogram,
    fishbone: FishboneLayout,
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
    diamond: Diamond,
    ellipse: Ellipse,
    hexagon: Hexagon,
    html: HTML,
    image: Image,
    rect: Rect,
    star: Star,
    donut: Donut,
    triangle: Triangle,
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
    'bubble-sets': BubbleSets,
    'edge-bundling': EdgeBundling,
    'edge-filter-lens': EdgeFilterLens,
    'grid-line': GridLine,
    background: Background,
    contextmenu: Contextmenu,
    fisheye: Fisheye,
    fullscreen: Fullscreen,
    history: History,
    hull: Hull,
    legend: Legend,
    minimap: Minimap,
    snapline: Snapline,
    timebar: Timebar,
    toolbar: Toolbar,
    tooltip: Tooltip,
    watermark: Watermark,
  },
  transform: {
    'arrange-draw-order': ArrangeDrawOrder,
    'collapse-expand-combo': CollapseExpandCombo,
    'collapse-expand-node': CollapseExpandNode,
    'get-edge-actual-ends': GetEdgeActualEnds,
    'map-node-size': MapNodeSize,
    'place-radial-labels': PlaceRadialLabels,
    'process-parallel-edges': ProcessParallelEdges,
    'update-related-edges': UpdateRelatedEdge,
  },
  shape: {
    circle: GCircle,
    ellipse: GEllipse,
    group: GGroup,
    html: GHTML,
    image: ImageShape,
    line: GLine,
    path: GPath,
    polygon: GPolygon,
    polyline: GPolyline,
    rect: GRect,
    text: GText,
    label: LabelShape,
    badge: BadgeShape,
  },
};

import type { ExtensionCategory } from '../constants';
import { register } from './register';

/**
 * <zh/> 注册内置扩展
 *
 * <en/> Register built-in extensions
 */
export function registerBuiltInExtensions() {
  Object.entries(BUILT_IN_EXTENSIONS).forEach(([category, extensions]) => {
    Object.entries(extensions).forEach(([type, extension]) => {
      register(category as ExtensionCategory, type, extension as any);
    });
  });
}
