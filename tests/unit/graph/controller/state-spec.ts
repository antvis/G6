import G6 from '../../../../src'

const div = document.createElement('div');
div.id = 'state-controller';
document.body.appendChild(div);

function timerGame(callback, time = 50) {
  setTimeout(() => {
    callback();
  }, time);
}

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
    
    timerGame(() => {
      expect(itemCount).toBe(1);
      expect(graphCount).toBe(0);

      expect(graph.get('states').selected).not.toBe(undefined);
      expect(graph.get('states').selected.length).toBe(1);
      expect(graph.get('states').selected[0]).toEqual(graph.findById('node1'));

      timerGame(() => {
        graph.setItemState('node1', 'selected', false);
        graph.setItemState('node1', 'selected', true);
        graph.setItemState('node2', 'selected', true);
        graph.setItemState('node3', 'selected', true);
        expect(itemCount).toBe(1);
        expect(graphCount).toBe(0);
        expect(graph.get('states').selected.length).toBe(1);
  
        graph.setItemState('node1', 'selected', false);
        graph.setItemState('node2', 'selected', false);
        graph.setItemState('node3', 'selected', false);
  
        timerGame(() => {
          expect(graph.get('states').selected.length).toBe(0);
        }, 90)
      }, 70)
    }, 50)
  });

  it('state with activate-relations', () => {
    graph.off();

    graph.addBehaviors('activate-relations', 'default');

    const modes = graph.get('modes')
    expect(Object.keys(modes)).toEqual(['default'])
    expect(modes.default).toEqual(['activate-relations'])

    graph.removeBehaviors('activate-relations', 'default');

    expect(Object.keys(modes)).toEqual(['default'])
    expect(modes.default).toEqual([])
  });
});
