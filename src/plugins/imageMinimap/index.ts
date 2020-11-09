import Base, { IPluginBaseConfig } from '../base';
import isString from '@antv/util/lib/is-string';
import createDOM from '@antv/dom-util/lib/create-dom';
import modifyCSS from '@antv/dom-util/lib/modify-css';
import isNil from '@antv/util/lib/is-nil';
import Graph from '../../graph/graph';
import { ShapeStyle } from '../../types';
import { Point } from '@antv/g-math/lib/types';
import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { mat3 } from '@antv/matrix-util';
import { applyMatrix } from '../../util/math';

function getImgNaturalDimension(img, callback?) {
  let nWidth, nHeight;
  if (img.naturalWidth) {
    // 现代浏览器
    nWidth = img.naturalWidth;
    nHeight = img.naturalHeight;
  } else {
    // IE6/7/8
    const image = new Image();
    image.src = img.src;
    image.onload = () => {
      callback?.(image.width, image.height);
    };
  }
  return [nWidth, nHeight];
}

interface MiniMapConfig extends IPluginBaseConfig {
  viewportClassName?: string;
  type?: 'default' | 'keyShape' | 'delegate';
  width?: number | undefined; // minimap 的宽度，优先级高于 height。若设置了 width，则按照主画布容器长宽比确定 height
  height?: number | undefined; // minimap 的高度。若未设置了 width，但设置了 height，则按照主画布容器长宽比确定 width；若设置了 width 则以 width 为准
  delegateStyle?: ShapeStyle;
  refresh?: boolean;
  graphImg?: string;
}

export default class ImageMiniMap extends Base {
  public getDefaultCfgs(): MiniMapConfig {
    return {
      container: null,
      className: 'g6-minimap',
      viewportClassName: 'g6-minimap-viewport',
      width: 200,
      delegateStyle: {
        fill: '#40a9ff',
        stroke: '#096dd9',
      },
      refresh: true,
    };
  }

  public getEvents() {
    return {
      beforepaint: 'updateViewport',
      beforeanimate: 'disableRefresh',
      afteranimate: 'enableRefresh',
      viewportchange: 'disableOneRefresh',
    };
  }

  // 若是正在进行动画，不刷新缩略图
  protected disableRefresh() {
    this.set('refresh', false);
  }

  protected enableRefresh() {
    this.set('refresh', true);
    this.updateCanvas();
  }

  protected disableOneRefresh() {
    this.set('viewportChange', true);
  }

  private initViewport() {
    const cfgs: MiniMapConfig = this._cfgs as MiniMapConfig;
    // cWidth and cHeight are the width and height of the minimap's container
    const { graph } = cfgs;
    if (this.destroyed) return;

    let containerDOM = this.get('container');
    if (isString(containerDOM)) {
      containerDOM = document.getElementById(containerDOM) as HTMLDivElement;
    }
    const viewport = createDOM(
      `<div class=${cfgs.viewportClassName}
      style='position:absolute;
        left:0;
        top:0;
        box-sizing:border-box;
        border: 2px solid #1980ff'>
      </div>`,
    );

    // 计算拖拽水平方向距离
    let x = 0;
    // 计算拖拽垂直方向距离
    let y = 0;
    // 是否在拖拽minimap的视口
    let dragging = false;
    // 缓存viewport当前对于画布的x
    let left = 0;
    // 缓存viewport当前对于画布的y
    let top = 0;
    // 缓存viewport当前宽度
    let width = 0;
    // 缓存viewport当前高度
    let height = 0;
    let ratio = 0;
    let zoom = 0;

    containerDOM.addEventListener(
      'mousedown',
      (e: GraphEvent) => {
        cfgs.refresh = false;
        if (e.target !== viewport) {
          return;
        }

        // 如果视口已经最大了，不需要拖拽
        const { style } = viewport;
        width = parseInt(style.width, 10);
        height = parseInt(style.height, 10);

        const cWidth = this.get('width');
        const cHeight = this.get('height');

        if (width > cWidth || height > cHeight) {
          return;
        }

        zoom = graph!.getZoom();
        ratio = this.get('ratio');

        dragging = true;
        x = e.clientX;
        y = e.clientY;
      },
      false,
    );

    containerDOM.addEventListener(
      'mousemove',
      (e: GraphEvent) => {
        if (!dragging || isNil(e.clientX) || isNil(e.clientY)) {
          return;
        }

        const cWidth = this.get('width');
        const cHeight = this.get('height');
        const { style } = viewport;

        left = parseInt(style.left, 10);
        top = parseInt(style.top, 10);
        width = parseInt(style.width, 10);
        height = parseInt(style.height, 10);

        let dx = x - e.clientX;
        let dy = y - e.clientY;

        // 若视口移动到最左边或最右边了,仅移动到边界
        if (left - dx < 0) {
          dx = left;
        } else if (left - dx + width >= cWidth) {
          dx = 0;
        }

        // 若视口移动到最上或最下边了，仅移动到边界
        if (top - dy < 0) {
          dy = top;
        } else if (top - dy + height >= cHeight) {
          dy = 0;
        }

        left -= dx;
        top -= dy;

        // 先移动视口，避免移动到边上以后出现视口闪烁
        modifyCSS(viewport, {
          left: `${left}px`,
          top: `${top}px`,
        });

        // graph 移动需要偏移量 dx/dy * 缩放比例才会得到正确的移动距离
        graph!.translate((dx * zoom) / ratio, (dy * zoom) / ratio);

        x = e.clientX;
        y = e.clientY;
      },
      false,
    );

    containerDOM.addEventListener(
      'mouseleave',
      () => {
        dragging = false;
        cfgs.refresh = true;
      },
      false,
    );

    containerDOM.addEventListener(
      'mouseup',
      () => {
        dragging = false;
        cfgs.refresh = true;
      },
      false,
    );

    this.set('viewport', viewport);
    containerDOM.appendChild(viewport);
  }

