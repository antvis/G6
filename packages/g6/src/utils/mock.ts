import { EdgeData } from '../spec';

/**
 * mock graph data
 * @param nodeCount node count
 * @returns data
 */
export const mock = (nodeCount: number) => {
  const nodeIds: string[] = [];
  const nodes = Array.from({ length: nodeCount }).map((node, index) => {
    const id = `node-${index}`;
    nodeIds.push(id);
    return {
      id,
      data: {},
    };
  });

  const fullEdges: EdgeData[] = [];
  for (let i = 0; i < nodeCount; i = i + 1) {
    for (let j = 0; j < nodeCount - 1; j = j + 1) {
      fullEdges.push({
        source: `node-${i}`,
        target: `node-${j}`,
        id: `edge_id_{$i}_${j}`,
        data: {},
      });
    }
  }

  return {
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
    random: (ratio = 0.5) => {
      const length: number = parseInt(String(nodeCount * ratio));

      const randomArray: string[] = nodeIds.sort(() => Math.random() - 0.5).slice(0, length);

      const edges = fullEdges
        .filter((edge) => {
          return randomArray.indexOf(`${edge.target}`) !== -1;
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
