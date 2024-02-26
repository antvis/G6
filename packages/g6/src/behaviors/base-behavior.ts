import type EventEmitter from '@antv/event-emitter';
import type { RuntimeContext } from '../runtime/types';
import type { CustomBehaviorOption } from '../spec/behavior';
import type { Listener } from '../types';

export type BaseBehaviorOptions = CustomBehaviorOption;

export abstract class BaseBehavior<T extends BaseBehaviorOptions> {
  protected context: RuntimeContext;

  protected options: Required<T>;

  public events: [EventEmitter | HTMLElement, string, Listener][] = [];

  public destroyed = false;

  public get defaultOptions(): Partial<T> {
    return {};
  }

  constructor(context: RuntimeContext, options: T) {
    this.context = context;
    this.options = Object.assign({}, this.defaultOptions, options) as Required<T>;
  }

  public update(options: Partial<T>) {
    this.options = Object.assign(this.options, options);
  }

  public addEventListener(emitter: EventEmitter | HTMLElement, eventName: string, listener: Listener) {
    if (emitter instanceof HTMLElement) emitter.addEventListener(eventName, listener);
    else emitter.on(eventName, listener);
    this.events.push([emitter, eventName, listener]);
  }

  public destroy() {
    this.events.forEach(([emitter, event, listener]) => {
      if (emitter instanceof HTMLElement) emitter.removeEventListener(event, listener);
      else emitter.off(event, listener);
    });

    // @ts-expect-error force delete
    delete this.context;
    // @ts-expect-error force delete
    delete this.options;

    this.destroyed = true;
  }
}
