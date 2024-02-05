import { compactBox, dendrogram, indented, mindmap } from '@antv/hierarchy';
import { CircularLayout, ConcentricLayout, ForceLayout, GridLayout } from '@antv/layout';

export const BUILT_IN_LAYOUTS = {
  force: ForceLayout,
  grid: GridLayout,
  circular: CircularLayout,
  concentric: ConcentricLayout,
  compactBox,
  dendrogram,
  indented,
  mindmap,
};
