import { AABB, DisplayObject } from '@antv/g';
import { ID } from '@antv/graphlib';
import { throttle } from '@antv/util';
import { IG6GraphEvent, IGraph, NodeModel } from '../../../types';
import { Point } from '../../../types/common';
import { ITEM_TYPE, ShapeStyle } from '../../../types/item';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';

export interface SnapLineConfig extends IPluginBaseConfig {
  // snapline type
  line?: ShapeStyle;
  // snapline align type. true means 'horizontal' and 'vertical'
  itemAlignType?: boolean | 'horizontal' | 'vertical' | 'center';
}

/**
 * draw line position
 */
type LinePosition = 'top' | 'hcenter' | 'bottom' | 'left' | 'vcenter' | 'right';

/**
 * Line for draw
 * first point: point on contrastItem
 * second point: point on draggingItem
 */
type DrawLine = { line: [Point, Point]; lp: LinePosition };

/**
 * dl: draw line for choose
 * offset: offset that selects the drawline with the smallest gap
 */
type DrawLineForChoose = { dl: DrawLine; offset: Point };

export class Snapline extends Base {
  //#region state: historyPoints
  private historyPoints: [Point | undefined, Point | undefined] = [undefined, undefined];

  /**
   * when start drag, offset of cursor and node center (event.canvas - draggingnode.BBox)
   */
  private initialOffset: [offsetX: number | undefined, offsetY: number | undefined] = [undefined, undefined];

  /**
   * Cache the nodes' positions to be throttle updated.
   */
  private updateCache: Map<ID, NodeModel> = new Map();

  /**
   * Gets the current cursor node and center offset and then with initialOffset difference
   * @param e
   */
  private getCurOffsetCompareToInitialOffset = (e: IG6GraphEvent): [number | undefined, number | undefined] => {
    if (this.initialOffset[0] === undefined || this.initialOffset[1] === undefined) {
      return [undefined, undefined];
    }

    const curOffset: [curOffsetX: number, curOffsetY: number] = [
      e.canvas.x - this.draggingBBox.center[0],
      e.canvas.y - this.draggingBBox.center[1],
    ];

    return [curOffset[0] - this.initialOffset[0], curOffset[1] - this.initialOffset[1]];
  };

  private dragging = false;
  private draggingBBox: AABB = undefined;

  // Gets the offset between the cursor and draggingItem
  private getPointerOffsetWithItem = (pointer: { x: number; y: number }): { x: number; y: number } => {
    return {
      x: Math.abs(pointer.x - this.draggingBBox.center[0]),
      y: Math.abs(pointer.x - this.draggingBBox.center[1]),
    };
  };

  //#region state: tolerance
  public tolerance = 4;
  public toleranceFactor = 2;
  public setTolerance(tolerance: number) {
    this.tolerance = tolerance;
  }
  public getTolerance(): number {
    return this.tolerance;
  }
  //#endregion

  // All the lines in the vertical direction
  private vContrastPoints: Point[] = [];
  private hContrastPoints: Point[] = [];

  /**
   * alignLinesForChoose container
   */
  private alignLinesForChoose: {
    v: DrawLineForChoose[];
    h: DrawLineForChoose[];
  } = { v: [], h: [] };

  /**
   * getDrawLineId via DrawLine
   * Principle: the lines on the drawing board is the only load-point
   * @param dl drawLine
   */
  getDrawLineIdByDrawLine(dl: DrawLine): ID {
    if (!dl) return;
    return `${dl.line[0].x}-${dl.line[0].y}-${dl.line[1].x}-${dl.line[1].y}`;
  }
  /**
   * @param cp based on constractBBox's point
   * @param dp based on draggingBBox point
   * @param cp."0"
   * @param cp."1"
   * @returns
   */
  getDrawLineIdByPoints([cp, dp]: [Point, Point]): ID {
    return `${cp.x}-${cp.y}-${dp.x}-${dp.y}`;
  }

