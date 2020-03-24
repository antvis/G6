import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
      comboId: 'A'
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
      comboId: 'B'
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
  ],
  combos: [
  {
    id: 'A',
    parentId: 'B'
  }, {
    id: 'B',
    parentId: 'C'
  }, {
    id: 'C'
  }, {
    id: 'D'
  }, {
    id: 'E'
  }]
};

const DefaultCombo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
      });
      graph.data(data);
      graph.render();
      graph.on('canvas:click', e => {
        console.log('click cavnas')
        graph.addItem('combo', {
          id: 'F',
          parentId: 'A'
        })
      });
    }
  });
  return <div ref={container}></div>;
};

export default DefaultCombo;
