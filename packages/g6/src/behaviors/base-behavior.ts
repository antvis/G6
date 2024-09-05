import { BaseExtension } from '../registry/extension';
import type { CustomBehaviorOption } from '../spec/behavior';

/**
 * <zh/> 交互通用配置项
 *
 * <en/> Base options for behaviors
 */
export interface BaseBehaviorOptions extends CustomBehaviorOption {}

/**
 * <zh/> 交互的基类
 *
 * <en/> Base class for behaviors
 */
export abstract class BaseBehavior<T extends BaseBehaviorOptions = BaseBehaviorOptions> extends BaseExtension<T> {}
