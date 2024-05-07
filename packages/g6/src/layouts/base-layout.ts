import type { GraphData } from '../spec';
import type { BaseLayoutOptions } from './types';

export abstract class BaseLayout<O extends BaseLayoutOptions = any> {
  public abstract id: string;

  public options: O;

  constructor(options?: O) {
    this.options = options || ({} as O);
  }

  public stop?: () => void;

  public tick?: (iterations?: number) => GraphData;

  public abstract execute(model: GraphData, options?: O): Promise<GraphData>;

  /**
   * <zh/> 调用布局成员方法
   *
   * <en/> Call layout member methods
   * @description
   * <zh/> 提供一种通用的调用方式来调用 G6 布局和 @antv/layout 布局上的方法
   *
   * <en/> Provide a common way to call methods on G6 layout and @antv/layout layout
   * @param method - <zh/> 方法名 | <en/> Method name
   * @param args - <zh/> 参数 | <en/> Arguments
   * @returns <zh/> 返回值 | <en/> Return value
   */
  public invoke(method: string, ...args: unknown[]) {
    if (method in this) {
      return (this as any)[method](...args);
    }
    // invoke AdaptLayout method
    if ('instance' in this) {
      const instance = (this as any).instance;
      if (method in instance) return instance[method](...args);
    }
    return null;
  }

  /**
   * <zh/> 获取布局成员属性
   *
   * <en/> Get layout member properties
   * @param name - <zh/> 属性名 | <en/> Property name
   * @returns <zh/> 返回值 | <en/> Return value
   */
  public get(name: string) {
    if (name in this) return (this as any)[name];
    if ('instance' in this) {
      const instance = (this as any).instance;
      if (name in instance) return instance[name];
    }
    return null;
  }
}
