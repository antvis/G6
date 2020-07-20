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
      const nodeColors = [
        '#F8D0CB',
        '#6DC8EC',
        '#D3EEF9',
        '#945FB9',
        '#DECFEA',
        '#FF9845',
        '#FFE0C7',
        '#1E9493',
        '#BBDEDE',
        '#FF99C3',
        '#FFE0ED'
      ];
      const edgeColors = [
        '#5B8FF9',
        '#CDDDFD',
        '#5AD8A6',
        '#CDF3E4',
        '#5D7092',
        '#CED4DE',
        '#F6BD16',
        '#FCEBB9',
        '#E86452',
        '#FF99C3',
        '#FFE0ED'
      ];

      graph.node(n => {
        return {
          style: {
            fill: nodeColors[n.group as number],
          }
        }
      })
      graph.edge(e => {
        return {
          style: {
            stroke: edgeColors[e.group as number],
          }
        }
      })
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

      // graph.on('legendchange', (data) => {
      //   console.log(data)
      // })

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