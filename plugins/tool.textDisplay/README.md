## textDisplay

Hide the labels when the width of the text is 2 times bigger than the parent node.


## use

simple use.

```js
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200,
    width: 100
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

const textDisplay = new G6.Plugins['tool.textDisplay']();
      const edgeSizeMapper = new Mapper('edge', 'userview', 'size', [2, 20], {
        legendCfg: null
      });
graph = new G6.Graph({
  id: 'mountNode', // dom id
  plugins: [textDisplay],
  height: 1000,
});
graph.read(data);
```