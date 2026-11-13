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

    // Test modifier key works at window level too
    window.dispatchEvent(new KeyboardEvent(CommonEvent.KEY_DOWN, { key: 'Control' }));
    emitter.emit(CommonEvent.KEY_DOWN, { key: '=' });
    emitter.emit(CommonEvent.KEY_UP, { key: '=' });
    emitter.emit(CommonEvent.KEY_DOWN, { key: '-' });
    emitter.emit(CommonEvent.KEY_UP, { key: '-' });
    window.dispatchEvent(new KeyboardEvent(CommonEvent.KEY_UP, { key: 'Control' }));

    expect(controlEqual).toHaveBeenCalledTimes(3);
    expect(controlMinus).toHaveBeenCalledTimes(3);

    shortcut.unbind(['Control', '='], controlEqual);
    shortcut.unbind(['Control', '-']);

    emitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    emitter.emit(CommonEvent.KEY_DOWN, { key: '=' });
    emitter.emit(CommonEvent.KEY_UP, { key: '=' });
    emitter.emit(CommonEvent.KEY_DOWN, { key: '-' });
    emitter.emit(CommonEvent.KEY_UP, { key: '-' });
    emitter.emit(CommonEvent.KEY_UP, { key: 'Control' });

    expect(controlEqual).toHaveBeenCalledTimes(3);
    expect(controlMinus).toHaveBeenCalledTimes(3);
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

  describe.each([CommonEvent.WHEEL, CommonEvent.DRAG])('%s modifier matching', (eventType) => {
    it.each([
      ['Shift', 'Control'],
      ['Control', 'Shift'],
    ])('matches regardless of modifier press order: %s then %s', (first, second) => {
      const localEmitter = new EventEmitter();
      const localShortcut = new Shortcut(localEmitter);
      const handler = jest.fn();
      const keys = ['Control', 'Shift', eventType];
      localShortcut.bind(keys, handler);

      try {
        localEmitter.emit(CommonEvent.KEY_DOWN, { key: first });
        localEmitter.emit(CommonEvent.KEY_DOWN, { key: second });
        localEmitter.emit(eventType, { type: eventType });
        expect(handler).toHaveBeenCalledTimes(1);
        expect(keys).toEqual(['Control', 'Shift', eventType]);
      } finally {
        localShortcut.destroy();
        localEmitter.off();
      }
    });

    it('matches lowercase modifiers and rejects missing or extra keys', () => {
      const localEmitter = new EventEmitter();
      const localShortcut = new Shortcut(localEmitter);
      const handler = jest.fn();
      localShortcut.bind(['control', 'shift', eventType], handler);

      const emit = () => {
        localEmitter.emit(eventType, { type: eventType });
      };

      try {
        localEmitter.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
        emit();
        expect(handler).not.toHaveBeenCalled();
        localEmitter.emit(CommonEvent.KEY_DOWN, { key: 'Shift' });
        emit();
        expect(handler).toHaveBeenCalledTimes(1);
        localEmitter.emit(CommonEvent.KEY_DOWN, { key: 'Alt' });
        emit();
        expect(handler).toHaveBeenCalledTimes(1);
        localEmitter.emit(CommonEvent.KEY_UP, { key: 'Alt' });
        emit();
        expect(handler).toHaveBeenCalledTimes(2);
      } finally {
        localShortcut.destroy();
        localEmitter.off();
      }
    });
  });
});
