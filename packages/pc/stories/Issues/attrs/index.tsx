import React, { useRef, useEffect } from 'react';
import G6 from '../../../src';
// import "./styles.css";

// G6.Global.nodeStateStyle.selected = {
//   stroke: "#d9d9d9",
//   fill: "#5394ef"
// };

G6.registerNode(
  'sql',
  {
    drawShape(cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          x: -75,
          y: -25,
          width: 168,
          height: 36,
          stroke: '#b4afaf', //'#303747',
          fill: '#b4afaf', //'#303747',
          lineWidth: 3,
          radius: [5, 0, 0, 5],
        },
        name: 'rect-shape',
      });
      if (cfg.name) {
        group.addShape('text', {
          attrs: {
            text: cfg.name,
            x: 0,
            y: 0,
            fill: 'white',
            fontSize: 14,
            textAlign: 'center',
            //textBaseline: 'middle',
            fontWeight: 'bold',
          },
          name: 'text-shape',
        });
      }
      group.addShape('rect', {
        attrs: {
          x: 90,
          y: -25,
          width: 36,
          height: 36,
          stroke: '#0296EA', //'#303747',
          fill: '#0296EA', //'#303747',
          lineWidth: 3,
          radius: [0, 5, 5, 0],
        },
        name: 'rect-shape-icon',
      });
      group.addShape('rect', {
        attrs: {
          x: 98,
          y: -18,
          height: 20,
          width: 20,
          stroke: 'white', //'#303747',
          fill: '#0296EA', //'#303747',
          radius: 2,
        },
        name: 'node-state-icon',
      });
      group.addShape('text', {
        attrs: {
          text: cfg.stateIcon,
          x: 108,
          y: 0,
          fill: 'white',
          fontSize: 14,
          textAlign: 'center',
          fontWeight: 'bold',
        },
        name: 'icon-text-shape',
      });
      return rect;
    },
  },
  'single-node',
);

export default () => {
  const graphContainer = useRef(null);
  let graph = null;

  // 图初始化
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: graphContainer.current,
        width: 500,
        height: 500,
        renderer: 'svg',
        layout: {
          type: 'dagre',
          nodesepFunc: (d) => {
            if (d.id === '3') {
              return 70;
            }
            return 70;
          },
          ranksep: 30,
        },
        defaultNode: {
          type: 'sql',
          anchorPoints: [
            [0.5, 0],
            [0.5, 1],
          ],
          stateIcon: '+', // 节点中表示状态的icon配置
        },

        defaultEdge: {
          type: 'cubic-vertical',
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: '#C2C8D5',
          },
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'click-select'],
        },
        fitView: true,
      });
    }

    const data = {
      nodes: [
        {
          id: '2',
          dataType: 'xxx',
          name: 'xxx',
          conf: [
            {
              label: 'label',
              value: 'value1',
            },
            {
              label: 'label',
              value: 'value2',
            },
            {
              label: 'label',
              value: 'value3',
            },
          ],
        },
      ],
    };

    graph.data(data);
    graph.render();

    graph.on('node:click', (evt) => {
      let node = evt.item;
      var child = node.get('group').find(function (item) {
        return item.get('name') === 'icon-text-shape'; //找到图标节点
      });
      if (child.attr('text') === '+') {
        graph.updateItem(node, {
          style: {
            'icon-text-shape': {
              text: '-',
            },
          },
        });
      } else {
        graph.updateItem(node, {
          style: {
            'icon-text-shape': {
              text: '+',
            },
          },
        });
      }

      console.log('update text', child.attr('text'));
    });
  }, []);

  return (
    <div>
      <div ref={graphContainer} className={'graph-container'} />
    </div>
  );
};
