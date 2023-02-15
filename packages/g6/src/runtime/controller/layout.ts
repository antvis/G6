import { Layout, LayoutMapping, registry, Supervisor } from '@antv/layout';
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

    let positions: LayoutMapping;
    if (workerEnabled) {
      const supervisor = new Supervisor(graphCore, layout);
      positions = await supervisor.execute();
    } else {
      positions = await layout.execute(graphCore);
    }

    // Update nodes' positions.
    positions.nodes.forEach((node) => {
      this.graph.updateData('node', {
        id: node.id,
        data: {
          x: node.data.x,
          y: node.data.y,
        },
      });
    });
  }

  stopLayout() {
    // this.currentLayout.stop();
  }
}
