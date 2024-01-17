import type { STDLayoutOptions } from '../../types/layout';
import type { NodeData } from '../data';

export type LayoutOption = CustomLayout | STDLayoutOptions | PipeLayout[];

// see: https://g6.antv.antgroup.com/api/graph#graphoptionslayoutpipes
/**
 * <zh/> 流水线子图布局
 *
 * <en/> Pipeline layout options
 */
export type PipeLayout = (STDLayoutOptions | CustomLayout) & {
  /**
   * <zh/> 参与该布局的节点
   *
   * <en/> Nodes involved in the layout
   * @param node - <zh/> 节点数据 | <en/> node data
   * @returns <zh/> 是否参与布局 | <en/> Whether to participate in the layout
   */
  nodesFilter: (node: NodeData) => boolean;
};

export type CustomLayout = {
  type: string;
  [key: string]: any;
};
