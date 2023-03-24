import { registry as layoutRegistry } from "@antv/layout";
import { Lib } from "../types/stdlib";
import ActivateRelations from "./behavior/activate-relations";
import BrushSelect from "./behavior/brush-select";
import ClickSelect from "./behavior/click-select";
import DragCanvas from "./behavior/drag-canvas";
import LassoSelect from "./behavior/lasso-select";
import { DragNode } from "./behavior/drag-node";
import { comboFromNode } from "./data/comboFromNode";
import { LineEdge } from "./item/edge";
import { CircleNode } from "./item/node";
import DarkTheme from "./theme/dark";
import LightTheme from "./theme/light";
import SpecThemeSolver from "./themeSolver/spec";
import SubjectThemeSolver from "./themeSolver/subject";

import lassoSelector from "./selector/lasso";
import rectSelector from "./selector/rect";
import Minimap from "./plugin/minimap";

const stdLib = {
  transforms: {
    comboFromNode,
  },
  themes: {
    light: LightTheme,
    dark: DarkTheme,
  },
  themeSolvers: {
    spec: SpecThemeSolver,
    subject: SubjectThemeSolver,
  },
  layouts: layoutRegistry,
  behaviors: {
    "activate-relations": ActivateRelations,
    "drag-canvas": DragCanvas,
    "drag-node": DragNode,
    "click-select": ClickSelect,
    "brush-select": BrushSelect,
    "lasso-select": LassoSelect,
  },
  plugins: {
    minimap: Minimap,
  },
  nodes: {
    "circle-node": CircleNode,
  },
  edges: {
    "line-edge": LineEdge,
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

const utils = {
  rectSelector,
  lassoSelector,
};

const registery = { useLib };
export default registery;
export { stdLib, registery, utils };
