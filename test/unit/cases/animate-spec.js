const Graph = require('../../../src/graph');
const Tree = require('../../../src/tree');
const data = require('../../fixtures/sample-graph-data.json');
// const expect = require('chai').expect;
const Util = require('../../../src/util/');
const div = document.createElement('div');
div.setAttribute('data-test-spec', 'cases/animate-spec.js');
document.body.appendChild(div);
const delay = 500;
describe('test graph aniamte', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    animate: true
  });
  graph.node({
    label(model) {
      return model.id;
    }
  });
  it('read', done => {
    graph.read(Util.clone(data));
    setTimeout(() => {
      done();
    }, delay);
  });
  it('add node', done => {
    graph.add('node', {
      id: 'node7',
      size: 50,
      x: 300,
      y: 400
    });
    setTimeout(() => {
      done();
    }, delay);
  });
  it('add edge', done => {
    graph.add('edge', {
      source: 'node7',
      target: 'node3'
    });
    setTimeout(() => {
      done();
    }, delay);
  });
  it('update node', done => {
    graph.update('node2', {
      size: 100
    });
    setTimeout(() => {
      done();
    }, delay);
  });
  it('remove', done => {
    graph.remove('node7');
    setTimeout(() => {
      done();
      graph.destroy();
    }, delay);
  });
});

describe('test tree animate', () => {
  const data = {
    roots: [{
      label: 'root',
      children: [{
        label: 'child1',
        children: [
          {
            label: 'child\n1.1'
          }
        ]
      }, {
        label: 'child2'
      }]
    }]
  };
  const tree = new Tree({
    container: div,
    width: 500,
    height: 500,
    animate: true,
    fitView: 'cc'
  });
  it('test read', done => {
    tree.read(data);
    setTimeout(() => {
      tree.destroy();
      done();
    }, delay);
  });
});
