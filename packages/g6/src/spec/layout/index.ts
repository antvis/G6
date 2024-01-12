import type { STDLayoutOptions } from '../../types/layout';
import type { UnknownObject } from '../../types/types';
import type { NodeDataOption } from '../data';
import type { SpecGenerics as Spec } from '../types';

export type LayoutOption<
  NodeGeneric extends Spec['node'] = UnknownObject,
  RegisterLayout extends BaseLayoutOption = STDLayoutOptions,
> = (STDLayoutOptions | RegisterLayout) | PipeLayoutOption<NodeGeneric, RegisterLayout>[];

// see: https://g6.antv.antgroup.com/api/graph#graphoptionslayoutpipes
/**
 * <zh/> 流水线子图布局
 *
 * <en/> Pipeline layout options
 */
export type PipeLayoutOption<NodeGeneric extends Spec['node'], RegisterLayout extends BaseLayoutOption> = (
  | STDLayoutOptions
  | RegisterLayout
) & {
  /**
   * <zh/> 参与该布局的节点
   *
   * <en/> Nodes involved in the layout
   * @param node - <zh/> 节点数据 | <en/> node data
   * @returns <zh/> 是否参与布局 | <en/> Whether to participate in the layout
   */
  nodesFilter: (node: NodeDataOption<NodeGeneric>) => boolean;
};

// TODO: Need to fix the type
export type BaseLayoutOption = {
  type: string;
  [key: string]: any;
};
