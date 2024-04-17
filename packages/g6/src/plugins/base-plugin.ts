import { BaseExtension } from '../registry/extension';
import type { CustomPluginOption } from '../spec/plugin';

export type BasePluginOptions = CustomPluginOption;

export abstract class BasePlugin<T extends BasePluginOptions> extends BaseExtension<T> {
  /**
   * <zh/> 更新插件配置并同步到 Spec
   *
   * <en/> Update plugin options and sync to Spec
   * @param options - <zh/> 待更新的配置项 | <en/> Options to update
   * @param shouldRender - <zh/> 是否重新渲染 | <en/> Whether to re-render
   */
  public sync(options: Partial<T>, shouldRender = true) {
    this.context.graph.updatePlugin({
      key: this.options.key!,
      ...options,
    });
    shouldRender && this.context.graph.render();
  }
}
