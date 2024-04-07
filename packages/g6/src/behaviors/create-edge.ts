import type { FederatedMouseEvent } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { isFunction, uniqueId } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { EdgeData } from '../spec';
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
  style?: EdgeStyle;
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
  onFinish?: (edge: EdgeData) => void;
  /**
   * <zh/> 创建边回调，返回边数据
   *
   * <en/> Callback when create edge, return EdgeData.
   */
  onCreate?: (edge: EdgeData) => EdgeData;
}

export class CreateEdge extends BaseBehavior<CreateEdgeOptions> {
  static defaultOptions: Partial<CreateEdgeOptions> = {
    animation: true,
    enable: true,
    style: {},
    trigger: 'drag',
    onCreate: (data) => data,
    onFinish: () => {},
  };

  public source?: ID;

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
    const { style } = this.options;

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
          ...style,
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
    const { style, onFinish, onCreate } = this.options;
    const targetId = event.target?.id;
    if (targetId === undefined || this.source === undefined) return;

    const target = this.getSelectedNodeIDs([event.target.id])?.[0];
    const id = `${this.source}-${target}-${uniqueId()}`;

    const edgeData = onCreate({ id, source: this.source, target, style });
    graph.addEdgeData([edgeData]);
    onFinish(edgeData);
  };

  private cancelEdge = async () => {
    if (!this.source) return;
    const { graph, element, canvas } = this.context;
    canvas.setCursor('default');

    graph.removeNodeData([ASSIST_NODE_ID]);

    this.source = undefined;

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

    graph.off(`node:${CommonEvent.CLICK}`, this.handleCreateEdge);
    graph.off(`combo:${CommonEvent.CLICK}`, this.handleCreateEdge);
    graph.off(`canvas:${CommonEvent.CLICK}`, this.cancelEdge);
    graph.off(`edge:${CommonEvent.CLICK}`, this.cancelEdge);
    graph.off(`node:${CommonEvent.DRAG_START}`, this.handleCreateEdge);
    graph.off(`combo:${CommonEvent.DRAG_START}`, this.handleCreateEdge);
    graph.off(CommonEvent.POINTER_UP, this.drop);
    graph.off(CommonEvent.POINTER_MOVE, this.updateAssistEdge);
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
