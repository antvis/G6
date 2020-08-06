/**
 * grid, low
 */

var nodes = [];
for (var i = 0; i < 10; i++) {
  nodes.push({
    id: i.toString(),
    label: i.toString(),
  })
}

var edges = [];
for (var i = 0; i < 10; i++) {
  if (i === 0) {
    for (var j = 1; j < 3; j++) {
      edges.push({
        source: i.toString(),
        target: j.toString(),
      })
    }
  } else {
    edges.push({
      source: i.toString(),
      target: ((i+1)%10).toString(),
    })
  }
}

export default {
    nodes: nodes,
    edges: edges,
};