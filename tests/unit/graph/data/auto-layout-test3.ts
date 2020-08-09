/**
 * dense, low
 */

let nodes = [];
for (let i = 0; i < 36; i++) {
  nodes.push({
    id: 'node'+i.toString(),
    label: i.toString(),
  })
}

let edges = [];
let edgeIdx = 0;
for (let i = 0; i < 36; i++) {
  if (i < 5) {
    for (let j = 1; j < 24; j++) {
      edges.push({
        id: 'edge'+edgeIdx.toString(),
        source: 'node'+i.toString(),
        target: 'node'+j.toString(),
      });
      edgeIdx += 1;
    }
  } else {
    edges.push({
      id: 'edge'+edgeIdx.toString(),
      source: 'node'+i.toString(),
      target: 'node'+((i+1)%36).toString(),
    });
    edgeIdx += 1;
  }
}

export default {
    nodes: nodes,
    edges: edges,
};