## highlightSubgraph

Highlight a subgraph and weaken the rest of the graph.

interface:
- highlightSubgraph(hl_items)
  hightlight a subgraph
  params:
  - hl_items: the items which will be highlighted

- restoreGraph()
  restore the graph to the un-lighlighted style.

## use

simple use.

```js
const Highlighter = G6.Plugins['tool.highlightSubgraph'];
const highlighter = new Highlighter();
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200
  }, {
    id: 'node2',
    x: 300,
    y: 200
  }, {
    id: 'node3',
    x: 100,
    y: 100
  }, {
    id: 'node4',
    x: 300,
    y: 100
  }],
  edges: [{
    target: 'node2',
    source: 'node1'
  }, {
    target: 'node3',
    source: 'node2'
  }, {
    target: 'node4',
    source: 'node3'
  }, {
    target: 'node1',
    source: 'node4'
  }, ]
};
const graph = new G6.Graph({
  id: 'mountNode', // dom id
  plugins: [highlighter],
  height: 1000,
});
graph.read(data);
const nodes = graph.getNodes();
const edges = graph.getEdges();
const re_nodes = [nodes[0], nodes[1]];
const re_edges = [edges[0]];
graph.highlightSubgraph({re_nodes, re_edges});
```