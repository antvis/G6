import type { TooltipStyleProps } from '@antv/component';
import { Tooltip as TooltipComponent } from '@antv/component';
import { get } from '@antv/util';
import type { RuntimeContext } from '../runtime/types';
import type { ElementDatum, ElementType, ID, IElementEvent } from '../types';
import { isToBeDestroyed } from '../utils/element';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

/**
 * <zh/> 提示框插件配置项
 *
 * <en/> Tooltip plugin options
 */
export interface TooltipOptions
  extends BasePluginOptions,
    Pick<TooltipStyleProps, 'position' | 'offset' | 'enterable' | 'style' | 'container' | 'title'> {
  /**
   *  <zh/> 触发行为，可选 hover | click
   * - `'hover'`：鼠标移入元素时触发
   * - `'click'`：鼠标点击元素时触发
   *
   *  <en/> Trigger behavior, optional hover | click
   * - `'hover'`：mouse hover element
   * - `'click'`：mouse click element
   * @defaultValue 'hover
   */
  trigger?: 'hover' | 'click';
  /**
   *  <zh/> 自定义内容
   *
   *  <en/> Function for getting tooltip content
   */
  getContent?: (event: IElementEvent, items: ElementDatum[]) => HTMLElement | string;
  /**
   *  <zh/> 是否启用
   *
   *  <en/> Is enable
   *  @defaultValue true
   */
  enable?: boolean | ((event: IElementEvent) => boolean);
}

/**
 * <zh/> 提示框插件
 *
 * <en/> Tooltip plugin
 */
export class Tooltip extends BasePlugin<TooltipOptions> {
  static defaultOptions: Partial<TooltipOptions> = {
    trigger: 'hover',
    position: 'top-right',
    enterable: false,
    enable: true,
    offset: [10, 10],
    style: {
      '.tooltip': {
        visibility: 'hidden',
      },
    },
  };
  private currentTarget: string | null = null;
  private tooltipElement: TooltipComponent | null = null;
  private container: HTMLElement | null = null;

  constructor(context: RuntimeContext, options: TooltipOptions) {
    super(context, Object.assign({}, Tooltip.defaultOptions, options));
    this.render();
    this.bindEvents();
  }

  /**
   * <zh/> 获取事件及处理事件的方法
   *
   * <en/> Get event and handle event methods
   * @returns <zh/> 事件及处理事件的方法 | <en/> Event and handling event methods
   */
  private getEvents(): { [key: string]: (event: IElementEvent) => void } {
    if (this.options.trigger === 'click') {
      return {
        'node:click': this.onClick,
        'edge:click': this.onClick,
        'combo:click': this.onClick,
        'canvas:click': this.onPointerLeave,
        contextmenu: this.onPointerLeave,
        drag: this.onPointerLeave,
      };
    }

    return {
      'node:pointerenter': this.onPointerEnter,
      'node:pointermove': this.onPointerMove,
      'canvas:pointermove': this.onCanvasMove,
      'edge:pointerenter': this.onPointerEnter,
      'edge:pointermove': this.onPointerMove,
      'combo:pointerenter': this.onPointerEnter,
      'combo:pointermove': this.onPointerMove,
      contextmenu: this.onPointerLeave,
      'node:drag': this.onPointerLeave,
    };
  }
  /**
   * <zh/> 更新tooltip配置
   *
   * <en/> Update the tooltip configuration
   * @param options - <zh/> 配置项 | <en/> options
   * @internal
   */
  public update(options: Partial<TooltipOptions>) {
    this.unbindEvents();
    super.update(options);
    if (this.tooltipElement) {
      this.container?.removeChild(this.tooltipElement.HTMLTooltipElement);
    }
    this.tooltipElement = this.initTooltip();
    this.bindEvents();
  }

  private render() {
    const { canvas } = this.context;
    const $container = canvas.getContainer();
    if (!$container) return;
    this.container = $container;
    this.tooltipElement = this.initTooltip();
  }

  private unbindEvents() {
    const { graph } = this.context;
    /** The previous event binding needs to be removed when updating the trigger. */
    const events = this.getEvents();
    Object.keys(events).forEach((eventName) => {
      graph.off(eventName, events[eventName]);
    });
  }

  private bindEvents() {
    const { graph } = this.context;
    const events = this.getEvents();
    Object.keys(events).forEach((eventName) => {
      graph.on(eventName, events[eventName]);
    });
  }

  private isEnable = (event: IElementEvent) => {
    const { enable } = this.options;
    if (typeof enable === 'function') {
      return enable(event);
    }
    return enable;
  };

  /**
   * <zh/> 点击事件
   *
   * <en/> Click event
   * @param event - <zh/> 元素 | <en/> element
   */
  public onClick = (event: IElementEvent) => {
    const {
      target: { id },
    } = event;
    // click the same item twice, tooltip will be hidden
    if (this.currentTarget === id) {
      this.hide(event);
      this.currentTarget = null;
    } else {
      this.currentTarget = id;
      this.show(event);
    }
  };

