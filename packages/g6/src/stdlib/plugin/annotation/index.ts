import { isNumber, debounce } from '@antv/util';
import { Canvas, Group, PathStyleProps } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { createDOM, modifyCSS } from '../../../util/dom';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { IG6GraphEvent, IGraph } from '../../../types';
import { getPathItem2Card, px2Num } from './util';
import { insertCSS } from './insertCSS';
import { AnnotationData, EditPosition } from './types';
import Card, { CardCfg } from './Card';

insertCSS();

interface AnnotationConfig extends IPluginBaseConfig {
  trigger?: 'click' | 'fix';
  containerCfg?: {
    // 无配置则没有自身容器，直接以图的容器为父容器
    position?: 'left' | 'right' | 'top' | 'bottom';
    className?: string;
    width?: number;
    height?: number;
    offsetX?: number;
    offsetY?: number;
  };
  editable?: boolean;
  itemHighlightState?: string;
  defaultData?: CardCfg[];
  cardCfg?: CardCfg;
  linkStyle?: PathStyleProps;
  linkHighlightStyle?: PathStyleProps;
  getTitle?(item): string;
  getContent?(item): string;
  getTitlePlaceholder?: string; // getTitle 返回空时使用 getTitlePlaceholder 的返回值
  getContentPlaceholder?(item): string; // getContent 返回空时使用 getContentPlaceholder 的返回值
  onAnnotationChange?: (info: any, action: string) => void;
}

interface CardInfoMap {
  [id: string]: Card & {
    // card: HTMLDivElement;
    // link?: Path;
    // isCanvas?: boolean;
    // cardBBox?: {
    //   left: number;
    //   right: number;
    //   top: number;
    //   bottom: number;
    // };
  };
}

const CANVAS_ANNOTATION_ID = 'canvas-annotation';

export class Annotation extends Base {
  public declare options: AnnotationConfig;
  dragging?: {
    x: number;
    y: number;
    left: number;
    top: number;
    card: HTMLElement;
  };

  cardInfoMap: CardInfoMap = {}

  constructor(config?: AnnotationConfig) {
    super(config);
  }
  public getDefaultCfgs(): AnnotationConfig {
    return {
      trigger: 'click',
      editable: true,
      itemHighlightState: 'highlight',
      linkHighlightStyle: {
        shadowColor: '#5B8FF9',
        shadowBlur: 10,
      },
      getTitlePlaceHolder() {
        return '按 ↩ 保存';
      },
      getContentPlaceholder(item) {
        return '按 ↩ 保存，按 Shift + ↩ 换行';
      },
      cardCfg: {
        maxWidth: 300,
        maxHeight: 500,
        minWidth: 120,
        minHeight: 120,
        width: 120,
        height: 'fit-content',
        collapseType: 'minimize',
        closeType: 'hide',
        maxTitleLength: 20,
      },
    };
  }

  // class-methods-use-this
  public getEvents() {
    let events: { [k in string]: Function } = {
      viewportchange: this.updateLinks,
      afterlayout: this.updateLinks,
      aftergraphrefreshposition: this.updateLinks,
      afterupdateitem: this.updateLinks,
      afterchangedata: this.onGraphDataChange,
      afteritemvisibilitychange: this.onGraphItemVisibilityChange,
    };
    switch (this.options.trigger) {
      case 'click':
        events = {
          ...events,
          'node:click': this.showAnnotation,
          'edge:click': this.showAnnotation,
        };
    }
    return events;
  }

