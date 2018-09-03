/**
 * @fileOverview 最大生成森林
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const { Util } = G6;
const maxSpanningTree = require('./maxSpanningTree');

function maxSpanningForest({ nodes, edges }) {
  const connectedSubsets = [];
  const forest = {
    nodes: [],
    edges: [],
    maxRankNode: null
  };
  const nodeMap = {};
  let maxRank = -Infinity;
  Util.each(nodes, node => {
    node.links = [];
    node.edges = [];
    nodeMap[node.id] = node;
    if (Util.isNil(node.weight)) {
      node.weight = 1;
    }
    if (Util.isNil(node.rank)) {
      if (node.weight) {
        node.rank = node.weight;
      } else {
        node.rank = 1;
      }
    }
  });
  Util.each(edges, (edge, i) => {
    const source = nodeMap[edge.source];
    const target = nodeMap[edge.target];
    source.links.push(nodes.indexOf(target));
    target.links.push(nodes.indexOf(source));
    source.edges.push(i);
    target.edges.push(i);
    if (Util.isNil(edge.weight)) {
      edge.weight = 1;
    }
  });
  Util.each(nodes, (node, i) => {
    if (!node.visited) {
      connectedSubsets.push(getConnectedSubset(i, nodes, edges));
    }
  });
  Util.each(nodes, node => {
    delete node.links;
    delete node.edges;
    delete node.visited;
  });
  Util.each(connectedSubsets, connectedSubset => {
    const tree = maxSpanningTree(connectedSubset);
    const root = connectedSubset.root;
    forest.nodes = forest.nodes.concat(tree.nodes);
    forest.edges = forest.edges.concat(tree.edges);
    if (root.rank > maxRank) {
      maxRank = root.rank;
      forest.maxRankNode = root;
    }
  });
  return forest;
}
// 获取连通子集
function getConnectedSubset(start, nodes, edges) {
  const connectedSubset = {
    nodes: [],
    edges: [],
    root: null
  };
  const edgeMap = {};
  const subEdges = [];
  let maxRank = -Infinity;
  dfs(start, nodes, index => {
    const node = nodes[index];
    if (node.rank > maxRank) {
      maxRank = node.rank;
      connectedSubset.root = node;
    }
    connectedSubset.nodes.push(node);
    connectedSubset.edges = connectedSubset.edges.concat(node.edges);
  });
  // 边索引去重
  Util.each(connectedSubset.edges, edgeIndex => {
    if (!edgeMap[edgeIndex]) {
      subEdges.push(edges[edgeIndex]);
      edgeMap[edgeIndex] = true;
    }
  });
  connectedSubset.edges = subEdges;
  return connectedSubset;
}

// 深度优先遍历算法
function dfs(start, nodes, callback) {
  const listToExplore = [ start ];
  nodes[ start ].visited = true;
  callback(start);
  while (listToExplore.length > 0) {
    const nodeIndex = listToExplore.pop();
    nodes[ nodeIndex ].links.forEach(function(childIndex) {
      if (!nodes[ childIndex ].visited) {
        nodes[ childIndex ].visited = true;
        callback(childIndex);
        listToExplore.push(childIndex);
      }
    });
  }
}
module.exports = maxSpanningForest;
