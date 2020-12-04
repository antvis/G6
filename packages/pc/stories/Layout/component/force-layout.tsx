import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const ForceLayout = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        layout: {
          type: 'force',
        },
        defaultNode: {
          size: 15,
          color: '#5B8FF9',
          style: {
            lineWidth: 2,
            fill: '#C6E5FF',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
        },
        modes: {
          default: ['drag-canvas'],
        },
      });
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
        .then((res) => res.json())
        .then((data) => {
          graph.data({
            nodes: data.nodes,
            edges: data.edges.map(function (edge, i) {
              edge.id = 'edge' + i;
              return Object.assign({}, edge);
            }),
          });

          graph.render();

          const forceLayout = graph.get('layoutController').layoutMethod;
          graph.on('node:dragstart', function (e) {
            graph.layout();
            refreshDragedNodePosition(e);
          });
          graph.on('node:drag', function (e) {
            forceLayout.execute();
            refreshDragedNodePosition(e);
          });
          graph.on('node:dragend', function (e) {
            e.item.get('model').fx = null;
            e.item.get('model').fy = null;
          });

          graph.on('canvas:click', (e) => {
            graph.addItem('node', {
              id: 'newnode',
              label: 'xx',
              x: 0,
              y: 0,
            });
            graph.addItem('edge', {
              source: 'newnode',
              target: 'Myriel',
            });
            graph.layout();
          });
        });

      const refreshDragedNodePosition = (e) => {
        const model = e.item.get('model');
        model.fx = e.x;
        model.fy = e.y;
      };
    }
  });
  return <div ref={container}></div>;
};

export default ForceLayout;
