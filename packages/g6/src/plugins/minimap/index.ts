import { BaseStyleProps, Canvas, DisplayObject, Group, Rect } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { ID } from '@antv/graphlib';
import { createDOM, debounce, uniqueId } from '@antv/util';

import { GraphEvent } from '../../constants';
import { BasePlugin, BasePluginOptions, Point, RuntimeContext } from '../../exports';
import { NodeStyle } from '../../spec/element/node';
import { Combo, Edge, Node } from '../../types/element';
import Moveable from './moveable';

const DEFAULT_MODE = 'default';
const KEYSHAPE_MODE = 'keyShape';
const DELEGATE_MODE = 'delegate';

export interface MinimapOptions extends BasePluginOptions, Pick<BaseStyleProps, 'stroke' | 'lineWidth'> {
  /** <zh/> mode 为 'delegate' 时，缩略图中节点的样式 | <en/> node style in minimap */
  delegateStyle?: NodeStyle;
  /** <zh/> 是否隐藏缩略图中的边以提高性能 | <en/> Whether to hide edges on minimap to enhance performance ? */
  hideEdge?: boolean;
  /** <zh/> 缩略图的模式  | <en/> Mode of minimap */
  mode?: 'default' | 'keyShape' | 'delegate';
  /** <zh/> 缩略图的内边距 | <en/> Padding of minimap */
  padding?: number;
  /** <zh/> 是否在画布更新时刷新缩略图 | <en/> Whether to refresh minimap */
  refresh?: boolean;
  /** <zh/> 缩略图的大小 | <en/> Size of minimap */
  size?: [number, number];
  /** Class name of viewport */
  viewportClassName?: string;
  /** Class name of minimap */
  className?: string;
  /** <zh/> 缩略图的父节点 | <en/> minimap Container */
  container?: HTMLElement | string | null;
}

export class Minimap extends BasePlugin<MinimapOptions> {
  static defaultOptions: Partial<MinimapOptions> = {
    key: `minimap-${uniqueId()}`,
    container: null,
    className: 'g6-minimap',
    viewportClassName: 'g6-minimap-viewport',
    // Minimap 中默认展示和主图一样的内容，KeyShape 只展示节点和边的 key shape 部分，delegate表示展示自定义的rect，用户可自定义样式
    mode: 'default',
    padding: 0, //8,
    size: [100, 100],
    delegateStyle: {
      fill: '#40a9ff',
      stroke: '#096dd9',
    },
    refresh: true,
    hideEdge: false,
  };
  private minimapDom: HTMLElement;
  private minimapContainerDom: HTMLElement;
  private canvas: Canvas;
  /** The viewport DOM on the minimap. */
  private viewportDom: HTMLElement;

  /** Cache the mapping of graphics of nodes/edges/combos on main graph and minimap graph. */
  private itemMap: Map<
    ID,
    {
      minimapItem: DisplayObject;
    }
  > = new Map();

  // Last mouse x position
  private x = 0;
  // Last mouse y position
  private y = 0;
  // Whether in dragging status
  private dragging = false;
  private resizing: ReturnType<typeof getMoveAtBorder> = false;

  /** Ratio of (minimap graph size / main graph size). */
  private ratio = 0;

  /** Cache the visibility while items' visibility changed. And apply them onto the minimap with debounce. */
  private visibleCache: { [id: string]: boolean } = {};
  private outerElement: HTMLElement | null = null;

  private offset: Point = [0, 0];
  private initialOptions: MinimapOptions;
  private moveableRef: Moveable;

  constructor(context: RuntimeContext, options: MinimapOptions) {
    super(context, Object.assign({}, Minimap.defaultOptions, options));
    this.initialOptions = { ...this.options };
    this.minimapDom = this.createMinimapDom();
    this.minimapContainerDom = this.createMinimapContainerDom();
    this.canvas = this.createCanvas();
    this.viewportDom = this.createViewportDom();
    this.connectToHTML();
    this.moveableRef = this.createMoveable();
    this.addEventListener();
  }

  public update(options: Partial<MinimapOptions>) {
    console.log('update', options);

    super.update(options);
    this.handleUpdateCanvas();
  }

  private createMinimapDom() {
    const {
      options: { className, size },
    } = this;

    return createDOM(
      `<div class='${className}' style='width: ${size[0]}px; height: ${size[1]}px; overflow: hidden;'></div>`,
    );
  }

  private createMinimapContainerDom() {
    const minimapContainerDom = createDOM(
      '<div class="g6-minimap-container" style="position: relative;height:100%" ></div>',
    );

    return minimapContainerDom;
  }

  private createCanvas() {
    return new Canvas({
      width: this.options.size[0],
      height: this.options.size[1],
      renderer: this.context.canvas.getConfig().renderer?.('main') || new Renderer(),
      container: this.minimapContainerDom,
    });
  }

  private createViewportDom() {
    const {
      options: { viewportClassName },
    } = this;

    const viewportDom = createDOM(`<div
    class=${viewportClassName}
    style='position:absolute;
      left:0;
      top:0;
      border: 2px solid #1980ff;
      box-sizing:border-box;
      background: rgba(0, 0, 255, 0.1);
      cursor:move'
    
  />`);

    return viewportDom;
  }

