import { getPlugin, getPlugins } from '../../plugin/register';
import { Graph } from '../../types';
import { ThemeRegistry, ThemeSpecification } from '../../types/theme';

/**
 * Manages theme extensions for graph.
 * Themes are the mapper from item's inner model to display model.
 */
export class ThemeController {
  public extension;
  public graph: Graph;

  private themeConfig;
  private solver;
  public specification: ThemeSpecification;
  private themes: {
    [themeName: string]: ThemeSpecification;
  };

  constructor(graph: Graph<any, any>) {
    this.graph = graph;
    this.tap();
  }
  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.extension = this.getPlugin();
    this.themes = this.getThemes();
    this.graph.hooks.init.tap(this.onInit.bind(this));
    this.graph.hooks.themechange.tap(this.onThemeChange.bind(this));
  }

  /**
   * Get the extensions from useLib.
   */
  private getPlugin() {
    const { theme = {} } = this.graph.getSpecification();
    this.themeConfig = theme;
    const type = typeof theme === 'string' ? theme : (theme as any).type;
    return theme ? getPlugin('themeSolver', type) : undefined;
  }

  private getThemes(): ThemeRegistry {
    return getPlugins('theme');
  }

  /**
   * Graph init listener, create theme solver and generate theme
   * @param root0
   * @param root0.canvases
   */
  private onInit({ canvases }) {
    if (this.extension) {
      this.solver = new this.extension(this.themeConfig, this.themes);
      this.specification = this.solver.specification;
      if (this.specification) {
        // apply canvas style in theme to the background canvas dom
        const { canvas } = this.specification;
        const dom = canvases.background.getContextService().getDomElement();
        if (dom && dom.style) {
          Object.keys(canvas).forEach((key) => (dom.style[key] = canvas[key]));
        }
      }
    }
  }

  private onThemeChange({ canvases }) {
    if (!canvases) return;
    this.extension = this.getPlugin();
    this.onInit({ canvases });
  }
}
