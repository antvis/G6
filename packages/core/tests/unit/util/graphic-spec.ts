import { traverseTree, traverseTreeUp, getTextSize } from '../../../src/util/graphic';

interface TreeNode {
  id: string;
  label?: string;
  children?: TreeNode[];
}

describe('graphic unit test', () => {
  it('traverseTree', () => {
    const data: TreeNode = {
      id: 'root',
      children: [
        {
          id: 'subroot1',
          label: 'xxx',
        },
        {
          id: 'subroot2',
          children: [
            {
              id: 'yyy',
            },
          ],
        },
      ],
    };
    const trees = [];
    traverseTree(data, (node) => {
      trees.push(node);
      return true;
    });

    expect(trees[0].id).toBe('root');
    expect(trees[0].children.length).toBe(2);
    expect(trees[1].id).toBe('subroot2');
    expect(trees[1].label).toBe(undefined);
    expect(trees[2].id).toBe('yyy');
    expect(trees[3].id).toBe('subroot1');
  });

  it('traverseTree end with returning false', () => {
    const data: TreeNode = {
      id: 'root',
      children: [
        {
          id: 'A',
          label: 'A',
          children: [
            {
              id: 'A1',
            },
          ],
        },
        {
          id: 'B',
          children: [
            {
              id: 'B1',
            },
            {
              id: 'B2',
            },
          ],
        },
      ],
    };
    let trees = [];
    traverseTree(data, (node) => {
      trees.push(node);
      if (node.id === 'A') return false;
      return true;
    });
    expect(trees.length).toBe(5);

    trees = [];
    traverseTreeUp(data, (node) => {
      trees.push(node);
      if (node.id === 'B') return false;
      return true;
    });
    expect(trees.length).toBe(3);
  });

  it('getTextSize', () => {
    let result = getTextSize('abc', 12);
    expect(result).toEqual([20.303961181640624, 12]);

    result = getTextSize('体验技术', 14);
    expect(result).toEqual([56, 14]);
  });
});
