import { Graph, extend, Extensions } from '../../../src/index';
import { Annotation } from '../../../src/stdlib/plugin';
import type { TestCaseContext } from '../interface';

const ExtGraph = extend(Graph, {
  plugins: {
    annotation: Extensions.Annotation,
  },
  edges: {
    'polyline-edge': Extensions.PolylineEdge,
    'cubic-edge': Extensions.CubicEdge,
    'quadratic-edge': Extensions.QuadraticEdge,
  },
});

export default (context: TestCaseContext) => {
  const graphData = {
    nodes: [
      { id: 'node1', data: {} },
      { id: 'node2', data: {} },
      { id: 'node3', data: {} },
      { id: 'node4', data: {} },
      { id: 'node5', data: {} },
      { id: 'node6', data: {} },
      { id: 'node7', data: {} },
      { id: 'node8', data: {} },
      { id: 'node9', data: {} },
      { id: 'node10', data: {} },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2', data: {} },
      { id: 'edge2', source: 'node1', target: 'node3', data: {} },
      { id: 'edge3', source: 'node1', target: 'node4', data: {} },
      { id: 'edge4', source: 'node2', target: 'node3', data: {} },
      { id: 'edge5', source: 'node3', target: 'node4', data: {} },
      { id: 'edge6', source: 'node4', target: 'node5', data: {} },
      { id: 'edge7', source: 'node5', target: 'node6', data: {} },
      { id: 'edge8', source: 'node6', target: 'node7', data: {} },
      { id: 'edge9', source: 'node7', target: 'node8', data: {} },
      { id: 'edge10', source: 'node8', target: 'node9', data: {} },
      { id: 'edge11', source: 'node9', target: 'node10', data: {} },
    ],
  };

  const graph = new ExtGraph({
    ...context,
    layout: {
      type: 'grid',
    },
    // edge: {
    //   // type: 'cubic',
    //   type: 'polyline-edge',
    //   keyShape: {
    //     endArrow: true,
    //     routeCfg: {
    //       /**
    //        * 目前支持正交路由 'orth' 和地铁路由 'er'
    //        */
    //       // name: 'er',
    //       /**
    //        * 是否开启自动避障，默认为 false
    //        * Whether to enable automatic obstacle avoidance, default is false
    //        */
    //       enableObstacleAvoidance: true,
    //     },
    //     /**
    //      * 拐弯处的圆角弧度，默认为直角，值为 0
    //      * The radius of the corner rounding, defaults to a right angle
    //      */
    //     // radius: 20,
    //     /**
    //      * 拐弯处距离节点最小距离, 默认为 2
    //      * Minimum distance from the node at the corner, default is 5.
    //      */
    //     // offset: 0,
    //     /**
    //      * 控制点数组，不指定时根据 A* 算法自动生成折线。若指定了，则按照 controlPoints 指定的位置进行弯折
    //      * An array of control points that, when not specified, automatically generates the bends according to the A* algorithm. If specified, bends are made at the position specified by controlPoints.
    //      */
    //     // controlPoints: [],
    //   },
    // },
    edge: {
      type: 'line-edge',
      // type: 'cubic-edge',
      // type: 'quadratic-edge',
      keyShape: {
        endArrow: true,
      },
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
      labelBackgroundShape: {},
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
    plugins: [
      {
        type: 'annotation',
        key: 'annotation',
        // containerCfg: {
        //   className: 'test',
        // },
        // editable: false,
        cardCfg: {
          focusEditOnInit: 'content',
        },
      },
    ],
    data: graphData,
  });

  const plugin = (graph as any).pluginController.getPlugin(
    'annotation',
  ) as Annotation;

  const body = document.body;
  // document.querySelector<HTMLElement>('#container')!.style.border = '1px solid #ccc'
  const setAnnotationBtn = document.createElement('button');
  setAnnotationBtn.innerHTML = 'setAnnotation';
  body.append(setAnnotationBtn);
  let itemIndex = 0;
  setAnnotationBtn.addEventListener('click', (e) => {
    const id = graph.getAllNodesData()[itemIndex].id;
    plugin.showCard(id);
    itemIndex++;
  });
  const collapseBtn = document.createElement('button');
  collapseBtn.innerHTML = 'collapse Annotation';
  body.append(collapseBtn);
  collapseBtn.addEventListener('click', (e) => {
    Object.values(plugin.cardInfoMap).forEach((card) => {
      card.collapse(!card.config.collapsed);
    });
  });
  const changeDataBtn = document.createElement('button');
  changeDataBtn.innerHTML = 'change Data';
  body.append(changeDataBtn);
  changeDataBtn.addEventListener('click', (e) => {
    const deleteNodes = ['node1', 'node2'];
    const newData = {
      nodes: graphData.nodes
        .map((n) => {
          return { ...n };
        })
        .filter((n) => !deleteNodes.includes(n.id)),
      edges: graphData.edges
        .map((e) => {
          return { ...e };
        })
        .filter(
          (e) =>
            !deleteNodes.includes(e.source) && !deleteNodes.includes(e.target),
        ),
    };
    graph.changeData(newData);
  });
  const resetBtn = document.createElement('button');
  resetBtn.innerHTML = 'reset Data';
  body.append(resetBtn);
  resetBtn.addEventListener('click', (e) => {
    graph.changeData(graphData);
  });

  graph.hooks.destroy.tap((e) => {
    body.removeChild(setAnnotationBtn);
    body.removeChild(collapseBtn);
    body.removeChild(changeDataBtn);
    body.removeChild(resetBtn);
  });
  return graph;
};
