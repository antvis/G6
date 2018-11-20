const Graph = require('../../../src/graph');
const data = require('../../fixtures/sample-graph-data.json');
const expect = require('chai').expect;
const Util = require('../../../src/util/');
const Simulate = require('event-simulate');
const div = document.createElement('div');
div.setAttribute('data-test-spec', 'cases/force-fit-spec.js');
div.style.width = '200px';
div.style.height = '200px';
document.body.appendChild(div);

describe('force fit user cases test', () => {
  it('force fit width && height', done => {
    const graph = new Graph({
      container: div
    });
    const el = graph.get('_canvas').get('el');
    graph.source(Util.clone(data));
    graph.render();
    expect(el.style.width).equal('200px');
    expect(el.style.height).equal('200px');
    setTimeout(() => {
      Simulate.simulate(window, 'resize');
      graph.destroy();
      done();
    }, 200);
  });
  it('force fit width', () => {
    const graph = new Graph({
      container: div,
      height: 500
    });
    const el = graph.get('_canvas').get('el');
    graph.source(Util.clone(data));
    graph.render();
    expect(el.style.width).equal('200px');
    expect(el.style.height).equal('500px');
    graph.destroy();
  });
  it('force fit height', () => {
    const graph = new Graph({
      container: div,
      width: 500
    });
    const el = graph.get('_canvas').get('el');
    graph.source(Util.clone(data));
    graph.render();
    expect(el.style.width).equal('500px');
    expect(el.style.height).equal('200px');
    graph.destroy();
  });
});

