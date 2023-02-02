import { comboFromNode } from "./data/comboFromNode"
import DragCanvas from "./behavior/drag-canvas";
import { Lib } from "../types/stdlib";

const stdLib = {
  transforms: {
    comboFromNode
  },
  themes: {},
  layouts: {}, // from @antv/layout
  behaviors: {
    'drag-canvas': DragCanvas
  }, // @antv/g6-pc
  plugins: {}, // @antv/g6-plugin
  nodes: {}, // @antv/g6-element
  edges: {}, // @antv/g6-element
  combos: {}, // @antv/g6-element
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