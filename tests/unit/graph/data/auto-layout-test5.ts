/**
 * normal, low
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
    for (let j = 1; j < 10; j++) {
      edges.push({
        source: i.toString(),
        target: j.toString(),
      })
    }
  } else {
    edges.push({
      source: i.toString(),
      target: ((i+1)%10).toString(),
    });
    edges.push({
      source: i.toString(),
      target: ((i+2)%10).toString(),
    })
  }
}

export default {
    nodes: nodes,
    edges: edges,
};