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
        x: 200,
        y: 100,
        type: 'modelRect-node',
      },
    },
    {
      id: 'node2',
      data: {
        x: 400,
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
      'modelRect-node': Extensions.ModelRectNode,
    },
  });
  graph = new ExtGraph({
    ...context,
    data,
    modes: {
      default: ['click-select', 'drag-node'],
    },
    node: (nodeInnerModel: any) => {
      const { id, data } = nodeInnerModel;
      if (id === 'node1') {
        return {
          id,
          data: {
            ...data,
            labelShape: {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum dapibus lectus, sit amet volutpat ante commodo et. Nulla auctor metus id mauris iaculis tempus. Nunc tincidunt libero et justo laoreet, id tristique purus efficitur. Integer aliquet risus nec ullamcorper bibendum. Proin luctus enim a odio aliquam, id condimentum lorem fermentum. Vivamus fermentum lacus vitae metus placerat, eu rutrum est lacinia. Aenean ullamcorper rhoncus ligula, a facilisis metus eleifend nec. Sed scelerisque, ipsum eget consectetur fermentum, sapien orci bibendum ligula, eget aliquam dolor augue vitae mauris. Cras at justo at lectus tempor fringilla. In ac dolor et elit semper sollicitudin. Duis ac volutpat nunc, sed fringilla leo. Nunc tempus, justo eu consequat lobortis, sapien eros varius nulla, vitae pretium libero magna nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam id nisi vel nibh eleifend tempor. Fusce eget eleifend augue.',
              // offsetX: 0,
              // offsetY: 0,
              position: 'bottom',
              maxWidth: '0',
            },
            anchorShapes: [
              {
                position: 'left',
                r: 2,
                fill: 'red',
              },
            ],
            otherShapes: {
              preRect: {
                fill: '#5CAAF8',
              }, //left rect
              description: {
                show: true,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum dapibus lectus, sit amet volutpat ante commodo et. Nulla auctor metus id mauris iaculis tempus. Nunc tincidunt libero et justo laoreet, id tristique purus efficitur. Integer aliquet risus nec ullamcorper bibendum. Proin luctus enim a odio aliquam, id condimentum lorem fermentum. Vivamus fermentum lacus vitae metus placerat, eu rutrum est lacinia. Aenean ullamcorper rhoncus ligula, a facilisis metus eleifend nec. Sed scelerisque, ipsum eget consectetur fermentum, sapien orci bibendum ligula, eget aliquam dolor augue vitae mauris. Cras at justo at lectus tempor fringilla. In ac dolor et elit semper sollicitudin. Duis ac volutpat nunc, sed fringilla leo. Nunc tempus, justo eu consequat lobortis, sapien eros varius nulla, vitae pretium libero magna nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam id nisi vel nibh eleifend tempor. Fusce eget eleifend augue.',
                fontSize: 12,
                offsetX: 0,
                offsetY: 0,
              }, //text description
              logoIcon: {
                img: 'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
                // text: '111',
                width: 16,
                height: 16,
                offsetX: 0,
                offsetY: 0,
              }, //left icon describing the information
              stateIcon: {
                img: 'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
                // text: '111',
                width: 16,
                height: 16,
                offsetX: 0,
                offsetY: 0,
              }, //right icon describing the state
            },
          },
        };
      }
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
            img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            // text: 'label',
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
              position: [0, 0.5],
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
