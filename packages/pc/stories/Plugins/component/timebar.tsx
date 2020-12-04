import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const TimeBar = () => {
  const container = React.useRef();

  const data = {
    nodes: [],
    edges: [],
  };

  for (let i = 0; i < 100; i++) {
    const id = `node-${i}`;
    data.nodes.push({
      id,
      date: `2020${i}`,
      value: Math.round(Math.random() * 300),
    });

    data.edges.push({
      source: `node-${Math.round(Math.random() * 90)}`,
      target: `node-${Math.round(Math.random() * 90)}`,
    });
  }

  const timeBarData = [];

  const nodeSize = 20;

  for (let i = 0; i < 100; i++) {
    timeBarData.push({
      date: `2020${i}`,
      value: Math.round(Math.random() * 300),
    });
  }

  const timebar = new G6.TimeBar({
    width: 600,
    timebar: {
      width: 550,
      trend: {
        data: timeBarData,
        isArea: false,
        smooth: true,
      },
      start: 0.4,
      end: 0.5,
    },
  });

  useEffect(() => {
    if (!graph) {
      const toolbar = new G6.ToolBar();
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        plugins: [timebar],
        layout: {
          type: 'force',
          preventOverlap: true,
        },
        defaultNode: {
          size: nodeSize,
          type: 'circle',
          style: {
            fill: '#DEE9FF',
            stroke: '#5B8FF9',
          },
        },
        modes: {
          default: ['drag-node'],
        },
      });
      graph.data(data);
      graph.render();
    }
  });

  return (
    <div>
      <div style={{ left: '100px' }} ref={container}></div>
    </div>
  );
};

export default TimeBar;
