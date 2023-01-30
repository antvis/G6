import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);


const data = {
  isRoot: true,
  id: 'Root',
  children: [
    {
      id: 'SubTreeNode1',
      children: [
        {
          id: 'SubTreeNode1.1',
        },
        {
          id: 'SubTreeNode1.2',
        },
      ],
    },
    {
      id: 'SubTreeNode2',
    },
  ],
};

describe('random', () => {
  it('new graph without layout, random by default', () => {
    const layout = new G6.TreeLayout({
      type: 'dendrogram',
      radial: true
    })
    const layoutData = layout.layout(data);
    const tree = new G6.TreeGraph({
      container: div,
      width: 500,
      height: 500,
      fitView: true
    });
    G6.Util.traverseTree(layoutData, subtree => delete subtree.parent);
    tree.data(layoutData);
    tree.render();
    expect(!isNaN(layoutData.x)).toBe(true);
    expect(!isNaN(layoutData.y)).toBe(true);
    expect(!isNaN(layoutData.children[0].x)).toBe(true);
    expect(!isNaN(layoutData.children[0].y)).toBe(true);
  });
});