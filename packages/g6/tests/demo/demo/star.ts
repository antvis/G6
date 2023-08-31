// 这是从外部引入的功能
import { TestCaseContext } from '../interface';
import { Graph, Extensions, extend } from '../../../src/index';

let graph: any;

const createCtrlContainer = (container: HTMLElement) => {
  const ctrlContainer = document.createElement('div');
  ctrlContainer.id = 'ctrl-container';
  ctrlContainer.style.width = '100%';
  ctrlContainer.style.height = '200px';
  ctrlContainer.style.backgroundColor = '#eee';
  container.appendChild(ctrlContainer);
};

const createCtrl = () => {
  const conEle = document.querySelector('div#ctrl-container')!;
  const selectedStyleLabel = document.createElement('span');
  selectedStyleLabel.textContent = 'custom selected style';
  // selectedStyleLabel.style.position = 'absolute';
  selectedStyleLabel.style.top = '124px';
  selectedStyleLabel.style.left = '16px';
  selectedStyleLabel.style.zIndex = '100';

  const selectedStyleCb = document.createElement('input');
  selectedStyleCb.setAttribute('id', 'selected');
  selectedStyleCb.type = 'checkbox';
  selectedStyleCb.value = 'selected';
  // selectedStyleCb.style.position = 'absolute';
  selectedStyleCb.style.width = '20px';
  selectedStyleCb.style.height = '20px';
  selectedStyleCb.style.top = '124px';
  selectedStyleCb.style.left = '166px';
  selectedStyleCb.style.zIndex = '100';

  selectedStyleCb.addEventListener('click', (e) => {
    if (selectedStyleCb.checked) {
      graph.setItemState('node1', 'selected', true);
    } else {
      graph.setItemState('node1', 'selected', false);
    }
  });
  conEle.appendChild(selectedStyleLabel);
  conEle.appendChild(selectedStyleCb);
};

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 100,
        y: 100,
        type: 'star-node',
      },
    },
    {
      id: 'node2',
      data: {
        x: 200,
        y: 100,
        type: 'rect-node',
      },
    },
  ],
  edges: [
    {
      id: 3,
      source: 'node1',
      target: 'node2',
      data: {},
    },
  ],
};

export default (context: TestCaseContext) => {
  const { width, height, container } = context;
  createCtrlContainer(container!);
  createCtrl();

  const ExtGraph = extend(Graph, {
    nodes: {
      'star-node': Extensions.StarNode,
    },
  });

  graph = new ExtGraph({
    ...context,
    type: 'graph',
    data,
    modes: {
      default: ['click-select', 'drag-node'],
    },
    node: (nodeInnerModel: any) => {
      const { id, data } = nodeInnerModel;
      return {
        id,
        data: {
          ...data,
          keyShape: {
            height: 50,
            width: 50,
          },
          labelShape: {
            text: 'label',
            position: 'bottom',
          },
          iconShape: {
            // img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            text: 'label',
          },
          badgeShapes: [
            {
              text: '1',
              position: 'rightTop',
              color: 'blue',
            },
          ],
          labelBackgroundShape: {
            fill: 'red',
          },
          anchorShapes: [
            {
              position: 'right',
              r: 2,
              fill: 'red',
            },
          ],
        },
      };
    },
  });

  return graph;
};
