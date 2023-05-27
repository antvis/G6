import React, { useEffect, useState } from 'react';
import V5Controller from './g6v5-demo-controller';
import { clusteringNodes, create2DGraph, create3DGraph, formatData, getDegrees } from './g6v5-demo-utils';

const isBrowser = typeof window !== 'undefined';
const G6 = isBrowser ? window.g6v5 : null;

let graph: typeof G6.Graph = null;
let CANVAS_WIDTH = 800,
  CANVAS_HEIGHT = 800;

const lodStrategyLevels = [
  { zoomRange: [0, 0.16] }, // -2
  { zoomRange: [0.16, 0.2] }, // -1
  { zoomRange: [0.2, 0.3], primary: true }, // 0
  { zoomRange: [0.3, 0.5] }, // 1
  { zoomRange: [0.5, 0.8] }, // 2
  { zoomRange: [0.8, 1.5] }, // 3
  { zoomRange: [1.5, 1.8] }, // 4
  { zoomRange: [1.8, 2] }, // 5
  { zoomRange: [2, Infinity] }, // 6
]

const V5LargeGraph = () => {

  const container = React.useRef<HTMLDivElement>(null);
  const [graphInstance, setGraphInstance] = useState(null);
  const [originData, setOriginData] = useState({ nodes: [], edges: [] });
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [graphData3D, setGraphData3D] = useState({ nodes: [], edges: [] });
  const [degrees, setDegrees] = useState({});

  useEffect(() => {
    if (!graph) {
      if (container && container.current) {
        CANVAS_WIDTH = container.current.offsetWidth;
        CANVAS_HEIGHT = container.current.offsetHeight;
      }
      fetch('https://gw.alipayobjects.com/os/basement_prod/0b9730ff-0850-46ff-84d0-1d4afecd43e6.json')
        .then((res) => res.json())
        .then((originData) => {
          setOriginData(originData);
          let data = formatData(originData);
          data = clusteringNodes(data);
          const nodeDegrees = getDegrees(data)
          handleCreateGraph(false, data, nodeDegrees);
          setDegrees(nodeDegrees);
          setGraphData(data);
        });
    }
  });

  const handleCreateGraph = (renderer, data = graphData, nodeDegrees = degrees) => {
    const func = () => {
      if (renderer === 'webgl-3d') {
        const usingData = formatData(originData, true);
        clusteringNodes(usingData);
        graph = create3DGraph({
          container: container.current,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          data,
          degrees: nodeDegrees,
        })
      } else {
        graph = create2DGraph({
          renderer,
          container: container.current,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          data,
          degrees: nodeDegrees,
          lodStrategyLevels
        });
      }
      setGraphInstance(graph);
    }
    if (graph) {
      graph.destroy(() => {
        func();
      })
    } else {
      func();
    }
  }

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (container && container.current) {
        CANVAS_WIDTH = container.current.offsetWidth;
        CANVAS_HEIGHT = container.current.offsetHeight;
      }
    };
  return (
    <>
      <div
        ref={container}
        style={{ height: 'calc(100vh - 100px)', width: '100%' }}
      />
      <V5Controller graph={graphInstance} zoomLevels={lodStrategyLevels} createGraph={handleCreateGraph} />
    </>
  );
};

export default V5LargeGraph;
