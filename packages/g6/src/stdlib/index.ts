import { registry as layoutRegistry } from '@antv/layout';
import { Lib } from '../types/stdlib';
import DragCanvas from './behavior/drag-canvas';
import { comboFromNode } from './data/comboFromNode';
import { LineEdge } from './item/edge';
import { CircleNode } from './item/node';

const stdLib = {
  transforms: {
    comboFromNode,
  },
  themes: {},
  layouts: layoutRegistry,
  behaviors: {
    'drag-canvas': DragCanvas,
  },
  plugins: {},
  nodes: {
    'circle-node': CircleNode,
  },
  edges: {
    'line-edge': LineEdge,
  },
  combos: {},
};

const useLib: Lib = {
  transforms: {},
  themes: {},
  layouts: {},
  behaviors: {},
  plugins: {},
  nodes: {},
  edges: {},
  combos: {},
};

const registry = { useLib };
export default registry;
export { stdLib, registry };
