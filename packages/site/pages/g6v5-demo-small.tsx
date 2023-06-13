import React, { useEffect, useState } from 'react';
import { clusteringNodes,formatData, getDegrees } from './g6v5-demo-utils';
const { initThreads, supportsThreads, ForceLayout }  = Layout;

const isBrowser = typeof window !== 'undefined';
const G6 = isBrowser ? window.g6v5 : null;
const Algorithm = isBrowser ? window.Algorithm : {};

let CANVAS_WIDTH = 800,
  CANVAS_HEIGHT = 800;

const V5SmallGraph = (props) => {
  const { language = 'zh' } = props;

  const container = React.useRef<HTMLDivElement>(null);
  const [graphInstance, setGraphInstance] = useState<typeof G6.Graph>(null);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [degrees, setDegrees] = useState({});

  useEffect(() => {
    if (!graphInstance) {
      if (container && container.current) {
        CANVAS_WIDTH = container.current.offsetWidth;
        CANVAS_HEIGHT = container.current.offsetHeight;
      }
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
        .then((res) => res.json())
        .then((originData) => {
          let data = formatData(originData, false, true);
          data = clusteringNodes(data);
          const nodeDegrees = getDegrees(data)
          handleCreateGraph(data, nodeDegrees);
          setDegrees(nodeDegrees);
          setGraphData(data);
        });
    }
  }, []);

  const handleCreateGraph = async (data, nodeDegrees = degrees) => {
    const supported = await supportsThreads();
    const threads = await initThreads(supported);
    G6.stdLib.layouts['force-wasm'] = ForceLayout;
    const graph = new G6.Graph({
      renderer: 'canvas',
      container: container.current,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      data,
      layout: {
        type: 'force-wasm',
        threads,
        dimensions: 2,
        maxIteration: 800,
        minMovement: 0.4,
        distanceThresholdMode: 'mean',
        factor: 1,
        gravity: 10,
        linkDistance: 80,
        edgeStrength: 200,
        nodeStrength: 1000,
        coulombDisScale: 0.005,
        damping: 0.9,
        maxSpeed: 1000,
        interval: 0.02,
      },
      modes: {
        default: [
          'zoom-canvas',
          'drag-canvas',
          'drag-node',
          'brush-select',
          'click-select',
        ],
      },
      theme: {
        type: 'spec',
        specification: {
          node: {
            dataTypeField: 'cluster',
          },
        },
      },
      edge: (innerModel) => {
        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            keyShape: {
              lineWidth: 0.5,
            },
            haloShape: {},
            animates: {
              buildIn: [
                {
                  fields: ['opacity'],
                  shapeId: 'keyShape',
                  duration: 500,
                  delay: 1000,
                },
              ],
              buildOut: [
                {
                  fields: ['opacity'],
                  duration: 200,
                },
              ],
              update: [
                {
                  fields: ['lineWidth'],
                  shapeId: 'keyShape',
                },
                {
                  fields: ['opacity'], // 'r' error, 'lineWidth' has no effect
                  shapeId: 'haloShape',
                },
              ],
            },
          },
        };
      },
      node: (innerModel) => {
        const degree = nodeDegrees[innerModel.id] || 0;
        let labelLod = 4;
        if (degree > 20) labelLod = -1;
        else if (degree > 15) labelLod = 0;
        else if (degree > 10) labelLod = 1;
        else if (degree > 6) labelLod = 2;
        else if (degree > 3) labelLod = 3;

        const badgeShapes = {};

        if (degree > 20) {
          badgeShapes[0] = {
            text: '核心人员',
            position: 'right',
            lod: labelLod - 2,
          };
        }
        if (degree > 15) {
          badgeShapes[1] = {
            text: 'A',
            position: 'rightTop',
            lod: labelLod - 1,
          };
        }
        if (degree > 10) {
          badgeShapes[2] = {
            text: 'B',
            position: 'rightBottom',
            lod: labelLod - 1,
          };
        }

        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            lodStrategy: {
              levels: [
                { zoomRange: [0, 0.8] }, // -2
                { zoomRange: [0.8, 0.9] }, // -1
                { zoomRange: [0.9, 1], primary: true }, // 0
                { zoomRange: [1, 1.1] }, // 1
                { zoomRange: [1.1, 0.2] }, // 2
                { zoomRange: [1.2, 1.3] }, // 3
                { zoomRange: [1.3, 1.4] }, // 4
                { zoomRange: [1.4, 1.5] }, // 5
                { zoomRange: [1.5, Infinity] }, // 6
              ],
              animateCfg: {
                duration: 500,
              },
            },

            animates: {
              buildIn: [
                {
                  fields: ['opacity'],
                  duration: 1000,
                  delay: 500 + Math.random() * 500,
                },
              ],
              buildOut: [
                {
                  fields: ['opacity'],
                  duration: 200,
                },
              ],
              hide: [
                {
                  fields: ['size'],
                  duration: 200,
                },
                {
                  fields: ['opacity'],
                  duration: 200,
                  shapeId: 'keyShape',
                },
                {
                  fields: ['opacity'],
                  duration: 200,
                  shapeId: 'labelShape',
                },
              ],
              show: [
                {
                  fields: ['size'],
                  duration: 200,
                },
                {
                  fields: ['opacity'],
                  duration: 200,
                  shapeId: 'keyShape',
                  order: 0,
                },
              ],
              update: [
                {
                  fields: ['lineWidth', 'fill', 'r'],
                  shapeId: 'keyShape',
                },
                {
                  fields: ['fontSize'],
                  shapeId: 'iconShape',
                },
                {
                  fields: ['opacity'], // 'r' error, 'lineWidth' has no effect
                  shapeId: 'haloShape',
                },
              ],
            },
            haloShape: {},
            // animate in shapes, unrelated to each other, excuted parallely
            keyShape: {
              r: innerModel.data.size ? innerModel.data.size / 2 : 15,
            },
            iconShape: {
              img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
              fill: '#fff',
              lod: labelLod - 1,
              fontSize: innerModel.data.size ? innerModel.data.size / 3 + 5 : 13,
            },
            labelShape: {
              text: innerModel.id,
              opacity: 0.8,
              maxWidth: '150%',
              lod: labelLod,
            },
            labelBackgroundShape: {
              lod: labelLod,
            },
            badgeShapes,
          },
        };
      },
    });
    setGraphInstance(graph);
  }

  const handleChangeColors = () => {
    graphInstance.updateData(
      'node',
      graphData.nodes.map((node) => ({
        id: node.id,
        data: {
          cluster: node.data.cluster + 1,
        },
      })),
    );
  }

  const handleImportanceAnalyse = (e) => {
    const algo = e.target.value;
    switch(algo) {
      case 'degree':
        graphInstance.updateData(
          'node',
          graphData.nodes.map((node) => ({
            id: node.id,
            data: {
              size: degrees[node.id] + 24,
            },
          }))
        );
        return;
      case 'pagerank':
        if (Algorithm?.pageRank) {
          const importances: {[id: string]: number }= Algorithm.pageRank(graphData);
          let min = Infinity;
          let max = -Infinity;
          Object.values(importances).forEach(val => {
            if (val < min) min = val;
            if (val > max) max = val;
          });
          const sizeRange = [15, 60];
          const importanceRange = max - min;
          graphInstance.updateData(
            'node',
            graphData.nodes.map((node) => ({
              id: node.id,
              data: {
                size: (importances[node.id] - min) / importanceRange * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
              },
            }))
          );
          return;
        }
      default:
        graphInstance.updateData(
          'node',
          graphData.nodes.map((node) => ({
            id: node.id,
            data: {
              size: 30,
            },
          }))
        );
    }
  }

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (container && container.current) {
        CANVAS_WIDTH = container.current.offsetWidth;
        CANVAS_HEIGHT = container.current.offsetHeight;
      }
    };

  const domWidth = language === 'zh' ? '135px' : '226px';
  return (
    <>
      <div
        ref={container}
        style={{ height: 'calc(100vh - 100px)', width: '100%' }}
      />
      <div className='v5-controller'>
        <button className='v5-button' onClick={handleChangeColors} style={{ width: domWidth }}>{language === 'zh' ? '更换颜色顺序' : 'Change Color Order'}</button>
        <select className='v5-select' onChange={handleImportanceAnalyse} style={{ width: domWidth}}>
          <option value="none">{language === 'zh' ? '节点重要性-无' : 'Node Importance: None'}</option>
          <option value="degree">{language === 'zh' ? '节点重要性-度中心性' : 'Node Importance: Degree Centerness'}</option>
          <option value="pagerank">{language === 'zh' ? '节点重要性-PageRank' : 'Node Importance: PageRank'}</option>
        </select>
      </div>
    </>
  );
};

export default V5SmallGraph;
