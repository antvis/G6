import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import isArray from '@antv/util/lib/is-array';
import isNumber from '@antv/util/lib/is-number';
import insertCss from 'insert-css';


insertCss(`
  .g6-component-contextmenu {
    position: absolute;
    z-index: 2;
    list-style-type: none;
    background-color: #363b40;
    border-radius: 6px;
    font-size: 14px;
    color: hsla(0,0%,100%,.85);
    width: fit-content;
    transition: opacity .2s;
    text-align: center;
    padding: 0px 20px 0px 20px;
  }
  .g6-component-contextmenu ul {
    padding-left: 0px;
  }
  .g6-component-contextmenu li {
    cursor: pointer;
    list-style-type: none;
    list-style: none;
    margin-left: 0;
    line-height: 38px;
}
  }
  .g6-component-contextmenu li:hover {
    color: #aaa;
  }
`);

const { labelPropagation } = G6.Algorithm;

const LARGEGRAPHNODENUM = 15;
const NODESIZEMAPPING = 'degree';
const LARGEGRAPHLABELMAXLENGTH = 5;
const SMALLGRAPHLABELMAXLENGTH = 10;
let labelMaxLength = SMALLGRAPHLABELMAXLENGTH;
const DEFAULTNODESIZE = 33;
const DEFAULTAGGREGATEDNODESIZE = 53;
const NODE_LIMIT = 100; // TODO: find a proper number for maximum node number on the canvas 

const duration = 2000;
const animateOpacity = 0.25;
const animateBackOpacity = 0.1;
const realEdgeOpacity = 0.2;
const virtualEdgeOpacity = 0.1;

let graph: IGraph = null;
let largeGraphMode;
let cachePositions = {};
let expandPosition = { x: 0, y: 0 };
let descreteNodeCenter;

const global = {
  node: {
    style: {
      fill: '#2B384E',
    },
    labelCfg: {
      style: {
        fill: '#acaeaf',
        stroke: '#191b1c',
      },
    },
    stateStyles: {
      focus: {
        fill: '#2B384E',
      },
    },
  },
  edge: {
    style: {
      stroke: '#acaeaf',
      realEdgeStroke: '#acaeaf',//'#f00',
      realEdgeOpacity,
      strokeOpacity: realEdgeOpacity,
    },
    labelCfg: {
      style: {
        fill: '#acaeaf',
        realEdgeStroke: '#acaeaf',//'#f00',
        realEdgeOpacity: 0.5,
        stroke: '#191b1c',
      },
    },
    stateStyles: {
      focus: {
        stroke: '#fff', // '#3C9AE8',
      },
    },
  },
};
// Custom super node
G6.registerNode('aggregated-node', {
  draw(cfg, group) {
    let width = 53, height = 27;
    const style = cfg.style || {};

    // halo for hover
    group.addShape('rect', {
      attrs: {
        x: -width * 0.55,
        y: -height * 0.6,
        width: width * 1.1,
        height: height * 1.2,
        fill: style.fill || '#2B384E',
        opacity: 0.9,
        lineWidth: 0,
        radius: ((height / 2) || 13) * 1.2,
      },
      name: 'halo-shape',
      visible: false
    });

    // focus stroke for hover
    group.addShape('rect', {
      attrs: {
        x: -width * 0.55,
        y: -height * 0.6,
        width: width * 1.1,
        height: height * 1.2,
        fill: '#3B4043', // 聚合节点没有颜色含义，用灰色
        stroke: '#AAB7C4',
        lineWidth: 1,
        lineOpacty: 0.85,
        radius: ((height / 2) || 13) * 1.2
      },
      name: 'stroke-shape',
      visible: false
    });

    const keyShape = group.addShape('rect', {
      attrs: {
        ...style,
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        fill: '#3B4043', // 聚合节点没有颜色含义，用灰色
        stroke: '#AAB7C4',
        lineWidth: 2,
        cursor: 'pointer',
        radius: (height / 2) || 13,
        lineDash: [2, 2]
      },
      name: 'aggregated-node-keyShape',
    });

    let labelStyle = {};
    if (cfg.labelCfg) {
      labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
    }
    group.addShape('text', {
      attrs: {
        text: `${cfg.count}`,
        x: 0,
        y: 0,
        textAlign: 'center',
        textBaseline: 'middle',
        cursor: 'pointer',
        fontSize: 12,
        fill: '#fff',
        opacity: 0.85,
        fontWeight: 400
      },
      name: 'count-shape',
      className: 'count-shape',
      draggable: true
    });

    // tag for new node
    if (cfg.new) {
      group.addShape('circle', {
        attrs: {
          x: width / 2 - 3,
          y: -height / 2 + 3,
          r: 4,
          fill: '#6DD400',
          lineWidth: 0.5,
          stroke: '#FFFFFF'
        },
        name: 'typeNode-tag-circle',
      });
    }
    if (cfg.label) {
      group.addShape('text', {
        attrs: {
          text: `${cfg.label}`,
          x: 0,
          y: 30,
          textAlign: 'center',
          textBaseline: 'middle',
          cursor: 'pointer',
          fontSize: 12,
          fill: '#fff',
          opacity: 0.85,
          fontWeight: 400
        },
        name: 'label-shape',
        className: 'label-shape',
        draggable: true
      });
    }
    return keyShape;
  },
  setState: (name, value, item) => {
    const group = item.get('group');
    if (name === 'layoutEnd' && value) {
      const labelShape = group.find(e => e.get('name') === 'text-shape');
      if (labelShape) labelShape.set('visible', true);
    }
    else if (name === 'hover') {
      if (item.hasState('focus')) {
        return;
      }
      const halo = group.find(e => e.get('name') === 'halo-shape');
      const keyShape = item.getKeyShape();
      if (value) {
        halo && halo.show();
        keyShape.attr('fill', '#676869');
      }
      else {
        halo && halo.hide();
        keyShape.attr('fill', '#3B4043');
      }
    }
    else if (name === 'focus') {
      const stroke = group.find(e => e.get('name') === 'stroke-shape');
      const keyShape = item.getKeyShape();
      const keyShapeStroke = keyShape.attr('stroke');
      if (value) {
        stroke && stroke.show();
        keyShape.attr('fill', keyShapeStroke);
        keyShape.attr('fillOpacity', 0.4);
      }
      else {
        stroke && stroke.hide();
        keyShape.attr('fill', '#3B4043');
        keyShape.attr('fillOpacity', 1);
      }
    }
  },
  update: undefined
}, 'single-node');

