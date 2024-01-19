import { Graph as GraphLib, ID } from '@antv/graphlib';
import type { ComboData, EdgeData, NodeData } from '../spec/data';

export type GraphData = {
  nodes?: NodeData[];
  edges?: EdgeData[];
  combos?: ComboData[];
};

export interface GraphDataChanges {
  dataAdded: GraphData;
  dataUpdated: GraphData;
  dataRemoved: GraphData;
}

export type DataModel = GraphLib<NodeData, EdgeData>;

export type DataChangeType = 'add' | 'update' | 'remove' | 'replace';

export type DataId = {
  nodes?: ID[];
  edges?: ID[];
  combos?: ID[];
};
