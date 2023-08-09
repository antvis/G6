import { parsePathString } from '@antv/path-util';
import { getClosedSpline, roundedHull, paddedHull } from './util';
import { genConvexHull } from './convexHull';
import { genBubbleSet } from './bubbleset';
import { ComboModel, ID, IGraph, NodeModel } from '../../../types';
import { ShapeStyle } from '../../../types/item';
import { isPolygonsIntersect } from '../../../util/shape';
import { pathToPoints } from '../../../util/path';
import { DisplayObject } from '@antv/g';
import { BubblesetCfg } from './types';
import { isArray } from '@antv/util';

export interface HullComponentOptions {
  id: string;
  members?: ID[];
  nonMembers?: ID[];
  style?: ShapeStyle;
  padding?: number;
}

interface HullComponentFullOptions extends HullComponentOptions {
  id: string;
  members?: ID[];
  nonMembers?: ID[];
  style?: ShapeStyle;
  padding?: number;
  type?: 'bubble' | 'round-convex' | 'smooth-convex';
  /** Controlling the effect of the bubble more finely (the scaling degree of the point and edge design, setting the granularity), generally no configuration is required */
  bubbleCfg?: BubblesetCfg;
}

/**
 * The outline of the member used to wrap the interior.
 * convex hull(convex hull): http://geomalgorithms.com/a10-_hull-1.html#Monotone%20Chain
 * bubble: bubbleset algorithm, refer: http://vialab.science.uoit.ca/wp-content/papercite-data/pdf/col2009c.pdf
 * 通By configuring padding, you can adjust the tightness of the wrapping contour to the node.
 */
export default class Hull {
  graph: IGraph;

  path: any[][];

  members: (NodeModel | ComboModel)[];

  nonMembers: (NodeModel | ComboModel)[];

  padding: number;

  bubbleCfg: Partial<BubblesetCfg>;

  type: 'bubble' | 'round-convex' | 'smooth-convex';

  hullShape: DisplayObject;

  options: HullComponentFullOptions;

  constructor(graph: IGraph, options: HullComponentFullOptions) {
    const { members: memberIds = [], nonMembers: nonMemberIds = [] } = options;
    this.options = options;
    this.graph = graph;
    this.members = memberIds.map(
      (id) => graph.getNodeData(id) || graph.getComboData(id),
    );
    this.nonMembers = nonMemberIds.map(
      (id) => graph.getNodeData(id) || graph.getComboData(id),
    );
    this.setPadding();
    this.setType();

    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  }

  public getDefaultCfg(): HullComponentFullOptions {
    return {
      id: 'g6-hull',
      type: 'round-convex', // 'round-convex' /'smooth-convex' / 'bubble'
      members: [],
      nonMembers: [],
    };
  }

  setPadding() {
    let nodeSize = 30;
    if (this.members.length) {
      const firstBBox = this.graph.getRenderBBox(this.members[0].id);
      if (firstBBox) nodeSize = firstBBox.halfExtents[0];
    }
    this.padding =
      this.options.padding > 0
        ? this.options.padding + nodeSize
        : 10 + nodeSize;
    this.bubbleCfg = {
      ...this.options.bubbleCfg,
      nodeR0: this.padding - nodeSize,
      nodeR1: this.padding - nodeSize,
      morphBuffer: this.padding - nodeSize,
    };
  }

  setType() {
    this.type = this.options.type;
    if (this.members.length < 3) {
      this.type = 'round-convex';
    }
    if (
      this.type !== 'round-convex' &&
      this.type !== 'smooth-convex' &&
      this.type !== 'bubble'
    ) {
      console.warn(
        'The hull type should be either round-convex, smooth-convex or bubble, round-convex is used by default.',
      );
      this.type = 'round-convex';
    }
  }

  calcPath(
    members: (NodeModel | ComboModel)[],
    nonMembers: (NodeModel | ComboModel)[],
  ) {
    let contour, path, hull;
    switch (this.type) {
      case 'round-convex':
        contour = genConvexHull(members);
        hull = roundedHull(
          contour.map((p) => [p.x, p.y]),
          this.padding,
        );
        path = parsePathString(hull);
        break;
      case 'smooth-convex':
        contour = genConvexHull(members);
        if (contour.length === 2) {
          hull = roundedHull(
            contour.map((p) => [p.x, p.y]),
            this.padding,
          );
          path = parsePathString(hull);
        } else if (contour.length > 2) {
          hull = paddedHull(
            contour.map((p) => [p.x, p.y]),
            this.padding,
          );
          path = getClosedSpline(hull);
        }
        break;
      case 'bubble':
        contour = genBubbleSet(this.graph, members, nonMembers, this.bubbleCfg);
        path = contour.length >= 2 && getClosedSpline(contour);
        break;
      default:
    }
    return path;
  }

  render() {
    const shape = this.graph.drawTransient('path', this.options.id, {
      style: {
        path: this.path,
        ...this.options.style,
      },
      capture: false,
    });
    shape.toBack();
    this.hullShape = shape;
  }

