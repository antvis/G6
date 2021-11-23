import { IGroup, IShape } from '@antv/g-base';
import { deepMix } from '@antv/util';
import { ext } from '@antv/matrix-util';
import Button from './timeButton';
import { TIMEBAR_CONFIG_CHANGE, PRE_STEP_BTN, NEXT_STEP_BTN, ExtendedShapeStyle } from './constant';

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

const DEFAULT_SPEED_CONTROLLER_STYLE = {
  pointer: {
    fill: '#aaa',
    lineWidth: 0,
  },
  scroller: {
    stroke: '#aaa',
    fill: '#aaa',
    lineWidth: 1,
    lineAppendWidth: 5,
    cursor: 'pointer',
  },
  text: {
    fill: '#aaa',
    textBaseline: 'top',
  },
};

const DEFAULT_TIMETYPE_CONTROLLER_STYLE = {
  check: {
    stroke: 'green',
    lineWidth: 3,
  },
  box: {
    fill: '#fff',
    stroke: '#aaa',
    lineWidth: 2,
    radius: 3,
    width: 12,
    height: 12,
  },
  text: {
    fill: '#aaa',
    fontSize: 12,
    textBaseline: 'top',
  },
};

const DEFAULT_CONTROLLER_CONFIG = {
  speed: 1,
  loop: false,
  fill: '#fff',
  stroke: '#fff',
  hideTimeTypeController: false,
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
  speedControllerStyle: DEFAULT_SPEED_CONTROLLER_STYLE,
  timeTypeControllerStyle: DEFAULT_TIMETYPE_CONTROLLER_STYLE,
};

const SPEED_CONTROLLER_OFFSET = 110;
const TOGGLE_MODEL_OFFSET = 50;

