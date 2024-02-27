import EventEmitter from '@antv/event-emitter';
import { isEqual } from '@antv/util';
import { CommonEvent } from '../constants';

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

  private bindEvents() {
    const { emitter } = this;

    emitter.on(CommonEvent.KEY_DOWN, this.onKeyDown);
    emitter.on(CommonEvent.KEY_UP, this.onKeyUp);
    emitter.on(CommonEvent.WHEEL, this.onWheel);
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

  private onWheel = (event: WheelEvent) => {
    this.map.forEach((handler, key) => {
      if (key.includes(CommonEvent.WHEEL)) {
        if (
          isEqual(
            Array.from(this.recordKey),
            key.filter((k) => k !== CommonEvent.WHEEL),
          )
        ) {
          handler(event);
        }
      }
    });
  };
}