  /**
   * Add a member of hull, and if the member was originally in nonMembers, remove it from nonMembers.
   * @param itemIds id(s) of member nodes/combos
   * @return boolean Whether successfully added.
   */
  public addMember(itemIds: ID | ID[]): boolean {
    if (!itemIds) return;
    const idArr = isArray(itemIds) ? itemIds : [itemIds];
    let removed = false;
    idArr.forEach((id) => {
      const model = this.graph.getNodeData(id) || this.graph.getComboData(id);
      this.members.push(model);
      const index = this.nonMembers.indexOf(model);
      if (index > -1) {
        this.nonMembers.splice(index, 1);
        removed = true;
      }
    });
    if (removed) {
      this.updateMembers(
        this.members.map((model) => model.id),
        this.nonMembers.map((model) => model.id),
      );
    }
    return false;
  }

  /**
   * Add the nodes that the hull needs to exclude, and if the member was originally in the members, remove it from the members.
   * @param itemIds id(s) of member nodes/combos
   * @return boolean Whether successfully added.
   */
  public addNonMember(itemIds: ID | ID[]): boolean {
    if (!itemIds) return;
    const idArr = isArray(itemIds) ? itemIds : [itemIds];
    let removed = false;
    idArr.forEach((id) => {
      const model = this.graph.getNodeData(id) || this.graph.getComboData(id);
      this.nonMembers.push(model);
      const index = this.members.indexOf(model);
      if (index > -1) {
        this.members.splice(index, 1);
        removed = true;
      }
    });
    if (removed) {
      this.updateMembers(
        this.members.map((model) => model.id),
        this.nonMembers.map((model) => model.id),
      );
      return true;
    }
    return false;
  }

  /**
   * Remove members from the hull.
   * @param itemIds id(s) of member nodes/combos
   * @return boolean Returns true if the removal is successful, otherwise returns false.
   */
  public removeMember(itemIds: ID | ID[]): boolean {
    if (!itemIds) return;
    const idArr = isArray(itemIds) ? itemIds : [itemIds];
    let removed = false;
    idArr.forEach((id) => {
      const index = this.members.findIndex((member) => member.id === id);
      if (index > -1) {
        this.members.splice(index, 1);
        removed = true;
      }
    });
    if (removed) {
      this.updateMembers(
        this.members.map((model) => model.id),
        this.nonMembers.map((model) => model.id),
      );
      return true;
    }
    return false;
  }

  /**
   * Remove non members from the hull.
   * @param itemIds id(s) of member nodes/combos
   * @return boolean Returns true if the removal is successful, otherwise returns false.
   */
  public removeNonMember(itemIds: ID | ID[]): boolean {
    if (!itemIds) return;
    const idArr = isArray(itemIds) ? itemIds : [itemIds];
    let removed = false;
    idArr.forEach((id) => {
      const model = this.graph.getNodeData(id) || this.graph.getComboData(id);
      const index = this.nonMembers.indexOf(model);
      if (index > -1) {
        this.nonMembers.splice(index, 1);
        removed = true;
      }
    });
    if (removed) {
      this.updateMembers(
        this.members.map((model) => model.id),
        this.nonMembers.map((model) => model.id),
      );
      return true;
    }
    return false;
  }

  public updateMembers(memberIds?: ID[], nonMemberIds?: ID[]) {
    if (memberIds) {
      this.options.members = memberIds;
      this.members = memberIds.map(
        (id) => this.graph.getNodeData(id) || this.graph.getComboData(id),
      );
    }
    if (nonMemberIds) {
      this.options.nonMembers = nonMemberIds;
      this.nonMembers = nonMemberIds.map(
        (id) => this.graph.getNodeData(id) || this.graph.getComboData(id),
      );
    }
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  }

  public updateStyle(cfg: ShapeStyle) {
    this.hullShape?.attr({
      ...cfg,
    });
  }

  /**
   * Update the options
   * @param options hull options
   */
  public updateOptions(options: Partial<HullComponentOptions>) {
    const { members: memberIds, nonMembers: nonMemberIds } = options;
    this.options = {
      ...this.options,
      ...options,
    };
    if (memberIds) {
      this.members = memberIds.map(
        (id) => this.graph.getNodeData(id) || this.graph.getComboData(id),
      );
    }
    if (nonMemberIds) {
      this.nonMembers = nonMemberIds.map(
        (id) => this.graph.getNodeData(id) || this.graph.getComboData(id),
      );
    }
    this.setPadding();
    this.setType();
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  }

  /**
   * Whether a node/edge is inside the range of the hull.
   * @param itemId
   */
  public contain(itemId): boolean {
    let shapePoints;
    // TODO
    // const shape = nodeItem.getKeyShape();
    // if (nodeItem.get('type') === 'path') {
    //   shapePoints = pathToPoints(shape.attr('path'));
    // } else {
    const shapeBBox = this.graph.getRenderBBox(itemId);
    if (!shapeBBox) {
      console.warn(`The item with ${itemId} is not existed in the graph.`);
      return;
    }
    shapePoints = [
      [shapeBBox.min[0], shapeBBox.min[1]],
      [shapeBBox.max[0], shapeBBox.min[1]],
      [shapeBBox.max[0], shapeBBox.max[1]],
      [shapeBBox.min[0], shapeBBox.max[1]],
    ];
    // }
    shapePoints = shapePoints.map((canvasPoint) => {
      const point = this.graph.getPointByCanvas(canvasPoint[0], canvasPoint[1]);
      return [point.x, point.y];
    });
    return isPolygonsIntersect(shapePoints, pathToPoints(this.path));
  }

  public destroy() {
    this.graph.drawTransient('path', this.options.id, { action: 'remove' });
  }
}
