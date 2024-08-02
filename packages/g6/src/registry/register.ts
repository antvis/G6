import type { ExtensionCategory } from '../constants';
import type { Loosen } from '../types';
import { print } from '../utils/print';
import { EXTENSION_REGISTRY } from './store';
import type { ExtensionRegistry } from './types';

/**
 * <zh/> 注册一个新的扩展。
 *
 * <en/> Registers a new extension.
 * @param category
 * <zh/> 扩展要注册的分类，目前支持注册的扩展分类有：{@link ExtensionCategory}
 *
 * <en/> The category under which the extension is to be registered, see {@link ExtensionCategory}
 * @param type
 * <zh/> 要注册的扩展的类型，将作为使用扩展时的标识
 *
 * <en/> Extension type that used as an identifier when mounting the extension on a graph
 * @param Ctor
 * <zh/> 要注册的扩展类，在使用时创建实例
 *
 * <en/> The extension class to be registered. An instance will be created upon use
 * @param override
 * <zh/> 是否覆盖已注册的扩展
 *
 * <en/> Whether to override the registered extension
 * @remarks
 * <zh/> 内置扩展在项目导入时会自动注册。对于非内置扩展，可以通过 `register` 方法手动注册。扩展只需要注册一次，即可在项目的任何位置使用。
 *
 * <en/> Built-in extensions are automatically registered when the project is imported. For non-built-in extensions, you can manually register them using the `register` method. Extensions only need to be registered once and can be used anywhere in the project.
 * @example
 * ```ts
 * import { register, BaseNode } from '@antv/g6';
 *
 * class CircleNode extends BaseNode {}
 *
 * register('node', 'circle-node', CircleNode);
 * ```
 * @public
 */
export function register<T extends ExtensionCategory>(
  category: Loosen<T>,
  type: string,
  Ctor: ExtensionRegistry[T][string],
  override = false,
) {
  const ext = EXTENSION_REGISTRY[category][type];
  if (!override && ext) {
    if (ext !== Ctor) print.warn(`The extension ${type} of ${category} has been registered before.`);
  } else Object.assign(EXTENSION_REGISTRY[category]!, { [type]: Ctor });
}
