const Graph = require('../../../src/graph');
const data = require('../../fixtures/sample-graph-data.json');
// const expect = require('chai').expect;
const Util = require('../../../src/util/');
const div = document.createElement('div');
document.body.appendChild(div);
describe('animate user cases test', () => {
  it('test animate', done => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      animate: true
    });
    graph.source(Util.cloneDeep(data));
    graph.render();
    setTimeout(() => {
      graph.update('node4', {
        x: 270
      });
    }, 100);
    setTimeout(() => {
      graph.clear();

    }, 200);
    setTimeout(() => {
      graph.destroy();
      done();
    }, 1000);
  });
});

