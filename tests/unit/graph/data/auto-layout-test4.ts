/**
 * normal, high
 */

let nodes = [];
for (let i = 0; i < 10; i++) {
  nodes.push({
    id: 'node'+i.toString(),
    label: i.toString(),
  })
}

let edges = [];
let edgeIdx = 0;
for (let i = 0; i < 10; i++) {
  if (i === 0) {
    for (let j = 0; j < 3; j++) {
      edges.push({
        id: 'edge'+edgeIdx.toString(),
        source: 'node'+i.toString(),
        target: 'node'+j.toString(),
      });
      edgeIdx += 1;
    }
  } else if (i > 4) {
    for (let j = i+1; j < 10; j++) {
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
      target: 'node'+((i+1)%10).toString(),
    });
    edgeIdx += 1;
  }
}

export default {
    nodes: nodes,
    edges: edges,
};