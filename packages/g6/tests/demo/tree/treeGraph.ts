import G6 from '../../../src/index';
import { graphDataCfg, treeDataCfg } from '../../datasets/dataCfg';
import { TestCaseContext } from '../interface';

export default (
  context: TestCaseContext,
  options: {
    dataType?: 'graph' | 'tree';
    layoutType?: string;
    defaultCollapse?: boolean;
  } = {},
) => {
  const { dataType = 'graph', layoutType = 'compactBox', defaultCollapse = false } = options;

  const datasets = {
    tree: JSON.parse(JSON.stringify(treeDataCfg)),
    graph: JSON.parse(JSON.stringify(graphDataCfg)),
  };

  const data = datasets[dataType];
  if (defaultCollapse) {
    if (dataType === 'tree') data.value[0].children[0].data.collapsed = true;
    else data.value.nodes[2].data.collapsed = true;
  }

  const graph = new G6.Graph({
    ...context,
    layout: {
      type: layoutType,
    },
    modes: {
      default: ['drag-canvas', 'drag-node', 'collapse-expand-tree'],
    },
    node: (innerModel) => {
      const { x, y, labelShape } = innerModel.data;
      return {
        ...innerModel,
        data: {
          x,
          y,
          // animates: {
          //   update: [
          //     {
          //       fields: ['x', 'y'],
          //       duration: 500,
          //       shapeId: 'group',
          //       order: 0,
          //     },
          //   ],
          //   hide: [
          //     {
          //       fields: ['opacity'],
          //       duration: 200,
          //       shapeId: 'keyShape',
          //     },
          //     {
          //       fields: ['opacity'],
          //       duration: 200,
          //       shapeId: 'labelShape',
          //     },
          //   ],
          //   show: [
          //     {
          //       fields: ['opacity'],
          //       duration: 1000,
          //       shapeId: 'keyShape',
          //     },
          //     {
          //       fields: ['opacity'],
          //       duration: 1000,
          //       shapeId: 'labelShape',
          //     },
          //   ],
          // },
          // animate in shapes, unrelated to each other, excuted parallely
          labelShape: {
            text: innerModel.id,
            ...labelShape,
          },
        },
      };
    },
    edge: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          // animates: {
          // hide: [
          //   {
          //     fields: ['opacity'],
          //     duration: 200,
          //     shapeId: 'keyShape',
          //   },
          //   {
          //     fields: ['opacity'],
          //     duration: 200,
          //     shapeId: 'labelShape',
          //   },
          // ],
          // show: [
          //   {
          //     fields: ['opacity'],
          //     duration: 1000,
          //     shapeId: 'keyShape',
          //   },
          //   {
          //     fields: ['opacity'],
          //     duration: 1000,
          //     shapeId: 'labelShape',
          //   },
          // ],
          // },
        },
      };
    },
    // data,
  });
  graph.read(datasets['tree']);

  let currentDataType = dataType;

  const changeDataBtn = document.createElement('button');
  changeDataBtn.textContent = '切换树/图数据';
  changeDataBtn.id = 'treegraph-changedata';
  changeDataBtn.addEventListener('click', (e) => {
    currentDataType = currentDataType === 'tree' ? 'graph' : 'tree';
    graph.changeData(datasets[currentDataType]);
  });
  document.body.appendChild(changeDataBtn);

  const collapseBtn = document.createElement('button');
  collapseBtn.textContent = '展开/收起';
  collapseBtn.id = 'treegraph-collapse';
  collapseBtn.addEventListener('click', (e) => {
    const collapseNode = graph.getNodeData('cnode1');
    console.log('collapseNode?.data.collapsed', collapseNode?.data.collapsed);
    if (collapseNode?.data.collapsed) graph.expand(['cnode1', 'cnode2']);
    else graph.collapse(['cnode1', 'cnode2']);
  });
  document.body.appendChild(collapseBtn);

  let currentLayout = layoutType;
  const layoutBtn = document.createElement('button');
  layoutBtn.id = 'treegraph-changelayout';
  layoutBtn.textContent = '切换树/图布局';
  layoutBtn.addEventListener('click', (e) => {
    if (['compactBox', 'indented', 'mindmap', 'dendrogram'].includes(currentLayout)) currentLayout = 'grid';
    else currentLayout = 'compactBox';
    graph.layout({ type: currentLayout });
  });
  document.body.appendChild(layoutBtn);

  let currentAction = 'add';
  const removeNodeBtn = document.createElement('button');
  removeNodeBtn.id = 'treegraph-removenode';
  removeNodeBtn.textContent = '移除/增加节点';
  removeNodeBtn.addEventListener('click', (e) => {
    currentAction = currentAction === 'remove' ? 'add' : 'remove';
    if (currentAction === 'remove') {
      graph.removeData('node', ['dynamicNode']);
    } else {
      graph.addData('node', [{ id: 'dynamicNode', data: { x: 10, y: 10 } }]);
      graph.addData('edge', [{ id: 'newedge', source: 'node1', target: 'dynamicNode', data: {} }]);
    }
    graph.layout();
  });
  document.body.appendChild(removeNodeBtn);

  let updateTimes = 0;
  const updateNodeBtn = document.createElement('button');
  updateNodeBtn.id = 'treegraph-updatenode';
  updateNodeBtn.textContent = '更新节点';
  updateNodeBtn.addEventListener('click', (e) => {
    updateTimes++;
    graph.updateData('node', {
      id: 'node2',
      data: { labelShape: { text: `updated-${updateTimes}` } },
    });
  });
  document.body.appendChild(updateNodeBtn);

  graph.translateTo({ x: 100, y: 100 });

  graph.on('edge:click', (e) => {
    console.log('clickedge', e.itemId);
  });
  return graph;
};
