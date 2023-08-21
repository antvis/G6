import { ID } from '@antv/graphlib';
import { AABB, DisplayObject } from '@antv/g';
import { ShapeStyle } from '../../../types/item';
import { IG6GraphEvent, IGraph } from '../../../types';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';

import { Point } from '../../../types/common';
import _ from 'lodash' 


interface SnapLineConfig extends IPluginBaseConfig {
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
 * first point: point on constractItem
 * second point: point on draggingItem
 */
type DrawLine = { line: [Point, Point]; lp: LinePosition };
/**
 * dl:
 * offset: 偏移量，用于选择出最小的差距的drawline
 */
type DrawLineForChoose = { dl: DrawLine; offset: Point };

export default class Snapline extends Base {
  //#region state: historyPoints
  private historyPoints: [Point | undefined, Point | undefined] = [
    undefined,
    undefined,
  ];
  // 获取historyPoints 的距离
  private getHPDistance(): number | undefined {
    if (
      typeof this.historyPoints[0] === undefined ||
      typeof this.historyPoints[1] === undefined
    ) {
      return undefined;
    }

    return this.historyPoints[1].x - this.historyPoints[0].x;
  }
  // 获取historyPoints垂直方向的距离
  private getHPVDistance(): number | undefined {
    if (
      typeof this.historyPoints[0] === undefined ||
      typeof this.historyPoints[1] === undefined
    ) {
      return undefined;
    }

    return this.historyPoints[1].y - this.historyPoints[0].y;
  }
  // 获取historyPoints垂直方向的距离
  private getHPHDistance(): { x: number; y: number } | undefined {
    if (
      typeof this.historyPoints[0] === undefined ||
      typeof this.historyPoints[1] === undefined
    ) {
      return undefined;
    }

    return {
      x: this.historyPoints[1].x - this.historyPoints[0].x,
      y: this.historyPoints[1].y - this.historyPoints[0].y,
    };
  }

  /**
   * 刚drag时，光标与node中心的offset (event.canvas - draggingnode.BBox)
   */
  private initialOffset: [offsetX: number | undefined, offsetY: number | undefined] = [undefined, undefined]
  /**
   * 获取当前的光标与node中心offset - initialOffset
   */
  private getCurOffsetCompareToInitialOffset = (e: IG6GraphEvent):[number | undefined, number | undefined] => {

    if (this.initialOffset[0] === undefined || this.initialOffset[1] === undefined) {
      return [undefined, undefined]
    }

    const curOffset: [curOffsetX: number, curOffsetY: number] = [e.canvas.x - this.draggingBBox.center[0], e.canvas.y - this.draggingBBox.center[1]]

    return [curOffset[0] - this.initialOffset[0], curOffset[1] - this.initialOffset[1]]
  }

  //#endregion

