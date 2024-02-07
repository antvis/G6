import { compactBox, dendrogram, indented, mindmap } from '@antv/hierarchy';
import { CircularLayout, ConcentricLayout, D3ForceLayout, DagreLayout, ForceLayout, GridLayout } from '@antv/layout';

export const BUILT_IN_LAYOUTS = {
  circular: CircularLayout,
  compactBox,
  concentric: ConcentricLayout,
  d3force: D3ForceLayout,
  dagre: DagreLayout,
  dendrogram,
  force: ForceLayout,
  grid: GridLayout,
  indented,
  mindmap,
};
