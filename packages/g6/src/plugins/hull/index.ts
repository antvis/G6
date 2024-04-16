import type { ID } from '@antv/graphlib';
import { PathArray, isEqual, isFunction } from '@antv/util';
import hull from 'hull.js';
import { GraphEvent } from '../../constants';
import type { AnnotatedPathStyleProps } from '../../elements/shapes';
import { AnnotatedPath } from '../../elements/shapes';
import type { RuntimeContext } from '../../runtime/types';
import type { CallableValue, Point } from '../../types';
import type { ElementLifeCycleEvent } from '../../utils/event';
import { idOf } from '../../utils/id';
import { positionOf } from '../../utils/position';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { computeHullPath } from './util';

export interface HullOptions extends BasePluginOptions, AnnotatedPathStyleProps {
  /**
   * <zh/> Hull 内的元素
   * <en/> Elements in Hull
   */
  members?: ID[];
  /**
   * <zh/> 凹度，数值越大凹度越小；默认为 Infinity 代表为 Convex Hull
   * <en/> Concavity. Default is Infinity, which means Convex Hull
   */
  concavity?: number;
  /**
   * <zh/> 内边距，默认为 10
   * <en/> Padding, default is 10
   */
  padding?: number;
  /**
   * <zh/> 拐角类型，目前支持 'rounded'、'smooth' 和 'sharp'
   * <en/> Corner type, currently supports 'rounded', 'smooth' and 'sharp'
   */
  corner?: 'rounded' | 'smooth' | 'sharp';
}

export class Hull extends BasePlugin<HullOptions> {
  private shape!: AnnotatedPath;
  /**
   * <zh/> 在 Hull 上的元素
   * <en/> Element Ids on Hull
   */
  private hullMemberIds: ID[] = [];
  /**
   * <zh/> Hull 绘制路径
   * <en/> Hull path
   */
  private path!: PathArray;
  /**
   * <zh> 是否初次渲染完成
   * <en> Whether the first rendering is completed
   */
  private firstRender = false;

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

  private getHullStyle(forceUpdate?: boolean): AnnotatedPathStyleProps {
    const { members, padding, corner, ...style } = this.options;
    return { ...style, path: this.getHullPath(forceUpdate) };
  }

  private drawHull = () => {
    this.shape = new AnnotatedPath({ style: this.getHullStyle() });
    this.context.canvas.appendChild(this.shape);
    this.firstRender = true;
  };

  private updateHullPath = (event: ElementLifeCycleEvent) => {
    if (!this.firstRender) return;
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

  public addMembers(members: ID | ID[]) {
    const membersToAdd = Array.isArray(members) ? members : [members];
    this.options.members = [...new Set([...this.options.members, ...membersToAdd])];
    this.shape.update({ path: this.getHullPath() });
  }

  public removeMembers(members: ID | ID[]) {
    const membersToRemove = Array.isArray(members) ? members : [members];
    this.options.members = this.options.members.filter((id) => !membersToRemove.includes(id));
    if (membersToRemove.some((id) => this.hullMemberIds.includes(id))) {
      this.shape.update({ path: this.getHullPath() });
    }
  }

  public updateMembers(members: CallableValue<ID[]>) {
    this.options.members = isFunction(members) ? members(this.options.members) : members;
    this.shape.update(this.getHullStyle(true));
  }

  public updateOptions(options: CallableValue<HullOptions>) {
    this.options = (isFunction(options) ? options(this.options) : options) as Required<HullOptions>;
    this.shape.update({ ...this.options, path: this.getHullPath(true) });
  }

  public destroy(): void {
    this.context.graph.off(GraphEvent.AFTER_DRAW, this.drawHull);
    this.shape.destroy();
    this.hullMemberIds = [];
    super.destroy();
  }
}
