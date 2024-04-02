import type { HierarchyStructure } from '@/src/utils/traverse';
import { bfs, dfs } from '@/src/utils/traverse';

const tree: HierarchyStructure<{ value: number }> = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 3, children: [{ value: 4 }] }] },
    { value: 5, children: [{ value: 6 }] },
  ],
};

describe('traverse', () => {
  it('dfs TB', () => {
    const result: number[] = [];

    dfs(
      tree,
      (node) => {
        result.push(node.value);
      },
      (node) => node.children,
      'TB',
    );

    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('dfs BT', () => {
    const result: number[] = [];

    dfs(
      tree,
      (node) => {
        result.push(node.value);
      },
      (node) => node.children,
      'BT',
    );

    expect(result).toEqual([4, 3, 2, 6, 5, 1]);
  });

  it('validate depth TB', () => {
    const result: Record<number, number> = {};

    dfs(
      tree,
      (node, depth) => {
        result[node.value] = depth;
      },
      (node) => node.children,
      'TB',
    );

    expect(result).toEqual({ 1: 0, 2: 1, 3: 2, 4: 3, 5: 1, 6: 2 });
  });

  it('validate depth BT', () => {
    const result: Record<number, number> = {};

    dfs(
      tree,
      (node, depth) => {
        result[node.value] = depth;
      },
      (node) => node.children,
      'BT',
    );

    expect(result).toEqual({ 1: 0, 2: 1, 3: 2, 4: 3, 5: 1, 6: 2 });
  });

  it('bfs', () => {
    const result: Record<number, number> = {};

    bfs(
      tree,
      (node, depth) => {
        result[node.value] = depth;
      },
      (node) => node.children,
    );

    expect(result).toEqual({ 1: 0, 2: 1, 5: 1, 3: 2, 6: 2, 4: 3 });
  });
});
