/**
 * connected, low
 */

let nodes = [];
for (let i = 0; i < 36; i++) {
  nodes.push({
    id: i.toString(),
    label: i.toString(),
  })
}

let edges = [];
for (let i = 0; i < 36; i++) {
  if (i === 0) {
    for (let j = 1; j < 36; j++) {
      edges.push({
        source: i.toString(),
        target: j.toString(),
      })
    }
  } else {
    edges.push({
      source: i.toString(),
      target: ((i+1)%36).toString(),
    })
  }
}

export default {
    nodes: nodes,
    edges: edges,
};