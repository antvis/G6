import EventEmitter from '@antv/event-emitter';
import type { FederatedMouseEvent } from '@antv/g';
import { isEqual } from '@antv/util';
import { CommonEvent } from '../constants';
import { isEqualIgnoreOrder } from './array';

export interface ShortcutOptions {}

export type ShortcutKey = string[];

type Handler = (event: any) => void;

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
    const recordKeyList = Array.from(this.recordKey).map((k) => k.toLocaleLowerCase());
    const keyList = key.map((k) => k.toLocaleLowerCase());
    return isEqualIgnoreOrder(recordKeyList, keyList);
  }

  private bindEvents() {
    const { emitter } = this;

    emitter.on(CommonEvent.KEY_DOWN, this.onKeyDown);
    emitter.on(CommonEvent.KEY_UP, this.onKeyUp);
    emitter.on(CommonEvent.WHEEL, this.onWheel);
    emitter.on(CommonEvent.DRAG, this.onDrag);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    this.recordKey.add(event.key);
    this.trigger(event);
  };

  private onKeyUp = (event: KeyboardEvent) => {
    this.recordKey.delete(event.key);
  };

  private trigger(event: KeyboardEvent) {
    this.map.forEach((handler, key) => {
      if (isEqual(Array.from(this.recordKey), key)) handler(event);
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

  public destroy() {
    this.unbindAll();
    this.emitter.off(CommonEvent.KEY_DOWN, this.onKeyDown);
    this.emitter.off(CommonEvent.KEY_UP, this.onKeyUp);
    this.emitter.off(CommonEvent.WHEEL, this.onWheel);
    this.emitter.off(CommonEvent.DRAG, this.onDrag);
  }
}
