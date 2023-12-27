import G6 from '../../src/index';
import { Behavior } from '../../src/types/behavior';
import { extend } from '../../src/util/extend';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);

describe('behavior', () => {
  it('behavior in spec, add / remove / update a behavior in defualt mode', () => {
    const graph = new G6.Graph({
      container,
      data: { nodes: [], edges: [] },
      modes: {
        default: [
          'drag-canvas',
          {
            key: 'dragcanvaskey2',
            type: 'drag-canvas',
            assistKey: 'shift',
          },
        ],
      },
    });
    let graphSpec = graph.getSpecification();
    expect(graphSpec.modes.default[0]).toBe('drag-canvas');
    // @ts-ignore
    expect(graphSpec.modes.default[1].key).toBe('dragcanvaskey2');
    // @ts-ignore
    expect(graphSpec.modes.default[1].type).toBe('drag-canvas');
    // @ts-ignore
    expect(graphSpec.modes.default[1].assistKey).toBe('shift');

    graph.addBehaviors(
      [
        {
          key: 'dragcanvaskey3',
          type: 'drag-canvas',
          assistKey: 'ctrl',
        },
      ],
      'default',
    );
    // graph.getSpecification() returns a copy, need to be called again to fetch the lastest
    graphSpec = graph.getSpecification();
    expect(graphSpec.modes.default.length).toBe(3);
    // @ts-ignore
    expect(graphSpec.modes.default[2].key).toBe('dragcanvaskey3');
    // @ts-ignore
    expect(graphSpec.modes.default[2].type).toBe('drag-canvas');
    // @ts-ignore
    expect(graphSpec.modes.default[2].assistKey).toBe('ctrl');

    graph.removeBehaviors(['dragcanvaskey3', 'dragcanvaskey2'], 'default');
    graphSpec = graph.getSpecification();
    expect(graphSpec.modes.default.length).toBe(1);

    // update failed since there is no key match
    graph.updateBehavior(
      {
        key: 'no-exist',
        type: 'drag-canvas',
        assistKey: 'ctrl',
      },
      'default',
    );
    graphSpec = graph.getSpecification();
    expect(graphSpec.modes.default.length).toBe(1);

    // add and then update
    graph.addBehaviors(
      [
        {
          key: 'newbehavior',
          type: 'drag-canvas',
          assistKey: 'ctrl',
        },
      ],
      'default',
    );
    graphSpec = graph.getSpecification();
    expect(graphSpec.modes.default.length).toBe(2);
    // @ts-ignore
    expect(graphSpec.modes.default[1].assistKey).toBe('ctrl');
    graph.updateBehavior(
      {
        key: 'newbehavior',
        type: 'drag-canvas',
        assistKey: 'shift',
      },
      'default',
    );
    graphSpec = graph.getSpecification();
    expect(graphSpec.modes.default.length).toBe(2);
    // @ts-ignore
    expect(graphSpec.modes.default[1].assistKey).toBe('shift');
  });
  it('register behavior and extend G6', () => {
    class CustomBehavior extends Behavior {
      constructor(options: { key: string; config: boolean; itemType?: 'node' | 'edge' | 'combo' }) {
        super(options);
      }
      public getSpec: undefined; // select getEvents way to implement
      public getEvents() {
        return {};
      }
      public destroy() {}
    }
    const CustomGraph = extend(G6.Graph, {
      behaviors: {
        'custom-behavior': CustomBehavior,
      },
    });
    const graph = new CustomGraph({
      container,
      data: { nodes: [], edges: [] },
      modes: {
        default: [
          {
            type: 'drag-canvas',
            key: 'b1',
          },
          {
            type: 'custom-behavior',
            config: true,
            key: 'b2',
          },
        ],
        mode2: [
          {
            type: 'custom-behavior',
            config: true,
            key: 'b3',
          },
        ],
      },
    });
    const spec = graph.getSpecification();
    expect(spec.modes.default.length).toBe(2);
    expect(spec.modes.mode2.length).toBe(1);
  });
});
