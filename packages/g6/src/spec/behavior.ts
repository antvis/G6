import type { BuiltInBehaviorOptions } from '../behaviors/types';
import type { ExtensionOptions } from '../registry/extension/types';

export type BehaviorOptions = ExtensionOptions<BuiltInBehaviorOptions>;

export interface UpdateBehaviorOption {
  key: string;
  [key: string]: any;
}

export interface CustomBehaviorOption extends Record<string, any> {
  /**
   * <zh/> 交互类型
   *
   * <en/> Behavior type
   */
  type?: string;
  /**
   * <zh/> 交互 key，即唯一标识
   *
   * <en/> Behavior key, that is, the unique identifier
   * @remarks
   * <zh/> 用于标识交互，从而进一步操作此交互
   *
   * <en/> Used to identify the behavior for further operations
   *
   * ```ts
   * // Update behavior options
   * graph.updateBehavior({key: 'key', ...});
   * ```
   */
  key?: string;
}
