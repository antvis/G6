import { isNumber, debounce } from '@antv/util';
import { Util, ShapeStyle } from '@antv/g6-core';
import { modifyCSS, createDom } from '@antv/dom-util';
import insertCss from 'insert-css';
import { Canvas } from '@antv/g-canvas';
import { IShape } from '@antv/g-base';
import Base from '../base';

typeof document !== 'undefined' &&
  insertCss(`
  .g6-annotation-container {
    background-color: rgba(255, 255, 255, 0.3);
    padding: 8px;
  }
  .g6-annotation-wrapper {
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.85);
  }
  .g6-annotation-header-wapper {
    height: fit-content;
    width: 100%;
    background-color: #5B8FF9;
    display: inline-flex;
    cursor: move;
  }
  .g6-annotation-title {
    margin: 4px 40px 4px 8px;
    cursor: text;
    min-width: 32px;
  }
  .g6-annotation-collapse {
    margin: 4px;
    cursor: pointer;
  }
  .g6-annotation-expand {
    margin: 4px;
    cursor: pointer;
  }
  .g6-annotation-close {
    margin: 4px 8px 4px 0;
    cursor: pointer;
  }
  .g6-annotation-content {
    padding: 8px;
    width: fit-content;
    cursor: text;
    word-break: break-all;
    min-width: 32px;
  }
  .g6-annotation-title-input-wrapper {
    margin: 4px 40px 4px 8px;
  }
  .g6-annotation-content-input {
    height: 100%;
    word-break: break-all;
  }
  .g6-annotation-content-input-wrapper {
    margin: 8px;
    height: 100%;
  }
`);

interface AnnotationConfig {
  trigger?: 'click' | 'fix',
  containerCfg?: { // 无配置则没有自身容器，直接以图的容器为父容器
    position?: 'left' | 'right' | 'top' | 'bottom',
    className?: string,
    width?: number,
    height?: number,
    offsetX?: number,
    offsetY?: number,
  },
  editable?: boolean,
  itemHighlightState?: string,
  defaultData?: CardCfg[],
  cardCfg?: CardCfg,
  linkStyle?: ShapeStyle,
  linkHighlightStyle?: ShapeStyle,
  getTitle?: (item) => string | HTMLDivElement,
  getContent?: (item) => string | HTMLDivElement,
  onAnnotationChange?: (info: any, action: string) => void;
}


interface CardCfg {
  id?: string,
  width?: number | 'fit-content',
  height?: number | 'fit-content',
  minHeight?: number | string,
  minWidth?: number | string,
  collapsed?: boolean;
  // 指定位置，视口坐标系。仅在无 containerCfg 时生效
  x?: number;
  y?: number;
  title?: string,
  content?: string,
  borderRadius?: number;
  maxTitleLength?: number;
  maxWidth?: number;
  collapseType?: 'minimize' | 'hide'; // 点击收起按钮(-)的响应，最小化、隐藏
  closeType?: 'hide' | 'remove'; // 点击关闭按钮(x)的相应，隐藏、移除
  defaultBegin?: { left?: number, top?: number, right?: number, bottom?: number }, // 一个个卡片出生的起始位置，后续卡片会往后排列
  onMouseEnterIcon?: (evt: any, id: string, type: 'expand' | 'collapse' | 'close') => void;
  onMouseLeaveIcon?: (evt: any, id: string, type: 'expand' | 'collapse' | 'close') => void;
  onClickIcon?: (evt: any, id: string, type: 'expand' | 'collapse' | 'close') => void;
}

interface CardInfoMap {
  [id: string]: CardCfg & {
    card: HTMLDivElement,
    link: IShape,
    isCanvas?: boolean,
    cardBBox?: {
      left: number,
      right: number,
      top: number,
      bottom: number,
    }
  }
}

