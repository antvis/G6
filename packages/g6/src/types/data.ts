import { Graph as IGraph } from '@antv/graphlib';
import { ComboUserModel } from "./combo";
import { NodeDisplayModelData, NodeModelData, NodeUserModel } from "./node"
import { EdgeDisplayModelData, EdgeModelData, EdgeUserModel } from "./edge";

export interface GraphData {
  nodes?: NodeUserModel[];
  edges?: EdgeUserModel[];
  combos?: ComboUserModel[];
}

export interface InlineDataConfig {
  type: 'inline';
  value: GraphData;
}

export interface FetchDataConfig {
  type: 'fetch';
  value: string;
}

export type GraphCore = IGraph<NodeModelData, EdgeModelData>;
export type DisplayGraphCore = IGraph<NodeDisplayModelData, EdgeDisplayModelData>;

export type TransformerFn = (data: GraphData) => GraphData

export type DataChangeType = 'replace' | 'mergeReplace' | 'union' | 'remove' | 'update';