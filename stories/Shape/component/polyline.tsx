import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: "1",
      dataType: "alps",
      name: "alps_file1",
      conf: [
        {
          label: "conf",
          value: "pai_graph.conf"
        },
        {
          label: "dot",
          value: "pai_graph.dot"
        },
        {
          label: "init",
          value: "init.rc"
        }
      ]
    },
    {
      id: "2",
      dataType: "alps",
      name: "alps_file2",
      conf: [
        {
          label: "conf",
          value: "pai_graph.conf"
        },
        {
          label: "dot",
          value: "pai_graph.dot"
        },
        {
          label: "init",
          value: "init.rc"
        }
      ]
    },
    {
      id: "3",
      dataType: "alps",
      name: "alps_file3",
      conf: [
        {
          label: "conf",
          value: "pai_graph.conf"
        },
        {
          label: "dot",
          value: "pai_graph.dot"
        },
        {
          label: "init",
          value: "init.rc"
        }
      ]
    },
    {
      id: "4",
      dataType: "sql",
      name: "sql_file1",
      conf: [
        {
          label: "conf",
          value: "pai_graph.conf"
        },
        {
          label: "dot",
          value: "pai_graph.dot"
        },
        {
          label: "init",
          value: "init.rc"
        }
      ]
    },
    {
      id: "5",
      dataType: "sql",
      name: "sql_file2",
      conf: [
        {
          label: "conf",
          value: "pai_graph.conf"
        },
        {
          label: "dot",
          value: "pai_graph.dot"
        },
        {
          label: "init",
          value: "init.rc"
        }
      ]
    },
    {
      id: "6",
      dataType: "feature_etl",
      name: "feature_etl_1",
      conf: [
        {
          label: "conf",
          value: "pai_graph.conf"
        },
        {
          label: "dot",
          value: "pai_graph.dot"
        },
        {
          label: "init",
          value: "init.rc"
        }
      ]
    },
    {
      id: "7",
      dataType: "feature_etl",
      name: "feature_etl_1",
      conf: [
        {
          label: "conf",
          value: "pai_graph.conf"
        },
        {
          label: "dot",
          value: "pai_graph.dot"
        },
        {
          label: "init",
          value: "init.rc"
        }
      ]
    },
    {
      id: "8",
      dataType: "feature_extractor",
      name: "feature_extractor",
      conf: [
        {
          label: "conf",
          value: "pai_graph.conf"
        },
        {
          label: "dot",
          value: "pai_graph.dot"
        },
        {
          label: "init",
          value: "init.rc"
        }
      ]
    }
  ],
  edges: [
    {
      source: "1",
      target: "1",
      type: "loop",
      // controlPoints: [{x: 50, y: 100}]
    },
    {
      source: "1",
      target: "2"
    },
    {
      source: "1",
      target: "3"
    },
    {
      source: "2",
      target: "4"
    },
    {
      source: "3",
      target: "4"
    },
    {
      source: "4",
      target: "5"
    },
    {
      source: "5",
      target: "6"
    },
    {
      source: "6",
      target: "7"
    },
    {
      source: "6",
      target: "8"
    }
  ]
};
const Polyline = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {

      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        layout: {
          type: "dagre",
          rankdir: "LR",
          align: "UL",
          nodesep: 25,
          ranksep: 50,
          controlPoints: true
        },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 20,
            endArrow: true,
            lineWidth: 2,
            stroke: "#C2C8D5"
          },
          loopCfg: {
            position: "left",
            dist: 75,
            clockwise: true
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
