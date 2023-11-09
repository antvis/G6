import { createDOM, modifyCSS } from '../../../util/dom';
import { getPathItem2Card } from './util';
import { Annotation } from '.';
import { PathStyleProps } from '@antv/g';

function getIconTypeByEl(target?: HTMLElement) {
    const { classList } = target
    if (classList?.contains('g6-annotation-collapse')) {
        return 'collapse'
    } else if (classList?.contains('g6-annotation-expand')) {
        return 'expand'
    } else if (classList?.contains('g6-annotation-close')) {
        return 'close'
    }
}
export function bindCardEvent({ plugin, card, itemId }: { plugin: Annotation; card: HTMLElement; itemId: string; }) {
    card.addEventListener('mousemove', e => {
        // icon 的鼠标进入监听，方便外部加 tooltip
        const iconType = getIconTypeByEl(e.target as HTMLElement)
        if (iconType) {
            plugin.options.cardCfg?.onMouseEnterIcon?.(e, itemId, iconType);
        }
    });
    card.addEventListener('mouseout', e => {
        // icon 的鼠标移出监听，方便外部加 tooltip
        const iconType = getIconTypeByEl(e.target as HTMLElement)
        if (iconType) {
            plugin.options.cardCfg?.onMouseLeaveIcon?.(e, itemId, iconType);
        }
    });
    // mouseenter and mouseleave to highlight the corresponding items
    card.addEventListener('mouseenter', e => {
        const cardInfoMap = plugin.options.cardInfoMap;
        if (!cardInfoMap) return;
        const graph = plugin.graph;
        const item = graph.itemController.getItemById(itemId);
        if (item) {
            const itemHighlightState = plugin.options.itemHighlightState
            graph.setItemState(item, itemHighlightState, true);
        }
        const { link } = cardInfoMap[itemId];
        if (link) {
            link.attr(plugin.options.linkHighlightStyle);
        }
    })
    card.addEventListener('mouseleave', e => {
        const cardInfoMap = plugin.options.cardInfoMap;
        if (!cardInfoMap) return;
        const graph = plugin.graph;
        const item = graph.itemController.getItemById(itemId);
        if (item) {
            const itemHighlightState = plugin.options.itemHighlightState
            graph.setItemState(item, itemHighlightState, false);
        }
        
        const { link } = cardInfoMap[itemId];
        if (link) {
            Object.keys(plugin.options.linkHighlightStyle || {}).forEach((key: keyof PathStyleProps) => {
                link.removeAttribute(key);
            });
            link.attr(plugin.options.linkStyle);
        }
    })
    card.addEventListener('click', e => {
        const { onClickIcon } = plugin.options.cardCfg || {};
        const target = e.target as HTMLElement
        if (target.className === 'g6-annotation-collapse' || target.className === 'g6-annotation-expand') {
            // collapse & expand
            const { collapseType } = plugin.options.cardCfg;
            if (collapseType === 'hide') {
                plugin.hideCard(itemId);
            } else {
                plugin.handleExpandCollapseCard(itemId);
            }
            onClickIcon?.(e, itemId, target.className === 'g6-annotation-collapse' ? 'collapse' : 'expand')
        } else if (target.className === 'g6-annotation-close') {
            // close
            const { closeType } = plugin.options.cardCfg;
            if (closeType === 'remove') {
                plugin.removeCard(itemId);
            } else {
                plugin.hideCard(itemId);
            }
            onClickIcon?.(e, itemId, 'close')
        }
    });
    // dblclick to edit the title and content text
    const editable = plugin.options.editable;
    if (editable) {
        card.addEventListener('dblclick', e => {
            const cardInfoMap = plugin.options.cardInfoMap;
            const { maxTitleLength = 20 } = plugin.options.cardCfg || {};
            if (!cardInfoMap) return;
            const target = e.target as HTMLElement;
            const targetClass = target.className;
            if (targetClass !== 'g6-annotation-title' && targetClass !== 'g6-annotation-content') return;
            const { width, height } = targetClass === 'g6-annotation-title' ? target.getBoundingClientRect() : (target.parentNode as HTMLElement).getBoundingClientRect();
            const inputTag = targetClass === 'g6-annotation-title' ? 'input' : 'textarea';
            const input = createDOM(`<${inputTag} class="${targetClass}-input" type="textarea"/>`) as HTMLInputElement;
            const inputWrapper = createDOM(`<div class="${targetClass}-input-wrapper" style="width:${width}px; height: ${height}px;" />`);
            inputWrapper.appendChild(input);
            target.parentNode.replaceChild(inputWrapper, target);
            const cardInfo = cardInfoMap[itemId];
            const { contentPlaceholder, titlePlaceholder, content, title } = cardInfo;
            let value = content;
            if (targetClass === 'g6-annotation-title') {
                input.name = 'title';
                input.maxLength = maxTitleLength;
                value = title;
            } else {
                input.name = 'content';
            }
            if (value) {
                input.innerHTML = target.innerHTML;
                input.value = target.innerHTML;
            } else {
                input.placeholder = targetClass === 'g6-annotation-title' ? titlePlaceholder : contentPlaceholder;
            }
            input.focus();
            input.addEventListener('blur', blurEvt => {
                if (input.value) {
                    target.innerHTML = input.value;
                    cardInfo[input.name || 'title'] = input.value;
                }
                inputWrapper.parentNode.replaceChild(target, inputWrapper);

                const onAnnotationChange = plugin.options.onAnnotationChange;
                onAnnotationChange?.(cardInfo, 'update');
            });
        });
    }
    const unmovableClasses = ['g6-annotation-title', 'g6-annotation-content', 'g6-annotation-title-input', 'g6-annotation-content-input']
    card.addEventListener('mousedown', e => {
        const target = e.target as HTMLElement

        if (unmovableClasses.includes(target.className)) return;

        const bbox = card.getBoundingClientRect()
        const shiftX = e.clientX - bbox.left + (bbox.left - card.offsetLeft);
        const shiftY = e.clientY - bbox.top + (bbox.top - card.offsetTop);

        let registerMove = false
        const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
            console.log(clientX, clientY)
            console.log('registerMove', registerMove)
            if (registerMove) return;
            registerMove = true
            requestAnimationFrame(() => {
                registerMove = false
                console.log('clientX, clientY', clientX, clientY)
                const containerBBox = plugin.graph.container.getBoundingClientRect()
                let left = clientX - shiftX, top = clientY - shiftY;

                if (left > containerBBox.width - bbox.width) {
                    left = containerBBox.width - bbox.width
                }
                if (left < 0) {
                    left = 0
                }

                if (top > containerBBox.height - bbox.height) {
                    top = containerBBox.height - bbox.height
                }
                if (top < 0) {
                    top = 0
                }

                modifyCSS(card, {
                    left: `${left}px`,
                    top: `${top}px`,
                });

                const cardInfoMap = plugin.options.cardInfoMap;
                if (!cardInfoMap) return;
                // 更新连线位置
                const { link } = cardInfoMap[itemId] || {};
                if (link) {
                    const item = plugin.graph.itemController.getItemById(itemId);
                    // console.log('getPathItem2Card(item, cardBBox, graph, plugin.options.canvas)', getPathItem2Card(item, cardBBox, graph, plugin.options.canvas)[1])
                    link.attr('path', getPathItem2Card(item, card.getBoundingClientRect(), plugin.graph, plugin.options.canvas));
                }
                plugin.dragging = { x: clientX, y: clientY, left, top, card }
            })
        }

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', e => {
            document.removeEventListener('mousemove', onMouseMove);

            const cardInfoMap = plugin.options.cardInfoMap;
            const dragging = plugin.dragging;
            if (!cardInfoMap || !dragging) return;
            const { left, top, card: draggingCard } = dragging;
            cardInfoMap[itemId].x = left;
            cardInfoMap[itemId].y = top;
            modifyCSS(draggingCard, {
                visibility: 'visible'
            });
            plugin.dragging = undefined;

            // 移动过的卡片从 rows 中移除，避免影响后续卡片出生位置
            const rows = plugin.options.rows;
            rows?.forEach(rowItems => {
                for (let i = rowItems.length - 1; i >= 0; i--) {
                    if (rowItems[i].id === itemId) rowItems.splice(i, 1);
                }
            })

            plugin.options.onAnnotationChange?.(cardInfoMap[itemId], 'update');
        }, { once: true })
    })
}