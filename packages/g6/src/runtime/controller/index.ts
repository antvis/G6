import type { Graph } from '../../types/graph';
import { DataController } from './data';
import { InteractionController } from './interaction';
import { ItemController } from './item';
import { LayoutController } from './layout';
import { PluginController } from './plugin';
import { ThemeController } from './theme';
import { ViewportController } from './viewport';

export class Controller {
  public data: DataController;

  public interaction: InteractionController;

  public item: ItemController;

  public layout: LayoutController;

  public widget: PluginController;

  public theme: ThemeController;

  public viewport: ViewportController;

  constructor(graph: Graph) {
    this.data = new DataController(graph);
    this.interaction = new InteractionController(graph);
    this.item = new ItemController(graph);
    this.layout = new LayoutController(graph);
    this.widget = new PluginController(graph);
    this.theme = new ThemeController(graph);
    this.viewport = new ViewportController(graph);
  }

  public destroy() {}
}
