/**
 * @fileOverview 模拟数据生成的工具
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;
const randomData = {
  // 生成链式图数据
  createChainData(num, nodes = [], edges = []) {
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
  // 生成圆数据
  createCyclicData(num) {
    const data = randomData.createChainData(num);
    const { nodes, edges } = data;
    const l = nodes.length;
    edges.push({
      source: data.nodes[l - 1].id,
      target: nodes[0].id
    });
    return data;
  }
};
Util.mix(Util, randomData);