  private createMoveable() {
    const moveableRef = new Moveable(this.viewportDom, {
      container: this.minimapContainerDom,
    });

    moveableRef
      .on('dragStart', (e) => {
        this.options.refresh = false;
      })
      .on('drag', (e, dragData) => {
        // 不要用e.target, 当拖到圈外时,target会改变
        const camera = this.context.canvas.getCamera();
        const zoom = Math.pow(2, camera.getZoom());
        camera.pan(dragData.delta[0] / this.ratio / zoom, dragData.delta[1] / this.ratio / zoom);

        Object.assign(this.viewportDom.style, {
          left: dragData.left + 'px',
          top: dragData.top + 'px',
          width: dragData.width + 'px',
          height: dragData.height + 'px',
        });
      })
      .on('dragEnd', () => {
        this.options.refresh = !!this.initialOptions.refresh;
      });
    return moveableRef;
  }

  private connectToHTML() {
    const {
      options: { container, className, size },
    } = this;

    const targetDom =
      (typeof container === 'string' ? (document.getElementById(container) as HTMLElement) : container) ||
      this.context.canvas.getContainer();

    if (!targetDom) return console.warn(`Not find  #${container} element`);

    this.minimapContainerDom.appendChild(this.viewportDom);
    this.minimapDom.appendChild(this.minimapContainerDom);

    targetDom.appendChild(this.minimapDom);
  }

  private async drawerCanvas() {
    const {
      options: { refresh, size, padding, mode, hideEdge },
    } = this;
    console.log('drawerCanvas:hideEdge', hideEdge);
    this.canvas.removeChildren();
    const nodes = this.context.element?.getNodes() || [];
    const edges = hideEdge ? [] : this.context.element?.getEdges() || [];
    const combos = this.context.element?.getCombos() || [];
    const shapes = [...nodes, ...edges, ...combos];
    const group = new Group();
    switch (mode) {
      case DEFAULT_MODE:
        this.cloneShapes(shapes, group);
        break;
      case KEYSHAPE_MODE:
        this.cloneKeyShapes(shapes, group);
        break;
      case DELEGATE_MODE:
        this.cloneKeyShapes([...edges, ...combos], group);
        this.drawerRectShapes(nodes, group);
        break;
      default:
        break;
    }
    this.canvas.appendChild(group);
    const minimapBBox = this.canvas.document.documentElement.getBounds(); //  能够获取画布内元素的总体包围盒(canvas坐标系)
    const graphBBox = this.context.canvas.getBounds(); //  能够获取画布内元素的总体包围盒
    // [
    //  min[0],max[0]
    //  min[1],max[1]
    //              ]

    const [graphWidth, graphHeight] = this.context.graph.getSize();

    // canvas
    const width = graphBBox.max[0] - graphBBox.min[0];
    const height = graphBBox.max[1] - graphBBox.min[1];
    // 求minimap缩放比例: minimap宽高 / graph宽高
    const zoomRatio = Math.min((size[0] - 2 * padding) / width, (size[1] - 2 * padding) / height);
    this.canvas.getCamera().setZoom(zoomRatio);
    this.canvas.getCamera().setPosition(minimapBBox.center[0], minimapBBox.center[1]);
    this.canvas.getCamera().setFocalPoint(minimapBBox.center[0], minimapBBox.center[1]);

    // Update the viewport DOM
    this.ratio = zoomRatio;

    this.updateViewport();
  }

  private cloneShapes(shapes: (Node | Edge | Combo)[], group: Group = new Group()) {
    // 建立 minimap shape 到 main shape 的映射关系到实例, 后面走入更新流程就不需要再clone了

    shapes.forEach((shape) => {
      let { minimapItem } = this.itemMap.get(shape.id) || {};
      if (shape.destroyed) {
        minimapItem && minimapItem.remove();
        this.itemMap.delete(shape.id);
        return;
      }
      if (!minimapItem) {
        minimapItem = shape.cloneNode(true);
      }
      minimapItem.attr({
        ...minimapItem.attributes,
        ...shape.attributes,
      });

      group.appendChild(minimapItem);
      this.itemMap.set(shape.id, {
        minimapItem: minimapItem,
      });
    });
  }

  private cloneKeyShapes(shapes: (Node | Edge | Combo)[], group: Group = new Group()) {
    // 建立 minimap shape 到 main shape 的映射关系到实例, 后面走入更新流程就不需要再clone了
    shapes.forEach((shape) => {
      const id = `minimap-keyShape-${shape.id}`;
      let { minimapItem } = this.itemMap.get(id) || {};
      if (shape.destroyed) {
        minimapItem && minimapItem.remove();
        this.itemMap.delete(id);
        return;
      }

      if (!minimapItem) {
        const keyShape = shape.getShape('key');
        if (!keyShape) return;

        minimapItem = keyShape.cloneNode(true);
        minimapItem.id = id;
      }
      minimapItem.attr({
        ...minimapItem.attributes,
        ...shape.attributes,
      });

      group.appendChild(minimapItem);
      this.itemMap.set(id, {
        minimapItem: minimapItem,
      });
    });
  }

