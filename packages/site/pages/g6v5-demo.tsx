import React, { useEffect, useState } from 'react';
import V5Controller from './g6v5-demo-controller';
import { clusteringNodes, create2DGraph, create3DGraph, defaultTheme, formatData, getDegrees } from './g6v5-demo-utils';

const isBrowser = typeof window !== 'undefined';
const G6 = isBrowser ? window.g6v5 : null;

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

const V5LargeGraph = (props) => {
  const { language = 'zh' } = props;

  const container = React.useRef<HTMLDivElement>(null);
  const [graphInstance, setGraphInstance] = useState<typeof G6.Graph>(null);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [graphData3D, setGraphData3D] = useState({ nodes: [], edges: [] });
  const [degrees, setDegrees] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!graphInstance) {
      if (container && container.current) {
        CANVAS_WIDTH = container.current.offsetWidth;
        CANVAS_HEIGHT = container.current.offsetHeight;
      }
      fetch('https://gw.alipayobjects.com/os/basement_prod/0b9730ff-0850-46ff-84d0-1d4afecd43e6.json')
        .then((res) => res.json())
        .then((originData) => {
          let data = formatData(originData);
          data = clusteringNodes(data);
          const nodeDegrees = getDegrees(data)
          handleCreateGraph(false, data, nodeDegrees);
          setDegrees(nodeDegrees);
          setGraphData(data);
        });
    }
  }, []);

  const fetchData3D = (callback) => {
    fetch('https://assets.antv.antgroup.com/g6/eva-3d.json')
        .then((res) => res.json())
      .then((originData) => {
        let data = formatData(originData, true);
        data = clusteringNodes(data);
        setGraphData3D(data);
        callback(data);
      })
  }

  const handleCreateGraph = (renderer, data = graphData, nodeDegrees = degrees, currentTheme = defaultTheme) => {
    setLoading(true);
    const create3DFunc = async (data3d) => {
      const graph = await create3DGraph({
        container: container.current,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        data: data3d,
        degrees: nodeDegrees,
      });
      graph.on('afterlayout', e => setLoading(false));
      setGraphInstance(graph);
    }
    const func = () => {
      if (renderer === 'webgl-3d') {
        if (graphData3D?.nodes.length) {
          create3DFunc(graphData3D);
        } else {
          fetchData3D(create3DFunc);
        }
      } else {
        const graph = create2DGraph({
          renderer,
          container: container.current,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          data,
          degrees: nodeDegrees,
          lodStrategyLevels,
          theme: currentTheme
        });
        graph.on('afterlayout', e => setLoading(false));
        setGraphInstance(graph);
      }
    }
    if (graphInstance) {
      graphInstance.destroy(() => {
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
      <V5Controller language={language} graph={graphInstance} zoomLevels={lodStrategyLevels} createGraph={handleCreateGraph} />
      { loading ? <div className='v5-loading-mask'>
          <div className='v5-loading'>
          <img className='v5-loading-img' src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*atJHQYsFxogAAAAAAAAAAAAADmJ7AQ/original" />
          <p className='v5-loading-txt'>数据加载中…</p>
        </div>
      </div> : ''}
    </>
  );
};

export default V5LargeGraph;
