import G6 from '@antv/g6';
import insertCss from 'insert-css';

insertCss(`
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);

let ipHideTimer;

const ERROR_COLOR = '#F5222D';

const SIMPLE_TREE_NODE = 'simple-tree-node';
const TREE_NODE = 'tree-node';

const SOFAROUTER_TEXT_CLASS = 'sofarouter-text-class';
const SOFAROUTER_RECT_CLASS = 'sofarouter-rect-class';

const CANVAS_WIDTH = document.getElementById('container').scrollWidth;
const CANVAS_HEIGHT = document.getElementById('container').scrollHeight;

const getNodeConfig = function getNodeConfig(node) {
  if (node.nodeError) {
    return {
      basicColor: ERROR_COLOR,
      fontColor: '#FFF',
      borderColor: ERROR_COLOR,
      bgColor: '#E66A6C'
    };
  }
  let config = {
    basicColor: '#722ED1',
    fontColor: '#722ED1',
    borderColor: '#722ED1',
    bgColor: '#F6EDFC'
  };
  switch (node.dataType) {
    case 'root': {
      config = {
        basicColor: '#E3E6E8',
        fontColor: 'rgba(0,0,0,0.85)',
        borderColor: '#E3E6E8',
        bgColor: '#F7F9FA'
      };
      break;
    }
    case 'httpclient':
    case 'rest':
    case 'mvc':
    case 'rpc':
    case 'rpc2jvm':
      config = {
        basicColor: '#2F54EB',
        fontColor: '#2F54EB',
        borderColor: '#2F54EB',
        bgColor: '#F3F6FD'
      };
      break;
    case 'db':
      config = {
        basicColor: '#52C41A',
        fontColor: '#52C41A',
        borderColor: '#52C41A',
        bgColor: '#F4FCEB'
      };
      break;
    case 'msgPub':
    case 'msgSub':
    case 'zqmsgSend':
    case 'zqmsgRecv':
    case 'antqPub':
    case 'antqSub':
      config = {
        basicColor: '#FA8C16',
        fontColor: '#FA8C16',
        borderColor: '#FA8C16',
        bgColor: '#FCF4E3'
      };
      break;
    case 'zdalTair':
    case 'zdalOcs':
    case 'zdalOss':
    default:
      break;
  }
  return config;
};

const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [[ 'M', x - r, y ], [ 'a', r, r, 0, 1, 0, r * 2, 0 ], [ 'a', r, r, 0, 1, 0, -r * 2, 0 ], [ 'M', x - r + 4, y ], [ 'L', x - r + 2 * r - 4, y ]];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [[ 'M', x - r, y ], [ 'a', r, r, 0, 1, 0, r * 2, 0 ], [ 'a', r, r, 0, 1, 0, -r * 2, 0 ], [ 'M', x - r + 4, y ], [ 'L', x - r + 2 * r - 4, y ], [ 'M', x - r + r, y - r + 4 ], [ 'L', x, y + r - 4 ]];
};


let selectedItem;
const graph = new G6.TreeGraph({
  container: 'container',
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  zoom: 0.2,
  modes: {
    default: [{
      type: 'collapse-expand',
      shouldUpdate: function shouldUpdate(e) {
        console.log(e.target);
        /* 点击 node 禁止展开收缩 */
        if (e.target.get('className') !== 'collapse-icon') {
          return false;
        }
        return true;
      },
      onChange: function onChange(item, collapsed) {
        selectedItem = item;
        const icon = item.get('group').find(element => element.get('className') === 'collapse-icon');

        if (collapsed) {
          icon.attr('symbol', EXPAND_ICON);
        } else {
          icon.attr('symbol', COLLAPSE_ICON);
        }
      },
      animate: {
        callback: function callback() {
          graph.focusItem(selectedItem);
        }
      }
    },
    {
      type: 'tooltip',
      formatText: function formatText(data) {
        return `<div>${  data.name  }</div>`;
      }
    },
    'drag-canvas', 'zoom-canvas' ]
  },
  defaultNode: {
    type: TREE_NODE,
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  },
  defaultEdge: {
    type: 'tree-edge',
    style: {
      stroke: '#A3B1BF'
    }
  },
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getId: d => d.id,
    getWidth: () => 243,
    getVGap: () => 24,
    getHGap: () => 50
  }
});

/* 精简节点和复杂节点共用的一些方法 */
const nodeBasicMethod = {
  createNodeBox: function createNodeBox(group, config, width, height, isRoot) {
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
        radius: 2
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
  createNodeMarker: function createNodeMarker(group, collapsed, x, y) {
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
        r: 7,
        symbol: collapsed ? EXPAND_ICON : COLLAPSE_ICON,
        stroke: 'rgba(0,0,0,0.25)',
        fill: 'rgba(0,0,0,0)',
        lineWidth: 1,
        cursor: 'pointer'
      },
      className: 'collapse-icon'
    });
  },
  afterDraw: function afterDraw(cfg, group) {
    /* 操作 marker 的背景色显示隐藏 */
    const icon = group.find(element => element.get('className') ==='collapse-icon');
    if (icon) {
      const bg = group.find(element => element.get('className') ==='collapse-icon-bg');
      icon.on('mouseenter', function() {
        bg.attr('opacity', 1);
        graph.get('canvas').draw();
      });
      icon.on('mouseleave', function() {
        bg.attr('opacity', 0);
        graph.get('canvas').draw();
      });
    }
    /* ip 显示 */
    const ipBox = group.find(element => element.get('className') ==='ip-box');
    if (ipBox) {
      /* ip 复制的几个元素 */
      const ipLine = group.find(element => element.get('className') ==='ip-cp-line');
      const ipBG = group.find(element => element.get('className') ==='ip-cp-bg');
      const ipIcon = group.find(element => element.get('className') ==='ip-cp-icon');
      const ipCPBox = group.find(element => element.get('className') ==='ip-cp-box');

      const onMouseEnter = function onMouseEnter() {
        if (ipHideTimer) {
          clearTimeout(ipHideTimer);
        }
        ipLine.attr('opacity', 1);
        ipBG.attr('opacity', 1);
        ipIcon.attr('opacity', 1);
        graph.get('canvas').draw();
      };
      const onMouseLeave = function onMouseLeave() {
        ipHideTimer = setTimeout(() => {
          ipLine.attr('opacity', 0);
          ipBG.attr('opacity', 0);
          ipIcon.attr('opacity', 0);
          graph.get('canvas').draw();
        }, 100);
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
  setState: function setState(name, value, item) {
    const hasOpacityClass = [ 'ip-cp-line', 'ip-cp-bg', 'ip-cp-icon', 'ip-cp-box', 'ip-box', 'collapse-icon-bg' ];
    const group = item.getContainer();
    const childrens = group.get('children');
    graph.setAutoPaint(false);
    if (name === 'emptiness') {
      if (value) {
        childrens.forEach((shape) => {
          if (hasOpacityClass.indexOf(shape.get('className')) > -1) {
            return;
          }
          shape.attr('opacity', 0.4);
        });
      } else {
        childrens.forEach((shape) => {
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

/* 精简节点 */
G6.registerNode(SIMPLE_TREE_NODE, {
  drawShape: function drawShape(cfg, group) {
    const config = getNodeConfig(cfg);
    const isRoot = cfg.dataType === 'root';
    const { nodeError } = cfg;

    const container = nodeBasicMethod.createNodeBox(group, config, 171, 38, isRoot);

    /* name */
    group.addShape('text', {
      attrs: {
        text: fittingString(cfg.name, 133, 12),
        x: 19,
        y: 19,
        fontSize: 14,
        fontWeight: 700,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer'
      }
    });

    if (nodeError) {
      group.addShape('image', {
        attrs: {
          x: 119,
          y: 5,
          height: 35,
          width: 35,
          img: '/static/images/warning-circle.svg'
        }
      });
    }

    const hasChildren = cfg.children && cfg.children.length > 0;
    if (hasChildren) {
      nodeBasicMethod.createNodeMarker(group, cfg.collapsed, 164, 19);
    }
    return container;
  },
  afterDraw: nodeBasicMethod.afterDraw,
  setState: nodeBasicMethod.setState
}, 'single-node');

/* 复杂节点 */
G6.registerNode(TREE_NODE, {
  drawShape: function drawShape(cfg, group) {
    const config = getNodeConfig(cfg);
    const isRoot = cfg.type === 'root';
    const data = cfg;
    const { nodeError } = data;
    /* 最外面的大矩形 */
    const container = nodeBasicMethod.createNodeBox(group, config, 243, 64, isRoot);

    if (data.dataType !== 'root') {
      /* 上边的 type */
      group.addShape('text', {
        attrs: {
          text: data.dataType,
          x: 3,
          y: -10,
          fontSize: 12,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'rgba(0,0,0,0.65)'
        }
      });
    }

    let ipWidth = 0;
    if (data.ip) {
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
          text: data.ip,
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

      const ipRectBBox = ipRect.getBBox();
      ipWidth = ipRectBBox.width;
      /* ip end */
    }

    /* name */
    group.addShape('text', {
      attrs: {
        /* 根据 IP 的长度计算出 剩下的 留给 name 的长度！ */
        text: fittingString(data.name, 224 - ipWidth - 20, 12), // data.name,
        x: 19,
        y: 19,
        fontSize: 14,
        fontWeight: 700,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer'
        // tooltip: cfg.name,
      }
    });

    /* 下面的文字 */
    group.addShape('text', {
      attrs: {
        text: fittingString(data.keyInfo, 204, 12),
        x: 19,
        y: 45,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer'
        // className: 'keyInfo',
        // tooltip: cfg.keyInfo,
      }
    });

    if (nodeError) {
      group.addShape('image', {
        attrs: {
          x: 191,
          y: 32,
          height: 35,
          width: 35,
          img: '/static/images/warning-circle.svg'
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
}, 'single-node');
/* 是否显示 sofarouter，通过透明度来控制 */
G6.registerEdge('tree-edge', {
  draw: function draw(cfg, group) {
    const targetNode = cfg.targetNode.getModel();
    const edgeError = !!targetNode.edgeError;

    const { startPoint, endPoint } = cfg;
    const controlPoints = this.getControlPoints(cfg);
    let points = [ startPoint ]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);
    const path = this.getPath(points);

    group.addShape('path', {
      attrs: {
        path,
        lineWidth: 12,
        stroke: edgeError ? 'rgba(245,34,45,0.05)' : 'rgba(47,84,235,0.05)',
        opacity: 0,
        zIndex: 0
      },
      className: 'line-bg'
    });
    const keyShape = group.addShape('path', {
      attrs: {
        path,
        lineWidth: 1,
        stroke: edgeError ? '#FF7875' : 'rgba(0,0,0,0.25)',
        zIndex: 1,
        lineAppendWidth: 12
      },
      edgeError: !!edgeError
    });

    /* 连接线的中间点 */
    const centerPoint = {
      x: startPoint.x + (endPoint.x - startPoint.x) / 2,
      y: startPoint.y + (endPoint.y - startPoint.y) / 2
    };
    const textRect = group.addShape('rect', {
      attrs: {
        fill: '#FFF1F0',
        radius: 2,
        opacity: 1
      },
      /* sofarouter 需要 class，以便控制 显示隐藏 */
      className: SOFAROUTER_RECT_CLASS
    });
    const text = group.addShape('text', {
      attrs: {
        text: 'edge-label',
        x: 0,
        y: 0,
        fontSize: 12,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#F5222D',
        opacity: 1
      },
      /* sofarouter 需要 class，以便控制 显示隐藏 */
      className: SOFAROUTER_TEXT_CLASS
    });
    const textBBox = text.getBBox();
    /* text 的位置 */
    text.attr({
      x: centerPoint.x - textBBox.width / 2,
      y: centerPoint.y
    });
    /* text 的框框 */
    textRect.attr({
      x: centerPoint.x - textBBox.width / 2 - 4,
      y: centerPoint.y - textBBox.height / 2 - 5,
      width: textBBox.width + 8,
      height: textBBox.height + 10
    });

    return keyShape;
  },

  /* 操作 线 的背景色显示隐藏 */
  afterDraw: function afterDraw(cfg, group) {
    /* 背景色 */
    const lineBG = group.get('children')[0]; // 顺序根据 draw 时确定
    /* 线条 */
    const line = group.get('children')[1];
    line.on('mouseenter', function() {
      lineBG.attr('opacity', '1');
      /* 线条如果在没有错误的情况下，在 hover 时候，是需要变成蓝色的 */
      if (!line.get('edgeError')) {
        line.attr('stroke', '#2F54EB');
      }
      graph.get('canvas').draw();
    });
    line.on('mouseleave', function() {
      lineBG.attr('opacity', '0');
      if (!line.get('edgeError')) {
        line.attr('stroke', 'rgba(0,0,0,0.25)');
      }
      graph.get('canvas').draw();
    });
  },
  setState: function setState(name, value, item) {
    const group = item.getContainer();
    const childrens = group.get('children');
    graph.setAutoPaint(true);
    if (name === 'emptiness') {
      if (value) {
        childrens.forEach(function(shape) {
          if (shape.get('className') === 'line-bg') {
            return;
          }
          shape.attr('opacity', 0.4);
        });
      } else {
        childrens.forEach(function(shape) {
          if (shape.get('className') === 'line-bg') {
            return;
          }
          shape.attr('opacity', 1);
        });
      }
    }
    graph.setAutoPaint(true);
  },
  update: null
}, 'cubic-horizontal');

function strLen(str) {
  let len = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len += 1;
    } else {
      len += 2;
    }
  }
  return len;
}

function fittingString(str, maxWidth, fontSize) {
  const fontWidth = fontSize * 1.3; // 字号+边距
  maxWidth *= 2; // 需要根据自己项目调整
  const width = strLen(str) * fontWidth;
  const ellipsis = '…';
  if (width > maxWidth) {
    const actualLen = Math.floor((maxWidth - 10) / fontWidth);
    const result = str.substring(0, actualLen) + ellipsis;
    return result;
  }
  return str;
}

function formatData(data) {
  const recursiveTraverse = (node, level = 0) => {

    const appName = 'testappName';
    const keyInfo = 'testkeyinfo';
    const ip = '111.22.33.44';
    node.dataType = node.type;
    node.type = undefined;

    const targetNode = {
      id: `${node.key}`,
      rpcId: node.rpcId,
      level,
      dataType: node.appName === 'USER' ? 'root' : node.dataType,
      name: appName,
      keyInfo: keyInfo || '-',
      ip,
      nodeError: false,
      edgeError: false,
      sofarouter: true,
      sofarouterError: true,
      asyn: false,
      origin: node
    };
    if (node.children) {
      targetNode.children = [];
      node.children.forEach(item => {
        targetNode.children.push(recursiveTraverse(item, level + 1));
      });
    }
    return targetNode;
  };
  const result = recursiveTraverse(data);
  return result;
}
graph.on('beforepaint', () => {
  const topLeft = graph.getPointByCanvas(0, 0);
  const bottomRight = graph.getPointByCanvas(1000, 600);
  graph.getNodes().forEach(node => {
    const model = node.getModel();
    if (model.x < topLeft.x - 200 || model.x > bottomRight.x || model.y < topLeft.y || model.y > bottomRight.y) {
      node.getContainer().hide();
    } else {
      node.getContainer().show();
    }
  });
  const edges = graph.getEdges();
  edges.forEach(edge => {
    const sourceNode = edge.get('sourceNode');
    const targetNode = edge.get('targetNode');
    if (!sourceNode.get('visible') && !targetNode.get('visible')) {
      edge.hide();
    } else {
      edge.show();
    }
  });
});


fetch('https://gw.alipayobjects.com/os/basement_prod/dd089904-664c-4699-9593-e0df409558c0.json')
  .then(res => res.json())
  .then(data => {
    data = formatData(data);
    graph.data(data);
    graph.render();
    graph.fitView();
    graph.zoom(0.3);
  });
