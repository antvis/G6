import G6 from '@antv/g6';

let graph;

const ERROR_COLOR = '#F5222D';
const getNodeConfig = (node) => {
  if (node.nodeError) {
    return {
      basicColor: ERROR_COLOR,
      fontColor: '#FFF',
      borderColor: ERROR_COLOR,
      bgColor: '#E66A6C',
    };
  }
  let config = {
    basicColor: '#5B8FF9',
    fontColor: '#5B8FF9',
    borderColor: '#5B8FF9',
    bgColor: '#C6E5FF',
  };
  switch (node.type) {
    case 'root': {
      config = {
        basicColor: '#E3E6E8',
        fontColor: 'rgba(0,0,0,0.85)',
        borderColor: '#E3E6E8',
        bgColor: '#5b8ff9',
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
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};
const nodeBasicMethod = {
  createNodeBox: (group, config, w, h, isRoot) => {
    /* 最外面的大矩形 */
    const container = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: w,
        heigh: h,
      },
      name: 'big-rect-shape',
    });
    if (!isRoot) {
      /* 左边的小圆点 */
      group.addShape('circle', {
        attrs: {
          x: 3,
          y: h / 2,
          r: 6,
          fill: config.basicColor,
        },
        name: 'left-dot-shape',
      });
    }
    /* 矩形 */
    group.addShape('rect', {
      attrs: {
        x: 3,
        y: 0,
        width: w - 19,
        height: h,
        fill: config.bgColor,
        stroke: config.borderColor,
        radius: 2,
        cursor: 'pointer',
      },
      name: 'rect-shape',
    });

    /* 左边的粗线 */
    group.addShape('rect', {
      attrs: {
        x: 3,
        y: 0,
        width: 3,
        height: h,
        fill: config.basicColor,
        radius: 1.5,
      },
      name: 'left-border-shape',
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
        zIndex: -2,
      },
      name: 'collapse-icon-bg',
    });
    group.addShape('marker', {
      attrs: {
        x,
        y,
        r: 7,
        symbol: collapsed ? EXPAND_ICON : COLLAPSE_ICON,
        stroke: 'rgba(0,0,0,0.25)',
        fill: 'rgba(0,0,0,0)',
        lineWidth: 1,
        cursor: 'pointer',
      },
      name: 'collapse-icon',
    });
  },
  afterDraw: (cfg, group) => {
    /* 操作 marker 的背景色显示隐藏 */
    const icon = group.find((element) => element.get('name') === 'collapse-icon');
    if (icon) {
      const bg = group.find((element) => element.get('name') === 'collapse-icon-bg');
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
    const ipBox = group.find((element) => element.get('name') === 'ip-box');
    if (ipBox) {
      /* ip 复制的几个元素 */
      const ipLine = group.find((element) => element.get('name') === 'ip-cp-line');
      const ipBG = group.find((element) => element.get('name') === 'ip-cp-bg');
      const ipIcon = group.find((element) => element.get('name') === 'ip-cp-icon');
      const ipCPBox = group.find((element) => element.get('name') === 'ip-cp-box');

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
      'collapse-icon-bg',
    ];
    const group = item.getContainer();
    const childrens = group.get('children');
    graph.setAutoPaint(false);
    if (name === 'emptiness') {
      if (value) {
        childrens.forEach((shape) => {
          if (hasOpacityClass.indexOf(shape.get('name')) > -1) {
            return;
          }
          shape.attr('opacity', 0.4);
        });
      } else {
        childrens.forEach((shape) => {
          if (hasOpacityClass.indexOf(shape.get('name')) > -1) {
            return;
          }
          shape.attr('opacity', 1);
        });
      }
    }
    graph.setAutoPaint(true);
  },
};

