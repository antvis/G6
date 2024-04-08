import type { ID } from '@antv/graphlib';
import { isEqual, isFunction } from '@antv/util';
import { GraphEvent } from '../../constants';
import type { RuntimeContext } from '../../runtime/types';
import type { ComboData, NodeData } from '../../spec';
import type { CallableValue, ElementDatum } from '../../types';
import { idOf } from '../../utils/id';
import { deduplicate, sortByX } from '../../utils/point';
import { positionOf } from '../../utils/position';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import type { BubblesetsOptions } from './bubblesets';
import { genBubbleSetPath } from './bubblesets';
import type { ConvexHullOptions } from './convexhull';
import { convexHull, genConvexHullPath } from './convexhull';
import type { HullStyleProps } from './shape';
import { Hull as HullShape } from './shape';

export interface HullOptions extends BasePluginOptions, HullStyleProps, ConvexHullOptions, BubblesetsOptions {
  hullType?: 'bubble-sets' | 'convex-hull';
  padding?: number;
  members?: ID[];
  nonMembers?: ID[];
}

export class Hull extends BasePlugin<HullOptions> {
  private shape!: HullShape;
  /**
   * <zh/> 在 Hull 上及内部的元素
   * <en/> Elements on and inside Hull
   */
  private members: (NodeData | ComboData)[] = [];
  /**
   * <zh/> 在 Hull 上的元素
   * <en/> Element Ids on Hull
   */
  private hullMemberIds: ID[] = [];
  /**
   * <zh/> 不在 hull 内的元素
   * <en/> Elements not in Hull
   */
  private nonMembers: (NodeData | ComboData)[] = [];

  static defaultOptions: Partial<HullOptions> = {
    hullType: 'convex-hull',
    members: [],
    nonMembers: [], // only valid for `bubble-sets`
    padding: 10, // only valid for `convex-hull`
    cornerType: 'rounded', // only valid for `convex-hull`
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

  private getHullStyle(): HullStyleProps {
    const { hullType, members, nonMembers, padding, cornerType, ...style } = this.options;
    return { ...style, path: this.genHullPath() };
  }

  private drawHull = () => {
    this.shape = new HullShape({
      style: this.getHullStyle(),
    });
    this.context.canvas.appendChild(this.shape);
  };

  private updateHullPath = ({ data: datum }: { data: ElementDatum }) => {
    if (this.hullMemberIds.includes(idOf(datum))) {
      this.shape.update({ path: this.genHullPath() });
    }
  };

  private genHullPath = () => {
    const { graph } = this.context;

    this.members = this.options.members.map((id) => graph.getNodeData(id));
    this.nonMembers = this.options.nonMembers.map((id) => graph.getNodeData(id));

    if (this.options.hullType === 'convex-hull') {
      const points = deduplicate(sortByX(this.members.map(positionOf)));
      const convex = convexHull(points);
      this.hullMemberIds = convex.flatMap((point) =>
        this.members.filter((m) => isEqual(positionOf(m), point)).map(idOf),
      );
      return genConvexHullPath(convex, this.parsePadding(), this.options.cornerType);
    } else {
      return genBubbleSetPath(graph, this.members, this.nonMembers, this.options);
    }
  };

  private parsePadding() {
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
    this.shape.update({ path: this.genHullPath() });
  }

  public removeMembers(members: ID | ID[]) {
    const membersToRemove = Array.isArray(members) ? members : [members];
    this.options.members = this.options.members.filter((id) => !membersToRemove.includes(id));
    this.shape.update({ path: this.genHullPath() });
  }

  public updateMembers(members: CallableValue<ID[]>) {
    this.options.members = isFunction(members) ? members(this.options.members) : members;
    this.shape.update({ path: this.genHullPath() });
  }

  public updateOptions(options: CallableValue<HullOptions>) {
    this.options = (isFunction(options) ? options(this.options) : options) as Required<HullOptions>;
    this.shape.update(this.getHullStyle());
  }

  public destroy(): void {
    this.context.graph.off(GraphEvent.AFTER_DRAW, this.drawHull);
    this.shape.destroy();
    this.members = [];
    this.hullMemberIds = [];
    this.nonMembers = [];
    super.destroy();
  }
}
