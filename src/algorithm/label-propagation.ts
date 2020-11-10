import { uniqueId } from '@antv/util';
import { EdgeConfig, GraphData, NodeConfig } from '../types';
import { getAdjMatrix } from '../util/math';

interface Cluster {
  id: string;
  nodes: NodeConfig;
  sumTot?: number;
}

interface ClusterData {
  clusters: Cluster[];
  clusterEdges: EdgeConfig[];
}

/**
 * @param callbacks
 */
const labelPropagation = (
  data: GraphData,
  directed: boolean = false,
  weightPropertyName: string = 'weight',
  maxIteration: number = 1000
): ClusterData => {
  // the origin data
  const { nodes, edges } = data;

  const clusters = {};
  const nodeMap = {};
  // init the clusters and nodeMap
  nodes.forEach((node, i) => {
    const cid: string = uniqueId();
    node.clusterId = cid;
    clusters[cid] = {
      id: cid,
      nodes: [node]
    };
    nodeMap[node.id] = {
      node,
      idx: i
    };
  });

  // the adjacent matrix of calNodes inside clusters
  const adjMatrix = getAdjMatrix(data, directed);
  // the sum of each row in adjacent matrix
  const ks = [];
  /**
   * neighbor nodes (id for key and weight for value) for each node
   * neighbors = {
   *  id(node_id): { id(neighbor_1_id): weight(weight of the edge), id(neighbor_2_id): weight(weight of the edge), ... },
   *  ...
   * }
   */
  const neighbors = {};
  adjMatrix.forEach((row, i) => {
    let k = 0;
    const iid = nodes[i].id;
    neighbors[iid] = {};
    row.forEach((entry, j) => {
      if (!entry) return;
      k += entry;
      const jid = nodes[j].id;
      neighbors[iid][jid] = entry;
    });
    ks.push(k);
  });

  let iter = 0;

  while (true && iter < maxIteration) {
    let changed = false;
    nodes.forEach(node => {
      const neighborClusters = {};
      Object.keys(neighbors[node.id]).forEach(neighborId => {
        const neighborWeight = neighbors[node.id][neighborId];
        const neighborNode = nodeMap[neighborId].node;
        const neighborClusterId = neighborNode.clusterId;
        if (!neighborClusters[neighborClusterId]) neighborClusters[neighborClusterId] = 0;
        neighborClusters[neighborClusterId] += neighborWeight;
      });
      // find the cluster with max weight
      let maxWeight = -Infinity;
      let bestClusterIds = [];
      Object.keys(neighborClusters).forEach(clusterId => {
        if (maxWeight < neighborClusters[clusterId]) {
          maxWeight = neighborClusters[clusterId];
          bestClusterIds = [clusterId];
        } else if (maxWeight === neighborClusters[clusterId]) {
          bestClusterIds.push(clusterId);
        }
      });
      if (bestClusterIds.length === 1 && bestClusterIds[0] === node.clusterId) return;
      const selfClusterIdx = bestClusterIds.indexOf(node.clusterId);
      if (selfClusterIdx >= 0) bestClusterIds.splice(selfClusterIdx, 1);
      if (bestClusterIds && bestClusterIds.length) {
        changed = true;

        // remove from origin cluster
        const selfCluster = clusters[node.clusterId as string];
        const nodeInSelfClusterIdx = selfCluster.nodes.indexOf(node);
        selfCluster.nodes.splice(nodeInSelfClusterIdx, 1);

        // move the node to the best cluster
        const randomIdx = Math.floor(Math.random() * bestClusterIds.length);
        const bestCluster = clusters[bestClusterIds[randomIdx]];
        bestCluster.nodes.push(node);
        node.clusterId = bestCluster.id;
      }
    });
    if (!changed) break;
    iter++;
  }

  // delete the empty clusters
  Object.keys(clusters).forEach(clusterId => {
    const cluster = clusters[clusterId];
    if (!cluster.nodes || !cluster.nodes.length) {
      delete clusters[clusterId];
    }
  });

  // get the cluster edges
  const clusterEdges = [];
  const clusterEdgeMap = {};
  edges.forEach(edge => {
    const { source, target } = edge;
    const weight = edge[weightPropertyName] || 1;
    const sourceClusterId = nodeMap[source].node.clusterId;
    const targetClusterId = nodeMap[target].node.clusterId;
    const newEdgeId = `${sourceClusterId}---${targetClusterId}`;
    if (clusterEdgeMap[newEdgeId]) {
      clusterEdgeMap[newEdgeId].weight += weight;
      clusterEdgeMap[newEdgeId].count++;
    } else {
      const newEdge = {
        source: sourceClusterId,
        target: targetClusterId,
        weight,
        count: 1
      };
      clusterEdgeMap[newEdgeId] = newEdge;
      clusterEdges.push(newEdge);
    }
  });

  const clustersArray = [];
  Object.keys(clusters).forEach(clusterId => {
    clustersArray.push(clusters[clusterId]);
  });
  return {
    clusters: clustersArray,
    clusterEdges
  }
}

export default labelPropagation;
