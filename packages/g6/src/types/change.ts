import { ChangeTypeEnum } from '../constants';
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
  type: Loosen<ChangeTypeEnum.NodeAdded>;
  value: NodeData;
};

export type NodeUpdated = {
  type: Loosen<ChangeTypeEnum.NodeUpdated>;
  value: NodeData;
  original: NodeData;
};

export type NodeRemoved = {
  type: Loosen<ChangeTypeEnum.NodeRemoved>;
  value: NodeData;
};

export type EdgeAdded = {
  type: Loosen<ChangeTypeEnum.EdgeAdded>;
  value: EdgeData;
};

export type EdgeUpdated = {
  type: Loosen<ChangeTypeEnum.EdgeUpdated>;
  value: EdgeData;
  original: EdgeData;
};

export type EdgeRemoved = {
  type: Loosen<ChangeTypeEnum.EdgeRemoved>;
  value: EdgeData;
};

export type ComboAdded = {
  type: Loosen<ChangeTypeEnum.ComboAdded>;
  value: ComboData;
};

export type ComboUpdated = {
  type: Loosen<ChangeTypeEnum.ComboUpdated>;
  value: ComboData;
  original: ComboData;
};

export type ComboRemoved = {
  type: Loosen<ChangeTypeEnum.ComboRemoved>;
  value: ComboData;
};
