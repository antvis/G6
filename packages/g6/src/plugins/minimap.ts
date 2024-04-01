import { BaseStyleProps, Canvas, DisplayObject, Group, Rect } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { ID } from '@antv/graphlib';
import { createDOM, debounce, uniqueId } from '@antv/util';

import Moveable from 'moveable';
import type { RuntimeContext } from '../runtime/types';
import { NodeStyle } from '../spec/element/node';
import { Combo, Edge, Node, Point } from '../types';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

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
    padding: 8,
    size: [200, 120],
    delegateStyle: {
      fill: '#40a9ff',
      stroke: '#096dd9',
    },
    refresh: true,
    hideEdge: false,
  };
  private moveableRef: Moveable;
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
      graphItem: DisplayObject;
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
  /** Distance from top of minimap graph to the top of minimap container. */
  private dx = 0;
  /** Distance from left of minimap graph to the left of minimap container. */
  private dy = 0;
  /** Cache the visibility while items' visibility changed. And apply them onto the minimap with debounce. */
  private visibleCache: { [id: string]: boolean } = {};
  private outerElement: HTMLElement | null = null;
  private controllerList: AbortController[] = [];
  private offset: Point = [0, 0];

  constructor(context: RuntimeContext, options: MinimapOptions) {
    super(context, Object.assign({}, Minimap.defaultOptions, options));
    this.minimapDom = this.createMinimapDom();
    this.minimapContainerDom = this.createMinimapContainerDom();
    this.canvas = this.createCanvas();
    this.viewportDom = this.createViewportDom();
    this.moveableRef = this.createMoveable();
    this.connectToHTML();

    this.drawerCanvas();
  }

  public update(options: Partial<MinimapOptions>) {
    super.update(options);
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
    const controller_1 = new AbortController();
    const controller_2 = new AbortController();
    const controller_3 = new AbortController();
    const controller_4 = new AbortController();
    const controller_5 = new AbortController();

    this.controllerList.push(controller_1, controller_2, controller_3, controller_4, controller_5);

    const minimapContainerDom = createDOM(
      '<div class="g6-minimap-container" style="position: relative;height:100%" ></div>',
    );

    // if (isSafari || isFireFox) {
    //   minimapContainerDom.addEventListener('mousemove', this.dragListener.bind(this), {
    //     capture: false,
    //     signal: controller_3.signal,
    //   });
    // }

    // minimapContainerDom.addEventListener('mouseleave', this.dragendListener.bind(this), {
    //   signal: controller_4.signal,
    // });
    // minimapContainerDom.addEventListener('mouseup', this.dragendListener.bind(this), {
    //   signal: controller_5.signal,
    // });
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

    const controller = new AbortController();
    const controller_2 = new AbortController();
    const controller_3 = new AbortController();
    this.controllerList.push(controller, controller_2, controller_3);

    const viewportDom = createDOM(`<div
    class=${viewportClassName}
    draggable="true"
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
    const rawRefresh = this.options.refresh;
    const moveableRef = new Moveable(this.minimapContainerDom, {
      target: this.viewportDom,
      draggable: true,
      snappable: true, // 搭配bounds使用
      // scalable: true, // 暂不支持
      bounds: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        position: 'css',
      },
    });
    moveableRef
      .on('dragStart', () => {
        this.options.refresh = false;
      })
      .on('drag', (e) => {
        const camera = this.context.canvas.getCamera();
        const zoom = Math.pow(2, camera.getZoom());
        camera.pan(e.delta[0] / this.ratio / zoom, e.delta[1] / this.ratio / zoom);

        e.target.style.transform = e.transform;
      })
      .on('dragEnd', () => {
        this.options.refresh = rawRefresh;
      });

    moveableRef.on('scale', (e) => {
      e.target.style.transform = e.drag.transform;
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

    await this.context.graph.render();

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
    const minimapBBox = this.canvas.getRoot().getRenderBounds();

    const graphBBox = this.context.canvas.document.documentElement.getRenderBounds();

    const width = graphBBox.max[0] - graphBBox.min[0];
    const height = graphBBox.max[1] - graphBBox.min[1];

    // Scale the graph to fit the size - padding of the minimap container
    const zoomRatio = Math.min((size[0] - 2 * padding) / width, (size[1] - 2 * padding) / height);
    const zoomCenter = this.canvas.viewport2Canvas({ x: 0, y: 0 });
    this.canvas.getCamera().setFocalPoint(zoomCenter.x, zoomCenter.y);
    this.canvas.getCamera().setPosition(zoomCenter.x, zoomCenter.y);
    this.canvas.getCamera().setZoom(zoomRatio);
    this.canvas.getCamera().setPosition(minimapBBox.center[0], minimapBBox.center[1]);
    this.canvas.getCamera().setFocalPoint(minimapBBox.center[0], minimapBBox.center[1]);

    const { x: dx, y: dy } = this.canvas.canvas2Viewport({
      x: minimapBBox.min[0],
      y: minimapBBox.min[1],
    });

    // Update the viewport DOM
    this.ratio = zoomRatio;
    this.dx = dx;
    this.dy = dy;
    this.updateViewport();
    // Delete unused itemMap
    this.deleteDestroyedShapes();
  }

  private cloneShapes(shapes: (Node | Edge | Combo)[], group: Group = new Group()) {
    // 建立 minimap shape 到 main shape 的映射关系到实例, 后面走入更新流程就不需要再clone了

    shapes.forEach((shape) => {
      let { minimapItem, graphItem } = this.itemMap.get(shape.id) || {};
      if (!minimapItem) {
        minimapItem = shape.cloneNode(true);
      }
      if (!graphItem) {
        graphItem = shape;
      }

      group.appendChild(minimapItem);
      this.itemMap.set(shape.id, {
        graphItem: graphItem,
        minimapItem: minimapItem,
      });
    });
  }

  private cloneKeyShapes(shapes: (Node | Edge | Combo)[], group: Group = new Group()) {
    // 建立 minimap shape 到 main shape 的映射关系到实例, 后面走入更新流程就不需要再clone了
    shapes.forEach((shape) => {
      // graphItem 存的是引用? 原图上消失,这里就会是空?
      let { minimapItem, graphItem } = this.itemMap.get(shape.id) || {};
      if (!minimapItem) {
        minimapItem = shape.getKey().cloneNode(true);
        minimapItem.id = `minimap-keyShape-${shape.id}`;
      }
      if (!graphItem) {
        graphItem = shape.getKey();
      }

      if (!minimapItem.destroyed) {
        minimapItem.style = { ...minimapItem.style, ...graphItem.style };
      }

      group.appendChild(minimapItem);
      this.itemMap.set(shape.id, {
        graphItem: graphItem,
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

      let { minimapItem, graphItem } = this.itemMap.get(shape.id) || {};
      if (!minimapItem || minimapItem.destroyed) {
        minimapItem = new Rect({
          style: {
            ...shape.attributes,
            ...attrs,
          },
          id: `minimap-delegate-${shape.id}`,
        });
      }
      minimapItem.style = { ...minimapItem.style, ...graphItem?.style, ...attrs };
      minimapItem.toFront();

      if (!graphItem) {
        graphItem = shape.getKey();
      }

      group.appendChild(minimapItem);

      this.itemMap.set(shape.id, {
        graphItem: graphItem,
        minimapItem: minimapItem,
      });
    });
  }

  /**
   * Update the viewport DOM.
   */
  private updateViewport() {
    const {
      options,
      context: { graph },
      dx,
      dy,
      ratio,
      viewportDom,
    } = this;
    if (this.destroyed) return;

    const { size } = options;

    const [graphWidth = 500, graphHeight = 500] = graph.getSize();

    const graphZoom = graph.getOptions().zoom || 1;
    const graphBBox = this.context.canvas.document.documentElement.getRenderBounds();

    const [graphTopLeftViewportX, graphTopLeftViewportY] = graph.getViewportByCanvas(graphBBox.min);
    const [graphBottomRightViewportX, graphBottomRightViewportY] = graph.getViewportByCanvas(graphBBox.max);

    // Width and height of the viewport DOM
    let width = (graphWidth * ratio) / graphZoom;
    let height = (graphHeight * ratio) / graphZoom;

    let left = 0;
    let top = 0;
    if (graphTopLeftViewportX < 0) {
      left = (-graphTopLeftViewportX / graphWidth) * width + dx;
      if (graphBottomRightViewportX < graphWidth) {
        width = size[0] - left;
      }
    } else {
      width -= (graphTopLeftViewportX / graphWidth) * width - dx;
    }
    if (graphTopLeftViewportY < 0) {
      top = (-graphTopLeftViewportY / graphHeight) * height + dy;
      if (graphBottomRightViewportY < graphHeight) {
        height = size[1] - top;
      }
    } else {
      height -= (graphTopLeftViewportY / graphHeight) * height - dy;
    }

    const right = width + left;
    if (right > size[0]) {
      width -= right - size[0];
    }
    const bottom = height + top;
    if (bottom > size[1]) {
      height -= bottom - size[1];
    }
    if (viewportDom) {
      Object.assign(viewportDom.style, {
        left: `${left}px`,
        top: `${top}px`,
        width: `100px` || `${width}px`,
        height: `100px` || `${height}px`,
      });
    }
  }

  // 更新时使用
  private deleteDestroyedShapes() {
    this.itemMap.forEach(({ graphItem, minimapItem }, id) => {
      if (graphItem.destroyed && minimapItem) {
        minimapItem.remove();
        this.itemMap.delete(id);
      }
    });
  }

  public getEvents() {
    return {
      afteritemstatechange: this.handleUpdateCanvas,
      afterlayout: this.handleUpdateCanvas,
      viewportchange: this.handleUpdateCanvas,
      afteritemchange: this.handleUpdateCanvas,
      afteritemvisibilitychange: this.handleVisibilityChange,
    };
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
    // 如何判断canvas.destroyed?
    if (!this.options.refresh || this.context.graph.destroyed) return;
    this.drawerCanvas();
  }

  private debounceCloneVisibility = debounce(
    (ids: string[]) => {
      for (const [shapeId, { minimapItem }] of this.itemMap) {
        minimapItem.style.visibility = ids.includes(String(shapeId)) ? 'visible' : 'hidden';
      }
    },
    50,
    false,
  );

  private handleVisibilityChange = (params: any) => {
    const { ids, value } = params;

    this.debounceCloneVisibility(ids);
  };

  public destroy(): void {
    super.destroy();
    this.outerElement?.remove();
    this.canvas?.destroy();
    this.moveableRef.destroy();
    this.controllerList.forEach((abortController) => abortController.abort());
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
