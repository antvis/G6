const G6 = require('../../../src/index');
// const chai = require('chai');
// const expect = chai.expect;
const Graph2canvas = require('../../../src/helper/graph2canvas');
const div = document.createElement('div');
document.body.appendChild(div);

describe('helper graph2canvas test', () => {
  it('graph2canvas', () => {
    const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200,
        html: '<div>ssss</div>',
        shape: 'html'
      }, {
        id: 'node2',
        x: 300,
        y: 200,
        shape: 'customNode'
      }, {
        id: 'node3',
        x: 300,
        y: 300,
        shape: 'common'
      }],
      edges: [{
        target: 'node2',
        source: 'node1'
      }]
    };
    G6.registerNode('customNode', {
      draw(item) {
        const group = item.getGraphicGroup();
        const html = G6.Util.createDOM('<div>这里是 HTML 节点</div>');
        return group.addShape('dom', {
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            html
          }
        });
      }
    });
    const graph = new G6.Graph({
      container: div,  // 容器ID
      renderer: 'svg',
      height: window.innerHeight
    });
    graph.read(data);
    setTimeout(() => {
      const graph2canvas = new Graph2canvas({
        graph,
        width: 400,
        height: 500
      });
      graph2canvas.toCanvas();
      graph.destroy();
    }, 300);
  });
});
