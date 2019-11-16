import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'circle',
      label: 'Triangle',
      x: 250,
      y: 200
    }
  ]
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  defaultNode: {
    shape: 'triangle',
    size: [ 100 ],
    // 可取值：down、up
    direction: 'up',
    style: {
      fill: '#9EC9FF',
      stroke: '#5B8FF9',
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: '#1890ff',
        fontSize: 18
      },
      position: 'bottom'
    },
    // 节点上各个方向上的链接circle配置
    linkPoints: {
      top: true,
      right: true,
      bottom: true,
      left: true,
      // circle的大小
      size: 5,
      lineWidth: 1,
      fill: '#fff',
      stroke: '#1890FF'
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
