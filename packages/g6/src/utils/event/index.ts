import type EventEmitter from '@antv/event-emitter';
import type { BaseEvent } from './events';

export * from './events';

/**
 * <zh/> 基于 Event 对象触发事件
 *
 * <en/> Trigger event based on Event object
 * @param target - <zh/> 事件目标 | <en/> event target
 * @param event - <zh/> 事件对象 | <en/> event object
 */
export function emit(target: EventEmitter, event: BaseEvent) {
  target.emit(event.type, event);
}
