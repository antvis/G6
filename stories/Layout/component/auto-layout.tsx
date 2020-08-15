import React, { useState, useEffect } from 'react';
import { text } from '@storybook/addon-knobs';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

function generateData() {
  let nodeNum = Math.floor(20 + Math.random() * 30);
  let edgeNum = Math.floor(nodeNum + Math.floor(nodeNum + nodeNum * (nodeNum - 3) * Math.random() / 4));

  let nodes = [];
  for (let i = 0; i < nodeNum; i++) {
    nodes.push({
      id: 'node'+i.toString(),
      label: i.toString(),
    })
  }

  let edges = [];
  let edgeIdx = 0;
  while (edgeIdx < nodeNum) {
    edges.push({
      id: 'edge'+edgeIdx.toString(),
      source: 'node'+edgeIdx.toString(),
      target: 'node'+((edgeIdx+1)%nodeNum).toString(),
    });
    edgeIdx += 1;
  }

  while (edgeIdx < edgeNum) {
    let s = Math.floor(Math.random() * nodeNum);
    let t = Math.floor(Math.random() * nodeNum);
    edges.push({
      id: 'edge'+edgeIdx.toString(),
      source: 'node'+s.toString(),
      target: 'node'+t.toString(),
    });
    edgeIdx++;
  }

  return {
      nodes: nodes,
      edges: edges,
  };
}

const AutoLayout = () => {
  const container = React.useRef();
  let [recommendedLayout, getRecommendedLayout] = useState("");

  useEffect(() => {
    const graph = new G6.Graph({
      container: container.current as string | HTMLElement,
      width: 800,
      height: 600,
      modes: {
        default: ['drag-node', 'drag-canvas'],
      },
    });

    graph.data(generateData());
    let sortedLayoutProb = graph.autoLayout();
    getRecommendedLayout(recommendedLayout = text('Describe', sortedLayoutProb[0][0].toString()));
  });

  let describe = `Recommended Layout: ${recommendedLayout}.`;
  return <div ref={container}>{describe}</div>;
};

export default AutoLayout;
