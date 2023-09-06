import { ID } from '@antv/graphlib';
import { AABB } from '@antv/g';
import { Graph as BaseGraph, IGraph, NodeModel, GraphData, Extensions, Util, extend } from '../../../src/index';



let graph: IGraph;


// node数据
/*
const defaultData: GraphData = {
  nodes: [
    {
      id: '0',
      data: {
        x: 0,
        y: 0,
      },
    },
    {
      id: '1',
      data: {
        x: 50,
        y: 50,
        label: 'node-1',
      },
    },
    {
      id: '2',
      data: {
        x: 120,
        y: 80
      }
    },
    {
      id: '3',
      data: {
        x: 150,
        y: 80
      }
    },
    {
      id: '4',
      data: {
        x: 200,
        y: 200
      }
    },
    {
      id: '5',
      data: {
        x: 250,
        y: 250
      }
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: '0',
      target: '1',
      data: {},
    },
    // {
    //   id: 'edge2',
    //   source: '0',
    //   target: '2',
    //   data: {}
    // },
    // {
    //   id: 'edge3',
    //   source: '0',
    //   target: '3',
    //   data: {}
    // },
  ],
};
*/



// combo数据
const defaultData: GraphData = {
  nodes: [],
  combos: [
    {
      id: '0',
      data: {
        x: 0,
        y: 0,
        width: 50,
        height: 50
      },
    },
    {
      id: '1',
      data: {
        x: 100,
        y: 100,
        width: 80,
        height: 80
      },
    }
  ],
  edges: [
    {
      id: 'edge1',
      source: '0',
      target: '1',
      data: {},
    },
  ]
}


// create container for controllers
const createCtrlContainer = () => {
  const container = document.getElementById('container')!;
  const ctrlContainer = document.createElement('div');
  ctrlContainer.id = 'ctrl-container';
  ctrlContainer.style.width = '100%';
  ctrlContainer.style.height = '200px';
  ctrlContainer.style.backgroundColor = '#eee';

  const appElement = document.getElementById('app')!;
  appElement.insertBefore(ctrlContainer, container);
};

const createDrawLineButton = () => {
  //#region
  const parentEle = document.getElementById('ctrl-container')!;

  // label
  const labelLabel = document.createElement('span');
  labelLabel.textContent = '画线';
  labelLabel.style.position = 'absolute';
  labelLabel.style.top = '64px';
  labelLabel.style.left = '16px';
  labelLabel.style.zIndex = '100';

  const labelCb = document.createElement('input');
  labelCb.type = 'checkbox';
  labelCb.value = 'highlight';
  labelCb.style.position = 'absolute';
  labelCb.style.width = '20px';
  labelCb.style.height = '20px';
  labelCb.style.top = '64px';
  labelCb.style.left = '166px';
  labelCb.style.zIndex = '100';
  //#endregion

  labelCb.addEventListener('click', (e) => {
    if (labelCb.checked) {
      const node0bbox = graph.getRenderBBox('0');
      const node1bbox = graph.getRenderBBox('1');

      graph.drawTransient('line', 't-react-01', {
        style: {
          fill: 'red',
          x1: (node0bbox as AABB).center[0],
          y1: (node0bbox as AABB).center[1],
          x2: (node1bbox as AABB).center[0],
          y2: (node1bbox as AABB).center[1],
        },
      });
    } else {
      graph.drawTransient('rect', 't-react-01', { action: 'remove' });
    }
  });

  parentEle.appendChild(labelLabel);
  parentEle.appendChild(labelCb);


};

const createTestComboButton = () => {
  //#region
  const parentEle = document.getElementById('ctrl-container')!;

  // label
  const labelLabel = document.createElement('span');
  labelLabel.textContent = 'Test Combo';
  labelLabel.style.position = 'absolute';
  labelLabel.style.top = '94px';
  labelLabel.style.left = '16px';
  labelLabel.style.zIndex = '100';

  const labelCb = document.createElement('input');
  labelCb.type = 'checkbox';
  labelCb.value = 'highlight';
  labelCb.style.position = 'absolute';
  labelCb.style.width = '20px';
  labelCb.style.height = '20px';
  labelCb.style.top = '94px';
  labelCb.style.left = '166px';
  labelCb.style.zIndex = '100';
  //#endregion

  labelCb.addEventListener('click', (e) => {
    if (labelCb.checked) {
      // 更改数据
      const comboData = {
        combos: [
          {
            id: '0',
            data: {
              x: 0,
              y: 0,
            },
          },
          {
            id: '1',
            data: {
              x: 100,
              y: 100,
            },
          }
        ],
        edges: [
          {
            id: 'edge1',
            source: '0',
            target: '1',
            data: {},
          },
        ]
      }
      
      graph.changeData(comboData, 'replace')

    } else {
      // 
      graph.changeData(defaultData, 'replace')
    }
  });

  parentEle.appendChild(labelLabel);
  parentEle.appendChild(labelCb);

};

const createGraph = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //const container = document.getElementById('container')!;

  const ExtGraph = extend(BaseGraph, {
    plugins: {
      snapline: Extensions.Snapline,
    },
  });

  const graph = new ExtGraph({
    container: 'container',
    width: 500,
    height: 500,
    type: 'graph',
    data: defaultData,
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'drag-node',
          key: 'drag-node',
          enableTransient: false,
        },
        {
          type: 'drag-combo',
          key: 'drag-combo',
          enableTransient: false,
        },
      ],
    },
    plugins: ['snapline']
  });

  return graph;
};

export default () => {
  createCtrlContainer();
  createDrawLineButton();

  createTestComboButton();

  graph = createGraph();

  // graph.on('node:click', (e) => {
  //   console.log('click: ', e.itemId)
  //   const bbox = graph.getRenderBBox(e.itemId) as AABB
  //   console.log(bbox)

  //   graph.updateNodePosition({id: e.itemId, data: {x: bbox.center[0] + 20, y: bbox.center[1] + 20}})
  // })

  return graph;
};
