import type { PathArray } from '@antv/util';
import { deepMix, isEqual, isFunction } from '@antv/util';
import type { IBubbleSetOptions, ILine, IRectangle } from 'bubblesets-js';
import { BubbleSets as BubbleSetsJS, Line, Rectangle, defaultOptions } from 'bubblesets-js';
import { GraphEvent } from '../constants';
import type { ContourStyleProps } from '../elements/shapes';
import { Contour } from '../elements/shapes';
import type { Graph } from '../runtime/graph';
import type { RuntimeContext } from '../runtime/types';
import type { ID } from '../types';
import { getBBoxHeight, getBBoxWidth } from '../utils/bbox';
import { arrayDiff } from '../utils/diff';
import type { ElementLifeCycleEvent } from '../utils/event';
import { idOf } from '../utils/id';
import { getClosedSpline } from '../utils/path';
import { parsePoint } from '../utils/point';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

/**
 * <zh/> 气泡集配置项
 *
 * <en/> BubbleSets options
 */
export interface BubbleSetsOptions extends BasePluginOptions, IBubbleSetOptions, ContourStyleProps {
  /**
   * <zh/> 成员元素，包括节点和边
   *
   * <en/> Member elements, including nodes and edges
   */
  members: ID[];
  /**
   * <zh/> 需要避开的元素，在绘制轮廓时不会包含这些元素。目前支持设置节点
   *
   * <en/> Elements to avoid, these elements will not be included when drawing the contour, currently only nodes are supported
   */
  avoidMembers?: ID[];
}

/**
 * <zh/> 气泡集
 *
 * <en/> BubbleSets
 * @remarks
 * <zh/> BubbleSets 最初由 Christopher Collins 在 2009 年的论文 "Bubble Sets: Revealing Set Relations with Isocontours over Existing Visualizations" 中提出。
 *
 * <zh/> 实现原理是通过创建一种类似于气泡的形状来表示集合。每个集合都被表示为一个独特的 "气泡"，集合中的元素被包含在这个气泡内部。如果两个集合有交集，那么这两个气泡会有重叠的部分，这个重叠的部分就表示这两个集合的交集。
 *
 * <en/> BubbleSets was originally proposed by Christopher Collins in the 2009 paper "Bubble Sets: Revealing Set Relations with Isocontours over Existing Visualizations".
 *
 * <en/> The principle is to represent sets by creating a shape similar to a bubble. Each set is represented by a unique "bubble", and the elements in the set are contained within this bubble. If two sets have an intersection, then the two bubbles will have an overlapping part, which represents the intersection of the two sets.
 */
export class BubbleSets extends BasePlugin<BubbleSetsOptions> {
  private shape!: Contour;

  private bubbleSets!: BubbleSetsJS;

  private path!: PathArray;

  private members: Map<ID, IRectangle | ILine> = new Map();

  private avoidMembers: Map<ID, IRectangle | ILine> = new Map();

  private bubbleSetOptions: IBubbleSetOptions = {};

  static defaultOptions: Partial<BubbleSetsOptions> = {
    members: [],
    avoidMembers: [],
    /** shape style */
    fill: 'lightblue',
    fillOpacity: 0.2,
    stroke: 'blue',
    strokeOpacity: 0.2,
    /** bubbleSetJS config */
    ...defaultOptions,
  };

  constructor(context: RuntimeContext, options: BubbleSetsOptions) {
    super(context, deepMix({}, BubbleSets.defaultOptions, options));

    this.bindEvents();

    this.bubbleSets = new BubbleSetsJS(this.options);
  }

  private bindEvents() {
    this.context.graph.on(GraphEvent.AFTER_RENDER, this.drawBubbleSets);
    this.context.graph.on(GraphEvent.AFTER_ELEMENT_UPDATE, this.updateBubbleSetsPath);
  }

  private init() {
    this.bubbleSets = new BubbleSetsJS(this.options);
    this.members = new Map();
    this.avoidMembers = new Map();
  }

  private parseOptions() {
    const { type, key, members, avoidMembers, ...rest } = this.options;
    const res = Object.keys(rest).reduce(
      (acc: { style: ContourStyleProps; bubbleSetOptions: IBubbleSetOptions }, key: string) => {
        if (key in defaultOptions) {
          acc.bubbleSetOptions[key as keyof IBubbleSetOptions] = rest[key];
        } else {
          acc.style[key as keyof ContourStyleProps] = rest[key];
        }
        return acc;
      },
      { style: {}, bubbleSetOptions: {} },
    );
    return { type, key, members, avoidMembers, ...res };
  }

