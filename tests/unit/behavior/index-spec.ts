import Behavior from '../../../src/behavior'
import { IBehavior } from '../../../src/interface/behavior';

describe('Behavior', () => {
  it('register signle behavior', () => {
    Behavior.registerBehavior('first-behavior', {
      getEvents() {
        return {
          click: 'onClick'
        }
      },
      onClick() {
        console.log('trigger click')
      },
      shouldBegin() {
        return false
      }
    });

    expect(Behavior.hasBehavior('first-behavior')).toBe(true)
    expect(Behavior.hasBehavior('test')).toBe(false)
    const BehaviorInstance = Behavior.getBehavior('first-behavior')
    const events = BehaviorInstance.getEvents()
    expect(Object.keys(events)).toEqual(['click'])
    expect(BehaviorInstance.shouldBegin()).toEqual(false);
  })

  it('register multiple behavior', () => {
    Behavior.registerBehavior('first', {
      getEvents() {
        return {
          click: 'onClick',
          "edge:click": 'onEdgeClick',
          contextmenu: 'onContextMenu'
        }
      },
      onClick() {
        return 'onclick'
      },
      onContextMenu() {
        return 'onContextMenu'
      }
    });

    Behavior.registerBehavior('second', {
      getDefaultCfg() {
        return {
          style: {
            fill: 'red'
          }
        }
      },
      getEvents() {
        return {
          drag: 'onDrag'
        }
      },
      onDrag() {
        return 'drag'
      }
    })

    const firstBehavior = Behavior.getBehavior('first')
    const secondBehavior = Behavior.getBehavior('second')
    expect(firstBehavior).not.toBe(undefined);
    expect(secondBehavior).not.toBe(undefined);
    expect(Behavior.getBehavior('three')).toBe(undefined);
    expect(Behavior.hasBehavior('first')).toBe(true);
    expect(Behavior.hasBehavior('three')).toBe(false);

    const config1 = firstBehavior.getDefaultCfg();
    expect(config1.style).toBe(undefined);

    const events1 = firstBehavior.getEvents()
    console.log(events1, Object.keys(events1))
    expect(Object.keys(events1).length).toEqual(3);
    expect(Object.keys(events1)).toEqual(['click', 'edge:click', 'contextmenu'])

    const config = secondBehavior.getDefaultCfg();
    expect(config.style.fill).toEqual('red');
    expect(config.style.fill).not.toEqual('blue');

    const drag = secondBehavior.onDrag()
    expect(drag).toEqual('drag')
  })
})