import type EventEmitter from '@antv/event-emitter';
import type { DisplayObject } from '@antv/g';
import { Document } from '@antv/g';
import { Target } from '../../types';
import { isCombo, isEdge, isNode } from '../element';
import type { BaseEvent } from './events';

export * from './events';

/**
 * <zh/> 基于 Event 对象触发事件
 *
 * <en/> Trigger event based on Event object
 * @param emitter - <zh/> 事件目标 | <en/> event target
 * @param event - <zh/> 事件对象 | <en/> event object
 */
export function emit(emitter: EventEmitter, event: BaseEvent) {
  emitter.emit(event.type, event);
}

/**
 * <zh/> 获取事件目标元素
 *
 * <en/> Get the event target element
 * @param shape - <zh/> 事件图形 | <en/> event shape
 * @returns <zh/> 目标元素 | <en/> target element
 * @remarks
 * <zh/> 事件响应大多数情况会命中元素的内部图形，通过该方法可以获取到其所属元素
 *
 * <en/> Most of the event responses will hit the internal graphics of the element, and this method can be used to get the element to which it belongs
 */
export function eventTargetOf(shape?: DisplayObject | Document): { type: string; element: Target } | null {
  if (!shape) return null;

  if (shape instanceof Document) {
    return { type: 'canvas', element: shape };
  }

  let element: DisplayObject | null = shape;
  while (element) {
    // 此判断条件不适用于 label 和 节点分开渲染的情况
    // This condition is not applicable to the case where the label and node are rendered separately
    if (isNode(element)) return { type: 'node', element };
    if (isEdge(element)) return { type: 'edge', element };
    if (isCombo(element)) return { type: 'combo', element };
    element = element.parentElement as DisplayObject | null;
  }

  return null;
}
