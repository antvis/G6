import type EventEmitter from '@antv/event-emitter';
import type { Graph } from '../../runtime/graph';
import type { RuntimeContext } from '../../runtime/types';
import type { IEvent } from '../../types';
import { arrayDiff } from '../../utils/diff';
import { parseExtensions } from '../../utils/extension';
import { print } from '../../utils/print';
import { getExtension } from '../get';
import type { STDExtensionOption } from './types';

export abstract class ExtensionController<E extends BaseExtension<any>> {
  protected context: RuntimeContext;

  protected extensions: STDExtensionOption[] = [];

  protected extensionMap: Record<string, E> = {};

  public abstract category: 'plugin' | 'behavior' | 'transform';

  constructor(context: RuntimeContext) {
    this.context = context;
  }

  public setExtensions(
    extensions: (
      | string
      | { type: string; [keys: string]: unknown }
      | ((this: Graph) => { type: string; [keys: string]: unknown })
    )[],
  ) {
    const stdExtensions = parseExtensions(this.context.graph, this.category, extensions) as STDExtensionOption[];
    const { enter, update, exit, keep } = arrayDiff(this.extensions, stdExtensions, (extension) => extension.key);

    this.createExtensions(enter);
    this.updateExtensions([...update, ...keep]);
    this.destroyExtensions(exit);

    this.extensions = stdExtensions;
  }

  protected createExtension(extension: STDExtensionOption) {
    const { category } = this;

    const { key, type } = extension;
    const Ctor = getExtension(category, type);
    if (!Ctor) return print.warn(`The extension ${type} of ${category} is not registered.`);

    const instance = new Ctor(this.context, extension);
    this.extensionMap[key] = instance as E;
  }

  protected createExtensions(extensions: STDExtensionOption[]) {
    extensions.forEach((extension) => this.createExtension(extension));
  }

  protected updateExtension(extension: STDExtensionOption) {
    const { key } = extension;
    const instance = this.extensionMap[key];
    if (instance) {
      instance.update(extension);
    }
  }

  protected updateExtensions(extensions: STDExtensionOption[]) {
    extensions.forEach((extension) => this.updateExtension(extension));
  }

  protected destroyExtension(key: string) {
    const instance = this.extensionMap[key];
    if (instance) {
      instance.destroy();
      delete this.extensionMap[key];
    }
  }

  protected destroyExtensions(extensions: STDExtensionOption[]) {
    extensions.forEach(({ key }) => this.destroyExtension(key));
  }

  public destroy() {
    Object.values(this.extensionMap).forEach((extension) => extension.destroy());
    // @ts-expect-error force delete
    this.context = {};
    this.extensions = [];
    this.extensionMap = {};
  }
}

/**
 * <zh/> 模块实例基类
 *
 * <en/> Base class for extension instance
 */
export class BaseExtension<T extends { type: string; key?: string; [key: string]: unknown }> {
  protected context: RuntimeContext;

  protected options: Required<T>;

  protected events: [EventEmitter | HTMLElement, string, (event: IEvent) => void][] = [];

  public destroyed = false;

  constructor(context: RuntimeContext, options: Partial<T>) {
    this.context = context;
    this.options = options as Required<T>;
  }

  public update(options: Partial<T>) {
    this.options = Object.assign(this.options, options);
  }

  public destroy() {
    // @ts-expect-error force delete
    this.context = {};
    // @ts-expect-error force delete
    this.options = {};

    this.destroyed = true;
  }
}
