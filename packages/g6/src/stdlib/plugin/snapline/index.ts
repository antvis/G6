import { intersectBBox } from './../../../util/shape';
import { ID } from '@antv/graphlib';
import { each, mix } from '@antv/util';
import { Util } from '@antv/g6-core';
import { ShapeStyle } from '../../../types/item';
import { IG6GraphEvent, IGraph, NodeModel } from '../../../types';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
const { distance } = Util;
import { AABB, DisplayObject, Line } from '@antv/g';

import { Point } from '../../../types/common';
import { G6GraphEvent } from '@antv/g6';
import { BBox } from '@antv/gui';



interface SnapLineConfig extends IPluginBaseConfig {
  // snapline type
  line?: ShapeStyle;
  // snapline align type. true means 'horizontal' and 'vertical'
  itemAlignType?: boolean | 'horizontal' | 'vertical' | 'center';
}

/**
 * draw line position
 */
type LinePosition = 'top' | 'hcenter' | 'bottom' | 'left' | 'vcenter' | 'right'

/**
 * Line for draw
 * first point: point on constractItem 
 * second point: point on draggingItem
 */
type DrawLine = { line: [Point, Point], lp: LinePosition}
/**
 * dl:
 * offset: 偏移量，用于选择出最小的差距的drawline
 */
type DrawLineForChoose = {dl: DrawLine, offset: Point}



export default class Snapline extends Base {

  //#region state: historyPoints
  private historyPoints: [Point | undefined, Point| undefined] = [undefined, undefined];
  // 获取historyPoints 的距离
  private getHPDistance(): number | undefined {
    if( typeof this.historyPoints[0] === undefined || typeof this.historyPoints[1] === undefined) {
      return undefined
    }

    return this.historyPoints[1].x - this.historyPoints[0].x 

  }
  // 获取historyPoints垂直方向的距离
  private getHPVDistance(): number | undefined {
    if( typeof this.historyPoints[0] === undefined || typeof this.historyPoints[1] === undefined) {
      return undefined
    }

    return this.historyPoints[1].y - this.historyPoints[0].y 

  }
  // 获取historyPoints垂直方向的距离
  private getHPHDistance(): {x: number, y: number} | undefined {
    if( typeof this.historyPoints[0] === undefined || typeof this.historyPoints[1] === undefined) {
      return undefined
    }

    return {
      x: this.historyPoints[1].x - this.historyPoints[0].x,
      y: this.historyPoints[1].y - this.historyPoints[0].y   
    }

  }
  //#endregion
  
  private dragging = false;
  private draggingBBox: AABB = undefined;
  //private pointerOffsetWithItemAtStartDragging: {x: number, y: number} = undefined
  // 最开始drag的时候的差异
  private nonAbosorbOffset: Point = undefined
  // 获取光标和draggingItem之间的偏移
  private getPointerOffsetWithItem = (pointer: {x: number, y: number}): {x: number, y: number} => {
    return {
      x: pointer.x - this.draggingBBox.center[0],
      y: pointer.x - this.draggingBBox.center[1]
    }
  }


  //#region state: tolerance
  public tolerance = 5;
  public toleranceFactor = 2
  public setTolerance(tolerance: number) {
    this.tolerance = tolerance
  }
  public getTolerance(): number {
    return this.tolerance
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
    v: DrawLineForChoose[],
    h: DrawLineForChoose[]
  } = {v: [], h: []};

  /**
   * 通过drawLine得到ID
   * 原理：线在画板上是唯一的起止点
   * @param dl drawLine 
   */
  getDrawLineIdByDrawLine(dl: DrawLine): ID {
    return `${dl.line[0].x}-${dl.line[0].y}-${dl.line[1].x}-${dl.line[1].y}`
  }
  /**
   * 
   * @param cp based on constractBBox's point
   * @param dp based on draggingBBox point 
   * @returns 
   */
  getDrawLineIdByPoints([cp, dp]: [Point, Point]): ID {
    return `${cp.x}-${cp.y}-${dp.x}-${dp.y}`
  }

