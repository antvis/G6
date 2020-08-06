/**
 * sparse, low
 */

var nodes = [];
for (var i = 0; i < 50; i++) {
  nodes.push({
    id: i.toString(),
    label: i.toString(),
  })
}

var edges = [];
for (var i = 0; i < 50; i++) {
  if (i === 0) {
    for (var j = 10; j < 18; j++) {
      edges.push({
        source: i.toString(),
        target: j.toString(),
      })
    }
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