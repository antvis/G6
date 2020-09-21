import { IGroup, IShape } from '@antv/g-base';
import createDOM from '@antv/dom-util/lib/create-dom'
import { dataToPath, linePathToAreaPath } from './path';
import { isNumber, isString } from '@antv/util';
import modifyCSS from '@antv/dom-util/lib/modify-css';

export const BACKGROUND_STYLE = {
  opacity: 0.5,
  fill: '#000',
};
export const ARROW_STYLE = {
  opacity: 0.5,
  fill: '#000',
  r: 5
};
export const TEXT_STYLE = {
  fill: '#fff',
  fontSize: 12
};

interface ArrowStyle {
  r?: number,
  fill?: string,
  stroke?: string,
  lineWidth?: number
};

export interface TimeBarTooltipCfg {
  readonly container: HTMLElement | string;
  readonly className?: string;
  // 位置大小
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number[];
  // 文本
  readonly text?: string;
  // 样式
  readonly backgroundColor?: string;
  readonly textColor?: string;
  readonly opacity?: number;
  readonly fontSize?: number;
}

/**
 * 缩略趋势图
 */
export default class TimeBarTooltip {
  private container: HTMLElement | string;
  private className: string;
  // 生成的 shape
  public backgroundDOM: HTMLElement;
  public arrowDOM: HTMLElement;
  // 位置大小配置
  private x: number;
  private y: number;
  // style
  private padding: number[];
  private backgroundColor: string;
  private textColor: string;
  private parentHeight: number;
  private parentWidth: number;
  private opacity: number;
  private fontSize: number;

  private text: string;

  constructor(cfg?: TimeBarTooltipCfg) {
    const {
      x = 0,
      y = 0,
      container,
      text,
      padding = [4, 4, 4, 4],
      className = 'g6-component-timebar-tooltip',
      backgroundColor = '#000',
      textColor = '#fff',
      opacity = 0.8,
      fontSize = 12
    } = cfg;

    this.container = container;
    this.className = className;
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;

    this.x = x;
    this.y = y;
    this.text = text;
    this.padding = padding;
    this.opacity = opacity;
    this.fontSize = fontSize;

    this.render();
  }

  /**
   * 首次渲染
   * @private
   */
  private render() {
    const self = this;
    const { className, x, y, backgroundColor,
      textColor, text, padding, opacity, fontSize } = self;

    let parentNode: string | HTMLElement = self.container;
    const container: HTMLElement = createDOM(
      `<div class='${className}' style="position: absolute; width: fit-content; height: fit-content; opacity: ${opacity}"></div>`,
    );
    if (isString(parentNode)) {
      parentNode = document.getElementById(parentNode) as HTMLElement;
    }
    parentNode.appendChild(container);
    self.parentHeight = parentNode.offsetHeight;
    self.parentWidth = parentNode.offsetWidth;
    modifyCSS(container, { visibility: 'hidden', top: 0, left: 0 });

    const background: HTMLElement = createDOM(`
      <div style='position: absolute; white-space:nowrap; background-color: ${backgroundColor}; font-size: ${fontSize}px; border-radius: 4px; width: fit-content; height: fit-content; color: ${textColor}; padding: ${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px'></div>`);
    background.innerHTML = text;
    container.appendChild(background);
    self.backgroundDOM = background;

    const arrow: HTMLElement = createDOM(
      `<div style='position: absolute; width: 0px; height: 0px; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 10px solid ${backgroundColor}'></div>`
    )
    container.appendChild(arrow);
    self.arrowDOM = arrow;


    self.container = container;
  }

  public show(cfg) {
    const self = this;
    const { text, x, y, clientX, clientY } = cfg;
    self.backgroundDOM.innerHTML = text;
    const backgroundWidth = self.backgroundDOM.offsetWidth;
    const backgroundHeight = self.backgroundDOM.offsetHeight;
    const arrowWidth = self.arrowDOM.offsetWidth;
    const arrowHeight = self.arrowDOM.offsetHeight;
    modifyCSS(self.container as HTMLElement,
      { top: `${-backgroundHeight - arrowHeight}px`, left: `${x}px`, visibility: 'visible', });

    modifyCSS(self.backgroundDOM, { marginLeft: `${-backgroundWidth / 2}px` })
    modifyCSS(self.arrowDOM, { marginLeft: `${-arrowWidth / 2}px`, top: `${backgroundHeight}px` });

    const left = x - backgroundWidth / 2;
    const right = x + backgroundWidth / 2;
    if (left < 0) {
      modifyCSS(self.backgroundDOM, { marginLeft: `${-backgroundWidth / 2 - left}px` })
    } else if (right > self.parentWidth) {
      modifyCSS(self.backgroundDOM, { marginLeft: `${-backgroundWidth / 2 - right + self.parentWidth + 12}px` })
    }
  }
  public hide() {
    const self = this;
    modifyCSS(self.container as HTMLElement, { top: 0, left: 0, visibility: 'hidden', });
  }
}
