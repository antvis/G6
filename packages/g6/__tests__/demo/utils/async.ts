import type EventEmitter from '@antv/event-emitter';

/**
 * <zh/> 将事件转换为 Promise
 *
 * <en/> Convert event to Promise
 * @param target - <zh/> 事件发射器 | <en/> event emitter
 * @param eventName - <zh/> 事件名 | <en/> event name
 * @returns - <zh/> 事件结果 | <en/> event result
 */
export function getEventResult<R = unknown>(target: EventEmitter, eventName: string) {
  return new Promise<R>((resolve) => {
    target.once(eventName, (result) => {
      resolve(result);
    });
  });
}
