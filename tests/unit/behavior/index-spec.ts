import '../../../src/behavior';
import Behavior from '../../../src/behavior/behavior';
import { IBehavior } from '../../../src/interface/behavior';

describe('Behavior', () => {
  it('register single behavior', () => {
    Behavior.registerBehavior('first-behavior', {
      getEvents() {
        return {
          click: 'onClick',
        };
      },
      onClick() {
        // console.log('trigger click');
      },
      shouldBegin() {
        return false;
      },
    });

    expect(Behavior.hasBehavior('first-behavior')).toBe(true);
    expect(Behavior.hasBehavior('test')).toBe(false);
    const BehaviorInstance = Behavior.getBehavior('first-behavior');

    const instance = new BehaviorInstance();
    const events = instance.getEvents();
    expect(Object.keys(events)).toEqual(['click']);
    expect(instance.shouldBegin()).toEqual(false);
  });

  it('register multiple behavior', () => {
    Behavior.registerBehavior('first', {
      getEvents() {
        return {
          click: 'onClick',
          'edge:click': 'onEdgeClick',
          contextmenu: 'onContextMenu',
        };
      },
      onClick() {
        return 'onclick';
      },
      onContextMenu() {
        return 'onContextMenu';
      },
    });

    Behavior.registerBehavior('second', {
      getDefaultCfg() {
        return {
          style: {
            fill: 'red',
          },
        };
      },
      getEvents() {
        return {
          drag: 'onDrag',
        };
      },
      onDrag() {
        return 'drag';
      },
    });

    const FirstInstance = Behavior.getBehavior('first');
    const SecondBehavior = Behavior.getBehavior('second');
    const firstInstance = new FirstInstance();
    const secondBehavior = new SecondBehavior();
    expect(firstInstance).not.toBe(undefined);
    expect(secondBehavior).not.toBe(undefined);
    expect(Behavior.getBehavior('three')).toBe(undefined);
    expect(Behavior.hasBehavior('first')).toBe(true);
    expect(Behavior.hasBehavior('three')).toBe(false);

    const config1 = firstInstance.getDefaultCfg();
    expect(config1.style).toBe(undefined);

    const events1 = firstInstance.getEvents();
    expect(Object.keys(events1).length).toEqual(3);
    expect(Object.keys(events1)).toEqual(['click', 'edge:click', 'contextmenu']);

    const config = secondBehavior.getDefaultCfg();
    expect(config.style.fill).toEqual('red');
    expect(config.style.fill).not.toEqual('blue');
    const drag = secondBehavior.onDrag();
    expect(drag).toEqual('drag');
  });
  it('register behavior without object', () => {
    expect(() => {
      Behavior.registerBehavior('first', undefined);
    }).toThrow();
  });
});
describe('Default Behavior', () => {
  it('drag-canvas', () => {
    const DragCanvas = Behavior.getBehavior('drag-canvas');
    expect(DragCanvas).not.toBe(undefined);

    const dragCanvas: IBehavior = new DragCanvas();
    const config = dragCanvas.getDefaultCfg();
    expect(config).toEqual({ direction: 'both', enableOptimize: false });

    const events = dragCanvas.getEvents();
    const keys = Object.keys(events);
    expect(keys.length).toBe(9);
  });
});
