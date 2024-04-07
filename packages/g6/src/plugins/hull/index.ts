import type { BaseStyleProps, TextStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { isEqual } from '@antv/util';
import { GraphEvent } from '../../constants';
import type { RuntimeContext } from '../../runtime/types';
import type { ComboData, NodeData } from '../../spec';
import type { PrefixObject } from '../../types';
import { idOf } from '../../utils/id';
import { deduplicate, sortByX } from '../../utils/point';
import { positionOf } from '../../utils/position';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import type { BubblesetsOptions } from './bubblesets';
import { genBubbleSetPath } from './bubblesets';
import type { ConvexHullOptions } from './convexhull';
import { convexHull, genConvexHullPath } from './convexhull';

export interface HullOptions
  extends BasePluginOptions,
    BaseStyleProps,
    PrefixObject<TextStyleProps, 'label'>,
    ConvexHullOptions,
    BubblesetsOptions {
  label?: boolean;
  padding?: number;
  members: ID[];
  nonMembers?: ID[];
  hullType?: 'bubble-sets' | 'convex-hull';
}

export class Hull extends BasePlugin<HullOptions> {
  /**
   * <zh/> 在 Hull 上及内部的元素
   * <en/> Elements on and inside Hull
   */
  private members: (NodeData | ComboData)[] = [];
  /**
   * <zh/> 在 Hull 上的元素
   * <en/> Elements on Hull
   */
  private hullMemberIds: ID[] = [];
  /**
   * <zh/> 不在 hull 内的元素
   * <en/> Elements not in Hull
   */
  private nonMembers: (NodeData | ComboData)[] = [];

  static defaultOptions: Partial<HullOptions> = {
    hullType: 'bubble-sets',
    padding: 0,
    members: [],
    nonMembers: [],
    cornerType: 'rounded', // just for `convex-hull`
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
  }

  private drawHull = () => {
    const { graph } = this.context;

    this.members = this.options.members.map((id) => graph.getNodeData(id));
    this.nonMembers = this.options.nonMembers.map((id) => graph.getNodeData(id));

    const path = this.genHullPath();
    this.context.canvas.appendChild(
      new Path({
        style: {
          path,
          ...this.options,
        },
      }),
    );
  };

  private genHullPath = () => {
    if (this.options.hullType === 'convex-hull') {
      const points = deduplicate(sortByX(this.members.map(positionOf)));
      const convex = convexHull(points);
      this.hullMemberIds = convex.flatMap((point) =>
        this.members.filter((m) => isEqual(positionOf(m), point)).map(idOf),
      );
      return genConvexHullPath(convex, this.parsePadding(), this.options.cornerType);
    } else {
      return genBubbleSetPath(this.context.graph, this.members, this.nonMembers, this.options);
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

  /**
   * <zh/> 判断目标元素是否在轮廓的范围内
   * <en/> Whether a node/edge is inside the range of the hull
   * @param itemId - <zh/> 元素 ID | <en/> item ID
   * @returns <zh/> 是否在轮廓内 | <en/> Whether the item is inside the hull
   */
  public contains(itemId: ID): boolean {
    return false;
  }

  public destroy(): void {
    this.context.graph.off(GraphEvent.AFTER_DRAW, this.drawHull);
    super.destroy();
  }
}
