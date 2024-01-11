import type { STDLayoutOptions } from '../../types/layout';
import type { NodeDataOption } from '../data';

export type LayoutOption<RegisterLayout extends BaseLayoutOption = STDLayoutOptions> =
  | (STDLayoutOptions | RegisterLayout)
  | PipeLayoutOption<RegisterLayout>[];

// see: https://g6.antv.antgroup.com/api/graph#graphoptionslayoutpipes
/**
 * <zh/> 流水线子图布局
 *
 * <en/> Pipeline layout options
 */
export type PipeLayoutOption<RegisterLayout extends BaseLayoutOption> = (STDLayoutOptions | RegisterLayout) & {
  /**
   * <zh/> 参与该布局的节点
   *
   * <en/> Nodes involved in the layout
   * @param node - <zh/> 节点数据 | <en/> node data
   * @returns <zh/> 是否参与布局 | <en/> Whether to participate in the layout
   */
  nodes: (node: NodeDataOption) => boolean;
};

// TODO: Need to fix the type
type BaseLayoutOption = {
  type: string;
  [key: string]: any;
};
