import G6 from '../../../../src';

G6.registerNode('selfCircle', {
  drawShape(cfg, group) {
    const style = this.getShapeStyle(cfg);
    const keyShape = group.addShape('circle', {
      attrs: style
    });
    return keyShape;
  },
  afterDraw(cfg, group) {
    const shape = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 20,
        height: 30,
        fill: 'blue'
      }
    });
    return shape;
  }
}, 'circle');

const nodes = [];
for (let i = 0; i < 500; i++) {
  nodes.push({
    id: `node-${i}`,
    label: `label-${i}`,
    x: Math.random() * 650,
    y: Math.random() * 550
  });
}
const data = {
  nodes
};

const graph = new G6.Graph({
  container: 'container',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'rect',
    size: [ 60, 30 ],
    color: 'green',
    style: {
      // fill: 'red',
      // stroke: '#eaff8f',
      lineWidth: 5
    },
    labelCfg: {
      style: {
        fill: '#9254de',
        fontSize: 18
      }
    },
    linkPoints: {
      top: true,
      bottom: true,
      left: true,
      right: true,
      size: 5,
      fill: '#fff'
    }
  },
  nodeStateStyles: {
    hover: {
      fill: '#d3adf7'
    }
  },
  modes: {
    default: [ 'drag-canvas', 'drag-node', {
      type: 'brush-select',
      trigger: 'ctrl'
    }]
  }
});

graph.data(data);
graph.render();

graph.on('node:click', evt => {
  const { item } = evt;
  graph.setItemState(item, 'select', true);
  graph.updateItem(item, {
    size: [ 260, 130 ],
    style: {
      opacity: 0.6
    },
    preRect: {
      fill: 'blue'
    },
    linkPoints: {
      fill: '#fff',
      size: 5
    },
    stateIcon: {
      img: 'https://gw.alipayobjects.com/zos/basement_prod/c781088a-c635-452a-940c-0173663456d4.svg'
    }
  });
});

graph.on('node:mouseenter', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', true);
});

graph.on('node:mouseleave', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', false);
});

// graph.addItem('group', {
//   nodes: ['image', 'triangle'],
//   type: 'rect',
//   zIndex: 0,
//   title: {
//     text: '名称'
//   }
// })
