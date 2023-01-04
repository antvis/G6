import { EdgeUserData } from "./edge";
import { NodeUserData } from "./node"

export interface GraphData {
  nodes?: NodeUserData[];
  edges?: EdgeUserData[];
  combos?: NodeUserData[]; // TODO: combo data's interface
}

export interface InlineDataConfig {
  type: 'inline';
  value: GraphData;
}

export interface FetchDataConfig {
  type: 'fetch';
  value: string;
}

export type TransformerFn = (data: GraphData) => GraphData