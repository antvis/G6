import { IGraph } from "../../types";

/**
 * Free extensions(plugins) controller
 */
export class ExtensionController {
  public extensions = {};
  public graph: IGraph;

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    // this.tap();
  }
}