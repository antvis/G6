import { G6Event } from './event'
import { IEdgeConfig, IGroupConfig, INodeConfig } from './model'
export interface IGraph {
  on: (event: G6Event, handler: () => void) => void;
  off: (event: G6Event, handler: () => void) => void;
}

export interface IGraphData {
  nodes?: INodeConfig[];
  edges?: IEdgeConfig[];
  groups?: IGroupConfig[];
}

export interface ITreeGraphData {
  id: string;
  label?: string;
  x?: number;
  y?: number;
  children?: ITreeGraphData[];
}
