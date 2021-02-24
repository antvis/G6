import { IGroup, IShape } from '@antv/g-base';
import { deepMix } from '@antv/util';
import { ext } from '@antv/matrix-util';
import Button from './timeButton';
import { ShapeStyle } from '@antv/g6-core';
import {
  TIMEBAR_CONFIG_CHANGE
} from './constant';

const transform = ext.transform;

const DEFAULT_RECT_FILL = '#aaa';
const DEFAULT_RECT_STROKE = 'green';
const DEFAULT_PLAYBTN_STYLE = {
  fill: '#aaa',
  fillOpacity: 0.35,
  stroke: '#aaa',
};

const DEFAULT_PREBTN_STYLE = {
  fill: '#fff',
};

const DEFAULT_NEXTBTN_STYLE = {
  fill: 'green',
};

const DEFAULT_CONTROLLER_CONFIG = {
  speed: 1,
  loop: false,
  fill: '#fff',
  stroke: '#fff',
  hiddleToggle: false,
  preBtnStyle: {
    fill: '#aaa',
    stroke: '#aaa',
  },
  nextBtnStyle: {
    fill: '#aaa',
    stroke: '#aaa',
  },
  playBtnStyle: {
    fill: '#aaa',
    stroke: '#aaa',
    fillOpacity: 0.05,
  },
};