  /**
   * <zh/> 在目标元素(node/edge/combo)上移动
   *
   * <en/> Move on target element (node/edge/combo)
   * @param event - <zh/> 目标元素 | <en/> target element
   */
  public onPointerMove = (event: IElementEvent) => {
    const { target } = event;
    if (!this.currentTarget || target.id === this.currentTarget) {
      return;
    }
    this.show(event);
  };
  /**
   * <zh/> 点击画布/触发拖拽/出现上下文菜单隐藏tooltip
   *
   * <en/> Hide tooltip when clicking canvas/triggering drag/appearing context menu
   * @param event - <zh/> 目标元素 | <en/> target element
   */
  public onPointerLeave = (event: IElementEvent) => {
    this.hide(event);
    this.currentTarget = null;
  };
  /**
   * <zh/> 移动画布
   *
   * <en/> Move canvas
   * @param event - <zh/> 目标元素 | <en/> target element
   */
  public onCanvasMove = (event: IElementEvent) => {
    this.hide(event);
    this.currentTarget = null;
  };

  private onPointerEnter = (event: IElementEvent) => {
    this.show(event);
  };

  /**
   * <zh/> 显示目标元素的提示框
   *
   * <en/> Show tooltip of target element
   * @param id - <zh/> 元素 ID | <en/> element ID
   */
  public showById = (id: ID) => {
    const event = {
      target: { id },
    } as IElementEvent;
    this.show(event);
  };

  private getElementData = (id: ID, targetType: ElementType) => {
    const { model } = this.context;
    switch (targetType) {
      case 'node':
        return model.getNodeData([id]);
      case 'edge':
        return model.getEdgeData([id]);
      case 'combo':
        return model.getComboData([id]);
      default:
        return [];
    }
  };

  /**
   * <zh/> 在目标元素上显示tooltip
   *
   * <en/> Show tooltip on target element
   * @param event - <zh/> 目标元素 | <en/> target element
   * @internal
   */
  public show = (event: IElementEvent) => {
    const {
      client,
      target: { id },
    } = event;
    if (isToBeDestroyed(event.target)) return;
    if (!this.tooltipElement || !this.isEnable(event)) return;

    const targetType = this.context.graph.getElementType(id);
    const { getContent, title } = this.options;
    this.currentTarget = id;
    const items: ElementDatum[] = this.getElementData(id, targetType as ElementType);
    let x;
    let y;
    if (client) {
      x = client.x;
      y = client.y;
    } else {
      const style = get(items, '0.style', { x: 0, y: 0 });
      x = style.x;
      y = style.y;
    }
    let tooltipContent: { [key: string]: unknown } = {};
    if (getContent) {
      tooltipContent.content = getContent(event, items);
    } else {
      const style = this.context.graph.getElementRenderStyle(id);
      const color = targetType === 'node' ? style.fill : style.stroke;
      tooltipContent = {
        title: title || targetType,
        data: items.map((item) => {
          return {
            name: 'ID',
            value: item.id || `${item.source} -> ${item.target}`,
            color,
          };
        }),
      };
    }
    this.tooltipElement.update({
      ...this.tooltipStyleProps,
      x,
      y,
      style: {
        '.tooltip': {
          visibility: 'visible',
        },
      },
      ...tooltipContent,
    });
  };
  /**
   * <zh/> 隐藏tooltip
   *
   * <en/> Hidden tooltip
   * @param event - <zh/> 目标元素,不传则为外部调用 | <en/> Target element, not passed in as external call
   */
  public hide = (event?: IElementEvent) => {
    // if e is undefined, hide the tooltip， external call
    if (!event) {
      this.tooltipElement?.hide();
      return;
    }
    if (!this.tooltipElement) return;
    // No target node: tooltip has been hidden. No need for duplicated call.
    if (!this.currentTarget) return;
    const {
      client: { x, y },
    } = event;
    this.tooltipElement.hide(x, y);
  };

  private get tooltipStyleProps() {
    const { canvas } = this.context;
    const { center } = canvas.getBounds();
    const $container = canvas.getContainer() as HTMLElement;
    const { top, left } = $container.getBoundingClientRect();
    const { style, position, enterable, container = { x: -left, y: -top }, title, offset } = this.options;
    const [x, y] = center;
    const [width, height] = canvas.getSize();

    return {
      x,
      y,
      container,
      title,
      bounding: { x: 0, y: 0, width, height },
      position,
      enterable,
      offset,
      style,
    };
  }

  private initTooltip = () => {
    const tooltipElement = new TooltipComponent({
      className: 'tooltip',
      style: this.tooltipStyleProps,
    });
    this.container?.appendChild(tooltipElement.HTMLTooltipElement);
    return tooltipElement;
  };

  /**
   * <zh/> 销毁tooltip
   *
   * <en/> Destroy tooltip
   * @internal
   */
  public destroy(): void {
    this.unbindEvents();
    if (this.tooltipElement) {
      this.container?.removeChild(this.tooltipElement.HTMLTooltipElement);
    }
    super.destroy();
  }
}
