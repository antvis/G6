import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

function handleClick(msg) {
  alert('aaa');
}

const DomClick = () => {
  G6.registerNode(
    'dom-node',
    {
      draw: (cfg, group) => {
        return group.addShape('dom', {
          attrs: {
            width: cfg.size[0],
            height: cfg.size[1],
            // 传入 DOM 的 html，带有原生 onclick 事件
            html: `
        <div onclick="console.log('a');alert('a');" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${
          cfg.size[0] - 5
        }px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `,
          },
          draggable: true,
        });
      },
    },
    'single-node',
  );

  const data = {
    nodes: [
      {
        id: 'node1',
        x: 100,
        y: 200,
        label: '首页监控',
      },
      {
        id: 'node2',
        x: 300,
        y: 200,
        label: '子页面',
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
    ],
  };

  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 600,
        renderer: 'svg',
        defaultNode: {
          type: 'dom-node',
          size: [120, 40],
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: '#C2C8D5',
          },
        },
      });
      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default DomClick;
