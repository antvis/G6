import { modifyCSS, createDom } from '@antv/dom-util';
import { debounce } from '@antv/util';
import { ICanvas } from '@antv/g-base';
import { IAbstractGraph as IGraph } from '@antv/g6-core';
import Base from '../base';
import RulerConstructor, { pointConfig, ruleConfig, ruleDirection } from './constructor';

export interface RulerConfig extends pointConfig, ruleConfig {
  directions: ruleDirection[] | ruleDirection, // 方向, 默认[1,2]
  startLen: number // 距离
  showLock: boolean // 是否显示锁
  lockColor: string // 锁颜色
  lockZoom: boolean // 当前锁住缩放
  visible: boolean // 是否可见
  monitorZoom: boolean // 是否监听缩放改变刻度是否改变
  monitorSize: boolean
}

export default class Ruler extends Base {
  private lockContainer: HTMLElement

  private rulerWrap: HTMLElement

  private rulerInstances: RulerConstructor[] = []

  private defaultBegin: Function

  private toggerFn: EventListenerOrEventListenerObject

  constructor(config?: RulerConfig) {
    super(config);
  }

  public getDefaultCfgs(): RulerConfig {
    return {
      lineWidth: 1,
      lineHeight: 10,
      startLen: 25,
      scale: 1,
      width: 0,
      height: 25,
      unitInterval: 10,
      showUnitLabel: true,
      lockZoom: false,
      unitLabelStyle: '#333333',
      strokeStyle: '#b8b7b8',
      font: '10px sans-serif',
      directions: [1, 2],
      showLock: true,
      lockColor: '#7F7F7F',
      visible: true,
      monitorZoom: true,
      monitorSize: true
    };
  }

