const expect = require('chai').expect;
const G6 = require('../../../../src');

const div = document.createElement('div');
div.id = 'state-controller';
document.body.appendChild(div);

describe('graph state controller', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500
  });
  const data = {
    nodes: [
      { id: 'node1', x: 100, y: 100 },
      { id: 'node2', x: 120, y: 80 },
      { id: 'node3', x: 150, y: 150 }
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node1', target: 'node3' }
    ]
  };
  graph.read(data);
  it('set item state', done => {
    let graphCount = 0,
      itemCount = 0;
    graph.on('graphstatechange', () => {
      graphCount += 1;
    });
    graph.on('beforeitemstatechange', () => {
      itemCount += 1;
    });
    graph.setItemState('node1', 'selected', true);
    setTimeout(() => {
      expect(itemCount).to.equal(1);
      expect(graphCount).to.equal(1);
      expect(graph.get('states').selected).not.to.be.undefined;
      expect(graph.get('states').selected.length).to.equal(1);
      expect(graph.get('states').selected[0]).to.equal(graph.findById('node1'));
      graph.setItemState('node1', 'selected', false);
      graph.setItemState('node1', 'selected', true);
      graph.setItemState('node2', 'selected', true);
      graph.setItemState('node3', 'selected', true);
      setTimeout(() => {
        expect(itemCount).to.equal(5);
        expect(graphCount).to.equal(2);
        expect(graph.get('states').selected.length).to.equal(3);
        graph.setItemState('node1', 'selected', false);
        graph.setItemState('node2', 'selected', false);
        graph.setItemState('node3', 'selected', false);
        setTimeout(() => {
          expect(graph.get('states').selected.length).to.equal(0);
          done();
        }, 50);
      }, 50);
    }, 50);
  });
  it('state with activate-relations', done => {
    graph.removeEvent();
    graph.addBehaviors('activate-relations', 'default');
    let triggered = false;
    graph.emit('node:mouseenter', { item: graph.findById('node1') });
    setTimeout(() => {
      graph.emit('node:mouseenter', { item: graph.findById('node2') });
      triggered = true;
    }, 50);
    graph.on('graphstatechange', e => {
      if (!triggered) {
        expect(e.states.active).not.to.be.undefined;
        expect(e.states.active.length).to.equal(5);
        expect(e.states.inactive).not.to.be.undefined;
        expect(e.states.inactive.length).to.equal(0);
      } else {
        expect(e.states.active).not.to.be.undefined;
        expect(e.states.active.length).to.equal(3);
        expect(e.states.inactive).not.to.be.undefined;
        expect(e.states.inactive.length).to.equal(2);
        graph.removeBehaviors('activate-relations', 'default');
        done();
      }
    });
  });
  it('state with click-select', done => {
    graph.removeEvent();
    graph.addBehaviors('click-select', 'default');
    graph.emit('keydown', { keyCode: 17 });
    graph.emit('node:click', { item: graph.findById('node1') });
    graph.emit('node:click', { item: graph.findById('node2') });
    let finished = false;
    setTimeout(() => {
      graph.emit('node:click', { item: graph.findById('node2') });
      finished = true;
    }, 50);
    graph.on('graphstatechange', e => {
      if (!finished) {
        expect(e.states.selected).not.to.be.undefined;
        expect(e.states.selected.length).to.equal(2);
      } else {
        expect(e.states.selected).not.to.be.undefined;
        expect(e.states.selected.length).to.equal(1);
        done();
      }
    });
  });
});
