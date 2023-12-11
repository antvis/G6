import { modifyCSS, createDom } from '@antv/dom-util';
import { ICanvas } from '@antv/g-base';
import { IAbstractGraph as IGraph } from '@antv/g6-core';
import Base from '../base';
import RulerConstructor, { pointConfig, RulerConf, ruleDirection } from './constructor';

export interface RulerConfig extends pointConfig, RulerConf {
  directions: ruleDirection[] | ruleDirection, // 方向, 默认['horizontal', 'vertical']
  startLen: number // 开始长度 / 距离
  showLock: boolean // 是否显示锁
  lockColor: string // 锁颜色
  lock: boolean // 当前锁住缩放 和 拖放
  visible: boolean // 是否可见
  monitorZoom: boolean // 监听缩放改变刻度
  monitorSize: boolean // 监听大小改变刻度
  monitorDrag: boolean // 监听拖拽改变刻度
}

interface EventFnObj {
  [key: string]: (e: any) => void
}

export default class Ruler extends Base {

  // 锁的容器DOM
  private lockContainer: HTMLElement

  // 标尺的包裹DOM
  private rulerWrap: HTMLElement

  // 所有标尺的实例
  public rulerInstances: RulerConstructor[] = []

  // 缓存行为的是否执行函数
  private shouldBeginFnObj: Object = {}

  // 锁定会控制哪些行为
  private lockBehaviorKey: Array<string> = ['zoom-canvas', 'drag-canvas', 'scroll-canvas']

  // 所有绑定的事件函数, 改变this
  private eventFnObj: EventFnObj = {}

  constructor(config?: RulerConfig) {
    super(config);
  }

  public getDefaultCfgs(): RulerConfig {
    return {
      lineWidth: 1,
      lineHeight: 10,
      startLen: 0,
      scale: 1,
      width: 0,
      height: 25,
      unitInterval: 10,
      showUnitLabel: true,
      lock: false,
      unitLabelStyle: '#333333',
      strokeStyle: '#b8b7b8',
      font: '10px sans-serif',
      directions: [ruleDirection.HORIZONTAL, ruleDirection.VERTICAL],
      showLock: true,
      lockColor: '#7F7F7F',
      visible: true,
      monitorZoom: true,
      monitorSize: true,
      monitorDrag: true,
      background: '#ffffff',
      startNumber: 0,
      direction: ruleDirection.HORIZONTAL
    };
  }

  public init() {
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    const canvas: HTMLCanvasElement = graph.get<ICanvas>('canvas').get('el');
    // 高度默认25, 竖向默认取canvas的高度
    const height = this.get('height') || graphContainer.clientHeight
    const lineWidth = this.get('lineWidth')
    const showLock = this.get('showLock')
    const monitorSize = this.get('monitorSize')
    const monitorZoom = this.get('monitorZoom')
    const monitorDrag = this.get('monitorDrag')

    let startLen = this.get('startLen')
    let directions = this.get('directions')
    const startNumber = this.get('startNumber')
    let rulerHeight = height

    this.rulerWrap = createDom(
      `<div
        class='g6-ruler-wrap'
        style='position:relative;
        user-select: none
        '></div>`,
    );
    if (directions) {
      if (typeof directions === 'string') {
        directions = [directions]
      } else {
        // 当有2个标尺的时候, 需要取最大的值作为尺子的高度, 开始长度也是
        rulerHeight = Math.max(height, startLen)
        startLen = rulerHeight
        this.set('startLen', startLen)
      }
      directions.forEach(direction => {
        const rulerMaxWidth = this.getRulerMaxWidth(direction)
        // 竖向需要增加线的宽度, 跟横向的第一条线对齐
        if (direction === ruleDirection.VERTICAL) {
          rulerHeight += lineWidth
        }
        const container = createDom(
          `<div class='ruler-container' style="position:absolute;overflow:hidden;height:${rulerHeight}px;"></div>`,
        );

        this.rulerWrap.append(container)
        const rulerInstance = new RulerConstructor({
          ...this._cfgs,
          width: rulerMaxWidth,
          height: rulerHeight,
          direction,
          container,
          startNumber
        })
        this.rulerInstances.push(rulerInstance)
        const ruleCanvas = rulerInstance.getCanvas()
        if (direction === ruleDirection.HORIZONTAL) {
          modifyCSS(container, {
            left: `${startLen}px`,
            top: 0,
            width: `${rulerMaxWidth}px`,
          });
        } else {
          modifyCSS(container, {
            // 上面高度增加了, 偏移相应增加
            left: directions.length > 1 ? `${startLen + lineWidth}px` : `${height}px`,
            // 跟横向底部线重叠
            top: directions.length > 1 ? `${startLen - lineWidth}px` : `${startLen}px`,
            width: `${rulerMaxWidth}px`,
            transform: `rotate(${90}deg)`,
            'transform-origin': `0 0`
          });
          modifyCSS(ruleCanvas, {
            transform: 'rotate(180deg)',
            'transform-origin': `center center`,
          });
        }

        container.appendChild(ruleCanvas)
      })
    }

    if (startLen && showLock) {
      this.createLockDom()
    }
    this.moveCanvasAndChangeSize()
    if (monitorSize) {
      this.eventFnObj['canvas:changesize'] = this.bindChangeSizeFn.bind(this)
      graph.on('canvas:changesize', this.eventFnObj['canvas:changesize'])
    }

    if (monitorZoom) {
      this.eventFnObj.wheelzoom = this.bindChangeScaleFn.bind(this)
      graph.on('wheelzoom', this.eventFnObj.wheelzoom)
    }

    if (monitorDrag) {
      this.eventFnObj.viewportchange = this.bindViewPortFn.bind(this)
      graph.on('viewportchange', this.eventFnObj.viewportchange)
    }

    this.set('container', this.rulerWrap);
    graphContainer.insertBefore(this.rulerWrap, canvas)
  }

