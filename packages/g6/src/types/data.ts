import type { ID } from '@antv/graphlib';
import type { ComboData, EdgeData, NodeData } from '../spec/data';

export type DataID = {
  nodes?: ID[];
  edges?: ID[];
  combos?: ID[];
};

export type NodeLikeData = NodeData | ComboData;

export type ElementData = NodeData | EdgeData | ComboData;