  /**
   * 里面所有的AlignLines都满足tolerance中
   */
  addAlignLinesForChoose() {
    function isInToleranceRange(xOrY: number, contrast: number, tolerance: number): boolean {
      return xOrY >= contrast - tolerance && xOrY <= contrast + tolerance;
    }
    
    this.vContrastPoints.forEach(vpoint => {
      if (isInToleranceRange(this.draggingBBox.min[0], vpoint.x, this.tolerance)) this.alignLinesForChoose.v.push(
        { dl: {line: [vpoint, { x: vpoint.x, y: this.draggingBBox.center[1] }], lp: 'left'}, 
          offset: {x: vpoint.x - this.draggingBBox.min[0], y: 0}}
        ) 
      if (isInToleranceRange(this.draggingBBox.center[0], vpoint.x, this.tolerance)) this.alignLinesForChoose.v.push(
        { dl: { line: [vpoint, { x: vpoint.x, y: this.draggingBBox.center[1] }], lp: 'vcenter' }, offset: {x: vpoint.x - this.draggingBBox.center[0], y: 0} }
        ) 
      if (isInToleranceRange(this.draggingBBox.max[0], vpoint.x, this.tolerance)) this.alignLinesForChoose.v.push(
        { dl: { line: [vpoint, { x: vpoint.x, y: this.draggingBBox.center[1] }], lp: 'right' }, offset: {x: vpoint.x - this.draggingBBox.max[0], y: 0}}
        ) 
    })   

    this.hContrastPoints.forEach(hpoint => {
      if (isInToleranceRange(this.draggingBBox.min[1], hpoint.y, this.tolerance)) this.alignLinesForChoose.v.push(
        {dl: {line: [hpoint, {x: this.draggingBBox.min[0], y: hpoint.y}], lp: 'top' }, offset: {x: 0, y: hpoint.y - this.draggingBBox.min[1]}}
        ) 
      if (isInToleranceRange(this.draggingBBox.center[1], hpoint.y, this.tolerance)) this.alignLinesForChoose.v.push(
        {dl: {line: [hpoint, {x: this.draggingBBox.center[0], y: hpoint.y}], lp: 'hcenter' }, offset: {x: 0, y: hpoint.y - this.draggingBBox.center[1]}}
        ) 
      if (isInToleranceRange(this.draggingBBox.max[1], hpoint.y, this.tolerance)) this.alignLinesForChoose.v.push(
        {dl: {line: [hpoint, {x: this.draggingBBox.max[0], y: hpoint.y}] , lp: 'bottom'}, offset: {x: 0, y: hpoint.y - this.draggingBBox.max[1]}}
        ) 
    })   
  }