export default class Annotation extends Base {
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
        shadowBlur: 10
      },
      cardCfg: {
        minHeight: 60,
        width: 'fit-content',
        height: 'fit-content',
        collapseType: 'minimize',
        closeType: 'hide',
        borderRadius: 5,
        maxTitleLength: 20
      },
    };
  }

  // class-methods-use-this
  public getEvents() {
    let events: {
      [eventName: string]: string
    } = {
      'viewportchange': 'updateLinks',
      'afterlayout': 'updateLinks',
      'aftergraphrefreshposition': 'updateLinks',
      'afterupdateitem': 'updateLink',
      'afterchangedata': 'onGraphDataChange',
      'afteritemvisibilitychange': 'onGraphItemVisibilityChange'
    }
    switch (this.get('trigger')) {
      case 'click':
        events = {
          ...events,
          'node:click': 'showAnnotation',
          'edge:click': 'showAnnotation',
        }
    }
    return events
  }

  private getDOMContent(cfg) {
    if (this.destroyed) return;
    const {
      collapsed,
      maxWidth,
      title = '',
      content = '',
      borderRadius: r = 5,
    } = cfg;
    const collapseExpandDOM = collapsed ?
      `<p class='g6-annotation-expand'>+</p>` :
      `<p class='g6-annotation-collapse'>-</p>`;
    const contentDOM = collapsed ? '' : ` <p class='g6-annotation-content'>${content}</p>`;
    const closeDOM = `<p class='g6-annotation-close'>x</p>`
    const borderRadius = collapsed ? `${r}px` : `${r}px ${r}px 0 0`;

    return `<div class="g6-annotation-wrapper" style="border-radius: ${r}px; max-width: ${maxWidth}px">
        <div
          class="g6-annotation-header-wapper"
          style="border-radius: ${borderRadius};"
        >
          <h4 class='g6-annotation-title'>${title}</h4>
          ${collapseExpandDOM}
          ${closeDOM}
        </div>
        ${contentDOM}
      </div>`
  }

  public init() {
    const self = this;
    if (self.destroyed) return;
    const graph = self.get('graph');
    const graphCantainer = graph.getContainer();

    let container = self.get('container')
    const containerCfg = this.get('containerCfg');
    if (containerCfg) {
      container = this.createContainer();
      graphCantainer.appendChild(container)
    } else {
      container = graphCantainer;
    }
    this.set('container', container)

    // 绘制连接 annotation 和元素的连线的画布
    const graphContainerBBox = graphCantainer.getBoundingClientRect();
    const linkCanvas = new Canvas({
      container: graphCantainer,
      width: graphContainerBBox.right - graphContainerBBox.left,
      height: graphContainerBBox.bottom - graphContainerBBox.top
    });
    modifyCSS(linkCanvas.get('el'), {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none'
    })
    // 需要传入 self，无法 removeEventListener，只能在内部判断 self 被销毁则不继续
    window.addEventListener('resize', debounce(() => self.resizeCanvas(self), 100));

    const linkGroup = linkCanvas.addGroup({ id: 'annotation-link-group' });
    self.set('linkGroup', linkGroup);
    self.set('canvas', linkCanvas);

    if (!self.get('getTitle')) {
      self.set('getTitle', (item) => {
        const { label, id } = item?.getModel?.() || {};
        return label || id || '-';
      });
    }
    if (!self.get('getContent')) {
      self.set('getContent', (item) => {
        if (!item) return '-';
        const { label, id } = item.getModel?.() || {};
        const type = item.getType?.();
        const suffix = type ? `${type}: ` : '';
        return `${suffix}${label || id || ''}`;
      });
    }

    // init with defaultData
    const defaultData = self.get('defaultData');
    if (defaultData) this.readData(defaultData);
  }

  private createContainer() {
    if (this.destroyed) return;
    const containerCfg = this.get('containerCfg');
    const graph = this.get('graph');
    const graphContainer = graph.getContainer();
    const { left: gLeft, right: gRight, top: gTop, bottom: gBottom } = graphContainer.getBoundingClientRect();
    const graphContainerHeight = gBottom - gTop;
    const graphContainerWidth = gRight - gLeft;
    const { position = 'top', offsetX = 0, offsetY = 0, ...otherStyle } = containerCfg;
    let { height = 'fit-content', width = graph.getWidth() } = containerCfg;
    if (height === '100%') height = graphContainerHeight;
    if (width === '100%') width = graphContainerWidth;
    let maxHeight = 'unset', maxWidth = 'unset';

    let containerPosition: any = {};
    switch (position) {
      case 'right':
        maxHeight = `${graphContainerHeight}px`;
        containerPosition = { top: 0, right: 0 };
        containerPosition.right += (gLeft + offsetX);
        containerPosition.top += (gTop + offsetY);
        break;
      case 'bottom':
        maxWidth = `${graphContainerWidth}px`;
        containerPosition = { bottom: 0, left: 0 };
        containerPosition.left += (gLeft + offsetX);
        containerPosition.bottom += (gTop + offsetY);
        break;
      case 'top':
        maxWidth = `${graphContainerWidth}px`;
      case 'left':
        maxHeight = `${graphContainerHeight}px`;
      default:
        containerPosition = { top: 0, left: 0 };
        containerPosition.left += (gLeft + offsetX);
        containerPosition.top += (gTop + offsetY);
        break;
    }
    Object.keys(containerPosition).forEach(key => {
      containerPosition[key] = `${containerPosition[key]}px`;
    });

    const container = createDom(`<div class='${containerCfg.className} g6-annotation-container'></div>`);
    modifyCSS(container, {
      position: 'absolute',
      display: position === 'top' || position === 'bottom' ? 'inline-flex' : 'unset',
      width: isNumber(width) ? `${width}px` : width,
      height: isNumber(height) ? `${height}px` : height,
      maxHeight,
      maxWidth,
      overflow: 'scroll',
      ...containerPosition,
      ...otherStyle
    });
    graphContainer.appendChild(container);
    container.addEventListener('scroll', e => {
      this.updateLinks();
    })
    return container;
  }

  private resizeCanvas(self) {
    // 仅在 resize 完成后进行调整
    clearTimeout(self.resizeTimer);
    self.resizeTimer = setTimeout(() => {
      if (!self || self.destroyed) return;
      const cBBox = self.get('container').getBoundingClientRect();
      const newWidth = cBBox.right - cBBox.left;
      const newHeight = cBBox.bottom - cBBox.top
      self.get('canvas').changeSize(
        newWidth,
        newHeight
      )
      self.updateOutsideCards(self);
    }, 250);
  }

  private updateOutsideCards(self) {
    const cardInfoMap = self.get('cardInfoMap') || {};
    const graph = self.get('graph');
    const graphLeftTopCanvas = graph.getPointByCanvas(0, 0);
    const graphRightBottomCanvas = graph.getPointByCanvas(graph.getWidth(), graph.getHeight());
    const { x: graphLeft, y: graphTop } = graph.getClientByPoint(graphLeftTopCanvas.x, graphLeftTopCanvas.y);
    const { x: graphRight, y: graphBottom } = graph.getClientByPoint(graphRightBottomCanvas.x, graphRightBottomCanvas.y);
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
        top: `${newTop}px`
      });
    });
    self.updateLinks();
  }

  public showAnnotation(evt) {
    if (this.destroyed) return;
    const { item } = evt;
    this.toggleAnnotation(item);
  }

  public hideCards() {
    const self = this;
    if (self.destroyed) return;
    const cardInfoMap = self.get('cardInfoMap') || {};
    Object.keys(cardInfoMap).forEach((itemId) => {
      self.hideCard(itemId);
    })
  }


  public toggleAnnotation(item, cfg: CardCfg = {}) {
    const self = this;
    if (self.destroyed) return;
    const cardInfoMap = self.get('cardInfoMap') || {};
    const graph = self.get('graph');
    const container = self.get('container');
    const containerCfg = self.get('containerCfg');
    const {
      minHeight,
      minWidth,
      width,
      height,
      collapsed = false,
      x: propsX,
      y: propsY,
      title: propsTitle,
      content: propsContent,
      maxTitleLength,
      defaultBegin,
      ...otherCardCfg
    } = Object.assign({}, self.get('cardCfg') || {}, cfg);
    const linkGroup = self.get('linkGroup');
    const rows = this.get('rows') || [[]];

    const isCanvas = item.isCanvas?.();

    const itemId = isCanvas ? 'canvas-annotation' : item.getID();
    let { card, link, x, y, title, content } = cardInfoMap[itemId] || {};

    const getTitle = this.get('getTitle');
    const getContent = this.get('getContent');
    const newCard = createDom(this.getDOMContent({
      itemId,
      collapsed,
      title: (title || propsTitle || getTitle?.(item)).substr(0, maxTitleLength),
      content: content || propsContent || getContent?.(item),
      ...otherCardCfg
    }));
    const minHeightPx = isNumber(minHeight) ? `${minHeight}px` : minHeight
    modifyCSS(newCard, {
      minHeight: collapsed ? 'unset' : minHeightPx,
      minWidth: isNumber(minWidth) ? `${minWidth}px` : minWidth,
      height,
      width,
    });
    let exist = !!card;
    if (exist) {
      // 移除相应连线
      link?.remove(true);
      // 替换原来的卡片
      container.replaceChild(newCard, card);
    } else {
      container.appendChild(newCard);
    }

    let containerBBox;
    if (!containerCfg) {
      containerBBox = container.getBoundingClientRect() || {};
      if (propsX !== undefined && propsY !== undefined) {
        // 使用配置的位置
        x = propsX;
        y = propsY;
      } else if (!exist && !isCanvas) {
        // 第一次创建，且无 conatiner，初始化位置
        const { top: containerTop } = containerBBox;
        const { left: beginLeft, right: propsBeginRight = 16, top: propsBeginTop = 8, bottom: beginBottom } = defaultBegin || {};
        let beginRight = propsBeginRight;
        let beginTop = propsBeginTop;
        if (!isNaN(beginLeft)) {
          beginRight = container.scrollWidth - beginLeft;
        }
        if (!isNaN(beginBottom)) {
          beginTop = container.scrollHeight - beginBottom;
        }
        const cardWidth = isNumber(minWidth) ? minWidth : 100;
        x = container.scrollWidth - newCard.scrollWidth - (rows.length - 1) * cardWidth - beginRight;
        const currentRow = rows[rows.length - 1];
        const { bbox: lastCardBBox } = currentRow[currentRow.length - 1] || {};
        y = (lastCardBBox?.bottom - containerTop) || beginTop
      }
      modifyCSS(newCard, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        cusor: containerCfg ? 'unset' : 'move',
      });
    }
    this.bindListener(newCard, itemId);

    const cardBBox = newCard.getBoundingClientRect()
    if (!isCanvas) {
      // 创建相关连线
      const path = getPathItem2Card(item, cardBBox, graph, this.get('canvas'));
      const linkStyle = this.get('linkStyle');
      link = linkGroup.addShape('path', {
        attrs: {
          lineWidth: 1,
          lineDash: [5, 5],
          stroke: '#ccc',
          path,
          ...linkStyle
        }
      });
    }
    cardInfoMap[itemId] = {
      ...(cardInfoMap[itemId] || {}),
      id: itemId,
      collapsed,
      card: newCard,
      link,
      x,
      y,
      cardBBox,
      content: content || propsContent,
      title: title || propsTitle,
      isCanvas
    };

    self.set('cardInfoMap', cardInfoMap);
    if (containerCfg) {
      this.updateCardPositionsInConatainer();
      this.updateLinks();
    } else {
      const hasPropsPosition = !isNaN(propsX) && !isNaN(propsY);
      if (!exist && !isCanvas && !hasPropsPosition) {
        // 没有 container、新增 card 时，记录当前列中最下方位置，方便换行
        const { bottom: containerBottom = 0, top: containerTop } = containerBBox;
        rows[rows.length - 1].push({
          id: itemId,
          bbox: cardBBox
        });
        if (cardBBox.top > containerBottom - containerTop - cardBBox.height - 16) rows.push([]);
        this.set('rows', rows)
      }
    }
    this.updateCardSize(itemId);

    const onAnnotationChange = this.get('onAnnotationChange');
    onAnnotationChange?.(cardInfoMap[itemId], exist ? 'update' : 'create');
  }

  public updateCardPositionsInConatainer() {
    if (this.destroyed) return;
    const cardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const container = this.get('container');
    const { position } = this.get('containerCfg');
    let { width: containerWidth } = container.getBoundingClientRect();
    const computeStyle = getComputedStyle(container);
    const sidePadding = px2Num(computeStyle['paddingLeft']) + px2Num(computeStyle['paddingRight'])
    containerWidth -= sidePadding;
    Object.values(cardInfoMap).forEach(({ card }) => {
      const { width: cardWidth } = card.getBoundingClientRect();
      switch (position) {
        case 'right':
          modifyCSS(card, {
            marginLeft: containerWidth ? `${containerWidth - cardWidth}px` : '0px'
          });
          break;
        case 'top':
        case 'bottom':
          modifyCSS(card, {
            marginLeft: '8px'
          });
        default:
          break;
      }
    });
  }

  public handleExpandCollapseCard(id) {
    if (this.destroyed) return;
    const graph = this.get('graph');
    const cardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const { collapsed } = cardInfoMap[id];
    const item = graph.findById(id);
    if (!item) return;
    const { collapseType } = this.get('cardCfg');

    if (collapseType === 'hide' && !collapsed) {
      // collapse 行为被配置为隐藏
      this.hideCard(id);
    } else {
      this.toggleAnnotation(item, { collapsed: !collapsed });
    }

    cardInfoMap[id] = {
      ...cardInfoMap[id],
      collapsed: !collapsed
    }
  }

  /**
   * 隐藏标注卡片，下次打开还保留隐藏前的配置，包括文本内容、位置等
   * @param id 卡片 id，即元素(节点/边)的 id
   * @returns 
   */
  public hideCard(id) {
    if (this.destroyed) return;
    const cardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const { card, link } = cardInfoMap[id];
    modifyCSS(card, { display: 'none' });
    link?.hide();
    const onAnnotationChange = this.get('onAnnotationChange');
    onAnnotationChange(cardInfoMap[id], 'hide');
  }

  /**
   * 移除标注卡片，下一次生成时将被初始化
   * @param id 卡片 id，即元素(节点/边)的 id
   * @returns 
   */
  public removeCard(id) {
    if (this.destroyed) return;
    const cardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const cardInfo = cardInfoMap[id]
    const { card, link } = cardInfo;
    const container = this.get('container');
    container.removeChild(card);
    link?.remove(true);
    delete cardInfoMap[id];
    const onAnnotationChange = this.get('onAnnotationChange');
    onAnnotationChange(cardInfo, 'remove');
  }

  private bindListener(card, itemId) {
    if (this.destroyed) return;
    card.addEventListener('mousemove', e => {
      // icon 的鼠标进入监听，方便外部加 tooltip
      let iconType;
      if (e.target.className === 'g6-annotation-collapse') {
        iconType = 'collapse'
      } else if (e.target.className === 'g6-annotation-expand') {
        iconType = 'expand'
      } else if (e.target.className === 'g6-annotation-close') {
        iconType = 'close'
      }
      if (iconType) {
        const { onMouseEnterIcon = () => { } } = this.get('cardCfg');
        onMouseEnterIcon(e, itemId, iconType);
      }
    });
    card.addEventListener('mouseout', e => {
      // icon 的鼠标移出监听，方便外部加 tooltip
      let iconType;
      if (e.target.className === 'g6-annotation-collapse') {
        iconType = 'collapse'
      } else if (e.target.className === 'g6-annotation-expand') {
        iconType = 'expand'
      } else if (e.target.className === 'g6-annotation-close') {
        iconType = 'close'
      }
      if (iconType) {
        const { onMouseLeaveIcon = () => { } } = this.get('cardCfg');
        onMouseLeaveIcon(e, itemId, iconType);
      }
    });
    // mouseenter and mouseleave to highlight the corresponding items
    card.addEventListener('mouseenter', e => {
      const cardInfoMap = this.get('cardInfoMap');
      if (!cardInfoMap) return;
      const graph = this.get('graph');
      const item = graph.findById(itemId);
      if (item) {
        const itemHighlightState = this.get('itemHighlightState')
        graph.setItemState(item, itemHighlightState, true);
      }
      const { link } = cardInfoMap[itemId];
      if (link) {
        const linkHighlightStyle = this.get('linkHighlightStyle') || {};
        link.attr(linkHighlightStyle);
      }
    })
    card.addEventListener('mouseleave', e => {
      const cardInfoMap = this.get('cardInfoMap');
      if (!cardInfoMap) return;
      const graph = this.get('graph');
      const item = graph.findById(itemId);
      if (item) {
        const itemHighlightState = this.get('itemHighlightState')
        graph.setItemState(item, itemHighlightState, false);
      }

      const { link } = cardInfoMap[itemId];
      if (link) {
        const linkHighlightStyle = this.get('linkHighlightStyle') || {};
        Object.keys(linkHighlightStyle).forEach(key => {
          link.attr(key, undefined);
          link.attr(key, undefined);
        });
        const linkStyle = this.get('linkStyle');
        link.attr(linkStyle);
      }
    })
    card.addEventListener('click', e => {
      const { onClickIcon } = this.get('cardCfg') || {};
      if (e.target.className === 'g6-annotation-collapse' || e.target.className === 'g6-annotation-expand') {
        // collapse & expand
        const { collapseType } = this.get('cardCfg');
        if (collapseType === 'hide') {
          this.hideCard(itemId);
        } else {
          this.handleExpandCollapseCard(itemId);
        }
        onClickIcon?.(e, itemId, e.target.className === 'g6-annotation-collapse' ? 'collapse' : 'expand')
      } else if (e.target.className === 'g6-annotation-close') {
        // close
        const { closeType } = this.get('cardCfg');
        if (closeType === 'remove') {
          this.removeCard(itemId);
        } else {
          this.hideCard(itemId);
        }
        onClickIcon?.(e, itemId, 'close')
      }
    });
    // dblclick to edit the title and content text
    const editable = this.get('editable');
    if (editable) {
      card.addEventListener('dblclick', e => {
        const cardInfoMap = this.get('cardInfoMap');
        const { maxTitleLength = 20 } = this.get('cardCfg') || {};
        if (!cardInfoMap) return;
        const target = e.target;
        const targetClass = target.className;
        if (targetClass !== 'g6-annotation-title' && targetClass !== 'g6-annotation-content') return;
        const { width, height } = targetClass === 'g6-annotation-title' ? target.getBoundingClientRect() : target.parentNode.getBoundingClientRect();
        const computeStyle = getComputedStyle(target);
        const inputTag = targetClass === 'g6-annotation-title' ? 'input' : 'textarea';
        const input = createDom(`<${inputTag} class="${targetClass}-input" type="textarea" style="width:${width}px; height: ${height}px; min-width: 16px;"/>`);
        const inputWrapper = createDom(`<div class="${targetClass}-input-wrapper" style="width: ${width}px; height: ${height}px; min-width: 16px; margin-right: ${computeStyle['marginRight']}" />`);
        inputWrapper.appendChild(input);
        target.parentNode.replaceChild(inputWrapper, target);
        if (targetClass === 'g6-annotation-title') {
          input.name = 'title';
          input.maxLength = maxTitleLength;
        } else {
          input.name = 'content';
        }
        input.innerHTML = target.innerHTML;
        input.value = target.innerHTML;
        input.focus();
        const cardInfo = cardInfoMap[itemId];
        input.addEventListener('blur', blurEvt => {
          if (input.value) {
            target.innerHTML = input.value;
            cardInfo[input.name || 'title'] = input.value;
          }
          inputWrapper.parentNode.replaceChild(target, inputWrapper);
          this.updateCardSize(itemId);

          const onAnnotationChange = this.get('onAnnotationChange');
          onAnnotationChange?.(cardInfo, 'update');
        });
      });
    }
    const unmovableClasses = ['g6-annotation-title', 'g6-annotation-content', 'g6-annotation-title-input', 'g6-annotation-content-input']
    card.draggable = true
    card.addEventListener('dragstart', e => {
      const targetClass = e.target.className;
      if (unmovableClasses.includes(targetClass)) return;
      const { style } = card;
      this.set('dragging', {
        card,
        x: e.clientX,
        y: e.clientY,
        left: px2Num(style.left),
        top: px2Num(style.top)
      });
    });
    card.addEventListener('drag', e => {
      e.preventDefault();
      const cardInfoMap = this.get('cardInfoMap');
      if (!cardInfoMap) return;
      const { clientX, clientY } = e;
      const dragging = this.get('dragging');
      if (isNaN(clientX) || isNaN(clientY) || !dragging) return;
      let { x, y, left, top, card: draggingCard } = dragging;
      const dx = clientX - x;
      const dy = clientY - y;
      left += dx;
      top += dy;
      const graph = this.get('graph');
      const graphLeftTopCanvas = graph.getPointByCanvas(0, 0);
      const graphRightBottomCanvas = graph.getPointByCanvas(graph.getWidth(), graph.getHeight());
      const { x: graphLeft, y: graphTop } = graph.getClientByPoint(graphLeftTopCanvas.x, graphLeftTopCanvas.y);
      const { x: graphRight, y: graphBottom } = graph.getClientByPoint(graphRightBottomCanvas.x, graphRightBottomCanvas.y);
      const cardBBox = draggingCard.getBoundingClientRect();
      const cardWidth = cardBBox.right - cardBBox.left;
      const cardHeight = cardBBox.bottom - cardBBox.top;
      if ((left > (graphRight - graphLeft) - cardWidth && dx > 0) || (left < 0 && dx < 0)) left -= dx;
      if ((top > (graphBottom - graphTop) - cardHeight && dy > 0) || (top < 0 && dy < 0)) top -= dy;
      // 更新卡片位置
      modifyCSS(draggingCard, {
        left: `${left}px`,
        top: `${top}px`,
        visibility: 'hidden'
      });
      x = clientX;
      y = clientY;

      // 更新连线位置
      const { link } = cardInfoMap[itemId] || {};
      if (link) {
        const item = graph.findById(itemId);
        link.attr('path', getPathItem2Card(item, cardBBox, graph, this.get('canvas')));
      }
      this.set('dragging', { x, y, left, top, card: draggingCard });
    });
    const dragendListener = e => {
      const cardInfoMap = this.get('cardInfoMap');
      if (!cardInfoMap) return;
      const dragging = this.get('dragging');
      if (dragging) {
        // = dragend
        let { left, top, card: draggingCard } = dragging;
        cardInfoMap[itemId].x = left;
        cardInfoMap[itemId].y = top;
        modifyCSS(draggingCard, {
          visibility: 'visible'
        });
        this.set('dragging', false);

        // 移动过的卡片从 rows 中移除，避免影响后续卡片出生位置
        const rows = this.get("rows");
        rows?.forEach(rowItems => {
          for (let i = rowItems.length - 1; i >= 0; i--) {
            if (rowItems[i].id === itemId) rowItems.splice(i, 1);
          }
        })

        const onAnnotationChange = this.get('onAnnotationChange');
        onAnnotationChange?.(cardInfoMap[itemId], 'update');
      }
    }
    card.addEventListener('dragend', dragendListener);
  }

  public updateCardSize(id) {
    const cardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const { card } = cardInfoMap[id];
    const { width } = card.getBoundingClientRect();
    const title = card.getElementsByClassName('g6-annotation-title')[0];
    if (title) {
      const computeStyle = getComputedStyle(title);
      const sideMargin = px2Num(computeStyle['marginLeft']);
      const { width: titleWidth } = title.getBoundingClientRect();
      modifyCSS(title, {
        marginRight: `${width - sideMargin - 24 - 16 - titleWidth}px`
      })
    }
  }

  public updateLink({ item }) {
    if (!item) return;
    const cardInfoMap: CardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const canvas = this.get('canvas');
    const graph = this.get('graph');
    const id = item.getID();
    const { link, card } = cardInfoMap[id] || {};
    if (link) {
      const path = getPathItem2Card(item, card.getBoundingClientRect(), graph, canvas);
      link.attr('path', path)
    }
  }

  public updateLinks() {
    if (this.destroyed) return;
    const cardInfoMap: CardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const graph = this.get('graph');
    Object.values(cardInfoMap).forEach(cardInfo => {
      const { id } = cardInfo;
      const item = graph.findById(id);
      this.updateLink({ item });
    })
  }

  public onGraphDataChange() {
    const cardInfoMap: CardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const graph = this.get('graph');
    Object.values(cardInfoMap).forEach(info => {
      const { id, card, isCanvas } = info;
      if (isCanvas || card.style.display === 'none') return;
      const item = graph.findById(id);
      if (item && item.isVisible()) {
        this.toggleAnnotation(item);
      } else {
        this.hideCard(id);
      }
    })
  }

  public onGraphItemVisibilityChange({ item, visible }) {
    if (!item || item.destroyed) return;
    const cardInfoMap: CardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const id = item.getID();
    if (!cardInfoMap[id]) return;
    if (!visible) this.hideCard(id);
  }

  public saveData(saveClosed = false) {
    const cardInfoMap: CardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const graph = this.get('graph');
    const getTitle = this.get('getTitle');
    const getContent = this.get('getContent');
    const data = [];
    Object.values(cardInfoMap).forEach(info => {
      const { title, content, x, y, id, collapsed, card } = info;
      if (card.style.display === 'none' && !saveClosed) return;
      const item = graph.findById(id) || graph.get('canvas');
      data.push({
        id,
        x,
        y,
        collapsed,
        title: title || getTitle?.(item),
        content: content || getContent?.(item),
        visible: card.style.display !== 'none'
      })
    });
    return data;
  }

  public readData(data) {
    const graph = this.get('graph');
    data.forEach(info => {
      const { id, x, y, title, content, collapsed, visible } = info;
      const item = graph.findById(id) || graph.get('canvas');
      this.toggleAnnotation(item, { x, y, title, content, collapsed });
      if (!visible) this.hideCard(id);
    })
  }

  /**
   * Clear the cards and links
   */
  public clear() {
    const cardInfoMap: CardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const container = this.get('container');
    Object.values(cardInfoMap).forEach(cardInfo => {
      const { card, link } = cardInfo;
      container.removeChild(card);
      link?.remove(true);
    });
    this.set('cardInfoMap', {});
  }

  /**
   * Destroy the component
   */
  public destroy() {
    this.clear();
    this.get('canvas')?.destroy();
    const graph = this.get('graph');
    if (!graph || graph.destroyed) return;
    if (this.get('containerCfg')) {
      graph.getContainer().removeChild(this.get('container'));
    }
    this.destroyed = true;
  }
}

