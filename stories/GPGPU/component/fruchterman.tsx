import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const Fruchterman = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        layout: {
          type: 'fruchterman-gpu',
          canvasEl: container.current,
          onLayoutEnd: () => {
            graph.refreshPositions();
          }
        }
      });
      fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
        .then(res => res.json())
        .then(data => {
          graph.data(data);
          graph.render();
        });
    }
  });
  return <div id='container' ref={container}></div>;
};

export default Fruchterman;