  /**
   * 更新 viewport 视图
   */
  private updateViewport() {
    if (this.destroyed) return;
    const ratio: number = this.get('ratio');
    const cWidth: number = this.get('width');
    const cHeight: number = this.get('height');
    const graph: Graph = this.get('graph');
    const graphWidth = graph.get('width');
    const graphHeight = graph.get('height');
    const aspectRatio = graphWidth / graphHeight;

    const graphGroup = graph.getGroup();
    // 主图的 bbox（矩阵变换相关的 bbox）
    const graphCanvasBBox = graphGroup.getCanvasBBox();

    // 扩展 graphBBox 到和 graphWidth / graphHeight 等比
    const graphCanvasBBoxMean = [
      (graphCanvasBBox.minX + graphCanvasBBox.maxX) / 2,
      (graphCanvasBBox.minY + graphCanvasBBox.maxY) / 2,
    ];
    const graphCanvasBBoxSize = [
      graphCanvasBBox.maxX - graphCanvasBBox.minX,
      graphCanvasBBox.maxY - graphCanvasBBox.minY,
    ];
    const expandedGraphCanvasBBox = {
      centerX: graphCanvasBBoxMean[0],
      centerY: graphCanvasBBoxMean[1],
      width: 0,
      height: 0,
      minX: 0,
      minY: 0,
    };
    if (graphCanvasBBox[0] / graphCanvasBBox[1] > aspectRatio) {
      expandedGraphCanvasBBox.width = graphCanvasBBoxSize[0];
      expandedGraphCanvasBBox.height = expandedGraphCanvasBBox.width / aspectRatio;
    } else {
      expandedGraphCanvasBBox.height = graphCanvasBBoxSize[1];
      expandedGraphCanvasBBox.width = expandedGraphCanvasBBox.height * aspectRatio;
    }
    expandedGraphCanvasBBox.minX = graphCanvasBBoxMean[0] - expandedGraphCanvasBBox.width / 2;
    expandedGraphCanvasBBox.minY = graphCanvasBBoxMean[1] - expandedGraphCanvasBBox.height / 2;

    let graphMatrix = graphGroup.getMatrix();
    if (!graphMatrix) graphMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const invertGraphMatrix = mat3.invert([], graphMatrix);
    const minXY = applyMatrix(
      { x: expandedGraphCanvasBBox.minX, y: expandedGraphCanvasBBox.minY },
      invertGraphMatrix,
    );

    // 扩展 graphBBox 后的 bbox 的左上角对应的 canvas container 坐标
    const topLeft: Point = graph.getCanvasByPoint(minXY.x, minXY.y);

    const viewport: HTMLElement = this.get('viewport');
    if (!viewport) {
      this.initViewport();
    }

    // Viewport 与 minimap container 的比例 =  Graph container 与 expandedGraphBBox 比例
    const vpToMc = graphWidth / expandedGraphCanvasBBox.width;
    // viewport 宽高 = vpToMc * minimap container 宽高
    let width = vpToMc * cWidth;
    let height = vpToMc * cHeight;

    // vierport 左上角到 minimap container 的距离 / minimap container 宽高
    // = 主图 expandedBBox 左上角 canvas container 坐标距离 / expandedBBox 宽高
    let left = (cWidth * -topLeft.x) / expandedGraphCanvasBBox.width;
    let top = (cHeight * -topLeft.y) / expandedGraphCanvasBBox.height;

    const right = left + width;
    const bottom = top + height;

    if (left < 0) {
      width += left;
      left = 0;
    }
    if (right > cWidth) {
      width = width - (right - cWidth);
    }
    if (top < 0) {
      height += top;
      top = 0;
    }
    if (bottom > cHeight) {
      height = height - (bottom - cHeight);
    }
    // 缓存目前缩放比，在移动 minimap 视窗时就不用再计算大图的移动量
    this.set('ratio', ratio);

    const correctLeft: number | string = `${left}px`;
    const correctTop: number | string = `${top}px`;

    modifyCSS(viewport, {
      left: correctLeft,
      top: correctTop,
      width: `${width}px`,
      height: `${height}px`,
    });
  }

