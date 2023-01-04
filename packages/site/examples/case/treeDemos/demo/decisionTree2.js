import G6 from '@antv/g6';

// root node
G6.registerNode('root', {
  draw: (cfg, group) => {
    const size = [80, 30];
    const keyShape = group.addShape('rect', {
      attrs: {
        width: size[0],
        height: size[1],
        x: -size[0] / 2,
        y: -size[1] / 2,
        fill: 'rgb(19, 33, 92)',
        radius: 5
      },
      draggable: true,
      name: 'root-keyshape'
    });
    group.addShape('text', {
      attrs: {
        text: `${cfg.ratio}%`,
        fill: 'rgba(255, 255, 255, 0.85)',
        fontSize: 6,
        x: 10 - size[0] / 2,
        y: 3,
      },
      draggable: true,
      name: 'ratio-shape'
    });
    group.addShape('text', {
      attrs: {
        text: `${cfg.label}`,
        fill: 'rgba(255, 255, 255, 0.85)',
        fontSize: 9,
        x: -6,
        y: 0,
      },
      draggable: true,
      name: 'label-shape'
    });
    group.addShape('line', {
      attrs: {
        x1: -6,
        x2: 35,
        y1: 2,
        y2: 2,
        stroke: 'rgba(255, 255, 255, 0.85)',
        lineWidth: 0.5
      },
      draggable: true,
      name: 'divider-shape'
    });
    group.addShape('text', {
      attrs: {
        text: `${cfg.subLabel}`,
        fill: 'rgba(255, 255, 255, 0.65)',
        fontSize: 6,
        x: -6,
        y: 10,
      },
      draggable: true,
      name: 'sublabel-shape'
    });
    return keyShape;
  }
});

// level1 node
G6.registerNode('level1node', {
  draw: (cfg, group) => {
    const size = [60, 40]
    const keyShape = group.addShape('rect', {
      attrs: {
        width: size[0],
        height: size[1],
        x: -size[0] / 2,
        y: -size[1] / 2,
        fill: 'rgb(213, 225, 247)',
        radius: 5
      },
      draggable: true,
      name: 'level1node-keyshape'
    });
    group.addShape('text', {
      attrs: {
        text: `${cfg.label}`,
        fill: 'rgba(19, 33, 92, 0.65)',
        fontSize: 6,
        x: 0,
        y: -6,
        textAlign: 'center'
      },
      draggable: true,
      name: 'label-shape'
    });
    group.addShape('text', {
      attrs: {
        text: `${cfg.subLabel}`,
        fill: 'rgba(19, 33, 92, 0.65)',
        fontSize: 8,
        x: 0,
        y: 6,
        fontWeight: 800,
        textAlign: 'center'
      },
      draggable: true,
      name: 'sublabel-shape'
    });
    group.addShape('rect', {
      attrs: {
        x: -12,
        y: 8,
        width: 25,
        height: 8,
        radius: 4,
        fill: cfg.increase ? 'rgb(127, 193, 193)' : 'rgb(220, 124, 125)'
      },
      draggable: true,
      name: 'ratio-box',
    })
    group.addShape('text', {
      attrs: {
        text: `${cfg.ratio}%`,
        fill: 'rgba(255, 255, 255, 0.85)',
        fontSize: 6,
        x: 0,
        y: 9,
        textAlign: 'center',
        textBaseline: 'top'
      },
      draggable: true,
      name: 'ratio-shape'
    });
    // edge end
    group.addShape('line', {
      attrs: {
        x1: -size[0] / 2,
        x2: -size[0] / 2 + 6,
        y1: 0,
        y2: 0,
        lineWidth: 1,
        stroke: 'rgb(19, 33, 92)',
      }
    });
    group.addShape('circle', {
      attrs: {
        r: 2,
        x: -size[0] / 2 + 6,
        y: 0,
        fill: 'rgb(19, 33, 92)',
      }
    })
    return keyShape;
  },
  update: undefined,
}, 'rect')

