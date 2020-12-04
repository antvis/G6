import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { clone } from '@antv/util';

let graph: IGraph = null;

const MinimapForce = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const minimap = new G6.Minimap({
        size: [300, 200],
        type: 'delegate',
        padding: 10,
      });
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
        .then((res) => res.json())
        .then((data) => {
          graph = new Graph({
            container: container.current as string | HTMLElement,
            width: 300,
            height: 400,
            plugins: [minimap],
            modes: {
              default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
            },
            layout: {
              type: 'force',
            },
          });
          const newData = clone(data);
          // const newData2 = clone(data);
          newData.nodes.forEach((node) => {
            node.id = `${node.id}-new`;
          });
          newData.edges.forEach((edge) => {
            edge.source = `${edge.source}-new`;
            edge.target = `${edge.target}-new`;
          });
          // newData2.nodes.forEach(node => {
          //   node.id = `${node.id}-new2`
          // });
          // newData2.edges.forEach(edge => {
          //   edge.source = `${edge.source}-new2`
          //   edge.target = `${edge.target}-new2`
          // });
          // data.edges.push({
          //   source: data.nodes[0].id,
          //   target: newData.nodes[0].id,
          // });
          // data.edges.push({
          //   source: data.nodes[0].id,
          //   target: newData2.nodes[0].id,
          // });
          // const finalData = {
          //   nodes: data.nodes.concat(newData.nodes, newData2.nodes),
          //   edges: data.edges.concat(newData.edges, newData2.edges),
          // }
          graph.data(data); // finalData
          graph.render();
          graph.on('canvas:click', (e) => {
            graph.removeItem(graph.getNodes()[0]);
          });
        });
    }
  });
  return <div ref={container}></div>;
};

export default MinimapForce;