// Custom real node
G6.registerNode('real-node', {
  draw(cfg, group) {
    let r = 30;
    if (isNumber(cfg.size)) {
      r = cfg.size / 2;
    } else if (isArray(cfg.size)) {
      r = cfg.size[0] / 2;
    }
    const style = cfg.style || {};

    // halo for hover
    group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: r + 5,
        fill: style.fill || '#2B384E',
        opacity: 0.9,
        lineWidth: 0
      },
      name: 'halo-shape',
      visible: false
    });

    // focus stroke for hover
    group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: r + 5,
        fill: style.fill || '#2B384E',
        stroke: '#fff',
        strokeOpacity: 0.85,
        lineWidth: 1
      },
      name: 'stroke-shape',
      visible: false
    });

    const keyShape = group.addShape('circle', {
      attrs: {
        ...style,
        x: 0,
        y: 0,
        r,
        fill: style.fill || '#2B384E',
        stroke: '#5B8FF9',
        lineWidth: 2,
        cursor: 'pointer',
      },
      name: 'aggregated-node-keyShape',
    });

    let labelStyle = {};
    if (cfg.labelCfg) {
      labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
    }

    if (cfg.label) {
      const text = cfg.label;
      let labelStyle: any = {};
      let refY = 0;
      if (cfg.labelCfg) {
        labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
        refY += cfg.labelCfg.refY || 0;
      }
      let offsetY = 0;
      const fontSize = labelStyle.fontSize < 8 ? 8 : labelStyle.fontSize;
      const lineNum = (cfg.labelLineNum as number) || 1;
      offsetY = lineNum * (fontSize || 12);
      group.addShape('text', {
        attrs: {
          text,
          x: 0,
          y: r + refY + offsetY + 5,
          textAlign: 'center',
          textBaseLine: 'alphabetic',
          cursor: 'pointer',
          fontSize,
          fill: '#fff',
          opacity: 0.85,
          fontWeight: 400
        },
        name: 'text-shape',
        className: 'text-shape',
      });
    }

    // tag for new node
    if (cfg.new) {
      group.addShape('circle', {
        attrs: {
          x: r - 3,
          y: -r + 3,
          r: 4,
          fill: '#6DD400',
          lineWidth: 0.5,
          stroke: '#FFFFFF'
        },
        name: 'typeNode-tag-circle',
      });
    }

    return keyShape;
  },
  setState: (name, value, item) => {
    const group = item.get('group');
    if (name === 'layoutEnd' && value) {
      const labelShape = group.find(e => e.get('name') === 'text-shape');
      if (labelShape) labelShape.set('visible', true);
    }
    else if (name === 'hover') {
      if (item.hasState('focus')) {
        return;
      }
      const halo = group.find(e => e.get('name') === 'halo-shape');
      const keyShape = item.getKeyShape();
      if (value) {
        halo && halo.show();
        keyShape.attr('fill', '#314264');
      }
      else {
        halo && halo.hide();
        keyShape.attr('fill', '#2B384E');
      }
    }
    else if (name === 'focus') {
      const stroke = group.find(e => e.get('name') === 'stroke-shape');
      const label = group.find(e => e.get('name') === 'text-shape');
      const keyShape = item.getKeyShape();
      const keyShapeStroke = keyShape.attr('stroke');
      if (value) {
        stroke && stroke.show();
        keyShape.attr('fill', keyShapeStroke);
        keyShape.attr('fillOpacity', 0.4);
        label && label.attr('fontWeight', 800);
      }
      else {
        stroke && stroke.hide();
        keyShape.attr('fill', '#2B384E');
        keyShape.attr('fillOpacity', 1);
        label && label.attr('fontWeight', 400);
      }
    }
  },
  update: undefined
}, 'aggregated-node'); // 这样可以继承 aggregated-node 的 setState

