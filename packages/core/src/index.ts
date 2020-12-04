import Behaviors from "./behavior";
import Graph from "./graph/graph";
import TreeGraph from "./graph/tree-graph";
import Shape, { Arrow, Marker } from "./shape";
import Global from "./global";
import Util from "./util";

const registerNode = Shape.registerNode;
const registerEdge = Shape.registerEdge;
const registerCombo = Shape.registerCombo;
const registerBehavior = Behaviors.registerBehavior;

export {
  registerNode,
  registerCombo,
  Graph,
  TreeGraph,
  Util,
  registerEdge,
  registerBehavior
};

export default {
  version: Global.version,
  Graph,
  TreeGraph,
  Util,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerCombo: Shape.registerCombo,
  registerBehavior: Behaviors.registerBehavior,
  Arrow,
  Marker
};
