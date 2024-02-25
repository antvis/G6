import { ChangeTypeEnum } from '../constants';
import type { ComboData, EdgeData, NodeData } from '../spec/data';
import { Loose } from './enum';

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
  type: Loose<ChangeTypeEnum.NodeAdded>;
  value: NodeData;
};

export type NodeUpdated = {
  type: Loose<ChangeTypeEnum.NodeUpdated>;
  value: NodeData;
  original: NodeData;
};

export type NodeRemoved = {
  type: Loose<ChangeTypeEnum.NodeRemoved>;
  value: NodeData;
};

export type EdgeAdded = {
  type: Loose<ChangeTypeEnum.EdgeAdded>;
  value: EdgeData;
};

export type EdgeUpdated = {
  type: Loose<ChangeTypeEnum.EdgeUpdated>;
  value: EdgeData;
  original: EdgeData;
};

export type EdgeRemoved = {
  type: Loose<ChangeTypeEnum.EdgeRemoved>;
  value: EdgeData;
};

export type ComboAdded = {
  type: Loose<ChangeTypeEnum.ComboAdded>;
  value: ComboData;
};

export type ComboUpdated = {
  type: Loose<ChangeTypeEnum.ComboUpdated>;
  value: ComboData;
  original: ComboData;
};

export type ComboRemoved = {
  type: Loose<ChangeTypeEnum.ComboRemoved>;
  value: ComboData;
};
