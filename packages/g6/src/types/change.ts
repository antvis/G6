import { ChangeTypeEnum } from '../constants';
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
  type: ChangeTypeEnum.NodeAdded;
  value: NodeData;
};

export type NodeUpdated = {
  type: ChangeTypeEnum.NodeUpdated;
  value: NodeData;
  original: NodeData;
};

export type NodeRemoved = {
  type: ChangeTypeEnum.NodeRemoved;
  value: NodeData;
};

export type EdgeAdded = {
  type: ChangeTypeEnum.EdgeAdded;
  value: EdgeData;
};

export type EdgeUpdated = {
  type: ChangeTypeEnum.EdgeUpdated;
  value: EdgeData;
  original: EdgeData;
};

export type EdgeRemoved = {
  type: ChangeTypeEnum.EdgeRemoved;
  value: EdgeData;
};

export type ComboAdded = {
  type: ChangeTypeEnum.ComboAdded;
  value: ComboData;
};

export type ComboUpdated = {
  type: ChangeTypeEnum.ComboUpdated;
  value: ComboData;
  original: ComboData;
};

export type ComboRemoved = {
  type: ChangeTypeEnum.ComboRemoved;
  value: ComboData;
};
