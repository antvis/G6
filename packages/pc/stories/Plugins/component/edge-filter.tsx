import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const EdgeFilter = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const filterLens = new G6.EdgeFilterLens({
        trigger: 'drag',
        showLabel: 'edge',
        shouldShow: d => {
          if (d.size > 3) return true;
          return false;
        },
      });
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        plugins: [filterLens],
        defaultEdge: {
          labelCfg: {
            autoRotate: true
          }
        },
        defaultNode: {
          size: 15,
          color: '#5B8FF9',
          style: {
            lineWidth: 2,
            fill: '#C6E5FF',
          },
        },
        modes: {
          default: ['drag-canvas']
        }
      });
      fetch('https://gw.alipayobjects.com/os/bmw-prod/afe8b2a6-f691-4070-aa73-46fc07fd1171.json')
        .then((res) => res.json())
        .then((data) => {
          data.edges.forEach(edge => {
            edge.size = 1 + Math.random() * 3;
            // edge.label = 'label';
            edge.color = edge.size > 3 ? '#FB4B4B' : '#aaa'
            edge.style = {
              opacity: 0.7
            }
          })
          graph.data(data);
          graph.render();
          graph.getNodes().forEach((node) => {
            node
              .getContainer()
              .getChildren()
              .forEach((shape) => {
                if (shape.get('type') === 'text') shape.set('visible', false);
              });
          });
          graph.getEdges().forEach((edge) => {
            edge
              .getContainer()
              .getChildren()
              .forEach((shape) => {
                if (shape.get('type') === 'text') shape.set('visible', false);
              });
          });
        });
    }
  });
  return (
    <div>
      <div ref={container}></div>
    </div>
  );
};

export default EdgeFilter;
