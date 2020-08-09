/**
 * sparse, high
 */

let nodes = [];
for (let i = 0; i < 50; i++) {
  nodes.push({
    id: 'node'+i.toString(),
    label: i.toString(),
  })
}

let edges = [];
let edgeIdx = 0;
for (let i = 0; i < 50; i++) {
  if (i === 0) {
    for (let j = 10; j < 18; j++) {
      edges.push({
        id: 'edge'+edgeIdx.toString(),
        source: 'node'+i.toString(),
        target: 'node'+j.toString(),
      });
      edgeIdx += 1;
    }
  } else if(i > 3 && i < 25) {
    edges.push({
      id: 'edge'+edgeIdx.toString(),
        source: 'node'+i.toString(),
        target: 'node'+(i + 15).toString(),
    });
    edgeIdx += 1;
  } else {
    edges.push({
      id: 'edge'+edgeIdx.toString(),
      source: 'node'+i.toString(),
      target: 'node'+((i+1)%50).toString(),
    });
    edgeIdx += 1;
    edges.push({
      id: 'edge'+edgeIdx.toString(),
      source: 'node'+i.toString(),
      target: 'node'+((i+2)%50).toString(),
    });
    edgeIdx += 1;
  }
}

export default {
    nodes: nodes,
    edges: edges,
};