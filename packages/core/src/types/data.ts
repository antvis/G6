import { ComboUserData } from "./combo";
import { EdgeUserData } from "./edge";
import { NodeUserData } from "./node"

export interface GraphData {
  nodes?: NodeUserData[];
  edges?: EdgeUserData[];
  combos?: ComboUserData[];
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