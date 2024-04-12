import type { BasePlugin } from '../plugins/base-plugin';
import { ExtensionController } from '../registry/extension';
import type { ExtensionCategory } from '../registry/extension/types';
import type { CustomPluginOption, PluginOptions } from '../spec/plugin';
import type { RuntimeContext } from './types';

export class PluginController extends ExtensionController<BasePlugin<CustomPluginOption>> {
  public category: ExtensionCategory = 'plugin';

  constructor(context: RuntimeContext) {
    super(context);
    this.setPlugins(this.context.options.plugins || []);
  }

  public setPlugins(plugins: PluginOptions) {
    this.setExtensions(plugins);
  }

  public getPluginInstance(key: string) {
    return this.extensionMap[key];
  }
}
