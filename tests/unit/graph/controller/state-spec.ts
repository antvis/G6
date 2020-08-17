import G6 from '../../../../src';
import { timerOut } from '../../util/timeOut';

const div = document.createElement('div');
div.id = 'state-controller';
document.body.appendChild(div);

describe('graph state controller', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    nodeStateStyles: {
      selected: {},
    },
  });
  const data = {
    nodes: [
      { id: 'node1', x: 100, y: 100, label: 'node1' },
      { id: 'node2', x: 120, y: 80 },
      { id: 'node3', x: 150, y: 150 },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node1', target: 'node3' },
    ],
  };
  graph.read(data);

  it('set item state', () => {
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
    timerOut(() => {
      expect(graphCount).toBe(1);
    }, 16);
  });

  it('state with activate-relations', () => {
    graph.off();

    graph.addBehaviors('activate-relations', 'default');

    const modes = graph.get('modes');
    expect(Object.keys(modes)).toEqual(['default']);
    expect(modes.default).toEqual(['activate-relations']);

    graph.removeBehaviors('activate-relations', 'default');

    expect(Object.keys(modes)).toEqual(['default']);
    expect(modes.default).toEqual([]);
  });

  it('updateGraphStates', () => {
    const node1 = graph.findById('node1');
    graph.setItemState(node1, 'selected', true);
    graph.setItemState(node1, 'hover', true);
    graph.setItemState('node2', 'hover', true);
    graph.on('node:mouseenter', () => {
      const states = graph.get('states');
      expect(states).not.toBe(undefined);
      expect(states.selected.length).toBe(1);
      expect(states.hover.length).toBe(2);
    });

    timerOut(() => {
      graph.emit('node:mouseenter', { item: node1 });
    }, 20);
  });
});
