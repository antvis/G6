const Graph = require('../../../src/graph');
const Util = require('../../../src/util/');
const data = require('../../fixtures/sample-graph-data.json');
const expect = require('chai').expect;
const div = document.createElement('div');
div.setAttribute('data-test-spec', 'cases/layout-spec.js');
const LayoutObj = function() {
  this.execute = function() {
    this.nodes.forEach((node, index) => {
      node.x = (index + 1) * 80;
    });
  };
};
const layoutObj = new LayoutObj();
document.body.appendChild(div);
const graph = new Graph({
  container: div,
  width: 500,
  height: 500,
  layout: layoutObj
});
graph.node().label(333);
graph.read(Util.clone(data));
const nodes = graph.getNodes();
Util.each(nodes, (node, index) => {
  expect(node.getModel().x).equal((index + 1) * 80);
});
graph.destroy();
describe('layout user cases test', () => {
  it('graph cfg layout is object', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      layout: layoutObj
    });
    graph.node().label(333);
    graph.read(Util.clone(data));
    const nodes = graph.getNodes();
    Util.each(nodes, (node, index) => {
      expect(node.getModel().x).equal((index + 1) * 80);
    });
    graph.destroy();
  });
  it('graph cfg layout is a function', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      layout: nodes => {
        nodes.forEach((node, index) => {
          node.x = (index + 1) * 80;
        });
      }
    });
    graph.read(Util.clone(data));
    const nodes = graph.getNodes();
    Util.each(nodes, (node, index) => {
      expect(node.getModel().x).equal((index + 1) * 80);
    });
    graph.destroy();
  });
  it('graph cfg layout is cfg', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      filters: [
        item => {
          return item.id !== 'node1';
        },
        item => {
          return item.id !== 'node2->node1';
        }
      ],
      layout: {
        processer: (nodes, edges) => {
          expect(nodes.length).equal(4);
          expect(edges.length).equal(2);
          nodes.forEach((node, index) => {
            node.x = (index + 1) * 80;
            node.layoutIndex = index;
          });
        }
      }
    });
    graph.read(Util.clone(data));
    const nodes = graph.getNodes();
    Util.each(nodes, node => {
      const model = node.getModel();
      const layoutIndex = model.layoutIndex;
      if (layoutIndex) {
        expect(model.x).equal((model.layoutIndex + 1) * 80);
      }
    });
    graph.destroy();
  });
  it('layout afteritemchange', done => {
    let i = 0;
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      layout: () => {
        i++;
      }
    });
    graph.node().label(333);
    graph.read(Util.clone(data));
    graph.add('node', {
      id: 'node10',
      y: 30
    });
    setTimeout(() => {
      expect(i).equal(2);
      graph.destroy();
      done();
    }, 32);
  });
  it('graph.layout', () => {
    let i = 0;
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        auto: false,
        processer: () => {
          i++;
        }
      }
    });
    graph.source(Util.clone(data));
    graph.render();
    graph.layout();
    graph.destroy();
    expect(i).equal(1);
  });
});

