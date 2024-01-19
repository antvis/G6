/**
 *
 * @param url
 */
export async function loadDataset(url: string) {
  const result = await fetch(url);
  const legacyG6GraphFormat = await result.json();

  // format old G6 graph format to @antv/graphlib
  // assign random positions
  const nodes: any[] = [];
  const edges: any[] = [];
  const uniqueNodes = new Set();
  legacyG6GraphFormat.nodes.forEach((node: any, i: number) => {
    // remove duplicated nodes
    if (!uniqueNodes.has(node.id)) {
      uniqueNodes.add(node.id);

      // clear preset coordinates
      node.x = undefined;
      node.y = undefined;
      node.z = undefined;

      nodes.push({
        id: node.id,
        data: { x: node.x, y: node.y, z: node.z },
      });
    }
  });
  legacyG6GraphFormat.edges.forEach((edge: any, i: number) => {
    if (edge.id === undefined) {
      edge.id = `e${i}`;
    }
    if (edge.weight === undefined || edge.weight === null) {
      edge.weight = 1;
    } else {
      edge.weight = Number(edge.weight);
    }

    edges.push({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      data: { weight: edge.weight },
    });
  });

  return { nodes, edges };
}
