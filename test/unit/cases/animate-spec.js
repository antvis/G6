const Graph = require('../../../src/graph');
const Tree = require('../../../src/tree');
const data = require('../../fixtures/sample-graph-data.json');
// const expect = require('chai').expect;
const Util = require('../../../src/util/');
const div = document.createElement('div');
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
  it('test read', done => {
    graph.read(Util.cloneDeep(data), true);
    setTimeout(() => {
      done();
    }, delay);
  });
  it('test add node', done => {
    graph.add('node', {
      id: 'node7',
      size: 50,
      x: 300,
      y: 400
    }, true);
    setTimeout(() => {
      done();
    }, delay);
  });
  it('test add edge', done => {
    graph.add('edge', {
      source: 'node7',
      target: 'node3'
    }, true);
    setTimeout(() => {
      done();
    }, delay);
  });
  it('test update', done => {
    graph.update('node2', {
      size: 100
    }, true);
    setTimeout(() => {
      done();
    }, delay);
  });
  it('test remove', done => {
    graph.remove('node7', true);
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
    tree.read(data, true);
    setTimeout(() => {
      done();
    }, delay);
  });
});
