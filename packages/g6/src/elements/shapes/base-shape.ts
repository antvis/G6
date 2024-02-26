import type { BaseStyleProps, DisplayObject, DisplayObjectConfig, Group, IAnimation } from '@antv/g';
import { CustomElement } from '@antv/g';
import type { Keyframe } from '../../types';
import { createAnimationsProxy, preprocessKeyframes } from '../../utils/animation';
import { updateStyle } from '../../utils/element';

export interface BaseShapeStyleProps extends BaseStyleProps {
  x?: number | string;
  y?: number | string;
}

export abstract class BaseShape<StyleProps extends BaseShapeStyleProps> extends CustomElement<StyleProps> {
  constructor(options: DisplayObjectConfig<StyleProps>) {
    super(options);

    this.render(this.attributes as Required<StyleProps>, this);
    this.bindEvents();
  }

  get parsedAttributes() {
    return this.attributes as Required<StyleProps>;
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
  ): P | undefined {
    const target = this.shapeMap[key];
    // remove
    // 如果 style 为 false，则删除图形 / remove shape if style is false
    if (style === false) {
      if (target) {
        container.removeChild(target);
        delete this.shapeMap[key];
      }
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
    updateStyle(target, style);

    return target as P;
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

  public update(attr: Partial<StyleProps> = {}): void {
    this.attr(Object.assign({}, this.attributes, attr));
    return this.render(this.attributes as Required<StyleProps>, this);
  }

  /**
   * <zh> 在初始化时会被自动调用
   *
   * <en> will be called automatically when initializing
   * @param attributes
   * @param container
   */
  public abstract render(attributes: Required<StyleProps>, container: Group): void;

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
  ): Omit<T, 'x' | 'y' | 'transform' | 'transformOrigin' | 'className' | 'context'> {
    const { x, y, className, transform, transformOrigin, context, ...style } = attributes;
    return style;
  }

  public animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions): IAnimation | null {
    this.animateMap = {};
    const result = super.animate(keyframes, options)!;

    if (Array.isArray(keyframes) && keyframes.length > 0) {
      // 如果 keyframes 中仅存在 skippedAttrs 中的属性，则仅更新父元素属性（跳过子图形）
      // if only skippedAttrs exist in keyframes, only update parent element attributes (skip child shapes)
      const skippedAttrs = [
        'anchor',
        'transform',
        'transformOrigin',
        'x',
        'y',
        'z',
        'zIndex',
        // 'opacity',
        // 'visibility',
      ];
      if (Object.keys(keyframes[0]).some((attr) => !skippedAttrs.includes(attr))) {
        Object.entries(this.shapeMap).forEach(([key, shape]) => {
          // 如果存在方法名为 `get${key}Style` 的方法，则使用该方法获取样式，并自动为该图形实例创建动画
          // if there is a method named `get${key}Style`, use this method to get style and automatically create animation for the shape instance
          const methodName = `get${key[0].toUpperCase()}${key.slice(1)}Style` as keyof this;
          const method = this[methodName];

          if (typeof method === 'function') {
            const subKeyframes: Keyframe[] = keyframes.map((style) =>
              method.call(this, { ...this.attributes, ...style }),
            );

            this.animateMap[key] = shape.animate(preprocessKeyframes(subKeyframes), options)!;
          }
        });
      }
    } else {
      // TODO: support PropertyIndexedKeyframes
    }

    return this.proxyAnimate(result);
  }
}
