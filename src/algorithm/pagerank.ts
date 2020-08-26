import { IGraph } from "../interface/graph";

/**
 * PageRank https://en.wikipedia.org/wiki/PageRank
 * refer: https://github.com/anvaka/ngraph.pagerank
 * @param graph 
 * @param epsilon 判断是否收敛的精度值，默认 0.000001
 * @param linkProb 阻尼系数（dumping factor），指任意时刻，用户访问到某节点后继续访问该节点链接的下一个节点的概率，经验值 0.85
 */
const getPageRank = (graph: IGraph, epsilon?: number, linkProb?: number) => {
  if (typeof epsilon !== 'number') epsilon = 0.000001;
  if (typeof linkProb !== 'number') linkProb = 0.85;

  let distance = 1;
  let leakedRank = 0;
  let maxIterations = 1000;

  const nodes = graph.getNodes();
  const nodesCount = nodes.length;
  let currentRank;
  const curRanks = {};
  const prevRanks = {}

  // Initialize pageranks 初始化
  for (let j = 0; j < nodesCount; ++j) {
    const node = nodes[j];
    const nodeId = node.get('id');
    curRanks[nodeId] = (1 / nodesCount)
    prevRanks[nodeId] = (1 / nodesCount)
  }

  while (maxIterations > 0 && distance > epsilon) {
    leakedRank = 0;
    for (let j = 0; j < nodesCount; ++j) {
      const node = nodes[j];
      const nodeId = node.get('id');
      currentRank = 0;
      if (graph.getNodeDegree(node, 'in') === 0) {
        curRanks[nodeId] = 0;
      } else {
        const neighbors = node.getNeighbors('source');
        for (let i = 0; i < neighbors.length; ++i) {
          const neighbor = neighbors[i];
          const outDegree: number = graph.getNodeDegree(neighbor, 'out') as number;
          if (outDegree > 0) currentRank += (prevRanks[neighbor.get('id')] / outDegree);
        }
        curRanks[nodeId] = linkProb * currentRank;
        leakedRank += curRanks[nodeId];
      }
    }

    leakedRank = (1 - leakedRank) / nodesCount;
    distance = 0;
    for (let j = 0; j < nodesCount; ++j) {
      const node = nodes[j];
      const nodeId = node.get('id');
      currentRank = curRanks[nodeId] + leakedRank;
      distance += Math.abs(currentRank - prevRanks[nodeId]);
      prevRanks[nodeId] = currentRank;
    }
    maxIterations -= 1
  }

  return prevRanks;
}

export default getPageRank