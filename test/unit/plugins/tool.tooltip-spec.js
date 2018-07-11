const G6 = require('../../../src/index');
const Tooltip = require('../../../plugins/tool.tooltip/');
const expect = require('chai').expect;
const Util = G6.Util;

document.body.appendChild(Util.createDOM(`
<div>
  <div id='mountNode'></div>
</div>
`));

describe('tooltip test', () => {
  const tooltip = new Tooltip({
    getHtml({ item }) {
      return `
        <div></div>
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
    height: 500,
    plugins: [ tooltip ]
  });
  graph.read(data);
});
