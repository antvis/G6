import G6 from '@antv/g6';

const ERROR_COLOR = '#F5222D';
const getNodeConfig = node => {
  if (node.nodeError) {
    return {
      basicColor: ERROR_COLOR,
      fontColor: '#FFF',
      borderColor: ERROR_COLOR,
      bgColor: '#E66A6C'
    };
  }
  let config = {
    basicColor: '#5B8FF9',
    fontColor: '#5B8FF9',
    borderColor: '#5B8FF9',
    bgColor: '#C6E5FF'
  };
  switch (node.type) {
    case 'root': {
      config = {
        basicColor: '#E3E6E8',
        fontColor: 'rgba(0,0,0,0.85)',
        borderColor: '#E3E6E8',
        bgColor: '#5b8ff9'
      };
      break;
    }
    default:
      break;
  }
  return config;
};

const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
  [ 'M', x - r, y ],
  [ 'a', r, r, 0, 1, 0, r * 2, 0 ],
  [ 'a', r, r, 0, 1, 0, -r * 2, 0 ],
  [ 'M', x - r + 4, y ],
  [ 'L', x - r + 2 * r - 4, y ]
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
  [ 'M', x - r, y ],
  [ 'a', r, r, 0, 1, 0, r * 2, 0 ],
  [ 'a', r, r, 0, 1, 0, -r * 2, 0 ],
  [ 'M', x - r + 4, y ],
  [ 'L', x - r + 2 * r - 4, y ],
  [ 'M', x - r + r, y - r + 4 ],
  [ 'L', x, y + r - 4 ]
  ];
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: [ 'drag-node' ]
  },
  defaultNode: {
    shape: 'card-node'
  }
});

const nodeBasicMethod = {
  createNodeBox: (group, config, width, height, isRoot) => {
  /* 最外面的大矩形 */
    const container = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height
      }
    });
    if (!isRoot) {
    /* 左边的小圆点 */
      group.addShape('circle', {
        attrs: {
          x: 3,
          y: height / 2,
          r: 6,
          fill: config.basicColor
        }
      });
    }
  /* 矩形 */
    group.addShape('rect', {
      attrs: {
        x: 3,
        y: 0,
        width: width - 19,
        height,
        fill: config.bgColor,
        stroke: config.borderColor,
        radius: 2,
        cursor: 'pointer'
      }
    });

  /* 左边的粗线 */
    group.addShape('rect', {
      attrs: {
        x: 3,
        y: 0,
        width: 3,
        height,
        fill: config.basicColor,
        radius: 1.5
      }
    });
    return container;
  },
/* 生成树上的 marker */
  createNodeMarker: (group, collapsed, x, y) => {
    group.addShape('circle', {
      attrs: {
        x,
        y,
        r: 13,
        fill: 'rgba(47, 84, 235, 0.05)',
        opacity: 0,
        zIndex: -2
      },
      className: 'collapse-icon-bg'
    });
    group.addShape('marker', {
      attrs: {
        x,
        y,
        radius: 7,
        symbol: collapsed ? EXPAND_ICON : COLLAPSE_ICON,
        stroke: 'rgba(0,0,0,0.25)',
        fill: 'rgba(0,0,0,0)',
        lineWidth: 1,
        cursor: 'pointer'
      },
      className: 'collapse-icon'
    });
  },
  afterDraw: (cfg, group) => {
  /* 操作 marker 的背景色显示隐藏 */
    const icon = group.findByClassName('collapse-icon');
    if (icon) {
      const bg = group.findByClassName('collapse-icon-bg');
      icon.on('mouseenter', () => {
        bg.attr('opacity', 1);
        graph.get('canvas').draw();
      });
      icon.on('mouseleave', () => {
        bg.attr('opacity', 0);
        graph.get('canvas').draw();
      });
    }
  /* ip 显示 */
    const ipBox = group.findByClassName('ip-box');
    if (ipBox) {
    /* ip 复制的几个元素 */
      const ipLine = group.findByClassName('ip-cp-line');
      const ipBG = group.findByClassName('ip-cp-bg');
      const ipIcon = group.findByClassName('ip-cp-icon');
      const ipCPBox = group.findByClassName('ip-cp-box');

      const onMouseEnter = () => {
        ipLine.attr('opacity', 1);
        ipBG.attr('opacity', 1);
        ipIcon.attr('opacity', 1);
        graph.get('canvas').draw();
      };
      const onMouseLeave = () => {
        ipLine.attr('opacity', 0);
        ipBG.attr('opacity', 0);
        ipIcon.attr('opacity', 0);
        graph.get('canvas').draw();
      };
      ipBox.on('mouseenter', () => {
        onMouseEnter();
      });
      ipBox.on('mouseleave', () => {
        onMouseLeave();
      });
      ipCPBox.on('mouseenter', () => {
        onMouseEnter();
      });
      ipCPBox.on('mouseleave', () => {
        onMouseLeave();
      });
      ipCPBox.on('click', () => {});
    }
  },
  setState: (name, value, item) => {
    const hasOpacityClass = [
      'ip-cp-line',
      'ip-cp-bg',
      'ip-cp-icon',
      'ip-cp-box',
      'ip-box',
      'collapse-icon-bg'
    ];
    const group = item.getContainer();
    const childrens = group.get('children');
    graph.setAutoPaint(false);
    if (name === 'emptiness') {
      if (value) {
        childrens.forEach(shape => {
          if (hasOpacityClass.indexOf(shape.get('className')) > -1) {
            return;
          }
          shape.attr('opacity', 0.4);
        });
      } else {
        childrens.forEach(shape => {
          if (hasOpacityClass.indexOf(shape.get('className')) > -1) {
            return;
          }
          shape.attr('opacity', 1);
        });
      }
    }
    graph.setAutoPaint(true);
  }
};

