import G6 from '@antv/g6';

/**
 * 该案例演示，点击一个节点，同层的同类节点合并为一个聚合节点。再次点击则展开。
 * 来示例启发自 GitHub 用户 @c1105590204 
 * by 十吾
 * 
 * Click a node to collapse the siblings with same type, and click again to expand
 * This demo is inspired by the GitHub User @c1105590204 
 * by Yanyan-Wang
 */

const container = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Click a node to collapse the siblings with same cluster, and click again to expand';
container.appendChild(descriptionDiv);

// custom the collapse-sibling behavior
G6.registerBehavior('collapse-slibing', {
  getEvents() {
    return {
      'node:click': 'onClick',
    };
  },
  onClick(evt) {
    const { item } = evt;
    const model = item.getModel();
    const cluster = model.cluster;
    const parentData = item.get('parent').getModel();

    if (model.collapsedSiblings) {
      graph.removeChild(model.id);
      setTimeout(() => {
        const children = parentData.children;
        for (let i = model.collapsedSiblings.length - 1; i >= 0; i --) {
          const add = model.collapsedSiblings[i];
          children.splice(add.idx, 0, add);
        }
        delete model.collapsedSiblings;
        this.graph.updateChildren(children, parentData.id)
      }, 550);
      return;
    }
    const siblingData = parentData.children;
    if (siblingData.length <= 1) return;
    let count = 0;
    const aggregateNode = {
      id: `aggregate-node-${model.id}`,
      children: [],
      cluster,
      collapsedSiblings: []
    }
    let modelIdx = siblingData.length - 1;
    for (let i = siblingData.length - 1; i >= 0; i --) {
      const sibling = siblingData[i]
      if (sibling.id === model.id) {

        const remove = siblingData[i]
        remove.idx = i;
        aggregateNode.collapsedSiblings.push(remove);
        modelIdx = Math.min(i, modelIdx);

        aggregateNode.children = (siblingData[i].children || []).concat(aggregateNode.children);
      }
      else if (sibling.cluster === cluster && sibling.id !== model.id) {
        count ++;
        aggregateNode.children = (siblingData[i].children || []).concat(aggregateNode.children);
        const remove = siblingData.splice(i, 1)[0]
        remove.idx = i;
        aggregateNode.collapsedSiblings.push(remove);
        modelIdx = Math.min(i, modelIdx);
      }
    }
    if (!count) return;
    aggregateNode.label = count + 1;
    aggregateNode.size = 16 + (count + 1) * 4;

    graph.removeChild(model.id);
    siblingData.splice(modelIdx, 0, aggregateNode);
    
    setTimeout(() => {
      this.graph.updateChildren(siblingData, parentData.id)
    }, 550);

    return;
  },
});

// givin subject colors, getColorSetsBySubjectColors returns colorsets
const colors = [ '#5F95FF', '#61DDAA', '#65789B' ];
const colorSets = G6.Util.getColorSetsBySubjectColors(colors, '#fff', 'default', '#777');

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 50;
const graph = new G6.TreeGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['collapse-slibing', 'drag-canvas'],
  },
  fitView: true,
  layout: {
    type: 'compactBox',
    direction: 'LR',
    defalutPosition: [],
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
    getVGap: function getVGap(d) {
      return 10;
    },
    getHGap: function getHGap(d) {
      return 50;
    },
  },
  defaultEdge: {
    type: 'cubic-horizontal',
    color: '#A3B1BF',
  }
});
graph.node(function (node) {
  const colorSet = colorSets[(+node.cluster.replace('c', ''))]
  return {
    size: node.size || 16,
    style: {
      fill: colorSet?.mainFill || '#DEE9FF',
      stroke: colorSet?.mainStroke || '#5B8FF9',
    },
  };
});

// data with cluster info
const data = {
  isRoot: true,
  id: 'Root',
  cluster: 'c0',
  children: [
    {
      id: 'SubTreeNode1',
      cluster: 'c0',
      raw: {},
      children: [
        {
          id: 'SubTreeNode1.1',
          cluster: 'c1',
        },
        {
          id: 'SubTreeNode1.2',
          cluster: 'c1',
          children: [
            {
              id: 'SubTreeNode1.2.1',
              cluster: 'c0',
            },
            {
              id: 'SubTreeNode1.2.2',
              cluster: 'c0',
            },
            {
              id: 'SubTreeNode1.2.3',
              cluster: 'c1',
            },
          ],
        },
      ],
    },
    {
      id: 'SubTreeNode2',
      cluster: 'c0',
      children: [
        {
          id: 'SubTreeNode2.1',
          cluster: 'c2',
        },
      ],
    },
    {
      id: 'SubTreeNode3',
      cluster: 'c0',
      children: [
        {
          id: 'SubTreeNode3.1',
          cluster: 'c2',
        },
        {
          id: 'SubTreeNode3.2',
          cluster: 'c2',
        },
        {
          id: 'SubTreeNode3.3',
          cluster: 'c2',
        },
      ],
    },
    {
      id: 'SubTreeNode4',
      cluster: 'c1',
    },
    {
      id: 'SubTreeNode5',
      cluster: 'c1',
    },
    {
      id: 'SubTreeNode6',
      cluster: 'c1',
    },
  ],
};
graph.data(data);
graph.render();


if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