  private drawerRectShapes(shapes: Node[], group: Group = new Group()) {
    shapes.forEach((shape) => {
      const bbox = shape.getRenderBounds();
      const attrs = {
        x: bbox.min[0],
        y: bbox.min[1],
        width: bbox.max[0] - bbox.min[0],
        height: bbox.max[1] - bbox.min[1],
        ...this.options.delegateStyle,
      };

      const id = `minimap-delegate-${shape.id}`;
      let { minimapItem } = this.itemMap.get(id) || {};
      if (shape.destroyed) {
        minimapItem && minimapItem.remove();
        this.itemMap.delete(id);
        return;
      }
      if (!minimapItem) {
        minimapItem = new Rect({
          id,
        });
      }
      minimapItem.attr({
        ...minimapItem.attributes,
        ...shape?.attributes,
        ...attrs,
      });

      minimapItem.toFront();
      group.appendChild(minimapItem);

      this.itemMap.set(id, {
        minimapItem: minimapItem,
      });
    });
  }

  /**
   * 根据主图的缩放 设置minimap的宽高
   * 根据主图的相机位置或者是transform位置, 设置minimap的left top
   */
  private updateViewport() {
    const {
      options,
      context: { graph },

      ratio,
      viewportDom,
    } = this;
    if (this.destroyed) return;

    const { size } = options;
    // 主图可视区域的范围
    const [graphWidth = 500, graphHeight = 500] = graph.getSize(); //  client 坐标系
    const graphZoom = graph.getOptions().zoom || 1;
    const graphBBox = this.context.canvas.getBounds(); //  能够获取画布内元素的总体包围盒
    // getClientByPage

    const a = graph.getCanvasByClient([graphWidth, graphHeight]);

    const [graphTopLeftViewportX, graphTopLeftViewportY] = graph.getViewportByCanvas(graphBBox.min);
    const [graphBottomRightViewportX, graphBottomRightViewportY] = graph.getViewportByCanvas(graphBBox.max);
    // ratio 是个分数, graphZoom是整数
    const width = (graphWidth * ratio) / graphZoom;
    const height = (graphHeight * ratio) / graphZoom;

    // [
    //  min[0],max[0]
    //  min[1],max[1]
    //              ]

    // canvas
    const width2 = graphBBox.max[0] - graphBBox.min[0];

    if (viewportDom) {
      Object.assign(viewportDom.style, {
        left: `${0}px`,
        top: `${0}px`,
        width: `${50 || width}px`,
        height: `${50 || height}px`,
      });
    }
  }

  private addEventListener() {
    // 画布尺寸变化
    this.context.graph.on(GraphEvent.AFTER_SIZE_CHANGE, this.handleUpdateCanvas.bind(this)); // 在元素更新之后触发
    // 绘制完成（不包含布局）
    this.context.graph.on(GraphEvent.AFTER_RENDER, this.updateCanvas.bind(this)); // 在元素更新之后触发
    // 渲染完成（包含布局）
    this.context.graph.on(GraphEvent.AFTER_DRAW, this.updateCanvas.bind(this)); // 在元素更新之后触发
    // 如何监听 zoom 变化
  }

  /**
   * Listener for main graph updating, update the viewport DOM.
   */
  private handleUpdateCanvas = debounce(
    () => {
      const self = this;

      if (self.destroyed) return;
      self.updateCanvas();
    },
    100,
    false,
  );
  private updateCanvas() {
    if (!this.options.refresh || this.context.graph.destroyed) return;
    this.drawerCanvas();
  }

  public destroy(): void {
    super.destroy();
    this.outerElement?.remove();
    this.canvas?.destroy();
    this.moveableRef.unset();
  }
}

const getMoveAtBorder = (dom: HTMLElement, evt: MouseEvent) => {
  const bounds = dom.getBoundingClientRect();
  const { clientX, clientY } = evt;
  if (Math.abs(clientX - bounds.x) < 4 && Math.abs(clientY - bounds.y) < 4) {
    return 'left-top';
  } else if (Math.abs(clientX - bounds.x) < 4 && Math.abs(clientY - bounds.y - bounds.height) < 4) {
    return 'left-bottom';
  } else if (Math.abs(clientX - bounds.x - bounds.width) < 4 && Math.abs(clientY - bounds.y) < 4) {
    return 'right-top';
  } else if (Math.abs(clientX - bounds.x - bounds.width) < 4 && Math.abs(clientY - bounds.y - bounds.height) < 4) {
    return 'right-bottom';
  } else if (Math.abs(clientX - bounds.x) < 4) {
    return 'left';
  } else if (Math.abs(clientY - bounds.y) < 4) {
    return 'top';
  } else if (Math.abs(clientY - bounds.y - bounds.height) < 4) {
    return 'bottom';
  }
  return false;
};
