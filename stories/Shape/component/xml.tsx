import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

const percentageBar = ({ width, used, height = 12 }) => `
<rect style={{
  marginLeft: 10,
  marginTop: 3,
  width: ${width},
  height: ${height},
  fill: '#fff',
  stroke: '#1890ff'
}}  classname="body" >
  <rect style={{
    marginLeft: 10,
    width: ${width / 100 * used},
    height: ${height},
    fill: '#1890ff',
    stroke: '#1890ff'
  }}/>
</rect>
`

const textXML = cfg => `
<group>
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0], xx: 11
  }}>
    <text style="{ marginTop: 2, marginLeft: 50, textAlign: 'center', fontWeight: 'bold', fill: '#fff' }">${cfg.id}</text>
  </rect>
  <rect style="{ width: 100, height: 80, stroke: '#1890ff', fill: 'rgba(24,144,255,0.15)', radius: [0, 0, 6, 6] }" keyshape="true" cursor="move">
    ${cfg.cpuUsage > 60 ? '<text style="{marginLeft: 3 ,fill: \'red\'}">FULL</text>' : ''}
    <text style="{ marginTop: 5, marginLeft: 3, fill: '#333'}">${cfg.metric}: </text>
    <text style="{
      marginTop: 3,
      marginLeft: ${cfg.cpuUsage * 0.8},
      fontSize: 10,
      fill: '#1890ff',
    }">${cfg.cpuUsage}%</text>
    ${percentageBar({ width: 80, used: cfg.cpuUsage })}
  </rect>
</group>
`;

G6.registerNode('test', textXML);

let n = 0;

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: "node1",
      metric: "CPU Usage",
      x: 150,
      y: 150,
      cpuUsage: 80,
    },
    {
      id: "node2",
      metric: "CPU Usage",
      x: 400,
      y: 150,
      cpuUsage: 30,
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2"
    }
  ]
};

const XML = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        defaultNode: {
          type: "test"
        },
        modes: {
          default: ['drag-node', 'drag-canvas']
        },
        nodeStateStyles: {
          hover: {
            fill: 'blue',
            stroke: 'green',
            lineWidth: 3
          }
        },
        defaultEdge: {
          style: {
            stroke: "#1890ff",
            endArrow: true
          }
        }
      });
      graph.data(data);
      graph.render();
      graph.on('node:mouseenter', evt => {
        graph.setItemState(evt.item, 'hover', true)
      })

      graph.on('node:mouseleave', evt => {
        graph.setItemState(evt.item, 'hover', false)
      });

      setTimeout(
        () => graph.updateItem('node1', { 'cpuUsage': 99 }),
        1000
      )
    }

    return () => {
      graph = null;
    }
  }, []);

  return <div>
    <button onClick={() => graph.changeData({
      nodes: [
        {
          id: "node1",
          metric: "CPU Usage " + n,
          cpuUsage: Math.floor(Math.random() * 100),
        },
        {
          id: "node2",
          metric: "CPU Usage " + (n),
          cpuUsage: Math.floor(Math.random() * 100),
        }
      ],
      edges: [
        {
          source: "node1",
          target: "node2",
          n: n++
        }
      ]
    })}>Change Data</button>
    <div ref={container}></div>
  </div>;
};

export default XML;
