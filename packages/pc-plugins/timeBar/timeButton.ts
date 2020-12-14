/**
 * 基于 G 的按钮组件
 */

import { IGroup, IShape } from '@antv/g-base';
import { deepMix } from '@antv/util';
import { ShapeStyle } from '../../types';

/** 播放按钮配置 */
interface ButtonCfg {
  group: IGroup;
  /** 按钮位置数据 */
  readonly x: number;
  readonly y: number;
  readonly r: number;
  readonly isPlay: boolean;
  readonly style: ShapeStyle;
}

export default class Button {
  /** button 配置 */
  private config: ButtonCfg;

  /** 圆点 */
  private circle: IShape;

  /** 开始 marker */
  private startMarker: IShape;

  /** 暂停 marker */
  private pauseGroupMarker: IGroup;

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
    this.circle = group.addShape('circle', {
      attrs: {
        x: this.config.x,
        y: this.config.y,
        r: this.config.r,
        ...style,
      },
    });

    this.startMarker = group.addShape('path', {
      attrs: {
        path: this.getStartMarkerPath(),
        fill: '#ccc',
      },
      name: 'playPauseBtn',
    });

    this.pauseGroupMarker = group.addGroup();
    const width = (1 / 4) * this.config.r;
    const height = 0.5 * this.config.r * Math.sqrt(3);
    this.pauseGroupMarker.addShape('rect', {
      attrs: {
        x: this.config.x - (1 / 4 + 1 / 8) * this.config.r,
        y: this.config.y - height / 2,
        width: width * 2.5,
        height,
        fill: '#fff',
      },
      name: 'playPauseBtn',
    });
    this.pauseLeftMarker = this.pauseGroupMarker.addShape('rect', {
      attrs: {
        x: this.config.x - (1 / 4 + 1 / 8) * this.config.r,
        y: this.config.y - height / 2,
        width,
        height,
        fill: '#ccc',
      },
      name: 'playPauseBtn',
    });

    this.pauseRightMarker = this.pauseGroupMarker.addShape('rect', {
      attrs: {
        x: this.config.x + (1 / 8) * this.config.r,
        y: this.config.y - height / 2,
        width,
        height,
        fill: '#ccc',
      },
      name: 'playPauseBtn',
    });
  }

  private updateElement() {
    this.circle.attr('x', this.config.x);
    this.circle.attr('y', this.config.y);
    this.circle.attr('r', this.config.r);

    this.startMarker.attr('path', this.getStartMarkerPath());

    const width = (1 / 4) * this.config.r;
    const height = 0.5 * this.config.r * Math.sqrt(3);

    this.pauseLeftMarker.attr('x', this.config.x - (1 / 4 + 1 / 8) * this.config.r);
    this.pauseLeftMarker.attr('y', this.config.y - height / 2);
    this.pauseLeftMarker.attr('width', width);
    this.pauseLeftMarker.attr('height', height);

    this.pauseRightMarker.attr('x', this.config.x + (1 / 8) * this.config.r);
    this.pauseRightMarker.attr('y', this.config.y - height / 2);
    this.pauseRightMarker.attr('width', width);
    this.pauseRightMarker.attr('height', height);
  }

  private renderMarker() {
    if (this.config.isPlay) {
      this.startMarker.hide();
      this.pauseGroupMarker.show();
    } else {
      this.startMarker.show();
      this.pauseGroupMarker.hide();
    }
  }

  /** 获取播放键 marker path */
  private getStartMarkerPath() {
    const sideLength = 0.5 * this.config.r * Math.sqrt(3);
    return [
      ['M', this.config.x - sideLength / Math.sqrt(3) / 2, this.config.y - sideLength / 2],
      ['L', this.config.x + sideLength / Math.sqrt(3), this.config.y],
      ['L', this.config.x - sideLength / Math.sqrt(3) / 2, this.config.y + sideLength / 2],
    ];
  }
}
