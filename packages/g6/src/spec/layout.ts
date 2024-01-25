import type { BuiltInLayoutOptions } from '../layouts/types';
import type { NodeData } from './data';

export type LayoutOptions = BuiltInLayoutOptions | CustomLayoutOptions | PipeLayoutOptions[];

type CustomLayoutOptions = STDLayoutOptions;

export interface STDLayoutOptions {
  type: string;
  [key: string]: unknown;
}

export type PipeLayoutOptions = (BuiltInLayoutOptions | CustomLayoutOptions) & {
  /**
   * <zh/> 参与该布局的节点
   *
   * <en/> Nodes involved in the layout
   * @param node - <zh/> 节点数据 | <en/> node data
   * @returns <zh/> 是否参与布局 | <en/> Whether to participate in the layout
   */
  nodesFilter: (node: NodeData) => boolean;
};
