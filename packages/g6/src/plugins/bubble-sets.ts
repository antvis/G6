import type { ID } from '@antv/graphlib';
import type { PathArray } from '@antv/util';
import { deepMix, isEqual, isFunction } from '@antv/util';
import type { IBubbleSetOptions, ILine, IRectangle } from 'bubblesets-js';
import { BubbleSets as BubbleSetsJS, Line, Rectangle, defaultOptions } from 'bubblesets-js';
import { GraphEvent } from '../constants';
import type { AnnotatedPathStyleProps } from '../elements/shapes';
import { AnnotatedPath } from '../elements/shapes';
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

export interface BubbleSetsOptions extends BasePluginOptions, IBubbleSetOptions, AnnotatedPathStyleProps {
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
  nonMembers?: ID[];
}

export class BubbleSets extends BasePlugin<BubbleSetsOptions> {
  private shape!: AnnotatedPath;

  private bubbleSets!: BubbleSetsJS;

  private path!: PathArray;

  private members: Map<ID, IRectangle | ILine> = new Map();

  private nonMembers: Map<ID, IRectangle | ILine> = new Map();

  private bubbleSetOptions: IBubbleSetOptions = {};

  static defaultOptions: Partial<BubbleSetsOptions> = {
    members: [],
    nonMembers: [],
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
    this.nonMembers = new Map();
  }

  private parseOptions() {
    const { type, key, members, nonMembers, ...rest } = this.options;
    const res = Object.keys(rest).reduce(
      (acc: { style: AnnotatedPathStyleProps; bubbleSetOptions: IBubbleSetOptions }, key: string) => {
        if (key in defaultOptions) {
          acc.bubbleSetOptions[key as keyof IBubbleSetOptions] = rest[key];
        } else {
          acc.style[key as keyof AnnotatedPathStyleProps] = rest[key];
        }
        return acc;
      },
      { style: {}, bubbleSetOptions: {} },
    );
    return { type, key, members, nonMembers, ...res };
  }

  private drawBubbleSets = () => {
    const { style, bubbleSetOptions } = this.parseOptions();
    if (!isEqual(this.bubbleSetOptions, bubbleSetOptions)) this.init();
    this.bubbleSetOptions = { ...bubbleSetOptions };

    const finalStyle = { ...style, path: this.getPath() };
    if (!this.shape) {
      this.shape = new AnnotatedPath({ style: finalStyle });
      this.context.canvas.appendChild(this.shape);
    } else {
      this.shape.update(finalStyle);
    }
  };

  private updateBubbleSetsPath = (event: ElementLifeCycleEvent) => {
    if (!this.shape) return;
    const id = idOf(event.data);
    if (![...this.options.members, ...this.options.nonMembers].includes(id)) return;
    this.shape.update({ ...this.parseOptions().style, path: this.getPath(id) });
  };

  private getPath = (forceUpdateId?: ID): PathArray => {
    const { graph } = this.context;

    const currMembers = this.options.members;
    const prevMembers = [...this.members.keys()];
    const currNonMembers = this.options.nonMembers;
    const prevNonMembers = [...this.nonMembers.keys()];

    if (!forceUpdateId && isEqual(currMembers, prevMembers) && isEqual(currNonMembers, prevNonMembers))
      return this.path;

    const { enter: membersToEnter = [], exit: membersToExit = [] } = arrayDiff(prevMembers, currMembers, (d) => d);
    const { enter: nonMembersToEnter = [], exit: nonMembersToExit = [] } = arrayDiff(
      prevNonMembers,
      currNonMembers,
      (d) => d,
    );

    if (forceUpdateId) {
      membersToExit.push(forceUpdateId);
      membersToEnter.push(forceUpdateId);
    }

    const updateBubbleSets = (ids: ID[], isEntering: boolean, isMember: boolean) => {
      ids.forEach((id) => {
        const members = isMember ? this.members : this.nonMembers;
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
    updateBubbleSets(nonMembersToExit, false, false);
    updateBubbleSets(nonMembersToEnter, true, false);

    const pointPath = this.bubbleSets.compute();
    const cleanPath = pointPath.sample(8).simplify(0).bSplines().simplify(0);
    this.path = getClosedSpline(cleanPath.points.map(parsePoint));
    return this.path;
  };

  public addMembers(members: ID | ID[]) {
    const membersToAdd = Array.isArray(members) ? members : [members];
    if (membersToAdd.some((member) => this.options.nonMembers.includes(member))) {
      this.sync({ nonMembers: this.options.nonMembers.filter((id) => !membersToAdd.includes(id)) }, false);
    }
    this.sync({ members: [...new Set([...this.options.members, ...membersToAdd])] });
  }

  public removeMembers(members: ID | ID[]) {
    const membersToRemove = Array.isArray(members) ? members : [members];
    this.sync({ members: this.options.members.filter((id) => !membersToRemove.includes(id)) });
  }

  public updateMembers(members: CallableValue<ID[]>) {
    const membersToUpdate = isFunction(members) ? members(this.options.members) : members;
    this.sync({ members: membersToUpdate });
  }

  public addNonMembers(nonMembers: ID | ID[]) {
    const nonMembersToAdd = Array.isArray(nonMembers) ? nonMembers : [nonMembers];
    if (nonMembersToAdd.some((nonMember) => this.options.members.includes(nonMember))) {
      this.sync({ members: this.options.members.filter((id) => !nonMembersToAdd.includes(id)) }, false);
    }
    this.sync({ nonMembers: [...new Set([...this.options.nonMembers, ...nonMembersToAdd])] });
  }

  public removeNonMembers(nonMembers: ID | ID[]) {
    const nonMembersToRemove = Array.isArray(nonMembers) ? nonMembers : [nonMembers];
    if (this.options.nonMembers.some((member) => nonMembersToRemove.includes(member))) {
      this.sync({ nonMembers: this.options.nonMembers.filter((id) => !nonMembersToRemove.includes(id)) });
    }
  }

  public updateNonMembers(nonMembers: ID | ID[]) {
    const nonMembersToUpdate = Array.isArray(nonMembers) ? nonMembers : [nonMembers];
    this.sync({ nonMembers: nonMembersToUpdate });
  }

  public updateOptions(options: Partial<BubbleSetsOptions>) {
    this.sync(options);
  }

  public destroy(): void {
    this.context.graph.off(GraphEvent.AFTER_DRAW, this.drawBubbleSets);
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
