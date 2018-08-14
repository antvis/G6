/**
 * @fileOverview 模拟数据生成的工具
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;
const randomData = {
  // generate chain graph data
  createChainData(num) {
    const nodes = [];
    const edges = [];
    for (let index = 0; index < num; index++) {
      nodes.push({
        id: index
      });
    }
    nodes.forEach((node, index) => {
      const next = nodes[index + 1];
      if (next) {
        edges.push({
          source: node.id,
          target: next.id
        });
      }
    });
    return {
      nodes,
      edges
    };
  },
  // generate cyclic graph data
  createCyclicData(num) {
    const data = randomData.createChainData(num);
    const { nodes, edges } = data;
    const l = nodes.length;
    edges.push({
      source: data.nodes[l - 1].id,
      target: nodes[0].id
    });
    return data;
  },
  // generate num * num nodes without edges
  createNodesData(num) {
    const nodes = [];
    for (let index = 0; index < num * num; index++) {
      nodes.push({
        id: index
      });
    }
    return {
      nodes
    };
  }
};
Util.mix(Util, randomData);
