import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

interface IModelNodeShapeCfg {
  config: {
    width: number;
    headerHeight: number;
    fieldHeight: number;
    styleConfig: {
      default: {
        node: any;
        edge: any;
      };
      active: {
        node: any;
        edge: any;
      };
      selected: {
        node: any;
        edge: any;
      };
    };
  };
  data: {
    label: string;
    key: string;
    fields: IField[];
    name: string;
  };
  style: any;
  isKeySharp?: boolean;
  active?: boolean;
  selected?: boolean;
  into?: boolean;
  out?: boolean;
  hide?: boolean;
  inactive?: boolean;
}
interface IField {
  key: string;
  label: string;
  originalKey: string;
  type: string;
  isForeign?: boolean;
  relationModel?: string;
}

const setNodeStateAttr = (state, s, cfg) => {
  Object.entries(cfg.config.styleConfig[state].node).forEach(([k, v]) => {
    s.attr(k, v);
  });
};

const isEng = (str) => {
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode < 0 || charCode > 128) {
      return false;
    }
  }
  return true;
};

const getSplitStrings = (str: string) => {
  if (isEng(str)) return getEngGroup(str);
  const reg = /.{5}/g;
  const rs = str.match(reg) || [str];
  rs.push(str.substring(rs.join('').length));
  return rs;
};

const getEngGroup = (str: string) => {
  const strs = str.replace(/(?<!^)([A-Z])/g, `-$1`);
  return strs.split('-');
};

const getTopAnch = (num) => {
  let res = [];
  for (let i = 0; i < num; i++) {
    res.push([(i + 1) / num, 0]);
  }
  return res;
};

const getBottomAnch = (num) => {
  let res = [];
  for (let i = 0; i <= num; i++) {
    res.push([i / num, 1]);
  }
  return res;
};

const getLeftAnch = (num) => {
  let res = [];
  for (let i = 0; i < num; i++) {
    res.push([0, (i + 1) / num]);
  }
  return res;
};

const getRightAnch = (num) => {
  let res = [];
  for (let i = 0; i <= num; i++) {
    res.push([1, i / num]);
  }
  return res;
};

