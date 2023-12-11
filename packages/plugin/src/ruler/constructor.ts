export enum ruleDirection { HORIZONTAL = 'horizontal', VERTICAL = 'vertical' }

export interface pointConfig {
  lineWidth: number;
  lineHeight: number;
  strokeStyle: CanvasRenderingContext2D['strokeStyle']
  font: CanvasRenderingContext2D['font']
}

export interface RulerConf {
  width: number;
  height: number;
  scale: number;
  unitInterval: number;
  showUnitLabel: boolean;
  unitLabelStyle: CanvasRenderingContext2D['strokeStyle'],
  background: CanvasRenderingContext2D['fillStyle'],
  direction: ruleDirection,
  container?: HTMLDivElement,
  startNumber: number | string
}

export default class RulerConstructor {

  private canvas: HTMLCanvasElement = document.createElement('canvas')

  // canvas width
  public width: number = 0

  // canvas height
  private height: number = 0

  // line width
  private lineWidth: number = 0.5

  // line height
  private lineHeight: number = 10

  // unit interval size
  private unitInterval: number = 10

  // show unit label
  private showUnitLabel: boolean = true

  // direction
  public direction: ruleDirection = ruleDirection.HORIZONTAL

  // scale
  private scale = 1

  // unit label style
  private unitLabelStyle: CanvasRenderingContext2D['strokeStyle'] = '#333333'

  // stroke style
  private strokeStyle: CanvasRenderingContext2D['strokeStyle'] = '#b8b7b8'

  // font
  private font: CanvasRenderingContext2D['font'] = '10px sans-serif'

  // background style
  private background: CanvasRenderingContext2D['fillStyle'] = '#ffffff'

  // 从什么数字开始
  private startNumber: number = 0

  // 包裹这个ruler canvas的容器是啥
  public container?: HTMLElement

  constructor(config) {
    this.initConfig(config)
    this.init()
  }

  public getCanvas() {
    return this.canvas
  }

  public init() {
    this.initBrush()
  }

  public initConfig(config) {
    Object.keys(config).forEach(key => {
      this[key] = config[key]
    })
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  public changeConfig(config) {
    this.initConfig(config)
    this.initBrush()
  }

  private initBrush() {
    const ruleCanvas = this.canvas
    const context = ruleCanvas.getContext('2d')
    context.strokeStyle = this.strokeStyle
    context.font = this.font
    context.lineWidth = this.lineWidth
    this.drawPointsAndLine()
  }

  private drawPointsAndLine() {
    const ruleCanvas = this.canvas
    let unitInterval = Math.round(this.unitInterval / this.scale)
    // fix: 当计算少于1, 就取4位
    if (unitInterval < 1) {
      unitInterval = +(this.unitInterval / this.scale).toFixed(4)
    }
    const showUnitLabel = this.showUnitLabel
    const lineWidth = this.lineWidth
    const lineHeight = this.lineHeight
    const width = this.width
    const height = this.height
    const startNumber = this.startNumber
    const scaleCount = Math.round((width / this.scale) / unitInterval);
    // lineWidth / 2是为了定义笔的起始位置, 防止单数宽度过宽的问题
    const m = lineWidth / 2
    const context = ruleCanvas.getContext('2d')
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.fillStyle = this.background;
    context.fillRect(0, 0, width, height)
    context.fillStyle = this.unitLabelStyle
    for (let i = 0; i <= scaleCount; i++) {
      const step = Math.round(i * unitInterval)
      /* 竖向的时候, 因为旋转的原因, 以横向来想, 从右边开始绘制0, 左边为最大的数字 */
      let pos = this.direction === ruleDirection.HORIZONTAL ? step * this.scale : width - step * this.scale
      if (pos < 0) { pos = 0 }
      /* 当间隔 * 10 显示文本, 考虑增加配置 */
      if (i % 10 === 0) {
        // xPos防止最后一个线不显示
        const x = pos + m
        const xPos = x >= width ? width - m : x
        context.moveTo(xPos, 0);
        if (showUnitLabel) {
          const text = `${startNumber + step}`
          let x = pos + lineWidth + 2
          // 文本不固定, 需要计算占用的大小
          const textWidth = context.measureText(text).width
          // 对竖向0的文本,显示在最右边的偏左位置
          if (this.direction === 'vertical' && !step) {
            x = width - textWidth - lineWidth - 2
          } else if (this.direction === ruleDirection.HORIZONTAL && (pos + textWidth) >= width) {
            // 横向最后一个数字同理
            x = width - textWidth - lineWidth - 2
          }
          context.fillText(text, x, 10)
        }
        context.lineTo(xPos, height - lineWidth);
      } else {
        context.moveTo(pos + m, height - lineHeight - lineWidth);
        // 需要减去底部线的高度
        context.lineTo(pos + m, height - lineWidth);
      }
    }
    // 底部的线, 对于上面的线, 不做绘制, 当画布沾满全屏, 标尺在左上, 非全屏, 在包裹容器外添加 同宽度 左、上 边框即可
    context.moveTo(0, height - m)
    context.lineTo(width, height - m)
    context.stroke();
  }
}