  /**
   * all AlignLines satisfy conditions: in the tolerance range
   */
  addAlignLinesForChoose() {
    /**
     *
     * @param xOrY
     * @param contrast
     * @param tolerance
     */
    function isInToleranceRange(xOrY: number, contrast: number, tolerance: number): boolean {
      return xOrY >= contrast - tolerance && xOrY <= contrast + tolerance;
    }

    this.vContrastPoints.forEach((vpoint) => {
      if (isInToleranceRange(this.draggingBBox.min[0], vpoint.x, this.tolerance))
        this.alignLinesForChoose.v.push({
          dl: {
            line: [vpoint, { x: vpoint.x, y: this.draggingBBox.center[1] }],
            lp: 'left',
          },
          offset: { x: vpoint.x - this.draggingBBox.min[0], y: 0 },
        });
      if (isInToleranceRange(this.draggingBBox.center[0], vpoint.x, this.tolerance))
        this.alignLinesForChoose.v.push({
          dl: {
            line: [vpoint, { x: vpoint.x, y: this.draggingBBox.center[1] }],
            lp: 'vcenter',
          },
          offset: { x: vpoint.x - this.draggingBBox.center[0], y: 0 },
        });
      if (isInToleranceRange(this.draggingBBox.max[0], vpoint.x, this.tolerance))
        this.alignLinesForChoose.v.push({
          dl: {
            line: [vpoint, { x: vpoint.x, y: this.draggingBBox.center[1] }],
            lp: 'right',
          },
          offset: { x: vpoint.x - this.draggingBBox.max[0], y: 0 },
        });
    });

    this.hContrastPoints.forEach((hpoint) => {
      if (isInToleranceRange(this.draggingBBox.min[1], hpoint.y, this.tolerance))
        this.alignLinesForChoose.v.push({
          dl: {
            line: [hpoint, { x: this.draggingBBox.min[0], y: hpoint.y }],
            lp: 'top',
          },
          offset: { x: 0, y: hpoint.y - this.draggingBBox.min[1] },
        });
      if (isInToleranceRange(this.draggingBBox.center[1], hpoint.y, this.tolerance))
        this.alignLinesForChoose.v.push({
          dl: {
            line: [hpoint, { x: this.draggingBBox.center[0], y: hpoint.y }],
            lp: 'hcenter',
          },
          offset: { x: 0, y: hpoint.y - this.draggingBBox.center[1] },
        });
      if (isInToleranceRange(this.draggingBBox.max[1], hpoint.y, this.tolerance))
        this.alignLinesForChoose.v.push({
          dl: {
            line: [hpoint, { x: this.draggingBBox.max[0], y: hpoint.y }],
            lp: 'bottom',
          },
          offset: { x: 0, y: hpoint.y - this.draggingBBox.max[1] },
        });
    });
  }