  private drawBubbleSets = () => {
    const { style, bubbleSetOptions } = this.parseOptions();
    if (!isEqual(this.bubbleSetOptions, bubbleSetOptions)) this.init();
    this.bubbleSetOptions = { ...bubbleSetOptions };

    const finalStyle = { ...style, d: this.getPath() };
    if (!this.shape) {
      this.shape = new Contour({ style: finalStyle });
      this.context.canvas.appendChild(this.shape);
    } else {
      this.shape.update(finalStyle);
    }
  };

  private updateBubbleSetsPath = (event: ElementLifeCycleEvent) => {
    if (!this.shape) return;
    const id = idOf(event.data);
    if (![...this.options.members, ...this.options.avoidMembers].includes(id)) return;
    this.shape.update({ ...this.parseOptions().style, d: this.getPath(id) });
  };

  private getPath = (forceUpdateId?: ID): PathArray => {
    const { graph } = this.context;

    const currMembers = this.options.members;
    const prevMembers = [...this.members.keys()];
    const currAvoidMembers = this.options.avoidMembers;
    const prevAvoidMembers = [...this.avoidMembers.keys()];

    if (!forceUpdateId && isEqual(currMembers, prevMembers) && isEqual(currAvoidMembers, prevAvoidMembers))
      return this.path;

    const { enter: membersToEnter = [], exit: membersToExit = [] } = arrayDiff(prevMembers, currMembers, (d) => d);
    const { enter: avoidMembersToEnter = [], exit: avoidMembersToExit = [] } = arrayDiff(
      prevAvoidMembers,
      currAvoidMembers,
      (d) => d,
    );

    if (forceUpdateId) {
      membersToExit.push(forceUpdateId);
      membersToEnter.push(forceUpdateId);
    }

    const updateBubbleSets = (ids: ID[], isEntering: boolean, isMember: boolean) => {
      ids.forEach((id) => {
        const members = isMember ? this.members : this.avoidMembers;
        const pushMember = isMember ? 'pushMember' : 'pushNonMember';
        const removeMember = isMember ? 'removeMember' : 'removeNonMember';
        if (isEntering) {
          let area: IRectangle | ILine;
          if (graph.getElementType(id) === 'edge') {
            [area] = convertToLine(graph, id);
            this.bubbleSets.pushEdge(area);
          } else {
            [area] = convertToRectangle(graph, id);
            this.bubbleSets[pushMember](area);
          }
          members.set(id, area);
        } else {
          const area = members.get(id);
          if (area) {
            if (graph.getElementType(id) === 'edge') {
              this.bubbleSets.removeEdge(area as ILine);
            } else {
              this.bubbleSets[removeMember](area as IRectangle);
            }
            members.delete(id);
          }
        }
      });
    };

    updateBubbleSets(membersToExit, false, true);
    updateBubbleSets(membersToEnter, true, true);
    updateBubbleSets(avoidMembersToExit, false, false);
    updateBubbleSets(avoidMembersToEnter, true, false);

    const pointPath = this.bubbleSets.compute();
    const cleanPath = pointPath.sample(8).simplify(0).bSplines().simplify(0);
    this.path = getClosedSpline(cleanPath.points.map(parsePoint));
    return this.path;
  };

  /**
   * <zh/> 添加成员元素
   *
   * <en/> Add member elements
   * @param members - <zh/> 单个或多个 | <en/> single or multiple
   */
  public addMember(members: ID | ID[]) {
    const membersToAdd = Array.isArray(members) ? members : [members];
    if (membersToAdd.some((member) => this.options.avoidMembers.includes(member))) {
      this.options.avoidMembers = this.options.avoidMembers.filter((id) => !membersToAdd.includes(id));
    }
    this.options.members = [...new Set([...this.options.members, ...membersToAdd])];
    this.drawBubbleSets();
  }
  /**
   * <zh/> 移除成员元素
   *
   * <en/> Remove member elements
   * @param members - <zh/> 单个或多个 | <en/> single or multiple
   */
  public removeMember(members: ID | ID[]) {
    const membersToRemove = Array.isArray(members) ? members : [members];
    this.options.members = this.options.members.filter((id) => !membersToRemove.includes(id));
    this.drawBubbleSets();
  }
  /**
   * <zh/> 更新成员元素
   *
   * <en/> Update member elements
   * @param members - <zh/> 值或者回调函数 | <en/> value or callback function
   */
  public updateMember(members: ID[] | ((prev: ID[]) => ID[])) {
    this.options.members = isFunction(members) ? members(this.options.members) : members;
    this.drawBubbleSets();
  }
  /**
   * <zh/> 获取成员元素
   *
   * <en/> Get member elements
   * @returns <zh/> 成员元素数组 | <en/> member elements array
   */
  public getMember() {
    return this.options.members;
  }

