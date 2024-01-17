import { Graph as GraphLib, TreeData as ITreeData } from '@antv/graphlib';
import { AVAILABLE_DATA_LIFECYCLE } from '../utils/data';
import { ComboUserModel } from './combo';
import { EdgeDisplayModelData, EdgeModelData, EdgeUserModel } from './edge';
import { NodeDisplayModelData, NodeModelData, NodeUserModel, NodeUserModelData } from './node';

export interface GraphData {
  nodes?: NodeUserModel[];
  edges?: EdgeUserModel[];
  combos?: ComboUserModel[];
}

export interface GraphDataChanges {
  dataAdded: GraphData;
  dataUpdated: GraphData;
  dataRemoved: GraphData;
}

export type TreeData = ITreeData<NodeUserModelData> | ITreeData<NodeUserModelData>[];

export interface InlineGraphDataConfig {
  type: 'graphData';
  value: GraphData;
}
export interface InlineTreeDataConfig {
  type: 'treeData';
  value: TreeData;
}

export interface FetchDataConfig {
  type: 'fetch';
  value: string;
}

export type DataConfig = GraphData | InlineGraphDataConfig | InlineTreeDataConfig | FetchDataConfig;

export type GraphCore = GraphLib<NodeModelData, EdgeModelData>;
export type DisplayGraphCore = GraphLib<NodeDisplayModelData, EdgeDisplayModelData>;

export type TransformerFn = (data: GraphData) => GraphData;

export type DataChangeType =
  | 'replace'
  | 'mergeReplace'
  | 'union'
  | 'remove'
  | 'update'
  | 'moveCombo'
  | 'addCombo'
  | 'updatePosition';

export type DataLifecycleType = (typeof AVAILABLE_DATA_LIFECYCLE)[number];