  initAlignLinesForChoose() {
    this.alignLinesForChoose.v = []
    this.alignLinesForChoose.h = []

    let allIds: ID[] = []
  
    this.graph.getAllCombosData().forEach(item => {
      allIds.push(item.id)
    })
    this.graph.getAllNodesData().forEach(item => {
      allIds.push(item.id)
    })
    allIds = allIds.filter(item => item !== this.dragItemId) // 排除drag item
    

    allIds.forEach(id => {
      const cb = this.graph.getRenderBBox(id) as AABB // contrast bbox
      // 判断2个方向，6条线的对比

      /* draggingBBox left */
      if(Math.abs(this.draggingBBox.min[0] - cb.min[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [{x: cb.min[0], y: cb.center[1]}, {x: cb.min[0], y:this.draggingBBox.center[1]}],
            lp: 'left'
          },
          offset: {x: this.draggingBBox.min[0] - cb.min[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }
      if(Math.abs(this.draggingBBox.min[0] - cb.center[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [{x: cb.center[0], y: cb.center[1]}, {x: cb.center[0], y:this.draggingBBox.center[1]}],
            lp: 'left'
          },
          offset: {x: this.draggingBBox.min[0] - cb.center[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }
      if(Math.abs(this.draggingBBox.min[0] - cb.max[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [{x: cb.max[0], y: cb.center[1]}, {x: cb.max[0], y:this.draggingBBox.center[1]}],
            lp: 'left'
          },
          offset: {x: this.draggingBBox.min[0] - cb.max[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }

      /* draggingBBox vcenter */
      if(Math.abs(this.draggingBBox.center[0] - cb.min[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [{x: cb.min[0], y: cb.center[1]}, {x: cb.min[0], y:this.draggingBBox.center[1]}],
            lp: 'vcenter'
          },
          offset: {x: this.draggingBBox.center[0] - cb.min[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }
      if(Math.abs(this.draggingBBox.center[0] - cb.center[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [{x: cb.center[0], y: cb.center[1]}, {x: cb.center[0], y:this.draggingBBox.center[1]}],
            lp: 'vcenter'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }
      if(Math.abs(this.draggingBBox.center[0] - cb.max[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [{x: cb.max[0], y: cb.center[1]}, {x: cb.max[0], y:this.draggingBBox.center[1]}],
            lp: 'vcenter'
          },
          offset: {x: this.draggingBBox.center[0] - cb.max[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }

      /* draggingBBox right */
      if(Math.abs(this.draggingBBox.max[0] - cb.min[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [{x: cb.min[0], y: cb.center[1]}, {x: cb.min[0], y:this.draggingBBox.center[1]}],
            lp: 'right'
          },
          offset: {x: this.draggingBBox.max[0] - cb.min[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }
      if(Math.abs(this.draggingBBox.max[0] - cb.center[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [{x: cb.center[0], y: cb.center[1]}, {x: cb.center[0], y:this.draggingBBox.center[1]}],
            lp: 'right'
          },
          offset: {x: this.draggingBBox.max[0] - cb.center[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }
      if(Math.abs(this.draggingBBox.max[0] - cb.max[0]) <= this.tolerance) {
        this.alignLinesForChoose.v.push({
          dl: {
            line: [{x: cb.max[0], y: cb.center[1]}, {x: cb.max[0], y:this.draggingBBox.center[1]}],
            lp: 'right'
          },
          offset: {x: this.draggingBBox.max[0] - cb.max[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }

      /* draggingBBox top */
      // console.log('mmkk: ', Math.abs((this.graph.getRenderBBox(this.dragItemId) as AABB).max[1] ))
      //console.log('mmkk: ', this.draggingBBox.min[1], cb.max[1],  Math.abs(this.draggingBBox.min[1] - cb.max[1]), this.tolerance)
      if(Math.abs(this.draggingBBox.min[1] - cb.max[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [{x: cb.center[0], y: cb.max[1]}, {x: this.draggingBBox.center[0], y: cb.max[1]}],
            lp: 'top'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.min[1] - cb.max[1]}
        })
      }
      if(Math.abs(this.draggingBBox.min[1] - cb.center[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [{x: cb.center[0], y: cb.center[1]}, {x: this.draggingBBox.center[0], y: cb.center[1]}],
            lp: 'top'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.min[1] - cb.center[1]}
        })
      }
      if(Math.abs(this.draggingBBox.min[1] - cb.min[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [{x: cb.center[0], y: cb.max[1]}, {x: this.draggingBBox.center[0], y: cb.max[1]}],
            lp: 'top'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.min[1] - cb.min[1]}
        })
      }
      
      /* draggingBBox hcenter */
      if(Math.abs(this.draggingBBox.center[1] - cb.max[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [{x: cb.center[0], y: cb.max[1]}, {x: this.draggingBBox.center[0], y: cb.max[1]}],
            lp: 'hcenter'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.center[1] - cb.max[1]}
        })
      }
      if(Math.abs(this.draggingBBox.center[1] - cb.center[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [{x: cb.center[0], y: cb.center[1]}, {x: this.draggingBBox.center[0], y: cb.center[1]}],
            lp: 'hcenter'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.center[1] - cb.center[1]}
        })
      }
      if(Math.abs(this.draggingBBox.center[1] - cb.min[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [{x: cb.center[0], y: cb.min[1]}, {x: this.draggingBBox.center[0], y: cb.min[1]}],
            lp: 'hcenter'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.center[1] - cb.min[1]}
        })
      }

      /* draggingBBox bottom */
      if(Math.abs(this.draggingBBox.max[1] - cb.max[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [{x: cb.center[0], y: cb.max[1]}, {x: this.draggingBBox.center[0], y: cb.max[1]}],
            lp: 'bottom'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.max[1] - cb.max[1]}
        })
      }
      if(Math.abs(this.draggingBBox.max[1] - cb.center[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [{x: cb.center[0], y: cb.center[1]}, {x: this.draggingBBox.center[0], y: cb.center[1]}],
            lp: 'bottom'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.max[1] - cb.center[1]}
        })
      }
      if(Math.abs(this.draggingBBox.max[1] - cb.min[1]) <= this.tolerance) {
        this.alignLinesForChoose.h.push({
          dl: {
            line: [{x: cb.center[0], y: cb.min[1]}, {x: this.draggingBBox.center[0], y: cb.min[1]}],
            lp: 'bottom'
          },
          offset: {x: this.draggingBBox.center[0] - cb.center[0], y: this.draggingBBox.max[1] - cb.min[1]}
        })
      }

    })
    
    // debug
    if (this.alignLinesForChoose.v.length + this.alignLinesForChoose.h.length !== 0) {
      //debugger 
    }

  }

  chooseAlignLine(): {v: DrawLine | undefined, h: DrawLine | undefined}  {
    // 原则：
    // 1. 与tolerance越小越重要
    // 2. 相同tl，（如果同方向多条线在tolerance范围内）重要程度： 中 > 上 > 下
    // 3. 最多: v方向一条  h方向一条
    // 4. 重复的线，以最长的为准 (注意：不能先去重,为了性能,在选择出的数组再对比)

    // v方向使用：draggingBBox的左中右三线和vContrastPoints 对比
    // h方向使用：draggingBBox的上中下三线和hContrastPoints 对比
    
    
    if (this.alignLinesForChoose.v.length + this.alignLinesForChoose.h.length === 0) {
      return {v: undefined, h: undefined}
    }

    let vTmpLines: DrawLineForChoose[] = []
    let hTmpLines: DrawLineForChoose[] = []
    
    // 1.v,h方向选择最小偏移的线
    const vMinOffset = Math.min(...this.alignLinesForChoose.v.map(dlFc => dlFc.offset.x))
    const hMinOffset = Math.min(...this.alignLinesForChoose.h.map(dlFc => dlFc.offset.y))

    vTmpLines = this.alignLinesForChoose.v.filter(dlFc => dlFc.offset.x === vMinOffset)
    hTmpLines = this.alignLinesForChoose.h.filter(dlFc => dlFc.offset.y === hMinOffset)
    
    // 2.相同tolerance，重要程度：中 > 上 > 下 （一个方向只选择一条的原则）
    {
      let vcenter_hasdata = false 
      let left_hasdata = false 
      vTmpLines = vTmpLines.filter(dlFc => {
        if(dlFc.dl.lp === 'vcenter') {
          vcenter_hasdata = true 
          return dlFc 
        }

        if (!vcenter_hasdata) {
          if(dlFc.dl.lp === 'left') {
            left_hasdata = true 
            return dlFc 
          }
        }
        
        if (!vcenter_hasdata && !left_hasdata) { 
          if(dlFc.dl.lp === 'right') {
            return dlFc
          }
        }
      })

      let hcenter_hasdata = false 
      let top_hasdata = false 
      hTmpLines = hTmpLines.filter(dlFc => {
        if(dlFc.dl.lp === 'top') {
          hcenter_hasdata = true 
          return dlFc 
        }

        if (!vcenter_hasdata) {
          if(dlFc.dl.lp === 'hcenter') {
            top_hasdata = true 
            return dlFc 
          }
        }
        
        if (!vcenter_hasdata && !left_hasdata) { 
          if(dlFc.dl.lp === 'bottom') {
            return dlFc
          }
        }
      })
    }

    // 3.去重
    const uniVTmpLines = Array.from(
      vTmpLines.reduce((map, item) => {
        if(!map.has(item.dl.lp) || Math.abs(item.offset.x) < Math.abs(map.get(item.dl.lp)!.offset.x)) {
          map.set(item.dl.lp, item)
        }
        return map 
      },  new Map<string, typeof vTmpLines[0]>()).values()
    )

    const uniHTmpLines = Array.from(
      hTmpLines.reduce((map, item) => {
        if(!map.has(item.dl.lp) || Math.abs(item.offset.x) < Math.abs(map.get(item.dl.lp)!.offset.x)) {
          map.set(item.dl.lp, item)
        }
        return map 
      },  new Map<string, typeof vTmpLines[0]>()).values()
    )

    
    return {
      v: uniVTmpLines.map(item => item.dl)[0],
      h: uniHTmpLines.map(item => item.dl)[0]
    }
  }

  /**
   * 是否鼠标是按下去的状态
   */
  private isPointerDownState: boolean = false

  /**
   * v 方向 和h 方向是否吸附状态
   */
  private isAdsorbed: [boolean, boolean] = [false, false]  // 是否吸附状态

  private dragEvent: IG6GraphEvent = undefined // drag event

  

  // 使用 dragItemId 和 dragItemType 避免drag易主
  private dragItemId: ID = undefined
  private dragItemType: string = undefined

  constructor(options?: SnapLineConfig) {
    super(options);

    this.init(options.graph)
  }
  


  /**
   * 
   * @returns 
   */
  public getEvents() {
    return {
      'pointerdown': this.onPointerDown,
      'pointermove': this.onPointerMove,
      'pointerup': this.onPointerUp,
    };
  }

  public onPointerDown(event: IG6GraphEvent) {
    console.log('onPointerDown')

    this.isPointerDownState = true 

    //if (!this.options.shouldBegin(event)) return;
    this.historyPoints[1] = { x: event.canvas.x, y: event.canvas.y }

    this.dragItemId = event.itemId
    this.dragItemType = event.itemType
  }

  public onPointerMove(event: IG6GraphEvent) {
    
    if (!this.historyPoints[1]) return;
    // 保证是拖拽combo或者node
    if(this.dragItemType !== 'combo' && this.dragItemType !== 'node') {
      return
    } 

    //console.log('onPointerMoveing', event.itemId,  event.client)
    
    // pointerDown + first move = start drag
    if (!this.dragging) {
      
      this.onDragStart(event) 
      this.dragging = true 
    }else {
      
      this.onDrag(event) 
    }
  }

  public onPointerUp(event: IG6GraphEvent) {
    
    console.log('onPointerUp')
    this.isPointerDownState = false 

    // pointerUp + dragging = onDragEnd
    if (this.dragging) {
      this.onDragEnd()
    }else {
      this.historyPoints = [undefined, undefined]
      this.dragging = false;
      this.dragItemId = undefined
      this.dragItemType = undefined
    }

    

    console.log('this.dragging: ', this.dragging)

  }

  getGraph(event: IG6GraphEvent): IGraph {
    return event.currentTarget
  }

  //#region event handler
  onDragStart(event: IG6GraphEvent) {
    console.log('on drag start ')
    
    this.draggingBBox = this.graph.getRenderBBox(event.itemId) as AABB

    this.nonAbosorbOffset = this.getPointerOffsetWithItem({x:event.canvas.x, y: event.canvas.y})
  }


  onDrag(event: IG6GraphEvent) {

    console.log('on drag: draggingid = ', event)

    this.dragEvent = event 

    this.initAlignLinesForChoose()
  
    // 控制层： 检查删除掉现有线 & 画线 & 吸附
    // 设置 historyPoints
     
    this.historyPoints[0] = this.historyPoints[1]
    this.historyPoints[1] = {x: event.canvas.x, y: event.canvas.y}
    
    // 判断：是否吸附状态
    console.log('isAdsorbed: ', this.isAdsorbed)

    const offset: {x: number, y: number} = this.getPointerOffsetWithItem({x: event.canvas.x, y: event.canvas.y})
        
    if (this.isAdsorbed[0] || this.isAdsorbed[1]) { // 吸附状态不能更新位置
      //debugger
      if(this.isAdsorbed[0] ) {
         
        if (Math.abs(this.nonAbosorbOffset.x - offset.x) <= this.tolerance * this.toleranceFactor) {
          //debugger
          //
          const lp = this.drawedLines[0].dl.lp
          const line = this.drawedLines[0].dl.line
          if (lp === 'left') {
            this.graph.updateNodePosition({id: this.dragItemId, data: {x: line[0].x + this.draggingBBox.halfExtents[0]}})
          }else if (lp === 'vcenter') {
            this.graph.updateNodePosition({id: this.dragItemId, data: {x: line[0].x }})
         
          }else if (lp === 'right') {
            this.graph.updateNodePosition({id: this.dragItemId, data: {x: line[0].x - this.draggingBBox.halfExtents[0]}})
          }
          
        }

      }

      if (this.isAdsorbed[1]) {

        if (Math.abs(this.nonAbosorbOffset.y - offset.y) <= this.tolerance * this.toleranceFactor) {
          
          //
          //debugger
          //
          const lp = this.drawedLines[1].dl.lp
          const line = this.drawedLines[1].dl.line
          if (lp === 'top') {
            this.graph.updateNodePosition({id: this.dragItemId, data: {y: line[0].y + this.draggingBBox.halfExtents[1]}})
          }else if (lp === 'hcenter') {
            this.graph.updateNodePosition({id: this.dragItemId, data: {y: line[0].y }})
         
          }else if (lp === 'bottom') {
            this.graph.updateNodePosition({id: this.dragItemId, data: {y: line[0].y - this.draggingBBox.halfExtents[1]}})
          }

        }
      }



      // const canCancleAbsorb: [boolean | undefined, boolean | undefined] = this.canCancelAbsorb() // 判断两个方向
      
      // // 取消吸附和取消画线是一体的
      // this.cancelAbsorb(canCancleAbsorb)
      // //debugger
      // this.removeAlignLine(canCancleAbsorb) 
      //debugger

    }else {
      
      const ret: {vdl: DrawLine, hdl: DrawLine} | false = this.canDrawLine()
      if (ret) {
        console.log('===drawAlignLines, ret = :', ret)
        // 画线
        this.drawAlignLines(ret)
        // 吸附  
        this.absorb(ret)
        console.log('mk7-isAdsorbed: ', this.isAdsorbed)
      }else {
        // 不能画线（什么都不做）
      }
    }

  }

  onDragEnd() {
    console.log('onDragEnd')

    this.dragEvent = undefined
    this.historyPoints = [undefined, undefined]
    this.dragging = false;
    this.dragItemId = undefined
    this.dragItemType = undefined

    // 拖动结束时候删除辅助线

  }

  //#region 写好的方法：画线/移除线
  private drawedLines: [{do: DisplayObject, dl: DrawLine}, {do: DisplayObject, dl: DrawLine}] = [undefined, undefined]  // 第一个：v方向 第二个：h方向;ddo: drawed DisplayObject, dl: DrawLine

  drawAlignLines({vdl, hdl}: {vdl: DrawLine, hdl: DrawLine}) {
    // 1.画对齐line

    const vLineID:ID = vdl ? this.getDrawLineIdByDrawLine(vdl) : undefined
    const hLineID:ID = hdl ? this.getDrawLineIdByDrawLine(hdl) : undefined

    let vLine: DisplayObject = undefined
    if(vdl) {
      vLine = this.graph.drawTransient('line', vLineID, {
        style: {
          stroke: 'red',
          lineWidth: 1,
          x1: vdl.line[0].x,
          y1: vdl.line[0].y,
          x2: vdl.line[1].x,
          y2: vdl.line[1].y 
        }
      })
    }
    
    let hLine: DisplayObject = undefined
    if (hdl) {

      hLine = this.graph.drawTransient('line', hLineID, {
        style: {
          stroke: 'red',
          lineWidth: 1,
          x1: hdl.line[0].x,
          y1: hdl.line[0].y,
          x2: hdl.line[1].x,
          y2: hdl.line[1].y 
        }
      })
    }
    
    console.log('drawed line', vLine, hLine) 
    // 2.加入alignLines数组
    this.drawedLines[0] = {do: vLine, dl: vdl}
    this.drawedLines[1] = {do: hLine, dl: hdl}
  } 

  /**
   * 移除画线
   * @param rvdl: remove vertical drawed line 
   * @param rhdl: remove horizon drawed line 
   */
  removeAlignLine([rvdl, rhdl]: [rvdl: boolean|undefined, rhdl: boolean|undefined]) {
    if (rvdl) {
      const vlid = this.getDrawLineIdByDrawLine(this.drawedLines[0].dl)
      this.graph.drawTransient('line', vlid, { action: 'remove' })
      this.drawAlignLines[0] = undefined

      this.isAdsorbed[0] = false
    }

    if (rhdl) {
      const hlid = this.getDrawLineIdByDrawLine(this.drawedLines[1].dl)
      this.graph.drawTransient('line', hlid, { action: 'remove' })
      this.drawAlignLines[1] = undefined

      this.isAdsorbed[1] = false
    }
  }

  removeAlignLineByID(lineID:ID) {
    // 从数组移除 DisplayObject
    this.drawedLines.forEach(line => {
      this.getDrawLineIdByPoints([line[0], line[1]])  
    })

    // 取消
    this.graph.drawTransient('line', lineID, { action: 'remove' })
  }

  /**
   * 检测是否可以画线
   */
  canDrawLine(): {vdl: DrawLine, hdl: DrawLine} | false {
    // 画线即立马吸附
    //this.addAlignLinesForChoose()

    const {v, h}: {v: DrawLine|undefined, h: DrawLine|undefined} = this.chooseAlignLine()
    if (!v && !h) {
      return false 
    }
    
    return {vdl: v, hdl: h}
  }

  /**
   * 判断是否可以取消吸附
   * 两个方向：v h 
   * @return 第一个： v方向是否可取消吸附  第二个：h方向是否可取消吸附； undefine为未吸附
   */
  canCancelAbsorb(): [boolean | undefined, boolean | undefined] {

    // eslint-disable-next-line prefer-const
    let ret:[boolean | undefined, boolean | undefined] = [undefined, undefined]

    const vdl = this.drawedLines[0].dl
    const hdl = this.drawedLines[1].dl

    const offset = this.getPointerOffsetWithItem({x: this.dragEvent.canvas.x, y: this.dragEvent.canvas.y})
      
    if(vdl) {
      if (Math.abs(offset.x) > this.tolerance * this.toleranceFactor) {
        ret[0] = true 
      }
    }
    if(hdl) {
      if (Math.abs(offset.y) > this.tolerance * this.toleranceFactor) {
        ret[1] = true 
      }
    }

    return ret 
  }

  //#endregion

  /**
   * 吸附
   */
  absorb(dls:{vdl: DrawLine, hdl: DrawLine}) {
    //debugger 
    if (dls.vdl) {
      this.isAdsorbed[0] = true 
      console.log('mk5: ', this.drawedLines)
      this.updateDraggingItemPosition(this.drawedLines[0].dl)
    }
    if (dls.hdl) {
      this.isAdsorbed[1] = true 
      console.log('mk6: ', this.drawedLines)
      this.updateDraggingItemPosition(this.drawedLines[1].dl)
    }
     
    //this.onDragEnd()
  }

  /**
   * 取消吸附
   */
  cancelAbsorb(canCancelAbsorb:[boolean | undefined, boolean | undefined]) {
    const vc = canCancelAbsorb[0]
    const hc = canCancelAbsorb[1]
    //debugger 
    if(vc) {
      const shouldChangeX:number = this.getPointerOffsetWithItem({x: this.dragEvent.canvas.x, y: this.dragEvent.canvas.y}).x - this.nonAbosorbOffset.x
      this.updateDraggingItemPosition(undefined, {x: shouldChangeX})
    }

    if(hc) {
      const shouldChangeY:number = this.getPointerOffsetWithItem({x: this.dragEvent.canvas.x, y: this.dragEvent.canvas.y}).y - this.nonAbosorbOffset.y
      this.updateDraggingItemPosition(undefined, {y: shouldChangeY})
    }
  }

  /**
   * 如果有带dl，那么就吸附到dl；
   * 不传递dl，就是取消吸附
   * @param dl drawline [point, point]
   */
  updateDraggingItemPosition(dl?:DrawLine, shouldChange?: {x?: number, y?: number}) {
    //debugger 
    // 判断如果historyPoints都不存在就不继续
    if (!this.historyPoints[0] && !this.historyPoints[1]) {
      return
    }
     
    // 吸附效果
    if(dl) {
      //let diff = 0 
      // 先算出diff，然后吸附过去
      if(dl.lp === 'left') {

        const tmpX = dl.line[0].x + this.draggingBBox.halfExtents[0]
        this.graph.updateNodePosition({id: this.dragItemId, data: {x: tmpX}})
      }
      if(dl.lp === 'vcenter') {

        this.graph.updateNodePosition({id: this.dragItemId,  data: {x: dl.line[0].x}})
      }
      if(dl.lp === 'right') {
        this.graph.updateNodePosition({id: this.dragItemId, data: {x: dl.line[0].x - this.draggingBBox.halfExtents[0]}})
      }
      if(dl.lp === 'top') {

        this.graph.updateNodePosition({id: this.dragItemId, data: {y: dl.line[0].y + this.draggingBBox.halfExtents[1]}})
      }
      if(dl.lp === 'hcenter') {
        this.graph.updateNodePosition({id: this.dragItemId, data: {y: dl.line[0].y}})
      }
      if(dl.lp === 'bottom') {
        this.graph.updateNodePosition({id: this.dragItemId, data: {y: dl.line[0].y - this.draggingBBox.halfExtents[1]}})
      } 
      
      //this.onDragEnd()

    }
    //debugger 
    if(shouldChange) {
      if(shouldChange.x) {
        const changeX = this.draggingBBox.center[0] + shouldChange.x 
        this.graph.updateNodePosition({id: this.dragItemId, data: {x: changeX}})
      }
      if(shouldChange.y) {
        const changeY = this.draggingBBox.center[1] + shouldChange.y 
        this.graph.updateNodePosition({id: this.dragItemId, data: {y: changeY}})
      }
    }
    
  }
  
}


