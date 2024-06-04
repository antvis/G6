import { AABB, BaseStyleProps, DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { isFunction } from '@antv/util';
import { COMBO_KEY } from '../../constants';
import type {
  CollapsedMarkerStyleProps,
  ID,
  NodeLikeData,
  Padding,
  Position,
  Prefix,
  STDSize,
  Size,
} from '../../types';
import { getBBoxHeight, getBBoxWidth, getCombinedBBox, getExpandedBBox } from '../../utils/bbox';
import { idOf } from '../../utils/id';
import { parsePadding } from '../../utils/padding';
import { getXYByPlacement, positionOf } from '../../utils/position';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import { mergeOptions } from '../../utils/style';
import { add, divide } from '../../utils/vector';
import type { BaseNodeStyleProps } from '../nodes';
import { BaseNode } from '../nodes';
import { Icon, IconStyleProps } from '../shapes';

/**
 * <zh/> 组合通用样式配置项
 *
 * <en/> Common style props for combo
 */
export interface BaseComboStyleProps
  extends BaseNodeStyleProps,
    Prefix<'collapsed', BaseStyleProps>,
    Prefix<'collapsedMarker', CollapsedMarkerStyleProps> {
  /**
   * <zh/> 组合展开后的默认大小
   *
   * <en/> The default size of combo when expanded
   */
  size?: Size;
  /**
   * <zh/> 组合收起后的默认大小
   *
   * <en/> The default size of combo when collapsed
   */
  collapsedSize?: Size;
  /**
   * <zh/> 组合的子元素，可以是节点或者组合
   *
   * <en/> The children of combo, which can be nodes or combos
   */
  childrenNode?: ID[];
  /**
   * <zh/> 组合的子元素数据
   *
   * <en/> The data of the children of combo
   * @remarks
   * <zh/> 如果组合是收起状态，children 可能为空，通过 childrenData 能够获取完整的子元素数据
   *
   * <en/> If the combo is collapsed, children may be empty, and the complete child element data can be obtained through childrenData
   */
  childrenData?: NodeLikeData[];
  /**
   * <zh/> 组合的内边距，只在展开状态下生效
   *
   * <en/> The padding of combo, only effective when expanded
   */
  padding?: Padding;
  /**
   * <zh/> 组合收起时是否显示标记
   *
   * <en/> Whether to show the marker when the combo is collapsed
   */
  collapsedMarker?: boolean;
}

/**
 * <zh/> 组合元素的基类
 *
 * <en/> Base class of combo
 * @remarks
 * <zh/> 自定义组合时，推荐使用这个类作为基类。这样，用户只需要专注于实现 keyShape 的绘制逻辑
 *
 * <en/> When customizing a combo, it is recommended to use this class as the base class. In this way, users only need to focus on the logic of drawing keyShape
 */
export abstract class BaseCombo<S extends BaseComboStyleProps = BaseComboStyleProps> extends BaseNode<S> {
  public type = 'combo';

  static defaultStyleProps: Partial<BaseComboStyleProps> = {
    childrenNode: [],
    droppable: true,
    draggable: true,
    collapsed: false,
    collapsedSize: 32,
    collapsedMarker: true,
    collapsedMarkerZIndex: 1,
    collapsedMarkerFontSize: 12,
    collapsedMarkerTextAlign: 'center',
    collapsedMarkerTextBaseline: 'middle',
    collapsedMarkerType: 'child-count',
  };
  constructor(options: DisplayObjectConfig<BaseComboStyleProps>) {
    super(mergeOptions({ style: BaseCombo.defaultStyleProps }, options));
  }

  /**
   * Draw the key shape of combo
   */
  protected abstract drawKeyShape(attributes: Required<S>, container: Group): DisplayObject | undefined;

  protected getKeySize(attributes: Required<S>): STDSize {
    const { collapsed, childrenNode = [] } = attributes;
    if (childrenNode.length === 0) return this.getEmptyKeySize(attributes);
    return collapsed ? this.getCollapsedKeySize(attributes) : this.getExpandedKeySize(attributes);
  }

  protected getEmptyKeySize(attributes: Required<S>): STDSize {
    const { padding, collapsedSize } = attributes;
    const [top, right, bottom, left] = parsePadding(padding);
    return add(parseSize(collapsedSize), [left + right, top + bottom, 0]) as STDSize;
  }

  protected getCollapsedKeySize(attributes: Required<S>): STDSize {
    return parseSize(attributes.collapsedSize);
  }

  protected getExpandedKeySize(attributes: Required<S>): STDSize {
    const contentBBox = this.getContentBBox(attributes);
    return [getBBoxWidth(contentBBox), getBBoxHeight(contentBBox), 0];
  }

  protected getContentBBox(attributes: Required<S>): AABB {
    const { context, childrenNode = [], padding } = attributes;
    const childrenBBox = getCombinedBBox(
      childrenNode.map((id) => context!.element!.getElement(id)).map((child) => child!.getBounds()),
    );

    if (!padding) return childrenBBox;

    return getExpandedBBox(childrenBBox, padding);
  }

  protected drawCollapsedMarkerShape(attributes: Required<S>, container: Group): void {
    this.upsert('collapsed-marker', Icon, this.getCollapsedMarkerStyle(attributes), container);
  }

  protected getCollapsedMarkerStyle(attributes: Required<S>): IconStyleProps | false {
    if (!attributes.collapsed || !attributes.collapsedMarker) return false;

    const { type, ...collapsedMarkerStyle } = subStyleProps<CollapsedMarkerStyleProps>(
      this.getGraphicStyle(attributes),
      'collapsedMarker',
    );
    const keyShape = this.getShape('key');
    const [x, y] = getXYByPlacement(keyShape.getLocalBounds(), 'center');

    const style = { ...collapsedMarkerStyle, x, y };

    if (type) {
      const text = this.getCollapsedMarkerText(type, attributes);
      Object.assign(style, { text });
    }

    return style;
  }

  protected getCollapsedMarkerText(type: CollapsedMarkerStyleProps['type'], attributes: Required<S>): string {
    const { context, childrenData = [] } = attributes;
    const { model } = context!;

    if (type === 'descendant-count') return model.getDescendantsData(this.id).length.toString();
    if (type === 'child-count') return childrenData.length.toString();
    if (type === 'node-count')
      return model
        .getDescendantsData(this.id)
        .filter((datum) => model.getElementType(idOf(datum)) === 'node')
        .length.toString();
    if (isFunction(type)) return type(childrenData);
    return '';
  }

  protected getComboZIndex(attributes: Required<S>): number {
    const ancestors = attributes.context!.model.getAncestorsData(this.id, COMBO_KEY) || [];
    return ancestors.length;
  }

  public getComboPosition(attributes: Required<S>): Position {
    const { x = 0, y = 0, collapsed, context, childrenData = [] } = attributes;

    if (childrenData.length === 0) return [+x, +y, 0];

    if (collapsed) {
      const { model } = context!;
      const descendants = model.getDescendantsData(this.id).filter((datum) => !model.isCombo(idOf(datum)));

      if (descendants.length > 0) {
        // combo 被收起，返回平均中心位置 / combo is collapsed, return the average center position
        const totalPosition = descendants.reduce((acc, datum) => add(acc, positionOf(datum)), [0, 0, 0] as Position);
        return divide(totalPosition, descendants.length);
      }
      // empty combo
      return [+x, +y, 0];
    }

    return this.getContentBBox(attributes).center;
  }

  protected getComboStyle(attributes: Required<S>) {
    const { zIndex = this.getComboZIndex(attributes) } = attributes;
    const [x, y] = this.getComboPosition(attributes);
    // x/y will be used to calculate position later.
    return { x, y, transform: `translate(${x}, ${y})`, zIndex };
  }

  protected updateComboPosition(attributes: Required<S>) {
    const comboStyle = this.getComboStyle(attributes);
    Object.assign(this.style, comboStyle);

    // Sync combo position to model
    attributes.context!.model.syncComboDatum({ id: this.id, style: comboStyle });
  }

  public render(attributes: Required<S>, container: Group = this) {
    super.render(attributes, container);
    this.updateComboPosition(attributes);

    // collapsed marker
    this.drawCollapsedMarkerShape(attributes, container);
  }

  protected hostingAnimation = false;

  protected onframe() {
    super.onframe();
    // 收起状态下，通过动画来更新位置
    // Update position through animation in collapsed state
    if (!this.attributes.collapsed) this.updateComboPosition(this.parsedAttributes);
    this.drawKeyShape(this.parsedAttributes, this);
  }

  public animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions) {
    const animation = super.animate(
      this.attributes.collapsed
        ? keyframes
        : // 如果当前 combo 是展开状态，则动画不受 x, y, z, transform 影响，仅由子元素决定位置
          // If the current combo is in the expanded state, the animation is not affected by x, y, z, transform, and the position is determined only by the child elements
          keyframes.map(({ x, y, z, transform, ...keyframe }: any) => keyframe),
      options,
    );

    if (!animation) return animation;

    return new Proxy(animation, {
      set: (target, propKey, value) => {
        if (propKey === 'currentTime') Promise.resolve().then(() => this.onframe());
        return Reflect.set(target, propKey, value);
      },
    });
  }
}