export type ControllerCfg = Partial<{
  readonly group: IGroup;

  /** 控制栏的起始位置以及宽高，width height 将不缩放内部子控制器，仅影响它们的位置分布。需要缩放请使用 scale */
  readonly x?: number;
  readonly y?: number;
  readonly width: number;
  readonly height: number;
  /** 控制器背景的颜色和描边色 */
  readonly fill?: string;
  readonly stroke?: string;
  /** 整个控制栏的字体样式，优先级低于各个子控制器的 text 内的 fontFamily */
  readonly fontFamily?: string;

  /** 控制栏缩放比例 */
  readonly scale?: number;

  /** 播放速度，1 个 tick 花费时间 */
  readonly speed?: number;
  /** 是否循环播放 */
  readonly loop?: boolean;
  readonly hideTimeTypeController: boolean;

  /** ‘上一帧’按钮的样式，同时可以为其配置 scale、offsetX、offsetY 单独控制该控制器的缩放以及平移 */
  readonly preBtnStyle?: ExtendedShapeStyle;
  /** ‘下一帧’按钮的样式，同时可以为其配置 scale、offsetX、offsetY 单独控制该控制器的缩放以及平移 */
  readonly nextBtnStyle?: ExtendedShapeStyle;
  /** ‘播放’ 与 ‘暂停’ 按钮的样式，同时可以为其配置 scale、offsetX、offsetY 单独控制该控制器的缩放以及平移 */
  readonly playBtnStyle?: ExtendedShapeStyle;
  /** 控制栏背景方框的样式 */
  readonly containerStyle?: ExtendedShapeStyle;

  /** ‘速度控制器’ 的样式，包括速度的指针、速度指示滚轮（横线）、文本的样式，以及整个速度控制器的缩放（scale）与左右偏移（offsetX，offsetY） */
  readonly speedControllerStyle?: {
    offsetX?: number;
    offsetY?: number;
    scale?: number;
    pointer?: ExtendedShapeStyle;
    scroller?: ExtendedShapeStyle;
    text?: ExtendedShapeStyle;
  };

  /** ‘播放时间类型切换器’ 的样式，包括 checkbox 的框、checkbox 的选中勾、文本的样式，以及整个播放时间类型控制器的缩放（scale）与左右偏移（offsetX，offsetY） */
  readonly timeTypeControllerStyle?: {
    offsetX?: number;
    offsetY?: number;
    scale?: number;
    check?: ExtendedShapeStyle;
    box?: ExtendedShapeStyle;
    text?: ExtendedShapeStyle;
  };
  /** 播放时间类型切换器单一文本时的文本，默认为‘单一时间’ */
  readonly timePointControllerText?: string;
  /** 播放时间类型切换器单一文本时的文本，默认为‘时间范围’ */
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

  private controllerGroup: IGroup;

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
    this.controllerGroup = this.group.addGroup({
      name: 'controller-group',
    });
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
      ['Z', x, y - len],
      ['M', x, y],
      ['L', x - len, y - len],
      ['L', x - len, y + len],
      ['Z'],
    ];
  }

  private getPreMarkerPath(x, y, len) {
    return [
      ['M', x, y - len],
      ['L', x - len, y],
      ['L', x, y + len],
      ['L', x, y - len],
      ['M', x, y],
      ['L', x + len, y - len],
      ['L', x + len, y + len],
      ['Z'],
    ];
  }

  private renderPlayButton() {
    const { controllerCfg } = this;
    const {
      width,
      height,
      x,
      y,
      hideTimeTypeController,
      fill = DEFAULT_RECT_FILL,
      stroke = DEFAULT_RECT_STROKE,
      containerStyle = {}
    } = controllerCfg;

    const playBtnStyle = {
      ...DEFAULT_PLAYBTN_STYLE,
      ...(controllerCfg.playBtnStyle || {}),
    };
    const preBtnStyle = {
      ...DEFAULT_PREBTN_STYLE,
      ...(controllerCfg.preBtnStyle || {}),
    };
    const nextBtnStyle = {
      ...DEFAULT_NEXTBTN_STYLE,
      ...(controllerCfg.nextBtnStyle || {}),
    };

    const r = height / 2 - 5;
    const realY = y + 10;

    // 绘制最外层的矩形包围框
    const container = this.controllerGroup.addShape('rect', {
      attrs: {
        x,
        y: realY,
        width,
        height,
        stroke,
        fill,
        ...containerStyle
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
        group: this.controllerGroup,
        x: width / 2,
        y: realY + r + 5,
        r,
        isPlay: this.isPlay,
        style: playBtnStyle,
      });
    }

    // 后退按钮
    const prePaddingX = preBtnStyle.offsetX || 0;
    const prePaddingY = preBtnStyle.offsetY || 0;
    const preR = (preBtnStyle.scale || 1) * r;
    this.controllerGroup.addShape('path', {
      attrs: {
        path: this.getPreMarkerPath(
          width / 2 - 5 * r + prePaddingX,
          realY + r + 5 + prePaddingY,
          preR * 0.5,
        ),
        ...preBtnStyle,
      },
      name: PRE_STEP_BTN,
    });

    // 前进按钮
    const nxtPaddingX = nextBtnStyle.offsetX || 0;
    const nxtPaddingY = nextBtnStyle.offsetY || 0;
    const nxtR = (nextBtnStyle.scale || 1) * r;
    this.controllerGroup.addShape('path', {
      attrs: {
        path: this.getNextMarkerPath(
          width / 2 + 5 * r + nxtPaddingX,
          realY + r + 5 + nxtPaddingY,
          nxtR * 0.5,
        ),
        ...nextBtnStyle,
      },
      name: NEXT_STEP_BTN,
    });

    container.toBack();

    // 调节speed的按钮
    this.renderSpeedBtn();
    if (!hideTimeTypeController) {
      this.renderToggleTime();
    }
    this.bindEvent();

    // 根据配置的 scale、offsetX，offsetY 缩放和移动控制栏
    const { scale = 1 } = this.controllerCfg;
    const currentBBox = this.controllerGroup.getCanvasBBox();
    const centerX = (currentBBox.maxX + currentBBox.minX) / 2;
    const centerY = (currentBBox.maxY + currentBBox.minY) / 2;
    const matrix = transform(
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [
        ['t', -centerX, -centerY],
        ['s', scale, scale],
        ['t', centerX, centerY],
      ],
    );
    this.controllerGroup.setMatrix(matrix);
  }

  private renderSpeedBtn() {
    const { y, width, hideTimeTypeController } = this.controllerCfg;
    const speedControllerStyle = {
      ...DEFAULT_SPEED_CONTROLLER_STYLE,
      ...(this.controllerCfg.speedControllerStyle || {}),
    };
    const {
      scroller = {},
      text = {},
      pointer = {},
      scale = 1,
      offsetX = 0,
      offsetY = 0,
    } = speedControllerStyle;
    const speedGroup = this.controllerGroup.addGroup({
      name: 'speed-group',
    });

    this.speedGroup = speedGroup;

    const speedNum = [];
    let maxSpeed = 5;
    this.speedAxisY = [19, 22, 26, 32, 39];
    // 增加speed刻度
    for (let i = 0; i < 5; i++) {
      const axisY = y + this.speedAxisY[i];
      // 灰色刻度
      const startX =
        width - (!hideTimeTypeController ? SPEED_CONTROLLER_OFFSET : TOGGLE_MODEL_OFFSET);
      speedGroup.addShape('line', {
        attrs: {
          x1: startX,
          x2: startX + 15,
          y1: axisY,
          y2: axisY,
          ...scroller,
        },
        speed: maxSpeed,
        name: 'speed-rect',
      });
      this.speedAxisY[i] = axisY;
      speedNum.push(maxSpeed);
      maxSpeed = maxSpeed - 1;
    }

    // 速度文本
    this.speedText = speedGroup.addShape('text', {
      attrs: {
        x: width - (!hideTimeTypeController ? SPEED_CONTROLLER_OFFSET : TOGGLE_MODEL_OFFSET) + 20,
        y: this.speedAxisY[0] + 4,
        text: `1.0X`,
        fontFamily: this.fontFamily || 'Arial, sans-serif',
        ...text,
      } as any,
      name: 'speed-text'
    });

    this.speedPoint = speedGroup.addShape('path', {
      attrs: {
        path: this.getPointerPath(
          width - (!hideTimeTypeController ? SPEED_CONTROLLER_OFFSET : TOGGLE_MODEL_OFFSET),
          0,
        ),
        matrix: [1, 0, 0, 0, 1, 0, 0, this.speedAxisY[4], 1],
        ...pointer,
      },
      name: 'speed-pointer'
    });

    // 根据配置在 speedControllerStyle 中的 scale offsetX offsetY 缩放和移动速度控制器
    const currentBBox = this.speedGroup.getCanvasBBox();
    const centerX = (currentBBox.maxX + currentBBox.minX) / 2;
    const centerY = (currentBBox.maxY + currentBBox.minY) / 2;
    let matrix = this.speedGroup.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    matrix = transform(matrix, [
      ['t', -centerX, -centerY],
      ['s', scale, scale],
      ['t', centerX + offsetX * scale, centerY + offsetY * scale],
    ]);
    this.speedGroup.setMatrix(matrix);
  }

  private getPointerPath(x, y) {
    return [['M', x, y], ['L', x - 10, y - 4], ['L', x - 10, y + 4], ['Z']];
  }

  private renderToggleTime() {
    const { width } = this.controllerCfg;

    const timeTypeControllerStyle = {
      ...DEFAULT_TIMETYPE_CONTROLLER_STYLE,
      ...(this.controllerCfg.timeTypeControllerStyle || {}),
    };

    const {
      scale = 1,
      offsetX = 0,
      offsetY = 0,
      box = {},
      check = {},
      text = {},
    } = timeTypeControllerStyle;

    this.toggleGroup = this.controllerGroup.addGroup({
      name: 'toggle-group',
    });

    this.toggleGroup.addShape('rect', {
      attrs: {
        x: width - TOGGLE_MODEL_OFFSET,
        y: this.speedAxisY[0] + 3.5,
        ...box,
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
        ...check,
      },
      capture: false,
      name: 'check-icon'
    });

    this.checkedIcon.hide();

    this.checkedText = this.toggleGroup.addShape('text', {
      attrs: {
        text: this.controllerCfg?.timePointControllerText || '单一时间',
        x: width - TOGGLE_MODEL_OFFSET + 15,
        y: this.speedAxisY[0] + 4,
        fontFamily:
          typeof window !== 'undefined'
            ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') ||
              'Arial, sans-serif'
            : 'Arial, sans-serif',
        ...text,
      } as any,
      name: 'checked-text'
    });

    // 根据配置在 timeTypeControllerStyle 中的 scale offsetX offsetY 缩放和移动速度控制器
    const currentBBox = this.toggleGroup.getCanvasBBox();
    const centerX = (currentBBox.maxX + currentBBox.minX) / 2;
    const centerY = (currentBBox.maxY + currentBBox.minY) / 2;
    let matrix = this.toggleGroup.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    matrix = transform(matrix, [
      ['t', -centerX, -centerY],
      ['s', scale, scale],
      ['t', centerX + offsetX * scale, centerY + offsetY * scale],
    ]);
    this.toggleGroup.setMatrix(matrix);
  }

  private bindEvent() {
    this.speedGroup.on('speed-rect:click', (evt) => {
      const currentPointerY = evt.target.attr('y1');
      let pointerMatrix = this.speedPoint.attr('matrix');
      const currentYIdx = this.speedAxisY.indexOf(pointerMatrix[7] || 0);
      const targetYIdx = this.speedAxisY.indexOf(currentPointerY);
      const yDiff = this.speedAxisY[targetYIdx] - this.speedAxisY[currentYIdx];

      pointerMatrix = transform(pointerMatrix, [['t', 0, yDiff]]);

      this.speedPoint.setMatrix(pointerMatrix);
      this.currentSpeed = this.speedAxisY.length - targetYIdx;
      this.speedText.attr('text', `${this.currentSpeed}.0X`);
      this.group.emit(TIMEBAR_CONFIG_CHANGE, {
        speed: this.currentSpeed,
        type: this.currentType,
      });
    });

    this.speedGroup.on('mousewheel', (evt) => {
      evt.preventDefault();
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
        });
      }
      if (evt.originalEvent.deltaY > 0) currentYIdx = Math.max(0, currentYIdx - 1);
      else currentYIdx = Math.min(this.speedAxisY.length - 1, currentYIdx + 1);

      const yDiff = this.speedAxisY[currentYIdx] - currentPointerY;
      pointerMatrix = transform(pointerMatrix, [['t', 0, yDiff]]);

      this.speedPoint.setMatrix(pointerMatrix);
      this.currentSpeed = this.speedAxisY.length - currentYIdx;
      this.speedText.attr('text', `${this.currentSpeed}.0X`);
      this.group.emit(TIMEBAR_CONFIG_CHANGE, {
        speed: this.currentSpeed,
        type: this.currentType,
      });
    });

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
