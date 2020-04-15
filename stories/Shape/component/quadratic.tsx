import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: "1",
      dataType: "alps",
      name: "alps_file1"
    },
    {
      id: "2",
      dataType: "alps",
      name: "alps_file2"
    },
    {
      id: "3",
      dataType: "alps",
      name: "alps_file3"
    },
    {
      id: "4",
      dataType: "sql",
      name: "sql_file1"
    },
    {
      id: "5",
      dataType: "sql",
      name: "sql_file2"
    },
    {
      id: "6",
      dataType: "feature_etl",
      name: "feature_etl_1"
    },
    {
      id: "7",
      dataType: "feature_etl",
      name: "feature_etl_1"
    },
    {
      id: "8",
      dataType: "feature_extractor",
      name: "feature_extractor"
    }
  ],
  edges: [
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
const Quadratic = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {

      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        layout: {
          type: "dagre",
          rankdir: "TB",
          align: "UL",
          nodesep: 25,
          ranksep: 50,
          controlPoints: true
        },
        defaultEdge: {
          type: "cubic",
          curveOffset: [-50, 50],
          curvePosition: [9 / 10, 1 / 10]
          // curveOffset: 10
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

export default Quadratic;
