import type { CustomPluginOption } from '../spec/plugin';
import { BaseModule } from '../utils/module';

export type BasePluginOptions = CustomPluginOption;

export abstract class BasePlugin<T extends BasePluginOptions> extends BaseModule<T> {}
