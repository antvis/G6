import { createDOM, isNumber, modifyCSS } from '@antv/util';
import { Canvas, Group, Path, PathStyleProps } from '@antv/g';
import { sleep } from '../../../util/promise';
import Item from '../../../item/item';
import { EditPosition } from './types';
import { getPathItem2Card } from './util';
import { Annotation } from './index';

export interface CardCfg {
    id?: string;
    width?: number | 'fit-content';
    height?: number | 'fit-content';
    minHeight?: number | string;
    minWidth?: number | string;
    visible?: boolean;
    collapsed?: boolean;
    // 指定位置，视口坐标系。仅在无 containerCfg 时生效
    x?: number;
    y?: number;
    title?: string;
    content?: string;
    borderRadius?: number;
    maxTitleLength?: number;
    maxWidth?: number;
    maxHeight?: number;
    collapseType?: 'minimize' | 'hide'; // 点击收起按钮(-)的响应，最小化、隐藏
    closeType?: 'hide' | 'remove'; // 点击关闭按钮(x)的相应，隐藏、移除
    defaultBegin?: {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }; // 一个个卡片出生的起始位置，后续卡片会往后排列
    onMouseEnterIcon?: (
      evt: any,
      id: string,
      type: 'expand' | 'collapse' | 'close',
    ) => void;
    onMouseLeaveIcon?: (
      evt: any,
      id: string,
      type: 'expand' | 'collapse' | 'close',
    ) => void;
    onClickIcon?: (
      evt: any,
      id: string,
      type: 'expand' | 'collapse' | 'close',
    ) => void;
    titlePlaceholder?: string;
    contentPlaceholder?: string;
    focusEditOnInit?: boolean | EditPosition; // new feature
  }

