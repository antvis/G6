import G6 from '../../src/index';
const container = document.createElement('div');
document.querySelector('body')?.appendChild(container);

describe('behavior', () => {
  it('behavior in spec, add / remove / update a behavior in defualt mode', () => {
    const graph = new G6.Graph({
      container,
      data: { nodes: [], edges: [] },
      modes: {
        default: ['drag-canvas', 'click-select', 'drag-canvas', 'zoom-canvas'],
      },
    });
    let graphSpec = graph.getSpecification();
    // @ts-expect-error
    expect(graphSpec.modes.default[0]).toBe('drag-canvas');
    // @ts-ignore
    expect(graphSpec.modes.default[1]).toBe('click-select');
    // @ts-ignore
    expect(graphSpec.modes.default[2]).toBe('drag-canvas');
    // @ts-ignore
    expect(graphSpec.modes.default[3]).toBe('zoom-canvas');

    graph.addBehaviors(['drag-node'], 'default');
    // graph.getSpecification() returns a copy, need to be called again to fetch the lastest
    graphSpec = graph.getSpecification();
    // @ts-ignore
    expect(graphSpec.modes.default.length).toBe(5);

    graph.removeBehaviors(['drag-canvas', 'zoom-canvas'], 'default');
    graphSpec = graph.getSpecification();
    // @ts-ignore
    expect(graphSpec.modes.default.length).toBe(3);
  });
});
