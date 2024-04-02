import { CommonEvent } from '@/src';
import { Shortcut } from '@/src/utils/shortcut';
import EventEmitter from '@antv/event-emitter';

describe('shortcut', () => {
  const emitter = new EventEmitter();

  const shortcut = new Shortcut(emitter);

  afterAll(() => {
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
  });
});
