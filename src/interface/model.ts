
export type IModelStyle = Partial<{
  fill: string;
  stroke: string;
  strokeWidth: number
}>

export interface IModelCfg {
  style?: IModelStyle;
  stateStyles?: {
    [key: string]: IModelStyle;
  }
}

export interface INodeConfig {
  id: string;
  [key: string]: string | IModelCfg;
}

export interface IEdgeConfig {
  source: string;
  target: string;
  [key: string]: string | IModelCfg;
}

export interface IGroupConfig {
  groupId: string;
  [key: string]: string | IModelCfg;
}