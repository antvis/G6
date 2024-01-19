import type { DisplayObject, DisplayObjectConfig, Group, GroupStyleProps, IAnimation } from '@antv/g';
import { CustomElement } from '@antv/g';
import { deepMix } from '@antv/util';

export interface BaseShapeStyleProps extends GroupStyleProps {}

export interface ParsedBaseStyleProps {}

export abstract class BaseShape<T extends BaseShapeStyleProps> extends CustomElement<T> {
  constructor(options: DisplayObjectConfig<T>) {
    super(options);

    this.render(this.attributes as Required<T>, this);
    this.bindEvents();
  }

  /**
   * <zh> 图形实例映射表
   *
   * <en> shape instance map
   */
  protected ShapeMap = {} as Record<string, DisplayObject>;

  /**
   * <zh> 动画实例映射表
   *
   * <en> animation instance map
   */
  protected AnimateMap = {} as Record<string, IAnimation>;

  connectedCallback(): void {}

  disconnectedCallback(): void {}

  /**
   * <zh> 更新或创建图形
   *
   * <en> update or create shape
   * @param key - <zh> 图形名称 | <en> shape name
   * @param Ctor - <zh> 图形类型 | <en> shape type
   * @param style - <zh> 图形样式 | <en> shape style
   * @param container - <zh> 容器 | <en> container
   * @returns <zh> 图形实例 | <en> shape instance
   */
  protected upsert<P extends DisplayObject>(
    key: string,
    Ctor: { new (...args: unknown[]): P },
    style: P['attributes'],
    container: DisplayObject,
  ) {
    const target = this.ShapeMap[key];
    if (!target) {
      const instance = new Ctor({ style }); //createShape(shape, styles) as P;
      instance.id = key;
      container.appendChild(instance);
      this.ShapeMap[key] = instance;
      return instance;
    }
    // update
    if ('update' in target) {
      (target.update as (...args: unknown[]) => unknown)(style);
    } else {
      target.attr(style);
    }
    return target;
  }

  /**
   * <zh> 创建动画代理，将动画同步到子图形实例上
   *
   * <en> create animation proxy, synchronize animation to child shape instance
   * @example
   * ```ts
   * const result = shape.animate(keyframes, options);
   * const proxy = shape.proxyAnimate(result);
   * ```
   * @param result - <zh> 主动画实例 | <en> main animation instance
   * @returns <zh> 动画代理 | <en> animation proxy
   */
  protected proxyAnimate(result: IAnimation) {
    const self = this;
    return new Proxy(result, {
      get(target, propKey) {
        if (typeof target[propKey] === 'function') {
          return (...args: unknown[]) => {
            target[propKey](...args);
            Object.values(self.AnimateMap).forEach((item) => item?.[propKey]?.(...args));
          };
        }
        return Reflect.get(target, propKey);
      },
      set(target, propKey, value) {
        Object.values(self.AnimateMap).forEach((item) => Object.assign(item, { [propKey]: value }));
        return Reflect.set(target, propKey, value);
      },
    });
  }

  public update(attr: Partial<T> = {}): void {
    this.attr(deepMix({}, this.attributes, attr));
    return this.render(this.attributes as Required<T>, this);
  }

  /**
   * <zh> 在初始化时会被自动调用
   *
   * <en> will be called automatically when initializing
   * @param attributes
   * @param container
   */
  public abstract render(attributes: Required<T>, container: Group): void;

  public bindEvents() {}
}
