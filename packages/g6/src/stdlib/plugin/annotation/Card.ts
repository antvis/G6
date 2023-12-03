import { createDOM, isNumber, modifyCSS } from '@antv/util';
import { Canvas, Group, Path, PathStyleProps } from '@antv/g';
import { sleep } from '../../../util/promise';
import Item from '../../../item/item';
import type { EditPosition } from './types';
import { getPathItem2Card } from './util';
import type { Annotation } from './index';

export interface CardConfig {
  /** The ID of the card is generally equal to item. getID(), where item represents node, etc. */
  id?: string;
  /** The width of the card */
  width?: number | 'fit-content';
  /** The height of the card */
  height?: number | 'fit-content';
  /** The minWidth of the card */
  minWidth?: number | string;
  /** The minHeight of the card */
  minHeight?: number | string;
  /** The maxWidth of the card */
  maxWidth?: number;
  /** The maxHeight of the card */
  maxHeight?: number;
  /** Whether the card is initially visible, default to true */
  visible?: boolean;
  /** Does the card initially collapse, default to false */
  collapsed?: boolean;
  editable?: boolean;
  /** Specify the location and viewport coordinate system Only effective if there is no containerCfg */
  x?: number;
  y?: number;
  /** Title of the card */
  title?: string;
  /** Content of the card */
  content?: string;
  /** border-radius style of card, default to 2 */
  borderRadius?: number;
  /** The maximum length of the title, default to 20 */
  maxTitleLength?: number;
  /**
   * How to handle when clicking the collapse button(-)
   *
   * ```minimize```: will collapse the card, default.
   *
   * ```hide```: hide the card, set display: none
   */
  collapseType?: 'minimize' | 'hide';
  /**
   * How to handle when clicking the close button(x)
   * ```hide```: hide the card, set display: none, default;
   * ```remove```: destroy the card, which will remove the dom and related events;
   */
  closeType?: 'hide' | 'remove';
  /**
   * Specify the starting position of the card. The default position will be in the upper right corner of the container, and multiple cards will be arranged downwards in sequence
   */
  defaultBegin?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };
  /**
   * Hover event for close button and collapse button
   * @param evt
   * @param id
   * @param type
   * @returns
   */
  onMouseEnterIcon?: (
    evt: MouseEvent,
    id: string,
    type: 'expand' | 'collapse' | 'close',
  ) => void;
  /**
   * Hover event for close button and collapse button
   * @param evt
   * @param id
   * @param type
   * @returns
   */
  onMouseLeaveIcon?: (
    evt: MouseEvent,
    id: string,
    type: 'expand' | 'collapse' | 'close',
  ) => void;
  /**
   * Click event for close button and collapse button
   * @param evt
   * @param id
   * @param type
   * @returns
   */
  onClickIcon?(
    evt: MouseEvent,
    id: string,
    type: 'expand' | 'collapse' | 'close',
  ): void;
  titlePlaceholder?: string;
  contentPlaceholder?: string;
  /**
   * When creating a card, do you enter editing mode and focus on the card
   * ```title```: Edit and focus on the title area;
   * ```content```: Edit and focus on the content area;
   * ```true```: Switch all areas to edit mode and focus on the title area;
   * ```false```: Will not enter editing mode and requires manual operation, default;
   */
  focusEditOnInit?: boolean | EditPosition;
}

