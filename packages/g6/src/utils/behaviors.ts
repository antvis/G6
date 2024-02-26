import type { BehaviorOptions } from '../spec';
import type { STDBehaviorOption } from '../spec/behavior';

/**
 * <zh/> 将行为配置项转换为标准格式
 *
 * <en/> Convert behavior options to standard format
 * @param behaviors - <zh/> 行为配置项 <en/> behavior options
 * @returns <zh/> 标准行为配置项 <en/> Standard behavior options
 */
export function parseBehaviors(behaviors: BehaviorOptions): STDBehaviorOption[] {
  const counter: Record<string, number> = {};
  const getKey = (type: string) => {
    if (!(type in counter)) counter[type] = 0;
    return `behavior-${type}-${counter[type]++}`;
  };
  return behaviors.map((behavior) => {
    if (typeof behavior === 'string') {
      return { type: behavior, key: getKey(behavior) };
    }
    if (behavior.key) return behavior as STDBehaviorOption;
    return { ...behavior, key: getKey(behavior.type) };
  });
}
