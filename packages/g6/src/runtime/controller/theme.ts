import { getPlugin } from '../../plugin/register';
import type { G6Spec } from '../../spec';
import { Graph } from '../../types';
import type { InitParams, ThemeChangeParams } from '../hooks';

/**
 * Manages theme extensions for graph.
 * Themes are the mapper from item's inner model to display model.
 */
export class ThemeController {
  public graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
    this.tap();
  }
  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.graph.hooks.init.tap(this.onInit.bind(this));
    this.graph.hooks.themechange.tap(this.onThemeChange.bind(this));
  }

  private onInit(params: InitParams) {
    // init background color
    const { context } = params;
    const { graph, options } = context;
    // @ts-expect-error dom element can set background color
    graph.canvas.canvas.background.getContextService().getDomElement().style.backgroundColor =
      this.getBackground(options);
  }

  private onThemeChange(params: ThemeChangeParams) {
    const { context } = params;
    const { options } = context;

    const themeName = options.theme;

    if (!themeName) {
      this.graph.hooks.themestylechange.emit({
        context,
        value: {},
      });
      return;
    }

    const theme = getPlugin('theme', themeName);

    if (!theme) {
      throw new Error(`Unknown theme type: '${themeName}'.`);
    }

    this.graph.hooks.themestylechange.emit({
      context,
      value: theme,
    });
  }

  private getBackground(options: G6Spec) {
    // TODO wait for support background
    // const { background, theme } = options;
    // const themeStyle = getPlugin('theme', theme);
    // return themeStyle?.background || background;

    return '';
  }
}