// Custom the quadratic edge for multiple edges between one node pair
G6.registerEdge('quadratic', {
  setState: (name, value, item) => {
    const group = item.get('group');
    const model = item.getModel();
    if (name === 'focus') {
      const back = group.find(ele => ele.get('name') === 'back-line');
      if (back) {
        back.stopAnimate();
        back.remove();
        back.destroy();
      }
      const keyShape = group.find(ele => ele.get('name') === 'edge-shape');
      const arrow: any = model.style.endArrow;
      if (value) {
        if (keyShape.cfg.animation) {
          keyShape.stopAnimate(true);
        }
        keyShape.attr({
          strokeOpacity: animateOpacity,
          opacity: animateOpacity,
          stroke: '#fff',
          endArrow: {
            ...arrow,
            stroke: '#fff',
            fill: '#fff',
          }
        });
        if (model.isReal) {
          const { lineWidth, path, endArrow, stroke } = keyShape.attr();
          const back = group.addShape('path', {
            attrs: {
              lineWidth, path, stroke, endArrow,
              opacity: animateBackOpacity
            },
            name: 'back-line'
          });
          back.toBack();
          const length = keyShape.getTotalLength();
          keyShape.animate(
            (ratio) => {
              // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
              const startLen = ratio * length;
              // Calculate the lineDash
              const cfg = {
                lineDash: [startLen, length - startLen],
              };
              return cfg;
            },
            {
              repeat: true, // Whether executes the animation repeatly
              duration, // the duration for executing once
            },
          );
        } else {
          let index = 0;
          const lineDash = keyShape.attr('lineDash');
          const totalLength = lineDash[0] + lineDash[1];
          keyShape.animate(
            () => {
              index++;
              if (index > totalLength) {
                index = 0;
              }
              const res = {
                lineDash,
                lineDashOffset: -index,
              };
              // returns the modified configurations here, lineDash and lineDashOffset here
              return res;
            },
            {
              repeat: true, // whether executes the animation repeatly
              duration, // the duration for executing once
            },
          );
        }
      } else {
        keyShape.stopAnimate();
        const stroke = '#acaeaf';
        const opacity = model.isReal ? realEdgeOpacity : virtualEdgeOpacity;
        keyShape.attr({
          stroke,
          strokeOpacity: opacity,
          opacity,
          endArrow: {
            ...arrow,
            stroke,
            fill: stroke,
          }
        });
      }
    }
  },
}, 'quadratic');

