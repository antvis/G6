import { PathStyleProps } from '@antv/g';
import { createDOM, modifyCSS } from '../../../util/dom';
import { sleep } from '../../../util/promise';
import { getPathItem2Card } from './util';
import { EditPosition } from './types';
import { renderContent, renderTitle } from './renderCard';
import { Annotation } from './index';

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

export function bindCardEvent({
  plugin,
  card,
  itemId,
}: {
  plugin: Annotation;
  card: HTMLElement;
  itemId: string;
}) {
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
    const cardInfoMap = plugin.cardInfoMap;
    if (!cardInfoMap) return;
    const graph = plugin.graph;
    const item = graph.itemController.getItemById(itemId);
    if (item && plugin.options.itemHighlightState) {
      graph.setItemState(item, plugin.options.itemHighlightState, true);
    }
    const { link } = cardInfoMap[itemId];
    if (link && plugin.options.linkHighlightStyle) {
      link.attr(plugin.options.linkHighlightStyle);
    }
  });
  card.addEventListener('mouseleave', (e) => {
    const cardInfoMap = plugin.cardInfoMap;
    if (!cardInfoMap) return;
    const graph = plugin.graph;
    const item = graph.itemController.getItemById(itemId);
    if (item && plugin.options.itemHighlightState) {
      graph.setItemState(item, plugin.options.itemHighlightState, false);
    }

    const { link } = cardInfoMap[itemId];
    if (link) {
      Object.keys(plugin.options.linkHighlightStyle || {}).forEach((key) => {
        link.removeAttribute(key as keyof PathStyleProps);
      });
      link.attr(plugin.options.linkStyle);
    }
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
      if (collapseType === 'hide') {
        plugin.hideCard(itemId);
      } else {
        plugin.handleExpandCollapseCard(itemId);
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
        edit(getPositionByEl(e.target as HTMLElement))?.focus();
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
      edit(editPosition)?.focus();
    });

    // init edit
    if (cardCfg?.focusEditOnInit === true) {
      edit('title')?.focus();
      edit('content');
    } else if (cardCfg?.focusEditOnInit) {
      edit(cardCfg?.focusEditOnInit)?.focus();
    }
  }

  function edit(position: EditPosition, options?: { value?: any }): HTMLElement | undefined {
    const target = getElByPosition(position);
    if (!target) return;

    const cardInfoMap = plugin.cardInfoMap;
    const { maxTitleLength } = plugin.options.cardCfg || {};
    if (!cardInfoMap) return;

    const targetClass = target.className;
    const { width, height } = target.getBoundingClientRect();
    const inputTag = position === 'title' ? 'input' : 'textarea';
    const input = createDOM(
      `<${inputTag} class="${targetClass}-input" style="width:${width}px; height: ${height}px;" />`,
    ) as HTMLInputElement;
    const inputWrapper = createDOM(
      `<div class="${targetClass}-input-wrapper"/>`,
    );
    inputWrapper.appendChild(input);
    target.parentNode?.replaceChild(inputWrapper, target);
    const cardInfo = cardInfoMap[itemId];
    const value = options?.value ?? cardInfo[position];
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
    input.placeholder = cardInfo[position + 'Placeholder'];

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
    async function exitEditEvent(autoFocus = false) {
      if (isExit || !target) return;
      isExit = true;

      const newEl = exitEdit(position)

      if (autoFocus) {
        newEl.focus();
      }
      plugin.options.onAnnotationChange?.(cardInfo, 'update');
    }

    return input;
  }

  function exitEdit(position: EditPosition) {
    const inputEl = card.querySelector<HTMLInputElement | HTMLTextAreaElement | null>(`[data-annotation-id=${position}]`)
    if (!inputEl) return;
    
    const cardInfo = plugin.cardInfoMap[itemId]
    
    const value = cardInfo[position] = inputEl.value;
    const inputWrapper = inputEl.parentNode;
    let newEl: HTMLElement;
    if (position === 'title') {
      newEl = renderTitle({ title: value })
    } else if (position === 'content') {
      newEl = renderContent({ content: value, collapsed: cardInfo.collapsed })
    }

    inputWrapper.parentNode.replaceChild(newEl, inputWrapper)
    return newEl;
  }

  function getElByPosition(position: EditPosition): HTMLElement | null {
    if (position === 'title') {
      return card.querySelector('.g6-annotation-title');
    } else if (position === 'content') {
      return card.querySelector('.g6-annotation-content');
    }
    return null;
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
        move(left, top)
        plugin.dragging = { x: clientX, y: clientY, left, top, card };
      });
    };

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener(
      'mouseup',
      (e) => {
        document.removeEventListener('mousemove', onMouseMove);
        card.classList.remove('g6-annotation-wrapper-move');

        const cardInfoMap = plugin.cardInfoMap;
        const dragging = plugin.dragging;
        if (!cardInfoMap || !dragging) return;
        const { left, top, card: draggingCard } = dragging;
        cardInfoMap[itemId].x = left;
        cardInfoMap[itemId].y = top;
        modifyCSS(draggingCard, {
          visibility: 'visible',
        });
        plugin.dragging = undefined;

        // 移动过的卡片从 rows 中移除，避免影响后续卡片出生位置
        const rows = plugin.options.rows;
        rows?.forEach((rowItems) => {
          for (let i = rowItems.length - 1; i >= 0; i--) {
            if (rowItems[i].id === itemId) rowItems.splice(i, 1);
          }
        });

        plugin.options.onAnnotationChange?.(cardInfoMap[itemId], 'update');
      },
      { once: true },
    );
  });

  function move(x: number, y: number) {
    modifyCSS(card, {
      left: `${x}px`,
      top: `${y}px`,
    });

    const cardInfoMap = plugin.cardInfoMap;
    if (!cardInfoMap) return;
    // 更新连线位置
    const { link } = cardInfoMap[itemId] || {};
    if (link) {
      const item = plugin.graph.itemController.getItemById(itemId);
      link.attr(
        'path',
        getPathItem2Card(
          item,
          card.getBoundingClientRect(),
          plugin.graph,
          plugin.options.canvas,
        ),
      );
    }
  }

  return { edit, exitEdit, move, }
}
