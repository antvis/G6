import type { RuntimeContext } from '../../runtime/types';
import { print } from '../../utils/print';
import type { ShortcutKey } from '../../utils/shortcut';
import { Shortcut } from '../../utils/shortcut';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';

/**
 * <zh/> 全屏配置项
 *
 * <en/> Full screen options
 */
export interface FullscreenOptions extends BasePluginOptions {
  /**
   * <zh/> 触发全屏的方式
   * - `request` : 请求全屏
   * - `exit` : 退出全屏
   *
   * <en/> The way to trigger full screen
   * - `request`: request full screen
   * - `exit`: exit full screen
   */
  trigger?: {
    request?: ShortcutKey;
    exit?: ShortcutKey;
  };
  /**
   * <zh/> 是否自适应画布尺寸，全屏后画布尺寸会自动适应屏幕尺寸
   *
   * <en/> Whether to adapt the canvas size
   * @defaultValue true
   */
  autoFit?: boolean;
  /**
   * <zh/> 进入全屏后的回调
   *
   * <en/> Callback after entering full screen
   */
  onEnter?: () => void;
  /**
   * <zh/> 退出全屏后的回调
   *
   * <en/> Callback after exiting full screen
   */
  onExit?: () => void;
}

/**
 * <zh/> 全屏
 *
 * <en/> Full screen
 */
export class Fullscreen extends BasePlugin<FullscreenOptions> {
  static defaultOptions: Partial<FullscreenOptions> = {
    trigger: {},
    autoFit: true,
  };

  private shortcut: Shortcut;

  private style: HTMLStyleElement;

  private $el = this.context.canvas.getContainer()!;

  private graphSize: [number, number] = [0, 0];

  constructor(context: RuntimeContext, options: FullscreenOptions) {
    super(context, Object.assign({}, Fullscreen.defaultOptions, options));

    this.shortcut = new Shortcut(context.graph);

    this.bindEvents();

    this.style = document.createElement('style');
    document.head.appendChild(this.style);
    this.style.innerHTML = `
      :not(:root):fullscreen::backdrop {
        background: transparent;
      }
    `;
  }

  private bindEvents() {
    this.unbindEvents();
    this.shortcut.unbindAll();

    const { request = [], exit = [] } = this.options.trigger;
    this.shortcut.bind(request, this.request);
    this.shortcut.bind(exit, this.exit);

    const events = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'];
    events.forEach((eventName) => {
      document.addEventListener(eventName, this.onFullscreenChange, false);
    });
  }

  private unbindEvents() {
    this.shortcut.unbindAll();
    const events = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'];
    events.forEach((eventName) => {
      document.removeEventListener(eventName, this.onFullscreenChange, false);
    });
  }

  private setGraphSize(fullScreen = true) {
    let width, height;
    if (fullScreen) {
      width = globalThis.screen?.width || 0;
      height = globalThis.screen?.height || 0;
      this.graphSize = this.context.graph.getSize();
    } else {
      [width, height] = this.graphSize;
    }
    this.context.graph.setSize(width, height);
    this.context.graph.render();
  }

  private onFullscreenChange = () => {
    const isFull = !!document.fullscreenElement;
    if (this.options.autoFit) this.setGraphSize(isFull);
    if (isFull) {
      this.options.onEnter?.();
    } else {
      this.options.onExit?.();
    }
  };

  /**
   * <zh/> 请求全屏
   *
   * <en/> Request full screen
   */
  public request() {
    if (document.fullscreenElement || !isFullscreenEnabled()) return;
    this.$el.requestFullscreen().catch((err: Error) => {
      print.warn(`Error attempting to enable full-screen: ${err.message} (${err.name})`);
    });
  }

  /**
   * <zh/> 退出全屏
   *
   * <en/> Exit full screen
   */
  public exit() {
    if (!document.fullscreenElement) return;
    document.exitFullscreen();
  }

  /**
   * <zh/> 更新配置
   *
   * <en/> Update options
   * @param options - <zh/> 配置项 | <en/> Options
   * @internal
   */
  public update(options: Partial<FullscreenOptions>): void {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  public destroy(): void {
    this.exit();
    this.style.remove();
    super.destroy();
  }
}

/**
 * <zh/> 判断是否支持全屏
 *
 * <en/> Determine whether full screen is enabled
 * @returns <zh/> 是否支持全屏 | <en/> Whether full screen is enabled
 */
function isFullscreenEnabled() {
  return (
    document.fullscreenEnabled ||
    // <zh/> 使用 Reflect 语法规避 ts 检查 | <en/> use Reflect to avoid ts checking
    Reflect.get(document, 'webkitFullscreenEnabled') ||
    Reflect.get(document, 'mozFullscreenEnabled') ||
    Reflect.get(document, 'msFullscreenEnabled')
  );
}
