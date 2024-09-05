import type { AmbientLightProps, DirectionalLightProps } from '@antv/g-plugin-3d';
import { AmbientLight, DirectionalLight } from '@antv/g-plugin-3d';
import type { BasePluginOptions, RuntimeContext } from '@antv/g6';
import { BasePlugin, GraphEvent } from '@antv/g6';
import { deepMix } from '@antv/util';

/**
 * <zh/> 光照插件配置项
 *
 * <en/> Light plugin options
 */
export interface LightOptions extends BasePluginOptions {
  /**
   * <zh/> 环境光
   *
   * <en/> Ambient light
   */
  ambient?: AmbientLightProps;
  /**
   * <zh/> 平行光
   *
   * <en/> Directional light
   */
  directional?: DirectionalLightProps;
}

/**
 * <zh/> 光照插件
 *
 * <en/> Light plugin
 */
export class Light extends BasePlugin<LightOptions> {
  static defaultOptions: Partial<LightOptions> = {
    ambient: {
      fill: '#fff',
      intensity: Math.PI * 2,
    },
    directional: {
      fill: '#fff',
      direction: [-1, 0, 1],
      intensity: Math.PI * 0.7,
    },
  };

  private ambient?: AmbientLight;

  private directional?: DirectionalLight;

  constructor(context: RuntimeContext, options: LightOptions) {
    super(context, deepMix({}, Light.defaultOptions, options));
    this.bindEvents();
  }

  private bindEvents() {
    this.context.graph.on(GraphEvent.BEFORE_DRAW, this.setLight);
  }

  private unbindEvents() {
    this.context.graph.off(GraphEvent.BEFORE_DRAW, this.setLight);
  }

  private setLight = () => {
    const { ambient, directional } = this.options;

    this.upsertLight('directional', directional);
    this.upsertLight('ambient', ambient);
  };

  private upsertLight(type: 'ambient', options?: AmbientLightProps): void;
  private upsertLight(type: 'directional', options?: DirectionalLightProps): void;
  private upsertLight(type: 'ambient' | 'directional', options?: AmbientLightProps | DirectionalLightProps) {
    if (options) {
      const light = this[type];
      if (light) light.attr(options);
      else {
        const Ctor = type === 'ambient' ? AmbientLight : DirectionalLight;
        const light = new Ctor({ style: options });
        this[type] = light as any;
        this.context.canvas.appendChild(light);
      }
    } else this[type]?.remove();
  }

  /**
   * <zh/> 销毁插件
   *
   * <en/> Destroy the plugin
   * @internal
   */
  public destroy() {
    this.ambient?.remove();
    this.directional?.remove();
    this.unbindEvents();
    super.destroy();
  }
}