  private getStartNumber(direction: ruleDirection) {
    const graph: IGraph = this.get('graph');
    const scale = this.get('scale')
    const canvas: HTMLCanvasElement = graph.get<ICanvas>('canvas').get('el');
    const maxWidth = direction === ruleDirection.HORIZONTAL ? canvas.width : canvas.height
    const directionKey = direction === ruleDirection.HORIZONTAL ? 'x' : 'y'
    const centerLoc = this.get('graph').getViewPortCenterPoint()
    const startNumber = centerLoc[directionKey] - (maxWidth / scale) / 2
    return Math.round(startNumber)
  }

  private getRulerMaxWidth(direction) {
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    const overflow = graphContainer.style.overflow
    graphContainer.style.overflow = 'hidden'
    const canvas: HTMLCanvasElement = graph.get<ICanvas>('canvas').get('el');
    const startLen = this.get('startLen')
    const width = graphContainer.clientWidth - startLen
    const lineWidth = this.get('lineWidth')
    let rulerMaxWidth = canvas.clientWidth < width ? canvas.clientWidth : width
    if (direction === ruleDirection.VERTICAL) {
      // 增加top的部分
      const vWidth = graphContainer.clientHeight - startLen + lineWidth
      rulerMaxWidth = canvas.clientHeight < vWidth ? canvas.clientHeight : vWidth
    }
    graphContainer.style.overflow = overflow
    return rulerMaxWidth
  }

  private moveCanvasAndChangeSize(reset = false) {
    const graph: IGraph = this.get('graph')
    const graphContainer = graph.get<HTMLDivElement>('container');
    const gridContainer: HTMLDivElement = graphContainer.querySelector('.g6-grid-container')
    const canvas: HTMLCanvasElement = graph.get<ICanvas>('canvas').get('el');
    const lineWidth = this.get('lineWidth')
    const startLen = this.get('startLen')
    const rulerHeight = this.get('height') || graphContainer.clientHeight
    const maxStartLen = Math.max(startLen, rulerHeight)

    let left = maxStartLen + lineWidth
    let top = maxStartLen

    let width = canvas.width
    let height = canvas.height

    /* 兼容只有一个尺子的情况下 */
    if (this.rulerInstances.length && this.rulerInstances.length < 2) {
      const direction = this.rulerInstances[0].direction
      if (direction === ruleDirection.HORIZONTAL) {
        left = 0
      } else {
        top = 0
      }
    }

    const maxWidth = width + left
    const maxHeight = height + top

    if (reset) {
      height = maxHeight
      width = maxWidth
      left = 0
      top = 0
    } else {
      // 内容区能放下就不减少
      if (graphContainer.clientHeight <= maxHeight) {
        height -= top
      }

      if (graphContainer.clientWidth <= maxWidth) {
        width -= left
      }
    }

    modifyCSS(canvas, {
      'margin-left': `${left}px`,
      'margin-top': `${top}px`
    })
    modifyCSS(gridContainer, {
      'margin-left': `${left}px`,
      'margin-top': `${top}px`
    })
    // 因为有偏移, 所以需要改变canvas的宽度, 以避免startLen的内容给覆盖
    graph.changeSize(width, height)
  }