export default class Card {
    $el: HTMLElement;
    get $headerBtns() {
        return this.$el.querySelector('.g6-annotation-header-btns')
    }
    link?: Path;
    get item() {
        return this.plugin.graph.itemController.getItemById(this.cfg.id) as Item | undefined
    }
    get isCanvas() {
        const item = this.plugin.graph.itemController.getItemById(this.cfg.id);
        return item?.isCanvas?.()
    }
    get container() {
        return this.plugin._container;
    }
    cfg: CardCfg;
    plugin: Annotation;
    constructor(plugin: Annotation, cfg: CardCfg) {
        this.cfg = {...cfg};
        this.plugin = plugin;
        this.renderCard();

        const item = this.item;

        let x, y;
        if (!plugin.options.containerCfg) {
            const containerBBox = this.container.getBoundingClientRect();
            if (cfg.x !== undefined && cfg.y !== undefined) {
              // 使用配置的位置
              x = cfg.x;
              y = cfg.y;
            } else if (!this.isCanvas) {
              // 无 conatiner，初始化位置
              const { top: containerTop } = containerBBox;
              const {
                left: beginLeft,
                right: propsBeginRight = 16,
                top: propsBeginTop = 8,
                bottom: beginBottom,
              } = cfg.defaultBegin || {};
              let beginRight = propsBeginRight;
              let beginTop = propsBeginTop;
              if (isNumber(beginLeft) && !Number.isNaN(beginLeft)) {
                beginRight = this.container.scrollWidth - beginLeft;
              }
              if (isNumber(beginBottom) && !Number.isNaN(beginBottom)) {
                beginTop = this.container.scrollHeight - beginBottom;
              }
              const cardWidth = isNumber(cfg.minWidth) ? cfg.minWidth : 100;
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
            this.move(x, y)
          }

        if (!this.isCanvas) {
            // 创建相关连线
            const cardBBox = this.$el.getBoundingClientRect();
            const path = getPathItem2Card(item, cardBBox, plugin.graph, plugin.options.canvas);
            const linkStyle = plugin.options.linkStyle;
      
            this.link = plugin.options.linkGroup.appendChild(
              new Path({
                attrs: {
                  lineWidth: 1,
                  lineDash: [5, 5],
                  stroke: '#ccc',
                  path,
                  ...linkStyle,
                },
              }),
            );
        }

        this.bindEvents();
    }
    renderCard() {
        const {
            collapsed,
            maxWidth, maxHeight,
            minWidth, minHeight,
            width, height,
            title = '',
            content = '',
        } = this.cfg;

        const wrapper = this.$el = document.createElement('div');
        wrapper.setAttribute('class', 'g6-annotation-wrapper');
        wrapper.setAttribute(
            'style',
            `max-width: ${maxWidth}px`,
        );

        const headerWrapper = document.createElement('div');
        headerWrapper.setAttribute('class', 'g6-annotation-header-wapper');

        const titleEl = this.renderTitle({ title })

        const headerBtns = document.createElement('div');
        headerBtns.setAttribute('class', 'g6-annotation-header-btns');
        headerWrapper.append(titleEl, headerBtns);

        const contentWrapper = this.renderContent({ content })

        wrapper.append(headerWrapper);
        contentWrapper && wrapper.append(contentWrapper);

        const minHeightPx = isNumber(minHeight) ? `${minHeight}px` : minHeight;
        const maxHeightPx = isNumber(maxHeight) ? `${maxHeight}px` : maxHeight;
        modifyCSS(wrapper, {
            minWidth: isNumber(minWidth) ? `${minWidth}px` : minWidth,
            minHeight: collapsed ? 'unset' : minHeightPx,
            maxWidth: isNumber(maxWidth) ? `${maxWidth}px` : maxWidth,
            maxHeight: collapsed ? 'unset' : maxHeightPx,
            width: isNumber(width) ? (width + 'px') : width,
            height: isNumber(height) ? (height + 'px') : height,
        });

        this.container.append(wrapper)
        this.collapse(collapsed);
    }

    renderTitle({ title, wrapper }: { title?: string | HTMLElement, wrapper?: HTMLElement }) {
        const titleEl = wrapper ? wrapper : document.createElement('h4');
        titleEl.setAttribute('class', 'g6-annotation-title');
        titleEl.setAttribute('tabindex', '0');
        titleEl.append(title);
        return titleEl;
    }

    renderContent({ content, wrapper }: { content?: string | HTMLElement, wrapper?: HTMLElement }) {
        const contentWrapper = wrapper ? wrapper : document.createElement('div');
        contentWrapper.setAttribute('class', 'g6-annotation-content');
        contentWrapper.setAttribute('tabindex', '0');
        contentWrapper.append(content);
        return contentWrapper;
    }

    bindEvents() {
        const { plugin, $el: card, cfg } = this
        const itemId = this.cfg.id;
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
            plugin.focusCard(itemId)
        });
        card.addEventListener('mouseleave', (e) => {
            plugin.blurCard(itemId)
        });
        card.addEventListener('click', (e) => {
            const { onClickIcon } = plugin.options.cardCfg || {};
            const target = e.target as HTMLElement;
            if (
                target.className === 'g6-annotation-collapse' ||
                target.className === 'g6-annotation-expand'
            ) {
                // collapse & expand
                const { collapseType } = plugin.options.cardCfg || {};
                this.cfg.collapsed = !this.cfg.collapsed
                if (collapseType === 'hide') {
                    this.hide()
                } else {
                    this.collapse(this.cfg.collapsed)
                }
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
        const { editable, cardCfg } = plugin.options;
        if (editable) {
            card.addEventListener('dblclick', (e) => {
                const editPosition = getPositionByEl(e.target as HTMLElement)
                if (editPosition) {
                    this.edit(getPositionByEl(e.target as HTMLElement))?.focus();
                }
            });
            card.addEventListener('keydown', async (e) => {
                if (e.code !== 'Enter') return;

                const editPosition = getPositionByEl(e.target as HTMLElement)
                if (!editPosition) return;

                // 延迟聚焦，防止textarea末尾出现一个多余的换行
                if (editPosition === 'content') {
                    await sleep(50)
                }
                this.edit(editPosition)?.focus();
            });

            // init edit
            if (cardCfg?.focusEditOnInit === true) {
                this.edit('title')?.focus();
                this.edit('content');
            } else if (cardCfg?.focusEditOnInit) {
                this.edit(cardCfg?.focusEditOnInit)?.focus();
            }
        }

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
                    this.move(left, top)
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
                    this.cfg.x = left;
                    this.cfg.y = top;
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

                    plugin.options.onAnnotationChange?.(this.cfg, 'update');
                },
                { once: true },
            );
        });
    }

    show() {
        this.$el.classList.remove('g6-annotation-wrapper-hide')
        this.link?.show();
        this.cfg.visible = true
    }

    hide() {
        this.$el.classList.add('g6-annotation-wrapper-hide')
        this.link?.hide();
        this.cfg.visible = false
    }

    collapse(collapsed = true) {
        const classList = this.$el.classList
        collapsed ? classList.add('g6-annotation-wrapper-collapsed') : classList.remove('g6-annotation-wrapper-collapsed')
        this.$headerBtns.innerHTML = `${collapsed
            ? `<p class='g6-annotation-expand'>+</p>`
            : `<p class='g6-annotation-collapse'>-</p>`
        }<p class='g6-annotation-close'>x</p>`

        const { maxHeight, minHeight } = this.cfg
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
        if (this.link) {
            this.link.attr(
                'path',
                getPathItem2Card(
                    this.item,
                    card.getBoundingClientRect(),
                    this.plugin.graph,
                    this.plugin.options.canvas,
                ),
            );
        }
    }

    edit(position: EditPosition, options?: { value?: any }): HTMLElement | undefined {
        const { plugin } = this
        const target = this.getElByPosition(position);
        if (!target) return;

        const { maxTitleLength } = this.cfg;

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
        const value = options?.value ?? this.cfg[position];
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
        input.placeholder = this.cfg[position + 'Placeholder'];

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

            const newEl = this.exitEdit(position)

            if (autoFocus) {
                newEl.focus();
            }
            plugin.options.onAnnotationChange?.(this.cfg, 'update');
        }

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
        const inputEl = this.$el.querySelector<HTMLInputElement | HTMLTextAreaElement | null>(`[data-annotation-id=${position}]`)
        if (!inputEl) return;

        const value = this.cfg[position] = inputEl.value;
        const inputWrapper = inputEl.parentNode;
        let newEl: HTMLElement;
        if (position === 'title') {
            newEl = this.renderTitle({ title: value })
        } else if (position === 'content') {
            newEl = this.renderContent({ content: value })
        }

        inputWrapper.parentNode.replaceChild(newEl, inputWrapper)
        return newEl;
    }

    focus() {
        const {item, link} = this
        const {itemHighlightState, linkHighlightStyle} = this.plugin.options
        if (item && itemHighlightState) {
            this.plugin.graph.setItemState(item.getID(), itemHighlightState, true);
        }
        if (link && linkHighlightStyle) {
            link.attr(linkHighlightStyle);
        }
    }
    
    blur() {
        const {item, link} = this
        const {itemHighlightState, linkHighlightStyle, linkStyle} = this.plugin.options
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
        this.$el.remove()
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
    const styleList = ['g6-annotation-title', 'g6-annotation-content']
    const editArea = el?.closest(styleList.map(style => '.' + style).join(','));
    if (!editArea) return;

    if (editArea.classList.contains(styleList[0])) {
        return 'title'
    } else {
        return 'content'
    }
} 