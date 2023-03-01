import { isLayoutWithIterations, Layout, LayoutMapping, Supervisor } from '@antv/layout';
import { stdLib } from '../../stdlib';
import { IGraph } from '../../types';
import { GraphCore } from '../../types/data';
import { LayoutOptions } from '../../types/layout';

/**
 * Manages layout extensions and graph layout.
 * It will also emit `afterlayout` & `tick` events on Graph.
 */
export class LayoutController {
  public extensions = {};
  public graph: IGraph;

  private currentLayout: Layout<any>;
  private currentSupervisor: Supervisor;

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
    // Stop currentLayout if any.
    this.stopLayout();

    const { graphCore, options } = params;

    const {
      type,
      workerEnabled,
      animated,
      iterations = 300,
      ...rest
    } = {
      ...this.graph.getSpecification().layout,
      ...options,
    };

    // Find built-in layout algorithms.
    const layoutCtor = stdLib.layouts[type];
    if (!layoutCtor) {
      throw new Error(`Unknown layout algorithm: ${type}`);
    }

    // Initialize layout.
    const layout = new layoutCtor(rest);
    this.currentLayout = layout;

    let positions: LayoutMapping;

    if (workerEnabled) {
      /**
       * Run algorithm in WebWorker, `animated` option will be ignored.
       */
      const supervisor = new Supervisor(graphCore, layout, { iterations });
      this.currentSupervisor = supervisor;
      positions = await supervisor.execute();
    } else {
      if (isLayoutWithIterations(layout)) {
        if (animated) {
          positions = await layout.execute(graphCore, {
            onTick: (positionsOnTick: LayoutMapping) => {
              // Display the animated process of layout.
              this.updateNodesPosition(positionsOnTick);
              this.graph.emit('tick', positionsOnTick);
            },
          });
        } else {
          /**
           * Manually step simulation in a sync way. `onTick` won't get triggered in this case,
           * there will be no animation either.
           */
          layout.execute(graphCore);
          layout.stop();
          positions = layout.tick(iterations);
        }

        /**
         * `onTick` will get triggered in this case.
         */
      } else {
        positions = await layout.execute(graphCore);
      }
    }

    // Update nodes' positions.
    this.updateNodesPosition(positions);
  }

  stopLayout() {
    if (this.currentLayout && isLayoutWithIterations(this.currentLayout)) {
      this.currentLayout.stop();
      this.currentLayout = null;
    }

    if (this.currentSupervisor) {
      this.currentSupervisor.stop();
      this.currentSupervisor = null;
    }
  }

  destroy() {
    this.stopLayout();

    if (this.currentSupervisor) {
      this.currentSupervisor.kill();
    }
  }

  private updateNodesPosition(positions: LayoutMapping) {
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
}