  private createLockDom() {

    const graph: IGraph = this.get('graph');
    const background = this.get('background')
    const startLen = this.get('startLen')
    const lock = this.get('lock')
    const lineWidth = this.get('lineWidth')
    const modeController = graph.get('modeController')

    const lockFlagArr = []
    this.updateShouldBegin()

    // 初始锁定状态
    this.lockBehaviorKey.forEach(key => {
      const behavior = modeController?.modes[modeController.mode]?.filter(behavior => behavior.type === key)?.[0];
      if (behavior) {
        if (behavior.shouldBegin) {
          lockFlagArr.push(!behavior.shouldBegin())
        }
        lockFlagArr.push(false)
      }
    })

    this.set('lock', lockFlagArr.some(flag => flag))

    this.lockContainer = createDom(
      `<div class='lock-container' title="${lock ? '解锁' : '锁定'}"></div>`,
    );
    modifyCSS(this.lockContainer, {
      // 高度需要减去竖向标尺与横向标尺重叠的线的宽度, 以防止背景重叠线
      height: `${startLen - lineWidth}px`,
      width: `${startLen}px`,
      left: 0,
      top: 0,
      position: 'absolute',
      overflow: 'hidden',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      cursor: 'pointer',
      background,
    })

    const lockColor = this.get('lockColor')
    const LOCK_SVG_DOM = createDom(`<svg  class="lock-svg" viewBox="0 0 15.1 12.2" width="15.1" height="12.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="${lockColor}" d="M13.3,5.1L13.3,5.1h-0.9v-2c0-1.7-1.4-3-3-3c-1.7,0-3,1.4-3,3v2H5.5c-0.4,0-0.7,0.4-0.7,0.8v5.5c0,0.4,0.3,0.8,0.7,0.8h7.8c0.4,0,0.7-0.3,0.7-0.8V5.9C14,5.5,13.7,5.1,13.3,5.1z M7.5,3.2c0-1,0.8-1.9,1.9-1.9c1,0,1.9,0.8,1.9,1.9v1.9l0,0H7.5V3.2z" /></svg>`)
    const UNLOCK_SVG_DOM = createDom(`<svg  class="unLock-svg" viewBox="0 0 15.1 12.2" width="15.1" height="12.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="${lockColor}" d="M13.4,5.1H7.5V3.5c0-1.9-1.6-3.4-3.4-3.4c-1.8,0-3.4,1.5-3.3,3.4c0,0.3,0.3,0.6,0.6,0.6S2,3.8,2,3.5c0-1.1,1-2.1,2.1-2.1c1.1,0,2.1,0.9,2.1,2.1v1.6H6v0H5.4c-0.3,0-0.6,0.3-0.6,0.6v5.9c0,0.3,0.3,0.6,0.6,0.6h8c0.3,0,0.6-0.3,0.6-0.6V5.7C14,5.3,13.7,5.1,13.4,5.1z" /></svg>`)

    // 3.1px -0.2px 是因为svg图标大小不一致
    modifyCSS(LOCK_SVG_DOM, {
      display: !lock ? 'block' : 'none',
      transform: `translate(-3.1px, -0.2px)`,
    })

    modifyCSS(UNLOCK_SVG_DOM, {
      display: lock ? 'block' : 'none',
      transform: `translate(-3.1px, -0.2px)`,
    })

    this.lockContainer.append(LOCK_SVG_DOM, UNLOCK_SVG_DOM)
    this.rulerWrap.append(this.lockContainer)
    // 缓存函数, 绑定this, 用于销毁能正确解除事件
    this.eventFnObj.lock = this.toggerLock.bind(this)
    this.lockContainer.addEventListener('click', this.eventFnObj.lock)
  }

  private resetRulerSize(height?) {
    const graph: IGraph = this.get('graph');
    if (height) {
      this.set('height', height)
    }
    const canvas: HTMLDivElement = graph.get<ICanvas>('canvas').get('el');
    const maxHeight = this.get('height') || canvas.clientHeight
    this.rulerInstances.forEach((ruler: RulerConstructor) => {
      const rulerMaxWidth = this.getRulerMaxWidth(ruler.direction)
      const startNumber = this.getStartNumber(ruler.direction)
      ruler.changeConfig({
        width: rulerMaxWidth,
        height: maxHeight,
        startNumber
      })
      modifyCSS(ruler.container, {
        width: `${rulerMaxWidth}px`,
      })
    })
  }

