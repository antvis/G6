import Stats from 'stats-js';
import G6 from '../../../src/index';
import { container, height, width } from '../../datasets/const';
import { CanvasEvent } from '@antv/g';

const treeDataCfg = {
  type: 'treeData',
  value: [
    {
      id: 'root',
      data: {
        // collapsed: true,
      },
      children: [
        {
          id: 'c1',
          data: {},
          children: [
            {
              id: 'c1-c1',
              data: {},
            },
          ],
        },
        {
          id: 'c2',
          data: {},
        },
      ],
    },
    {
      id: 'root2',
      data: {},
      children: [
        {
          id: 't2c1',
          data: {},
          children: [
            {
              id: 't2c1-c1',
              data: {},
            },
          ],
        },
        {
          id: 't2c2',
          data: {},
        },
      ],
    },
  ],
};

const graphDataCfg = {
  type: 'graphData',
  value: {
    nodes: [
      { id: 'node1', data: { isRoot: true, collapsed: true } },
      { id: 'node2', data: {} },
      { id: 'node3', data: {} },
      { id: 'node4', data: {} },
      { id: 'node5', data: {} },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2', data: {} },
      { id: 'edge2', source: 'node1', target: 'node3', data: {} },
      { id: 'edge3', source: 'node1', target: 'node4', data: {} },
      // { id: 'edge4', source: 'node2', target: 'node3', data: {} },
      // { id: 'edge5', source: 'node3', target: 'node4', data: {} },
      { id: 'edge6', source: 'node4', target: 'node5', data: {} },
    ],
  },
};

const dataGenerator = (nodeNum, edgeNum) => {
  const nodes: any = [];
  const edges: any = [];
  for (let i = 0; i < nodeNum; i++) {
    nodes.push({
      id: `node-${i}`,
      data: {
        x: Math.random() * 1000,
        y: Math.random() * 1000,
      },
    });
  }
  for (let i = 0; i < edgeNum; i++) {
    edges.push({
      id: `edge-${i}`,
      source: nodes[Math.floor(Math.random() * nodeNum)].id,
      target: nodes[Math.floor(Math.random() * nodeNum)].id,
      data: {},
    });
  }
  return { nodes, edges };
};

export default async () => {
  // const data = dataGenerator(90000, 10000);
  // console.log('data', data);
  const graph = new G6.Graph({
    container,
    width,
    height,
    layout: {
      type: 'compactBox',
      // type: 'grid',
    },
    node: (innerModel) => {
      const { x, y, labelShape } = innerModel.data;
      return {
        ...innerModel,
        data: {
          x,
          y,
          animates: {
            update: [
              {
                fields: ['x', 'y'],
                duration: 500,
                shapeId: 'group',
                order: 0,
              },
            ],
            hide: [
              {
                fields: ['opacity'],
                duration: 200,
                shapeId: 'keyShape',
              },
              {
                fields: ['opacity'],
                duration: 200,
                shapeId: 'labelShape',
              },
            ],
            show: [
              {
                fields: ['opacity'],
                duration: 1000,
                shapeId: 'keyShape',
              },
              {
                fields: ['opacity'],
                duration: 1000,
                shapeId: 'labelShape',
              },
            ],
          },
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
          animates: {
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
          },
        },
      };
    },
    // node: {
    //   animates: {
    //     update: [
    //       {
    //         fields: ['x', 'y'],
    //         duration: 2000,
    //         shapeId: 'group',
    //       },
    //     ],
    //   },
    //   labelShape: {
    //     text: {
    //       fields: ['id'],
    //       formatter: (model) => model.id,
    //     },
    //   },
    // },
    data: treeDataCfg,
    // data: graphDataCfg,
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'collapse-expand-tree',
          trigger: 'click',
        },
      ],
    },
  });

  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  graph.canvas.addEventListener(CanvasEvent.AFTER_RENDER, () => {
    if (stats) {
      stats.update();
    }
  });

  let collapsed = true;
  graph.translateTo({ x: 100, y: 100 });

  graph.on('canvas:click', (e) => {
    /** === change graph data / tree data === */
    // graph.changeData(treeDataCfg);
    /** === change layout === */
    // graph.layout({ type: 'compactBox' });
    /** === collapse / expand === */
    const ids = ['root2', 'root']; //['root']; //['node1']; //
    collapsed ? graph.expand(ids) : graph.collapse(ids);
    collapsed = !collapsed;
  });

  graph.on('canvas:contextmenu', (e) => {
    console.log('contextmenu');
    /** === updateData === */
    // graph.updateData('node', {
    //   id: 'node2',
    //   data: { labelShape: { text: 'updated!!' } },
    // });

    /** === remove a child / subtree root === */
    // graph.removeData('node', ['node4']);

    /** === add a child === */
    // graph.addData('node', [{ id: 'newnode', data: {} }]);
    // graph.addData('edge', [
    //   { id: 'newedge', source: 'node1', target: 'newnode', data: {} },
    // ]);
  });

  return graph;
};
