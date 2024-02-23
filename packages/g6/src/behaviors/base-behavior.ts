import EventEmitter from '@antv/event-emitter';
import type { RuntimeContext } from '../runtime/types';
import type { STDBehaviorOption } from '../spec/behavior';
import type { Behavior, Listener } from '../types';

export type BaseBehaviorOptions = STDBehaviorOption;

export abstract class BaseBehavior<T extends STDBehaviorOption> implements Behavior {
  static defaultOptions: Partial<STDBehaviorOption> = {};

  protected context: RuntimeContext;

  protected options: Required<T>;

  public events: [EventEmitter | HTMLElement, string, Listener][] = [];

  public destroyed = false;

  constructor(context: RuntimeContext, options: T) {
    this.context = context;
    this.options = Object.assign({}, BaseBehavior.defaultOptions, options) as Required<T>;
  }

  public update(options: Partial<STDBehaviorOption>) {
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
