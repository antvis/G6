import { Animation, DisplayObject, IAnimationEffectTiming } from '@antv/g';
import Hierarchy from '@antv/hierarchy';
import { Graph as GraphLib } from '@antv/graphlib';
import {
  isLayoutWithIterations,
  Layout,
  LayoutMapping,
  OutNode,
  Supervisor,
} from '@antv/layout';
import registery, { stdLib } from '../../stdlib';
import {
  IGraph,
  isImmediatelyInvokedLayoutOptions,
  isLayoutWorkerized,
  LayoutOptions,
  NodeModelData,
} from '../../types';
import { GraphCore } from '../../types/data';
import { EdgeModelData } from '../../types/edge';
import {
  getNodeSizeFn,
  isComboLayout,
  layoutOneTree,
  radialLayout,
  isTreeLayout,
} from '../../util/layout';

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

  constructor(graph: IGraph<any, any>) {
    this.graph = graph;
    this.animatedDisplayObject = new DisplayObject({});
    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.graph.hooks.layout.tap(this.onLayout.bind(this));
    this.graph.hooks.destroy.tap(this.onDestroy.bind(this));
  }

  private async onLayout(params: {
    graphCore: GraphCore;
    options: LayoutOptions;
    animate?: boolean;
  }) {
    /**
     * The final calculated result.
     */
    let positions: LayoutMapping;

    // Stop currentLayout if any.
    this.stopLayout();

    const { graphCore, options, animate = true } = params;
    let layoutNodes = graphCore.getAllNodes();
    if (!isComboLayout(options)) {
      layoutNodes = layoutNodes.filter(
        (node) => this.graph.getItemVisible(node.id) && !node.data._isCombo,
      );
    }
    const layoutNodesIdMap = {};
    layoutNodes.forEach((node) => (layoutNodesIdMap[node.id] = true));
    const layoutData = {
      nodes: layoutNodes,
      edges: graphCore
        .getAllEdges()
        .filter(
          (edge) =>
            layoutNodesIdMap[edge.source] && layoutNodesIdMap[edge.target],
        ),
    };
    const layoutGraphCore = new GraphLib<NodeModelData, EdgeModelData>(
      layoutData,
    );
    if (graphCore.hasTreeStructure('combo')) {
      layoutGraphCore.attachTreeStructure('combo');
      layoutNodes.forEach((node) => {
        const parent = graphCore.getParent(node.id, 'combo');
        if (parent && layoutGraphCore.hasNode(parent.id)) {
          layoutGraphCore.setParent(node.id, parent.id, 'combo');
        }
      });
    }

    this.graph.emit('startlayout');

    const [width, height] = this.graph.getSize();
    const center = [width / 2, height / 2];

    const nodeSize = getNodeSizeFn(options, 32);

    if (isImmediatelyInvokedLayoutOptions(options)) {
      const {
        animated = false,
        animationEffectTiming = {
          duration: 1000,
        } as Partial<IAnimationEffectTiming>,
        execute,
        ...rest
      } = options;

      // It will ignore some layout options such as `type` and `workerEnabled`.
      positions = await execute(layoutGraphCore, {
        nodeSize,
        width,
        height,
        center,
        ...rest,
      });

      if (animated) {
        await this.animateLayoutWithoutIterations(
          positions,
          animationEffectTiming,
        );
      }
    } else {
      const {
        type = 'grid',
        animated = false,
        animationEffectTiming = {
          duration: 1000,
        } as Partial<IAnimationEffectTiming>,
        iterations = 300,
        ...rest
      } = options;
      let { workerEnabled = false } = options;

      // Find built-in layout algorithms.
      const layoutCtor = stdLib.layouts[type] || registery.useLib.layouts[type];
      if (!layoutCtor) {
        throw new Error(`Unknown layout algorithm: ${type}`);
      }

      if (isTreeLayout(options)) {
        // tree layout type
        await this.handleTreeLayout(
          type,
          {
            nodeSize,
            width,
            height,
            center,
            ...rest,
          },
          animationEffectTiming,
          graphCore,
          layoutData,
          animate,
        );
        return;
      }

      // Initialize layout.
      const layout = new layoutCtor({
        nodeSize,
        width,
        height,
        center,
        ...rest,
      });
      this.currentLayout = layout;

      // CustomLayout is not workerized.
      if (!isLayoutWorkerized(options)) {
        workerEnabled = false;
        // TODO: console.warn();
      }

      if (workerEnabled) {
        /**
         * Run algorithm in WebWorker, `animated` option will be ignored.
         */
        const supervisor = new Supervisor(layoutGraphCore, layout, {
          iterations,
        });
        this.currentSupervisor = supervisor;
        positions = await supervisor.execute();
      } else {
        // e.g. Force layout
        if (isLayoutWithIterations(layout)) {
          if (animated) {
            /**
             * `onTick` will get triggered in this case.
             */
            positions = await layout.execute(layoutGraphCore, {
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
            layout.execute(layoutGraphCore);
            layout.stop();
            positions = layout.tick(iterations);
          }
        } else {
          positions = await layout.execute(layoutGraphCore);

          if (animated) {
            await this.animateLayoutWithoutIterations(
              positions,
              animationEffectTiming,
            );
          }
        }
      }
    }

    this.graph.emit('endlayout');

    // Update nodes' positions.
    this.updateNodesPosition(positions, animate);
  }

  async handleTreeLayout(
    type,
    options,
    animationEffectTiming,
    graphCore,
    layoutData,
    animate,
  ) {
    const { animated = false, rootIds = [], begin = [0, 0], radial } = options;
    const nodePositions = [];
    const nodeMap = new Map();
    // tree layout with tree data
    const trees = graphCore
      .getRoots('tree')
      .filter(
        (node) => !node.data._isCombo, // this.graph.getItemVisible(node.id) &&
      )
      .map((node) => ({ id: node.id, children: [] }));

    trees.forEach((tree) => {
      nodeMap.set(tree.id, tree);
      graphCore.dfsTree(
        tree.id,
        (node) => {
          nodeMap.get(node.id).children = graphCore
            .getChildren(node.id, 'tree')
            .filter((node) => !node.data._isCombo)
            .map((child) => {
              nodeMap.set(child.id, { id: child.id, children: [] });
              return nodeMap.get(child.id);
            });
        },
        'tree',
      );
      layoutOneTree(tree, type, options, nodeMap, nodePositions, begin);
      if (radial) {
        nodePositions.forEach((pos) => nodeMap.set(pos.id, pos));
        radialLayout(tree, nodeMap);
      }
    });
    if (animated) {
      await this.animateLayoutWithoutIterations(
        { nodes: nodePositions, edges: [] },
        animationEffectTiming,
      );
    }
    this.graph.emit('endlayout');
    this.updateNodesPosition(
      { nodes: nodePositions, edges: [] },
      animated || animate,
    );
    return;
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

  getCurrentAnimation() {
    return this.currentAnimation;
  }

  onDestroy() {
    this.stopLayout();

    if (this.currentSupervisor) {
      this.currentSupervisor.kill();
    }
  }

  private updateNodesPosition(positions: LayoutMapping, animate = true) {
    const { nodes, edges } = positions;
    this.graph.updateNodePosition(nodes, undefined, !animate);
    const edgeToUpdate = edges
      .filter((edge) => edge.data.controlPoints)
      .map((edge) => ({
        id: edge.id,
        data: {
          keyShape: {
            controlPoints: edge.data.controlPoints,
          },
        },
      }));
    if (edgeToUpdate.length) {
      this.graph.updateData('edge', edgeToUpdate);
    }
  }

  /**
   * For those layout without iterations, e.g. circular, random, since they don't have `onTick` callback,
   * we have to translate each node from its initial position to final one after layout,
   * with the help of `onframe` from G's animation API.
   * @param positions
   * @param animationEffectTiming
   */
  private async animateLayoutWithoutIterations(
    positions: LayoutMapping,
    animationEffectTiming: Partial<IAnimationEffectTiming>,
  ) {
    // Animation should be executed only once.
    animationEffectTiming.iterations = 1;

    const initialPositions = positions.nodes.map((node) => {
      // Should clone each node's initial data since it will be updated during the layout process.
      return { ...this.graph.getNodeData(`${node.id}`)! };
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
      const progress = (e.target as Animation).effect.getComputedTiming()
        .progress as number;
      const interpolatedNodesPosition = (initialPositions as OutNode[]).map(
        ({ id, data }, i) => {
          const { x: fromX = 0, y: fromY = 0 } = data;
          const { x: toX, y: toY } = positions.nodes[i].data;
          return {
            id,
            data: {
              x: fromX + (toX - fromX) * progress,
              y: fromY + (toY - fromY) * progress,
            },
          };
        },
      );

      this.updateNodesPosition({
        nodes: interpolatedNodesPosition,
        edges: [],
      });
    };

    await this.currentAnimation.finished;
  }
}
