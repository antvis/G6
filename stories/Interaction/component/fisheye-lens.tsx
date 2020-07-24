import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const FishEye = () => {
  const container = React.useRef();
  const fisheye = new G6.Fisheye({
    r: 100
  });
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        plugins: [fisheye],
        layout: {
          type: 'force'
        },
        modes: {
          default: ['drag-canvas']
        }
      });
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
        .then(res => res.json())
        .then(data => {
          data.nodes.forEach(node => {
            node.label = node.id;
          });
          graph.data(data);
          graph.render();
        });
    }
  });
  const handleClear = () => {
    fisheye.clear();
  }
  return <div ref={container}><div onClick={handleClear}>click here to clear</div></div>;
};

export default FishEye;
