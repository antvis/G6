import { Graph, Extensions, extend } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 250,
        y: 150,
        type: 'modelRect-node',
      },
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  nodes: {
    'modelRect-node': Extensions.ModelRectNode,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
  },
  data,
  node: (innerModel) => {
    return {
      ...innerModel,
      data: {
        ...innerModel.data,
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
          // left rect
          preRect: {
            fill: '#5CAAF8',
          },
          // text description
          description: {
            show: true,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum dapibus lectus, sit amet volutpat ante commodo et. Nulla auctor metus id mauris iaculis tempus. Nunc tincidunt libero et justo laoreet, id tristique purus efficitur. Integer aliquet risus nec ullamcorper bibendum. Proin luctus enim a odio aliquam, id condimentum lorem fermentum. Vivamus fermentum lacus vitae metus placerat, eu rutrum est lacinia. Aenean ullamcorper rhoncus ligula, a facilisis metus eleifend nec. Sed scelerisque, ipsum eget consectetur fermentum, sapien orci bibendum ligula, eget aliquam dolor augue vitae mauris. Cras at justo at lectus tempor fringilla. In ac dolor et elit semper sollicitudin. Duis ac volutpat nunc, sed fringilla leo. Nunc tempus, justo eu consequat lobortis, sapien eros varius nulla, vitae pretium libero magna nec ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam id nisi vel nibh eleifend tempor. Fusce eget eleifend augue.',
            fontSize: 12,
            offsetX: 0,
            offsetY: 0,
          },
          // left icon describing the information
          logoIcon: {
            img: 'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
            // text: 'logo',
            width: 16,
            height: 16,
            offsetX: 0,
            offsetY: 0,
          },
          // right icon describing the state
          stateIcon: {
            img: 'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
            // text: 'state',
            width: 16,
            height: 16,
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
    };
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
