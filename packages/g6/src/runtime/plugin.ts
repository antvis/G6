import type { BasePlugin } from '../plugins/base-plugin';
import type { CustomPluginOption, PluginOptions } from '../spec/plugin';
import { ModuleController } from '../utils/module';
import type { RuntimeContext } from './types';

export class PluginController extends ModuleController<BasePlugin<CustomPluginOption>> {
  public category: 'plugin' | 'behavior' = 'plugin';

  constructor(context: RuntimeContext) {
    super(context);
    this.setPlugins(this.context.options.plugins || []);
  }

  public setPlugins(plugins: PluginOptions) {
    this.setModules(plugins);
  }
}
