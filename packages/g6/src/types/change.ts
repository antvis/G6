import type { ComboData, EdgeData, NodeData } from '../spec/data';

/**
 * <zh/> 数据变更
 *
 * <en/> Data change
 */
export type DataChange = DataAdded | DataUpdated | DataRemoved;

export type DataAdded = NodeAdded | EdgeAdded | ComboAdded;

export type DataUpdated = NodeUpdated | EdgeUpdated | ComboUpdated;

export type DataRemoved = NodeRemoved | EdgeRemoved | ComboRemoved;

export type NodeAdded = {
  type: 'NodeAdded';
  value: NodeData;
};

export type NodeUpdated = {
  type: 'NodeUpdated';
  value: NodeData;
  original: NodeData;
};

export type NodeRemoved = {
  type: 'NodeRemoved';
  value: NodeData;
};

export type EdgeAdded = {
  type: 'EdgeAdded';
  value: EdgeData;
};

export type EdgeUpdated = {
  type: 'EdgeUpdated';
  value: EdgeData;
  original: EdgeData;
};

export type EdgeRemoved = {
  type: 'EdgeRemoved';
  value: EdgeData;
};

export type ComboAdded = {
  type: 'ComboAdded';
  value: ComboData;
};

export type ComboUpdated = {
  type: 'ComboUpdated';
  value: ComboData;
  original: ComboData;
};

export type ComboRemoved = {
  type: 'ComboRemoved';
  value: ComboData;
};
