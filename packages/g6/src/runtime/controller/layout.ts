import { Animation, DisplayObject, IAnimationEffectTiming } from '@antv/g';
import { isLayoutWithIterations, Layout, LayoutMapping, OutNode, Supervisor } from '@antv/layout';
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

  private currentLayout: Layout<any> | null;
  private currentSupervisor: Supervisor | null;
  private currentAnimation: Animation | null;
  private animatedDisplayObject: DisplayObject;

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    this.animatedDisplayObject = new DisplayObject({});
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
      type = 'grid',
      workerEnabled = false,
      animated = false,
      animationEffectTiming = {
        duration: 1000,
      } as Partial<IAnimationEffectTiming>,
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

        if (animated) {
          await this.animateLayoutWithoutIterations(positions, animationEffectTiming);
        }
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

    if (this.currentAnimation) {
      this.currentAnimation.finish();
      this.currentAnimation = null;
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

  private async animateLayoutWithoutIterations(
    positions: LayoutMapping,
    animationEffectTiming: Partial<IAnimationEffectTiming>,
  ) {
    // Animation should be executed only once.
    animationEffectTiming.iterations = 1;

    const originalPositions = positions.nodes.map((node) => {
      return this.graph.getNodeData(`${node.id}`)!;
    });

    // Add a connected displayobject so that we can animate it.
    if (!this.animatedDisplayObject.isConnected) {
      await this.graph.canvas.ready;
      this.graph.canvas.appendChild(this.animatedDisplayObject);
    }

    // Use `opacity` since it is an interpolated property.
    this.currentAnimation = this.animatedDisplayObject.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      animationEffectTiming,
    ) as Animation;

    // Update each node's position on each frame.
    // @see https://g.antv.antgroup.com/api/animation/waapi#%E5%B1%9E%E6%80%A7
    this.currentAnimation.onframe = (e) => {
      // @see https://g.antv.antgroup.com/api/animation/waapi#progress
      const progress = (e.target as Animation).effect.getComputedTiming().progress as number;

      const interpolatedNodesPosition = (originalPositions as OutNode[]).map(({ id, data }, i) => {
        const { x: fromX = 0, y: fromY = 0 } = data;
        const { x: toX, y: toY } = positions.nodes[i].data;
        return {
          id,
          data: {
            x: fromX + (toX - fromX) * progress,
            y: fromY + (toY - fromY) * progress,
          },
        };
      });

      this.updateNodesPosition({
        nodes: interpolatedNodesPosition,
        edges: [],
      });
    };

    await this.currentAnimation.finished;
  }
}
