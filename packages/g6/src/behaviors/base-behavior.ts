import type { CustomBehaviorOption } from '../spec/behavior';
import { BaseModule } from '../utils/module';

export type BaseBehaviorOptions = CustomBehaviorOption;

export abstract class BaseBehavior<T extends BaseBehaviorOptions> extends BaseModule<T> {}
