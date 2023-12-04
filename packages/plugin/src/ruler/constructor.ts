export enum ruleDirection { HORIZONTAL = 1, VERTICAL = 2 }
export interface pointConfig {
  lineWidth: number;
  lineHeight: number;
  strokeStyle: CanvasRenderingContext2D['strokeStyle']
  font: CanvasRenderingContext2D['font']
}

export interface ruleConfig {
  width: number;
  height: number;
  scale: number;
  unitInterval: number;
  showUnitLabel: boolean;
  unitLabelStyle: CanvasRenderingContext2D['strokeStyle'],
  direction?: ruleDirection,
}
export default class RulerConstructor {

  private canvas: HTMLCanvasElement = document.createElement('canvas')

  public width: number = 0

  private height: number = 0

  private lineWidth: number = 0.5

  private lineHeight: number = 10

  private unitInterval: number = 10

  private showUnitLabel: boolean = true

  public direction: ruleDirection = 1

  private scale = 1

  private unitLabelStyle: CanvasRenderingContext2D['strokeStyle'] = '#333333'

  private strokeStyle: CanvasRenderingContext2D['strokeStyle'] = '#b8b7b8'

  private font: CanvasRenderingContext2D['font'] = '10px sans-serif'

  public container?: HTMLElement

  constructor(config) {
    const { lineWidth, width, height, lineHeight, showUnitLabel, unitLabelStyle, strokeStyle, font, unitInterval, direction, container } = config
    this.width = width
    this.height = height
    this.canvas.width = width
    this.canvas.height = height
    this.lineWidth = lineWidth
    this.lineHeight = lineHeight
    this.showUnitLabel = showUnitLabel
    this.unitLabelStyle = unitLabelStyle
    this.strokeStyle = strokeStyle
    this.font = font
    this.unitInterval = unitInterval
    this.direction = direction
    this.container = container
    this.init()
  }

  public getCanvas() {
    return this.canvas
  }

  public init() {
    this.initBrush()
  }

  private initBrush() {
    const ruleCanvas = this.canvas
    const context = ruleCanvas.getContext('2d')
    context.strokeStyle = this.strokeStyle
    context.fillStyle = this.unitLabelStyle
    context.font = this.font
    context.lineWidth = this.lineWidth
    this.drawPointsAndLine()
  }



  public changeScale(scale: number) {
    this.scale = +scale.toFixed(2)
    this.drawPointsAndLine()
  }

  public resetRulerSize(width: number, height: number) {
    this.width = width
    this.height = height
    this.canvas.width = width
    this.canvas.height = height
    this.initBrush()
  }


  private drawPointsAndLine() {
    const ruleCanvas = this.canvas
    const unitInterval = Math.round(this.unitInterval / this.scale)
    const showUnitLabel = this.showUnitLabel
    const lineWidth = this.lineWidth
    const lineHeight = this.lineHeight
    const width = this.width
    const height = this.height
    const scaleCount = Math.round((width / this.scale) / unitInterval);
    // lineWidth / 2是为了定义笔的起始位置, 防止单数宽度过宽的问题
    const m = lineWidth / 2
    const context = ruleCanvas.getContext('2d')
    context.clearRect(0, 0, width, height);
    context.beginPath();
    for (let i = 0; i <= scaleCount; i++) {
      const step = Math.round(i * unitInterval)
      /* 竖向的时候, 因为旋转的原因, 以横向来想, 从右边开始绘制0, 左边为最大的数字 */
      let pos = this.direction === 1 ? step * this.scale : width - step * this.scale
      if (pos < 0) { pos = 0 }
      /* 当间隔 * 10 显示文本, 考虑增加配置? */
      if (i % 10 === 0) {
        // xPos防止最后一个线不显示
        const x = pos + m
        const xPos = x >= width ? width - m : x
        context.moveTo(xPos, 0);
        if (showUnitLabel) {
          const text = `${step}`
          let x = pos + lineWidth + 2
          // 文本大小不固定, 需要计算0占用的大小
          const textWidth = context.measureText(text).width
          // 对竖向0的文本,显示在最右边的偏左位置
          if (this.direction === 2 && !step) {
            x = width - textWidth - lineWidth - 2
          } else if (this.direction === 1 && (pos + textWidth) >= width) {
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
    context.moveTo(0, height - m)
    context.lineTo(width, height - m)
    context.stroke();
  }
}