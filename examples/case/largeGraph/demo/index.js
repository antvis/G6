import G6 from '@antv/g6';
import insertCss from 'insert-css';

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  #container canvas{
    background: rgb(0, 0, 0);
  }
  #legendContainer{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100px;
    height: 100px;
  }
  .g6-tooltip {
    /* border: 1px solid #e2e2e2; */
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background-color: #000;
    padding: 2px 8px;
    text-align: center;
    /* box-shadow: rgb(174, 174, 174) 0px 0px 10px; */
  }
`);

const width = document.getElementById('container').scrollWidth;
const height = (document.getElementById('container').scrollHeight || 500) - 30;
const graphDiv = document.getElementById('container');

const tipDiv = document.createElement('div');
tipDiv.id = 'time';
tipDiv.innerHTML = '右击节点，在上下文菜单中选择探索操作\nRight click a node to select an manimupation in context menu';
graphDiv.parentNode.appendChild(tipDiv);

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
    const attribute = cfg.data.extendedAttribute || {};
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
        stroke: attribute.color || '#5B8FF9',
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
      let labelStyle = {};
      let refY = 0;
      if (cfg.labelCfg) {
        labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
        refY += cfg.labelCfg.refY || 0;
      }
      let offsetY = 0;
      const fontSize = labelStyle.fontSize < 8 ? 8 : labelStyle.fontSize;
      const lineNum = cfg.labelLineNum || 1;
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
    console.log('quadratic_state', name, value, item)
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
      const arrow = model.style.endArrow;
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
        const opacity = model.isReal ? realEdgeOapcity : virtualEdgeOpacity;
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
      const arrow = model.style.endArrow;
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
        const opacity = model.isReal ? realEdgeOapcity : virtualEdgeOpacity;
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

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {

    const clusteredData = G6.Algorithm.labelPropagation(data);

    // // assign colors for cluster nodes
    // clusteredData.clusters.forEach((cluster, i) => {
    //   const clusterNodes = cluster.nodes;
    //   clusterNodes.forEach(node => {
    //     node.style = {
    //       fill: colorArray[i % colorArray.length]
    //     }
    //   })
    // });

    const level1Data = { nodes: [], edges: clusteredData.clusterEdges };
    const mixedData = { nodes: [], edges: [] };
    clusteredData.clusters.forEach((cluster, i) => {
      const superNode = {
        id: cluster.id,
        level: 1,
        count: cluster.nodes.count,
        style: {
          fill: colorArray[i % colorArray.length]
        }
      }
      level1Data.nodes.push(superNode);

      if (cluster.nodes.count === 1) {
        mixedData.nodes.push(cluster.nodes[0]);
      } else {
        mixedData.nodes.push(superNode);
      }
    });


    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      // defaultNode: {
      //   size: 30,
      //   style: {
      //     lineWidth: 0,
      //     fill: '#3A5A3C',
      //   },
      // },
      // defaultEdge: {
      //   color: '#FEAB58',
      //   style: {
      //     lineWidth: 0.3,
      //     shadowBlur: 100,
      //     shadowColor: '#FF4654',
      //   },
      // },
      // nodeStateStyles: {
      //   hover: {
      //     stroke: '#fff',
      //     lineWidth: 1,
      //   },
      // },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'drag-node',
          // {
          //   type: 'tooltip',
          //   offset: 50,
          //   formatText(model) {
          //     const populationDes = LANG === 'en' ? 'Population' : '人口总数';
          //     const name = `${model.xlabel}</br>${populationDes}: ${model.population}`;
          //     return name;
          //   },
          // },
        ],
      },
      layout: {
        type: 'force',
      },
    });

    graph.data(level1Data);
    graph.render();

    // graph.on('node:mouseenter', (e) => {
    //   graph.setItemState(e.item, 'hover', true);
    // });
    // graph.on('node:mouseleave', () => {
    //   graph.getNodes().forEach((node) => {
    //     graph.setItemState(node, 'hover', false);
    //   });
    // });
  });


// legend graph
// const legendContainer = document.createElement('div');
// legendContainer.id = 'legendContainer';
// const legendGraphDiv = document.createElement('div');
// legendGraphDiv.id = 'legend';
// legendContainer.appendChild(legendGraphDiv);
// graphDiv.parentNode.appendChild(legendContainer);
// const legendGraph = new G6.Graph({
//   container: 'legend',
//   width: 200,
//   height: 200,
//   defaultNode: {
//     size: 10,
//     shape: 'circle',
//     labelCfg: {
//       position: 'right',
//       offset: 10,
//       style: {
//         fill: '#fff',
//       },
//     },
//   },
// });
// const legendX = 20;
// const legendBeginY = 50;
// const legendYPadding = 25;
// const legendData = {
//   nodes: [
//     {
//       id: 'level1',
//       x: legendX,
//       y: legendBeginY,
//       label: '受灾情况严重',
//       label_en: 'Severely Affected',
//       style: {
//         fill: '#FD5854',
//         lineWidth: 0,
//       },
//     },
//     {
//       id: 'level2',
//       x: legendX,
//       y: legendBeginY + legendYPadding,
//       label_en: 'Affected',
//       label: '受灾情况一般',
//       style: {
//         fill: '#FDA25A',
//         lineWidth: 0,
//       },
//     },
//     {
//       id: 'level3',
//       label: '受灾情况较轻',
//       label_en: 'Lightly Affected',
//       x: legendX,
//       y: legendBeginY + legendYPadding * 2,
//       style: {
//         fill: '#FFD574',
//         lineWidth: 0,
//       },
//     },
//     {
//       id: 'level4',
//       label: '火灾未涉及',
//       label_en: 'Not Affected',
//       x: legendX,
//       y: legendBeginY + legendYPadding * 3,
//       style: {
//         fill: '#3A5A3C',
//         lineWidth: 0,
//       },
//     },
//     {
//       id: 'legendSize',
//       label: '圆面积代表城市人口总数',
//       label_en: 'Node Size - Population',
//       x: legendX,
//       y: legendBeginY + legendYPadding * 4,
//       size: 15,
//       style: {
//         fill: '#3A5A3C',
//         lineWidth: 0,
//       },
//     },
//     {
//       id: 'legendBar',
//       label: '受灾点数量',
//       label_en: 'Bar Height - # Fire Points',
//       x: legendX,
//       y: legendBeginY + legendYPadding * 5 + 10,
//       shape: 'rect',
//       size: [2, 30],
//       style: {
//         fill: '#3A5A3C',
//         lineWidth: 0,
//       },
//     },
//   ],
// };

// legendGraph.data(legendData);
// legendGraph.render();