// other node
G6.registerNode('othernode', {
  draw: (cfg, group) => {
    const size = [100, 30];
    const keyShape = group.addShape('rect', {
      attrs: {
        width: size[0],
        height: size[1],
        x: -size[0] / 2,
        y: -size[1] / 2,
        fill: 'rgb(213, 225, 247)',
        radius: 5
      },
      draggable: true,
      name: 'level1node-keyshape'
    });
    group.addShape('text', {
      attrs: {
        text: `${cfg.label}`,
        fill: 'rgba(19, 33, 92, 0.65)',
        fontSize: 6,
        x: 10 - size[0] / 2,
        y: -2,
        textAlign: 'left'
      },
      draggable: true,
      name: 'label-shape'
    });
    group.addShape('text', {
      attrs: {
        text: `${cfg.subLabel}`,
        fill: 'rgba(19, 33, 92, 0.65)',
        fontSize: 8,
        fontWeight: 800,
        x: 10 - size[0] / 2,
        y: 8,
        textAlign: 'left'
      },
      draggable: true,
      name: 'sublabel-shape'
    });
    group.addShape('rect', {
      attrs: {
        x: 12,
        y: -4,
        width: 25,
        height: 8,
        radius: 4,
        fill: cfg.increase ? 'rgb(127, 193, 193)' : 'rgb(220, 124, 125)'
      },
      draggable: true,
      name: 'ratio-box'
    })
    group.addShape('text', {
      attrs: {
        text: `${cfg.ratio}%`,
        fill: 'rgba(255, 255, 255, 0.85)',
        fontSize: 6,
        x: 18,
        y: -3,
        textAlign: 'left',
        textBaseline: 'top'
      },
      draggable: true,
      name: 'ratio-shape'
    });
    if (cfg.operator) {
      group.addShape('rect', {
        attrs: {
          x: -8,
          y: 27,
          width: 16,
          height: 16,
          lineWidth: 1,
          stroke: '#aaa',
          lineDash: [2, 1],
          opacity: 0
        },
        name: 'operator-box'
      });
      group.addShape('circle', {
        attrs: {
          r: 6,
          x: 0,
          y: 35,
          fill: 'rgba(240, 90, 109, 0.15)'
        },
        name: 'operator-circle'
      });
      group.addShape('text', {
        attrs: {
          text: cfg.operator,
          x: 0,
          y: 34,
          fontSize: 12,
          fill: 'rgba(240, 90, 109, 0.85)',
          textAlign: 'center',
          textBaseline: 'middle'
        },
        name: 'operator-symbol'
      });
    }

    // edge end
    group.addShape('line', {
      attrs: {
        x1: -size[0] / 2,
        x2: -size[0] / 2 + 6,
        y1: 0,
        y2: 0,
        lineWidth: 1,
        stroke: 'rgb(19, 33, 92)',
      }
    });
    group.addShape('circle', {
      attrs: {
        r: 2,
        x: -size[0] / 2 + 6,
        y: 0,
        fill: 'rgb(19, 33, 92)',
      }
    })
    return keyShape;
  },
  update: undefined
}, 'rect')

// edge
G6.registerEdge('round-poly', {
  getControlPoints: (cfg) => {
    const { startPoint, endPoint } = cfg;
    return [
      startPoint,
      {
        x: startPoint.x,
        y: endPoint.y
      },
      endPoint
    ];
  }
}, 'polyline')

const data = {
  id: 'root',
  label: '利息收入',
  subLabel: '3,283.456',
  ratio: 3,
  children: [{
    id: 'child-a',
    label: '平均利息',
    subLabel: '9%',
    ratio: 1,
    increase: true,
  }, {
    id: 'child-b',
    label: '贷款余额',
    subLabel: '1,789,567',
    ratio: 23,
    increase: true,
    children: [{
      id: 'child-b-a',
      label: '投放金额',
      subLabel: '2,385,124',
      ratio: 17,
      increase: true,
      operator: '-',
    }, {
      id: 'child-b-b',
      label: '还款金额',
      subLabel: '595,557',
      ratio: 12,
      increase: true,
    }
    ]
  }, {
    id: 'child-c',
    label: '还款期限',
    subLabel: '7',
    ratio: 23,
    increase: false,
  }
  ]
};

G6.Util.traverseTree(data, subtree => {
  if (subtree.level === undefined) subtree.level = 0;
  subtree.children?.forEach(child => child.level = subtree.level + 1);
  switch (subtree.level) {
    case 0:
      subtree.type = 'root';
      break;
    case 1:
      subtree.type = 'level1node';
      break;
    default:
      subtree.type = 'othernode';
  }
});

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const graph = new G6.TreeGraph({
  container: 'container',
  width,
  height,
  fitView: true,
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getHGap: function getVGap() {
      return 5;
    },
  },
  defaultEdge: {
    type: 'round-poly',
    sourceAnchor: 0,
    targetAnchor: 1,
    style: {
      radius: 8,
      stroke: 'rgb(19, 33, 92)'
    }
  },
  defaultNode: {
    anchorPoints: [
      [0.9, 0.5],
      [0, 0.5]
    ]
  },
  nodeStateStyles: {
    hover: {
      fill: '#fff',
      shadowBlur: 30,
      shadowColor: '#ddd',
    },
    operatorhover: {
      'operator-box': {
        opacity: 1
      }
    }
  },
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'collapse-expand']
  }
});

graph.on('node:mouseenter', e => {
  if (e.target.get('name')?.includes('operator')) {
    graph.setItemState(e.item, 'operatorhover', true);
  } else {
    graph.setItemState(e.item, 'hover', true);
  }
})
graph.on('node:mouseleave', e => {
  graph.setItemState(e.item, 'operatorhover', false);
  graph.setItemState(e.item, 'hover', false);
});

graph.data(data);
graph.render();

