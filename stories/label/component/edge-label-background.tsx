import React, { useEffect } from 'react';
import { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

const edgeLabelCfg1 = {
  autoRotate: true,
  style: {},
};

const edgeLabelCfg2 = {
  autoRotate: true,
  style: {
    background: {
      fill: '#ffffff',
      stroke: '#000000',
      padding: [2, 2, 2, 2],
      radius: 2,
    },
  },
};

const nodeLabelCfg1 = {
  position: 'bottom',
  style: {},
};

const nodeLabelCfg2 = {
  position: 'left',
  style: {
    background: {
      fill: '#ffffff',
      stroke: '#000000',
      padding: [2, 2, 2, 2],
      radius: 2,
    },
  },
};

const data1 = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
      labelCfg: nodeLabelCfg1,
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
      labelCfg: nodeLabelCfg1,
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
      labelCfg: nodeLabelCfg1,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'edge 1',
      labelCfg: edgeLabelCfg2,
    },
    {
      source: 'node2',
      target: 'node3',
      label: 'edge 2',
      labelCfg: edgeLabelCfg2,
    },
    {
      source: 'node3',
      target: 'node1',
      label: 'edge 3',
      labelCfg: edgeLabelCfg2,
    },
  ],
};

const data2 = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
      labelCfg: nodeLabelCfg2,
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
      labelCfg: nodeLabelCfg2,
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
      labelCfg: nodeLabelCfg2,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'edge 1',
      labelCfg: edgeLabelCfg1,
    },
    {
      source: 'node2',
      target: 'node3',
      label: 'edge 2',
      labelCfg: edgeLabelCfg1,
    },
    {
      source: 'node3',
      target: 'node1',
      label: 'edge 3',
      labelCfg: edgeLabelCfg1,
    },
  ],
};

const CustomNode = () => {
  let graph: IGraph = null;
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      graph = new Graph({
        container: container.current as HTMLElement,
        width: 500,
        height: 500,
      });
      graph.data(data1);
      graph.render();
      console.log('---0');
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      graph.changeData(data2);
      console.log('1000');
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      graph.changeData(data1);
      console.log('3000');
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  });

  return <div ref={container} />;
};

export default CustomNode;
