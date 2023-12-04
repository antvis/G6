import { IHook } from '../types/hook';

/**
 * A hook class unified the definitions of tap, un-tap, and emit.
 * One hook corresponds to one lifecycle on a graph.
 */
export default class Hook<T> implements IHook<T> {
  public name: string;
  /**
   * A series listeners for this hook which will be executed one by one
   */
  public listeners: ((param: T) => void)[] = [];
  constructor(cfg) {
    const { name } = cfg;
    this.name = name;
  }
  /**
   * Tap a listener to the corresponding lifecycle of this hook.
   * @param listener
   */
  public tap(listener: (param: T) => void) {
    this.listeners.push(listener);
  }
  /**
   * Remove a listener from the corresponding lifecycle of this hook.
   * @param listener
   */
  public unTap(listener: (param: T) => void) {
    const idx = this.listeners.indexOf(listener);
    if (idx > -1) this.listeners.splice(idx, 1);
  }
  /**
   * Emit the corresponding lifecycle to call the listeners
   * @param param
   */
  public emit(param: T) {
    this.listeners.forEach((listener) => listener(param));
  }
  /**
   * Linearly async emit the corresponding lifecycle to call the listeners
   * @param param
   */
  public async emitLinearAsync(param: T): Promise<void> {
    for (const listener of this.listeners) {
      await listener(param);
    }
    // return new Promise(async () => {
    //   let start = Promise.resolve();
    //   this.listeners.forEach((listener) => {
    //     start = start.then(
    //       async () =>
    //         new Promise(async (resolve, reject) => {
    //           try {
    //             await listener(param);
    //             resolve();
    //           } catch (e) {
    //             reject();
    //           }
    //         }),
    //     );
    //   });
    // });
  }
}
