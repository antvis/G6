import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      x: 50,
      y: 50,
      label: 'xxx',
    },
    {
      id: 'node2',
      x: 250,
      y: 50,
      label: 'yyy',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};
G6.registerNode('custom-node', {}, 'circle');

const ExtendNode = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'custom-node',
          icon: {
            show: true,
            width: 20,
            height: 20,
          },
        },
      });
      graph.data(data);
      graph.render();

      graph.on('canvas:click', (evt) => {
        const node = graph.getNodes()[0];
        const group = node.get('group');
        let circleicon = group.find((g) => {
          return g.get('className') === 'circle-icon';
        });
        console.log(11, circleicon);
        const newImg =
          'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mt47RKxGy8kAAAAAAAAAAABkARQnAQ';
        node.update({
          icon: {
            show: true,
            img: newImg,
            width: 50,
            height: 50,
          },
        });
        let customNodeIcon = group.find((g) => {
          return g.get('className') === 'custom-node-icon';
        });
        console.log(22, customNodeIcon);
      });
    }
  });

  return <div ref={container}></div>;
};

export default ExtendNode;
