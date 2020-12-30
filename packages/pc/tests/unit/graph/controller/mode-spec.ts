import G6 from '../../../../src';

const div = document.createElement('div');
div.id = 'event-spec';
document.body.appendChild(div);

describe('Update Behavior', () => {
  const cfg = {
    container: div,
    width: 200,
    height: 100,
    modes: {
      default: ['drag-canvas'],
      edit: ['drag-canvas', 'drag-node'],
      empty: []
    },
  };
  const graph = new G6.Graph(cfg);
  graph.data({
    nodes: [{ id: 'a' }]
  });
  graph.render();
  it('update exist behavior in default mode', () => {
    const behaviors = graph.get('modeController').currentBehaves;
    expect(behaviors[0].direction).toBe('both')
    graph.updateBehavior('drag-canvas', { direction: 'x' });
    expect(behaviors[0].direction).toBe('x')
  });
  it('update behavior in other mode', () => {
    let behaviors = graph.get('modeController').modes['edit'];
    expect(behaviors[0].direction).toBe(undefined)
    graph.updateBehavior('drag-canvas', { direction: 'x' }, 'edit');
    expect(behaviors[0].direction).toBe('x')

    expect(behaviors[1].enableDelegate).toBe(undefined)
    graph.updateBehavior('drag-node', { enableDelegate: true }, 'edit');
    expect(behaviors[1].enableDelegate).toBe(true)

    // swich to edit mode
    graph.setMode('edit')
    behaviors = graph.get('modeController').currentBehaves;
    expect(behaviors[0].direction).toBe('x')
    expect(behaviors[1].enableDelegate).toBe(true)
    graph.setMode('default')
  });
  it('update behavior which is not exist in default mode', () => {
    graph.updateBehavior('drag-node', { enableDelegate: true }, 'default');
    // console warn
  });

  it('update behavior which is not exist in edit mode', () => {
    graph.updateBehavior('zoom-canvas', { sensitivity: 0.5 }, 'edit');
    // console warn
  });
  it('update behavior with a mode which is not on the graph', () => {
    graph.updateBehavior('zoom-canvas', { sensitivity: 0.5 }, 'invalideMode');
    // console warn
  });
  it('update behavior when the mode is empty', () => {
    graph.updateBehavior('zoom-canvas', { sensitivity: 0.5 }, 'empty');
    // console warn
  });


  it('update behavior which is added by addBehaviors', () => {
    graph.addBehaviors(['zoom-canvas'], 'default');
    let behaviors = graph.get('modeController').currentBehaves;
    expect(behaviors[1].sensitivity).toBe(2)
    graph.updateBehavior('zoom-canvas', { sensitivity: 4 });
    expect(behaviors[1].sensitivity).toBe(4)
  });

  it('update behavior which is removed by removeBehaviors', () => {
    graph.removeBehaviors(['zoom-canvas'], 'default');
    let behaviors = graph.get('modeController').currentBehaves;
    expect(behaviors.length).toBe(1)
    graph.updateBehavior('zoom-canvas', { sensitivity: 4 });
    // console warn
  });
});
