import { IGraph } from "../../types";

/**
 * Manages theme extensions for graph.
 * Themes are the mapper from item's inner model to display model.
 */
export class ThemeController {
  public extensions = {};
  public graph: IGraph;

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    // this.tap();
  }
}