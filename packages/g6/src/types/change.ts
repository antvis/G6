import { ChangeType } from '../constants';
import type { ComboData, EdgeData, NodeData } from '../spec/data';
import { Loosen } from './enum';

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
  type: Loosen<ChangeType.NodeAdded>;
  value: NodeData;
};

export type NodeUpdated = {
  type: Loosen<ChangeType.NodeUpdated>;
  value: NodeData;
  original: NodeData;
};

export type NodeRemoved = {
  type: Loosen<ChangeType.NodeRemoved>;
  value: NodeData;
};

export type EdgeAdded = {
  type: Loosen<ChangeType.EdgeAdded>;
  value: EdgeData;
};

export type EdgeUpdated = {
  type: Loosen<ChangeType.EdgeUpdated>;
  value: EdgeData;
  original: EdgeData;
};

export type EdgeRemoved = {
  type: Loosen<ChangeType.EdgeRemoved>;
  value: EdgeData;
};

export type ComboAdded = {
  type: Loosen<ChangeType.ComboAdded>;
  value: ComboData;
};

export type ComboUpdated = {
  type: Loosen<ChangeType.ComboUpdated>;
  value: ComboData;
  original: ComboData;
};

export type ComboRemoved = {
  type: Loosen<ChangeType.ComboRemoved>;
  value: ComboData;
};

export type DataChanges = {
  add: {
    nodes: NodeAdded[];
    edges: EdgeAdded[];
    combos: ComboAdded[];
  };
  update: {
    nodes: NodeUpdated[];
    edges: EdgeUpdated[];
    combos: ComboUpdated[];
  };
  remove: {
    nodes: NodeRemoved[];
    edges: EdgeRemoved[];
    combos: ComboRemoved[];
  };
};
