import { fade, translate } from '../animations';
import { Circle, Cubic, Ellipse, Line, Polyline, Quadratic, Rect, Star, Triangle } from '../elements';
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
import { dark, light } from '../themes';

/**
 * <zh/> 内置插件统一在这里注册。
 * <en/> Built-in plugins are registered here.
 */
export const BUILT_IN_PLUGINS = {
  animation: {
    fade,
    translate,
  },
  behavior: {},
  combo: {},
  edge: {
    cubic: Cubic,
    line: Line,
    polyline: Polyline,
    quadratic: Quadratic,
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
  widget: {},
};