G6.registerEdge(
  'console-line',
  {
    labelAutoRotate: true,
    update: null,
  },
  'cubic',
);
const Relation = {
  ToOne: '1:1',
  ToMany: '1:n',
};
G6.registerNode(
  'console-model-Node',
  {
    getAnchorPoints(cfg) {
      const { config, data } = cfg as any;
      const { fields } = data as any;
      const h = config.headerHeight + getLength(fields.length) * config.fieldHeight;
      return [
        [0, config.headerHeight / 2 / h], // 左上方
        [1, config.headerHeight / 2 / h], // 右上方
        ...fields.map((field, index) => {
          const x = 0;
          const l = config.headerHeight + config.fieldHeight * (index + 1) - config.fieldHeight / 2;
          const y = l / h;
          return [x, y];
        }),
        ...fields.map((field, index) => {
          const x = 1;
          const l = config.headerHeight + config.fieldHeight * (index + 1) - config.fieldHeight / 2;
          const y = l / h;
          return [x, y];
        }),
        ...getTopAnch(50),
        ...getBottomAnch(50),
        ...getLeftAnch(100),
        ...getRightAnch(100),
      ];
    },
    afterDraw(cfg, group) {
      if (cfg.hide) {
        group.hide();
      }
    },

    render: (cfg: IModelNodeShapeCfg, group) => {
      const { config, data } = cfg;

      group.addShape('rect', {
        visible: !cfg.isKeySharp,
        name: data.key,
        draggable: true,
        attrs: {
          y:
            -((getLength(data.fields.length) * config.fieldHeight) / 2) -
            config.headerHeight / 2 +
            4,
          x: -(config.width / 2) + 3,
          width: 50, //config.width - 6 ,
          height: 30, //config.fieldHeight,
          // text: data.label,
          id: 'header',
          // fontSize: config.fieldHeight - 12,
          // opacity: !cfg.isKeySharp ? 1 : 0,
          className: 'header',
          shadowColor: 'rgba(0,0,0,0.06)',
          cursor: 'move',
          shadowBlur: 1,
          shadowOffsetX: 1,
          shadowOffsetY: 2,
          // radius: [2, 4],
          fill: '#FAFAFA',
        },
      });

      group.addShape('text', {
        visible: !cfg.isKeySharp,
        name: data.key,
        draggable: true,
        attrs: {
          x: -(config.width / 2) + 20,
          y: -((getLength(data.fields.length) * config.fieldHeight) / 2),
          text: data.label,
          id: 'headerlabel1',
          cursor: 'move',
          fontSize: 12, //config.fieldHeight - 16,
          // opacity: !cfg.isKeySharp ? 1 : 0,
          className: 'headerlabel',
          textBaseline: 'middle',
          textAlign: 'left',
          // radius: [2, 4],
          fill: 'rgba(0,0,0,0.80)',
        },
      });
      // const nameList = (data.name || '').split('_').flatMap((nameStr) => nameStr.split('-')).flatMap((nameStr) => nameStr.split('/')).flatMap((a) => getSplitStrings(a)).filter((a) => a)
      const nameList = (data.name || '').split('_');

      const height =
        config.headerHeight +
        (data.fields.length >= 12 ? data.fields.length : 12) * config.fieldHeight;
      const nameLength = nameList.length;
      nameList.forEach((nameText, index) => {
        group.addShape('text', {
          visible: cfg.isKeySharp,
          name: nameText,
          draggable: true,
          attrs: {
            x: 0,
            y: -height / 2 + (height / (nameLength + 1)) * (index + 1),
            fontSize: 12, //config.width / 5,
            text: nameText,
            // opacity: index === nameLength - 1 ? 1 : 0.3,
            id: 'headerlabel2',
            className: 'headerlabel',
            textBaseline: 'middle',
            textAlign: 'center',
            // radius: [2, 4],
            fill: 'black',
          },
        });
      }); // group.addShape('text', {
      //     visible: cfg.isKeySharp,
      //     attrs: {
      //       x: 0,
      //       y: (config.headerHeight + data.fields.length * config.fieldHeight) / 6,
      //       fontSize: 20,
      //       text: data.key,
      //       id: 'headerlabel3',
      //       opacity: cfg.isKeySharp ? 1 : 0,
      //       className: 'headerlabel',
      //       textBaseline: 'middle',
      //       textAlign: 'center',
      //       // radius: [2, 4],
      //       fill: 'black',
      //     },
      //   })
      // group.addShape('text', {
      //     attrs: {
      //       x: (config.width),
      //       y: (config.headerHeight + data.fields.length * config.fieldHeight) / 6,
      //       fontSize: 20,
      //       text: data.key,
      //       id: 'headerlabel4',
      //       opacity: cfg.isKeySharp ? 1 : 0,
      //       className: 'headerlabel',
      //       textBaseline: 'middle',
      //       textAlign: 'center',
      //       // radius: [2, 4],
      //       fill: 'black',
      //     },
      //   })

      data.fields.forEach((field, index) => {
        group.addShape('rect', {
          visible: !cfg.isKeySharp,
          name: field.key,
          draggable: true,
          attrs: {
            x: -(config.width / 2) + 3,
            fieldName: field.key,
            name: field.key,
            draggable: true,
            fieldBg: true,
            arg: field.originalKey,
            fieldHover: true,
            y:
              -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) +
              config.headerHeight +
              config.fieldHeight * index,
            // stroke: 'black',
            width: 50, //config.width - 6,
            id: 'field',
            height: 30, //config.fieldHeight,
            // click: 'fieldEdit',
            // radius: [2, 4],
            // fill: field.isForeign ?  '#dee1e6' : 'white',
            // ...cfg.style || {},
            // fill: field.isForeign ?  '#dee1e6' : 'white',
            fill: 'white',
            cursor: 'move',
            // ...cfg.style || {},
          },
        });
        const { relationModel, type, isForeign } = field;
        group.addShape('text', {
          visible: !cfg.isKeySharp,
          name: field.key,
          draggable: true,
          attrs: {
            x: -config.width / 2 + 20,
            fieldHover: true,
            name: field.key,
            draggable: true,
            // click: 'fieldEdit',
            y:
              -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) +
              config.headerHeight +
              config.fieldHeight * index +
              config.fieldHeight / 2,
            text: field.label,
            fieldName: field.key,
            arg: field.originalKey,
            fontSize: 12, //config.fieldHeight - 16,
            textBaseline: 'middle',
            cursor: 'move',
            id: 'field',
            textAlign: 'start',
            opacity: !cfg.isKeySharp ? 1 : 0,
            // radius: [2, 4],
            fill: isForeign ? '#06409E' : 'rgba(0,0,0,0.60)', // fill: 'rgb(153,153,153)',
            // fill: field.isForeign ?   'black' : 'black',
          },
        });
        group.addShape('text', {
          visible: !cfg.isKeySharp,
          name: field.key,
          draggable: true,
          attrs: {
            x: config.width / 2 - 40,
            fieldHover: true,

            // click: 'fieldEdit',
            y:
              -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) +
              config.headerHeight +
              config.fieldHeight * index +
              config.fieldHeight / 2,
            text: isForeign ? `${relationModel}(${Relation[field.type]})` : `[${field.type}]`,
            id: 'field',
            textBaseline: 'middle',
            fieldName: field.key,
            arg: field.originalKey,
            fontSize: 12, //config.fieldHeight - 16,
            textAlign: 'right',
            // opacity: !cfg.isKeySharp ? 1 : 0,
            // radius: [2, 4],
            // fill: field.isForeign ?   'black' : 'black',
            fill: isForeign ? '#06409E' : 'rgba(0,0,0,0.30)',
          },
        });
        group.addShape('text', {
          visible: !cfg.isKeySharp,
          name: field.key,
          draggable: true,
          attrs: {
            x: config.width / 2 - 30,
            y:
              -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) +
              config.headerHeight +
              config.fieldHeight * index +
              config.fieldHeight / 2,
            text: '✎',
            click: 'fieldEdit',
            arg: field.originalKey,
            fieldHoverShow: true,
            fieldHover: true,
            fieldName: field.key,
            fontSize: 12, //config.fieldHeight - 16,
            // fontSize: config.headerHeight - 6 ,
            id: 'field',
            // cursor: 'pointer',
            opacity: 0,
            // className: 'headerlabel',
            textBaseline: 'middle',
            textAlign: 'left',
            cursor: 'pointer',
            // radius: [2, 4],
            fill: 'black',
          },
        });
      }); // const h = config.headerHeight + data.fields.length * config.fieldHeight

      const diffLength = getLength(data.fields.length) - data.fields.length;
      if (diffLength) {
        for (let i = 0; i < diffLength; i++) {
          // ---
          group.addShape('rect', {
            name: i,
            draggable: true,
            visible: !cfg.isKeySharp,
            attrs: {
              x: -(config.width / 2) + 3,
              // fieldBg: true,
              // fieldHover: true,
              y:
                -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) +
                config.headerHeight +
                config.fieldHeight * (data.fields.length + i),
              // stroke: 'black',
              width: 50, //config.width - 6,
              id: 'field',
              height: 30, //config.fieldHeight,
              // click: 'fieldEdit',
              // radius: [2, 4],
              // fill: field.isForeign ?  '#dee1e6' : 'white',
              // ...cfg.style || {},
              // fill: field.isForeign ?  '#dee1e6' : 'white',
              fill: 'white',
              cursor: 'move',
              // ...cfg.style || {},
            },

            // ---
          });
        }
      }

      // const anchors = [
      //   [0, 0], // 左上方
      //   ...data.fields.map((_, i) => {
      //     if (_.isForeign) {
      //     const x = 0
      //     const l = config.headerHeight +  data.fields.length * (i + 1)
      //     const y = l / h
      //     return [x, y, i]
      //     } else return null
      //   }),
      // ].filter((a) => a)
      // group.addShape('circle', {
      //   attrs: {
      //     x: -config.width / 2,
      //     y:  (config.headerHeight / 2) - h / 2,
      //     r: 2,
      //     fill: 'green',
      //   },
      // })
      // anchors.forEach(([x, y, i ]) => {
      //   group.addShape('circle', {
      //     attrs: {
      //       x: -config.width / 2,
      //       y:  (config.headerHeight + config.fieldHeight * (i) + (config.fieldHeight / 2)) -  h / 2,
      //       r: 2,
      //       fill: 'red',
      //     },
      //   })
      // })
    },

    draw: function drawShape(cfg: any, group) {
      const { config, data } = cfg;
      group.addShape('rect', {
        visible: false,
        name: 'a',
        draggable: true,
        attrs: {
          y: 100,
          x: 100,
          width: 100,
          height: 80,
          id: 'header',
          className: 'header',
          shadowColor: 'rgba(0,0,0,0.1)',
          cursor: 'move',
          shadowBlur: 1,
          shadowOffsetX: 1,
          shadowOffsetY: 2,
          fill: '#000',
        },
      });
      let keyShape = group.addShape('rect', {
        name: data.key,
        draggable: true,
        attrs: {
          id: 'keySharp',
          x: 0, //-(config.width / 2),
          y: 0, // -(config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2,
          width: 50, //config.width,
          cursor: 'move',

          // opacity: 0.85,
          height: 30, //config.headerHeight + getLength(data.fields.length) * config.fieldHeight + 4,
          ...cfg.config.styleConfig.default.node,
        },
      });
      this.render(cfg, group);
      return keyShape;
    },
  },
  'single-node',
);

