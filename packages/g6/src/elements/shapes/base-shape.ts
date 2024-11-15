import type { BaseStyleProps, DisplayObject, DisplayObjectConfig, Group, IAnimation } from '@antv/g';
import { CustomElement } from '@antv/g';
import { isEmpty, isFunction, upperFirst } from '@antv/util';
import { ExtensionCategory } from '../../constants';
import type { Keyframe } from '../../types';
import { createAnimationsProxy, preprocessKeyframes } from '../../utils/animation';
import { updateStyle } from '../../utils/element';
import { subObject } from '../../utils/prefix';
import { format } from '../../utils/print';
import { getSubShapeStyle } from '../../utils/style';
import { replaceTranslateInTransform } from '../../utils/transform';
import { setVisibility } from '../../utils/visibility';
import { getExtension } from './../../registry/get';

export interface BaseShapeStyleProps extends BaseStyleProps {}

/**
 * <zh/> 图形基类
 *
 * <en/> Base class for shapes
 */
export abstract class BaseShape<StyleProps extends BaseShapeStyleProps> extends CustomElement<StyleProps> {
  constructor(options: DisplayObjectConfig<StyleProps>) {
    super(options);
    this.transformPosition(this.attributes);
    this.render(this.attributes as Required<StyleProps>, this);
    this.setVisibility();
    this.bindEvents();
  }

  /**
   * <zh/> 解析后的属性
   *
   * <en/> parsed attributes
   * @returns <zh/> 解析后的属性 | <en/> parsed attributes
   * @internal
   */
  protected get parsedAttributes() {
    return this.attributes as Required<StyleProps>;
  }

  /**
   * <zh/> 图形实例映射表
   *
   * <en/> shape instance map
   * @internal
   */
  protected shapeMap: Record<string, DisplayObject> = {};

  /**
   * <zh/> 动画实例映射表
   *
   * <en/> animation instance map
   * @internal
   */
  protected animateMap: Record<string, IAnimation> = {};

  /**
   * <zh/> 创建、更新或删除图形
   *
   * <en/> create, update or remove shape
   * @param className - <zh/> 图形名称 | <en/> shape name
   * @param Ctor - <zh/> 图形类型 | <en/> shape type
   * @param style - <zh/> 图形样式。若要删除图形，传入 false | <en/> shape style. Pass false to remove the shape
   * @param container - <zh/> 容器 | <en/> container
   * @param hooks - <zh/> 钩子函数 | <en/> hooks
   * @returns <zh/> 图形实例 | <en/> shape instance
   */
  protected upsert<T extends DisplayObject>(
    className: string,
    Ctor: string | { new (...args: any[]): T },
    style: T['attributes'] | false,
    container: DisplayObject,
    hooks?: UpsertHooks,
  ): T | undefined {
    const target = this.shapeMap[className] as T | undefined;
    // remove
    // 如果 style 为 false，则删除图形 / remove shape if style is false
    if (style === false) {
      if (target) {
        hooks?.beforeDestroy?.(target);
        container.removeChild(target);
        delete this.shapeMap[className];
        hooks?.afterDestroy?.(target);
      }
      return;
    }

    const _Ctor = typeof Ctor === 'string' ? getExtension(ExtensionCategory.SHAPE, Ctor) : Ctor;

    if (!_Ctor) {
      throw new Error(format(`Shape ${Ctor} not found`));
    }

    // create
    if (!target || target.destroyed || !(target instanceof _Ctor)) {
      if (target) {
        hooks?.beforeDestroy?.(target);
        target?.destroy();
        hooks?.afterDestroy?.(target);
      }

      hooks?.beforeCreate?.();
      const instance = new _Ctor({ className, style });
      container.appendChild(instance);
      this.shapeMap[className] = instance;
      hooks?.afterCreate?.(instance);
      return instance as T;
    }

    // update
    hooks?.beforeUpdate?.(target);
    updateStyle(target, style);
    hooks?.afterUpdate?.(target);

    return target;
  }

  /**
   * <zh/> 使用 transform 更新图形位置
   *
   * <en/> Update the position of the shape using transform
   * @param attributes - <zh/> 样式属性 | <en/> style attributes
   */
  protected transformPosition(attributes: Partial<StyleProps>) {
    // Use `transform: translate3d()` instead of `x/y/z`
    if ('x' in attributes || 'y' in attributes || 'z' in attributes) {
      const { x = 0, y = 0, z = 0, transform } = attributes as any;
      const newTransform = replaceTranslateInTransform(+x, +y, +z, transform);
      if (newTransform) this.style.transform = newTransform;
    }
  }

