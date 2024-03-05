import { fade, translate } from '../animations';
import { DragCanvas, ZoomCanvas } from '../behaviors';
import {
  Circle,
  CircleCombo,
  Cubic,
  CubicHorizontal,
  CubicVertical,
  Ellipse,
  Image,
  Line,
  Polyline,
  Quadratic,
  Rect,
  Star,
  Triangle,
} from '../elements';
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
  compactBox,
  dendrogram,
  indented,
  mindmap,
} from '../layouts';
import { blues, greens, oranges, spectral } from '../palettes';
import { GridLine } from '../plugins';
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
  },
  behavior: {
    'zoom-canvas': ZoomCanvas,
    'drag-canvas': DragCanvas,
  },
  combo: {
    circle: CircleCombo,
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
    'combo-combined': ComboCombinedLayout,
    'compact-box': compactBox,
    'force-atlas2': ForceAtlas2Layout,
    circular: CircularLayout,
    concentric: ConcentricLayout,
    d3force: D3ForceLayout,
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
  },
  palette: {
    spectral,
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
  },
};
