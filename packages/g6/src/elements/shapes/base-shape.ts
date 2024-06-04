import type { BaseStyleProps, DisplayObject, DisplayObjectConfig, Group, IAnimation } from '@antv/g';
import { CustomElement } from '@antv/g';
import { isEmpty, isFunction, upperFirst } from '@antv/util';
import type { Keyframe } from '../../types';
import { createAnimationsProxy, preprocessKeyframes } from '../../utils/animation';
import { updateStyle } from '../../utils/element';
import { subObject } from '../../utils/prefix';
import { setVisibility } from '../../utils/visibility';

export interface BaseShapeStyleProps extends BaseStyleProps {}

export abstract class BaseShape<StyleProps extends BaseShapeStyleProps> extends CustomElement<StyleProps> {
  constructor(options: DisplayObjectConfig<StyleProps>) {
    super(options);
    this.render(this.attributes as Required<StyleProps>, this);
    this.setVisibility();
    this.bindEvents();
  }

  protected get parsedAttributes() {
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
   * @param className - <zh> 图形名称 | <en> shape name
   * @param Ctor - <zh> 图形类型 | <en> shape type
   * @param style - <zh> 图形样式 | <en> shape style
   * @param container - <zh> 容器 | <en> container
   * @returns <zh> 图形实例 | <en> shape instance
   */
  protected upsert<T extends DisplayObject>(
    className: string,
    Ctor: { new (...args: any[]): T },
    style: T['attributes'] | false,
    container: DisplayObject,
  ): T | undefined {
    const target = this.shapeMap[className] as T | undefined;
    // remove
    // 如果 style 为 false，则删除图形 / remove shape if style is false
    if (style === false) {
      if (target) {
        container.removeChild(target);
        delete this.shapeMap[className];
      }
      return;
    }

    // create
    if (!target) {
      const instance = new Ctor({ className, style });
      container.appendChild(instance);
      this.shapeMap[className] = instance;
      return instance;
    }

    // update
    updateStyle(target, style);

    return target;
  }

  public update(attr: Partial<StyleProps> = {}): void {
    this.attr(Object.assign({}, this.attributes, attr) as StyleProps);
    this.render(this.attributes as Required<StyleProps>, this);
    this.setVisibility();
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
  ): Omit<T, 'x' | 'y' | 'z' | 'transform' | 'transformOrigin' | 'className' | 'class' | 'context' | 'zIndex'> {
    const { x, y, z, class: cls, className, transform, transformOrigin, context, zIndex, ...style } = attributes;
    return style;
  }

  /**
   * Get the prefix pairs for composite shapes used to handle animation
   * @returns tuples array where each tuple contains a key corresponding to a method `get${key}Style` and its shape prefix
   */
  protected get compositeShapes(): [string, string][] {
    return [
      ['badges', 'badge-'],
      ['ports', 'port-'],
    ];
  }

  /*
   * <zh/> 是否自动托管动画
   *
   * <en/> Whether to automatically host animation
   */
  protected hostingAnimation = true;

  public animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions): IAnimation | null {
    if (keyframes.length === 0) return null;
    const animationMap: IAnimation[] = [];

    const result = super.animate(keyframes, options);
    if (!this.hostingAnimation) return result;
    if (result) animationMap.push(result);

    if (Array.isArray(keyframes) && keyframes.length > 0) {
      // 如果 keyframes 中仅存在 skippedAttrs 中的属性，则仅更新父元素属性（跳过子图形）
      // if only skippedAttrs exist in keyframes, only update parent element attributes (skip child shapes)
      const skippedAttrs = ['transform', 'transformOrigin', 'x', 'y', 'z', 'zIndex'];
      if (Object.keys(keyframes[0]).some((attr) => !skippedAttrs.includes(attr))) {
        Object.entries(this.shapeMap).forEach(([key, shape]) => {
          // 如果存在方法名为 `get${key}Style` 的方法，则使用该方法获取样式，并自动为该图形实例创建动画
          // if there is a method named `get${key}Style`, use this method to get style and automatically create animation for the shape instance
          const methodName = `get${upperFirst(key)}Style` as keyof this;
          const method = this[methodName];

          if (isFunction(method)) {
            const subKeyframes: Keyframe[] = keyframes.map((style) =>
              method.call(this, { ...this.attributes, ...style }),
            );
            const result = shape.animate(preprocessKeyframes(subKeyframes), options);
            if (result) animationMap.push(result);
          }
        });

        const handleCompositeShapeAnimation = (shapeSet: Record<string, DisplayObject>, name: string) => {
          if (!isEmpty(shapeSet)) {
            const methodName = `get${upperFirst(name)}Style` as keyof this;
            const method = this[methodName];
            if (isFunction(method)) {
              const itemsKeyframes = keyframes.map((style) => method.call(this, { ...this.attributes, ...style }));
              Object.entries(itemsKeyframes[0]).map(([key]) => {
                const subKeyframes = itemsKeyframes.map((styles) => styles[key]);
                const shape = shapeSet[key];
                if (shape) {
                  const result = shape.animate(preprocessKeyframes(subKeyframes), options);
                  if (result) animationMap.push(result);
                }
              });
            }
          }
        };

        this.compositeShapes.forEach(([key, prefix]) => {
          const shapeSet = subObject(this.shapeMap, prefix);
          handleCompositeShapeAnimation(shapeSet, key);
        });
      }
    }

    return createAnimationsProxy(animationMap);
  }

  public getShape<T extends DisplayObject>(name: string): T {
    return this.shapeMap[name] as T;
  }

  private setVisibility() {
    const { visibility } = this.attributes;
    setVisibility(this, visibility);
  }

  public destroy(): void {
    this.shapeMap = {};
    this.animateMap = {};
    super.destroy();
  }
}
