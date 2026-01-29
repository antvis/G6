import EventEmitter from '@antv/event-emitter';
import type { FederatedMouseEvent } from '@antv/g';
import { isEqual, isString } from '@antv/util';
import { CommonEvent } from '../constants';
import type { PinchCallback } from './pinch';
import { PinchHandler } from './pinch';

export interface ShortcutOptions {}

export type ShortcutKey = string[];

type Handler = (event: any) => void;

const MODIFIER_KEYS = new Set(['Control', 'Alt', 'Meta', 'Shift']);
function isModifierKey(key: string) {
  return MODIFIER_KEYS.has(key);
}

const lowerCaseKeys = (keys: ShortcutKey) => keys.map((key) => (isString(key) ? key.toLocaleLowerCase() : key));

export class Shortcut {
  private map: Map<ShortcutKey, Handler> = new Map();
  public pinchHandler: PinchHandler | undefined;
  private boundHandlePinch: PinchCallback = () => {};

  private emitter: EventEmitter;

  private recordKey = new Set<string>();

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.bindEvents();
  }

  public bind(key: ShortcutKey, handler: Handler) {
    if (key.length === 0) return;
    if (key.includes(CommonEvent.PINCH) && !this.pinchHandler) {
      this.boundHandlePinch = this.handlePinch.bind(this);
      this.pinchHandler = new PinchHandler(this.emitter, 'pinchmove', this.boundHandlePinch);
    }
    this.map.set(key, handler);
  }

  public unbind(key: ShortcutKey, handler?: Handler) {
    this.map.forEach((h, k) => {
      if (isEqual(k, key)) {
        if (!handler || handler === h) this.map.delete(k);
      }
    });
  }

  public unbindAll() {
    this.map.clear();
  }

  /**
   * Check whether the given keys are being held down currently.
   * @param key - array of keys to check
   * @returns true if the given keys are being held down, false otherwise.
   */
  public match(key: ShortcutKey) {
    // 排序
    const recordKeyList = lowerCaseKeys(Array.from(this.recordKey)).sort();
    const keyList = lowerCaseKeys(key).sort();
    return isEqual(recordKeyList, keyList);
  }

  private bindEvents() {
    const { emitter } = this;

    // These window listeners are added purely to listen to modifier keys at the window level,
    // and the key presses are only recorded into this.recordKey for the purpose of matching
    // in the match() function. This allows just these keypresses alone to be registered
    // before the canvas is focused, which prevents a problem where when shortcuts involving
    // a modifier and clicking on the canvas are bound, match() will return false for that
    // modifier key because the canvas has not been clicked (and therefore focused) yet.
    window.addEventListener(CommonEvent.KEY_DOWN, this.onKeyDownWindow);
    window.addEventListener(CommonEvent.KEY_UP, this.onKeyUpWindow);
    emitter.on(CommonEvent.KEY_DOWN, this.onKeyDown);
    emitter.on(CommonEvent.KEY_UP, this.onKeyUp);
    emitter.on(CommonEvent.WHEEL, this.onWheel);
    emitter.on(CommonEvent.DRAG, this.onDrag);

    // 窗口重新获得焦点后清空按键，避免按键状态异常
    // Clear the keys when the window regains focus to avoid abnormal key states
    globalThis.addEventListener?.('focus', this.onFocus);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (!event?.key) return;
    this.recordKey.add(event.key);
    this.trigger(event);
  };

  private onKeyUp = (event: KeyboardEvent) => {
    if (!event?.key) return;
    this.recordKey.delete(event.key);
  };

  private onKeyDownWindow = (event: KeyboardEvent) => {
    if (!isModifierKey(event.key)) return;
    this.recordKey.add(event.key);
  };

  private onKeyUpWindow = (event: KeyboardEvent) => {
    if (!isModifierKey(event.key)) return;
    this.recordKey.delete(event.key);
  };

  private trigger(event: KeyboardEvent) {
    this.map.forEach((handler, key) => {
      if (this.match(key)) handler(event);
    });
  }

  /**
   * <zh/> 扩展 wheel, drag 操作
   *
   * <en/> Extend wheel, drag operations
   * @param eventType - event name
   * @param event - event
   */
  private triggerExtendKey(eventType: CommonEvent, event: unknown) {
    this.map.forEach((handler, key) => {
      if (key.includes(eventType)) {
        if (
          isEqual(
            Array.from(this.recordKey),
            key.filter((k) => k !== eventType),
          )
        ) {
          handler(event);
        }
      }
    });
  }

  private onWheel = (event: WheelEvent) => {
    this.triggerExtendKey(CommonEvent.WHEEL, event);
  };

  private onDrag = (event: FederatedMouseEvent) => {
    this.triggerExtendKey(CommonEvent.DRAG, event);
  };

  private handlePinch: PinchCallback = (event, options) => {
    this.triggerExtendKey(CommonEvent.PINCH, { ...event, ...options });
  };

  private onFocus = () => {
    this.recordKey.clear();
  };

  public destroy() {
    this.unbindAll();
    this.emitter.off(CommonEvent.KEY_DOWN, this.onKeyDown);
    this.emitter.off(CommonEvent.KEY_UP, this.onKeyUp);
    window.removeEventListener(CommonEvent.KEY_DOWN, this.onKeyDownWindow);
    window.removeEventListener(CommonEvent.KEY_UP, this.onKeyUpWindow);
    this.emitter.off(CommonEvent.WHEEL, this.onWheel);
    this.emitter.off(CommonEvent.DRAG, this.onDrag);
    this.pinchHandler?.off('pinchmove', this.boundHandlePinch);
    globalThis.removeEventListener?.('focus', this.onFocus);
  }
}
