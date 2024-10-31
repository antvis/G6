import EventEmitter from '@antv/event-emitter';
import type { FederatedMouseEvent } from '@antv/g';
import { isEqual, isString } from '@antv/util';
import { CommonEvent } from '../constants';

export interface ShortcutOptions {}

export type ShortcutKey = string[];

type Handler = (event: any) => void;

const lowerCaseKeys = (keys: ShortcutKey) => keys.map((key) => (isString(key) ? key.toLocaleLowerCase() : key));

export class Shortcut {
  private map: Map<ShortcutKey, Handler> = new Map();

  private emitter: EventEmitter;

  private recordKey = new Set<string>();

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.bindEvents();
  }

  public bind(key: ShortcutKey, handler: Handler) {
    if (key.length === 0) return;
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

  public match(key: ShortcutKey) {
    // 排序
    const recordKeyList = lowerCaseKeys(Array.from(this.recordKey)).sort();
    const keyList = lowerCaseKeys(key).sort();
    return isEqual(recordKeyList, keyList);
  }

  private bindEvents() {
    const { emitter } = this;

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

  private onFocus = () => {
    this.recordKey.clear();
  };

  public destroy() {
    this.unbindAll();
    this.emitter.off(CommonEvent.KEY_DOWN, this.onKeyDown);
    this.emitter.off(CommonEvent.KEY_UP, this.onKeyUp);
    this.emitter.off(CommonEvent.WHEEL, this.onWheel);
    this.emitter.off(CommonEvent.DRAG, this.onDrag);
    globalThis.removeEventListener?.('blur', this.onFocus);
  }
}
