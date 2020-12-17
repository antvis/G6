import Graph from '../../implement-graph';

const div = document.createElement('div');
div.id = 'state-controller';
document.body.appendChild(div);

describe('graph state controller', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    nodeStateStyles: {
      selected: {
        fill: '#f00',
      },
      hover: {
        stroke: '#000',
        lineWidth: 3,
      },
    },
  });
  const data = {
    nodes: [
      { id: 'node1', x: 100, y: 100, label: 'node1' },
      { id: 'node2', x: 120, y: 80, label: 'node2' },
      { id: 'node3', x: 150, y: 150, label: 'node3' },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node1', target: 'node3' },
    ],
  };
  graph.read(data);

  it('set item state', (done) => {
    let graphCount = 0;
    let itemCount = 0;

    graph.on('graphstatechange', () => {
      graphCount += 1;
    });

    graph.on('beforeitemstatechange', () => {
      itemCount += 1;
    });

    graph.setItemState('node1', 'selected', true);
    graph.setItemState('node2', 'selected', true);
    expect(itemCount).toBe(2);
    setTimeout(() => {
      expect(graphCount).toBe(1);
      done();
    }, 100);
  });

  it('state with activate-relations', (done) => {
    graph.off();

    graph.addBehaviors('activate-relations', 'default');

    const modes = graph.get('modes');
    expect(Object.keys(modes)).toEqual(['default']);
    expect(modes.default).toEqual(['activate-relations']);

    graph.removeBehaviors('activate-relations', 'default');

    expect(Object.keys(modes)).toEqual(['default']);
    expect(modes.default).toEqual([]);
    done();
  });

  it('updateGraphStates', (done) => {
    graph.getNodes().forEach((node) => {
      graph.clearItemStates(node);
    });
    const node1 = graph.findById('node1');
    graph.setItemState(node1, 'selected', true);
    graph.setItemState(node1, 'hover', true);
    graph.setItemState('node2', 'hover', true);

    setTimeout(() => {
      const states2 = graph.get('states');
      expect(states2.selected.length).toBe(1);
      expect(states2.hover.length).toBe(2);
      done();
    }, 100);
  });
});
