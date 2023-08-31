import { deepMix } from '@antv/util';
import {
  Graph,
  EdgeUserModel,
  Extensions,
  extend,
} from '../../../../src/index';

import { TestCaseContext } from '../../interface';
// @ts-nocheck

let graph: IGraph;
let container: HTMLElement;

const loopPosition = [
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left',
  'top-left',
];

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
      data: { x: 200, y: 100, type: 'rect-node' },
    },
    {
      id: 'node3',
      data: {
        x: 350,
        y: 100,
        type: 'ellipse-node',
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node1',
      data: {
        type: 'loop-edge',
        keyShape: {
          endArrow: true,
        },
      },
    },
    {
      id: 'edge2',
      source: 'node2',
      target: 'node2',
      data: {
        type: 'loop-edge',
        keyShape: {
          endArrow: true,
        },
      },
    },
    {
      id: 'edge3',
      source: 'node3',
      target: 'node3',
      data: {
        type: 'loop-edge',
        keyShape: {
          endArrow: true,
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
  ctrlContainer.style.height = '150px';
  ctrlContainer.style.backgroundColor = '#eee';

  container.appendChild(ctrlContainer);
};

let outerTop = 64;

const createLabelCheckbox = (
  container: HTMLElement,
  labelText: string,
  checkedCallback: () => void,
  uncheckedCallback: () => void,
  isChecked = false,
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
  cb.checked = Boolean(isChecked);

  cb.addEventListener('click', (e) => {
    cb.checked ? checkedCallback() : uncheckedCallback();
  });

  container.appendChild(label);
  container.appendChild(cb);
};

// Create options and control buttons (for selecting different features to test)
const createControls = () => {
  const parentEle = document.getElementById('ctrl-container')!;

  // clockwise
  createLabelCheckbox(
    parentEle,
    'clockwise',
    () => {
      graph.getAllEdgesData().forEach((edgeData) => {
        const newData = deepMix({}, edgeData, {
          data: {
            keyShape: {
              loopCfg: {
                clockwise: true,
              },
            },
          },
        }) as Partial<EdgeUserModel>;
        graph.updateData('edge', newData);
      });
    },
    () => {
      graph.getAllEdgesData().forEach((edgeData) => {
        const newData = deepMix({}, edgeData, {
          data: {
            keyShape: {
              loopCfg: {
                clockwise: false,
              },
            },
          },
        }) as Partial<EdgeUserModel>;
        graph.updateData('edge', newData);
      });
    },
    true,
  );

  // custom dist
  createLabelCheckbox(
    parentEle,
    'custom dist',
    () => {
      graph.getAllEdgesData().forEach((edgeData) => {
        const newData = deepMix({}, edgeData, {
          data: {
            keyShape: {
              loopCfg: {
                dist: 100,
              },
            },
          },
        }) as Partial<EdgeUserModel>;
        graph.updateData('edge', newData);
      });
    },
    () => {
      graph.getAllEdgesData().forEach((edgeData) => {
        const newData = deepMix({}, edgeData, {
          data: {
            keyShape: {
              loopCfg: {
                dist: 0,
              },
            },
          },
        }) as Partial<EdgeUserModel>;
        graph.updateData('edge', newData);
      });
    },
  );

  // change loop position
  const changeLoopPositionBtn = document.createElement('button');
  changeLoopPositionBtn.innerText = 'Change loop position';
  changeLoopPositionBtn.style.position = 'absolute';
  changeLoopPositionBtn.style.top = '124px';
  changeLoopPositionBtn.style.left = '16px';
  let i = 1;
  changeLoopPositionBtn.addEventListener('click', () => {
    graph.getAllEdgesData().forEach((edgeData) => {
      const newData = deepMix({}, edgeData, {
        data: {
          keyShape: {
            loopCfg: {
              position: loopPosition[i % loopPosition.length],
            },
          },
        },
      }) as Partial<EdgeUserModel>;
      graph.updateData('edge', newData);
    });
    i++;
  });
  parentEle.appendChild(changeLoopPositionBtn);
};

export default (context: TestCaseContext) => {
  const { container } = context;

  // 1.create control container (for control buttons, etc.)
  createCtrlContainer(container!);
  createControls();
  const ExtGraph = extend(Graph, {
    nodes: {
      'ellipse-node': Extensions.EllipseNode,
    },
    behaviors: {
      'activate-relations': Extensions.ActivateRelations,
    },
    edges: {
      'loop-edge': Extensions.LoopEdge,
    },
  });
  graph = new ExtGraph({
    ...context,
    data: defaultData,
    modes: {
      // supported behavior
      default: ['activate-relations'],
    },
    edge: (edgeInnerModel: any) => {
      const { id, data } = edgeInnerModel;
      return { id, data };
    },
  });

  // 3.return graph
  return graph;
};