const getPath = (startPoints, endPoints) => {
  let startPoint, endPoint, posKeys, distance = Infinity;
  Object.keys(startPoints).forEach(skey => {
    const spos = startPoints[skey];
    Object.keys(endPoints).forEach(ekey => {
      const epos = endPoints[ekey];
      const xdist = spos.x - epos.x;
      const ydist = spos.y - epos.y;
      const dist = xdist * xdist + ydist * ydist;
      if (distance > dist) {
        distance = dist;
        startPoint = spos;
        endPoint = epos;
        posKeys = [skey, ekey];
      }
    });
  });
  const curveOffset = 20;
  const controlPoint = Util.getControlPoint(startPoint, endPoint, 0.5, curveOffset);
  return [
    ['M', startPoint.x, startPoint.y],
    ['Q', controlPoint.x, controlPoint.y, endPoint.x, endPoint.y],
  ]
}

const getPathItem2Card = (item, cardBBox, graph, annotationCanvas) => {
  let itemLinkPoints;
  const itemType = item.getType();
  if (itemType === 'edge') {
    itemLinkPoints = [item.getKeyShape().getPoint(0.5)];
  } else {
    let { minX, minY, maxX, maxY } = item.getKeyShape?.().getBBox();
    const { x, y } = item.getModel();
    minX += x;
    minY += y;
    maxX += x;
    maxY += y;
    itemLinkPoints = {
      left: { x: minX, y: (minY + maxY) / 2 },
      right: { x: maxX, y: (minY + maxY) / 2 },
      top: { x: (minX + maxX) / 2, y: minY },
      bottom: { x: (minX + maxX) / 2, y: maxY },
    }
  }

  // 由 graph 所在 canvas 转换为 Client 坐标系，然后再由 annotation 所在 canvas 转换为绘制坐标系
  Object.keys(itemLinkPoints).forEach(key => {
    const { x, y } = itemLinkPoints[key];
    const clientPos = graph.getClientByPoint(x, y);
    itemLinkPoints[key] = annotationCanvas.getPointByClient(clientPos.x, clientPos.y);
  });

  const { top: cardTop = 0, left: cardLeft = 0, right: cardRight = 0, bottom: cardBottom = 0 } = cardBBox;
  const cardLinkPoints = {
    left: annotationCanvas.getPointByClient(cardLeft, (cardTop + cardBottom) / 2),
    right: annotationCanvas.getPointByClient(cardRight, (cardTop + cardBottom) / 2),
    top: annotationCanvas.getPointByClient((cardLeft + cardRight) / 2, cardTop),
    bottom: annotationCanvas.getPointByClient((cardLeft + cardRight) / 2, cardBottom),
  };
  return getPath(itemLinkPoints, cardLinkPoints);
}

const px2Num = px => Number(px.replace(/\s+|px/gi, "")) || 0;