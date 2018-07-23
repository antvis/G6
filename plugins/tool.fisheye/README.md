## Fisheye

Fisheye is a  magnifying lens for graph exploration. We inplement 'Graphical Fisheye Views' with polar coordinate system: ftp://ftp.cs.brown.edu/pub/techreports/93/cs93-40.pdf
params:
- radius: the radius of the fisheye lens. Default: 200.
- d: the magnification factor of the fisheye lens. Default: 1.

## use

simple use.

```js
const plugin = new G6.Plugins['tool.fisheye']();
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
  height: 500,
  plugins: [plugin]
});
graph.read(data);
```