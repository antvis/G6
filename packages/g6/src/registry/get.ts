import { ExtensionCategory } from '../constants';
import type { Loosen } from '../types';
import { EXTENSION_REGISTRY } from './store';
import type { ExtensionRegistry } from './types';

/**
 * <zh/> 根据类别和类型获取扩展
 *
 * <en/> Get the extension by category and type
 * @param category - <zh/> 扩展类别 | <en/> Extension category
 * @param type - <zh/> 扩展类型 | <en/> Extension type
 * @returns <zh/> 注册的扩展 | <en/> Registered extension
 * @internal
 */
export function getExtension<T extends ExtensionCategory>(
  category: Loosen<T>,
  type: string,
): ExtensionRegistry[T][string] | undefined {
  const extension = EXTENSION_REGISTRY[category]?.[type];

  if (extension) {
    return extension as ExtensionRegistry[T][string];
  }
  return undefined;
}

/**
 * <zh/> 根据类别获取扩展
 *
 * <en/> Get the extension by category and type
 * @param category - <zh/> 扩展类别 | <en/> Extension category
 * @returns <zh/> 注册的扩展 | <en/> Registered extension
 * @internal
 */
export function getExtensions<T extends Loosen<ExtensionCategory>>(category: T): ExtensionRegistry[T] {
  return EXTENSION_REGISTRY[category];
}
