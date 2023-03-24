import { Canvas, Group, Rect, DisplayObject } from '@antv/g';
import { isString, isNil, each, debounce } from '@antv/util';
import { createDom, modifyCSS } from '@antv/dom-util';
import { IGraph } from '../../../types';
import { ShapeStyle } from '../../../types/item';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin'
import { createCanvas } from '../../../util/canvas';
import { IG6GraphEvent } from '../../../types/event';

const DEFAULT_MODE = 'default';
const KEYSHAPE_MODE = 'keyShape';
const DELEGATE_MODE = 'delegate';
const SVG = 'svg';

interface MiniMapConfig extends IPluginBaseConfig {
  viewportClassName?: string;
  className?: string;
  mode?: 'default' | 'keyShape' | 'delegate';
  size?: number[];
  delegateStyle?: ShapeStyle;
  refresh?: boolean;
  padding?: number;
  hideEdge?: boolean; // hide the edges on the minimap to enhance the performance
  container?: HTMLDivElement | null;
}

export default class Minimap extends Base {
  private canvas: Canvas;
  /** The viewport DOM on the minimap. */
  private viewport: HTMLElement;
  /** Cache the mapping of graphics of nodes/edges/combos on main graph and minimap graph. */
  private itemMap: {
    [id: string]: {
      minimapItem: DisplayObject,
      graphItem: DisplayObject
    }
  } = {};
  private container: HTMLDivElement;
  /** Ratio of (minimap graph size / main graph size). */
  private ratio: number;
  /** Distance from top of minimap graph to the top of minimap container. */
  private dx: number;
  /** Distance from left of minimap graph to the left of minimap container. */
  private dy: number;
  
  constructor(options?: MiniMapConfig) {
    super(options);
  }

