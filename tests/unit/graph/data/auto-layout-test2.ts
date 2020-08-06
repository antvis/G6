/**
 * dense, high
 */

var nodes = [];
for (var i = 0; i < 36; i++) {
  nodes.push({
    id: i.toString(),
    label: i.toString(),
  })
}

var edges = [];
for (var i = 0; i < 36; i++) {
  if (i === 0) {
    for (var j = 1; j < 26; j++) {
      edges.push({
        source: i.toString(),
        target: j.toString(),
      })
    }
  } else if (i > 20) {
    for (var j = 1; j > 14 && j < 34; j++) {
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