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

export const BUILT_IN_LAYOUTS = {
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
};
