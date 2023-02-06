import { IGraph } from "../../types";

/**
 * Manages layout extensions and graph layout.
 */
export class LayoutController {
  public extensions = {};
  public graph: IGraph;

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    // this.tap();
  }
}