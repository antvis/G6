import type { DisplayObject, DisplayObjectConfig, Group, GroupStyleProps, IAnimation } from '@antv/g';
import { CustomElement } from '@antv/g';
import { deepMix, isNil } from '@antv/util';
import { createAnimationsProxy } from '../../utils/animation';

export interface BaseShapeStyleProps extends GroupStyleProps {}

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
  protected shapeMap: Record<string, DisplayObject> = {};

  /**
   * <zh> 动画实例映射表
   *
   * <en> animation instance map
   */
  protected animateMap: Record<string, IAnimation> = {};

  /**
   * <zh> 创建、更新或删除图形
   *
   * <en> create, update or remove shape
   * @param key - <zh> 图形名称 | <en> shape name
   * @param Ctor - <zh> 图形类型 | <en> shape type
   * @param style - <zh> 图形样式 | <en> shape style
   * @param container - <zh> 容器 | <en> container
   * @returns <zh> 图形实例 | <en> shape instance
   */
  protected upsert<P extends DisplayObject>(
    key: string,
    Ctor: { new (...args: any[]): P },
    style: P['attributes'] | false,
    container: DisplayObject,
  ) {
    const target = this.shapeMap[key];
    // remove
    // 如果 style 为 false，则删除图形 / remove shape if style is false
    if (target && style === false) {
      container.removeChild(target);
      delete this.shapeMap[key];
      return;
    }

    // create
    if (!target) {
      const instance = new Ctor({ style });
      instance.id = key;
      container.appendChild(instance);
      this.shapeMap[key] = instance;
      return instance;
    }

    // update
    // 如果图形实例存在 update 方法，则调用 update 方法，否则调用 attr 方法
    // if shape instance has update method, call update method, otherwise call attr method
    if ('update' in target) (target.update as (...args: unknown[]) => unknown)(style);
    else target.attr(style);

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
    return createAnimationsProxy(result, Object.values(this.animateMap));
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
  public abstract render(attributes: T, container: Group): void;

  public bindEvents() {}

  /**
   * <zh/> 从给定的属性对象中提取图形样式属性。删除特定的属性，如位置、变换和类名
   *
   * <en/> Extracts the graphic style properties from a given attribute object.
   * Removes specific properties like position, transformation, and class name.
   * @param attributes - <zh/> 属性对象 | <en/> attribute object
   * @returns <zh/> 仅包含样式属性的对象 | <en/> An object containing only the style properties.
   */
  public getGraphicStyle<T extends Record<string, any>>(
    attributes: T,
  ): Omit<T, 'x' | 'y' | 'transform' | 'transformOrigin' | 'className'> {
    const { x, y, className, transform, transformOrigin, ...style } = attributes;
    return style;
  }

  public animate(
    keyframes: PropertyIndexedKeyframes | Keyframe[],
    options?: number | KeyframeAnimationOptions,
  ): IAnimation {
    this.animateMap = {};

    const result = super.animate(keyframes, options)!;

    if (Array.isArray(keyframes) && keyframes.length > 0) {
      Object.entries(this.shapeMap).forEach(([key, shape]) => {
        // 如果存在方法名为 `get${key}Style` 的方法，则使用该方法获取样式，并自动为该图形实例创建动画
        // if there is a method named `get${key}Style`, use this method to get style and automatically create animation for the shape instance
        const methodName = `get${key[0].toUpperCase()}${key.slice(1)}Style` as keyof this;
        const method = this[methodName];

        if (typeof method === 'function') {
          const subKeyframes: Keyframe[] = keyframes.map((style) => method.call(this, style));

          // 转化为 PropertyIndexedKeyframes 格式方便后续处理
          // convert to PropertyIndexedKeyframes format for subsequent processing
          const propertyIndexedKeyframes = subKeyframes.reduce(
            (acc, kf) => {
              Object.entries(kf).forEach(([key, value]) => {
                if (acc[key] === undefined) acc[key] = [value];
                else acc[key].push(value);
              });
              return acc;
            },
            {} as Record<string, any[]>,
          );

          // 过滤掉无用动画的属性（属性值为 undefined、或者值完全一致）
          // filter out useless animation properties (property value is undefined, or value is exactly the same)
          Object.entries(propertyIndexedKeyframes).forEach(([key, values]) => {
            if (
              // 属性值必须在每一帧都存在 / property value must exist in every frame
              values.length !== subKeyframes.length ||
              // 属性值不能为空 / property value cannot be empty
              values.some((value) => isNil(value)) ||
              // 属性值必须不完全一致 / property value must not be exactly the same
              values.every((value) => value === values[0])
            ) {
              delete propertyIndexedKeyframes[key];
            }
          });

          this.animateMap[key] = shape.animate(
            // 将 PropertyIndexedKeyframes 转化为 Keyframe 格式
            // convert PropertyIndexedKeyframes to Keyframe format
            Object.entries(propertyIndexedKeyframes).reduce((acc, [key, values]) => {
              values.forEach((value, index) => {
                if (!acc[index]) acc[index] = { [key]: value };
                else acc[index][key] = value;
              });
              return acc;
            }, [] as Keyframe[]),
            options,
          )!;
        }
      });
    } else {
      // TODO: support PropertyIndexedKeyframes
    }

    return this.proxyAnimate(result);
  }
}