  public updateShouldBegin() {
    const graph: IGraph = this.get('graph')
    const modeController = graph.get('modeController')
    this.lockBehaviorKey.forEach(key => {
      const behavior = modeController?.modes[modeController.mode]?.filter(behavior => behavior.type === key)?.[0];
      if (behavior) {
        if (behavior.shouldBegin) {
          this.shouldBeginFnObj[key] = behavior.shouldBegin
        }
      }
    })
  }

  // 改变尺子的配合, 配置改变就会重新绘制尺子, 不管改变什么, 例如改变颜色, 改变缩放
  public changeRulerConfig(config) {
    this.rulerInstances.forEach(rulerInstance => {
      rulerInstance.changeConfig(config)
    })
  }

  private moveAndResetCanvasChangeFn(reset = false) {
    const graph: IGraph = this.get('graph')
    graph.off('canvas:changesize', this.eventFnObj['canvas:changesize'])
    this.moveCanvasAndChangeSize(reset)
    graph.on('canvas:changesize', this.eventFnObj['canvas:changesize'])
  }

  private bindChangeSizeFn() {
    this.moveAndResetCanvasChangeFn()
    this.resetRulerSize()
  }

  private bindChangeScaleFn() {
    const graph: IGraph = this.get('graph')
    const zoom = graph.getZoom();
    this.changeScaleSelf(+zoom.toFixed(2))
  }

  private bindViewPortFn() {
    this.rulerInstances.forEach(rulerInstance => {
      const startNumber = this.getStartNumber(rulerInstance.direction)
      rulerInstance.changeConfig({
        startNumber
      })
    })
  }

  public toggerLock() {
    this.changeLock(!this.get('lock'))
  }

  public changeLock(flag: boolean) {

    const graph: IGraph = this.get('graph');
    const LOCK_SVG_DOM = this.lockContainer.querySelector('.lock-svg') as HTMLElement
    const UNLOCK_SVG_DOM = this.lockContainer.querySelector('.unLock-svg') as HTMLElement

    if (flag) {
      // 锁定缩放
      this.lockContainer.title = '解锁'
      LOCK_SVG_DOM.style.display = 'none'
      UNLOCK_SVG_DOM.style.display = 'block'
    } else {
      // 解锁缩放
      this.lockContainer.title = '锁定'
      LOCK_SVG_DOM.style.display = 'block'
      UNLOCK_SVG_DOM.style.display = 'none'
    }

    this.lockBehaviorKey.forEach(key => {
      graph.updateBehavior(key, { shouldBegin: flag ? () => false : this.shouldBeginFnObj[key] || (() => true) })
    })
    this.set('lock', flag)
  }

  public changeVisible(flag: boolean) {
    this.rulerWrap.style.display = flag ? 'flex' : 'none'
    this.moveAndResetCanvasChangeFn(!flag)
    this.set('visible', flag)
  }

  public toggerVisible() {
    const visible = this.get('visible')
    this.changeVisible(!visible)
  }

  private changeScaleSelf(scale: number) {
    this.set('scale', scale)
    this.rulerInstances.forEach(instance => {
      const startNumber = this.getStartNumber(instance.direction)
      instance.changeConfig({ scale, startNumber })
    })
  }

  public changeScale(scale: number) {
    const graph: IGraph = this.get('graph');
    this.changeScaleSelf(scale)
    // 主动触发需要同步改变canvas的大小
    graph.zoom(scale)
  }

  public getContainer(): HTMLDivElement {
    return this.get('container');
  }

  public destroy() {
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    this.moveAndResetCanvasChangeFn(true)
    Object.keys(this.eventFnObj).forEach(key => {
      if (key === 'lock') {
        this.lockContainer.removeEventListener('click', this.eventFnObj.lock)
      }
      graph.off(key, this.eventFnObj[key])
    })
    graphContainer.removeChild(this.rulerWrap as HTMLElement)
    this.lockBehaviorKey.forEach(key => {
      graph.updateBehavior(key, { shouldBegin: this.shouldBeginFnObj[key] || (() => true) })
    })
  }
}