// Custom the line edge for single edge between one node pair
G6.registerEdge('line', {
  setState: (name, value, item) => {
    const group = item.get('group');
    const model = item.getModel();
    if (name === 'focus') {
      const keyShape = group.find(ele => ele.get('name') === 'edge-shape');
      const back = group.find(ele => ele.get('name') === 'back-line');
      if (back) {
        back.stopAnimate();
        back.remove();
        back.destroy();
      }
      const arrow: any = model.style.endArrow;
      if (value) {
        if (keyShape.cfg.animation) {
          keyShape.stopAnimate(true);
        }
        keyShape.attr({
          strokeOpacity: animateOpacity,
          opacity: animateOpacity,
          stroke: '#fff',
          endArrow: {
            ...arrow,
            stroke: '#fff',
            fill: '#fff',
          }
        });
        if (model.isReal) {
          const { path, stroke, lineWidth } = keyShape.attr();
          const back = group.addShape('path', {
            attrs: {
              path,
              stroke,
              lineWidth,
              opacity: animateBackOpacity
            },
            name: 'back-line'
          });
          back.toBack();
          const length = keyShape.getTotalLength();
          keyShape.animate(
            (ratio) => {
              // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
              const startLen = ratio * length;
              // Calculate the lineDash
              const cfg = {
                lineDash: [startLen, length - startLen],
              };
              return cfg;
            },
            {
              repeat: true, // Whether executes the animation repeatly
              duration, // the duration for executing once
            },
          );
        } else {
          const lineDash = keyShape.attr('lineDash');
          const totalLength = lineDash[0] + lineDash[1];
          let index = 0;
          keyShape.animate(
            () => {
              index++;
              if (index > totalLength) {
                index = 0;
              }
              const res = {
                lineDash,
                lineDashOffset: -index,
              };
              // returns the modified configurations here, lineDash and lineDashOffset here
              return res;
            },
            {
              repeat: true, // whether executes the animation repeatly
              duration, // the duration for executing once
            },
          );
        }
      } else {
        keyShape.stopAnimate();
        const stroke = '#acaeaf';
        const opacity = model.isReal ? realEdgeOpacity : virtualEdgeOpacity;
        keyShape.attr({
          stroke,
          strokeOpacity: opacity,
          opacity: opacity,
          endArrow: {
            ...arrow,
            stroke,
            fill: stroke,
          }
        });
      }
    }
  },
}, 'single-edge');

const colorArray = [
  'rgb(91, 143, 249)',
  'rgb(90, 216, 166)',
  'rgb(93, 112, 146)',
  'rgb(246, 189, 22)',
  'rgb(232, 104, 74)',
  'rgb(109, 200, 236)',
  'rgb(146, 112, 202)',
  'rgb(255, 157, 77)',
  'rgb(38, 154, 153)',
  'rgb(227, 137, 163)',
];

const descendCompare = (p) => {
  // 这是比较函数
  return function (m, n) {
    const a = m[p];
    const b = n[p];
    return b - a; // 降序
  };
};

const bindListener = (graph) => {
  // click node to show the detail drawer
  graph.on('node:click', (evt: any) => {
    clearFocusItemState(graph);
    const { item } = evt;

    // highlight the clicked node
    graph.setItemState(item, 'focus', true);
    // 将相关边也高亮
    const relatedEdges = item.getEdges();
    relatedEdges.forEach(edge => {
      graph.setItemState(edge, 'focus', true);
    })

  });

  // click edge to show the detail of integrated edge drawer
  graph.on('edge:click', (evt: any) => {
    clearFocusItemState(graph);
    const { item } = evt;
    // highlight the clicked edge
    graph.setItemState(item, 'focus', true);
  });

  // click canvas to cancel all the focus state
  graph.on('canvas:click', (evt: any) => {
    clearFocusItemState(graph);
  });
}

const clearFocusItemState = (graph) => {
  if (!graph) return;
  clearFocusNodeState(graph);
  clearFocusEdgeState(graph);
}

// 清除图上所有节点的 focus 状态及相应样式
const clearFocusNodeState = (graph) => {
  const focusNodes = graph.findAllByState('node', 'focus');
  focusNodes.forEach((fnode) => {
    graph.setItemState(fnode, 'focus', false); // false
  });
};

// 清除图上所有边的 focus 状态及相应样式
const clearFocusEdgeState = (graph) => {
  const focusEdges = graph.findAllByState('edge', 'focus');
  focusEdges.forEach((fedge) => {
    graph.setItemState(fedge, 'focus', false);
  });
};

// 截断长文本。length 为文本截断后长度，elipsis 是后缀
const formatText = (text, length = 5, elipsis = '...') => {
  if (!text) return '';
  if (text.length > length) {
    return `${text.substr(0, length)}${elipsis}`;
  }
  return text;
};

