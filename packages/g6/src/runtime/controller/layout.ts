import { Layout, registry, Supervisor } from '@antv/layout';
import { IGraph } from '../../types';
import { GraphCore } from '../../types/data';
import { LayoutOptions } from '../../types/layout';

/**
 * Manages layout extensions and graph layout.
 */
export class LayoutController {
  public extensions = {};
  public graph: IGraph;

  private currentLayout: Layout<any>;

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.graph.hooks.layout.tap(this.onLayout.bind(this));
  }

  private async onLayout(params: { graphCore: GraphCore; options?: LayoutOptions }) {
    const { graphCore, options } = params;

    const { type, workerEnabled, ...rest } = {
      ...this.graph.getSpecification().layout,
      ...options,
    };

    // Find built-in layout algorithms.
    const layoutCtor = registry[type];
    if (!layoutCtor) {
      throw new Error(`Unknown layout algorithm: ${type}`);
    }

    // Initialize layout.
    const layout = new layoutCtor(rest);

    if (workerEnabled) {
      const supervisor = new Supervisor(graphCore, layout);
      const positions = await supervisor.execute(graphCore);
    } else {
      const positions = await layout.execute(graphCore);
    }
  }

  stopLayout() {
    // this.currentLayout.stop();
  }
}
