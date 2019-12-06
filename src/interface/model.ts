import { IEdge, INode } from './item'
import { IPoint } from './math';
import  { IShapeStyle } from './shape'

type IModelStyle = Partial<{
  style: {
    [key: string]: IShapeStyle
  };
  stateStyles: {
    [key: string]: IShapeStyle;
  };
  // loop edge config
  loopCfg: {
    dist?: number;
    position?: string;
    // 如果逆时针画，交换起点和终点
    clockwise?: boolean;
  };
}>
interface IModelStyle1 {
  style?: {
    [key: string]: IShapeStyle
  };
  stateStyles?: {
    [key: string]: IShapeStyle;
  };
  // loop edge config
  loopCfg?: {
    dist?: number;
    position?: string;
    // 如果逆时针画，交换起点和终点
    clockwise?: boolean;
  }
}

export type IModelConfig = INodeConfig | IEdgeConfig

export interface INodeConfig extends IModelStyle {
  id: string;
  label?: string;
  groupId?: string;
  description?: string;
  x?: number;
  y?: number;
}

export interface IEdgeConfig extends IModelStyle  {
  source: string;
  target: string;
  label?: string;
  sourceNode?: INode;
  targetNode?: INode;
  startPoint?: IPoint;
  endPoint?: IPoint;
  controlPoints?: IPoint[];
}

export interface IGroupConfig {
  id: string;
  parentId?: string;
  [key: string]: string | IModelStyle;
}

export interface IGroupNodeIds {
  [key: string]: string[];
}