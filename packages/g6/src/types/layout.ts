import type { Graph as LayoutModel } from '@antv/layout';
import type { AntVLayout } from '../layouts/types';
import type { GraphData } from '../spec/data';
import type { STDLayoutOptions } from '../spec/layout';

export interface AdaptiveLayout {
  instance: AntVLayout;

  execute(model: GraphData, options?: STDLayoutOptions): Promise<GraphData>;

  graphData2LayoutModel(data: GraphData): LayoutModel;
}
