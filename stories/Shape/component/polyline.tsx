import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;
const data = {
  nodes: [
  {
  id: "2",
  label: "2",
  },
  {
  id: "3",
  label: "3",
  },
  {
  id: "4",
  label: "4",
  }
  ],
  edges: [
  // 配置内置折线的弯折弧度、端点最小距离
  {
  source: "2",
  target: "3"
  },
  {
  source: "2",
  target: "4"
  }
  ]
};
const Polyline = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {

      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        linkCenter: true,
        layout: {
          type: "fruchterman"
        },
        defaultEdge: {
          shape: "polyline",
          style: {
            radius: 10,
            offset: 15,
            endArrow: true,
            stroke: "#F6BD16"
          }
        },
        modes: {
          default: ['drag-node']
        }
      });
      graph.data(data);
      graph.render();
    }
  });
  

  return <div ref={container}></div>;
};

export default Polyline;