const labelFormatter = (text: string, minLength: number = 10): string => {
  if (text && text.split('').length > minLength) return `${text.substr(0, minLength)}...`;
  return text;
};

const processNodesEdges = (nodes, edges, width, height, largeGraphMode, edgeLabelVisible, tagNew = false) => {
  if (!nodes || nodes.length === 0) return {};
  const nodeMap = {};
  let maxNodeCount = -Infinity;
  const paddingRatio = 0.3;
  let paddingWidth = (width || 1000) - 2 * paddingRatio * width;
  let paddingHeight = height - 2 * paddingRatio * height;
  const paddingLeft = paddingRatio * width;
  const paddingTop = paddingRatio * height;
  nodes.forEach((node) => {
    node.type = (node.level === 0) ? 'real-node' : 'aggregated-node';
    node.label = `${node.id}`;
    node.labelLineNum = undefined;
    node.oriLabel = node.label;
    node.label = formatText(node.label, labelMaxLength, '...');
    node.degree = 0;
    node.inDegree = 0;
    node.outDegree = 0;
    if (nodeMap[node.id]) {
      console.warn('node exists already!', node.id)
      node.id = `${node.id}${Math.random()}`;
    } // TODO: delete this line if the nodes are all unique
    nodeMap[node.id] = node;
    if (node.count > maxNodeCount) maxNodeCount = node.count;
    const cachePosition = cachePositions ? cachePositions[node.id] : undefined;
    if (node.level) {
      node.x = Math.random() * paddingWidth + paddingLeft * 0.2;
      node.y = Math.random() * paddingHeight + paddingTop * 0.5;
    }
    if (cachePosition && cachePosition.level === node.level) {
      node.x = cachePosition.x;
      node.y = cachePosition.y;
      node.new = tagNew && false;
    } else {
      node.new = tagNew && true;
      if (cachePosition) {
        cachePosition.new = true;
        node.x = cachePosition.x;
        node.y = cachePosition.y;
      } else if (expandPosition && expandPosition.x !== 0 && expandPosition.y !== 0) {
        node.x = expandPosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
        node.y = expandPosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
      }
    }
  });

  let maxCount = -Infinity;
  let minCount = Infinity;
  // let maxCount = 0;
  edges.forEach((edge) => {
    // to avoid the dulplicated id to nodes
    if (!edge.id) edge.id = `edge-${edge.source}-${edge.target}`;
    else if (edge.id.split('-')[0] !== 'edge') edge.id = `edge-${edge.id}`;
    // TODO: delete the following line after the queried data is correct
    if (!nodeMap[edge.source] || !nodeMap[edge.target]) {
      console.warn('edge source target does not exist', edge.source, edge.target, edge.id)
      return;
    }
    const sourceNode = nodeMap[edge.source];
    const targetNode = nodeMap[edge.target];

    if (!sourceNode || !targetNode) console.warn('source or target is not defined!!!', edge, sourceNode, targetNode)

    // calculate the degree
    sourceNode.degree++;
    targetNode.degree++;
    sourceNode.outDegree++;
    targetNode.inDegree++;

    if (edge.count > maxCount) maxCount = edge.count;
    if (edge.count < minCount) minCount = edge.count;
  });

  nodes.sort(descendCompare(NODESIZEMAPPING));
  const maxDegree = nodes[0].degree || 1;

  const topNum = Math.max(nodes.length / 10, 1);
  const descreteNodes = [];
  nodes.forEach((node, i) => {
    // assign the size mapping to the outDegree
    // const degreeRatio = node.degree / maxDegree;
    const countRatio = node.count / maxNodeCount;
    // const minSize = 30;//nodes.length <= 10 ? 30 : 15;
    // (node.degree / maxDegree) * 30 + minSize
    // node.size = node.level ? 53 : node.count / maxNodeCount * 30 + minSize;
    const isRealNode = node.level === 0;
    node.size = isRealNode ? DEFAULTNODESIZE : DEFAULTAGGREGATEDNODESIZE;
    node.isReal = isRealNode;
    node.labelCfg = {
      position: 'bottom',
      offset: 5,
      style: {
        fill: global.node.labelCfg.style.fill,
        // fontSize: 6 + degreeRatio * 10,
        fontSize: 6 + countRatio * 6,
        stroke: global.node.labelCfg.style.stroke,
        lineWidth: 3,
      },
    };

    if (!node.degree) {
      descreteNodes.push(node);
    }
  });

  // uniqueEdges.forEach((edge) => {
  const countRange = maxCount - minCount;
  const minEdgeSize = 1;
  const maxEdgeSize = 7;
  const edgeSizeRange = maxEdgeSize - minEdgeSize;
  edges.forEach((edge) => {
    // set edges' style
    const targetNode = nodeMap[edge.target];
    console.log('targetNode.size', targetNode, edge.target)

    const size = ((edge.count - minCount) / countRange * edgeSizeRange + minEdgeSize) || 1;
    edge.size = size;//edge.count ? Math.min(edge.count, 10) : 1;

    const arrowWidth = Math.max(size / 2 + 2, 3);
    const arrowLength = 10;
    const arrowBeging = targetNode.size + arrowLength;
    let arrowPath = `M ${arrowBeging},0 L ${arrowBeging + arrowLength},-${arrowWidth} L ${arrowBeging + arrowLength
      },${arrowWidth} Z`;
    let d = targetNode.size / 2 + arrowLength;
    if (edge.type === 'loop') {
      d = 15;
      arrowPath = `M ${d},0 L ${d + 15},-${arrowWidth} L ${d + 15},${arrowWidth} Z`;
    }
    const sourceNode = nodeMap[edge.source];
    console.log('sourceNode', sourceNode, edge.source)
    const isRealEdge = edge.level === 0 && targetNode.isReal && sourceNode.isReal;
    edge.isReal = isRealEdge;
    const stroke = isRealEdge ? global.edge.style.realEdgeStroke : global.edge.style.stroke;
    const opacity = isRealEdge ? global.edge.style.realEdgeOpacity : global.edge.style.strokeOpacity;
    const dash = Math.max(size, 2);
    const lineDash = isRealEdge ? undefined : [dash, dash];
    edge.style = {
      stroke,
      strokeOpacity: opacity,
      cursor: 'pointer',
      lineAppendWidth: Math.max(edge.size || 5, 5),
      fillOpacity: 1,
      lineDash,
      endArrow: {
        path: arrowPath,
        d,
        fill: stroke,
        strokeOpacity: 0,
      },
    };
    edge.labelCfg = {
      autoRotate: true,
      style: {
        stroke: global.edge.labelCfg.style.stroke,
        fill: global.edge.labelCfg.style.fill,
        lineWidth: 4,
        fontSize: 12,
        lineAppendWidth: 10,
        opacity: 1,
      },
    };
    if (!edge.oriLabel) edge.oriLabel = edge.label;
    if (largeGraphMode || !edgeLabelVisible) edge.label = '';
    else {
      edge.label = labelFormatter(edge.label, labelMaxLength);
    }

    // arrange the other nodes around the hub
    const sourceDis = sourceNode.size / 2 + 20;
    const targetDis = targetNode.size / 2 + 20;
    if (sourceNode.x && !targetNode.x) {
      targetNode.x = sourceNode.x + sourceDis * Math.cos(Math.random() * Math.PI * 2);
    }
    if (sourceNode.y && !targetNode.y) {
      targetNode.y = sourceNode.y + sourceDis * Math.sin(Math.random() * Math.PI * 2);
    }
    if (targetNode.x && !sourceNode.x) {
      sourceNode.x = targetNode.x + targetDis * Math.cos(Math.random() * Math.PI * 2);
    }
    if (targetNode.y && !sourceNode.y) {
      sourceNode.y = targetNode.y + targetDis * Math.sin(Math.random() * Math.PI * 2);
    }

    if (!sourceNode.x && !sourceNode.y) {
      sourceNode.x = expandPosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
      sourceNode.y = expandPosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
    }
    if (!targetNode.x && !targetNode.y) {
      targetNode.x = expandPosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
      targetNode.y = expandPosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
    }
  });

  descreteNodeCenter = {
    x: width - paddingLeft,
    y: height - paddingTop
  }
  descreteNodes.forEach(node => {
    if (!node.x && !node.y) {
      node.x = descreteNodeCenter.x + 30 * Math.cos(Math.random() * Math.PI * 2);
      node.y = descreteNodeCenter.y + 30 * Math.sin(Math.random() * Math.PI * 2);
    }
  });

  G6.Util.processParallelEdges(edges, 30);
  return {
    maxDegree,
    // TODO
    // edges: uniqueEdges,
    edges,
    nodeMap
  };
};


