import { ArrowConfig } from '@antv/g6';
import { TestCaseContext } from '../../interface';
import { Graph, Extensions, extend } from '../../../../src/index';

const defaultData = {
  nodes: [
    {
      id: 'node1',
      // data: {
      //   x: 300,
      //   y: 100,
      // },
      data: { x: 200, y: 150 },
    },
    {
      id: 'node2',
      data: { x: 100, y: 150 },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: {
        // keyShape: {
        //   lineWidth: 2,
        //   startArrow: {},
        //   endArrow: {
        //     type: 'triangle-rect',
        //     stroke: '#f00',
        //     fill: '#f0f',
        //   },
        // },
      },
    },
  ],
};

export default (
  context: TestCaseContext,
  options: {
    startArrow?: boolean | ArrowConfig;
    endArrow?: boolean | ArrowConfig;
  } = {},
) => {
  const { startArrow = true, endArrow = true } = options;

  const ExtGraph = extend(Graph, {
    edges: { 'cubic-horizontal-edge': Extensions.CubicHorizontalEdge },
  });

  const graph = new ExtGraph({
    ...context,
    type: 'graph',
    data: JSON.parse(JSON.stringify(defaultData)),
    modes: {
      default: ['drag-node'],
    },
    node: {
      keyShape: {
        opacity: 0.1,
      },
    },
    edge: {
      type: 'cubic-horizontal-edge',
      keyShape: {
        lineWidth: 2,
        startArrow,
        endArrow,
      },
    },
  });

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '删除/增加箭头';
  removeBtn.id = 'arrow-remove';
  removeBtn.addEventListener('click', (e) => {
    const currentArrow = graph.getEdgeData('edge1')?.data?.keyShape?.endArrow;
    const hasEndrrow = currentArrow === undefined || currentArrow;
    if (!hasEndrrow) {
      graph.updateData('edge', {
        id: 'edge1',
        data: { keyShape: { endArrow: true } },
      });
    } else {
      graph.updateData('edge', {
        id: 'edge1',
        data: { keyShape: { endArrow: false } },
      });
    }
  });
  document.body.appendChild(removeBtn);

  const arrowTypes = [
    'triangle',
    'circle',
    'rect',
    'diamond',
    'vee',
    'triangle-rect',
    'simple',
  ];
  let typeIdx = 0;
  const updateBtn = document.createElement('button');
  updateBtn.textContent = '更新箭头类型';
  updateBtn.id = 'arrow-change-type';
  updateBtn.addEventListener('click', (e) => {
    typeIdx++;
    const currentCfg = graph.getEdgeData('edge1')?.data?.keyShape?.endArrow;
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        keyShape: {
          endArrow: {
            ...currentCfg,
            type: arrowTypes[typeIdx % arrowTypes.length],
          },
        },
      },
    });
  });
  document.body.appendChild(updateBtn);

  let colorChanged = false;
  const colorBtn = document.createElement('button');
  colorBtn.textContent = '更换箭头颜色';
  colorBtn.id = 'arrow-change-color';
  colorBtn.addEventListener('click', (e) => {
    const currentCfg = graph.getEdgeData('edge1')?.data?.keyShape?.endArrow;
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        keyShape: {
          endArrow: {
            ...currentCfg,
            fill: colorChanged ? '#99ADD1' : '#f00',
            stroke: colorChanged ? '#99ADD1' : '#f00',
          },
        },
      },
    });
    colorChanged = !colorChanged;
  });
  document.body.appendChild(colorBtn);

  return graph;
};
