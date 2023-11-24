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
  /**
   * Set the parent element of the card.
   * When there is no containerCfg, the container of the graph will be used as the parent element;
   */
  containerCfg?: {
    position?: 'left' | 'right' | 'top' | 'bottom';
    /**
     * the parent element's className;
     */
    className?: string;
    width?: number | string;
    height?: number | string;
    offsetX?: number;
    offsetY?: number;
  };
  /**
   * Set whether the card is editable
   */
  editable?: boolean;
  /** Highlight status of item, set this state when moving to the card. */
  itemHighlightState?: string;
  /** Initial card data. */
  defaultData?: CardCfg[];
  /** Detailed configuration of the card, please refer to ```CardCfg``` for details */
  cardCfg?: CardCfg;
  /** Style of edge between cards and nodes. */
  linkStyle?: PathStyleProps;
  /** Highlight style of edge, set this state when moving to the style. */
  linkHighlightStyle?: PathStyleProps;
  /**
   * Returns the title of the card. When getTitle returns empty, the return of getTitlePlaceholder will be used as the title
   * @param item
   */
  getTitle?(item): string;
  /**
   * Returns the content of the card. When getTitle returns empty, the return of getContentPlaceholder will be used as the content
   * @param item
   */
  getContent?(item): string;
  /**
   * Return the placeholder of the title of the card
   * @param item
   */
  getTitlePlaceholder?(item): string;
  /**
   * Return the placeholder of the content of the card
   * @param item
   */
  getContentPlaceholder?(item): string;
  /**
   * Triggered when annotation changes
   * @param cardInfo
   * @param action
   */
  onAnnotationChange?(
    cardInfo: Card,
    action: 'create' | 'update' | 'show' | 'hide' | 'remove',
  ): void;
}

interface CardInfoMap {
  [id: string]: Card;
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

