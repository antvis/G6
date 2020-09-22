/**
 * @file 基于 G 的播放轴组件
 */
import { IGroup, IShape } from '@antv/g-base';
import { deepMix } from '@antv/util'
import Button from './timeButton';
import { ShapeStyle } from '../../types';
import { Arrow } from '../../shape'

export const TIMELINE_START = 'timelinestart';
export const TIMELINE_CHANGE = 'timelinechange';
export const TIMELINE_END = 'timelineend';

const DEFAULT_RECT_FILL = '#ccc'
const DEFAULT_RECT_STROKE = 'green'
const DEFAULT_PLAYBTN_STYLE = {
  fill: '#607889',
  stroke: '#607889'
}

const DEFAULT_PREBTN_STYLE = {
  fill: '#fff'
}

const DEFAULT_NEXTBTN_STYLE = {
  fill: 'green'
}

const DEFAULT_CONTROLLER_CONFIG = {
  speed: 2,
  loop: false,
  fill: '#fff',
  stroke: '#fff',
  preBtnStyle: {
    fill: '#ccc',
    stroke: '#ccc'
  },
  nextBtnStyle: {
    fill: '#ccc',
    stroke: '#ccc'
  },
  playBtnStyle: {
    fill: '#fff',
    stroke: '#ccc'
  }
}

export type ControllerCfg = Partial<{
  readonly group: IGroup;

  readonly x?: number;
  readonly y?: number;
  readonly width: number;
  readonly height: number;
  /** 播放速度，1 个 tick 花费时间 */
  readonly speed?: number;
  /** 是否循环播放 */
  readonly loop?: boolean;
  readonly fill?: string;
  readonly stroke?: string;
  readonly preBtnStyle?: ShapeStyle;
  readonly nextBtnStyle?: ShapeStyle;
  readonly playBtnStyle?: ShapeStyle;
}>

/**
 * 参考示例
 * https://www.gapminder.org/tools/#$state$time$value=1870&delay:100;;&chart-type=bubbles
 */
export default class ControllerBtn {
  /** 是否处于播放状态 */
  private isPlay: boolean;

  public playButton: Button;
  public preStepButton: IShape;
  public nextStepButton: IShape;
  private checkedIcon: IShape;
  private checkedText: IShape;

  readonly controllerCfg?: ControllerCfg;

  private group: IGroup;

  private speedGroup: IGroup;
  private toggleGroup: IGroup;

  private speedText: IShape;
  private speedPoint: IShape;
  private speedAxisY: number[];

  // 当前播放速度
  private currentSpeed: number;

  private currentType: 'signle' | 'range';

  constructor(cfg: ControllerCfg) {
    this.controllerCfg = deepMix(
      {},
      cfg,
      DEFAULT_CONTROLLER_CONFIG
    );
    
    this.group = cfg.group
    this.speedAxisY = []
    this.currentSpeed = this.controllerCfg.speed
    this.currentType = 'range'
    this.init()
  }

  public init() {
    this.renderPlayButton();
  }

  /** 获取播放键 marker path */
  private getNextMarkerPath(x, y, len) {
    return [
      ['M', x, y - len],
      ['L', x + len, y],
      ['L', x, y + len],
    ];
  }

  private getPreMarkerPath(x, y, len) {
    return [
      ['M', x, y - len],
      ['L', x - len, y],
      ['L', x, y + len],
    ];
  }

  private renderPlayButton() {
    const { controllerCfg } = this;
    const { width, height, x, y, 
      fill = DEFAULT_RECT_FILL, stroke = DEFAULT_RECT_STROKE, 
      playBtnStyle = DEFAULT_PLAYBTN_STYLE, 
      preBtnStyle = DEFAULT_PREBTN_STYLE, 
      nextBtnStyle = DEFAULT_NEXTBTN_STYLE } = controllerCfg
    
    const r = height / 2 - 5;
    const realY = y + 10

    // 绘制最外层的矩形包围框
    this.group.addShape('rect', {
      attrs: {
        x,
        y: realY,
        width,
        height,
        stroke,
        fill
      }
    })

    if (this.playButton) {
      this.playButton.update({
        x: width / 2,
        y: realY,
        r,
      });
    } else {
      this.playButton = new Button({
        group: this.group,
        x: width / 2,
        y: realY + r + 5,
        r,
        isPlay: this.isPlay,
        style: playBtnStyle
      });
    }

    // 前进按钮
    this.group.addShape('path', {
      attrs: {
        path: this.getPreMarkerPath(width / 2 - 5 * r, realY + r + 5, r * 0.5),
        ...preBtnStyle
      },
      capture: false,
      name: 'preStepBtn'
    })
    this.group.addShape('path', {
      attrs: {
        path: this.getPreMarkerPath(width / 2 - 4.5 * r, realY + r + 5, r * 0.5),
        ...preBtnStyle
      },
      capture: false,
      name: 'preStepBtn'
    })

    // 后退按钮
    this.group.addShape('path', {
      attrs: {
        path: this.getNextMarkerPath(width / 2 + 5 * r, realY + r + 5, r * 0.5),
        ...nextBtnStyle
      },
      capture: false,
      name: 'nextStepBtn'
    })
    this.group.addShape('path', {
      attrs: {
        path: this.getNextMarkerPath(width / 2 + 4.5 * r, realY + r + 5, r * 0.5),
        ...nextBtnStyle
      },
      capture: false,
      name: 'nextStepBtn'
    })

    // 调节speed的按钮
    this.renderSpeedBtn()
    this.renderToggleTime()
    this.bindEvent()
  }

