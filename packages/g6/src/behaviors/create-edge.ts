import { isFunction, uniqueId } from '@antv/util';
import { CanvasEvent, ComboEvent, CommonEvent, EdgeEvent, NodeEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { EdgeData } from '../spec';
import type { EdgeStyle } from '../spec/element/edge';
import type { ID, IElementEvent, IPointerEvent, NodeLikeData } from '../types';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

const ASSIST_EDGE_ID = 'g6-create-edge-assist-edge-id';
const ASSIST_NODE_ID = 'g6-create-edge-assist-node-id';

/**
 * <zh/> 创建边交互配置项
 *
 * <en/> Create edge behavior options
 */
export interface CreateEdgeOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用创建边的功能
   *
   * <en/> Whether to enable the function of creating edges
   * @defaultValue true
   */
  enable?: boolean | ((event: IPointerEvent) => boolean);
  /**
   * <zh/> 新建边的样式配置
   *
   * <en/> Style configs of the new edge
   */
  style?: EdgeStyle;
  /**
   * <zh/> 交互配置 点击 或 拖拽
   *
   * <en/> trigger click or drag.
   * @defaultValue 'drag'
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

/**
 * <zh/> 创建边交互
 *
 * <en/> Create edge behavior
 * @remarks
 * <zh/> 通过拖拽或点击节点创建边，支持自定义边样式。
 *
 * <en/> Create edges by dragging or clicking nodes, and support custom edge styles.
 */
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

  /**
   * Update options
   * @param options - The options to update
   * @internal
   */
  public update(options: Partial<CreateEdgeOptions>): void {
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    const { trigger } = this.options;
    this.unbindEvents();

    if (trigger === 'click') {
      graph.on(NodeEvent.CLICK, this.handleCreateEdge);
      graph.on(ComboEvent.CLICK, this.handleCreateEdge);
      graph.on(CanvasEvent.CLICK, this.cancelEdge);
      graph.on(EdgeEvent.CLICK, this.cancelEdge);
    } else {
      graph.on(NodeEvent.DRAG_START, this.handleCreateEdge);
      graph.on(ComboEvent.DRAG_START, this.handleCreateEdge);
      graph.on(CommonEvent.POINTER_UP, this.drop);
    }

    graph.on(CommonEvent.POINTER_MOVE, this.updateAssistEdge);
  }

  private drop = async (event: IElementEvent) => {
    const { targetType } = event;
    if (['combo', 'node'].includes(targetType) && this.source) {
      await this.handleCreateEdge(event);
    } else {
      await this.cancelEdge();
    }
  };

  private handleCreateEdge = async (event: IElementEvent) => {
    if (!this.validate(event)) return;
    const { graph, canvas, batch, element } = this.context;
    const { style } = this.options;

    if (this.source) {
      this.createEdge(event);
      await this.cancelEdge();
      return;
    }

    batch!.startBatch();
    canvas.setCursor('crosshair');
    this.source = this.getSelectedNodeIDs([event.target.id])[0];
    const sourceNode = graph.getElementData(this.source) as NodeLikeData;

    graph.addNodeData([
      {
        id: ASSIST_NODE_ID,
        style: {
          visibility: 'hidden',
          ports: [{ key: 'port-1', placement: [0.5, 0.5] }],
          x: sourceNode.style?.x,
          y: sourceNode.style?.y,
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
    await element!.draw({ animation: false })?.finished;
  };

  private updateAssistEdge = async (event: IPointerEvent) => {
    if (!this.source) return;
    const { model, element } = this.context;

    model.translateNodeTo(ASSIST_NODE_ID, [event.canvas.x, event.canvas.y]);

    await element!.draw({ animation: false, silence: true })?.finished;
  };

  private createEdge = (event: IElementEvent) => {
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
    const { graph, element, batch } = this.context;

    graph.removeNodeData([ASSIST_NODE_ID]);

    this.source = undefined;

    await element!.draw({ animation: false })?.finished;
    batch!.endBatch();
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

  private validate(event: IPointerEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    const { graph } = this.context;

    graph.off(NodeEvent.CLICK, this.handleCreateEdge);
    graph.off(ComboEvent.CLICK, this.handleCreateEdge);
    graph.off(CanvasEvent.CLICK, this.cancelEdge);
    graph.off(EdgeEvent.CLICK, this.cancelEdge);
    graph.off(NodeEvent.DRAG_START, this.handleCreateEdge);
    graph.off(ComboEvent.DRAG_START, this.handleCreateEdge);
    graph.off(CommonEvent.POINTER_UP, this.drop);
    graph.off(CommonEvent.POINTER_MOVE, this.updateAssistEdge);
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