  public init() {
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    const canvas: HTMLDivElement = graph.get<ICanvas>('canvas').get('el');
    // 高度默认25, 竖向默认取canvas的高度
    const height = this.get('height') || canvas.clientHeight
    const lineWidth = this.get('lineWidth')
    const showLock = this.get('showLock')
    const monitorSize = this.get('monitorSize')
    const monitorZoom = this.get('monitorZoom')

    let startLen = this.get('startLen')
    let directions = this.get('directions')
    let rulerHeight = height

    this.rulerWrap = createDom(
      `<div
        class='g6-ruler-wrap'
        style='position:absolute;
        user-select: none
        '></div>`,
    );
    if (directions) {
      if (typeof directions === 'number') {
        directions = [directions]
      } else {
        // 当时2个标尺的时候, 需要取最大的值作为尺子的高度, 偏移也是
        rulerHeight = Math.max(height, startLen)
        startLen = rulerHeight
      }
      directions.forEach(direction => {
        const rulerMaxWidth = this.getRulerMaxWidth(direction)
        if (direction === 2) {
          rulerHeight += lineWidth
        }
        const container = createDom(
          `<div class='ruler-container' style="position:absolute;overflow:hidden;height:${rulerHeight}px;background:#fff"></div>`,
        );

        this.rulerWrap.append(container)
        const rulerInstance = new RulerConstructor({
          ...this._cfgs,
          width: rulerMaxWidth,
          height: rulerHeight,
          direction,
          container
        })
        this.rulerInstances.push(rulerInstance)
        const ruleCanvas = rulerInstance.getCanvas()
        if (direction === 1) {
          modifyCSS(container, {
            left: `${startLen}px`,
            top: 0,
            width: `${rulerMaxWidth}px`,
          });
        } else {
          modifyCSS(container, {
            left: 0,
            top: 0,
            width: `${rulerMaxWidth}px`,
            transform: `rotate(${90}deg)`,
            // 旋转的原点, 需要在横线第一条线绘制结束开始, 防止选中后跟第一条线不重叠 
            'transform-origin': `${lineWidth}px calc(100% - ${lineWidth}px)`
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

    if (monitorSize) {
      graph.on('canvas:changeSize', (e) => {
        this.resetRulerSize(e.width)
      })
    }

    if (monitorZoom) {
      graph.on('wheelzoom', () => {
        const zoom = graph.getZoom();
        this.changeScale(zoom)
      })
    }
    
    graphContainer.insertBefore(this.rulerWrap, canvas)
  }

  private getRulerMaxWidth(direction) {
    const graph: IGraph = this.get('graph');
    const canvas: HTMLDivElement = graph.get<ICanvas>('canvas').get('el');
    const width = this.get('width') || canvas.clientWidth
    const startLen = this.get('startLen')
    const lineWidth = this.get('lineWidth')
    let rulerMaxWidth = width - startLen
    if (direction === 2) {
      // 下面旋转了一个线条的宽度, 需要增加
      const vWidth = this.get('width') || canvas.clientHeight
      rulerMaxWidth = vWidth - startLen + lineWidth
    }
    return rulerMaxWidth
  }


  private createLockDom() {
    const graph: IGraph = this.get('graph');
    const modeController = graph.get('modeController')
    const { startLen, lineWidth, lockZoom } = this._cfgs

    const zoomCanvas = modeController?.modes[modeController.mode]?.filter(behavior => behavior.type === 'zoom-canvas')?.[0];

    if (zoomCanvas && zoomCanvas.shouldBegin) {
      this.set('lockZoom', !zoomCanvas.shouldBegin())
      this.defaultBegin = zoomCanvas.shouldBegin
    }

    this.lockContainer = createDom(
      `<div class='lock-container' title="${lockZoom ? '解锁缩放' : '锁定缩放'}"></div>`,
    );

    modifyCSS(this.lockContainer, {
      height: `${startLen}px`,
      width: `${startLen}px`,
      left: 0,
      top: 0,
      position: 'absolute',
      overflow: 'hidden',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      cursor: 'pointer',
      // 因为竖向旋转原点改变, 导致需要向上移动线重叠的距离, 
      // 3.1px -0.2px 是因为svg图标大小不一致
      transform: `translate(-3.1px, -${lineWidth / 2 + 0.2}px)`,
      background: '#fff'
    })
    const lockColor = this.get('lockColor')
    const LOCK_SVG_DOM = createDom(`<svg style="display: ${!lockZoom ? 'block' : 'none'}" class="lock-svg" viewBox="0 0 15.1 12.2" width="15.1" height="12.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="${lockColor}" d="M13.3,5.1L13.3,5.1h-0.9v-2c0-1.7-1.4-3-3-3c-1.7,0-3,1.4-3,3v2H5.5c-0.4,0-0.7,0.4-0.7,0.8v5.5c0,0.4,0.3,0.8,0.7,0.8h7.8c0.4,0,0.7-0.3,0.7-0.8V5.9C14,5.5,13.7,5.1,13.3,5.1z M7.5,3.2c0-1,0.8-1.9,1.9-1.9c1,0,1.9,0.8,1.9,1.9v1.9l0,0H7.5V3.2z" /></svg>`)
    const UNLOCK_SVG_DOM = createDom(`<svg style="display: ${lockZoom ? 'block' : 'none'}" class="unLock-svg" viewBox="0 0 15.1 12.2" width="15.1" height="12.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="${lockColor}" d="M13.4,5.1H7.5V3.5c0-1.9-1.6-3.4-3.4-3.4c-1.8,0-3.4,1.5-3.3,3.4c0,0.3,0.3,0.6,0.6,0.6S2,3.8,2,3.5c0-1.1,1-2.1,2.1-2.1c1.1,0,2.1,0.9,2.1,2.1v1.6H6v0H5.4c-0.3,0-0.6,0.3-0.6,0.6v5.9c0,0.3,0.3,0.6,0.6,0.6h8c0.3,0,0.6-0.3,0.6-0.6V5.7C14,5.3,13.7,5.1,13.4,5.1z" /></svg>`)

    this.lockContainer.append(LOCK_SVG_DOM, UNLOCK_SVG_DOM)
    this.rulerWrap.append(this.lockContainer)
    // 缓存函数, 绑定this, 用于销毁能正确解除事件
    this.toggerFn = this.toggerLockZoom.bind(this)
    this.lockContainer.addEventListener('click', this.toggerFn)
  }

  public resetRulerSize(width, height?) {
    this.set('width', width);
    if (height) {
      this.set('height', height)
    }
    const graph: IGraph = this.get('graph');
    const canvas: HTMLDivElement = graph.get<ICanvas>('canvas').get('el');
    const maxHeight = this.get('height') || canvas.clientHeight
    this.rulerInstances.forEach((ruler: RulerConstructor) => {
      const rulerMaxWidth = this.getRulerMaxWidth(ruler.direction)
      ruler.resetRulerSize(rulerMaxWidth, maxHeight)
      modifyCSS(ruler.container, {
        width: `${rulerMaxWidth}px`,
      })
    })
  }

  public toggerLockZoom() {
    this.changeLockZoom(!this.get('lockZoom'))
  }

  public changeLockZoom(flag: boolean) {
    const graph: IGraph = this.get('graph');
    const LOCK_SVG_DOM = this.lockContainer.querySelector('.lock-svg') as HTMLElement
    const UNLOCK_SVG_DOM = this.lockContainer.querySelector('.unLock-svg') as HTMLElement

    if (flag) {
      // 锁定缩放
      this.lockContainer.title = '解锁缩放'
      LOCK_SVG_DOM.style.display = 'none'
      UNLOCK_SVG_DOM.style.display = 'block'
      graph.updateBehavior('zoom-canvas', { shouldBegin: () => false })
    } else {
      // 解锁缩放
      this.lockContainer.title = '锁定缩放'
      LOCK_SVG_DOM.style.display = 'block'
      UNLOCK_SVG_DOM.style.display = 'none'
      graph.updateBehavior('zoom-canvas', { shouldBegin: this.defaultBegin })
    }
    this.set('lockZoom', flag)
  }

  public changeVisible(flag: boolean) {
    this.rulerWrap.style.display = flag ? 'flex' : 'none'
    this.set('visible', flag)
  }

  public toggerVisible() {
    const visible = this.get('visible')
    this.set('visible', !visible)
    this.rulerWrap.style.display = !visible ? 'flex' : 'none'
  }

  public changeScale(scale: number) {
    this.set('scale', scale)
    this.rulerInstances.forEach(instance => {
      instance.changeScale(scale)
    })
  }

  public destroy() {
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    this.lockContainer.removeEventListener('click', this.toggerFn)
    graphContainer.removeChild(this.rulerWrap as HTMLElement)
    this.rulerInstances = []
    this.lockContainer = null
    graph.updateBehavior('zoom-canvas', { shouldBegin: this.defaultBegin })
  }
}