  public getDefaultCfgs(): MiniMapConfig {
    return {
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
  }

  public getEvents() {
    return {
      afterupdateitem: this.handleUpdateCanvas,
      afteritemstatechange: this.handleUpdateCanvas,
      afterlayout: this.handleUpdateCanvas,
    };
  }

  /**
   * If it is animating, disable refresh.
   */
  protected disableRefresh() {
    this.options.refresh = false;
  }

  protected enableRefresh() {
    this.options.refresh = true;
    this.updateCanvas();
  }

  private initViewport() {
    const { canvas, options, destroyed, graph } = this;
    const { size, viewportClassName } = options;

    if (destroyed) return;

    const containerDOM = canvas.context.config.container;
    const isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
    const viewport = createDom(`
      <div
        class=${viewportClassName}
        style='position:absolute;
          left:0;
          top:0;
          box-sizing:border-box;
          border: 2px solid #1980ff;
          background: rgba(0, 0, 255, 0.1);
          cursor:move'
        draggable=${isSafari || isFireFox ? false : true}
      </div>`);


    // Last mouse x position
    let x = 0;
    // Last mouse y position
    let y = 0;
    // Whether in dragging status
    let dragging = false;

    const dragstartevent = isSafari || isFireFox ? 'mousedown' : 'dragstart';
    viewport.addEventListener(
      dragstartevent,
      ((e: IG6GraphEvent) => {
        if ((e as any).dataTransfer) {
          const img = new Image();
          img.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";
          (e as any).dataTransfer.setDragImage?.(img, 0, 0);
          try {
            (e as any).dataTransfer.setData('text/html', 'view-port-minimap');
          } catch {
            // support IE
            (e as any).dataTransfer.setData('text', 'view-port-minimap');
          }
        }

        this.options.refresh = false;
        if (e.target !== viewport) {
          return;
        }

        dragging = true;
        x = e.clientX;
        y = e.clientY;
        
      }).bind(this),
      false,
    );

    const dragListener = (e: IG6GraphEvent) => {
      if (!dragging || isNil(e.clientX) || isNil(e.clientY)) {
        return;
      }
      const { ratio } = this;
      const zoom = graph!.getZoom();

      let dx = x - e.clientX;
      let dy = y - e.clientY;

      const { style } = viewport;
      const left = parseInt(style.left, 10);
      const top = parseInt(style.top, 10);
      const width = parseInt(style.width, 10);
      const height = parseInt(style.height, 10);

      // If the viewport is already on the left or right, stop moving x.
      if (left - dx < 0 || left - dx + width >= size[0]) {
        dx = 0;
      }
      // If the viewport is already on the top or bottom, stop moving y.
      if (top - dy < 0 || top - dy + height >= size[1]) {
        dy = 0;
      }

      // Translate tht graph and update minimap viewport.
      new Promise(async () => {
        await graph!.translate((dx * zoom) / ratio, (dy * zoom) / ratio);
        this.updateViewport();
      });

      x = e.clientX;
      y = e.clientY;
    }
    if (!isSafari && !isFireFox) {
      viewport.addEventListener(
        'drag',
        dragListener.bind(this),
        false,
      );
    }

    const dragendListener = () => {
      dragging = false;
      this.options.refresh = true;
    };
    const dragendevent = isSafari || isFireFox ? 'mouseup' : 'dragend';
    viewport.addEventListener(
      dragendevent,
      dragendListener.bind(this),
      false,
    );

    const zoomListener = (evt) => {
      // TODO: zoom the graph and update viewport
    }
    viewport.addEventListener(
      'wheel',
      zoomListener,
      false
    );

    containerDOM.addEventListener('mouseleave', dragendListener.bind(this));
    containerDOM.addEventListener('mouseup', dragendListener.bind(this));

    if (isSafari || isFireFox) {
      containerDOM.addEventListener(
        'mousemove',
        dragListener.bind(this),
        false,
      );
    }

    this.viewport = viewport;
    containerDOM.appendChild(viewport);
  }

  /**
   * Update the viewport DOM.
   */
  private updateViewport() {
    if (this.destroyed) return;
    if (!this.viewport) {
      this.initViewport();
    }
    const { options, graph, dx, dy, ratio, viewport } = this;

    const { size } = options;
    const graphCanvasEl = graph.canvas.context.config.canvas;
    const [graphWidth = graphCanvasEl?.scrollWidth || 500, graphHeight = graphCanvasEl?.scrollHeight || 500] = graph.getSize();

    const graphZoom = graph.getZoom();
    const graphBBox = graph.canvas.getRoot().getRenderBounds();

    const graphTopLeftViewport = graph.getViewportByCanvas({ x: graphBBox.min[0], y: graphBBox.min[1] });
    const graphBottomRightViewport = graph.getViewportByCanvas({ x: graphBBox.max[0], y: graphBBox.max[1] });


    // Width and height of the viewport DOM
    let width = graphWidth * ratio / graphZoom;
    let height = graphHeight * ratio / graphZoom;

    let left = 0;
    let top = 0;
    if (graphTopLeftViewport.x < 0) {
      left = -graphTopLeftViewport.x / graphWidth * width + dx;
      if (graphBottomRightViewport.x < graphWidth) {
        width = size[0] - left;
      }
    } else {
      width -= graphTopLeftViewport.x / graphWidth * width - dx;
    }
    if (graphTopLeftViewport.y < 0) {
      top = -graphTopLeftViewport.y / graphHeight * height + dy;
      if (graphBottomRightViewport.y < graphHeight) {
        height = size[1] - top;
      }
    } else {
      height -= graphTopLeftViewport.y / graphHeight * height - dy;
    }

    modifyCSS(viewport, {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
    });
  }

  /**
   * Clone all the graphic from main graph to the minimap graph.
   */
  private updateGraphShapes() {
    const { graph, options, canvas } = this;
    const graphGroup = graph.canvas.getRoot();
    if (graphGroup.destroyed) return;
    canvas.removeChildren();
    let clonedGroup;
    const { hideEdge } = options;
    if (hideEdge) {
      clonedGroup = new Group();
      canvas.appendChild(clonedGroup);
      graphGroup.children.forEach(group => {
        if (group.id === 'edge-group') return;
        clonedGroup.appendChild(group.cloneNode(true));
      })
    } else {
      clonedGroup = graphGroup.cloneNode(true);
      canvas.appendChild(clonedGroup);
    }
  }

  private updateVisible(ele) {
    if (!ele.isGroup() && !ele.get('visible')) {
      ele.hide();
    } else {
      const children = ele.get('children');
      if (!children || !children.length) return;
      children.forEach((child) => {
        if (!child.get('visible')) child.hide();
        this.updateVisible(child);
      });
    }
  }

  /**
   * Only draw keyShapes on the minimap.
   */
  private updateKeyShapes() {
    const { graph, options, canvas } = this;
    const { hideEdge } = options;

    const group = canvas.getRoot();

    if (!hideEdge) {
      each(graph!.getAllEdgesData(), (edge) => {
        this.updateOneEdgeKeyShape(edge, group);
      });
    }
    each(graph!.getAllNodesData(), (node) => {
      this.updateOneNodeKeyShape(node, group);
    });
    const combos = graph!.getAllCombosData();
    if (combos && combos.length) {
      let comboGroup = group.find(e => e.id === 'combo-group');
      if (!comboGroup) {
        comboGroup = new Group({ id: 'combo-group' });
        group.appendChild(comboGroup);
      }
      setTimeout(() => {
        if (this.destroyed) return;
        each(combos, (combo) => {
          // this.updateOneComboKeyShape(combo, comboGroup);
          this.updateOneNodeKeyShape(combo, comboGroup);
        });
        comboGroup?.sort();
        comboGroup?.toBack();
        this.updateCanvas();
      }, 250)
    }
    this.clearDestroyedShapes();
  }
  
  /**
   * Add or update keyShape of one node.
   * @param nodeModel node data model
   * @param group container graphics group on minimap
   */
  private updateOneNodeKeyShape(nodeModel, group) {
    const { itemMap = {}, graph } = this;
    const graphNodeGroup = graph.canvas.getRoot().find(ele => ele.id === 'node-group');
    if (!graphNodeGroup) return;

    let { minimapItem, graphItem } = itemMap[nodeModel.id] || {};
    if (!minimapItem) {
      graphItem = graphNodeGroup.find(ele => ele.getAttribute('data-item-id') === nodeModel.id)?.find(ele => ele.id === 'keyShape');
      minimapItem = graphItem.cloneNode();
      group.appendChild(minimapItem);
      itemMap[nodeModel.id] = { graphItem, minimapItem };
    }
    const bbox = graphItem.getRenderBounds();
    if (!bbox) return;
    const keyShapeStyle = graphItem.attributes;
    let attrs: any = {
      ...keyShapeStyle,
      cx: bbox.center[0],
      cy: bbox.center[1],
    };
    minimapItem.toFront();
    
    const shapeType = minimapItem.get('type');
    if (shapeType === 'rect' || shapeType === 'image' || shapeType === 'text') {
      attrs.x = bbox.min[0];
      attrs.y = bbox.min[1];
    }
    Object.keys(attrs).forEach(key => {
      minimapItem.style[key] = attrs[key];
    });

    if (!graph.getItemVisible(nodeModel.id)) minimapItem.hide();
    else minimapItem.show();
    const zIndex = nodeModel.data.depth;
    if (!isNaN(zIndex)) minimapItem.set('zIndex', zIndex);
    this.itemMap = itemMap;
  }

  /**
   * Draw the delegate rects for nodes and line edges on minimap.
   */
  private updateDelegateShapes() {
    const { graph, options, canvas } = this;
    const { hideEdge } = options;

    const group = canvas.getRoot();

    // If hideEdge is true, do not render the edges on minimap to enhance the performance
    if (!hideEdge) {
      each(graph!.getAllEdgesData(), (edge) => {
        this.updateOneEdgeKeyShape(edge, group);
      });
    }
    each(graph!.getAllNodesData(), (node) => {
      this.updateOneNodeDelegateShape(node, group);
    });
    const combos = graph!.getAllCombosData();
    if (combos && combos.length) {
      const comboGroup = group.find(e => e.get('name') === 'comboGroup') ||
        group.addGroup({
          name: 'comboGroup'
        });
      setTimeout(() => {
        if (this.destroyed) return;
        each(combos, (combo) => {
          // this.updateOneComboKeyShape(combo, comboGroup);
          this.updateOneNodeKeyShape(combo, comboGroup);
        });
        comboGroup?.sort();
        comboGroup?.toBack();
        this.updateCanvas();
      }, 250)
    }
    this.clearDestroyedShapes();
  }

  private clearDestroyedShapes() {
    const { itemMap = {} } = this;
    const keys = Object.keys(itemMap);
    if (!keys || keys.length === 0) return;
    for (let i = keys.length - 1; i >= 0; i--) {
      const { minimapItem, graphItem } = itemMap[keys[i]] || {};
      if (graphItem.destroyed && minimapItem) {
        minimapItem.remove();
        delete itemMap[keys[i]];
      }
    }
  }

  /**
   * Add or update keyShape of one edge.
   * @param edgeModel edge data model
   * @param group container graphics group on minimap
   */
  private updateOneEdgeKeyShape(edgeModel, group) {
    const { itemMap = {}, graph } = this;
    const graphEdgeGroup = graph.canvas.getRoot().find(ele => ele.id === 'edge-group');
    if (!graphEdgeGroup) return;
    let { minimapItem, graphItem } = itemMap[edgeModel.id] || {};
    if (minimapItem) {
      const path = graphItem.style.path;
      minimapItem.style.path = path;
    } else {
      graphItem = graphEdgeGroup.find(ele => ele.getAttribute('data-item-id') === edgeModel.id)?.find(ele => ele.id === 'keyShape');
      minimapItem = graphItem.cloneNode();
      group.appendChild(minimapItem);
    }
    if (!graph.getItemVisible(edgeModel.id)) minimapItem.hide();
    else minimapItem.show();
    itemMap[edgeModel.id] = { graphItem, minimapItem };
    this.itemMap = itemMap;
  }

  /**
   * Add or update delegate rect of one node.
   * @param nodeModel node data model
   * @param group container graphics group on minimap
   */
  private updateOneNodeDelegateShape(nodeModel, group) {
    const { itemMap = {}, options, graph } = this;
    const { delegateStyle } = options;

    const graphNodeGroup = graph.canvas.getRoot().find(ele => ele.id === 'node-group');
    if (!graphNodeGroup) return;

    // 差量更新 minimap 上的一个节点，对应主图的 item
    let { minimapItem, graphItem } = itemMap[nodeModel.id] || {};
    if (!graphItem) {
      graphItem = graphNodeGroup.find(ele => ele.getAttribute('data-item-id') === nodeModel.id)?.find(ele => ele.id === 'keyShape');
    }

    const bbox = graphItem.getRenderBounds()
    const attrs = {
      x: bbox.min[0],
      y: bbox.min[1],
      width: bbox.max[0] - bbox.min[0],
      height: bbox.max[1] - bbox.min[1],
    };
    if (!minimapItem) {
      minimapItem = new Rect({
        style: {
          ...graphItem.attributes,
          ...attrs,
          ...delegateStyle
        },
        id: `minimap-delegate-${nodeModel.id}`
      });
      group.appendChild(minimapItem);
    } else {
      Object.keys(attrs).forEach(key => minimapItem.style[key] = attrs[key])
    }
    minimapItem.toFront();

    if (!graph.getItemVisible(nodeModel.id)) minimapItem.hide();
    else minimapItem.show();
    itemMap[nodeModel.id] = { graphItem, minimapItem };
    this.itemMap = itemMap;
  }

  /**
   * Listener for main graph updating, update the viewport DOM.
   */
  private handleUpdateCanvas = debounce(
    (event) => {
      const self = this;
      if (self.destroyed) return;
      self.updateCanvas();
    },
    100,
    false,
  );

  public init(graph: IGraph) {
    super.init(graph);
    this.initContainer();
  }

  /**
   * Init the DOM container for minimap.
   */
  public initContainer() {
    const self = this;
    const { graph, options } = self;
    const { size, className } = options;
    let parentNode = options.container;
    const container: HTMLDivElement = createDom(
      `<div class='${className}' style='width: ${size[0]}px; height: ${size[1]}px; overflow: hidden'></div>`,
    );

    if (isString(parentNode)) {
      parentNode = document.getElementById(parentNode) as HTMLDivElement;
    }

    if (parentNode) {
      parentNode.appendChild(container);
    } else {
      graph.container.appendChild(container);
    }

    self.container = container;

    const containerDOM = createDom(
      '<div class="g6-minimap-container" style="position: relative;"></div>',
    );
    container.appendChild(containerDOM);
    containerDOM.addEventListener('dragenter', e => {
      e.preventDefault();
    });
    containerDOM.addEventListener('dragover', e => {
      e.preventDefault();
    });

    // TODO: graph.rendererType, pixelRatio from graph
    this.canvas = createCanvas('canvas', containerDOM, size[0], size[1], 1);
  }

  public updateCanvas() {
    if (this.destroyed) return;
    const { graph, canvas, options } = this;
    const { refresh, size, padding, mode } = options;
    // Controlled by the animation of graph. Animating, and then disable refreshing
    if (!refresh || graph.destroyed || canvas.destroyed) return;

    switch (mode) {
      case DEFAULT_MODE:
        this.updateGraphShapes();
        break;
      case KEYSHAPE_MODE:
        this.updateKeyShapes();
        break;
      case DELEGATE_MODE:
        this.updateDelegateShapes();
        break;
      default:
        break;
    }

    const group = canvas.getRoot();
    if (!group) return;

    const minimapBBox = group.getRenderBounds();
    const graphBBox = graph.canvas.getRoot().getRenderBounds();
    let width = (graphBBox.max[0] - graphBBox.min[0]);
    let height = (graphBBox.max[1] - graphBBox.min[1]);

    // Scale the graph to fit the size - padding of the minimap container
    const zoomRatio = Math.min((size[0] - 2 * padding) / width, (size[1] - 2 * padding) / height);
    const zoomCenter = canvas.viewport2Canvas({ x: 0, y: 0 });
    canvas.getCamera().setFocalPoint(zoomCenter.x, zoomCenter.y);
    canvas.getCamera().setPosition(zoomCenter.x, zoomCenter.y);
    canvas.getCamera().setZoom(zoomRatio);
    canvas.getCamera().setPosition(minimapBBox.center[0], minimapBBox.center[1]);
    canvas.getCamera().setFocalPoint(minimapBBox.center[0], minimapBBox.center[1]);

    const { x: dx, y: dy } = canvas.canvas2Viewport({ x: minimapBBox.min[0], y: minimapBBox.min[1] });
    
    // Update the viewport DOM
    this.ratio = zoomRatio;
    this.dx = dx;
    this.dy = dy;
    this.updateViewport();
  }

  /**
   * Get the canvas of the minimap.
   * @return {Canvas} G Canvas
   */
  public getCanvas(): Canvas {
    return this.canvas;
  }

  /**
   * Get the viewport DOM of the minimap.
   * @return {HTMLElement} viewport DOM
   */
  public getViewport(): HTMLElement {
    return this.viewport;
  }

  /**
   * Get the container DOM of the minimap.
   * @return {HTMLElement} container DOM
   */
  public getContainer(): HTMLElement {
    return this.container;
  }

  public destroy() {
    this.canvas?.destroy();

    const container = this.container;
    if (container?.parentNode) container.parentNode.removeChild(container);
  }
}