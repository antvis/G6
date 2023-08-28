import { Graph, IGraph } from '../../../../src/index';

let outerTop = 0;
let graph: IGraph;

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

const createOperationContainer = (container: HTMLElement) => {
  const operationContainer = document.createElement('div');
  operationContainer.id = 'ctrl-container';
  operationContainer.style.width = '100%';
  operationContainer.style.height = '150px';
  operationContainer.style.lineHeight = '50px';
  operationContainer.style.backgroundColor = '#eee';

  container.appendChild(operationContainer);
};

const createOperations = (): any => {
  const parentEle = document.getElementById('ctrl-container');
  if (!parentEle) return;

  // Custom Donut Colors
  createLabelCheckbox(
    parentEle,
    'custom donut colors',
    () => {
      graph.updateData('node', {
        id: 'node1',
        data: {
          donutShapes: {
            colorMap: {
              income: '#78D3F8',
              outcome: '#F08BB4',
              unknown: '#65789B',
            },
          },
        },
      });
    },
    () => {
      graph.updateData('node', {
        id: 'node1',
        data: {
          donutShapes: {
            colorMap: {},
          },
        },
      });
    },
  );

  // Custom Donut innerSize
  createLabelCheckbox(
    parentEle,
    'update donut innerSize',
    () => {
      graph.updateData('node', {
        id: 'node1',
        data: {
          donutShapes: {
            innerSize: 0.8,
          },
        },
      });
    },
    () => {
      graph.updateData('node', {
        id: 'node1',
        data: {
          donutShapes: {
            innerSize: 0.6,
          },
        },
      });
    },
  );

  // Custom Donut attrs
  createLabelCheckbox(
    parentEle,
    'update donut attrs',
    () => {
      graph.updateData('node', {
        id: 'node1',
        data: {
          donutShapes: {
            attrs: {
              income: 280,
            },
          },
        },
      });
    },
    () => {
      graph.updateData('node', {
        id: 'node1',
        data: {
          donutShapes: {
            attrs: {
              income: 80,
              outcome: 40,
              unknown: 45,
            },
          },
        },
      });
    },
  );

  // select
  createLabelCheckbox(
    parentEle,
    'custom selected style',
    () => {
      graph.setItemState('node1', 'selected', true);
    },
    () => {
      graph.setItemState('node1', 'selected', false);
    },
  );
};

export default (context) => {
  const { container } = context;

  // 1.create operation container
  createOperationContainer(container!);

  const data = {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 100,
          y: 100,
          type: 'donut-node',
          keyShape: {
            r: 30,
          },
          labelShape: {
            text: 'label',
            position: 'bottom',
          },
          labelBackgroundShape: {
            fill: 'red',
          },
          anchorShapes: [
            {
              position: [0, 0.5],
              r: 2,
              fill: 'red',
            },
          ],
          iconShape: {
            img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            width: 20,
            height: 20,
          },
          badgeShapes: [
            {
              text: '1',
              position: 'rightTop',
              color: 'blue',
            },
          ],
          donutShapes: {
            attrs: {
              income: 80,
              outcome: 40,
              unknown: 45,
            },
          },
        },
      },
    ],
  };

  // @ts-ignore
  graph = new Graph({
    ...context,
    data,
    type: 'graph',
    modes: {
      default: ['drag-canvas', 'drag-node', 'click-select', 'hover-activate'],
    },
    node: (nodeInnerModel: any) => {
      const { id, data } = nodeInnerModel;
      return {
        id,
        data: {
          keyShape: {
            r: 16,
          },
          ...data,
        },
      };
    },
  });

  // 2.create operations
  createOperations();

  return graph;
};
