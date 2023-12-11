import type { NodeDisplayModel } from '@antv/g6';
import type { State } from '@antv/g6/lib/types/item';

export type ReactNodeProps = {
  model: NodeDisplayModel;
  states: State[];
};
