import { ModeController } from '../../../../src/graph/controller';
import Graph from '../../../../src/graph/graph';
import { GraphOptions, ModeOption } from '../../../../src/types';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('Mode Controller', () => {
  it('single mode', () => {
    const cfg: GraphOptions = {
      container: 'graph-spec',
      width: 200,
      height: 100,
      modes: {
        default: ['drag'],
      },
    };
    const graph: Graph = new Graph(cfg);
    const modeController = new ModeController(graph);
    expect(Object.keys(modeController.modes).length).toBe(1);
    expect(modeController.modes.default[0]).toEqual({ type: 'drag' });
    expect(modeController.modes.default.length).toBe(1);
    expect(modeController.mode).toBe('default');
  });

  it('setMode', () => {
    const cfg: GraphOptions = {
      container: 'graph-spec',
      width: 200,
      height: 100,
      modes: {
        default: ['drag'],
        edit: ['canvas', 'zoom'],
      },
    };
    const graph: Graph = new Graph(cfg);
    const modeController = new ModeController(graph);

    modeController.setMode('edit');
    expect(modeController.modes.edit).not.toBe(undefined);
    expect(modeController.modes.edit.length).toBe(2);
    expect(modeController.mode).toBe('edit');
  });

  it('manipulateBehaviors', () => {
    const cfg: GraphOptions = {
      container: 'graph-spec',
      width: 200,
      height: 100,
      modes: {
        default: ['drag'],
        edit: ['canvas', 'zoom'],
      },
    };
    const graph: Graph = new Graph(cfg);
    const modeController = new ModeController(graph);

    modeController.manipulateBehaviors(['delete'], 'xxx', true);
    expect(Object.keys(modeController.modes).length).toBe(3);
    expect(modeController.modes.xxx).not.toBe(undefined);

    modeController.manipulateBehaviors('drag', 'dragx', true);
    expect(modeController.modes.dragx.length).toBe(1);
    expect(modeController.modes.dragx[0]).toEqual('drag');

    modeController.manipulateBehaviors(['drag', 'zoom'], ['out', 'xxx'], true);
    expect(Object.keys(modeController.modes).length).toBe(5);
    expect(modeController.modes.drag);

    // 删除 Behavior
    modeController.manipulateBehaviors('drag', 'dragx', false);
    expect(modeController.modes.dragx.length).toBe(0);
  });

  it('add & remove behavior to several modes', () => {
    const cfg: GraphOptions = {
      container: 'graph-spec',
      width: 500,
      height: 500,
      modes: {
        default: [],
        custom1: [],
        custom2: [],
      },
    };

    const graph = new Graph(cfg);
    const modeController = new ModeController(graph);
    expect(Object.keys(modeController.modes).length).toBe(3);
    modeController.manipulateBehaviors(['aa', 'bb'], ['custom1', 'custom2'], true);
    expect(modeController.modes.custom1.length).toBe(2);
    expect(modeController.modes.custom2.length).toBe(2);

    const custom1: ModeOption = modeController.modes.custom1[0] as ModeOption;
    const custom2: ModeOption = modeController.modes.custom1[1] as ModeOption;
    expect(custom1.type).toBe('aa');
    expect(custom2.type).toBe('bb');

    modeController.manipulateBehaviors(['aa'], ['custom1', 'custom2'], false);

    const customd1: ModeOption = modeController.modes.custom1[0] as ModeOption;
    const customd2: ModeOption = modeController.modes.custom2[0] as ModeOption;

    expect(modeController.modes.custom1.length).toBe(1);
    expect(modeController.modes.custom2.length).toBe(1);
    expect(customd1.type).toBe('bb');
    expect(customd2.type).toBe('bb');
  });
});
