import type { CustomWidgetOption } from '../spec/widget';
import { BaseModule } from '../utils/module';

export type BaseWidgetOptions = CustomWidgetOption;

export abstract class BaseWidget<T extends BaseWidgetOptions> extends BaseModule<T> {}
