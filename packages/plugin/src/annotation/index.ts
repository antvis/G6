import { isNumber } from '@antv/util';
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
    border-radius: 5px;
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
  }
  .g6-annotation-title-input-wrapper {
    margin: 4px 40px 4px 8px;
  }
  .g6-annotation-content-input-wrapper {
    margin: 8px;
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
  editable?: boolean, // TODO
  itemHighlightState?: string,
  defaultData?: CardCfg[],
  cardCfg?: CardCfg,
  linkStyle?: ShapeStyle,
  linkHighlightStyle?: ShapeStyle,
  getTitle?: (item) => string | HTMLDivElement,
  getContent?: (item) => string | HTMLDivElement
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
}

interface CardInfoMap {
  [id: string]: CardCfg & {
    card: HTMLDivElement,
    link: IShape,
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
        height: 'fit-content'
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
    const { collapsed, title = '', content = '' } = cfg;
    const collapseExpandDOM = collapsed ?
      `<p class='g6-annotation-expand'>+</p>` :
      `<p class='g6-annotation-collapse'>-</p>`;
    const contentDOM = collapsed ? '' : ` <p class='g6-annotation-content'>${content}</p>`;

    return `<div class="g6-annotation-wrapper">
        <div
          class="g6-annotation-header-wapper"
          style="border-radius: ${collapsed ? '5px' : '5px 5px 0 0'};"
        >
          <h4 class='g6-annotation-title'>${title}</h4>
          ${collapseExpandDOM}
          <p class='g6-annotation-close'>x</p>
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
    const { top, left } = graph.get('canvas').get('el').getBoundingClientRect();
    const graphTop = graphCantainer.offsetTop;
    const graphLeft = graphCantainer.offsetLeft;
    modifyCSS(linkCanvas.get('el'), {
      position: 'absolute',
      top: 0,
      left: 0,
      // top: `${top}px`,
      // left: `${left}px`,
      pointerEvents: 'none'
    })
    window.addEventListener('resize', this.resizeCanvas);

    const linkGroup = linkCanvas.addGroup({ id: 'annotation-link-group' });
    self.set('linkGroup', linkGroup);
    self.set('canvas', linkCanvas);

    if (!self.get('getTitle')) {
      self.set('getTitle', (item) => {
        const { label, id } = item?.getModel() || {};
        return label || id || '-';
      });
    }
    if (!self.get('getContent')) {
      self.set('getContent', (item) => {
        if (!item) return '-';
        const { label, id } = item.getModel();
        return `${item.getType()}: ${label || id || ''}`;
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

  private resizeCanvas(e) {
    if (this.destroyed) return;
    const cBBox = this.get('container').getBoundingClientRect();
    this.get('canvas').changeSize(
      cBBox.right - cBBox.left,
      cBBox.bottom - cBBox.top
    )
  }

  public showAnnotation(evt) {
    if (this.destroyed) return;
    const { item } = evt;
    this.toggleAnnotation(item);
  }

  public hideCard(evt) {
    if (this.destroyed) return;
    const { item } = evt;
    this.closeCard(item.getID());
  }

  public closeCards() {
    const self = this;
    if (self.destroyed) return;
    const graph = self.get('graph');
    const cardInfoMap = self.get('cardInfoMap') || {};
    Object.keys(cardInfoMap).forEach((itemId) => {
      const item = graph.findById(itemId);
      if (item) self.hideCard({ item });
    })
  }

  public toggleAnnotation(item, cfg: CardCfg = {}) {
    const self = this;
    if (self.destroyed) return;
    const cardInfoMap = self.get('cardInfoMap') || {};
    const graph = self.get('graph');
    const container = self.get('container');
    const containerCfg = self.get('containerCfg')
    const {
      minHeight,
      minWidth,
      width,
      height,
      collapsed = false,
      x: propsX,
      y: propsY,
      title: propsTitle,
      content: propsContent
    } = Object.assign({}, self.get('cardCfg') || {}, cfg);
    const linkGroup = self.get('linkGroup');
    const rows = this.get('rows') || [[]];

    const itemId = item.getID();
    let { card, link, x, y, title, content } = cardInfoMap[itemId] || {};

    const getTitle = this.get('getTitle');
    const getContent = this.get('getContent');
    const newCard = createDom(this.getDOMContent({
      collapsed,
      title: title || propsTitle || getTitle?.(item),
      content: content || propsContent || getContent?.(item)
    }));
    const minHeightPx = isNumber(minHeight) ? `${minHeight}px` : minHeight
    modifyCSS(newCard, {
      minHeight: collapsed ? 'unset' : minHeightPx,
      minWidth: isNumber(minWidth) ? `${minWidth}px` : minWidth,
      height,
      width,
    });
    if (card) {
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
      } else if (!card) {
        // 第一次创建，且无 conatiner，初始化位置
        const { left: containerLeft = 0, width: containerWidth, top: containerTop } = containerBBox;
        const cardWidth = isNumber(minWidth) ? minWidth : 100;
        console.log('card pos', container.scrollWidth, containerWidth, newCard.scrollWidth, newCard.getBoundingClientRect().width, containerLeft);
        x = container.scrollWidth - newCard.scrollWidth - 16 - (rows.length - 1) * cardWidth;
        console.log('card pos', container.scrollWidth, containerWidth, newCard.scrollWidth, newCard.getBoundingClientRect().width, containerLeft, x);
        const currentRow = rows[rows.length - 1];
        const lastCardBBox = currentRow[currentRow.length - 1];
        y = ((lastCardBBox?.bottom - containerTop) || 0) + 8;
      }
      modifyCSS(newCard, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        cusor: containerCfg ? 'unset' : 'move',
      });
    }
    this.bindListener(newCard, itemId);

    // 创建相关连线
    const cardBBox = newCard.getBoundingClientRect()
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
    cardInfoMap[itemId] = {
      id: itemId,
      collapsed,
      card: newCard,
      link,
      x,
      y,
      cardBBox,
    };
    self.set('cardInfoMap', cardInfoMap);
    if (containerCfg) {
      this.updateCardPositionsInConatainer();
      this.updateLinks();
    } else if (!card) {
      // 没有 container、新增 card 时，记录当前列中最下方位置，方便换行
      const { bottom: containerBottom = 0 } = containerBBox;
      console.log('bottom', containerBottom, cardBBox);
      rows[rows.length - 1].push(cardBBox);
      if (cardBBox.bottom > containerBottom - 16) {
        rows.push([]);
      }
      this.set('rows', rows)
    }
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
    this.toggleAnnotation(item, { collapsed: !collapsed });
    cardInfoMap[id] = {
      ...cardInfoMap[id],
      collapsed: !collapsed
    }
  }

  public closeCard(id) {
    if (this.destroyed) return;
    const cardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const { card, link } = cardInfoMap[id];
    modifyCSS(card, { display: 'none' });
    link?.hide();
  }

  private bindListener(card, itemId) {
    if (this.destroyed) return;
    // mouseenter and mouseleave to highlight the corresponding items
    card.addEventListener('mouseenter', e => {
      const cardInfoMap = this.get('cardInfoMap');
      if (!cardInfoMap) return;
      const graph = this.get('graph');
      const itemHighlightState = this.get('itemHighlightState')
      const item = graph.findById(itemId);
      graph.setItemState(item, itemHighlightState, true);

      const { link } = cardInfoMap[itemId];
      const linkHighlightStyle = this.get('linkHighlightStyle') || {};
      link.attr(linkHighlightStyle);
    })
    card.addEventListener('mouseleave', e => {
      const cardInfoMap = this.get('cardInfoMap');
      if (!cardInfoMap) return;
      const graph = this.get('graph');
      const itemHighlightState = this.get('itemHighlightState')
      const item = graph.findById(itemId);
      graph.setItemState(item, itemHighlightState, false);

      const { link } = cardInfoMap[itemId];
      const linkHighlightStyle = this.get('linkHighlightStyle') || {};
      Object.keys(linkHighlightStyle).forEach(key => {
        link.attr(key, undefined);
        link.attr(key, undefined);
      });
      const linkStyle = this.get('linkStyle');
      link.attr(linkStyle);
    })
    card.addEventListener('click', e => {
      if (e.target.className === 'g6-annotation-collapse' || e.target.className === 'g6-annotation-expand') {
        // collapse & expand
        this.handleExpandCollapseCard(itemId);
      } else if (e.target.className === 'g6-annotation-close') {
        // close
        this.closeCard(itemId);
      }
    });
    // dblclick to edit the title and content text
    const editable = this.get('editable');
    if (editable) {
      card.addEventListener('dblclick', e => {
        const cardInfoMap = this.get('cardInfoMap');
        if (!cardInfoMap) return;
        const target = e.target;
        const targetClass = target.className;
        if (targetClass !== 'g6-annotation-title' && targetClass !== 'g6-annotation-content') return;
        const { width } = target.getBoundingClientRect();
        const computeStyle = getComputedStyle(target);
        const name = targetClass === 'g6-annotation-title' ? 'title' : 'content';
        const input = createDom(`<input class="${targetClass}-input" type="text" name="${name}" value="${target.innerHTML}" style="width: 100%;"/>`);
        const inputWrapper = createDom(`<div class="${targetClass}-input-wrapper" style="width: ${width}px; margin-right: ${computeStyle['marginRight']}" />`);
        inputWrapper.appendChild(input);
        target.parentNode.replaceChild(inputWrapper, target);
        input.focus();
        const cardInfo = cardInfoMap[itemId];
        input.addEventListener('blur', blurEvt => {
          if (input.value) {
            target.innerHTML = input.value;
            cardInfo[input.name || 'title'] = input.value;
          }
          inputWrapper.parentNode.replaceChild(target, inputWrapper);
          this.updateCardSize(itemId);
        });
      });
    }
    let mousedown = false;
    const unmovableClasses = ['g6-annotation-title', 'g6-annotation-content', 'g6-annotation-title-input', 'g6-annotation-content-input']
    card.addEventListener('mousedown', e => {
      const targetClass = e.target.className;
      if (unmovableClasses.includes(targetClass)) return;
      mousedown = true;
    });
    card.addEventListener('mousemove', e => {
      e.preventDefault();
      const cardInfoMap = this.get('cardInfoMap');
      if (!cardInfoMap) return;
      if (mousedown) {
        // == dragstart
        mousedown = false;
        const { style } = card;
        this.set('dragging', {
          card,
          x: e.clientX,
          y: e.clientY,
          left: px2Num(style.left),
          top: px2Num(style.top)
        });
      }
      const { clientX, clientY } = e;
      const dragging = this.get('dragging');
      if (dragging?.card !== card || isNaN(clientX) || isNaN(clientY)) return;
      let { x, y, left, top } = dragging;
      const dx = clientX - x;
      const dy = clientY - y;
      if (Math.abs(dx) > 100 || Math.abs(dy) > 100) return;
      left += dx;
      top += dy;
      const graph = this.get('graph');
      const graphContainerBBox = graph.getContainer().getBoundingClientRect();
      const cardBBox = card.getBoundingClientRect();
      const cardWidth = cardBBox.right - cardBBox.left;
      const cardHeight = cardBBox.bottom - cardBBox.top;
      if (left > graphContainerBBox.right - cardWidth) left -= dx;
      if (top > graphContainerBBox.bottom - cardHeight) top -= dy;
      // 更新卡片位置
      modifyCSS(card, {
        left: `${left}px`,
        top: `${top}px`,
      });
      x = clientX;
      y = clientY;

      // 更新连线位置
      const { link } = cardInfoMap[itemId] || {};
      if (link) {
        const item = graph.findById(itemId);
        link.attr('path', getPathItem2Card(item, cardBBox, graph, this.get('canvas')));
      }
      this.set('dragging', { x, y, left, top, card });
    });
    const dragendListener = e => {
      const cardInfoMap = this.get('cardInfoMap');
      if (!cardInfoMap) return;
      const dragging = this.get('dragging');
      mousedown = false;
      if (dragging) {
        // = dragend
        let { left, top } = dragging;
        cardInfoMap[itemId].x = left;
        cardInfoMap[itemId].y = top;
        this.set('dragging', false);
      }
    }
    card.addEventListener('mouseup', dragendListener);
    card.addEventListener('mouseleave', dragendListener);
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

  public updateLinks() {
    if (this.destroyed) return;
    const cardInfoMap: CardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) return;
    const graph = this.get('graph');
    const canvas = this.get('canvas');
    Object.values(cardInfoMap).forEach(cardInfo => {
      const { link, id, card } = cardInfo;
      const item = graph.findById(id);
      const path = getPathItem2Card(item, card.getBoundingClientRect(), graph, canvas);
      link.attr('path', path)
    })
  }

  public saveData(saveClosed = false) {
    const cardInfoMap: CardInfoMap = this.get('cardInfoMap');
    if (!cardInfoMap) [];
    const graph = this.get('graph');
    const getTitle = this.get('getTitle');
    const getContent = this.get('getContent');
    const data = [];
    Object.values(cardInfoMap).forEach(info => {
      const { title, content, x, y, id, collapsed, card } = info;
      if (card.style.display === 'none' && !saveClosed) return;
      const item = graph.findById(id);
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
      const item = graph.findById(id);
      this.toggleAnnotation(item, { x, y, title, content, collapsed });
      if (!visible) this.closeCard(id);
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
    window.removeEventListener('resize', this.resizeCanvas);
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