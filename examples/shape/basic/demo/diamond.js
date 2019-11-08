import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'diamond',
      label: 'Diamond',
      x: 250,
      y: 150
    }
  ]
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  defaultNode: {
    shape: 'diamond',
    size: [ 180, 180 ],
    style: {
      fill: '#69c0ff',
      stroke: '#bae7ff',
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: '#1890ff',
        fontSize: 18
      },
      position: 'bottom'
    },
    // 节点上左右上下四个方向上的链接circle配置
    linkPoints: {
      top: false,
      bottom: false,
      left: true,
      right: true,
      size: 5,
      fill: '#fff',
      lineWidth: 1,
      stroke: '#72CC4A'
    },
    // 节点中icon配置
    icon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      // icon的地址，字符串类型
      img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      width: 60,
      height: 60
    }
  },
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  },
  nodeStateStyles: {
    // 鼠标hover状态下的配置
    hover: {
      fillOpacity: 0.8
    },
    // 选中节点状态下的配置
    selected: {
      lineWidth: 5
    }
  }
});

graph.data(data);
graph.render();

graph.on('node:mouseenter', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', true);
});

graph.on('node:mouseleave', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', false);
});

graph.on('node:click', evt => {
  const { item } = evt;
  graph.setItemState(item, 'selected', true);
});
