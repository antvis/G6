import { PathArray, isEqual, isFunction } from '@antv/util';
import hull from 'hull.js';
import { GraphEvent } from '../../constants';
import type { ContourStyleProps } from '../../elements/shapes';
import { Contour } from '../../elements/shapes';
import type { RuntimeContext } from '../../runtime/types';
import type { CallableValue, ID, Point } from '../../types';
import type { ElementLifeCycleEvent } from '../../utils/event';
import { idOf } from '../../utils/id';
import { positionOf } from '../../utils/position';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { computeHullPath } from './util';

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
   * <zh/> 内边距，默认为 10
   *
   * <en/> Padding, default is 10
   * @defaultValue 10
   */
  padding?: number;
  /**
   * <zh/> 拐角类型，目前支持 'rounded'、'smooth' 和 'sharp'
   *
   * <en/> Corner type, currently supports 'rounded', 'smooth' and 'sharp'
   * @defaultValue 'rounded'
   */
  corner?: 'rounded' | 'smooth' | 'sharp';
}

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
    stroke: 'blue',
    opacity: 0.2,
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
    return { ...style, path: this.getHullPath(forceUpdate) };
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
    this.shape.update({ path: this.getHullPath(true) });
  };

  private getHullPath = (forceUpdate = false): PathArray => {
    const { graph } = this.context;
    const data = this.options.members.map((id) => graph.getNodeData(id));
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
    this.shape.update({ path: this.getHullPath() });
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
      this.shape.update({ path: this.getHullPath() });
    }
  }

  /**
   * <zh/> 更新 Hull 成员
   *
   * <en/> Update Hull member
   * @param members - <zh/> 元素 Ids | <en/> Element Ids
   */
  public updateMember(members: CallableValue<ID[]>) {
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
   */
  public destroy(): void {
    this.context.graph.off(GraphEvent.AFTER_DRAW, this.drawHull);
    this.shape.destroy();
    this.hullMemberIds = [];
    super.destroy();
  }
}