G6.registerNode(
'card-node',
  {
    drawShape: (cfg, group) => {
      const config = getNodeConfig(cfg);
      const isRoot = cfg.type === 'root';
      const nodeError = cfg.nodeError;
    /* 最外面的大矩形 */
      const container = nodeBasicMethod.createNodeBox(
      group,
      config,
      243,
      64,
      isRoot
    );

      if (cfg.type !== 'root') {
      /* 上边的 type */
        group.addShape('text', {
          attrs: {
            text: cfg.type,
            x: 3,
            y: -10,
            fontSize: 12,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: 'rgba(0,0,0,0.65)'
          }
        });
      }

      if (cfg.ip) {
      /* ip start */
      /* ipBox */
        const ipRect = group.addShape('rect', {
          attrs: {
            fill: nodeError ? null : '#FFF',
            stroke: nodeError ? 'rgba(255,255,255,0.65)' : null,
            radius: 2,
            cursor: 'pointer'
          }
        });

      /* ip */
        const ipText = group.addShape('text', {
          attrs: {
            text: cfg.ip,
            x: 0,
            y: 19,
            fontSize: 12,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: nodeError ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.65)',
            cursor: 'pointer'
          }
        });

        const ipBBox = ipText.getBBox();
      /* ip 的文字总是距离右边 12px */
        ipText.attr({
          x: 224 - 12 - ipBBox.width
        });
      /* ipBox */
        ipRect.attr({
          x: 224 - 12 - ipBBox.width - 4,
          y: ipBBox.minY - 5,
          width: ipBBox.width + 8,
          height: ipBBox.height + 10
        });

      /* 在 IP 元素上面覆盖一层透明层，方便监听 hover 事件 */
        group.addShape('rect', {
          attrs: {
            stroke: '',
            cursor: 'pointer',
            x: 224 - 12 - ipBBox.width - 4,
            y: ipBBox.minY - 5,
            width: ipBBox.width + 8,
            height: ipBBox.height + 10,
            fill: '#fff',
            opacity: 0
          },
          className: 'ip-box'
        });

      /* copyIpLine */
        group.addShape('rect', {
          attrs: {
            x: 194,
            y: 7,
            width: 1,
            height: 24,
            fill: '#E3E6E8',
            opacity: 0
          },
          className: 'ip-cp-line'
        });
      /* copyIpBG */
        group.addShape('rect', {
          attrs: {
            x: 195,
            y: 8,
            width: 22,
            height: 22,
            fill: '#FFF',
            cursor: 'pointer',
            opacity: 0
          },
          className: 'ip-cp-bg'
        });
      /* copyIpIcon */
        group.addShape('image', {
          attrs: {
            x: 200,
            y: 13,
            height: 12,
            width: 10,
            img: 'https://os.alipayobjects.com/rmsportal/DFhnQEhHyPjSGYW.png',
            cursor: 'pointer',
            opacity: 0
          },
          className: 'ip-cp-icon'
        });
      /* 放一个透明的矩形在 icon 区域上，方便监听点击 */
        group.addShape('rect', {
          attrs: {
            x: 195,
            y: 8,
            width: 22,
            height: 22,
            fill: '#FFF',
            cursor: 'pointer',
            opacity: 0
          },
          className: 'ip-cp-box',
          tooltip: '复制IP'
        });

      /* ip end */
      }

    /* name */
      group.addShape('text', {
        attrs: {
          text: cfg.name,
          x: 19,
          y: 19,
          fontSize: 14,
          fontWeight: 700,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
          cursor: 'pointer'
        }
      // tooltip: cfg.name,
      });

    /* 下面的文字 */
      group.addShape('text', {
        attrs: {
          text: cfg.keyInfo,
          x: 19,
          y: 45,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
          cursor: 'pointer'
        }
      });

      if (nodeError) {
        group.addShape('text', {
          attrs: {
            x: 191,
            y: 62,
            text: '⚠️',
            fill: '#000',
            fontSize: 18
          }
        });
      }

      const hasChildren = cfg.children && cfg.children.length > 0;
      if (hasChildren) {
        nodeBasicMethod.createNodeMarker(group, cfg.collapsed, 236, 32);
      }
      return container;
    },
    afterDraw: nodeBasicMethod.afterDraw,
    setState: nodeBasicMethod.setState
  },
'single-shape'
);

const data = {
  nodes: [
    {
      name: 'cardNodeApp',
      ip: '127.0.0.1',
      nodeError: true,
      type: 'root',
      keyInfo: 'this is a card node info',
      x: 100,
      y: 50
    },
    {
      name: 'cardNodeApp',
      ip: '127.0.0.1',
      nodeError: false,
      type: 'subRoot',
      keyInfo: 'this is sub root',
      x: 100,
      y: 150
    },
    {
      name: 'cardNodeApp',
      ip: '127.0.0.1',
      nodeError: false,
      type: 'subRoot',
      keyInfo: 'this is sub root',
      x: 100,
      y: 250,
      children: [
        {
          name: 'sub'
        }
      ]
    }
  ],
  edges: []
};

graph.data(data);
graph.render();