const SPEED_CONTROLLER_OFFSET = 110;
const TOGGLE_MODEL_OFFSET = 50;

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
  readonly hiddleToggle: boolean;
  readonly fill?: string;
  readonly stroke?: string;
  readonly preBtnStyle?: ShapeStyle;
  readonly nextBtnStyle?: ShapeStyle;
  readonly playBtnStyle?: ShapeStyle;
  readonly fontFamily?: string;
  readonly timePointControllerText?: string;
  readonly timeRangeControllerText?: string;
}>;

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

  private fontFamily: string;

  private speedGroup: IGroup;

  private toggleGroup: IGroup;

  private speedText: IShape;

  private speedPoint: IShape;

  private speedAxisY: number[];

  // 当前播放速度
  private currentSpeed: number;

  private currentType: 'single' | 'range';

  constructor(cfg: ControllerCfg) {
    this.controllerCfg = deepMix({}, DEFAULT_CONTROLLER_CONFIG, cfg);

    this.group = cfg.group;
    this.speedAxisY = [];
    this.currentSpeed = this.controllerCfg.speed;
    this.currentType = 'range';
    this.fontFamily = cfg.fontFamily || 'Arial, sans-serif';
    this.init();
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
    const {
      width,
      height,
      x,
      y,
      hiddleToggle,
      fill = DEFAULT_RECT_FILL,
      stroke = DEFAULT_RECT_STROKE,
      playBtnStyle = DEFAULT_PLAYBTN_STYLE,
      preBtnStyle = DEFAULT_PREBTN_STYLE,
      nextBtnStyle = DEFAULT_NEXTBTN_STYLE,
    } = controllerCfg;

    const r = height / 2 - 5;
    const realY = y + 10;

    // 绘制最外层的矩形包围框
    const container = this.group.addShape('rect', {
      attrs: {
        x,
        y: realY,
        width,
        height,
        stroke,
        fill,
      },
      name: 'container-rect',
    });

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
        style: playBtnStyle,
      });
    }

    // 后退按钮
    this.group.addShape('path', {
      attrs: {
        path: this.getPreMarkerPath(width / 2 - 5 * r, realY + r + 5, r * 0.5),
        ...preBtnStyle,
      },
      name: 'preStepBtn',
    });
    this.group.addShape('path', {
      attrs: {
        path: this.getPreMarkerPath(width / 2 - 4.5 * r, realY + r + 5, r * 0.5),
        ...preBtnStyle,
      },
      name: 'preStepBtn',
    });

    // 前进按钮
    this.group.addShape('path', {
      attrs: {
        path: this.getNextMarkerPath(width / 2 + 5 * r, realY + r + 5, r * 0.5),
        ...nextBtnStyle,
      },
      name: 'nextStepBtn',
    });
    this.group.addShape('path', {
      attrs: {
        path: this.getNextMarkerPath(width / 2 + 4.5 * r, realY + r + 5, r * 0.5),
        ...nextBtnStyle,
      },
      name: 'nextStepBtn',
    });
    container.toBack();

    // 调节speed的按钮
    this.renderSpeedBtn();
    if (!hiddleToggle) {
      this.renderToggleTime();
    }
    this.bindEvent();
  }

  private renderSpeedBtn() {
    const { y, width, hiddleToggle } = this.controllerCfg;
    const speedGroup = this.group.addGroup({
      name: 'speed-group',
    });

    this.speedGroup = speedGroup;

    let count = 1;
    const speedNum = [];
    let maxSpeed = 5;
    this.speedAxisY = [19, 22, 26, 32, 39]
    // 增加speed刻度
    for (let i = 0; i < 5; i++) {
      const axisY = y + this.speedAxisY[i];
      // 灰色刻度
      const startX =  width - (!hiddleToggle ? SPEED_CONTROLLER_OFFSET : TOGGLE_MODEL_OFFSET);
      speedGroup.addShape('line', {
        attrs: {
          x1: startX,
          x2: startX + 15,
          y1: axisY,
          y2: axisY,
          lineWidth: 1,
          stroke: '#aaa',
          cursor: 'pointer',
          lineAppendWidth: 5
        },
        speed: maxSpeed,
        name: 'speed-rect',
      });
      this.speedAxisY[i] = axisY;
      speedNum.push(maxSpeed);
      maxSpeed = maxSpeed - 1;
      count++;
    }

    // 速度文本
    this.speedText = speedGroup.addShape('text', {
      attrs: {
        x: width - (!hiddleToggle ? SPEED_CONTROLLER_OFFSET : TOGGLE_MODEL_OFFSET) + 20,
        y: this.speedAxisY[0] + 4,
        text: `1.0X`,
        fill: '#aaa',
        fontFamily: this.fontFamily || 'Arial, sans-serif',
        textBaseline: 'top'
      },
    });

    this.speedPoint = speedGroup.addShape('path', {
      attrs: {
        path: this.getPath(
          width - (!hiddleToggle ? SPEED_CONTROLLER_OFFSET : TOGGLE_MODEL_OFFSET),
          0,
        ),
        fill: '#aaa',
        matrix: [ 1, 0, 0, 0, 1, 0,0, this.speedAxisY[4], 1]
      },
    });
  }

  private getPath(x, y) {
    return [['M', x, y], ['L', x - 10, y - 4], ['L', x - 10, y + 4], ['Z']];
  }

  private renderToggleTime() {
    const { width } = this.controllerCfg;
    this.toggleGroup = this.group.addGroup({
      name: 'toggle-group',
    });

    this.toggleGroup.addShape('rect', {
      attrs: {
        width: 12,
        height: 12,
        x: width - TOGGLE_MODEL_OFFSET,
        y: this.speedAxisY[0] + 4,
        fill: '#fff',
        stroke: '#aaa',
        lineWidth: 2,
        radius: 3,
      },
      isChecked: false,
      name: 'toggle-model',
    });

    this.checkedIcon = this.toggleGroup.addShape('path', {
      attrs: {
        path: [
          ['M', width - TOGGLE_MODEL_OFFSET + 3, this.speedAxisY[1] + 6],
          ['L', width - TOGGLE_MODEL_OFFSET + 7, this.speedAxisY[1] + 10],
          ['L', width - TOGGLE_MODEL_OFFSET + 12, this.speedAxisY[1] + 4],
        ],
        stroke: 'green',
        lineWidth: 3,
      },
      capture: false,
    });

    this.checkedIcon.hide();

    this.checkedText = this.toggleGroup.addShape('text', {
      attrs: {
        text: this.controllerCfg?.timePointControllerText || '单一时间',
        x: width - TOGGLE_MODEL_OFFSET + 15,
        y: this.speedAxisY[0] + 4,
        textBaseline: 'top',
        fill: '#aaa',
        fontFamily:
          typeof window !== 'undefined'
            ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') ||
              'Arial, sans-serif'
            : 'Arial, sans-serif',
      },
    });
  }

  private bindEvent() {
    this.speedGroup.on('speed-rect:click', (evt) => {
      const currentPointerY = evt.target.attr('y1');
      let pointerMatrix = this.speedPoint.attr('matrix')
      const currentYIdx = this.speedAxisY.indexOf(pointerMatrix[7] || 0);
      const targetYIdx = this.speedAxisY.indexOf(currentPointerY);
      const yDiff = this.speedAxisY[targetYIdx] - this.speedAxisY[currentYIdx];

      pointerMatrix = transform(pointerMatrix, [
        ['t', 0, yDiff]]);
      
      this.speedPoint.setMatrix(pointerMatrix)
      this.currentSpeed = this.speedAxisY.length - targetYIdx;
      this.speedText.attr('text', `${this.currentSpeed}.0X`);
      this.group.emit(TIMEBAR_CONFIG_CHANGE, {
        speed: this.currentSpeed,
        type: this.currentType,
      });
    });

    this.speedGroup.on('mousewheel', evt => {
      evt.preventDefault()
      let pointerMatrix = this.speedPoint.attr('matrix') || [1, 0, 0, 0, 1, 0, 0, 0, 1];
      const currentPointerY = pointerMatrix[7];
      let currentYIdx = this.speedAxisY.indexOf(currentPointerY);
      if (currentYIdx === -1) {
        // 找到最近的一个 y
        let minDist = Infinity;
        this.speedAxisY.forEach((y, idx) => {
          const dist = Math.abs(y - currentPointerY);
          if (minDist > dist) {
            minDist = dist;
            currentYIdx = idx;
          }
        })
      }
      if (evt.originalEvent.deltaY > 0) currentYIdx = Math.max(0, currentYIdx - 1);
      else currentYIdx = Math.min(this.speedAxisY.length - 1, currentYIdx + 1);

      const yDiff = this.speedAxisY[currentYIdx] - currentPointerY;
      const step = yDiff === 0 ? 0 : yDiff > 0 ? -1 : 1;
      pointerMatrix = transform(pointerMatrix, [
        ['t', 0, yDiff]]);
      
      this.speedPoint.setMatrix(pointerMatrix)
      this.currentSpeed = this.speedAxisY.length - currentYIdx;
      this.speedText.attr('text', `${this.currentSpeed}.0X`);
      this.group.emit(TIMEBAR_CONFIG_CHANGE, {
        speed: this.currentSpeed,
        type: this.currentType,
      });
    })

    if (this.toggleGroup) {
      this.toggleGroup.on('toggle-model:click', (evt) => {
        const isChecked = evt.target.get('isChecked');
        if (!isChecked) {
          this.checkedIcon.show();
          this.checkedText.attr('text', this.controllerCfg?.timeRangeControllerText || '时间范围');
          this.currentType = 'single';
        } else {
          this.checkedIcon.hide();
          this.checkedText.attr('text', this.controllerCfg?.timePointControllerText || '单一时间');
          this.currentType = 'range';
        }
        evt.target.set('isChecked', !isChecked);
        this.group.emit(TIMEBAR_CONFIG_CHANGE, {
          type: this.currentType,
          speed: this.currentSpeed,
        });
      });
    }
  }

  public destroy() {
    this.speedGroup.off('speed-rect:click');
    if (this.toggleGroup) {
      this.toggleGroup.off('toggle-model:click');
      this.toggleGroup.destroy();
    }
    this.speedGroup.destroy();
  }
}
