import { CommonEvent } from '@/src';
import { Shortcut } from '@/src/utils/shortcut';
import EventEmitter from '@antv/event-emitter';

describe('shortcut', () => {
  const emitter = new EventEmitter();

  const shortcut = new Shortcut(emitter);

  afterAll(() => {
    shortcut.destroy();
    emitter.off();
  });

  it('bind and unbind', () => {
    const controlEqual = jest.fn();
    const controlMinus = jest.fn();
    shortcut.bind(['Control', '='], controlEqual);
    shortcut.bind(['Control', '-'], controlMinus);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    emitter.emit(CommonEvent.KEY_DOWN, { key: '=' });
    emitter.emit(CommonEvent.KEY_UP, { key: 'Control' });
    emitter.emit(CommonEvent.KEY_UP, { key: '=' });

    expect(controlEqual).toHaveBeenCalledTimes(1);
    expect(controlMinus).toHaveBeenCalledTimes(0);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    emitter.emit(CommonEvent.KEY_DOWN, { key: '-' });
    emitter.emit(CommonEvent.KEY_UP, { key: 'Control' });
    emitter.emit(CommonEvent.KEY_UP, { key: '-' });

    expect(controlEqual).toHaveBeenCalledTimes(1);
    expect(controlMinus).toHaveBeenCalledTimes(1);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    emitter.emit(CommonEvent.KEY_DOWN, { key: '=' });
    emitter.emit(CommonEvent.KEY_UP, { key: '=' });
    emitter.emit(CommonEvent.KEY_DOWN, { key: '-' });
    emitter.emit(CommonEvent.KEY_UP, { key: '-' });
    emitter.emit(CommonEvent.KEY_UP, { key: 'Control' });

    expect(controlEqual).toHaveBeenCalledTimes(2);
    expect(controlMinus).toHaveBeenCalledTimes(2);

    shortcut.unbind(['Control', '='], controlEqual);
    shortcut.unbind(['Control', '-']);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    emitter.emit(CommonEvent.KEY_DOWN, { key: '=' });
    emitter.emit(CommonEvent.KEY_UP, { key: '=' });
    emitter.emit(CommonEvent.KEY_DOWN, { key: '-' });
    emitter.emit(CommonEvent.KEY_UP, { key: '-' });
    emitter.emit(CommonEvent.KEY_UP, { key: 'Control' });

    expect(controlEqual).toHaveBeenCalledTimes(2);
    expect(controlMinus).toHaveBeenCalledTimes(2);
  });

  it('wheel', () => {
    const wheel = jest.fn();
    shortcut.bind(['Control', 'wheel'], wheel);

    emitter.emit(CommonEvent.WHEEL, { deltaX: 0, deltaY: 10 });
    expect(wheel).toHaveBeenCalledTimes(0);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    emitter.emit(CommonEvent.WHEEL, { deltaX: 0, deltaY: 10 });
    expect(wheel).toHaveBeenCalledTimes(1);
    expect(wheel.mock.calls[0][0].deltaY).toBe(10);
    emitter.emit(CommonEvent.KEY_UP, { key: 'Control' });
  });

  it('drag', () => {
    const drag = jest.fn();
    shortcut.bind(['drag'], drag);

    emitter.emit(CommonEvent.DRAG, { deltaX: 10, deltaY: 0 });
    expect(drag).toHaveBeenCalledTimes(1);
    expect(drag.mock.calls[0][0].deltaX).toBe(10);
    expect(drag.mock.calls[0][0].deltaY).toBe(0);

    drag.mockClear();

    // shift drag
    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Shift' });
    emitter.emit(CommonEvent.DRAG, { deltaX: 10, deltaY: 0 });
    emitter.emit(CommonEvent.KEY_UP, { key: 'Shift' });
    expect(drag).toHaveBeenCalledTimes(0);

    shortcut.unbindAll();
    shortcut.bind(['Shift', 'drag'], drag);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Shift' });
    emitter.emit(CommonEvent.DRAG, { deltaX: 10, deltaY: 0 });
    emitter.emit(CommonEvent.KEY_UP, { key: 'Shift' });
    expect(drag).toHaveBeenCalledTimes(1);
    expect(drag.mock.calls[0][0].deltaX).toBe(10);
    expect(drag.mock.calls[0][0].deltaY).toBe(0);
  });

  it('focus', () => {
    const wheel = jest.fn();
    shortcut.bind(['Control', 'wheel'], wheel);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    emitter.emit(CommonEvent.WHEEL, { deltaX: 0, deltaY: 10 });
    expect(wheel).toHaveBeenCalledTimes(1);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    window.dispatchEvent(new FocusEvent('focus'));

    // @ts-expect-error private property
    expect(shortcut.recordKey.size).toBe(0);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    emitter.emit(CommonEvent.WHEEL, { deltaX: 0, deltaY: 10 });
    expect(wheel).toHaveBeenCalledTimes(2);
  });
});