  _container: HTMLElement;
  public init(graph: IGraph) {
    super.init(graph);
    if (this.destroyed) return;
    this.graph = graph;
    const graphCantainer = graph.container;

    const containerCfg = this.options.containerCfg;
    if (containerCfg) {
      this._container = this.createContainer();
      graphCantainer.appendChild(this._container);
    } else {
      this._container = graphCantainer;
    }

    const linkCanvasEl = document.createElement('canvas');
    linkCanvasEl.setAttribute('data-id', 'g6-annotation-canvas');
    // 绘制连接 annotation 和元素的连线的画布
    const graphContainerBBox = graphCantainer.getBoundingClientRect();
    const linkCanvas = new Canvas({
      container: graphCantainer,
      width: graphContainerBBox.right - graphContainerBBox.left,
      height: graphContainerBBox.bottom - graphContainerBBox.top,
      renderer: new CanvasRenderer(),
      canvas: linkCanvasEl,
    });

    modifyCSS(linkCanvasEl, {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    });

    window.addEventListener('resize', this.debouncedResizeCanvas);
    const linkGroup = new Group({ id: 'annotation-link-group' });
    linkCanvas.appendChild(linkGroup);
    this.options.linkGroup = linkGroup;
    this.options.canvas = linkCanvas;

    if (!this.options.getTitle) {
      this.options.getTitle = (item) => {
        const { data, id } = item?.model || {};
        return data?.label || id || '-';
      };
    }
    if (!this.options.getContent) {
      this.options.getContent = (item) => {
        if (!item) return '-';
        const { id, data } = item.model || {};
        const type = item.getType?.();
        const suffix = type ? `${type}: ` : '';
        return `${suffix}${data?.label || id || ''}`;
      };
    }

    // init with defaultData
    const defaultData = this.options.defaultData;
    if (defaultData) this.readData(defaultData);
  }

  private createContainer() {
    const containerCfg = this.options.containerCfg || {};
    const graph = this.graph;
    const graphContainer = graph.getContainer();
    const {
      left: gLeft,
      right: gRight,
      top: gTop,
      bottom: gBottom,
    } = graphContainer.getBoundingClientRect();
    const graphContainerHeight = gBottom - gTop;
    const graphContainerWidth = gRight - gLeft;
    const {
      position = 'top',
      offsetX = 0,
      offsetY = 0,
      ...otherStyle
    } = containerCfg;
    let { height = 'fit-content', width = graph.getWidth() } = containerCfg;
    if (height === '100%') height = graphContainerHeight;
    if (width === '100%') width = graphContainerWidth;
    let maxHeight = 'unset',
      maxWidth = 'unset';

    let containerPosition: any = {};
    switch (position) {
      case 'right':
        maxHeight = `${graphContainerHeight}px`;
        containerPosition = { top: 0, right: 0 };
        containerPosition.right += gLeft + offsetX;
        containerPosition.top += gTop + offsetY;
        break;
      case 'bottom':
        maxWidth = `${graphContainerWidth}px`;
        containerPosition = { bottom: 0, left: 0 };
        containerPosition.left += gLeft + offsetX;
        containerPosition.bottom += gTop + offsetY;
        break;
      case 'top':
        maxWidth = `${graphContainerWidth}px`;
      case 'left':
        maxHeight = `${graphContainerHeight}px`;
      default:
        containerPosition = { top: 0, left: 0 };
        containerPosition.left += gLeft + offsetX;
        containerPosition.top += gTop + offsetY;
        break;
    }
    Object.keys(containerPosition).forEach((key) => {
      containerPosition[key] = `${containerPosition[key]}px`;
    });

    const container = createDOM(
      `<div class='${containerCfg?.className} g6-annotation-container'></div>`,
    );
    modifyCSS(container, {
      position: 'absolute',
      display:
        position === 'top' || position === 'bottom' ? 'inline-flex' : 'unset',
      width: isNumber(width) ? `${width}px` : width,
      height: isNumber(height) ? `${height}px` : height,
      maxHeight,
      maxWidth,
      overflow: 'scroll',
      ...containerPosition,
      ...otherStyle,
    });
    graphContainer.appendChild(container);
    container.addEventListener('scroll', (e) => {
      this.updateLinks();
    });
    return container;
  }