  public init() {
    this.initContainer();
  }

  /**
   * 初始化 Minimap 的容器
   */
  public initContainer() {
    const self = this;
    const graph: Graph = self.get('graph');
    const graphWidth = graph.get('width');
    const graphHeight = graph.get('height');
    const aspectRatio = graphHeight / graphWidth;
    const className: string = self.get('className');
    let parentNode: string | HTMLElement = self.get('container');
    // size of the minimap's container
    let cWidth = self.get('width');
    let cHeight = self.get('height');

    if (!cWidth && !cHeight) {
      cWidth = 200;
    }
    if (cWidth) {
      cHeight = aspectRatio * cWidth;
      self.set('height', cHeight);
    } else {
      cWidth = (1 / aspectRatio) * cHeight;
      self.set('width', cWidth);
    }

    const container: HTMLElement = createDOM(
      `<div class='${className}' style='width: ${cWidth}px; height: ${cHeight}px; overflow: hidden; position: relative;'></div>`, //
    );

    if (isString(parentNode)) {
      parentNode = document.getElementById(parentNode) as HTMLElement;
    }

    if (parentNode) {
      parentNode.appendChild(container);
    } else {
      graph.get('container').appendChild(container);
    }

    self.set('container', container);

    const containerDOM = createDOM(
      `<div class="g6-minimap-container" style="position: relative; width: 100%; height: 100%; text-align: center; display: table;"></div>`,
    );
    container.appendChild(containerDOM);
    const span = createDOM(`<span style="display: table-cell; vertical-align: middle; "></span>`);
    containerDOM.appendChild(span);

    self.set('containerDOM', containerDOM);
    self.set('containerSpan', span);

    const img = createDOM(
      `<img alt="" src="${this.get(
        'graphImg',
      )}" style="display: inline-block;" ondragstart="return false;" onselectstart="return false;"/>`,
    );
    self.set('imgDOM', img);

    self.updateImgSize();
    span.appendChild(img);
    self.updateCanvas();
  }

  private updateImgSize() {
    const self = this;
    const imgDOM = self.get('imgDOM');
    const cWidth = self.get('width');
    const cHeight = self.get('height');

    imgDOM.onload = () => {
      const naturalSize = getImgNaturalDimension(imgDOM);
      if (naturalSize[0] > naturalSize[1]) {
        imgDOM.width = cWidth;
      } else {
        imgDOM.height = cHeight;
      }
    };
  }

  public updateCanvas() {
    // 如果是在动画，则不刷新视图
    const isRefresh: boolean = this.get('refresh');
    if (!isRefresh) {
      return;
    }
    const graph: Graph = this.get('graph');
    if (graph.get('destroyed')) {
      return;
    }

    // 如果是视口变换，也不刷新视图，但是需要重置视口大小和位置
    if (this.get('viewportChange')) {
      this.set('viewportChange', false);
      this.updateViewport();
    }

    const cWidth: number = this.get('width');

    const graphBBox = graph.get('canvas').getCanvasBBox();

    const width = graphBBox.width;

    const ratio = cWidth / width;

    // // 更新minimap视口
    this.set('ratio', ratio);
    this.updateViewport();
  }

  /**
   * 获取minimap的窗口
   * @return {HTMLElement} 窗口的dom实例
   */
  public getViewport(): HTMLElement {
    return this.get('viewport');
  }

  /**
   * 获取minimap的容器dom
   * @return {HTMLElement} dom
   */
  public getContainer(): HTMLElement {
    return this.get('container');
  }

  public updateGraphImg(img: string) {
    const self = this;

    const oriImgDOM = self.get('imgDOM');
    oriImgDOM.remove();

    self.set('graphImg', img);
    const imgDOM = createDOM(
      `<img alt="" src="${img}" style="display: inline-block;" ondragstart="return false;" onselectstart="return false;"/>`,
    );
    self.set('imgDOM', imgDOM);

    imgDOM.src = img;
    self.updateImgSize();

    const span = self.get('containerSpan');
    span.appendChild(imgDOM);
    self.updateCanvas();
  }

  public destroy() {
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}
