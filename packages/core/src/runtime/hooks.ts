import { IHook } from "../types/hook";

export default class Hook<T> implements IHook<T> {
  public name: string;
  public listeners: ((param: T) => void)[];
  constructor(cfg) {
    const { name } = cfg;
    this.name = name;
  }
  public tap(listener: (param: T) => void) {
    this.listeners.push(listener);
  }
  public unTap(listener: (param: T) => void) {
    const idx = this.listeners.indexOf(listener);
    if (idx > -1) this.listeners.splice(idx, 1);
  }
  public emit(param: T) {
    this.listeners.forEach(listener => listener(param));
  }
}