const getForceLayoutConfig = (graph, largeGraphMode, configSettings?) => {
  let { linkDistance, edgeStrength, nodeStrength, nodeSpacing,
    preventOverlap, nodeSize, collideStrength, alpha,
    alphaDecay, alphaMin } = configSettings || { preventOverlap: true };

  if (!linkDistance && linkDistance !== 0) linkDistance = 150;
  if (!edgeStrength && edgeStrength !== 0) edgeStrength = 0.2;
  if (!nodeStrength && nodeStrength !== 0) nodeStrength = -35;
  if (!nodeSpacing && nodeSpacing !== 0) nodeSpacing = 5;

  const config = {
    type: 'force',
    alphaDecay: 0.005, // nodeNum < 30 ? 0.02 : 0.2
    preventOverlap,
    linkDistance: (d) => {
      let dist = linkDistance;
      // 两端都是聚合点
      if ((d.source.level) && (d.target.level)) dist = linkDistance * 2.5;
      // 一端是聚合点，一端是真实节点
      else if ((d.source.level) || (d.target.level)) dist = linkDistance * 1.2;
      return dist;
    },
    edgeStrength: (d) => {
      // 聚合节点之间的引力小
      if ((d.source.level) && (d.target.level)) return Math.min(edgeStrength / 2, 1);
      // 聚合节点与真实节点之间引力大
      if ((d.source.level) || (d.target.level)) return Math.min(edgeStrength * 4, 1);
      return Math.min(edgeStrength, 1);
    },
    nodeStrength: (d) => {
      // 给离散点引力，让它们聚集
      if (d.degree === 0) return 10;
      // 聚合点的斥力大
      if (d.level) return nodeStrength * 2;
      return nodeStrength;
    },
    nodeSize: (d) => {
      if (!nodeSize && d.size) return d.size;
      return 50;
    },
    nodeSpacing: (d) => {
      if (d.degree === 0) return nodeSpacing * 2;
      if (d.level) return nodeSpacing;
      return nodeSpacing;
    },
    onLayoutEnd: () => {
      if (largeGraphMode) {
        graph.getEdges().forEach((edge) => {
          if (!edge.oriLabel) return;
          edge.update({
            label: labelFormatter(edge.oriLabel, labelMaxLength),
          });
        });
      }
    },
    tick: () => {
      graph.refreshPositions();
    }
  };

  if (nodeSize) config['nodeSize'] = nodeSize;
  if (collideStrength) config['collideStrength'] = collideStrength;
  if (alpha) config['alpha'] = alpha;
  if (alphaDecay) config['alphaDecay'] = alphaDecay;
  if (alphaMin) config['alphaMin'] = alphaMin;

  return config;
};


