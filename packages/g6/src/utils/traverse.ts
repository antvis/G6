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
 * @param depth - <zh/> 当前深度 | <en/> current depth
 */
export function dfs<N>(
  node: N,
  visitor: (node: N, depth: number) => void,
  navigator: (node: N) => N[] | undefined,
  mode: 'BT' | 'TB',
  depth: number = 0,
) {
  if (mode === 'TB') visitor(node, depth);

  const children = navigator(node);

  if (children) {
    for (const child of children) {
      dfs(child, visitor, navigator, mode, depth + 1);
    }
  }

  if (mode === 'BT') visitor(node, depth);
}

/**
 * <zh/> 执行广度优先遍历
 *
 * <en/> perform breadth first traversal
 * @param node - <zh/> 起始节点 | <en/> start node
 * @param visitor - <zh/> 访问节点函数 | <en/> visitor function
 * @param navigator - <zh/> 获取子节点函数 | <en/> get children function
 */
export function bfs<N>(node: N, visitor: (node: N, depth: number) => void, navigator: (node: N) => N[] | undefined) {
  const queue: [N, number][] = [[node, 0]];

  while (queue.length) {
    const [current, depth] = queue.shift()!;

    visitor(current, depth);

    const children = navigator(current);

    if (children) {
      for (const child of children) {
        queue.push([child, depth + 1]);
      }
    }
  }
}
