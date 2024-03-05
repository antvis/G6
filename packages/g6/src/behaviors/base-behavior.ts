import { BaseExtension } from '../registry/extension';
import type { CustomBehaviorOption } from '../spec/behavior';

export type BaseBehaviorOptions = CustomBehaviorOption;

export abstract class BaseBehavior<T extends BaseBehaviorOptions> extends BaseExtension<T> {}
