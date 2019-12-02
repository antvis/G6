
export interface IModel {
  id?: string;
  label?: string;
  source?: string;
  target?: string;
}

export type IModelStyle = Partial<{
  fill: string;
  stroke: string;
  strokeWidth: number
}>

export interface IModelCfg {
  style: IModelStyle;
  stateStyles: {
    [key: string]: IModelStyle;
  }
}