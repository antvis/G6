import { Lib } from '../types/stdlib';

import * as Transforms from './data';
import * as Nodes from './item/node';
import * as Edges from './item/edge';
import * as Combos from './item/combo';
import * as Behaviors from './behavior';
import * as Themes from './theme';
import * as ThemeSolvers from './themeSolver';
import * as Plugins from './plugin';
import * as Layouts from '@antv/layout';
import Hierarchy from '@antv/hierarchy';

const { ValidateData, TransformV4Data, MapNodeSize } = Transforms;
const { DarkTheme, LightTheme } = Themes;
const { SpecThemeSolver, SubjectThemeSolver } = ThemeSolvers;
const { CircleNode, RectNode } = Nodes;
const { LineEdge } = Edges;
const { CircleCombo, RectCombo } = Combos;
const {
  ZoomCanvas,
  DragCanvas,
  CollapseExpandTree,
  CollapseExpandCombo,
  DragNode,
  DragCombo,
  ClickSelect,
} = Behaviors;
const { History } = Plugins;
const { ForceLayout, GridLayout, CircularLayout, ConcentricLayout } = Layouts;

import lassoSelector from './selector/lasso';
import rectSelector from './selector/rect';

const stdLib = {
  transforms: {
    'validate-data': ValidateData,
    'transform-v4-data': TransformV4Data,
    'map-node-size': MapNodeSize,
  },
  themes: {
    light: LightTheme,
    dark: DarkTheme,
  },
  themeSolvers: {
    spec: SpecThemeSolver,
    subject: SubjectThemeSolver,
  },
  layouts: {
    force: ForceLayout,
    grid: GridLayout,
    circular: CircularLayout,
    concentric: ConcentricLayout,
    ...Hierarchy,
  },
  behaviors: {
    'drag-canvas': DragCanvas,
    'zoom-canvas': ZoomCanvas,
    'drag-node': DragNode,
    'drag-combo': DragCombo,
    'collapse-expand-combo': CollapseExpandCombo,
    'collapse-expand-tree': CollapseExpandTree,
    'click-select': ClickSelect,
  },
  plugins: {
    history: History,
  },
  nodes: {
    'circle-node': CircleNode,
    'rect-node': RectNode,
  },
  edges: {
    'line-edge': LineEdge,
  },
  combos: {
    'circle-combo': CircleCombo,
    'rect-combo': RectCombo,
  },
  markers: {
    collapse: (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x + r - 4, y],
      ];
    },
    expand: (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x - r + 2 * r - 4, y],
        ['M', x - r + r, y - r + 4],
        ['L', x, y + r - 4],
      ];
    },
    upTriangle: (x, y, r) => {
      const l1 = r * Math.cos(Math.PI / 6);
      const l2 = r * Math.sin(Math.PI / 6);
      return [
        ['M', x - l1, y + l2],
        ['L', x + l1, y + l2],
        ['L', x, y - r],
        ['Z'],
      ];
    },
    downTriangle: (x, y, r) => {
      const l1 = r * Math.cos(Math.PI / 6);
      const l2 = r * Math.sin(Math.PI / 6);
      return [
        ['M', x - l1, y - l2],
        ['L', x + l1, y - l2],
        ['L', x, y + r],
        ['Z'],
      ];
    },
  },
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
const Extensions = {
  ...Transforms,
  ...Themes,
  ...ThemeSolvers,
  ...Nodes,
  ...Edges,
  ...Combos,
  ...Behaviors,
  ...Plugins,
  ...Layouts,
  ...Hierarchy,
};
export default registery;
export { registery, stdLib, utils, Extensions };