export default class Card {
  $el: HTMLElement;
  get $headerBtns() {
    return this.$el.querySelector('.g6-annotation-header-btns');
  }
  link?: Path;
  get item(): Item | undefined {
    return this.plugin.graph.itemController.getItemById(this.config.id);
  }
  get isCanvas() {
    const item = this.plugin.graph.itemController.getItemById(this.config.id);
    return item?.isCanvas?.();
  }
  get container() {
    return this.plugin.container;
  }
  config: CardConfig;
  plugin: Annotation;
  constructor(plugin: Annotation, config: CardConfig) {
    this.config = { ...config };
    this.plugin = plugin;
    this.renderCard();

    let x, y;
    if (!plugin.options.containerCfg) {
      const containerBBox = this.container.getBoundingClientRect();
      if (config.x !== undefined && config.y !== undefined) {
        // 使用配置的位置
        x = config.x;
        y = config.y;
      } else if (!this.isCanvas) {
        // 无 conatiner，初始化位置
        const { top: containerTop } = containerBBox;
        const {
          left: beginLeft,
          right: propsBeginRight = 16,
          top: propsBeginTop = 8,
          bottom: beginBottom,
        } = config.defaultBegin || {};
        let beginRight = propsBeginRight;
        let beginTop = propsBeginTop;
        if (isNumber(beginLeft) && !Number.isNaN(beginLeft)) {
          beginRight = this.container.scrollWidth - beginLeft;
        }
        if (isNumber(beginBottom) && !Number.isNaN(beginBottom)) {
          beginTop = this.container.scrollHeight - beginBottom;
        }
        const cardWidth = isNumber(config.minWidth) ? config.minWidth : 100;
        const rows = plugin.options.rows || [[]];
        x =
          this.container.scrollWidth -
          this.$el.scrollWidth -
          (rows.length - 1) * cardWidth -
          beginRight;
        const currentRow = rows[rows.length - 1];
        const { bbox: lastCardBBox } = currentRow[currentRow.length - 1] || {};
        y = lastCardBBox?.bottom - containerTop || beginTop;
      }
      this.move(x, y);
    }

    this.updateLink()

    this.bindEvents();

    this.collapse(config.collapsed);

    if (!config.visible) {
      this.hide();
    }

    // init edit
    this.setEditable();
    if (this.config.editable) {
      if (this.config.focusEditOnInit === true) {
        this.edit('title')?.focus();
        this.edit('content');
      } else if (this.config.focusEditOnInit) {
        this.edit(this.config.focusEditOnInit)?.focus();
      }
    }
  }
  renderCard() {
    const {
      collapsed,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      width,
      height,
      title = '',
      content = '',
    } = this.config;

    const wrapper = (this.$el = document.createElement('div'));
    wrapper.setAttribute('class', 'g6-annotation-wrapper');
    wrapper.setAttribute('style', `max-width: ${maxWidth}px`);

    const headerWrapper = document.createElement('div');
    headerWrapper.setAttribute('class', 'g6-annotation-header-wrapper');

    const titleEl = this.renderTitle({ title });

    const headerBtns = document.createElement('div');
    headerBtns.setAttribute('class', 'g6-annotation-header-btns');
    headerWrapper.append(titleEl, headerBtns);

    const contentWrapper = this.renderContent({ content });

    wrapper.append(headerWrapper);
    contentWrapper && wrapper.append(contentWrapper);

    const minHeightPx = isNumber(minHeight) ? `${minHeight}px` : minHeight;
    const maxHeightPx = isNumber(maxHeight) ? `${maxHeight}px` : maxHeight;
    modifyCSS(wrapper, {
      minWidth: isNumber(minWidth) ? `${minWidth}px` : minWidth,
      minHeight: collapsed ? 'unset' : minHeightPx,
      maxWidth: isNumber(maxWidth) ? `${maxWidth}px` : maxWidth,
      maxHeight: collapsed ? 'unset' : maxHeightPx,
      width: isNumber(width) ? width + 'px' : width,
      height: isNumber(height) ? height + 'px' : height,
    });

    this.container.append(wrapper);
  }

  renderTitle({
    title,
    wrapper,
  }: {
    title?: string | HTMLElement;
    wrapper?: HTMLElement;
  }) {
    const titleEl = wrapper ? wrapper : document.createElement('h4');
    titleEl.setAttribute('class', 'g6-annotation-title');
    titleEl.setAttribute('tabindex', '0');
    titleEl.append(title);
    return titleEl;
  }

  renderContent({
    content,
    wrapper,
  }: {
    content?: string | HTMLElement;
    wrapper?: HTMLElement;
  }) {
    const contentWrapper = wrapper ? wrapper : document.createElement('div');
    contentWrapper.setAttribute('class', 'g6-annotation-content');
    contentWrapper.setAttribute('tabindex', '0');
    contentWrapper.append(content);
    return contentWrapper;
  }

