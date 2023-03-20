import { registry as layoutRegistry } from '@antv/layout';
import { Lib } from '../types/stdlib';
import DragCanvas from './behavior/drag-canvas';
import { ClickSelect } from "./behavior/click-select";
import { comboFromNode } from './data/comboFromNode';
import { LineEdge } from './item/edge';
import { CircleNode } from './item/node';
import SpecThemeSolver from './themeSolver/spec';
import LightTheme from './theme/light';
import DarkTheme from './theme/dark';
import SubjectThemeSolver from './themeSolver/subject';

const stdLib = {
  transforms: {
    comboFromNode,
  },
  themes: {
    'light': LightTheme,
    'dark': DarkTheme
  },
  themeSolvers: {
    'spec': SpecThemeSolver,
    'subject': SubjectThemeSolver,
  },
  layouts: layoutRegistry,
  behaviors: {
    'drag-canvas': DragCanvas,
    'click-select': ClickSelect,
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