  private renderSpeedBtn() {
    const { y, width } = this.controllerCfg
    const speedGroup = this.group.addGroup({
      name: 'speed-group'
    })

    this.speedGroup = speedGroup

    let count = 2
    const speedNum = []
    let maxSpeed = 9
    // 增加speed刻度
    for (let i = 0; i < 5; i++) {
      // 灰色刻度
      speedGroup.addShape('rect', {
        attrs: {
          x: width * 4 / 5,
          y: y + 10 + i * (i + 1) + count,
          width: 15,
          height: 2,
          fill: '#ccc'
        },
        speed: maxSpeed,
        name: 'speed-rect'
      })
      this.speedAxisY.push(y + 10 + i * (i + 1) + count)
      speedNum.push(maxSpeed)
      maxSpeed = maxSpeed - 2
      count++
    }

    for (let i = 0; i < 4; i++) {
      // 灰色刻度
      speedGroup.addShape('rect', {
        attrs: {
          x: width * 4 / 5,
          y: this.speedAxisY[i] + 2,
          width: 15,
          height: 2 * i + 1,
          fill: '#fff',
          opacity: 0.3
        },
        speed: speedNum[i] - 1,
        name: 'speed-rect'
      })
    }

    // 速度文本
    this.speedText = speedGroup.addShape('text', {
      attrs: {
        x: width * 4 / 5 + 20,
        y: this.speedAxisY[1] + 15,
        text: '3.0X',
        fill: '#ccc'
      }
    })

    this.speedPoint = speedGroup.addShape('path', {
      attrs: {
        path: this.getPath(width * 4 / 5, this.speedAxisY[2]),
        fill: '#ccc'
      }
    })
  }

  private getPath (x, y) {
    return [
      ['M', x, y],
      ['L', x - 12, y - 6],
      ['L', x - 12, y + 6],
      ['Z']
    ]
  }

  private renderToggleTime() {
    const { width, y } = this.controllerCfg
    this.toggleGroup = this.group.addGroup({
      name: 'toggle-group'
    })

    console.log(this.speedAxisY)
    this.toggleGroup.addShape('rect', {
      attrs: {
        width: 14,
        height: 14,
        x: width - 45,
        y: this.speedAxisY[1],
        fill: '#fff',
        stroke: '#ccc',
        lineWidth: 2,
        radius: 3
      },
      isChecked: false,
      name: 'toggle-model'
    })

    this.checkedIcon = this.toggleGroup.addShape('path', {
      attrs: {
        path: [
          ['M', width - 45 + 3, this.speedAxisY[1] + 6],
          ['L', width - 45 + 7, this.speedAxisY[1] + 10],
          ['L', width - 45 + 12, this.speedAxisY[1] + 4],
        ],
        stroke: 'green',
        lineWidth: 3,
      },
      capture: false
    })

    this.checkedIcon.hide()

    this.checkedText = this.toggleGroup.addShape('text', {
      attrs: {
        text: '单一时间',
        x: width - 30,
        y: this.speedAxisY[1] + 15,
        fill: '#ccc'
      }
    })
  }

  private bindEvent() {
    const { width } = this.controllerCfg
    this.speedGroup.on('speed-rect:click', evt => {
      this.speedPoint.attr('path', this.getPath(width * 4 / 5, evt.y))
      this.currentSpeed = evt.target.get('speed')
      this.speedText.attr('text', `${this.currentSpeed}.0X`)
      this.group.emit('timebarConfigChanged', {
        speed: this.currentSpeed,
        type: this.currentType,
      })
    })

    this.toggleGroup.on('toggle-model:click', evt => {
      const isChecked = evt.target.get('isChecked')
      if (!isChecked) {
        this.checkedIcon.show()
        this.checkedText.attr('text', '时间范围')
        this.currentType = 'signle'
      } else {
        this.checkedIcon.hide()
        this.checkedText.attr('text', '单一时间')
        this.currentType = 'range'
      }
      evt.target.set('isChecked', !isChecked)
      this.group.emit('timebarConfigChanged', {
        type: this.currentType,
        speed: this.currentSpeed
      })
    })
  }

  public destroy() {
    this.group.off('playPauseBtn:click')
  }
}
