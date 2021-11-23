/**
 * 基于 G 的按钮组件
 */

import { IGroup, IShape } from '@antv/g-base';
import { deepMix } from '@antv/util';
import { PLAY_PAUSE_BTN, ExtendedShapeStyle } from './constant';

/** 播放按钮配置 */
interface ButtonCfg {
  group: IGroup;
  /** 按钮位置数据 */
  readonly x: number;
  readonly y: number;
  readonly r: number;
  readonly isPlay: boolean;
  readonly style: ExtendedShapeStyle;
}

export default class Button {
  /** button 配置 */
  private config: ButtonCfg;

  /** 圆点 */
  private circle: IShape;

  /** 开始 marker */
  private startMarker: IShape;

  /** 暂停 marker */
  private pauseMarkerGroup: IGroup;
  private startMarkerGroup: IGroup;

  private pauseLeftMarker: IShape;

  private pauseRightMarker: IShape;

  constructor(cfg: ButtonCfg) {
    this.config = deepMix({}, cfg);

    this.init();
  }

  public update(cfg: Partial<ButtonCfg>) {
    this.config = deepMix({}, this.config, cfg);
    this.updateElement();
    this.renderMarker();
  }

  private init() {
    this.initElement();
    this.renderMarker();
  }

  private initElement() {
    const { group, style } = this.config;
    const { scale = 1, offsetX = 0, offsetY = 0 } = style;
    const x = this.config.x + offsetX;
    const y = this.config.y + offsetY;
    const buttonGroup = group.addGroup({
      name: PLAY_PAUSE_BTN,
    });
    this.startMarkerGroup = buttonGroup.addGroup({
      name: PLAY_PAUSE_BTN,
    });
    this.circle = group.addShape('circle', {
      attrs: {
        x,
        y,
        r: this.config.r * scale,
        ...style,
      },
      name: PLAY_PAUSE_BTN,
    });

    this.startMarker = this.startMarkerGroup.addShape('path', {
      attrs: {
        path: this.getStartMarkerPath(x, y, scale),
        fill: style.stroke || '#aaa',
      },
      name: 'start-marker'
    });

    this.pauseMarkerGroup = buttonGroup.addGroup({
      name: PLAY_PAUSE_BTN,
    });
    const width = 0.25 * this.config.r * scale;
    const height = 0.5 * this.config.r * Math.sqrt(3) * scale;
    this.pauseLeftMarker = this.pauseMarkerGroup.addShape('rect', {
      attrs: {
        x: x - 0.375 * this.config.r * scale,
        y: y - height / 2,
        width,
        height,
        fill: style.stroke || '#aaa',
        lineWidth: 0,
      },
    });

    this.pauseRightMarker = this.pauseMarkerGroup.addShape('rect', {
      attrs: {
        x: x + (1 / 8) * this.config.r * scale,
        y: y - height / 2,
        width,
        height,
        fill: style.stroke || '#aaa',
        lineWidth: 0,
      },
    });
  }

  private updateElement() {
    const { scale = 1, offsetX = 0, offsetY = 0 } = this.config.style;
    const x = this.config.x + offsetX;
    const y = this.config.y + offsetY;
    this.circle.attr('x', x);
    this.circle.attr('y', y);
    this.circle.attr('r', this.config.r * scale);

    this.startMarker.attr('path', this.getStartMarkerPath(x, y, scale));

    const width = 0.25 * this.config.r * scale;
    const height = 0.5 * this.config.r * Math.sqrt(3) * scale;

    this.pauseLeftMarker.attr('x', x - (1 / 4 + 1 / 8) * this.config.r * scale);
    this.pauseLeftMarker.attr('y', y - height / 2);
    this.pauseLeftMarker.attr('width', width);
    this.pauseLeftMarker.attr('height', height);

    this.pauseRightMarker.attr('x', x + (1 / 8) * this.config.r * scale);
    this.pauseRightMarker.attr('y', y - height / 2);
    this.pauseRightMarker.attr('width', width);
    this.pauseRightMarker.attr('height', height);
  }

  private renderMarker() {
    if (this.config.isPlay) {
      this.startMarkerGroup.hide();
      this.pauseMarkerGroup.show();
    } else {
      this.startMarkerGroup.show();
      this.pauseMarkerGroup.hide();
    }
  }

  /** 获取播放键 marker path */
  private getStartMarkerPath(x, y, scale) {
    const sideLength = 0.5 * this.config.r * Math.sqrt(3) * scale;
    return [
      ['M', x - sideLength / Math.sqrt(3) / 2, y - sideLength / 2],
      ['L', x + sideLength / Math.sqrt(3), y],
      ['L', x - sideLength / Math.sqrt(3) / 2, y + sideLength / 2],
    ];
  }
}
