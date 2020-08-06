/**
 * sparse, high
 */

let nodes = [];
for (let i = 0; i < 50; i++) {
  nodes.push({
    id: i.toString(),
    label: i.toString(),
  })
}

let edges = [];
for (let i = 0; i < 50; i++) {
  if (i === 0) {
    for (let j = 10; j < 18; j++) {
      edges.push({
        source: i.toString(),
        target: j.toString(),
      })
    }
  } else if(i > 3 && i < 25) {
    edges.push({
        source: i.toString(),
        target: (i + 15).toString(),
    })
  } else {
    edges.push({
      source: i.toString(),
      target: ((i+1)%50).toString(),
    });
    edges.push({
      source: i.toString(),
      target: ((i+2)%50).toString(),
    })
  }
}

export default {
    nodes: nodes,
    edges: edges,
};