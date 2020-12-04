import {
  radialLayout,
  traverseTree,
  traverseTreeUp,
  TreeGraphDataWithPosition,
} from '../../../src/util/graphic';

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

  it('radialLayout layout = V', () => {
    const data: TreeGraphDataWithPosition = {
      id: 'root',
      x: 10,
      y: 20,
      children: [
        {
          id: 'subroot1',
          label: 'xxx',
          x: 40,
          y: 30,
        },
        {
          id: 'subroot2',
          x: 15,
          y: 25,
          children: [
            {
              id: 'yyy',
              x: 60,
              y: 30,
            },
          ],
        },
      ],
    };

    const result = radialLayout(data, 'V');
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    expect(result.children[0].x).toBe(-9.270509831248427);
    expect(result.children[0].y).toBe(-28.531695488854606);
    expect(result.children[1].x).toBe(-11.349762493488669);
    expect(result.children[1].children[0].y).toBe(-7.34788079488412e-15);
  });

  it('radialLayout not layout param', () => {
    const data: TreeGraphDataWithPosition = {
      id: 'root',
      x: 10,
      y: 20,
      children: [
        {
          id: 'subroot1',
          label: 'xxx',
          x: 40,
          y: 30,
        },
        {
          id: 'subroot2',
          x: 15,
          y: 25,
          children: [
            {
              id: 'yyy',
              x: 60,
              y: 30,
            },
          ],
        },
      ],
    };

    const result = radialLayout(data);
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    expect(result.children[0].x).toBe(40);
    expect(result.children[0].y).toBe(-9.797174393178826e-15);
    expect(result.children[1].x).toBe(-10.606601717798215);
    expect(result.children[1].children[0].y).toBe(-1.469576158976824e-14);
  });
});
