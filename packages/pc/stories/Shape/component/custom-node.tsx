import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

G6.registerNode(
  'self-node',
  {
    draw(cfg, group) {
      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          // ...keyShapeStyle,
          r: cfg.sizee,
          fill: 'red',
        },
        name: 'main-node',
      });

      group.addShape('circle', {
        attrs: {
          r: 5,
          fill: 'blue',
          x: 10,
          y: 5,
        },
        name: 'sub-node',
      });

      return keyShape;
    },
  },
  'single-node',
); //, 'circle'

const CustomNode = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const data = {
        nodes: [
          {
            id: 'circle',
            label: 'Circle',
            type: 'self-node',
            x: 250,
            y: 150,
            sizee: 40,
          },
        ],
      };
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
      });
      graph.data(data);
      graph.render();

      graph.on('node:click', (evt) => {
        graph.updateItem(evt.item, {
          style: {
            fill: 'pink',
          },
        });
      });
    }
  });

  return <div ref={container}></div>;
};

export default CustomNode;
