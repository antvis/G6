export type HierarchyStructure<T> = T & {
  children?: HierarchyStructure<T>[];
};

/**
 * <zh/> 执行深度优先遍历
 *
 * <en/> perform depth first traversal
 * @param node - <zh/> 起始节点 | <en/> start node
 * @param visitor - <zh/> 访问节点函数 | <en/> visitor function
 * @param navigator - <zh/> 获取子节点函数 | <en/> get children function
 * @param mode - <zh/> 访问模式，BT: 自底向上访问，TB: 自顶向下访问 | <en/> traverse mode, BT: bottom to top, TB: top to bottom
 */
export function dfs<Node>(
  node: Node,
  visitor: (node: Node) => void,
  navigator: (node: Node) => Node[] | undefined,
  mode: 'BT' | 'TB',
) {
  if (mode === 'TB') visitor(node);

  const children = navigator(node);

  if (children) {
    for (const child of children) {
      dfs(child, visitor, navigator, mode);
    }
  }

  if (mode === 'BT') visitor(node);
}