  bindEvents() {
    const { plugin, $el: card, config } = this;
    const itemId = config.id;
    card.addEventListener('mousemove', (e) => {
      // icon 的鼠标进入监听，方便外部加 tooltip
      const iconType = getIconTypeByEl(e.target as HTMLElement);
      if (iconType) {
        plugin.options.cardCfg?.onMouseEnterIcon?.(e, itemId, iconType);
      }
    });
    card.addEventListener('mouseout', (e) => {
      // icon 的鼠标移出监听，方便外部加 tooltip
      const iconType = getIconTypeByEl(e.target as HTMLElement);
      if (iconType) {
        plugin.options.cardCfg?.onMouseLeaveIcon?.(e, itemId, iconType);
      }
    });
    // mouseenter and mouseleave to highlight the corresponding items
    card.addEventListener('mouseenter', (e) => {
      plugin.focusCard(itemId);
    });
    card.addEventListener('mouseleave', (e) => {
      plugin.blurCard(itemId);
    });
    card.addEventListener('focusin', e => {
      plugin.focusCard(itemId)
    })
    card.addEventListener('focusout', e => {
      plugin.blurCard(itemId)
    })
    card.addEventListener('click', (e) => {
      const { onClickIcon } = plugin.options.cardCfg || {};
      const target = e.target as HTMLElement;
      if (
        target.className === 'g6-annotation-collapse' ||
        target.className === 'g6-annotation-expand'
      ) {
        // collapse & expand
        this.collapse(!this.config.collapsed);
        onClickIcon?.(
          e,
          itemId,
          target.className === 'g6-annotation-collapse' ? 'collapse' : 'expand',
        );
      } else if (target.className === 'g6-annotation-close') {
        // close
        const { closeType } = plugin.options.cardCfg || {};
        if (closeType === 'remove') {
          plugin.removeCard(itemId);
        } else {
          plugin.hideCard(itemId);
        }
        onClickIcon?.(e, itemId, 'close');
      }
    });

    // dblclick to edit the title and content text
    card.addEventListener('dblclick', (e) => {
      if (!this.config.editable) return;
      const editPosition = getPositionByEl(e.target as HTMLElement);
      if (editPosition) {
        this.edit(getPositionByEl(e.target as HTMLElement))?.focus();
      }
    });
    card.addEventListener('keydown', async (e) => {
      if (!this.config.editable) return;
      if (e.code !== 'Enter') return;

      const editPosition = getPositionByEl(e.target as HTMLElement);
      if (!editPosition) return;

      // 延迟聚焦，防止textarea末尾出现一个多余的换行
      if (editPosition === 'content') {
        await sleep(50);
      }
      this.edit(editPosition)?.focus();
    });

    const unmovableClasses = [
      'g6-annotation-title',
      'g6-annotation-content',
      'g6-annotation-title-input',
      'g6-annotation-content-input',
    ];
    card.addEventListener('mousedown', (e) => {
      const target = e.target as HTMLElement;

      if (unmovableClasses.includes(target.className)) return;

      const bbox = card.getBoundingClientRect();
      const shiftX = e.clientX - bbox.left + (bbox.left - card.offsetLeft);
      const shiftY = e.clientY - bbox.top + (bbox.top - card.offsetTop);

      card.classList.add('g6-annotation-wrapper-move');
      let registerMove = false;
      const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
        if (registerMove) return;
        registerMove = true;
        requestAnimationFrame(() => {
          registerMove = false;
          const containerBBox = plugin.graph.container.getBoundingClientRect();
          let left = clientX - shiftX,
            top = clientY - shiftY;

          if (left > containerBBox.width - bbox.width) {
            left = containerBBox.width - bbox.width;
          }
          if (left < 0) {
            left = 0;
          }

          if (top > containerBBox.height - bbox.height) {
            top = containerBBox.height - bbox.height;
          }
          if (top < 0) {
            top = 0;
          }
          this.move(left, top);
          plugin.dragging = { x: clientX, y: clientY, left, top, card };
        });
      };

      document.addEventListener('mousemove', onMouseMove);

      document.addEventListener(
        'mouseup',
        (e) => {
          document.removeEventListener('mousemove', onMouseMove);
          card.classList.remove('g6-annotation-wrapper-move');

          const dragging = plugin.dragging;
          if (!dragging) return;
          const { left, top, card: draggingCard } = dragging;
          this.config.x = left;
          this.config.y = top;
          modifyCSS(draggingCard, {
            visibility: 'visible',
          });
          plugin.dragging = undefined;

          // 移动过的卡片从 rows 中移除，避免影响后续卡片出生位置
          const rows = plugin.options.rows || [[]];
          rows?.forEach((rowItems) => {
            for (let i = rowItems.length - 1; i >= 0; i--) {
              if (rowItems[i].id === itemId) rowItems.splice(i, 1);
            }
          });

          plugin.options.onAnnotationChange?.(this, 'update');
        },
        { once: true },
      );
    });
  }

  /**
   * 更新相关连线
   */
  updateLink() {
    const { plugin, isCanvas, item, $el } = this
    let { link } = this
    if (isCanvas) {
      return;
    }

    if (!item) {
      link?.hide();
      return;
    }

    const cardBBox = $el.getBoundingClientRect();
    const path = getPathItem2Card(
      item,
      cardBBox,
      plugin.graph,
      plugin.options.canvas,
    );
    if (link) {
      link.attr('path', path);
    } else {
      link = this.link = plugin.options.linkGroup.appendChild(
        new Path({
          attrs: {
            lineWidth: 1,
            lineDash: [5, 5],
            stroke: '#ccc',
            path,
            ...plugin.options.linkStyle,
          },
        }),
      );
    }
    if (!link.isVisible()) {
      link.show();
    }
  }

  show() {
    this.$el.classList.remove('g6-annotation-wrapper-hide');
    this.updateLink();
    this.config.visible = true;
  }

  hide() {
    this.$el.classList.add('g6-annotation-wrapper-hide');
    this.link?.hide();
    this.config.visible = false;
  }

  collapse(collapsed = true) {
    const { collapseType, maxHeight, minHeight, visible } = this.config;
    this.config.collapsed = collapsed;

    const classList = this.$el.classList;

    if (collapseType === 'hide') {
      collapsed ? this.hide() : this.show();
      classList.remove('g6-annotation-wrapper-collapsed');
      return;
    }

    collapsed
      ? classList.add('g6-annotation-wrapper-collapsed')
      : classList.remove('g6-annotation-wrapper-collapsed');
    this.$headerBtns.innerHTML = `${
      collapsed
        ? `<p class='g6-annotation-expand'>+</p>`
        : `<p class='g6-annotation-collapse'>-</p>`
    }<p class='g6-annotation-close'>x</p>`;

    const minHeightPx = isNumber(minHeight) ? `${minHeight}px` : minHeight;
    const maxHeightPx = isNumber(maxHeight) ? `${maxHeight}px` : maxHeight;
    modifyCSS(this.$el, {
      minHeight: collapsed ? 'unset' : minHeightPx,
      maxHeight: collapsed ? 'unset' : maxHeightPx,
    });
  }

  move(x: number, y: number) {
    const card = this.$el;
    modifyCSS(card, {
      left: `${x}px`,
      top: `${y}px`,
    });

    // Update the position of the link
    this.updateLink();
  }

  setEditable(editable = this.plugin.options.editable) {
    const card = this.$el;
    const classList = card.classList;
    const className = 'g6-annotation-wrapper-editable';

    if (editable) {
      classList.add(className);
    } else {
      classList.remove(className);
    }
    this.config.editable = editable;
  }

  edit(
    position: EditPosition,
    options?: { value?: any },
  ): HTMLElement | undefined {
    const { plugin } = this;
    const target = this.getElByPosition(position);
    if (!target) return;

    const { maxTitleLength } = this.config;

    const targetClass = target.className;
    const { width, height } = target.getBoundingClientRect();
    const inputTag = position === 'title' ? 'input' : 'textarea';
    const input = createDOM(
      `<${inputTag} class="${targetClass}-input g6-annotation-input" />`,
    ) as HTMLInputElement;
    const inputWrapper = createDOM(
      `<div class="${targetClass}-input-wrapper"/>`,
    );
    inputWrapper.appendChild(input);
    target.parentNode?.replaceChild(inputWrapper, target);
    const value = options?.value ?? this.config[position];
    if (position === 'title') {
      if (maxTitleLength !== undefined && maxTitleLength !== null) {
        input.maxLength = maxTitleLength;
      }
    }
    input.setAttribute('data-annotation-id', position);
    input.value = value ?? '';
    if (input.nodeName.toLowerCase() === 'textarea') {
      input.innerHTML = value ?? '';
    }
    input.placeholder = this.config[position + 'Placeholder'];

    input.addEventListener('keydown', (e) => {
      const { code, shiftKey } = e;
      if (code !== 'Enter') return;
      if (position === 'title') {
        exitEditEvent(true);
      } else if (!shiftKey) {
        exitEditEvent(true);
      }
    });
    input.addEventListener('blur', () => exitEditEvent());

    // 如果多个事件同时触发exitEdit（如keydown和blur），isExit防止exitEdit重复执行
    let isExit = false;
    const exitEditEvent = async (autoFocus = false) => {
      if (isExit || !target) return;
      isExit = true;

      const newEl = this.exitEdit(position);

      if (autoFocus) {
        newEl.focus();
      }
      plugin.options.onAnnotationChange?.(this, 'update');
    };

    return input;
  }

  getElByPosition(position: EditPosition): HTMLElement | null {
    if (position === 'title') {
      return this.$el.querySelector('.g6-annotation-title');
    } else if (position === 'content') {
      return this.$el.querySelector('.g6-annotation-content');
    }
    return null;
  }

  exitEdit(position: EditPosition) {
    const inputEl = this.$el.querySelector<
      HTMLInputElement | HTMLTextAreaElement | null
    >(`[data-annotation-id=${position}]`);
    if (!inputEl) return;

    const value = (this.config[position] = inputEl.value);
    const inputWrapper = inputEl.parentNode;
    let newEl: HTMLElement;
    if (position === 'title') {
      newEl = this.renderTitle({ title: value });
    } else if (position === 'content') {
      newEl = this.renderContent({ content: value });
    }

    inputWrapper.parentNode.replaceChild(newEl, inputWrapper);
    return newEl;
  }

  focus() {
    const { item, link } = this;
    const { itemHighlightState, linkHighlightStyle } = this.plugin.options;
    if (item && itemHighlightState) {
      this.plugin.graph.setItemState(item.getID(), itemHighlightState, true);
    }
    if (link && linkHighlightStyle) {
      link.attr(linkHighlightStyle);
    }
  }

  blur() {
    const { item, link } = this;
    const { itemHighlightState, linkHighlightStyle, linkStyle } =
      this.plugin.options;
    if (item && itemHighlightState) {
      this.plugin.graph.setItemState(item.getID(), itemHighlightState, false);
    }
    if (link && linkHighlightStyle) {
      link.attr(linkHighlightStyle);
    }

    if (link) {
      Object.keys(linkHighlightStyle || {}).forEach((key) => {
        link.removeAttribute(key as keyof PathStyleProps);
      });
      link.attr(linkStyle);
    }
  }

  destroy() {
    this.$el.remove();
    this.link?.remove();
  }
}

function getIconTypeByEl(target?: HTMLElement) {
  if (!target) return;
  const { classList } = target;
  if (classList?.contains('g6-annotation-collapse')) {
    return 'collapse';
  } else if (classList?.contains('g6-annotation-expand')) {
    return 'expand';
  } else if (classList?.contains('g6-annotation-close')) {
    return 'close';
  }
}

function getPositionByEl(el?: HTMLElement): EditPosition | undefined {
  const styleList = ['g6-annotation-title', 'g6-annotation-content'];
  const editArea = el?.closest(styleList.map((style) => '.' + style).join(','));
  if (!editArea) return;

  if (editArea.classList.contains(styleList[0])) {
    return 'title';
  } else {
    return 'content';
  }
}
