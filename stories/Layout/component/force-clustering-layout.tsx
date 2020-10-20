import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;
let yearGroup: { [key: string]: number } = {};
let colorMap = {
  2012: 'blue',
  2013: 'yellow',
  2014: 'red',
  2015: 'gray',
  2016: 'black',
};

const ForceClusteringLayout = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 1000,
        layout: {
          type: 'force',
          clustering: true,
          clusterNodeStrength: -10,
          clusterEdgeDistance: 200,
          clusterNodeSize: 20,
          // nodeStrength: -100,
          clusterFociStrength: 1.2,
          nodeSpacing: 5,
          preventOverlap: true,
        },
        defaultNode: {
          size: 15,
          color: '#5B8FF9',
          style: {
            lineWidth: 2,
            fill: '#C6E5FF',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
        },
        modes: {
          default: ['drag-canvas'],
        },
      });

      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json',
      )
        .then((res) => res.json())
        .then((data) => {
          graph.data(data);
          data.nodes.forEach((i) => {
            i.cluster = i.year;
            i.style = Object.assign(i.style || {}, {
              fill: colorMap[i.year],
            });
          });
          graph.render();
        });
    }
  });

  return <div ref={container}></div>;
};

export default ForceClusteringLayout;
