// @ts-nocheck
import { TestCaseContext } from '../../interface';
import { Graph, Extensions, extend } from '../../../../src/index';
let graph: IGraph;
let container: HTMLElement;

const defaultData = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 100,
        y: 100,
      },
    },
    {
      id: 'node2',
      data: {
        x: 400,
        y: 200,
      },
    },
    {
      id: 'obstacle',
      data: { x: 300, y: 100 },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: {
        type: 'polyline-edge',
        keyShape: {
          stroke: '#f00',
          lineDash: [2, 2],
        },
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#0f0',
            lineWidth: 2,
          },
        },
        highlight: {
          keyShape: {
            stroke: '#00f',
            opacity: 0.5,
          },
        },
      },
    },
  ],
};

// create container for controllers
const createCtrlContainer = (container: HTMLElement) => {
  const ctrlContainer = document.createElement('div');
  ctrlContainer.id = 'ctrl-container';
  ctrlContainer.style.width = '100%';
  ctrlContainer.style.height = '350px';
  ctrlContainer.style.backgroundColor = '#eee';

  container.appendChild(ctrlContainer);
};

let outerTop = 64;

const createLabelCheckbox = (
  container: HTMLElement,
  labelText: string,
  checkedCallback: () => void,
  uncheckedCallback: () => void,
  top?: number,
) => {
  if (!container) return;

  let innerTop = top;
  if (!top) {
    innerTop = outerTop;
    outerTop += 30;
  }

  const label = document.createElement('span');
  label.textContent = labelText;
  label.style.position = 'absolute';
  label.style.top = `${innerTop}px`;
  label.style.left = '16px';
  label.style.zIndex = '100';

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.value = 'highlight';
  cb.style.position = 'absolute';
  cb.style.width = '20px';
  cb.style.height = '20px';
  cb.style.top = `${innerTop}px`;
  cb.style.left = '400px';
  cb.style.zIndex = '100';

  cb.addEventListener('click', (e) => {
    cb.checked ? checkedCallback() : uncheckedCallback();
  });

  container.appendChild(label);
  container.appendChild(cb);
};

// Create options and control buttons (for selecting different features to test)
const createControls = () => {
  const parentEle = document.getElementById('ctrl-container')!;

  // label
  createLabelCheckbox(
    parentEle,
    'show label',
    () => {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: 'edge-label',
          },
        },
      });
    },
    () => {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: '',
          },
        },
      });
    },
  );

  // icon
  createLabelCheckbox(
    parentEle,
    'show icon',
    () => {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: 'police car',
          },
          iconShape: {
            img: 'https://cz.xiaqianghui.com/exampledir/警车.svg',
            // text: 'A',
            fill: '#f00',
            fontSize: 20,
          },
        },
      });
    },
    () => {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: 'non-icon',
          },
          iconShape: {
            img: '',
          },
        },
      });
    },
  );

  // custom selected style
  createLabelCheckbox(
    parentEle,
    'custom selected style',
    () => {
      graph.setItemState('edge1', 'selected', true);
    },
    () => {
      graph.setItemState('edge1', 'selected', false);
    },
  );

  // custom highlighted style
  createLabelCheckbox(
    parentEle,
    'custom highlight style',
    () => {
      graph.setItemState('edge1', 'highlight', true);
    },
    () => {
      graph.setItemState('edge1', 'highlight', false);
    },
  );

  // add border radius
  createLabelCheckbox(
    parentEle,
    'add border radius',
    () => {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          keyShape: {
            radius: 25,
          },
        },
      });
    },
    () => {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          keyShape: {
            radius: 0,
          },
        },
      });
    },
  );

  // show obstacle
  createLabelCheckbox(
    parentEle,
    'show obstacle',
    () => {
      graph.showItem('obstacle');
      // graph.updateNodePosition({
      //   id: 'obstacle',
      //   data: {
      //     x: 300,
      //     y: 100,
      //   },
      // });
    },
    () => {
      graph.hideItem('obstacle');

      // graph.updateNodePosition({
      //   id: 'obstacle',
      //   data: {
      //     x: -200,
      //     y: -100,
      //   },
      // });
    },
  );

  // enable automatic obstacle avoidance
  createLabelCheckbox(
    parentEle,
    'enable automatic obstacle avoidance',
    () => {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          keyShape: {
            routeCfg: {
              obstacleAvoidance: true,
            },
          },
        },
      });
    },
    () => {
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          keyShape: {
            routeCfg: {
              obstacleAvoidance: false,
            },
          },
        },
      });
    },
  );

  // prevent obstacle to overlap edges
  createLabelCheckbox(
    parentEle,
    'enable obstacle to avoid overlapping with edges',
    () => {
      graph.updateData('node', {
        id: 'obstacle',
        data: {
          preventPolylineEdgeOverlap: true,
        },
      });
    },
    () => {
      graph.updateData('node', {
        id: 'obstacle',
        data: {
          preventPolylineEdgeOverlap: false,
        },
      });
    },
  );

  // move obstacle
  createLabelCheckbox(
    parentEle,
    'move obstacle',
    () => {
      graph.updateNodePosition({
        id: 'obstacle',
        data: {
          x: 350,
          y: 100,
        },
      });
    },
    () => {
      graph.updateNodePosition({
        id: 'obstacle',
        data: {
          x: 300,
          y: 100,
        },
      });
    },
  );
};

export default (context: TestCaseContext) => {
  const { container } = context;

  // 1.create control container (for control buttons, etc.)
  createCtrlContainer(container!);
  createControls();
  const ExtGraph = extend(Graph, {
    edges: {
      'polyline-edge': Extensions.PolylineEdge
    },
    behaviors: {
      'activate-relations': Extensions.ActivateRelations,
    }
  });
  // 2.create graph
  graph = new ExtGraph({
    ...context,
    type: 'graph',
    data: defaultData,
    modes: {
      // supported behavior
      default: ['activate-relations', 'drag-node'],
    },
    edge: (edgeInnerModel: any) => {
      const { id, data } = edgeInnerModel;
      return { id, data };
    },
  });

  setTimeout(() => {
    graph.hideItem('obstacle');
  });

  // 3.return graph
  return graph;
};