  /**
   * <zh/> 添加需要避开的元素
   *
   * <en/> Add elements to avoid
   * @param avoidMembers - <zh/> 单个或多个 | <en/> single or multiple
   */
  public addAvoidMember(avoidMembers: ID | ID[]) {
    const avoidMembersToAdd = Array.isArray(avoidMembers) ? avoidMembers : [avoidMembers];
    if (avoidMembersToAdd.some((AvoidMember) => this.options.members.includes(AvoidMember))) {
      this.options.members = this.options.members.filter((id) => !avoidMembersToAdd.includes(id));
    }
    this.options.avoidMembers = [...new Set([...this.options.avoidMembers, ...avoidMembersToAdd])];
    this.drawBubbleSets();
  }
  /**
   * <zh/> 移除需要避开的元素
   *
   * <en/> Remove elements to avoid
   * @param avoidMembers - <zh/> 单个或多个 | <en/> single or multiple
   */
  public removeAvoidMember(avoidMembers: ID | ID[]) {
    const avoidMembersToRemove = Array.isArray(avoidMembers) ? avoidMembers : [avoidMembers];
    if (this.options.avoidMembers.some((member) => avoidMembersToRemove.includes(member))) {
      this.options.avoidMembers = this.options.avoidMembers.filter((id) => !avoidMembersToRemove.includes(id));
      this.drawBubbleSets();
    }
  }
  /**
   * <zh/> 更新需要避开的元素
   *
   * <en/> Update elements to avoid
   * @param avoidMembers - <zh/> 单个或多个 | <en/> single or multiple
   */
  public updateAvoidMember(avoidMembers: ID | ID[]) {
    this.options.avoidMembers = Array.isArray(avoidMembers) ? avoidMembers : [avoidMembers];
    this.drawBubbleSets();
  }
  /**
   * <zh/> 获取需要避开的元素
   *
   * <en/> Get elements to avoid
   * @returns avoidMembers <zh/> 成员元素数组 | <en/> member elements array
   */
  public getAvoidMember() {
    return this.options.avoidMembers;
  }
  /**
   * <zh/> 销毁
   *
   * <en/> Destroy
   * @internal
   */
  public destroy(): void {
    this.context.graph.off(GraphEvent.AFTER_RENDER, this.drawBubbleSets);
    this.context.graph.off(GraphEvent.AFTER_ELEMENT_UPDATE, this.updateBubbleSetsPath);
    this.shape.destroy();
    super.destroy();
  }
}

/**
 * <zh/> 将节点转换为 BubbleSetJS 支持的矩形
 *
 * <en/> Convert nodes to rectangles supported by BubbleSetJS
 * @param graph - <zh/> 图实例 | <en/> graph instance
 * @param ids - <zh/> 元素 ID 数组 | <en/> element ID array
 * @returns <zh/> 矩形数组 | <en/> rectangle array
 */
const convertToRectangle = (graph: Graph, ids: ID | ID[]): IRectangle[] => {
  const idArr = Array.isArray(ids) ? ids : [ids];
  return idArr.map((id) => {
    const bbox = graph.getElementRenderBounds(id);
    return new Rectangle(bbox.min[0], bbox.min[1], getBBoxWidth(bbox), getBBoxHeight(bbox));
  });
};

/**
 * <zh/> 将边转换为 BubbleSetJS 支持的线
 *
 * <en/> Convert edges to lines supported by BubbleSetJS
 * @param graph - <zh/> 图实例 | <en/> graph instance
 * @param ids - <zh/> 元素 ID 数组 | <en/> element ID array
 * @returns <zh/> 线数组 | <en/> line array
 */
const convertToLine = (graph: Graph, ids: ID | ID[]): ILine[] => {
  const idArr = Array.isArray(ids) ? ids : [ids];
  return idArr.map((id) => {
    const data = graph.getEdgeData(id);
    const source = graph.getElementPosition(data.source);
    const target = graph.getElementPosition(data.target);
    return Line.from({ x1: source[0], y1: source[1], x2: target[0], y2: target[1] });
  });
};
