import { BaseExtension } from '../registry/extension';
import type { CustomBehaviorOption } from '../spec/behavior';

export interface BaseBehaviorOptions extends CustomBehaviorOption {}

export abstract class BaseBehavior<T extends BaseBehaviorOptions = BaseBehaviorOptions> extends BaseExtension<T> {}
