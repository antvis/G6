import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const TimeBarS = () => {
  const container = React.useRef();

  const data = {
    nodes: [],
    edges: [],
  };

  for (let i = 1; i < 60; i++) {
    const id = `node-${i}`;
    const month = i < 30 ? '01' : '02';
    const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
    data.nodes.push({
      id,
      date: parseInt(`2020${month}${day}`),
      value: Math.round(Math.random() * 300),
      label: parseInt(`2020${i}`),
    });

    data.edges.push({
      source: `node-${Math.round(Math.random() * 90)}`,
      target: `node-${Math.round(Math.random() * 90)}`,
    });
    data.edges.push({
      source: `node-${Math.round(Math.random() * 90)}`,
      target: `node-${Math.round(Math.random() * 90)}`,
    });
  }

  const timeBarData = [];

  const nodeSize = 20;

  for (let i = 1; i < 60; i++) {
    const month = i < 30 ? '01' : '02';
    const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
    timeBarData.push({
      date: parseInt(`2020${month}${day}`),
      value: Math.round(Math.random() * 300),
    });
  }

  console.log('timeBarData', timeBarData)

  let count = 0;
  const timebar = new G6.TimeBar({
    x: 0,
    y: 0,
    width: 500,
    height: 150,
    padding: 10,
    type: 'slice',
    slice: {
      data: timeBarData,
      width: 500,
      height: 42,
      padding: 2,
      tickLabelFormatter: d => {
        count++;
        const dateStr = `${d.date}`
        if ((count - 1) % 10 === 0) {
          return `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;
        }
        return false;
      },
      tooltipFomatter: d => {
        const dateStr = `${d}`
        return `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;
      }
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

export default TimeBarS;
