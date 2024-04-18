import type { ID } from '@antv/graphlib';
import type { PathArray } from '@antv/util';
import { deepMix, isEqual, isFunction } from '@antv/util';
import type { IBubbleSetOptions, ILine, IRectangle } from 'bubblesets-js';
import { BubbleSets as BubbleSetsJS, Line, Rectangle, defaultOptions } from 'bubblesets-js';
import { GraphEvent } from '../constants';
import type { ContourStyleProps } from '../elements/shapes';
import { Contour } from '../elements/shapes';
import type { Graph } from '../runtime/graph';
import type { RuntimeContext } from '../runtime/types';
import type { CallableValue } from '../types';
import { getBBoxHeight, getBBoxWidth } from '../utils/bbox';
import { arrayDiff } from '../utils/diff';
import type { ElementLifeCycleEvent } from '../utils/event';
import { idOf } from '../utils/id';
import { getClosedSpline } from '../utils/path';
import { parsePoint } from '../utils/point';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

export interface BubbleSetsOptions extends BasePluginOptions, IBubbleSetOptions, ContourStyleProps {
  /**
   * <zh/> 成员元素，包括节点和边
   *
   * <en/> Member elements, including nodes and edges
   */
  members: ID[];
  /**
   * <zh/> 非成员元素，仅包括节点
   *
   * <en/> Non-member elements, only nodes
   */
  avoidMembers?: ID[];
}

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
    stroke: 'blue',
    opacity: 0.2,
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

    const finalStyle = { ...style, path: this.getPath() };
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
    this.shape.update({ ...this.parseOptions().style, path: this.getPath(id) });
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

  public addMember(members: ID | ID[]) {
    const membersToAdd = Array.isArray(members) ? members : [members];
    if (membersToAdd.some((member) => this.options.avoidMembers.includes(member))) {
      this.options.avoidMembers = this.options.avoidMembers.filter((id) => !membersToAdd.includes(id));
    }
    this.options.members = [...new Set([...this.options.members, ...membersToAdd])];
    this.drawBubbleSets();
  }

  public removeMember(members: ID | ID[]) {
    const membersToRemove = Array.isArray(members) ? members : [members];
    this.options.members = this.options.members.filter((id) => !membersToRemove.includes(id));
    this.drawBubbleSets();
  }

  public updateMember(members: CallableValue<ID[]>) {
    this.options.members = isFunction(members) ? members(this.options.members) : members;
    this.drawBubbleSets();
  }

  public getMember() {
    return this.options.members;
  }

  public addAvoidMember(avoidMembers: ID | ID[]) {
    const avoidMembersToAdd = Array.isArray(avoidMembers) ? avoidMembers : [avoidMembers];
    if (avoidMembersToAdd.some((AvoidMember) => this.options.members.includes(AvoidMember))) {
      this.options.members = this.options.members.filter((id) => !avoidMembersToAdd.includes(id));
    }
    this.options.avoidMembers = [...new Set([...this.options.avoidMembers, ...avoidMembersToAdd])];
    this.drawBubbleSets();
  }

  public removeAvoidMember(avoidMembers: ID | ID[]) {
    const avoidMembersToRemove = Array.isArray(avoidMembers) ? avoidMembers : [avoidMembers];
    if (this.options.avoidMembers.some((member) => avoidMembersToRemove.includes(member))) {
      this.options.avoidMembers = this.options.avoidMembers.filter((id) => !avoidMembersToRemove.includes(id));
      this.drawBubbleSets();
    }
  }

  public updateAvoidMember(avoidMembers: ID | ID[]) {
    this.options.avoidMembers = Array.isArray(avoidMembers) ? avoidMembers : [avoidMembers];
    this.drawBubbleSets();
  }

  public getAvoidMember() {
    return this.options.avoidMembers;
  }

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