  public update(attr: Partial<StyleProps> = {}): void {
    const attributes = Object.assign({}, this.attributes, attr) as Required<StyleProps>;
    this.attr(attributes);
    this.render(attributes, this);
    this.transformPosition(attributes);
    this.setVisibility();
  }

  /**
   * <zh/> 在初始化时会被自动调用
   *
   * <en/> will be called automatically when initializing
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
   * @param style - <zh/> 属性对象 | <en/> attribute object
   * @returns <zh/> 仅包含样式属性的对象 | <en/> An object containing only the style properties.
   */
  public getGraphicStyle<T extends Record<string, any>>(
    style: T,
  ): Omit<T, 'x' | 'y' | 'z' | 'transform' | 'transformOrigin' | 'className' | 'class' | 'zIndex' | 'visibility'> {
    return getSubShapeStyle(style);
  }

  /**
   * Get the prefix pairs for composite shapes used to handle animation
   * @returns tuples array where each tuple contains a key corresponding to a method `get${key}Style` and its shape prefix
   * @internal
   */
  protected get compositeShapes(): [string, string][] {
    return [
      ['badges', 'badge-'],
      ['ports', 'port-'],
    ];
  }

  public animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions): IAnimation | null {
    if (keyframes.length === 0) return null;
    const animationMap: IAnimation[] = [];

    // 如果 keyframes 中存在 x/y/z ，替换为 transform
    // if x/y/z exists in keyframes, replace them with transform
    if (keyframes[0].x !== undefined || keyframes[0].y !== undefined || keyframes[0].z !== undefined) {
      const { x: _x = 0, y: _y = 0, z: _z = 0 } = this.attributes as Record<string, any>;
      keyframes.forEach((keyframe) => {
        const { x = _x, y = _y, z = _z } = keyframe;
        Object.assign(keyframe, { transform: z ? [['translate3d', x, y, z]] : [['translate', x, y]] });
      });
    }

    const result = super.animate(keyframes, options);
    if (result) {
      releaseAnimation(this, result);
      animationMap.push(result);
    }

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
            if (result) {
              releaseAnimation(shape, result);
              animationMap.push(result);
            }
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
                  if (result) {
                    releaseAnimation(shape, result);
                    animationMap.push(result);
                  }
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
    setVisibility(this, visibility, true);
  }

  public destroy(): void {
    this.shapeMap = {};
    this.animateMap = {};
    super.destroy();
  }
}

/**
 * <zh/> 释放动画
 *
 * <en/> Release animation
 * @param target - <zh/> 目标对象 | <en/> target object
 * @param animation - <zh/> 动画实例 | <en/> animation instance
 * @description see: https://github.com/antvis/G/issues/1731
 */
function releaseAnimation(target: DisplayObject, animation: IAnimation) {
  animation?.finished.then(() => {
    // @ts-expect-error private property
    const index = target.activeAnimations.findIndex((_) => _ === animation);
    // @ts-expect-error private property
    if (index > -1) target.activeAnimations.splice(index, 1);
  });
}

/**
 * <zh/> 图形 upsert 方法生命周期钩子
 *
 * <en/> Shape upsert method lifecycle hooks
 */
export interface UpsertHooks {
  /**
   * <zh/> 图形创建前
   *
   * <en/> Before creating the shape
   */
  beforeCreate?: () => void;
  /**
   * <zh/> 图形创建后
   *
   * <en/> After creating the shape
   * @param instance - <zh/> 图形实例 | <en/> shape instance
   */
  afterCreate?: (instance: DisplayObject) => void;
  /**
   * <zh/> 图形更新前
   *
   * <en/> Before updating the shape
   * @param instance - <zh/> 图形实例 | <en/> shape instance
   */
  beforeUpdate?: (instance: DisplayObject) => void;
  /**
   * <zh/> 图形更新后
   *
   * <en/> After updating the shape
   * @param instance - <zh/> 图形实例 | <en/> shape instance
   */
  afterUpdate?: (instance: DisplayObject) => void;
  /**
   * <zh/> 图形销毁前
   *
   * <en/> Before destroying the shape
   * @param instance - <zh/> 图形实例 | <en/> shape instance
   */
  beforeDestroy?: (instance: DisplayObject) => void;
  /**
   * <zh/> 图形销毁后
   *
   * <en/> After destroying the shape
   * @param instance - <zh/> 图形实例 | <en/> shape instance
   */
  afterDestroy?: (instance: DisplayObject) => void;
}
