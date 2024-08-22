import type { BasePlugin } from '../plugins/base-plugin';
import { ExtensionController } from '../registry/extension';
import type { CustomPluginOption, PluginOptions } from '../spec/plugin';
import { print } from '../utils/print';
import type { RuntimeContext } from './types';

export class PluginController extends ExtensionController<BasePlugin<CustomPluginOption>> {
  public category = 'plugin' as const;

  constructor(context: RuntimeContext) {
    super(context);
    this.setPlugins(this.context.options.plugins || []);
  }

  public setPlugins(plugins: PluginOptions) {
    this.setExtensions(plugins);
  }

  public getPluginInstance(key: string) {
    const exactly = this.extensionMap[key];
    if (exactly) return exactly;

    print.warn(`Cannot find the plugin ${key}, will try to find it by type.`);

    const fussily = this.extensions.find((extension) => extension.type === key);
    if (fussily) return this.extensionMap[fussily.key];
  }
}
