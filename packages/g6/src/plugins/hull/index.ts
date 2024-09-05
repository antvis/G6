import { PathArray, isEqual, isFunction } from '@antv/util';
import hull from 'hull.js';
import { GraphEvent } from '../../constants';
import type { ContourStyleProps } from '../../elements/shapes';
import { Contour } from '../../elements/shapes';
import type { RuntimeContext } from '../../runtime/types';
import type { ID, Point } from '../../types';
import type { ElementLifeCycleEvent } from '../../utils/event';
import { idOf } from '../../utils/id';
import { positionOf } from '../../utils/position';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { computeHullPath } from './util';

/**
 * <zh/> Hull 配置项
 *
 * <en/> Hull options
 */
export interface HullOptions extends BasePluginOptions, ContourStyleProps {
  /**
   * <zh/> Hull 内的元素
   *
   * <en/> Elements in Hull
   */
  members?: ID[];
  /**
   * <zh/> 凹度，数值越大凹度越小；默认为 Infinity 代表为 Convex Hull
   *
   * <en/> Concavity. Default is Infinity, which means Convex Hull
   * @defaultValue Infinity
   */
  concavity?: number;
  /**
   * <zh/> 内边距
   *
   * <en/> Padding
   * @defaultValue 10
   */
  padding?: number;
  /**
   * <zh/> 拐角类型
   *
   * <en/> Corner type
   * @defaultValue 'rounded'
   */
  corner?: 'rounded' | 'smooth' | 'sharp';
}

/**
 * <zh/> 轮廓
 *
 * <en/> Hull
 * @remarks
 * <zh/> 轮廓包围（Hull）用于处理和表示一组点的凸多边形包围盒。轮廓包围分为两种形态：凸包和凹包。
 *
 * <zh/> 凸包（Convex Hull）：这是一个凸多边形，它包含所有的点，并且没有任何凹陷。你可以将其想象为一组点的最小包围盒，没有任何点在这个多边形的外部。
 *
 * <zh/> 凹包（Concave Hull）：这是一个凹多边形，它同样包含所有的点，但是可能会有凹陷。凹包的凹陷程度由 concavity 参数控制。concavity 越大，凹陷越小。当 concavity 为 Infinity 时，凹包就变成了凸包。
 *
 * <en/> Hull is used to process and represent the convex polygon bounding box of a set of points. Hull has two forms: convex hull and concave hull.
 *
 * <en/>  Convex Hull: This is a convex polygon that contains all points and has no concave. You can think of it as the smallest bounding box of a set of points, with no points outside the polygon.
 *
 *  <en/>  Concave Hull: This is a concave polygon that also contains all points, but may have concave. The concavity of the concave hull is controlled by the concavity parameter. The larger the concavity, the smaller the concave. When concavity is Infinity, the concave hull becomes a convex hull.
 */
export class Hull extends BasePlugin<HullOptions> {
  private shape!: Contour;
  /**
   * <zh/> 在 Hull 上的元素
   *
   * <en/> Element Ids on Hull
   */
  private hullMemberIds: ID[] = [];
  /**
   * <zh/> Hull 绘制路径
   *
   * <en/> Hull path
   */
  private path!: PathArray;

  private optionsCache!: HullOptions;

  static defaultOptions: Partial<HullOptions> = {
    members: [],
    padding: 10,
    corner: 'rounded',
    concavity: Infinity,
    /** hull style */
    fill: 'lightblue',
    fillOpacity: 0.2,
    labelOpacity: 1,
    stroke: 'blue',
    strokeOpacity: 0.2,
  };

  constructor(context: RuntimeContext, options: HullOptions) {
    super(context, Object.assign({}, Hull.defaultOptions, options));

    this.bindEvents();
  }

  private bindEvents() {
    this.context.graph.on(GraphEvent.AFTER_RENDER, this.drawHull);
    this.context.graph.on(GraphEvent.AFTER_ELEMENT_UPDATE, this.updateHullPath);
  }

