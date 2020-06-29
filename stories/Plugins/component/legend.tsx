import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

import LesMiserableData from './legendTestData'
let graph: IGraph = null;

const data = LesMiserableData;
data.edges = data.edges.map(e => {
  return {
    ...e,
    group: Math.round(Math.random() * 5)
  }
})

const LegendDemo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const legend = new G6.Legend({
        nodeAttr: 'group',
        edgeAttr: 'group'
      });
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        plugins: [legend],
        layout: {
          type: 'force'
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node']
        },
      });

      graph.data(data);
      graph.render();

      graph.on('node:dragstart', function (e) {
        graph.layout();
        refreshDragedNodePosition(e);
      });
      graph.on('node:drag', function (e) {
        refreshDragedNodePosition(e);
      });
      graph.on('node:dragend', function (e) {
        e.item.get('model').fx = null;
        e.item.get('model').fy = null;
      });

      const refreshDragedNodePosition = (e) => {
        const model = e.item.get('model');
        model.fx = e.x;
        model.fy = e.y;
      }
    }
  });
  return <div ref={container}></div>
}

export default LegendDemo