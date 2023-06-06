/**
 * @fileOverview 基于 prim 获取有向图最大生成树 算法
 * https://zh.wikipedia.org/wiki/%E6%99%AE%E6%9E%97%E5%A7%86%E7%AE%97%E6%B3%95
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const { Util } = G6;

let treeNodes = [];
let treeEdges = [];

function maxSpanningTree(connectedSubset) {
  const nodes = connectedSubset.nodes;
  const edges = connectedSubset.edges;
  const root = connectedSubset.root;
  const nodeMap = {};
  Util.each(nodes, node => {
    node.to = [];
    node.from = [];
    nodeMap[node.id] = node;
  });
  Util.each(edges, edge => {
    const source = nodeMap[edge.source];
    const target = nodeMap[edge.target];
    source.to.push(edge);
    target.from.push(edge);
  });
  treeNodes = [ root ];
  treeEdges = [];
  while (treeNodes.length !== nodes.length) {
    let maxWeight = -Infinity;
    let maxEdge;
    let direct = 'target';
    Util.each(treeNodes, treeNode => {
      Util.each(treeNode.to, edge => {
        if (treeNodes.indexOf(nodeMap[edge[direct]]) === -1) {
          if (edge.weight > maxWeight) {
            maxWeight = edge.weight;
            maxEdge = edge;
          }
        }
      });
    });
    if (!maxEdge) {
      direct = 'source';
      Util.each(treeNodes, treeNode => {
        Util.each(treeNode.from, edge => {
          if (treeNodes.indexOf(nodeMap[edge[direct]]) === -1) {
            if (edge.weight > maxWeight) {
              maxWeight = edge.weight;
              maxEdge = edge;
            }
          }
        });
      });
    }
    treeNodes.push(nodeMap[maxEdge[direct]]);
    treeEdges.push(maxEdge);
  }
  // 清除标记
  Util.each(nodes, node => {
    delete node.to;
    delete node.from;
  });
  return {
    nodes: treeNodes,
    edges: treeEdges
  };
}

module.exports = maxSpanningTree;