  private getHullStyle(forceUpdate?: boolean): ContourStyleProps {
    const { members, padding, corner, ...style } = this.options;
    return { ...style, d: this.getHullPath(forceUpdate) };
  }

  private drawHull = () => {
    if (!this.shape) {
      this.shape = new Contour({ style: this.getHullStyle() });
      this.context.canvas.appendChild(this.shape);
    } else {
      const forceUpdate = !isEqual(this.optionsCache, this.options);
      this.shape.update(this.getHullStyle(forceUpdate));
    }
    this.optionsCache = { ...this.options };
  };

  private updateHullPath = (event: ElementLifeCycleEvent) => {
    if (!this.shape) return;
    if (!this.options.members.includes(idOf(event.data))) return;
    this.shape.update({ d: this.getHullPath(true) });
  };

  private getHullPath = (forceUpdate = false): string | PathArray => {
    const { graph } = this.context;
    const members = this.getMember();
    if (members.length === 0) return '';

    const data = members.map((id) => graph.getNodeData(id));
    const vertices = hull(data.map(positionOf), this.options.concavity).slice(1).reverse() as Point[];
    const hullMemberIds = vertices.flatMap((point) => data.filter((m) => isEqual(positionOf(m), point)).map(idOf));
    if (isEqual(hullMemberIds, this.hullMemberIds) && !forceUpdate) return this.path;
    this.hullMemberIds = hullMemberIds;
    this.path = computeHullPath(vertices, this.getPadding(), this.options.corner);
    return this.path;
  };

  private getPadding() {
    const { graph } = this.context;

    const memberPadding = this.hullMemberIds.reduce((acc: number, id: ID) => {
      const { halfExtents } = graph.getElementRenderBounds(id);
      const size = Math.max(halfExtents[0], halfExtents[1]);
      return Math.max(acc, size);
    }, 0);

    return memberPadding + this.options.padding;
  }

  /**
   * <zh/> 添加 Hull 成员
   *
   * <en/> Add Hull member
   * @param members - <zh/> 元素 Ids | <en/> Element Ids
   */
  public addMember(members: ID | ID[]) {
    const membersToAdd = Array.isArray(members) ? members : [members];
    this.options.members = [...new Set([...this.options.members, ...membersToAdd])];
    this.shape.update({ d: this.getHullPath() });
  }

  /**
   * <zh/> 移除 Hull 成员
   *
   * <en/> Remove Hull member
   * @param members - <zh/> 元素 Ids | <en/> Element Ids
   */
  public removeMember(members: ID | ID[]) {
    const membersToRemove = Array.isArray(members) ? members : [members];
    this.options.members = this.options.members.filter((id) => !membersToRemove.includes(id));
    if (membersToRemove.some((id) => this.hullMemberIds.includes(id))) {
      this.shape.update({ d: this.getHullPath() });
    }
  }

  /**
   * <zh/> 更新 Hull 成员
   *
   * <en/> Update Hull member
   * @param members - <zh/> 元素 Ids | <en/> Element Ids
   */
  public updateMember(members: ID[] | ((prev: ID[]) => ID[])) {
    this.options.members = isFunction(members) ? members(this.options.members) : members;
    this.shape.update(this.getHullStyle(true));
  }

  /**
   * <zh/> 获取 Hull 成员
   *
   * <en/> Get Hull member
   * @returns <zh/> 元素 Ids | <en/> Element Ids
   */
  public getMember() {
    return this.options.members;
  }

  /**
   * <zh/> 销毁 Hull
   *
   * <en/> Destroy Hull
   * @internal
   */
  public destroy(): void {
    this.context.graph.off(GraphEvent.AFTER_DRAW, this.drawHull);
    this.shape.destroy();
    this.hullMemberIds = [];
    super.destroy();
  }
}