const LargeGraph = () => {
  const container = React.useRef();

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;

  useEffect(() => {
    if (!graph) {
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
        .then((res) => res.json())
        .then((data) => {
          const nodeMap = {};
          const clusteredData = labelPropagation(data, false, 'weight');
          const aggregatedData = { nodes: [], edges: [] };
          clusteredData.clusters.forEach((cluster, i) => {
            cluster.nodes.forEach(node => {
              node.style = {
                fill: colorArray[i % colorArray.length]
              }
              node.level = 0;
              node.label = node.id;
              node.type = '';
              nodeMap[node.id] = node;
            });
            const cnode = {
              id: cluster.id,
              type: 'aggregated-node',
              count: cluster.nodes.length,
              level: 1,
              style: {
                fill: colorArray[i % colorArray.length]
              },
              label: cluster.id,
              idx: i
            };
            aggregatedData.nodes.push(cnode);
          });
          clusteredData.clusterEdges.forEach(clusterEdge => {
            const cedge = {
              ...clusterEdge,
              size: Math.log(clusterEdge.count as number),
              label: `${clusterEdge.source}-${clusterEdge.target}`,
              id: `${clusterEdge.source}-${clusterEdge.target}`,
            }
            if (cedge.source === cedge.target) {
              cedge.type = 'loop';
              cedge.loopCfg = {
                dist: 20,
              }
              return;
            } else cedge.type = 'line';
            aggregatedData.edges.push(cedge);
          });

          data.edges.forEach(edge => {
            edge.label = `${edge.source}-${edge.target}`;
            edge.id = `${edge.source}-${edge.target}`;
          });

          const { edges: processedEdges } = processNodesEdges(aggregatedData.nodes, aggregatedData.edges, CANVAS_WIDTH, CANVAS_HEIGHT, false, true, true);

          const layoutConfig: any = getForceLayoutConfig(graph, largeGraphMode)
          layoutConfig.center = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];

          const contextMenu = new G6.Menu({
            getContent(evt) {
              const { item } = evt;
              const itemType = item?.getType();
              const model = item?.getModel();
              if (itemType && model) {
                if (itemType === 'node') {
                  if (model.level !== 0) {
                    return `<ul>
                      <li id='expand'>展开聚合节点</li>
                      <li id='hide'>隐藏聚合节点</li>
                    </ul>`;
                  } else {
                    return `<ul>
                      <li id='neighbor1'>扩展一度关系</li>
                      <li id='neighbor2'>扩展二度关系</li>
                      <li id='neighbor3'>扩展三度关系</li>
                      <li id='hide'>隐藏节点</li>
                    </ul>`;
                  }
                } else {
                  return `<ul>
                    <li id='hide'>隐藏边</li>
                  </ul>`;
                }
              }
            },
            handleMenuClick: (target, item) => {
              const model = item.getModel();
              const id = model.id;
              console.log('right clicking', id);
              switch (target.id) {
                case 'hide':
                  graph.hideItem(item);
                  break;
                case 'expand':
                  let resEdges = [], resNodes = [];
                  clusteredData.clusters.forEach((cluster, i) => {
                    console.log('clusterid', cluster.id, id);
                    if (cluster.id === id) {
                      resNodes = resNodes.concat(cluster.nodes);
                    } else {
                      console.log('1pushing', aggregatedData.nodes[i].id)
                      resNodes.push(aggregatedData.nodes[i])
                    }
                  });
                  data.edges.forEach(edge => {
                    if (nodeMap[edge.source].clusterId === id && nodeMap[edge.target].clusterId === id) {
                      resEdges.push(edge);
                    } else if (nodeMap[edge.source].clusterId === id) {
                      const targetClusterId = nodeMap[edge.target].clusterId;
                      const vedge = {
                        source: edge.source,
                        target: targetClusterId,
                        id: `${edge.source} - ${targetClusterId}`,
                        label: ''
                      };
                      resEdges.push(vedge);
                    } else if (nodeMap[edge.target].clusterId === id) {
                      const sourceClusterId = nodeMap[edge.source].clusterId;
                      const vedge = {
                        source: edge.source,
                        target: sourceClusterId,
                        id: `${edge.source} - ${sourceClusterId}`,
                        label: ''
                      };
                      resEdges.push(vedge);
                    }
                  });
                  clusteredData.clusterEdges.forEach(edge => {
                    if (edge.source === id || edge.target === id) return;
                    else resEdges.push(edge);
                  });
                  console.log('resEdges', resNodes, resEdges);
                  const { edges: processedResEdges } = processNodesEdges(resNodes, resEdges, CANVAS_WIDTH, CANVAS_HEIGHT, false, true, true);
                  console.log({ nodes: resNodes, edges: processedResEdges })
                  graph.changeData({ nodes: resNodes, edges: processedResEdges });
                  break;
                case 'neighbor':
                  break;
                default:
                  break;
              }
            },
            // offsetX and offsetY include the padding of the parent container
            // 需要加上父级容器的 padding-left 16 与自身偏移量 10
            offsetX: 16 + 10,
            // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
            offsetY: 0,
            // the types of items that allow the menu show up
            // 在哪些类型的元素上响应
            itemTypes: ['node', 'edge'],
          });

          graph = new G6.Graph({
            container: container.current as HTMLElement,
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            layout: {
              type: 'force',
              ...layoutConfig
            },
            linkCenter: true,
            minZoom: 0.1,
            modes: {
              default: [
                'drag-canvas',
                'zoom-canvas',
                'drag-node'
              ],
              lassoSelect: [
                'zoom-canvas',
                {
                  type: 'lasso-select',
                  selectedState: 'focus',
                  trigger: 'drag'
                }
              ],
              fisheyeMode: []
            },
            defaultNode: {
              type: 'aggregated-node',
              size: DEFAULTNODESIZE,
            },
            // layout: layoutConfig,
            groupByTypes: false,
            plugins: [contextMenu]
          });

          bindListener(graph);
          graph.data({ nodes: aggregatedData.nodes, edges: processedEdges });
          graph.render();
        });
    }
  });

  return <div ref={container} style={{ backgroundColor: '#2b2f33' }} />;
};

export default LargeGraph;
