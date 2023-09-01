import { uniqueId } from '@antv/util';
/**
 * mock graph data
 * @param nodeCount node count
 * @returns
 */
export const mock = (nodeCount: number) => {
  const nodeIds = [];
  const nodes = Array.from({ length: nodeCount }).map((node, index) => {
    const id = `node-${index}`;
    nodeIds.push(id);
    return {
      id,
      data: {},
    };
  });

  const fullEdges = [];
  for (let i = 0; i < nodeCount; i = i + 1) {
    for (let j = 0; j < nodeCount - 1; j = j + 1) {
      fullEdges.push({
        source: `node-${i}`,
        target: `node-${j}`,
        id: uniqueId('edge_id_'),
        data: {},
      });
    }
  }

  return {
    /**
     * circle graph
     * @param centerId center id
     * @returns
     */
    circle: (centerId = '') => {
      let id = centerId;
      if (nodeIds.indexOf(id) === -1) {
        id = 'node-0';
      }
      const edges = fullEdges.filter((edge) => {
        return edge.source === id || edge.target === id;
      });
      return {
        nodes,
        edges,
      };
    },
    /**
     * random graph
     * @param ratio random sparsity, default 0.5
     */
    random: (ratio = 0.5) => {
      const length: number = parseInt(String(nodeCount * ratio));

      const randomArray: string[] = nodeIds
        .sort(() => Math.random() - 0.5)
        .slice(0, length);

      const edges = fullEdges
        .filter((edge) => {
          return randomArray.indexOf(edge.target) !== -1;
        })
        .sort(() => Math.random() - 0.5)
        .slice(0, length);
      return {
        nodes,
        edges,
      };
    },
  };
};
