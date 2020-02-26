import GCanvas from '@antv/g-canvas/lib/canvas';
import GSVGCanvas from '@antv/g-svg/lib/canvas';
import Base, { IPluginBaseConfig } from '../base';
import isString from '@antv/util/lib/is-string';
import createDOM from '@antv/dom-util/lib/create-dom';
import modifyCSS from '@antv/dom-util/lib/modify-css';
import isNil from '@antv/util/lib/is-nil';
import each from '@antv/util/lib/each';
import Graph from '../../graph/graph';
import { Matrix, ShapeStyle } from '../../types';
import { transform, mat3 } from '@antv/matrix-util';
import { Point } from '@antv/g-math/lib/types';
import { IGroup } from '@antv/g-base/lib/interfaces';
import GraphEvent from '@antv/g-base/lib/event/graph-event';

const { max } = Math;

const DEFAULT_MODE = 'default';
const KEYSHAPE_MODE = 'keyShape';
const DELEGATE_MODE = 'delegate';
const SVG = 'svg';
const CANVAS = 'canvas';

interface MiniMapConfig extends IPluginBaseConfig {
  viewportClassName?: string;
  type?: 'default' | 'keyShape' | 'delegate';
  size: number[];
  delegateStyle?: ShapeStyle;
  refresh?: boolean;
}

export default class MiniMap extends Base {
  constructor(cfg: MiniMapConfig) {
    super(cfg);
  }

  public getDefaultCfgs(): MiniMapConfig {
    return {
      container: null,
      className: 'g6-minimap',
      viewportClassName: 'g6-minimap-viewport',
      // Minimap 中默认展示和主图一样的内容，KeyShape 只展示节点和边的 key shape 部分，delegate表示展示自定义的rect，用户可自定义样式
      type: 'default',
      size: [200, 120],
      delegateStyle: {
        fill: '#40a9ff',
        stroke: '#096dd9',
      },
      refresh: true,
    };
  }

