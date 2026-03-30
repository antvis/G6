import type { AntVLayout, LegacyAntVLayout } from '../layouts/types';
import type { GraphData } from '../spec/data';
import type { STDLayoutOptions } from '../spec/layout';

export interface AdaptiveLayout {
  instance: AntVLayout | LegacyAntVLayout;

  execute(model: GraphData, options?: STDLayoutOptions): Promise<GraphData>;
}