  initAlignLinesForChoose() {
    this.alignLinesForChoose.v = [];
    this.alignLinesForChoose.h = [];

    let allIds: ID[] = [];

    this.graph.getAllCombosData().forEach((item) => {
      allIds.push(item.id);
    });
    this.graph.getAllNodesData().forEach((item) => {
      allIds.push(item.id);
    });
    allIds = allIds.filter((item) => item !== this.dragItemId); // 排除drag item

    allIds.forEach((id) => {
      const cb = this.graph.getRenderBBox(id, true) as AABB; // contrast bbox
      // 判断2个方向，6条线的对比

      /* draggingBBox left */
      if (Math.abs(this.draggingBBox.min[0] - cb.min[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [
              { x: cb.min[0], y: cb.center[1] },
              { x: cb.min[0], y: this.draggingBBox.center[1] },
            ],
            lp: 'left',
          },
          offset: {
            x: this.draggingBBox.min[0] - cb.min[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.min[0] - cb.center[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.center[1] },
              { x: cb.center[0], y: this.draggingBBox.center[1] },
            ],
            lp: 'left',
          },
          offset: {
            x: this.draggingBBox.min[0] - cb.center[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.min[0] - cb.max[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [
              { x: cb.max[0], y: cb.center[1] },
              { x: cb.max[0], y: this.draggingBBox.center[1] },
            ],
            lp: 'left',
          },
          offset: {
            x: this.draggingBBox.min[0] - cb.max[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }

      /* draggingBBox vcenter */
      if (Math.abs(this.draggingBBox.center[0] - cb.min[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [
              { x: cb.min[0], y: cb.center[1] },
              { x: cb.min[0], y: this.draggingBBox.center[1] },
            ],
            lp: 'vcenter',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.min[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.center[0] - cb.center[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.center[1] },
              { x: cb.center[0], y: this.draggingBBox.center[1] },
            ],
            lp: 'vcenter',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.center[0] - cb.max[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [
              { x: cb.max[0], y: cb.center[1] },
              { x: cb.max[0], y: this.draggingBBox.center[1] },
            ],
            lp: 'vcenter',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.max[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }

      /* draggingBBox right */
      if (Math.abs(this.draggingBBox.max[0] - cb.min[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [
              { x: cb.min[0], y: cb.center[1] },
              { x: cb.min[0], y: this.draggingBBox.center[1] },
            ],
            lp: 'right',
          },
          offset: {
            x: this.draggingBBox.max[0] - cb.min[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.max[0] - cb.center[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.center[1] },
              { x: cb.center[0], y: this.draggingBBox.center[1] },
            ],
            lp: 'right',
          },
          offset: {
            x: this.draggingBBox.max[0] - cb.center[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.max[0] - cb.max[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [
              { x: cb.max[0], y: cb.center[1] },
              { x: cb.max[0], y: this.draggingBBox.center[1] },
            ],
            lp: 'right',
          },
          offset: {
            x: this.draggingBBox.max[0] - cb.max[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }

      /* draggingBBox top */
      if (Math.abs(this.draggingBBox.min[1] - cb.max[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.max[1] },
              { x: this.draggingBBox.center[0], y: cb.max[1] },
            ],
            lp: 'top',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.min[1] - cb.max[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.min[1] - cb.center[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.center[1] },
              { x: this.draggingBBox.center[0], y: cb.center[1] },
            ],
            lp: 'top',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.min[1] - cb.center[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.min[1] - cb.min[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.max[1] },
              { x: this.draggingBBox.center[0], y: cb.max[1] },
            ],
            lp: 'top',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.min[1] - cb.min[1],
          },
        });
      }

      /* draggingBBox hcenter */
      if (Math.abs(this.draggingBBox.center[1] - cb.max[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.max[1] },
              { x: this.draggingBBox.center[0], y: cb.max[1] },
            ],
            lp: 'hcenter',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.center[1] - cb.max[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.center[1] - cb.center[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.center[1] },
              { x: this.draggingBBox.center[0], y: cb.center[1] },
            ],
            lp: 'hcenter',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.center[1] - cb.center[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.center[1] - cb.min[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.min[1] },
              { x: this.draggingBBox.center[0], y: cb.min[1] },
            ],
            lp: 'hcenter',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.center[1] - cb.min[1],
          },
        });
      }

      /* draggingBBox bottom */
      if (Math.abs(this.draggingBBox.max[1] - cb.max[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.max[1] },
              { x: this.draggingBBox.center[0], y: cb.max[1] },
            ],
            lp: 'bottom',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.max[1] - cb.max[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.max[1] - cb.center[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.center[1] },
              { x: this.draggingBBox.center[0], y: cb.center[1] },
            ],
            lp: 'bottom',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.max[1] - cb.center[1],
          },
        });
      }
      if (Math.abs(this.draggingBBox.max[1] - cb.min[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [
              { x: cb.center[0], y: cb.min[1] },
              { x: this.draggingBBox.center[0], y: cb.min[1] },
            ],
            lp: 'bottom',
          },
          offset: {
            x: this.draggingBBox.center[0] - cb.center[0],
            y: this.draggingBBox.max[1] - cb.min[1],
          },
        });
      }
    });
  }

  chooseAlignLine(): { v: DrawLine | undefined; h: DrawLine | undefined } {
    // Principles:
    // 1. Smaller difference from tolerance is more important
    // 2. Same tolerance, (if multiple lines in the same direction are within the tolerance range) Importance: hcenter > top > bottom; vcenter > left > right
    // 3. At most: vertical one count;  horizon one count
    // 4. Repeat line, will be subject to the longest (note: can't go to heavy, for performance, in the array of selected again)

    // v direction line selection rule: draggingBBox's left/vcenter/right compares to vContrastPoints
    // h direction line selection rule: draggingBBox's top/hcenter/bottom compares to hContrastPoints

    if (this.alignLinesForChoose.v.length + this.alignLinesForChoose.h.length === 0) {
      return { v: undefined, h: undefined };
    }

    let vTmpLines: DrawLineForChoose[] = [];
    let hTmpLines: DrawLineForChoose[] = [];

    // 1.v,h direction: select the line with minimum offset
    const vMinOffset = Math.min(...this.alignLinesForChoose.v.map((dlFc) => dlFc.offset.x));
    const hMinOffset = Math.min(...this.alignLinesForChoose.h.map((dlFc) => dlFc.offset.y));

    vTmpLines = this.alignLinesForChoose.v.filter((dlFc) => dlFc.offset.x === vMinOffset);
    hTmpLines = this.alignLinesForChoose.h.filter((dlFc) => dlFc.offset.y === hMinOffset);

    // 2.same tolerance，hcenter > top > bottom; vcenter > left > right. (The principle of selecting only one direction)
    {
      const vcenter_hasdata = vTmpLines.some((dlFc) => dlFc.dl.lp === 'vcenter');
      const left_hasdata = vTmpLines.some((dlFc) => dlFc.dl.lp === 'left');

      vTmpLines = vTmpLines.filter((dlFc) => {
        if (dlFc.dl.lp === 'vcenter') {
          return true;
        }

        if (dlFc.dl.lp === 'left') {
          if (!vcenter_hasdata && left_hasdata) {
            return true;
          }
          return false;
        }

        if (dlFc.dl.lp === 'right') {
          if (!vcenter_hasdata && !left_hasdata) {
            return true;
          }
          return false;
        }

        return false;
      });

      const hcenter_hasdata = hTmpLines.some((dlFc) => dlFc.dl.lp === 'hcenter');
      const top_hasdata = hTmpLines.some((dlFc) => dlFc.dl.lp === 'top');

      hTmpLines = hTmpLines.filter((dlFc) => {
        if (dlFc.dl.lp === 'hcenter') {
          return true;
        }

        if (dlFc.dl.lp === 'top') {
          if (!hcenter_hasdata && top_hasdata) {
            return true;
          }
          return false;
        }

        if (dlFc.dl.lp === 'bottom') {
          if (!hcenter_hasdata && !top_hasdata) {
            return true;
          }
          return false;
        }

        return false;
      });
    }

    // 3.remove duplicates
    const uniVTmpLines = Array.from(
      vTmpLines
        .reduce((map, item) => {
          if (!map.has(item.dl.lp) || Math.abs(item.offset.x) < Math.abs(map.get(item.dl.lp)?.offset.x)) {
            map.set(item.dl.lp, item);
          }
          return map;
        }, new Map<string, (typeof vTmpLines)[0]>())
        .values(),
    );

    const uniHTmpLines = Array.from(
      hTmpLines
        .reduce((map, item) => {
          if (!map.has(item.dl.lp) || Math.abs(item.offset.y) < Math.abs(map.get(item.dl.lp)?.offset.y)) {
            map.set(item.dl.lp, item);
          }
          return map;
        }, new Map<string, (typeof vTmpLines)[0]>())
        .values(),
    );

    // 4.choose a maximum offset one of DrawLineForChoose
    const vMaxDL = uniVTmpLines.length
      ? uniVTmpLines.reduce((maxItem: DrawLineForChoose, curItem: DrawLineForChoose) => {
          if (curItem.offset.x > maxItem.offset.x) {
            return curItem;
          } else {
            return maxItem;
          }
        })
      : undefined;

    const hMaxDL = uniHTmpLines.length
      ? uniHTmpLines.reduce((maxItem: DrawLineForChoose, curItem: DrawLineForChoose) => {
          if (curItem.offset.y > maxItem.offset.y) {
            return curItem;
          } else {
            return maxItem;
          }
        })
      : undefined;

    return {
      v: vMaxDL ? vMaxDL.dl : undefined,
      h: hMaxDL ? hMaxDL.dl : undefined,
    };
  }

  /**
   * v and h direction adsorption state
   */
  private isAdsorbed: [boolean, boolean] = [false, false]; // whether the adsorption state

  private dragEvent: IG6GraphEvent = undefined; // drag event

  // use dragItemId and dragItemType to avoid object changing when dragging
  private dragItemId: ID = undefined;
  private dragItemType: ITEM_TYPE | 'canvas' = undefined;

  /**
   * Historical adsorption region: v and h directions
   * x0 ~ x1: Represents the starting and ending line in the v direction
   * y0 ~ y1: Represents the starting and ending line in the h direction
   *
   * When the cursor moves out of this region && non-adsorbed state => set to undefined
   */
  private historyAbsorbArea: [[x0: number, x1: number] | undefined, [y0: number, y1: number] | undefined] = [
    undefined,
    undefined,
  ];

  /**
   * Unable to adsorb: countdown
   */
  private canAdsorbCount = 0;

  /**
   * Countdown method: Countdown
   */
  private canAdsorbCountDown = () => {
    if (this.canAdsorbCount > 0) {
      const intervalID = setInterval(() => {
        this.canAdsorbCount--;

        if (this.canAdsorbCount <= 0) {
          clearTimeout(intervalID);
        }
      }, 100);
    }
  };

  constructor(options?: SnapLineConfig) {
    super(options);

    this.init(options.graph);
  }

  public getEvents() {
    return {
      pointerdown: this.onPointerDown,
      pointermove: this.onPointerMove,
      pointerup: this.onPointerUp,
    };
  }

  public onPointerDown(event: IG6GraphEvent) {
    this.historyPoints[1] = { x: event.canvas.x, y: event.canvas.y };

    this.dragItemId = event.itemId;
    this.dragItemType = event.itemType;
  }

  public onPointerMove(event: IG6GraphEvent) {
    if (!this.historyPoints[1]) return;
    if (this.dragItemType !== 'node') {
      return;
    }

    // pointerDown + first move = start drag
    if (!this.dragging) {
      this.onDragStart(event);
      this.dragging = true;
    } else {
      this.onDrag(event);
    }
  }

  public onPointerUp(event: IG6GraphEvent) {
    // pointerUp + dragging = onDragEnd
    if (this.dragging) {
      this.onDragEnd();
    } else {
      this.historyPoints = [undefined, undefined];
      this.dragging = false;
      this.dragItemId = undefined;
      this.dragItemType = undefined;
    }
  }

  getGraph(event: IG6GraphEvent): IGraph {
    return event.currentTarget;
  }

  //#region event handler
  onDragStart(event: IG6GraphEvent) {
    this.draggingBBox = this.graph.getRenderBBox(event.itemId, true) as AABB;
    this.initialOffset = [event.canvas.x - this.draggingBBox.center[0], event.canvas.y - this.draggingBBox.center[1]];
  }

  onDrag = throttle(
    ((event: IG6GraphEvent) => {
      this.dragEvent = event;

      this.initAlignLinesForChoose();

      // control layer: Check to delete existing line & drawed line & adsorption
      // set historyPoints

      this.historyPoints[0] = this.historyPoints[1];
      this.historyPoints[1] = { x: event.canvas.x, y: event.canvas.y };

      let vlp: LinePosition = undefined;
      let vline: [Point, Point] = undefined;
      let hlp: LinePosition = undefined;
      let hline: [Point, Point] = undefined;

      // v direction: whether keep adsorption
      const checkVShouldHoldAbsorb = (vlp, vline) => {
        // v direction: continue to adsorb
        const vShouldAbsorb =
          Math.abs(this.getCurOffsetCompareToInitialOffset(event)[0]) <= this.tolerance * this.toleranceFactor;

        if (vShouldAbsorb) {
          if (vlp === 'left') {
            this.doUpdatePosition({
              x: vline[0].x + this.draggingBBox.halfExtents[0],
            });
          } else if (vlp === 'vcenter') {
            this.doUpdatePosition({
              x: vline[0].x,
            });
          } else if (vlp === 'right') {
            this.doUpdatePosition({
              fx: vline[0].x - this.draggingBBox.halfExtents[0],
            });
          }

          // updarte align line when absorb
          this.updateAlignLineWhenAbsorb([true, false]);
        } else {
          // cancel absorb
          // 1.update position
          this.doUpdatePosition({ fx: undefined });
          // 2.remove align line && update state
          this.removeAlignLine([true, undefined]);

          // count down to be adsorbable
          this.canAdsorbCount = 10; // 1s
          this.canAdsorbCountDown();
        }
      };
      // h direction: whether keep adsorption
      const checkHShouldHoldAbsorb = (hlp, hline) => {
        // h direction: continue to adsorb
        const hShouldAbsorb =
          Math.abs(this.getCurOffsetCompareToInitialOffset(event)[1]) <= this.tolerance * this.toleranceFactor;

        if (hShouldAbsorb) {
          if (hlp === 'top') {
            this.doUpdatePosition({
              fy: hline[0].y + this.draggingBBox.halfExtents[1],
            });
          } else if (hlp === 'hcenter') {
            this.doUpdatePosition({
              fy: hline[0].y,
            });
          } else if (hlp === 'bottom') {
            this.doUpdatePosition({
              fy: hline[0].y - this.draggingBBox.halfExtents[1],
            });
          }

          // update align line
          this.updateAlignLineWhenAbsorb([false, true]);
        } else {
          // 1.update position
          this.doUpdatePosition({ fy: undefined });
          // 2.remove align line && update state
          this.removeAlignLine([undefined, true]);

          // count down to be adsorbable
          this.canAdsorbCount = 10; // 1s
          this.canAdsorbCountDown();
        }
      };
      // v direction: whether adsorbed
      const checkVShouldAbsorb = () => {
        const ret: { vdl: DrawLine; hdl: DrawLine } | false = this.canDrawLine();

        // If in recent from adsorption area, can't immediately draw lines (must be removed from the area to reline this area)
        if (ret) {
          // draw align lines
          this.drawAlignLines({ vdl: ret.vdl, hdl: undefined });
          // absorb dragging box
          this.absorb({ vdl: ret.vdl, hdl: undefined });
        }
      };
      // h direction: whether adsorbed
      const checkHShouldAbsorb = () => {
        const ret: { vdl: DrawLine; hdl: DrawLine } | false = this.canDrawLine();

        // If in recent from adsorption area, can't immediately draw lines (must be removed from the area to reline this area)
        if (ret) {
          // draw align lines
          this.drawAlignLines({ vdl: undefined, hdl: ret.hdl });
          // absorb dragging box
          this.absorb({ vdl: undefined, hdl: ret.hdl });
        }
      };

      // 1、the current state of the two directions are adsorption
      if (this.isAdsorbed[0] && this.isAdsorbed[1]) {
        vlp = this.drawedLines[0].dl?.lp;
        vline = this.drawedLines[0].dl?.line;
        hlp = this.drawedLines[1].dl?.lp;
        hline = this.drawedLines[1].dl?.line;

        checkVShouldHoldAbsorb(vlp, vline);
        checkHShouldHoldAbsorb(hlp, hline);
      } else if (this.isAdsorbed[0] && !this.isAdsorbed[1]) {
        // 2、currently, only the v direction is adsorbed
        vlp = this.drawedLines[0].dl?.lp;
        vline = this.drawedLines[0].dl?.line;

        checkVShouldHoldAbsorb(vlp, vline);
        checkHShouldAbsorb();
      } else if (!this.isAdsorbed[0] && this.isAdsorbed[1]) {
        // 3、currently, only the h direction is adsorbed
        hlp = this.drawedLines[1].dl?.lp;
        hline = this.drawedLines[1].dl?.line;

        checkHShouldHoldAbsorb(vlp, vline);
        checkVShouldAbsorb();
      } else if (!this.isAdsorbed[0] && !this.isAdsorbed[1]) {
        // 4、currently, v and h directions are not adsorbed
        const ret: { vdl: DrawLine; hdl: DrawLine } | false = this.canDrawLine();

        // If you have recently detached from the attachment area, you cannot draw the line immediately (you need to remove the detached area to redraw the area)
        if (ret) {
          // draw align lines
          this.drawAlignLines(ret);
          // absorb dragging box
          this.absorb(ret);
        }
      }
    }).bind(this),
    16,
    {
      leading: false,
      trailing: true,
    },
  );

  onDragEnd() {
    this.dragEvent = undefined;
    this.historyPoints = [undefined, undefined];
    this.dragging = false;
    this.dragItemId = undefined;
    this.dragItemType = undefined;
  }

  //#region draw/remove lines
  // first：v direction; second：h direction;
  // ddo: drawed DisplayObject, dl: DrawLine
  private drawedLines: [
    { do: DisplayObject | undefined; dl: DrawLine | undefined } | undefined,
    { do: DisplayObject | undefined; dl: DrawLine | undefined } | undefined,
  ] = [undefined, undefined];

  drawAlignLines({ vdl, hdl }: { vdl: DrawLine | undefined; hdl: DrawLine | undefined }) {
    // 1.draw align line
    const vLineID: ID = vdl ? this.getDrawLineIdByDrawLine(vdl) : undefined;
    const hLineID: ID = hdl ? this.getDrawLineIdByDrawLine(hdl) : undefined;

    let vLine: DisplayObject = undefined;
    if (vdl) {
      vLine = this.graph.drawTransient('line', vLineID, {
        style: {
          stroke: 'red',
          lineWidth: 1,
          x1: vdl.line[0].x,
          y1: vdl.line[0].y,
          x2: vdl.line[1].x,
          y2: vdl.line[1].y,
        },
      });
      // add to alignLines
      this.drawedLines[0] = { do: vLine, dl: vdl };
    }

    let hLine: DisplayObject = undefined;
    if (hdl) {
      hLine = this.graph.drawTransient('line', hLineID, {
        style: {
          stroke: 'red',
          lineWidth: 1,
          x1: hdl.line[0].x,
          y1: hdl.line[0].y,
          x2: hdl.line[1].x,
          y2: hdl.line[1].y,
        },
      });
      // add to alignLines
      this.drawedLines[1] = { do: hLine, dl: hdl };
    }
  }

  /**
   * remove align line
   * @param rvdl - remove vertical drawed line
   * @param rhdl - remove horizon drawed line
   * @param rvdl."0"
   * @param rvdl."1"
   */
  removeAlignLine([rvdl, rhdl]: [rvdl: boolean | undefined, rhdl: boolean | undefined]) {
    if (rvdl) {
      const vlid = this.getDrawLineIdByDrawLine(this.drawedLines[0].dl);
      this.graph.drawTransient('line', vlid, { action: 'remove' });
      this.drawedLines[0] = undefined;

      this.isAdsorbed[0] = false;
    }

    if (rhdl) {
      const hlid = this.getDrawLineIdByDrawLine(this.drawedLines[1].dl);

      this.graph.drawTransient('line', hlid, { action: 'remove' });
      this.drawedLines[1] = undefined;

      this.isAdsorbed[1] = false;
    }
  }

  /**
   * via ID: remove align line
   * @param rmLineID
   */
  removeAlignLineByID(rmLineID: ID) {
    // remove from DisplayObject

    const [vTmpDrawedLine, hTmpDrawedLine] = this.drawedLines;
    this.drawedLines.forEach((line, index) => {
      if (line && line.do) {
        const lineID = this.getDrawLineIdByPoints(line.dl.line);
        if (lineID === rmLineID) {
          if (index === 0 && vTmpDrawedLine) {
            vTmpDrawedLine.dl = undefined;
            vTmpDrawedLine.do = undefined;
          } else if (index === 1 && hTmpDrawedLine) {
            hTmpDrawedLine.dl = undefined;
            hTmpDrawedLine.do = undefined;
          }

          this.isAdsorbed[index] = false;
        }
      }
    });

    this.drawedLines[0] = vTmpDrawedLine;
    this.drawedLines[1] = hTmpDrawedLine;

    // remove drawed line
    this.graph.drawTransient('line', rmLineID, { action: 'remove' });
  }

  /**
   * get draggingBBox Point based on LinePosition
   * @param lp
   */
  getDraggingBBoxPointByLinePosition(lp: LinePosition): Point | undefined {
    if (!this.draggingBBox) {
      return undefined;
    }

    if (lp === 'left') {
      return { x: this.draggingBBox.min[0], y: this.draggingBBox.center[1] };
    }
    if (lp === 'vcenter' || lp === 'hcenter') {
      return { x: this.draggingBBox.center[0], y: this.draggingBBox.center[1] };
    }
    if (lp === 'right') {
      return { x: this.draggingBBox.max[0], y: this.draggingBBox.center[1] };
    }
    if (lp === 'top') {
      return { x: this.draggingBBox.center[0], y: this.draggingBBox.min[1] };
    }
    if (lp === 'bottom') {
      return { x: this.draggingBBox.center[0], y: this.draggingBBox.max[1] };
    }

    return undefined;
  }

  /**
   * update align line under condition of absorbed
   * @param root0
   * @param root0."0"
   * @param root0."1"
   */
  updateAlignLineWhenAbsorb([v, h]: [boolean, boolean]) {
    if (v) {
      if (this.drawedLines[0] && this.drawedLines[0].do) {
        const draggingBBoxDrawEndPoint: Point = this.getDraggingBBoxPointByLinePosition(this.drawedLines[0].dl.lp);
        const vdl: DrawLine = {
          line: [
            this.drawedLines[0].dl.line[0],
            {
              x: this.drawedLines[0].dl.line[0].x,
              y: draggingBBoxDrawEndPoint.y,
            },
          ],
          lp: this.drawedLines[0].dl.lp,
        };
        this.removeAlignLineByID(this.drawedLines[0].do.id);
        this.drawAlignLines({ vdl: vdl, hdl: undefined });
        this.isAdsorbed[0] = true;
      }
    }

    if (h) {
      if (this.drawedLines[1] && this.drawedLines[1].do) {
        const draggingBBoxDrawEndPoint: Point = this.getDraggingBBoxPointByLinePosition(this.drawedLines[1].dl.lp);
        const hdl: DrawLine = {
          line: [
            this.drawedLines[1].dl.line[0],
            {
              x: draggingBBoxDrawEndPoint.x,
              y: this.drawedLines[1].dl.line[0].y,
            },
          ],
          lp: this.drawedLines[1].dl.lp,
        };
        this.removeAlignLineByID(this.drawedLines[1].do.id);
        this.drawAlignLines({ vdl: undefined, hdl: hdl });
        this.isAdsorbed[1] = true;
      }
    }
  }

  /**
   * check whether can draw lines
   */
  canDrawLine(): { vdl: DrawLine; hdl: DrawLine } | false {
    const { v, h }: { v: DrawLine | undefined; h: DrawLine | undefined } = this.chooseAlignLine();
    if (!v && !h) {
      return false;
    }

    return { vdl: v, hdl: h };
  }

  /**
   * detect whether adsorption can be cancelled
   * two directions：v h
   * @returns first： v direction ; second：h direction; undefine means no-adsorb
   */
  canCancelAbsorb(): [boolean | undefined, boolean | undefined] {
    // eslint-disable-next-line prefer-const
    let ret: [boolean | undefined, boolean | undefined] = [undefined, undefined];

    const vdl = this.drawedLines[0].dl;
    const hdl = this.drawedLines[1].dl;

    const offset = this.getPointerOffsetWithItem({
      x: this.dragEvent.canvas.x,
      y: this.dragEvent.canvas.y,
    });

    if (vdl) {
      if (Math.abs(offset.x) > this.tolerance * this.toleranceFactor) {
        ret[0] = true;
      }
    }
    if (hdl) {
      if (Math.abs(offset.y) > this.tolerance * this.toleranceFactor) {
        ret[1] = true;
      }
    }

    return ret;
  }

  //#endregion

  /**
   * absorb the dragging box
   * @param dls
   * @param dls.vdl
   * @param dls.hdl
   */
  absorb(dls: { vdl: DrawLine; hdl: DrawLine }) {
    if (dls.vdl) {
      this.isAdsorbed[0] = true;
      this.historyAbsorbArea[0] = [
        dls.vdl.line[0].x - this.tolerance * this.toleranceFactor,
        dls.vdl.line[0].x + this.tolerance * this.toleranceFactor,
      ];
      this.updateDraggingItemPosition(this.drawedLines[0].dl);
    }
    if (dls.hdl) {
      this.isAdsorbed[1] = true;
      this.historyAbsorbArea[1] = [
        dls.hdl.line[0].y - this.tolerance * this.toleranceFactor,
        dls.hdl.line[0].y + this.tolerance * this.toleranceFactor,
      ];
      this.updateDraggingItemPosition(this.drawedLines[1].dl);
    }
  }

  /**
   * If there is dl(draw line), then absorb to dl;
   * don't pass dl, means cancel absorb
   * @param dl drawline [point, point]
   * @param shouldChange
   * @param shouldChange.x
   * @param shouldChange.y
   */
  updateDraggingItemPosition(dl?: DrawLine, shouldChange?: { x?: number; y?: number }) {
    // Determine if historyPoints do not exist do not continue
    if (!this.historyPoints[0] && !this.historyPoints[1]) {
      return;
    }

    // absorb effect
    if (dl) {
      // calculate the diff and absorb
      if (dl.lp === 'left') {
        const tmpX = dl.line[0].x + this.draggingBBox.halfExtents[0];
        this.doUpdatePosition({ fx: tmpX });
      }
      if (dl.lp === 'vcenter') {
        this.doUpdatePosition({
          fx: dl.line[0].x,
        });
      }
      if (dl.lp === 'right') {
        this.doUpdatePosition({
          fx: dl.line[0].x - this.draggingBBox.halfExtents[0],
        });
      }
      if (dl.lp === 'top') {
        this.doUpdatePosition({
          fy: dl.line[0].y + this.draggingBBox.halfExtents[1],
        });
      }
      if (dl.lp === 'hcenter') {
        this.doUpdatePosition({
          fy: dl.line[0].y,
        });
      }
      if (dl.lp === 'bottom') {
        this.doUpdatePosition({
          fy: dl.line[0].y - this.draggingBBox.halfExtents[1],
        });
      }
    }

    if (shouldChange) {
      if (shouldChange.x) {
        const changeX = this.draggingBBox.center[0] + shouldChange.x;
        this.doUpdatePosition({
          x: changeX,
          fx: undefined,
        });
      }
      if (shouldChange.y) {
        const changeY = this.draggingBBox.center[1] + shouldChange.y;
        this.doUpdatePosition({
          y: changeY,
          fy: undefined,
        });
      }
    }
  }

  doUpdatePosition(data) {
    const cache = this.updateCache.get(this.dragItemId);
    this.updateCache.set(this.dragItemId, {
      id: this.dragItemId,
      data: {
        ...cache?.data,
        ...data,
      },
    });
    this.throttleUpdate();
  }

  throttleUpdate = throttle(
    () => {
      this.graph.updateNodePosition(Array.from(this.updateCache.values()), false, true);
      this.updateCache.clear();
    },
    16,
    {
      leading: true,
      trailing: true,
    },
  );
}