const getLength = (length) => {
  return length >= 8 ? length : 8;
};

let graph: IGraph = null;

const Tutorial = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      // 实例化 Minimap 插件
      const minimap = new G6.Minimap({
        size: [100, 100],
        className: 'minimap',
        type: 'delegate',
      });

      // 实例化 Grid 插件
      const grid = new G6.Grid();

      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 800,
        height: 600,
        fitView: true,
        defaultNode: {
          size: 20,
          labelCfg: {
            style: {
              fill: '#fff',
            },
          },
        },
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
          },
        },
        nodeStateStyles: {
          hover: {
            fill: 'lightsteelblue',
            cursor: 'pointer',
          },
          click: {
            stroke: '#000',
            lineWidth: 3,
          },
        },
        edgeStateStyles: {
          click: {
            stroke: 'steelblue',
          },
        },
        layout: {
          type: 'dagre',
          controlPoints: false,
          linkDistance: 100,
          preventOverlap: true,
          nodeStrength: -30,
          edgeStrength: 0.1,
        },
        modes: {
          default: [
            'drag-node',
            'drag-canvas',
            'zoom-canvas',
            // 点提示框交互工具的配置
            {
              type: 'tooltip',
              formatText(model) {
                const text = 'label: ' + model.label + '<br/> class: ' + model.class;
                return text;
              },
              shouldUpdate: (e) => {
                return true;
              },
            },
            // 边提示框交互工具的配置
            {
              type: 'edge-tooltip',
              formatText(model) {
                const text =
                  'source: ' +
                  model.source +
                  '<br/> target: ' +
                  model.target +
                  '<br/> weight: ' +
                  model.weight;
                return text;
              },
              shouldUpdate: (e) => {
                return true;
              },
            },
          ],
        },
        plugins: [minimap, grid], //  将 Minimap 和 Grid 插件的实例配置到图上
      });

      // graph.get('canvas').set('localRefresh', false);
      G6.registerNode('custom-rect', {
        draw(cfg, group) {
          return group.addShape('rect', {
            attrs: {
              width: cfg.size[0],
              height: cfg.size[1],
              x: 0,
              y: 0,
              fill: '#ff0',
            },
          });
        },
      });

      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
      )
        .then((res) => res.json())
        .then((data) => {
          const nodes = data.nodes;
          const edges = data.edges;
          nodes.forEach((node) => {
            node.type = 'circle'; //console-model-Node'
            if (!node.style) {
              node.style = {};
            }
            node.style.lineWidth = 1;
            node.style.stroke = '#666';
            node.style.fill = 'steelblue';
            switch (node.class) {
              case 'c0':
                node.type = 'circle';
                break;
              case 'c1':
                node.type = 'custom-rect';
                node.size = [80, 60];
                break;
              case 'c2':
                node.type = 'ellipse';
                node.size = [100, 50];
                break;
            }
          });
          edges.forEach((edge) => {
            // edge.type = 'console-line'
            if (!edge.style) {
              edge.style = {};
            }
            edge.style.opacity = 0.6;
            edge.style.stroke = 'grey';
          });

          graph.data(data);
          graph.render();

          graph.on('node:mouseenter', (e) => {
            const nodeItem = e.item;
            graph.setItemState(nodeItem, 'hover', true);
          });
          graph.on('node:mouseleave', (e) => {
            const nodeItem = e.item;
            graph.setItemState(nodeItem, 'hover', false);
          });
          graph.on('node:click', (e) => {
            const clickNodes = graph.findAllByState('node', 'click');
            clickNodes.forEach((cn) => {
              graph.setItemState(cn, 'click', false);
            });
            const nodeItem = e.item;
            graph.setItemState(nodeItem, 'click', true);
          });
          graph.on('edge:click', (e) => {
            const clickEdges = graph.findAllByState('edge', 'click');
            clickEdges.forEach((ce) => {
              graph.setItemState(ce, 'click', false);
            });
            const edgeItem = e.item;
            graph.setItemState(edgeItem, 'click', true);
          });
        });
    }
  });

  return <div ref={container}></div>;
};

export default Tutorial;