  resizeTimer?: number;
  private resizeCanvas() {
    // 仅在 resize 完成后进行调整
    console.log(this)
    clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      if (!this || this.destroyed) return;
      const cBBox = this._container.getBoundingClientRect();
      const newWidth = cBBox.right - cBBox.left;
      const newHeight = cBBox.bottom - cBBox.top;
      this.options.canvas.changeSize(newWidth, newHeight);
      this.updateOutsideCards(this);
    }, 250);
  }

  private debouncedResizeCanvas = debounce(() => this.resizeCanvas(), 100);

  /**
   * 更新超出视口范围的卡片位置
   * @param selfObj 当前 annotation 插件对象。外部调用不需要传入该参数
   */
  public updateOutsideCards(selfObj) {
    const self = selfObj || this;
    const cardInfoMap = self.cardInfoMap;
    const graph = self.graph;
    const graphLeftTopCanvas = graph.getViewportByCanvas({ x: 0, y: 0 });
    const [width, height] = graph.getSize();
    const graphRightBottomCanvas = graph.getViewportByCanvas({
      x: width,
      y: height,
    });
    const { x: graphLeft, y: graphTop } = graph.canvas.viewport2Client({
      x: graphLeftTopCanvas.x,
      y: graphLeftTopCanvas.y,
    });
    const { x: graphRight, y: graphBottom } = graph.canvas.viewport2Client({
      x: graphRightBottomCanvas.x,
      y: graphRightBottomCanvas.y,
    });
    Object.values(cardInfoMap).forEach((cardInfo: any) => {
      const { card } = cardInfo;
      if (!card) return;
      const style = card.style;
      const left = px2Num(style.left);
      const top = px2Num(style.top);
      const { width, height } = card.getBoundingClientRect();
      let newLeft = left;
      let newTop = top;
      if (left + width > graphRight - graphLeft) {
        newLeft = graphRight - graphLeft - width;
      }
      if (left < 0) {
        newLeft = 0;
      }
      if (top + height > graphBottom - graphTop) {
        newTop = graphBottom - graphTop - height;
      }
      if (top < 0) {
        newTop = 0;
      }
      modifyCSS(card, {
        left: `${newLeft}px`,
        top: `${newTop}px`,
      });
    });
    self.updateLinks();
  }

  public showAnnotation(evt: IG6GraphEvent) {
    if (this.destroyed) return;
    const item = this.graph.itemController.getItemById(evt.itemId);
    const id = item.getID()
    if (this.cardInfoMap[id]) {
      this.showCard(id)
    } else {
      this.toggleAnnotation(item);
    }
    this.focusCard(id)
  }

  public hideCards() {
    if (this.destroyed) return;
    Object.keys(this.cardInfoMap).forEach((itemId) => {
      this.hideCard(itemId);
    });
  }

  public toggleAnnotation(item, cfg: CardCfg = {}) {
    if (this.destroyed) return;
    const cardInfoMap = this.cardInfoMap;
    const graph = this.graph;
    const container = this._container;
    const containerCfg = this.options.containerCfg;
    const mixedCardCfg = Object.assign({}, this.options.cardCfg, cfg)
    const {
      minHeight, minWidth,
      maxWidth, maxHeight,
      width, height,
      collapsed = false,
      // x: propsX,
      // y: propsY,
      title: propsTitle,
      content: propsContent,
      maxTitleLength,
      defaultBegin,
    } = mixedCardCfg;
    // const linkGroup: Group = this.options.linkGroup;
    const rows = this.options.rows || [[]];

    const isCanvas = item.isCanvas?.();

    const itemId = isCanvas ? CANVAS_ANNOTATION_ID : item.getID();
    const cardInfo = cardInfoMap[itemId];

    // let link = cardInfo?.link,
    const x = cardInfo?.cfg.x,
      y = cardInfo?.cfg.y;
    // const card = cardInfo?.card,
    const title = cardInfo?.cfg.title,
      content = cardInfo?.cfg.content;

    const getTitle = this.options.getTitle;
    const getContent = this.options.getContent;
    const getContentPlaceholder =
      this.options.getContentPlaceholder || (() => '');
    const getTitlePlaceHolder = this.options.getTitlePlaceHolder || (() => '');
    const contentPlaceholder = getContentPlaceholder(item);
    const titlePlaceholder = getTitlePlaceHolder(item);

    let titleData = title || propsTitle || getTitle?.(item);
    if (typeof titleData === 'string')
      titleData = titleData.substr(0, maxTitleLength);
    titleData = titleData || titlePlaceholder;

    const contentData =
      content || propsContent || getContent?.(item) || contentPlaceholder;
    const newCard = new Card(this, {
      ...mixedCardCfg,
      id: itemId,
      collapsed,
      title: titleData,
      titlePlaceholder,
      content: contentData,
      contentPlaceholder,
    });

    const exist = !!cardInfo;
    if (exist) {
      cardInfo.destroy()
    }

    // let containerBBox;
    // if (!containerCfg) {
    //   containerBBox = container.getBoundingClientRect() || {};
    //   if (propsX !== undefined && propsY !== undefined) {
    //     // 使用配置的位置
    //     x = propsX;
    //     y = propsY;
    //   } else if (!exist && !isCanvas) {
    //     // 第一次创建，且无 conatiner，初始化位置
    //     const { top: containerTop } = containerBBox;
    //     const {
    //       left: beginLeft,
    //       right: propsBeginRight = 16,
    //       top: propsBeginTop = 8,
    //       bottom: beginBottom,
    //     } = defaultBegin || {};
    //     let beginRight = propsBeginRight;
    //     let beginTop = propsBeginTop;
    //     if (isNumber(beginLeft) && !Number.isNaN(beginLeft)) {
    //       beginRight = container.scrollWidth - beginLeft;
    //     }
    //     if (isNumber(beginBottom) && !Number.isNaN(beginBottom)) {
    //       beginTop = container.scrollHeight - beginBottom;
    //     }
    //     const cardWidth = isNumber(minWidth) ? minWidth : 100;
    //     x =
    //       container.scrollWidth -
    //       newCard.$el.scrollWidth -
    //       (rows.length - 1) * cardWidth -
    //       beginRight;
    //     const currentRow = rows[rows.length - 1];
    //     const { bbox: lastCardBBox } = currentRow[currentRow.length - 1] || {};
    //     y = lastCardBBox?.bottom - containerTop || beginTop;
    //   }
    //   newCard.move(x, y)
    //   // modifyCSS(newCard, {
    //   //   position: 'absolute',
    //   //   left: `${x}px`,
    //   //   top: `${y}px`,
    //   //   // cusor: containerCfg ? 'unset' : 'move',
    //   // });
    // }

    // const cardBBox = newCard.getBoundingClientRect();
    // if (!isCanvas) {
    //   // 创建相关连线
    //   const path = getPathItem2Card(item, cardBBox, graph, this.options.canvas);
    //   const linkStyle = this.options.linkStyle;

    //   link = linkGroup.appendChild(
    //     new Path({
    //       attrs: {
    //         lineWidth: 1,
    //         lineDash: [5, 5],
    //         stroke: '#ccc',
    //         path,
    //         ...linkStyle,
    //       },
    //     }),
    //   );
    // }

    cardInfoMap[itemId] = newCard;
    // cardInfoMap[itemId] = {
    //   ...cardInfo,
    //   id: itemId,
    //   collapsed,
    //   card: newCard,
    //   link,
    //   x,
    //   y,
    //   // cardBBox,
    //   content: contentData,
    //   title: titleData,
    //   contentPlaceholder,
    //   titlePlaceholder,
    //   isCanvas,
    // };
    // this.cardInfoMap = cardInfoMap;

    // this.bindListener(newCard, itemId);

    const cardBBox = newCard.$el.getBoundingClientRect()
    if (containerCfg) {
      this.updateCardPositionsInContainer();
      this.updateLinks();
    } else {
      const containerBBox = container.getBoundingClientRect()
      const hasPropsPosition =
        isNumber(mixedCardCfg.x) &&
        !Number.isNaN(mixedCardCfg.x) &&
        isNumber(mixedCardCfg.y) &&
        !Number.isNaN(mixedCardCfg.y);
      if (!exist && !isCanvas && !hasPropsPosition) {
        // 没有 container、新增 card 时，记录当前列中最下方位置，方便换行
        const { bottom: containerBottom = 0, top: containerTop } =
          containerBBox;
        rows[rows.length - 1].push({
          id: itemId,
          get bbox() {
            return newCard.$el.getBoundingClientRect()
          }
        });
        if (
          cardBBox.top >
          containerBottom - containerTop - cardBBox.height - 16
        )
        rows.push([]);
        this.options.rows = rows;
      }
    }

    this.options.onAnnotationChange?.(cardInfoMap[itemId], exist ? 'update' : 'create');
  }

  public updateCardPositionsInContainer() {
    if (this.destroyed) return;
    const cardInfoMap = this.cardInfoMap;
    if (!cardInfoMap) return;
    const container = this._container;
    const { position } = this.options.containerCfg || {};
    let { width: containerWidth } = container.getBoundingClientRect();
    const computeStyle = getComputedStyle(container);
    const sidePadding =
      px2Num(computeStyle['paddingLeft']) +
      px2Num(computeStyle['paddingRight']);
    containerWidth -= sidePadding;
    Object.values(cardInfoMap).forEach(({ card }: any) => {
      const { width: cardWidth } = card.getBoundingClientRect();
      switch (position) {
        case 'right':
          modifyCSS(card, {
            marginLeft: containerWidth
              ? `${containerWidth - cardWidth}px`
              : '0px',
          });
          break;
        case 'top':
        case 'bottom':
          modifyCSS(card, {
            marginLeft: '8px',
          });
        default:
          break;
      }
    });
  }
  
  public showCard(id) {
    if (this.destroyed) return;
    const cardInfo = this.cardInfoMap[id]
    if (!cardInfo) return;
    cardInfo.show();
    this.options.onAnnotationChange?.(cardInfo, 'show');
  }

  public focusCard(id) {
    this.cardInfoMap[id]?.focus();

    Object.keys(this.cardInfoMap).forEach(cardId => {
      if (cardId !== id) {
        this.blurCard(cardId)
      }
    })
  }

  public blurCard(id) {
    this.cardInfoMap[id]?.blur()
  }

  /**
   * 隐藏标注卡片，下次打开还保留隐藏前的配置，包括文本内容、位置等
   * @param id 卡片 id，即元素(节点/边)的 id
   * @returns
   */
  public hideCard(id) {
    if (this.destroyed) return;
    const cardInfo = this.cardInfoMap[id]
    if (!cardInfo) return;
    cardInfo.hide()
    this.options.onAnnotationChange?.(cardInfo, 'hide');
  }

  public editCard(id, options?: { position?: EditPosition; value?: any }) {
    if (this.destroyed) return;
    
    return this.cardInfoMap[id].edit(options?.position, options)
  }

  public exitEditCard(id, options?: { position?: EditPosition; }) {
    if (this.destroyed) return;
    
    return this.cardInfoMap[id].exitEdit(options?.position)
  }

  public moveCard(id, x: number, y: number) {
    return this.cardInfoMap[id].move(x, y)
  }

  /**
   * 移除标注卡片，下一次生成时将被初始化
   * @param id 卡片 id，即元素(节点/边)的 id
   * @returns
   */
  public removeCard(id) {
    if (this.destroyed) return;
    const cardInfo = this.cardInfoMap[id];
    if (!cardInfo) return;
    cardInfo.destroy();
    delete cardInfo[id];
    this.options.onAnnotationChange?.(cardInfo, 'remove');
  }
  
  public updateLink({ item }) {
    if (!item) return;
    const cardInfoMap: CardInfoMap = this.cardInfoMap;
    if (!cardInfoMap) return;
    const canvas = this.options.canvas;
    const graph = this.graph;
    const id = item.getID();
    const { link } = cardInfoMap[id];
    if (link) {
      const path = getPathItem2Card(
        item,
        cardInfoMap[id].$el.getBoundingClientRect(),
        graph,
        canvas,
      );
      link.attr('path', path);
    }
  }

  public updateLinks() {
    if (this.destroyed) return;
    const cardInfoMap: CardInfoMap = this.cardInfoMap;
    if (!cardInfoMap) return;
    const graph = this.graph;
    Object.values(cardInfoMap).forEach((cardInfo) => {
      this.updateLink({ item: cardInfo.item });
    });
  }

  public onGraphDataChange() {
    const cardInfoMap: CardInfoMap = this.cardInfoMap;
    if (!cardInfoMap) return;
    const graph = this.graph;
    Object.values(cardInfoMap).forEach((info) => {
      if (!info.$el || info.isCanvas || info.$el.style.display === 'none') return;
      const item = info.item
      if (item && item.isVisible()) {
        this.toggleAnnotation(item);
      } else {
        info.hide()
      }
    });
  }

  public onGraphItemVisibilityChange({ item, visible }) {
    if (!item || item.destroyed) return;
    const cardInfoMap: CardInfoMap = this.cardInfoMap;
    if (!cardInfoMap) return;
    const id = item.getID();
    if (!cardInfoMap[id]) return;
    if (!visible) this.hideCard(id);
  }

  public saveData(saveClosed = false) {
    const cardInfoMap: CardInfoMap = this.cardInfoMap;
    if (!cardInfoMap) return;
    const graph = this.graph;
    const getTitle = this.options.getTitle;
    const getContent = this.options.getContent;
    const data: AnnotationData = [];
    Object.values(cardInfoMap).forEach((info) => {
      const card = info.$el
      const { title, content, x, y, id, collapsed } = info.cfg;
      if (card && card.style.display === 'none' && !saveClosed) return;
      const item = graph.itemController.getItemById(id) || graph.options.canvas;
      data.push({
        id: id!,
        x,
        y,
        collapsed,
        title: title || getTitle?.(item),
        content: content || getContent?.(item),
        visible: card && card.style.display !== 'none',
      });
    });
    return data;
  }

  public readData(data) {
    const graph = this.graph;
    data.forEach((info) => {
      const { id, x, y, title, content, collapsed, visible } = info;
      let item = graph.itemController.getItemById(id);
      if (!item && id === CANVAS_ANNOTATION_ID) {
        item = graph.options.canvas;
      }
      if (!item) {
        this.cardInfoMap[item.id] = new Card(this, info);
        return;
      }
      this.toggleAnnotation(item, { x, y, title, content, collapsed });
      if (!visible) this.hideCard(id);
    });
  }

  /**
   * Clear the cards and links
   */
  public clear() {
    const cardInfoMap: CardInfoMap = this.cardInfoMap;
    if (!cardInfoMap) return;
    const container = this._container;
    Object.values(cardInfoMap).forEach((cardInfo) => {
      cardInfo.destroy()
    });
    this.cardInfoMap = {};
  }

  /**
   * Destroy the component
   */
  public destroy() {
    this.clear();
    this.options.canvas?.destroy();
    const graph = this.graph;
    if (!graph || graph.destroyed) return;
    if (this.options.containerCfg) {
      graph.getContainer().removeChild(this.options.container);
    }
    this.destroyed = true;
  }
}
