## mapper

Associate the input range with the @antv/scale, @antv/attr and @antv/g2/src/component/legend
constructor parameters:
- itemType: 'node'/'edge. The type of the item being mapped.
- dim: the dimension of the edge. e.g. 'class'
- range: the range the of mapping result. e.g. [ 0, 1 ], ['#BAE7FF', '#1890FF', '#0050B3']
- channel: the visual channel. e.g.'size', 'color'
- othercfg:
  - scaleCfg: the configuration of the scale
  - legendCfg: the configuration of the legend
    null: no lengend.
    scale: scaling the size of the legend.

## use

simple use.

```js
const Mapper = G6.Plugins['tool.mapper']
const nodeColorMapper = new Mapper('node', 'class', 'color', ['#BAE7FF', '#0050B3'], {
  legendCfg: {
    scale: 0.5
  }
});
const edgeSizeMapper = new Mapper('edge', 'weight', 'size', [2, 20], {
  legendCfg: null
});
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200,
    class: 'class_1'
  }, {
    id: 'node2',
    x: 300,
    y: 200,
    class: 'class_1'
  }, {
    id: 'node3',
    x: 100,
    y: 100,
    class: 'class_2'
  }, {
    id: 'node4',
    x: 300,
    y: 100,
    class: 'class_2'
  }],
  edges: [{
    target: 'node2',
    source: 'node1',
    weight: 5
  }, {
    target: 'node3',
    source: 'node2',
    weight: 20
  }, {
    target: 'node4',
    source: 'node3',
    weight: 50
  }]
};
const graph = new G6.Graph({
  id: 'mountNode', // dom id
  plugins: [nodeColorMapper, edgeSizeMapper],
  height: 1000,
});
graph.read(data);
```