  private dragging = false;
  private draggingBBox: AABB = undefined;
  //private pointerOffsetWithItemAtStartDragging: {x: number, y: number} = undefined
  // 最开始drag的时候的差异
  private nonAbosorbOffset: Point = undefined;
  // 获取光标和draggingItem之间的偏移
  private getPointerOffsetWithItem = (pointer: {
    x: number;
    y: number;
  }): { x: number; y: number } => {
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

  // 所有的v方向的线
  private vContrastPoints: Point[] = [];
  private hContrastPoints: Point[] = [];

  /**
   * DisplayObject 内有id
   * 这些线落入drag bbox的6条范围内
   */
  private alignLinesForChoose: {
    v: DrawLineForChoose[];
    h: DrawLineForChoose[];
  } = { v: [], h: [] };

  /**
   * 通过drawLine得到ID
   * 原理：线在画板上是唯一的起止点
   * @param dl drawLine
   */
  getDrawLineIdByDrawLine(dl: DrawLine): ID {
    return `${dl.line[0].x}-${dl.line[0].y}-${dl.line[1].x}-${dl.line[1].y}`;
  }
  /**
   *
   * @param cp based on constractBBox's point
   * @param dp based on draggingBBox point
   * @returns
   */
  getDrawLineIdByPoints([cp, dp]: [Point, Point]): ID {
    return `${cp.x}-${cp.y}-${dp.x}-${dp.y}`;
  }

  /**
   * 里面所有的AlignLines都满足tolerance中
   */
  addAlignLinesForChoose() {
    function isInToleranceRange(
      xOrY: number,
      contrast: number,
      tolerance: number,
    ): boolean {
      return xOrY >= contrast - tolerance && xOrY <= contrast + tolerance;
    }

    this.vContrastPoints.forEach((vpoint) => {
      if (
        isInToleranceRange(this.draggingBBox.min[0], vpoint.x, this.tolerance)
      )
        this.alignLinesForChoose.v.push({
          dl: {
            line: [vpoint, { x: vpoint.x, y: this.draggingBBox.center[1] }],
            lp: 'left',
          },
          offset: { x: vpoint.x - this.draggingBBox.min[0], y: 0 },
        });
      if (
        isInToleranceRange(
          this.draggingBBox.center[0],
          vpoint.x,
          this.tolerance,
        )
      )
        this.alignLinesForChoose.v.push({
          dl: {
            line: [vpoint, { x: vpoint.x, y: this.draggingBBox.center[1] }],
            lp: 'vcenter',
          },
          offset: { x: vpoint.x - this.draggingBBox.center[0], y: 0 },
        });
      if (
        isInToleranceRange(this.draggingBBox.max[0], vpoint.x, this.tolerance)
      )
        this.alignLinesForChoose.v.push({
          dl: {
            line: [vpoint, { x: vpoint.x, y: this.draggingBBox.center[1] }],
            lp: 'right',
          },
          offset: { x: vpoint.x - this.draggingBBox.max[0], y: 0 },
        });
    });

    this.hContrastPoints.forEach((hpoint) => {
      if (
        isInToleranceRange(this.draggingBBox.min[1], hpoint.y, this.tolerance)
      )
        this.alignLinesForChoose.v.push({
          dl: {
            line: [hpoint, { x: this.draggingBBox.min[0], y: hpoint.y }],
            lp: 'top',
          },
          offset: { x: 0, y: hpoint.y - this.draggingBBox.min[1] },
        });
      if (
        isInToleranceRange(
          this.draggingBBox.center[1],
          hpoint.y,
          this.tolerance,
        )
      )
        this.alignLinesForChoose.v.push({
          dl: {
            line: [hpoint, { x: this.draggingBBox.center[0], y: hpoint.y }],
            lp: 'hcenter',
          },
          offset: { x: 0, y: hpoint.y - this.draggingBBox.center[1] },
        });
      if (
        isInToleranceRange(this.draggingBBox.max[1], hpoint.y, this.tolerance)
      )
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
      if (
        Math.abs(this.draggingBBox.center[0] - cb.center[0]) <= this.tolerance
      ) {
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
      if (
        Math.abs(this.draggingBBox.center[1] - cb.center[1]) <= this.tolerance
      ) {
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

    // debug
    if (
      this.alignLinesForChoose.v.length + this.alignLinesForChoose.h.length !==
      0
    ) {
      //debugger
    }
  }

  chooseAlignLine(): { v: DrawLine | undefined; h: DrawLine | undefined } {
    // 原则：
    // 1. 与tolerance越小越重要
    // 2. 相同tl，（如果同方向多条线在tolerance范围内）重要程度： 中 > 上 > 下
    // 3. 最多: v方向一条  h方向一条
    // 4. 重复的线，以最长的为准 (注意：不能先去重,为了性能,在选择出的数组再对比)

    // v方向使用：draggingBBox的左中右三线和vContrastPoints 对比
    // h方向使用：draggingBBox的上中下三线和hContrastPoints 对比

    if (
      this.alignLinesForChoose.v.length + this.alignLinesForChoose.h.length ===
      0
    ) {
      return { v: undefined, h: undefined };
    }

    let vTmpLines: DrawLineForChoose[] = [];
    let hTmpLines: DrawLineForChoose[] = [];

    // 1.v,h方向选择最小偏移的线
    const vMinOffset = Math.min(
      ...this.alignLinesForChoose.v.map((dlFc) => dlFc.offset.x),
    );
    const hMinOffset = Math.min(
      ...this.alignLinesForChoose.h.map((dlFc) => dlFc.offset.y),
    );

    vTmpLines = this.alignLinesForChoose.v.filter(
      (dlFc) => dlFc.offset.x === vMinOffset,
    );
    hTmpLines = this.alignLinesForChoose.h.filter(
      (dlFc) => dlFc.offset.y === hMinOffset,
    );

    // 2.相同tolerance，重要程度：中 > 上 > 下 （一个方向只选择一条的原则）
    {
      const vcenter_hasdata = vTmpLines.some((dlFc) => dlFc.dl.lp === 'vcenter');
      const left_hasdata = vTmpLines.some((dlFc) => dlFc.dl.lp === 'left');

      vTmpLines = vTmpLines.filter((dlFc) => {
        if (dlFc.dl.lp === 'vcenter') {
          return true 
        }
      
        if (dlFc.dl.lp === 'left') {
          if (!vcenter_hasdata && left_hasdata) {
            return true;
          }
          return false; // vcenter 或 left 已经存在就不返回
        }
      
        if (dlFc.dl.lp === 'right') {
          if (!vcenter_hasdata && !left_hasdata) {
            return true;
          }
          return false; // vcenter 或 left 存在时，不返回 bottom
        }
      
        return false; // 其他情况都不返回
      });

      const hcenter_hasdata = hTmpLines.some((dlFc) => dlFc.dl.lp === 'hcenter');
      const top_hasdata = hTmpLines.some((dlFc) => dlFc.dl.lp === 'top');

      hTmpLines = hTmpLines.filter((dlFc) => {
        if (dlFc.dl.lp === 'hcenter') {
          return true 
        }
      
        if (dlFc.dl.lp === 'top') {
          if (!hcenter_hasdata && top_hasdata) {
            return true;
          }
          return false; // hcenter 或 top 已经存在就不返回
        }
      
        if (dlFc.dl.lp === 'bottom') {
          if (!hcenter_hasdata && !top_hasdata) {
            return true;
          }
          return false; // hcenter 或 top 存在时，不返回 bottom
        }
      
        return false; // 其他情况都不返回
      });

    }

    // 3.去重
    const uniVTmpLines = Array.from(
      vTmpLines
        .reduce((map, item) => {
          if (
            !map.has(item.dl.lp) ||
            Math.abs(item.offset.x) < Math.abs(map.get(item.dl.lp)?.offset.x)
          ) {
            map.set(item.dl.lp, item);
          }
          return map;
        }, new Map<string, (typeof vTmpLines)[0]>())
        .values(),
    );

    const uniHTmpLines = Array.from(
      hTmpLines
        .reduce((map, item) => {
          if (
            !map.has(item.dl.lp) ||
            Math.abs(item.offset.y) < Math.abs(map.get(item.dl.lp)?.offset.y)
          ) {
            map.set(item.dl.lp, item);
          }
          return map;
        }, new Map<string, (typeof vTmpLines)[0]>())
        .values(),
    );

    // 4.选择offset最大值的 DrawLineForChoose 
    const vMaxDL = uniVTmpLines.length ? uniVTmpLines.reduce((maxItem: DrawLineForChoose, curItem: DrawLineForChoose) => {
      if (curItem.offset.x > maxItem.offset.x) {
        return curItem;
      } else {
        return maxItem;
      }
    }) : undefined

    const hMaxDL =  uniHTmpLines.length ? uniHTmpLines.reduce((maxItem: DrawLineForChoose, curItem: DrawLineForChoose) => { 
      if (curItem.offset.y > maxItem.offset.y) {
        return curItem;
      } else {
        return maxItem;
      }
    }) : undefined
    
    return {
      v: vMaxDL ? vMaxDL.dl : undefined,
      h: hMaxDL ? hMaxDL.dl : undefined
    };
  }

  /**
   * v 方向 和h 方向是否吸附状态
   */
  private isAdsorbed: [boolean, boolean] = [false, false]; // 是否吸附状态

  private dragEvent: IG6GraphEvent = undefined; // drag event

  // 使用 dragItemId 和 dragItemType 避免drag易主
  private dragItemId: ID = undefined;
  private dragItemType: string = undefined;

  /**
   * 历史吸附区域:v和h方向
   * x0 ~ x1 代表v方向的起止线
   * y0 ~ y1 代表h方向的起止线
   * 
   * 当光标移出此区域 && 非吸附状态 => 设置为undefined
   */
  private historyAbsorbArea: [ [x0: number, x1: number] | undefined, [y0:number, y1:number] | undefined] = [undefined, undefined]

  /**
   * 不能吸附 倒计时
   */
  private canAdsorbCount = 0 

  /**
   * 倒计时方法：倒计时
   */
  private canAdsorbCountDown = () => {
    if (this.canAdsorbCount > 0) {

      const intervalID = setInterval(() => {
        this.canAdsorbCount --

        if(this.canAdsorbCount <= 0) {
          clearTimeout(intervalID)
        }
      }, 100)

    }
  }


  constructor(options?: SnapLineConfig) {
    super(options);

    this.init(options.graph);
  }

  /**
   *
   * @returns
   */
  public getEvents() {
    return {
      pointerdown: this.onPointerDown,
      pointermove: this.onPointerMove,
      pointerup: this.onPointerUp,
    };
  }

  public onPointerDown(event: IG6GraphEvent) {

    //if (!this.options.shouldBegin(event)) return;
    this.historyPoints[1] = { x: event.canvas.x, y: event.canvas.y };

    this.dragItemId = event.itemId;
    this.dragItemType = event.itemType;

  }

  public onPointerMove(event: IG6GraphEvent) {
    if (!this.historyPoints[1]) return;
    // 保证是拖拽combo或者node
    if (this.dragItemType !== 'combo' && this.dragItemType !== 'node') {
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
    this.initialOffset = [event.canvas.x - this.draggingBBox.center[0], event.canvas.y - this.draggingBBox.center[1]]

    this.nonAbosorbOffset = this.getPointerOffsetWithItem({
      x: event.canvas.x,
      y: event.canvas.y,
    });
  }

  onDrag(event: IG6GraphEvent) {
    this.dragEvent = event;

    this.initAlignLinesForChoose();

    // 控制层： 检查删除掉现有线 & 画线 & 吸附
    // 设置 historyPoints

    this.historyPoints[0] = this.historyPoints[1];
    this.historyPoints[1] = { x: event.canvas.x, y: event.canvas.y };

    let vlp: LinePosition = undefined
    let vline: [Point, Point] = undefined
    let hlp: LinePosition = undefined
    let hline: [Point, Point] = undefined

    // v方向是否保持吸附
    const checkVShouldHoldAbsorb = (vlp, vline) => {
      // v方向应该继续吸附与否
      const vShouldAbsorb = Math.abs(this.getCurOffsetCompareToInitialOffset(event)[0]) <=
          this.tolerance * this.toleranceFactor
      
      if(vShouldAbsorb) {
        if (vlp === 'left') {
          this.graph.updateNodePosition({
            id: this.dragItemId,
            data: { fx: vline[0].x + this.draggingBBox.halfExtents[0] },
          });
        } else if (vlp === 'vcenter') {
          this.graph.updateNodePosition({
            id: this.dragItemId,
            data: { fx: vline[0].x },
          });
        } else if (vlp === 'right') {
          this.graph.updateNodePosition({
            id: this.dragItemId,
            data: { fx: vline[0].x - this.draggingBBox.halfExtents[0] },
          });
        } 

        // 更新划线
        this.updateAlignLineWhenAbsorb([true, false])
      } else {
        // 取消吸附
        // 1.位置更新
        this.graph.updateData('node', {
          id: this.dragItemId,
          data: { fx: undefined },
        });
        // 2.取消画线 && 状态更新
        this.removeAlignLine([true, undefined])

        // 倒计时
        this.canAdsorbCount = 10  // 1s
        this.canAdsorbCountDown()

      }
    }
    // h方向是否保持吸附
    const checkHShouldHoldAbsorb = (hlp, hline) => {
      // h方向应该继续吸附与否
      const hShouldAbsorb = Math.abs(this.getCurOffsetCompareToInitialOffset(event)[1]) <=
          this.tolerance * this.toleranceFactor

      if(hShouldAbsorb) {
        // 
        if (hlp === 'top') {
          this.graph.updateNodePosition({
            id: this.dragItemId,
            data: { fy: hline[0].y + this.draggingBBox.halfExtents[1] },
          });
        } else if (hlp === 'hcenter') {
          this.graph.updateNodePosition({
            id: this.dragItemId,
            data: { fy: hline[0].y },
          });
        } else if (hlp === 'bottom') {
          this.graph.updateNodePosition({
            id: this.dragItemId,
            data: { fy: hline[0].y - this.draggingBBox.halfExtents[1] },
          });
        }

        // 更新划线
        this.updateAlignLineWhenAbsorb([false, true])
      }else {
         // 1.位置更新
         this.graph.updateData('node', {
          id: this.dragItemId,
          data: { fy: undefined },
        });
        // 2.取消画线 && 状态更新
        this.removeAlignLine([undefined, true])

        // 倒计时
        this.canAdsorbCount = 10  // 1s
        this.canAdsorbCountDown()
      }
    }
    // v方向是否吸附
    const checkVShouldAbsorb = () => {
      const ret: { vdl: DrawLine; hdl: DrawLine } | false = this.canDrawLine();
    
      // 如果在最近脱离吸附区域，不能再马上画线（需要移除脱离区域才能重新划线此区域）
      if (ret) {  
        // 画线
        this.drawAlignLines({vdl: ret.vdl, hdl: undefined});
        // 吸附
        this.absorb({ vdl: ret.vdl, hdl: undefined });
      } 
    }
    // h方向是否吸附
    const checkHShouldAbsorb = () => {
      const ret: { vdl: DrawLine; hdl: DrawLine } | false = this.canDrawLine();
    
      // 如果在最近脱离吸附区域，不能再马上画线（需要移除脱离区域才能重新划线此区域）
      if (ret) {  
        // 画线
        this.drawAlignLines({vdl: undefined, hdl: ret.hdl});
        // 吸附
        this.absorb({ vdl: undefined, hdl: ret.hdl });
      } 
    }

    // 1、当前两个方向都是吸附的状态
    if(this.isAdsorbed[0] && this.isAdsorbed[1]) {
      
      vlp = this.drawedLines[0].dl?.lp;
      vline = this.drawedLines[0].dl?.line;
      hlp = this.drawedLines[1].dl?.lp;
      hline = this.drawedLines[1].dl?.line;

      checkVShouldHoldAbsorb(vlp, vline)
      checkHShouldHoldAbsorb(hlp, hline)
      

    } else if (this.isAdsorbed[0] && !this.isAdsorbed[1]) {  
      // 2、当前只v方向吸附
      vlp = this.drawedLines[0].dl?.lp;
      vline = this.drawedLines[0].dl?.line;

      checkVShouldHoldAbsorb(vlp, vline)
      checkHShouldAbsorb()

    } else if (!this.isAdsorbed[0] && this.isAdsorbed[1]) {
      // 3、当前只h方向吸附
      hlp = this.drawedLines[1].dl?.lp;
      hline = this.drawedLines[1].dl?.line;

      checkHShouldHoldAbsorb(vlp, vline)
      checkVShouldAbsorb()

    } else if(!this.isAdsorbed[0] && !this.isAdsorbed[1]) {
      // 4、当前v,h方向均未吸附
      const ret: { vdl: DrawLine; hdl: DrawLine } | false = this.canDrawLine();
    
      // 如果在最近脱离吸附区域，不能再马上画线（需要移除脱离区域才能重新划线此区域）
      if (ret ) {  
        console.log('begore drawline')
        // 画线
        this.drawAlignLines(ret);
        // 吸附
        this.absorb(ret);
      }       
    }
  }

  onDragEnd() {
    this.dragEvent = undefined;
    this.historyPoints = [undefined, undefined];
    this.dragging = false;
    this.dragItemId = undefined;
    this.dragItemType = undefined;

    // 拖动结束时候删除辅助线
  }

  //#region 写好的方法：画线/移除线
  private drawedLines: [
    { do: DisplayObject | undefined, dl: DrawLine | undefined } | undefined,
    { do: DisplayObject | undefined, dl: DrawLine | undefined } | undefined,
  ] = [undefined, undefined]; // 第一个：v方向 第二个：h方向;ddo: drawed DisplayObject, dl: DrawLine

  drawAlignLines({ vdl, hdl }: { vdl: DrawLine | undefined; hdl: DrawLine | undefined }) {
    // 1.画对齐line
    console.log('划线')
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
      // 加入alignLines数组
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
      // 加入alignLines数组
      this.drawedLines[1] = { do: hLine, dl: hdl };
    }

  }

  /**
   * 移除画线
   * @param rvdl: remove vertical drawed line
   * @param rhdl: remove horizon drawed line
   */
  removeAlignLine([rvdl, rhdl]: [
    rvdl: boolean | undefined,
    rhdl: boolean | undefined,
  ]) {
    console.log('removeAlignLine')
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
   * 通过ID 移除align line
   * @param rmLineID 
   */
  removeAlignLineByID(rmLineID: ID) {
    console.log('1.removeAlignLineByID')
    // 从数组移除 DisplayObject

    
    //debugger 
    const vTmpDrawedLine = _.cloneDeep(this.drawedLines[0])
    const hTmpDrawedLine = _.cloneDeep(this.drawedLines[1])
    console.log('1.2.vTmpDrawedLine - hTmpDrawedLine', vTmpDrawedLine, hTmpDrawedLine)

    this.drawedLines.forEach((line, index) => {
      if(line && line.do) {
        const lineID = this.getDrawLineIdByPoints(line.dl.line);
        console.log('lineID: ', lineID)
        if (lineID === rmLineID) {
          console.log('2.lineID === rmLineID', index)
         
          if (index === 0 && vTmpDrawedLine) {
            vTmpDrawedLine.dl = undefined
            vTmpDrawedLine.do = undefined
          }else if(index === 1 && hTmpDrawedLine) {
            hTmpDrawedLine.dl = undefined
            hTmpDrawedLine.do = undefined
          }

          this.isAdsorbed[index] = false 

          console.log('3.tmpDrawLines', this.drawedLines, this.drawedLines[1], this.drawedLines[index], typeof(index))
        }
      }
    });

    console.log('4.vTmpDrawedLine - hTmpDrawedLine', vTmpDrawedLine, hTmpDrawedLine)
    this.drawedLines[0] = vTmpDrawedLine
    this.drawedLines[1] = hTmpDrawedLine
//debugger 
   
    console.log('5.drawedLines', this.drawedLines, typeof(this.drawedLines), this.drawedLines[0], this.drawedLines[1],)

    console.log('5.2 rmLineID: ', rmLineID)
    // 取消
    this.graph.drawTransient('line', rmLineID, { action: 'remove' });
    console.log('6.after removeAlignLineByID :this.drawedLines: ', this.drawedLines)
  }

  /**
   * 基于LinePosition获取draggingBBox的点
   */
  getDraggingBBoxPointByLinePosition(lp: LinePosition) : Point | undefined {
    if (!this.draggingBBox) {
      return undefined
    }

    if(lp === 'left') {
      return {x: this.draggingBBox.min[0], y: this.draggingBBox.center[1]}
    }
    if(lp === 'vcenter' || lp === 'hcenter') {
      return {x: this.draggingBBox.center[0], y: this.draggingBBox.center[1]}
    }
    if(lp === 'right') {
      return {x: this.draggingBBox.max[0], y: this.draggingBBox.center[1]}
    }
    if(lp === 'top') {
      return {x: this.draggingBBox.center[0], y: this.draggingBBox.min[1]}
    }
    if(lp === 'bottom') {
      return {x: this.draggingBBox.center[0], y: this.draggingBBox.max[1]}
    }

    return undefined
  }

  /**
   * 在被吸附情况下更新划线
   */
  updateAlignLineWhenAbsorb([v, h]: [boolean, boolean]) {
    
    if(v) {
      if(this.drawedLines[0] && this.drawedLines[0].do) {
        const draggingBBoxDrawEndPoint: Point = this.getDraggingBBoxPointByLinePosition(this.drawedLines[0].dl.lp)
        const vdl: DrawLine = {
          line: [this.drawedLines[0].dl.line[0], draggingBBoxDrawEndPoint],
          lp: this.drawedLines[0].dl.lp
        }
        this.removeAlignLineByID(this.drawedLines[0].do.id)
        this.drawAlignLines({ vdl: vdl, hdl: undefined })
        this.isAdsorbed[0] = true 
      }
    }
    
    if(h) {
      if(this.drawedLines[1] && this.drawedLines[1].do) {
        const draggingBBoxDrawEndPoint: Point = this.getDraggingBBoxPointByLinePosition(this.drawedLines[1].dl.lp)
        const hdl: DrawLine = {
          line: [this.drawedLines[1].dl.line[0], draggingBBoxDrawEndPoint],
          lp: this.drawedLines[1].dl.lp
        }
        this.removeAlignLineByID(this.drawedLines[1].do.id)
        this.drawAlignLines({ vdl: undefined, hdl: hdl })
        this.isAdsorbed[1] = true 
      }
    }
  }

  /**
   * 检测是否可以画线
   */
  canDrawLine(): { vdl: DrawLine; hdl: DrawLine } | false {

    const { v, h }: { v: DrawLine | undefined; h: DrawLine | undefined } =
      this.chooseAlignLine();
    if (!v && !h) {
      return false;
    }

    return { vdl: v, hdl: h };
  }

  /**
   * 判断是否可以取消吸附
   * 两个方向：v h
   * @return 第一个： v方向是否可取消吸附  第二个：h方向是否可取消吸附； undefine为未吸附
   */
  canCancelAbsorb(): [boolean | undefined, boolean | undefined] {
    // eslint-disable-next-line prefer-const
    let ret: [boolean | undefined, boolean | undefined] = [
      undefined,
      undefined,
    ];

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
   * 吸附
   */
  absorb(dls: { vdl: DrawLine; hdl: DrawLine }) {
    //debugger
    if (dls.vdl) {
      this.isAdsorbed[0] = true;
      this.historyAbsorbArea[0] = [dls.vdl.line[0].x - this.tolerance * this.toleranceFactor, dls.vdl.line[0].x + this.tolerance * this.toleranceFactor];
      this.updateDraggingItemPosition(this.drawedLines[0].dl);
    }
    if (dls.hdl) {
      this.isAdsorbed[1] = true;
      this.historyAbsorbArea[1] = [dls.hdl.line[0].y - this.tolerance * this.toleranceFactor, dls.hdl.line[0].y + this.tolerance * this.toleranceFactor];
      this.updateDraggingItemPosition(this.drawedLines[1].dl);
    }
  }

 

  /**
   * 如果有带dl，那么就吸附到dl；
   * 不传递dl，就是取消吸附
   * @param dl drawline [point, point]
   */
  updateDraggingItemPosition(
    dl?: DrawLine,
    shouldChange?: { x?: number; y?: number },
  ) {
    // 判断如果historyPoints都不存在就不继续
    if (!this.historyPoints[0] && !this.historyPoints[1]) {
      return;
    }

    // 吸附效果
    if (dl) {
      //let diff = 0
      // 先算出diff，然后吸附过去
      if (dl.lp === 'left') {
        const tmpX = dl.line[0].x + this.draggingBBox.halfExtents[0];
        this.graph.updateNodePosition({
          id: this.dragItemId,
          data: { fx: tmpX },
        });
      }
      if (dl.lp === 'vcenter') {
        this.graph.updateNodePosition({
          id: this.dragItemId,
          data: { fx: dl.line[0].x },
        });
      }
      if (dl.lp === 'right') {
        this.graph.updateNodePosition({
          id: this.dragItemId,
          data: { fx: dl.line[0].x - this.draggingBBox.halfExtents[0] },
        });
      }
      if (dl.lp === 'top') {
        this.graph.updateNodePosition({
          id: this.dragItemId,
          data: { fy: dl.line[0].y + this.draggingBBox.halfExtents[1] },
        });
      }
      if (dl.lp === 'hcenter') {
        this.graph.updateNodePosition({
          id: this.dragItemId,
          data: { fy: dl.line[0].y },
        });
      }
      if (dl.lp === 'bottom') {
        this.graph.updateNodePosition({
          id: this.dragItemId,
          data: { fy: dl.line[0].y - this.draggingBBox.halfExtents[1] },
        });
      }

      //this.onDragEnd()
    }

    if (shouldChange) {
      if (shouldChange.x) {
        const changeX = this.draggingBBox.center[0] + shouldChange.x;
        this.graph.updateNodePosition({
          id: this.dragItemId,
          data: { x: changeX, fx: undefined },
        });
      }
      if (shouldChange.y) {
        const changeY = this.draggingBBox.center[1] + shouldChange.y;
        this.graph.updateNodePosition({
          id: this.dragItemId,
          data: { y: changeY, fy: undefined },
        });
      }
    }
  }
}