  cardInfoMap: CardInfoMap = {};

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
      getTitlePlaceholder() {
        return '按 回车 保存'; // TODO: i18n
      },
      getContentPlaceholder(item) {
        return '按 回车 保存\n按 Shift + 回车 换行';
      },
      cardCfg: {
        maxWidth: 300,
        maxHeight: 500,
        minWidth: 180,
        minHeight: 120,
        width: 180,
        height: 'fit-content',
        visible: true,
        collapsed: false,
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

  container: HTMLElement;
  public init(graph: IGraph) {
    super.init(graph);
    if (this.destroyed) return;
    this.graph = graph;
    const graphCantainer = graph.container;

    const containerCfg = this.options.containerCfg;
    if (containerCfg) {
      this.container = this.createContainer();
    } else {
      this.container = graphCantainer;
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
    const graphContainer = graph.container;
    const {
      left: gLeft,
      top: gTop,
      width: gWidth,
      height: gHeight,
    } = graphContainer.getBoundingClientRect();
    const {
      position = 'top',
      offsetX = 0,
      offsetY = 0,
      ...otherStyle
    } = containerCfg;
    let { height, width } = containerCfg;
    if (!height || height === '100%') height = gHeight;
    if (!width || width === '100%') width = gWidth;
    let maxHeight = 'unset',
      maxWidth = 'unset';

    let containerPosition: any = {};
    switch (position) {
      case 'right':
        maxHeight = `${gHeight}px`;
        containerPosition = { top: 0, right: 0 };
        containerPosition.right += gLeft + offsetX;
        containerPosition.top += gTop + offsetY;
        break;
      case 'bottom':
        maxWidth = `${gWidth}px`;
        containerPosition = { bottom: 0, left: 0 };
        containerPosition.left += gLeft + offsetX;
        containerPosition.bottom += gTop + offsetY;
        break;
      case 'top':
        maxWidth = `${gWidth}px`;
      case 'left':
        maxHeight = `${gHeight}px`;
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
    console.log(this);
    clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      if (!this || this.destroyed) return;
      const cBBox = this.container.getBoundingClientRect();
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
    const id = item.getID();
    if (this.cardInfoMap[id]) {
      this.showCard(id);
    } else {
      this.toggleAnnotation(item);
    }
    this.focusCard(id);
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
    const container = this.container;
    const containerCfg = this.options.containerCfg;
    const mixedCardCfg = Object.assign({}, this.options.cardCfg, cfg);
    const {
      collapsed = false,
      title: propsTitle,
      content: propsContent,
      maxTitleLength,
    } = mixedCardCfg;
    const rows = this.options.rows || [[]];

    const isCanvas = item.isCanvas?.();

    const itemId = isCanvas ? CANVAS_ANNOTATION_ID : item.getID();
    const cardInfo = cardInfoMap[itemId];

    const title = cardInfo?.cfg.title,
      content = cardInfo?.cfg.content;

    const getTitle = this.options.getTitle;
    const getContent = this.options.getContent;
    const getContentPlaceholder =
      this.options.getContentPlaceholder || (() => '');
    const getTitlePlaceholder = this.options.getTitlePlaceholder || (() => '');
    const contentPlaceholder = getContentPlaceholder(item);
    const titlePlaceholder = getTitlePlaceholder(item);

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
      editable: this.options.editable ?? true,
    });

    const exist = !!cardInfo;
    if (exist) {
      cardInfo.destroy();
    }

    cardInfoMap[itemId] = newCard;

    const cardBBox = newCard.$el.getBoundingClientRect();
    if (containerCfg) {
      this.updateCardPositionsInContainer();
      this.updateLinks();
    } else {
      const containerBBox = container.getBoundingClientRect();
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
            return newCard.$el.getBoundingClientRect();
          },
        });
        if (
          cardBBox.top >
          containerBottom - containerTop - cardBBox.height - 16
        )
          rows.push([]);
        this.options.rows = rows;
      }
    }

    this.options.onAnnotationChange?.(
      cardInfoMap[itemId],
      exist ? 'update' : 'create',
    );
  }

  public updateCardPositionsInContainer() {
    if (this.destroyed) return;
    const cardInfoMap = this.cardInfoMap;
    if (!cardInfoMap) return;
    const container = this.container;
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
    const cardInfo = this.cardInfoMap[id];
    if (!cardInfo) return;
    cardInfo.show();
    this.options.onAnnotationChange?.(cardInfo, 'show');
  }

  public focusCard(id) {
    this.cardInfoMap[id]?.focus();

    Object.keys(this.cardInfoMap).forEach((cardId) => {
      if (cardId !== id) {
        this.blurCard(cardId);
      }
    });
  }

  public blurCard(id) {
    this.cardInfoMap[id]?.blur();
  }

  /**
   * 隐藏标注卡片，下次打开还保留隐藏前的配置，包括文本内容、位置等
   * @param id 卡片 id，即元素(节点/边)的 id
   * @returns
   */
  public hideCard(id) {
    if (this.destroyed) return;
    const cardInfo = this.cardInfoMap[id];
    if (!cardInfo) return;
    cardInfo.hide();
    this.options.onAnnotationChange?.(cardInfo, 'hide');
  }

  public editCard(id, options?: { position?: EditPosition; value?: any }) {
    if (this.destroyed) return;

    return this.cardInfoMap[id].edit(options?.position, options);
  }

  public exitEditCard(id, options?: { position?: EditPosition }) {
    if (this.destroyed) return;

    return this.cardInfoMap[id].exitEdit(options?.position);
  }

  public moveCard(id, x: number, y: number) {
    return this.cardInfoMap[id].move(x, y);
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
      if (!info.$el || info.isCanvas || info.$el.style.display === 'none')
        return;
      const item = info.item;
      if (item && item.isVisible()) {
        this.toggleAnnotation(item);
      } else {
        info.hide();
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
      const card = info.$el;
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
    Object.values(cardInfoMap).forEach((cardInfo) => {
      cardInfo.destroy();
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
      graph.container.removeChild(this.container);
    }
    this.destroyed = true;
  }
}