  public getEvents() {
    return {
      beforepaint: 'updateCanvas',
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
    const { size, graph } = cfgs;
    const canvas = this.get('canvas');

    const containerDOM = canvas.get('container');
    const viewport = createDOM(`<div class=${cfgs.viewportClassName} 
      style='position:absolute;
        left:0;
        top:0;
        box-sizing:border-box;
        border: 2px solid #1980ff'></div>`);

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
        left = parseInt(style.left, 10);
        top = parseInt(style.top, 10);
        width = parseInt(style.width, 10);
        height = parseInt(style.height, 10);

        if (width > size[0] || height > size[1]) {
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

        let dx = x - e.clientX;
        let dy = y - e.clientY;

        // 若视口移动到最左边或最右边了,仅移动到边界
        if (left - dx < 0) {
          dx = left;
        } else if (left - dx + width > size[0]) {
          dx = left + width - size[0];
        }

        // 若视口移动到最上或最下边了，仅移动到边界
        if (top - dy < 0) {
          dy = top;
        } else if (top - dy + height > size[1]) {
          dy = top + height - size[1];
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
    const ratio: number = this.get('ratio');
    const dx: number = this.get('dx');
    const dy: number = this.get('dy');
    const graph: Graph = this.get('graph');
    const size: number[] = this.get('size');
    const graphWidth: number = graph.get('width');
    const graphHeight: number = graph.get('height');
    const topLeft: Point = graph.getPointByCanvas(0, 0);
    const bottomRight: Point = graph.getPointByCanvas(graphWidth, graphHeight);
    const viewport: HTMLElement = this.get('viewport');
    if (!viewport) {
      this.initViewport();
    }

    // viewport宽高,左上角点的计算
    let width = (bottomRight.x - topLeft.x) * ratio;
    let height = (bottomRight.y - topLeft.y) * ratio;

    const left = topLeft.x * ratio + dx;
    const top = topLeft.y * ratio + dy;

    if (width > size[0]) {
      width = size[0];
    }

    if (height > size[1]) {
      height = size[1];
    }

    // 缓存目前缩放比，在移动 minimap 视窗时就不用再计算大图的移动量
    this.set('ratio', ratio);

    let correctLeft: number | string = 0;
    let correctTop: number | string = 0;

    // 需要计算viewport在画布内
    if (left >= 0 && left + width <= size[0]) {
      correctLeft = `${left}px`;
    } else if (left < 0) {
      correctLeft = 0;
    } else if (left + width > size[0]) {
      correctLeft = `${size[0] - width}px`;
    }

    if (top >= 0 && top + height <= size[1]) {
      correctTop = `${top}px`;
    } else if (top < 0) {
      correctTop = 0;
    } else if (top + height > size[1]) {
      correctTop = `${size[1] - height}px`;
    }

    modifyCSS(viewport, {
      left: correctLeft,
      top: correctTop,
      width: `${width}px`,
      height: `${height}px`,
    });
  }

  /**
   * 将主图上的图形完全复制到小图
   */
  private updateGraphShapes() {
    const { graph } = this._cfgs;
    const canvas: GCanvas = this.get('canvas');
    const graphGroup = graph!.get('group');
    if (graphGroup.destroyed) return;
    const clonedGroup = graphGroup.clone();
    clonedGroup.resetMatrix();

    canvas.clear();
    canvas.add(clonedGroup);
  }

  // 仅在minimap上绘制keyShape
  // FIXME 如果用户自定义绘制了其他内容，minimap上就无法画出
  private updateKeyShapes() {
    const { graph } = this._cfgs;
    const canvas: GCanvas = this.get('canvas');
    let group: IGroup = canvas.get('children')[0];

    if (!group) {
      group = canvas.addGroup();
      let matrix = graph!.get('group').getMatrix();
      if (!matrix) {
        matrix = mat3.create();
      }
      group.setMatrix(matrix);
    }

    const nodes = graph!.getNodes();
    group.clear();

    this.showGraphEdgeKeyShape(group);

    // 节点需要group配合keyShape
    each(nodes, node => {
      if (node.isVisible()) {
        const parent = group.addGroup();
        let nodeMatrix = node.get('group').attr('matrix');
        if (!nodeMatrix) {
          nodeMatrix = mat3.create();
        }
        parent.setMatrix(nodeMatrix);
        parent.add(node.get('keyShape').clone());
      }
    });
  }

  /**
   * Minimap 中展示自定义的rect，支持用户自定义样式和节点大小
   */
  private updateDelegateShapes() {
    const { graph } = this._cfgs;
    const canvas: GCanvas = this.get('canvas');
    const group = canvas.get('children')[0] || canvas.addGroup();
    const delegateStyle = this.get('delegateStyle');

    group.clear();

    this.showGraphEdgeKeyShape(group);
    each(graph!.getNodes(), (node) => {
      if (node.isVisible()) {
        const bbox = node.getBBox();
        group.addShape('rect', {
          attrs: {
            x: bbox.minX,
            y: bbox.minY,
            width: bbox.width,
            height: bbox.height,
            ...delegateStyle,
          },
          name: 'minimap-node-shape',
        });
      }
    });
  }

  /**
   * 设置只显示 edge 的keyShape
   * @param group IGroup 实例
   */
  private showGraphEdgeKeyShape(group: IGroup) {
    const graph = this.get('graph');
    each(graph.getEdges(), edge => {
      if (edge.isVisible()) {
        group.add(edge.get('keyShape').clone());
      }
    });
  }

  public init() {
    this.initContainer();
  }

  /**
   * 初始化 Minimap的 容器
   */
  public initContainer() {
    const self = this;
    const graph: Graph = self.get('graph');
    const size: number[] = self.get('size');
    const className: string = self.get('className');
    let parentNode: string | HTMLElement = self.get('container');
    const container: HTMLElement = createDOM(
      `<div class='${className}' style='width: ${size[0]}px; height: ${size[1]}px'></div>`,
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
      '<div class="g6-minimap-container" style="position: relative;"></div>',
    );
    container.appendChild(containerDOM);
    
    let canvas;
    const renderer = graph.get('renderer');
    if(renderer === SVG) {
      canvas = new GSVGCanvas({
        container: containerDOM,
        width: size[0],
        height: size[1],
      });
    } else {
      canvas = new GCanvas({
        container: containerDOM,
        width: size[0],
        height: size[1],
      });
    }
    self.set('canvas', canvas);
    self.updateCanvas();
  }

  public updateCanvas() {
    // 如果是在动画，则不刷新视图
    const isRefresh: boolean = this.get('refresh');
    if (!isRefresh) {
      return;
    }

    // 如果是视口变换，也不刷新视图，但是需要重置视口大小和位置
    if (this.get('viewportChange')) {
      this.set('viewportChange', false);
      this.updateViewport();
    }

    const size: number[] = this.get('size');
    const graph: Graph = this.get('graph');
    const canvas: GCanvas = this.get('canvas');
    const type: string = this.get('type');

    if (canvas.destroyed) {
      return;
    }

    switch (type) {
      case DEFAULT_MODE:
        this.updateGraphShapes();
        break;
      case KEYSHAPE_MODE:
        this.updateKeyShapes();
        break;
      case DELEGATE_MODE:
        this.updateDelegateShapes();
        break;
    }

    const group = canvas.get('children')[0];
    if(!group) return;

    const bbox = group.getCanvasBBox();

    let width = graph.get('width');
    let height = graph.get('height'); 

    if (Number.isFinite(bbox.width)) {
      // 刷新后bbox可能会变，需要重置画布矩阵以缩放到合适的大小
      width = max(bbox.width, graph.get('width'));
      height = max(bbox.height, graph.get('height'));
    }

    const ratio = Math.min(size[0] / width, size[1] / height);

    group.resetMatrix();
    let matrix: Matrix = mat3.create();

    let minX = 0;
    let minY = 0;
    // 如果bbox为负，先平移到左上角
    if (Number.isFinite(bbox.minX)) {
      minX = bbox.minX > 0 ? 0 : -bbox.minX;
    }

    if (Number.isFinite(bbox.minY)) {
      minY = bbox.minY > 0 ? 0 : -bbox.minY;
    }

    // 缩放到适合视口后, 平移到画布中心
    const dx = (size[0] - width * ratio) / 2;
    const dy = (size[1] - height * ratio) / 2;

    matrix = transform(matrix, [
      ['t', minX, minY],
      ['s', ratio, ratio],
      ['t', dx, dy],
    ]);

    group.setMatrix(matrix);

    // 更新minimap视口
    this.set('ratio', ratio);
    this.set('dx', dx + minX * ratio);
    this.set('dy', dy + minY * ratio);

    this.updateViewport();
  }

  /**
   * 获取minimap的画布
   * @return {GCanvas} G的canvas实例
   */
  public getCanvas(): GCanvas {
    return this.get('canvas');
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

  public destroy() {
    this.get('canvas').destroy();

    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}
