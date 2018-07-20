## Tooltip 

Tooltip helps users to get the detailed information. This plugin helps developers locate tooltip position quickly.

## use

simple use.

```js
const plugin = new G6.Plugins['tool.tooltip']();
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200
  }, {
    id: 'node2',
    x: 300,
    y: 200
  }],
  edges: [{
    target: 'node2',
    source: 'node1'
  }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500
});
graph.node({
  tooltip(model) {
    return [
      ['id', model.id],
      ['x', model.x],
      ['y', model.y]
    ];
  }
});
graph.edge({
  tooltip(model) {
    return [
      ['来源', model.source],
      ['去向', model.target]
    ];
  }
});
graph.read(data);
```

custom use

```js
const plugin = new G6.Plugins['tool.tooltip']({
  getTooltip({item}) {
    const model = item.getModel();
    return `
      <ul>
        <li>唯一标识：${model.id}</li>
      </ul>
    `;
  }
});
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200
  }, {
    id: 'node2',
    x: 300,
    y: 200
  }],
  edges: [{
    target: 'node2',
    source: 'node1'
  }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500
});
graph.read(data);
```