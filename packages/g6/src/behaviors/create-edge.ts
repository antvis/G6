import type { FederatedMouseEvent } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { isFunction, uniqueId } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { EdgeStyle } from '../spec/element/edge';
import type { BehaviorEvent } from '../types';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

const ASSIST_EDGE_ID = 'g6-create-edge-assist-edge-id';
const ASSIST_NODE_ID = 'g6-create-edge-assist-node-id';

export interface CreateEdgeOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用悬浮元素的功能
   *
   * <en/> Whether to enable hover element function.
   */
  enable?: boolean | ((event: BehaviorEvent<FederatedMouseEvent>) => boolean);
  /**
   * <zh/> 边配置
   *
   * <en/> edge config.
   */
  edgeConfig?: EdgeStyle;
  /**
   * <zh/> 交互配置 点击 或 拖拽
   *
   * <en/> trigger click or drag.
   */
  trigger?: 'click' | 'drag';
  /**
   * <zh/> 成功创建边回调
   *
   * <en/> Callback when create is completed.
   */
  onFinish?: (edgeId: ID, targetId: ID, sourceId: ID) => void;
}

export class CreateEdge extends BaseBehavior<CreateEdgeOptions> {
  static defaultOptions: Partial<CreateEdgeOptions> = {
    animation: true,
    enable: true,
    edgeConfig: {},
    trigger: 'drag',
    onFinish: () => {},
  };

  public source: ID | null = null;

  constructor(context: RuntimeContext, options: CreateEdgeOptions) {
    super(context, Object.assign({}, CreateEdge.defaultOptions, options));
    this.bindEvents();
  }

  public update(options: Partial<CreateEdgeOptions>): void {
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    const { trigger } = this.options;
    this.unbindEvents();

    if (trigger === 'click') {
      graph.on(`node:${CommonEvent.CLICK}`, this.handleCreateEdge);
      graph.on(`combo:${CommonEvent.CLICK}`, this.handleCreateEdge);
      graph.on(`canvas:${CommonEvent.CLICK}`, this.cancelEdge);
      graph.on(`edge:${CommonEvent.CLICK}`, this.cancelEdge);
    } else {
      graph.on(`node:${CommonEvent.DRAG_START}`, this.handleCreateEdge);
      graph.on(`combo:${CommonEvent.DRAG_START}`, this.handleCreateEdge);
      graph.on(CommonEvent.POINTER_UP, this.drop);
    }

    graph.on(CommonEvent.POINTER_MOVE, this.updateAssistEdge);
  }

  private drop = async (event: BehaviorEvent<FederatedMouseEvent>) => {
    const { targetType } = event;
    if (['combo', 'node'].includes(targetType) && this.source) {
      await this.handleCreateEdge(event);
    } else {
      await this.cancelEdge();
    }
  };

  private handleCreateEdge = async (event: BehaviorEvent<FederatedMouseEvent>) => {
    if (!this.validate(event)) return;
    const { graph, canvas } = this.context;
    const { edgeConfig } = this.options;

    if (this.source) {
      this.createEdge(event);
      await this.cancelEdge();
      return;
    }

    canvas.setCursor('crosshair');
    this.source = this.getSelectedNodeIDs([event.target.id])[0];

    graph.addNodeData([
      {
        id: ASSIST_NODE_ID,
        style: {
          visibility: 'hidden',
          ports: [{ key: 'port-1', placement: [0.5, 0.5] }],
        },
      },
    ]);

    graph.addEdgeData([
      {
        id: ASSIST_EDGE_ID,
        source: this.source,
        target: ASSIST_NODE_ID,
        style: {
          pointerEvents: 'none',
          ...edgeConfig,
        },
      },
    ]);
  };

  private updateAssistEdge = async (event: BehaviorEvent<FederatedMouseEvent>) => {
    if (!this.source) return;
    const { model, element } = this.context;

    model.translateNodeTo(ASSIST_NODE_ID, [event.canvas.x, event.canvas.y]);

    await element!.draw({ animation: false, silence: true });
  };

  private createEdge = (event: BehaviorEvent<FederatedMouseEvent>) => {
    const { graph } = this.context;
    const { edgeConfig, onFinish } = this.options;
    const targetId = event.target?.id;

    if (!targetId || !this.source) return;

    const target = this.getSelectedNodeIDs([event.target.id])?.[0];
    const id = `${this.source}-${uniqueId()}-${target}`;

    graph.addEdgeData([
      {
        id,
        source: this.source,
        target,
        style: {
          ...edgeConfig,
        },
      },
    ]);

    onFinish(id, this.source, target);
  };

  private cancelEdge = async () => {
    if (!this.source) return;
    const { graph, element, canvas } = this.context;
    canvas.setCursor('default');

    graph.removeNodeData([ASSIST_NODE_ID]);

    this.source = null;

    await element!.draw({ animation: false, silence: true });
  };

  private getSelectedNodeIDs(currTarget: ID[]) {
    return Array.from(
      new Set(
        this.context.graph
          .getElementDataByState('node', this.options.state)
          .map((node) => node.id)
          .concat(currTarget),
      ),
    );
  }

  private validate(event: BehaviorEvent<FederatedMouseEvent>) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    const { graph } = this.context;
    const { trigger } = this.options;

    if (trigger === 'click') {
      graph.off(`node:${CommonEvent.CLICK}`, this.handleCreateEdge);
      graph.off(`combo:${CommonEvent.CLICK}`, this.handleCreateEdge);
      graph.off(`canvas:${CommonEvent.CLICK}`, this.cancelEdge);
      graph.off(`edge:${CommonEvent.CLICK}`, this.cancelEdge);
    } else {
      graph.off(`node:${CommonEvent.DRAG_START}`, this.handleCreateEdge);
      graph.off(`combo:${CommonEvent.DRAG_START}`, this.handleCreateEdge);
      graph.off(CommonEvent.POINTER_UP, this.drop);
    }

    graph.off(CommonEvent.POINTER_MOVE, this.updateAssistEdge);
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