G6.registerNode('card-node', {
  draw: (cfg, group) => {
    const config = getNodeConfig(cfg);
    const isRoot = cfg.dataType === 'root';
    const nodeError = cfg.nodeError;
    /* the biggest rect */
    const container = nodeBasicMethod.createNodeBox(group, config, 243, 64, isRoot);

    if (cfg.dataType !== 'root') {
      /* the type text */
      group.addShape('text', {
        attrs: {
          text: cfg.dataType,
          x: 3,
          y: -10,
          fontSize: 12,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'rgba(0,0,0,0.65)',
        },
        name: 'type-text-shape',
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
          cursor: 'pointer',
        },
        name: 'ip-container-shape',
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
          cursor: 'pointer',
        },
        name: 'ip-text-shape',
      });

      const ipBBox = ipText.getBBox();
      /* the distance from the IP to the right is 12px */
      ipText.attr({
        x: 224 - 12 - ipBBox.width,
      });
      /* ipBox */
      ipRect.attr({
        x: 224 - 12 - ipBBox.width - 4,
        y: ipBBox.minY - 5,
        width: ipBBox.width + 8,
        height: ipBBox.height + 10,
      });

      /* a transparent shape on the IP for click listener */
      group.addShape('rect', {
        attrs: {
          stroke: '',
          cursor: 'pointer',
          x: 224 - 12 - ipBBox.width - 4,
          y: ipBBox.minY - 5,
          width: ipBBox.width + 8,
          height: ipBBox.height + 10,
          fill: '#fff',
          opacity: 0,
        },
        name: 'ip-box',
      });

      /* copyIpLine */
      group.addShape('rect', {
        attrs: {
          x: 194,
          y: 7,
          width: 1,
          height: 24,
          fill: '#E3E6E8',
          opacity: 0,
        },
        name: 'ip-cp-line',
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
          opacity: 0,
        },
        name: 'ip-cp-bg',
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
          opacity: 0,
        },
        name: 'ip-cp-icon',
      });
      /* a transparent rect on the icon area for click listener */
      group.addShape('rect', {
        attrs: {
          x: 195,
          y: 8,
          width: 22,
          height: 22,
          fill: '#FFF',
          cursor: 'pointer',
          opacity: 0,
        },
        name: 'ip-cp-box',
        tooltip: 'Copy the IP',
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
        cursor: 'pointer',
      },
      name: 'name-text-shape',
    });

    /* the description text */
    group.addShape('text', {
      attrs: {
        text: cfg.keyInfo,
        x: 19,
        y: 45,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer',
      },
      name: 'bottom-text-shape',
    });

    if (nodeError) {
      group.addShape('text', {
        attrs: {
          x: 191,
          y: 62,
          text: '⚠️',
          fill: '#000',
          fontSize: 18,
        },
        name: 'error-text-shape',
      });
    }

    const hasChildren = cfg.children && cfg.children.length > 0;
    if (hasChildren) {
      nodeBasicMethod.createNodeMarker(group, cfg.collapsed, 236, 32);
    }
    return container;
  },
  afterDraw: nodeBasicMethod.afterDraw,
  setState: nodeBasicMethod.setState,
});

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  modes: {
    default: ['drag-node'],
  },
  defaultNode: {
    type: 'card-node',
  },
});

const data = {
  nodes: [
    {
      name: 'cardNodeApp',
      ip: '127.0.0.1',
      nodeError: true,
      dataType: 'root',
      keyInfo: 'this is a card node info',
      x: 100,
      y: 50,
    },
    {
      name: 'cardNodeApp',
      ip: '127.0.0.1',
      nodeError: false,
      dataType: 'subRoot',
      keyInfo: 'this is sub root',
      x: 100,
      y: 150,
    },
    {
      name: 'cardNodeApp',
      ip: '127.0.0.1',
      nodeError: false,
      dataType: 'subRoot',
      keyInfo: 'this is sub root',
      x: 100,
      y: 250,
      children: [
        {
          name: 'sub',
        },
      ],
    },
  ],
  edges: [],
};

const canvas = graph.get('canvas');

graph.data(data);
graph.render();
