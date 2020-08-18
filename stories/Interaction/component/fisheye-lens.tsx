import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const FishEye = () => {
  const container = React.useRef();
  const fisheye = new G6.Fisheye({
    r: 200,
    showLabel: true,
    trigger: 'drag',
    wheelScaleRange: true
  });
  const colors = [
    '#8FE9FF',
    '#87EAEF',
    '#FFC9E3',
    '#A7C2FF',
    '#FFA1E3',
    '#FFE269',
    '#BFCFEE',
    '#FFA0C5',
    '#D5FF86',
  ];

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 600,
        plugins: [fisheye],
        layout: {
          type: 'force',
          preventOverlap: true,
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
      });
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
        .then((res) => res.json())
        .then((data) => {
          data.nodes.forEach((node) => {
            node.label = node.id;
            node.size = Math.random() * 40 + 20;
            node.style = {
              fill: colors[Math.floor(Math.random() * 9)],
              lineWidth: 0,
            };
          });
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
        });
    }
  });
  const handleClear = () => {
    fisheye.clear();
  };
  return (
    <div ref={container}>
      <div onClick={handleClear}>click here to clear</div>
    </div>
  );
};

export default FishEye;
