import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

const data = {
  nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }],
};

let graph: IGraph = null;

const AddNodeLayout = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        layout: {
          type: 'circular',
        },
        animate: true,
      });
      graph.data(data);
      graph.render();

      graph.on('canvas:click', (e) => {
        const nodes = graph.getNodes();
        graph.addItem('node', { id: `node${nodes.length + 1}` });
        // debugger
        graph.layout();
      });
    }
  });
  return <div ref={container}></div>;
};

export default AddNodeLayout;
