import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const Rect = () => {
  const container = React.useRef();
  const data = {
    nodes: [
      {
        id: '0',
        label: '0',
      },
    ],
  };
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          align: 'DL',
          nodesepFunc: () => 1,
          ranksepFunc: () => 1,
        },
        defaultNode: {
          type: 'rect',
        },
      });
    }

    graph.data(data);
    graph.render();
    graph.on('node:click', e => {
      graph.setItemState(e.item, 'selected', true);
    })
    graph.on('canvas:click', e => {
      graph.setItemState(graph.getNodes()[0], 'selected', false);
    })
  });

  return <div ref={container}></div>;
};

export default Rect;
