import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

G6.registerNode('iconfont', {
  draw(cfg, group) {
    const {
      backgroundConfig: backgroundStyle,

      style,

      labelCfg: labelStyle,
    } = cfg;

    if (backgroundStyle) {
      group.addShape('circle', {
        attrs: {
          x: 0,

          y: 0,

          r: cfg.size,

          ...backgroundStyle,
        },
      });
    }

    const keyShape = group.addShape('text', {
      attrs: {
        x: 0,

        y: 0,

        fontFamily: 'Glyphicons Halflings', // 对应css里面的font-family: "iconfont";

        textAlign: 'center',

        textBaseline: 'middle',

        text: cfg.text,

        fontSize: cfg.size,

        ...style,
      },
    });

    const labelY = backgroundStyle ? cfg.size * 2 : cfg.size;

    group.addShape('text', {
      attrs: {
        x: 0,

        y: labelY,

        textAlign: 'center',

        text: cfg.label,

        ...labelStyle.style,
      },
    });

    return keyShape;
  },
});

const COLOR = '#40a9ff';

const graph = new G6.Graph({
  container: 'mountNode',

  width: 800,

  height: 600,

  modes: {
    default: ['collapse-expand', 'drag-canvas', 'drag-node'],
  },

  defaultNode: {
    backgroundConfig: {
      backgroundType: 'circle',

      fill: COLOR,

      stroke: 'LightSkyBlue',
    },

    type: 'iconfont',

    size: 12,

    style: {
      fill: '#fff',
    },

    labelCfg: {
      style: {
        fill: COLOR,

        fontSize: 12,
      },
    },
  },

  // 布局相关

  layout: {
    type: 'dagre',

    rankdir: 'LR',

    align: 'DL',

    nodesep: 30,

    ranksep: 30,
  },
});

const DefaultShape = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      graph = new G6.TreeGraph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        linkCenter: true,
        modes: {
          default: ['collapse-expand', 'zoom-canvas', 'drag-canvas'],
        },
        defaultNode: {
          type: 'file-node',
        },
        defaultEdge: {
          type: 'step-line',
        },
        nodeStateStyles: {
          hover: {
            fill: '#83AFFD',
            stroke: '#5B8FF9',
          },
          select: {
            fill: '#4ab334',
            lineWidth: 2,
            stroke: '#5B8FF9',
          },
        },
        layout: {
          type: 'indented',
          isHorizontal: true,
          direction: 'LR',
          indent: 70,
          getHeight: function getHeight() {
            return 20;
          },

          getWidth: function getWidth() {
            return 20;
          },
        },
      });
    }

    const data = {
      nodes: [
        {
          id: 'Root',

          label: 'label',

          text: '\ue171', // 对应字体图标的Unicode码，

          style: {
            fill: 'red',
          },

          labelCfg: {
            style: {
              fill: 'red',
            },
          },

          backgroundConfig: null, // 自定义项，用于判读是否需要圆背景

          size: 30,
        },

        {
          id: 'node1',

          label: 'node1节点',

          text: '\ue171', // 对应字体图标的Unicode码，

          style: {
            fill: '#fff',
          },

          labelCfg: {
            style: {
              fill: '#000',
            },
          },
        },

        {
          id: 'node2',

          label: 'node2节点',

          text: '\ue171', // 对应字体图标的Unicode码，

          style: {
            fill: '#fff',
          },

          labelCfg: {
            style: {
              fill: '#000',
            },
          },
        },
      ],

      edges: [
        {
          source: 'Root', // 起始点 id

          target: 'node1', // 目标点 id
        },

        {
          source: 'Root', // 起始点 id

          target: 'node2', // 目标点 id
        },
      ],
    };

    graph.data(data);
    graph.render();

    graph.on('node:click', (ev) => {
      //const clickNodes = graph.findAllByState('node', 'click');

      //clickNodes.forEach(cn => {
      //graph.setItemState(cn, 'click', false);
      // });

      const nodeItem = ev.item;
      debugger;
      graph.setItemState(nodeItem, 'select', true);
    });

    graph.on('node:mouseenter', (evt) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
    });
  });

  return <div ref={container}></div>;
};

export default DefaultShape;
