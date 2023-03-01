import { comboFromNode } from "./data/comboFromNode"
import DragCanvas from "./behavior/drag-canvas";
import { Lib } from "../types/stdlib";
import { CircleNode } from "./item/node";
import { LineEdge } from "./item/edge";

const stdLib = {
  transforms: {
    comboFromNode
  },
  themes: {},
  layouts: {}, // from @antv/layout
  behaviors: {
    'drag-canvas': DragCanvas
  },
  plugins: {},
  nodes: {
    'circle-node': CircleNode
  },
  edges: {
    'line-edge': LineEdge
  },
  combos: {},
}

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

const registery = { useLib };
export default registery;
export { stdLib, registery };