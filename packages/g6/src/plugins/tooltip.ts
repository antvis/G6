import type { TooltipStyleProps } from '@antv/component';
import { Tooltip as TooltipComponent } from '@antv/component';
import type { RuntimeContext } from '../runtime/types';
import type { ElementDatum, ElementType, IG6ElementEvent } from '../types';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

export interface TooltipOptions
  extends BasePluginOptions,
    Pick<TooltipStyleProps, 'position' | 'offset' | 'enterable' | 'style' | 'container'> {
  /** <zh/> 触发方式 | <en/> Event type that triggers display of tooltip */
  trigger?: 'hover' | 'click';
  /** <zh/> 自定义内容 | <en/> Function for getting tooltip content  */
  getContent?: (evt: IG6ElementEvent, items: ElementDatum[]) => HTMLElement | string;
  /** <zh/> 触发类型 | <en/> Types of items for which tooltip is allowed to be displayed  */
  enableElements?: ElementType[];
}

export class Tooltip extends BasePlugin<TooltipOptions> {
  static defaultOptions: Partial<TooltipOptions> = {
    trigger: 'hover',
    position: 'top-right',
    enterable: false,
    enableElements: ['node', 'edge', 'combo'],
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

  public getEvents(): { [key: string]: Function } {
    if (this.options.trigger === 'click') {
      return {
        'node:click': this.onClick,
        'edge:click': this.onClick,
        'combo:click': this.onClick,
        'canvas:click': this.onPointerLeave,
        afterremoveitem: this.onPointerLeave,
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

  public update(options: Partial<TooltipOptions>) {
    this.unbundEvents();
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

  private unbundEvents() {
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

  public onClick = (e: IG6ElementEvent) => {
    const {
      targetType,
      target: { id },
    } = e;
    if (this.options.enableElements.indexOf(targetType) === -1) return;
    // click the same item twice, tooltip will be hidden
    if (this.currentTarget === id) {
      this.currentTarget = null;
      this.hideTooltip(e);
    } else {
      this.currentTarget = id;
      this.showTooltip(e);
    }
  };

  public onPointerMove = (e: IG6ElementEvent) => {
    const { targetType, target } = e;
    if (this.options.enableElements.indexOf(targetType) === -1) return;
    if (!this.currentTarget || target.id === this.currentTarget) {
      return;
    }
    this.showTooltip(e);
  };

  public onPointerLeave = (e: IG6ElementEvent) => {
    this.hideTooltip(e);
    this.currentTarget = null;
  };

  public onCanvasMove = (e: IG6ElementEvent) => {
    this.hideTooltip(e);
    this.currentTarget = null;
  };

  private onPointerEnter = (e: IG6ElementEvent) => {
    const { targetType } = e;
    if (this.options.enableElements.indexOf(targetType) === -1) return;
    this.showTooltip(e);
  };

  public showTooltip(e: IG6ElementEvent) {
    const {
      targetType,
      client: { x, y },
      target: { id, attributes },
    } = e;
    if (!this.tooltipElement) return;
    const { getContent } = this.options;
    const { model } = this.context;
    const { color, stroke } = attributes;
    this.currentTarget = id;
    let items: ElementDatum[] = [];
    switch (targetType) {
      case 'node':
        items = model.getNodeData([id]);
        break;
      case 'edge':
        items = model.getEdgeData([id]);
        break;
      case 'combo':
        items = model.getComboData([id]);
        break;
      default:
        break;
    }
    let tooltipContent: { [key: string]: unknown } = {};
    if (getContent) {
      tooltipContent.content = getContent(e, items);
    } else {
      tooltipContent = {
        title: targetType,
        data: items.map((item) => {
          return {
            name: 'ID',
            value: item.id || `${item.source} -> ${item.target}`,
            color: color || stroke,
          };
        }),
      };
    }
    this.tooltipElement.update({
      x,
      y,
      style: {
        '.tooltip': {
          visibility: 'visible',
        },
      },
      ...tooltipContent,
    });
  }

  public hideTooltip(e: IG6ElementEvent) {
    const {
      client: { x, y },
    } = e;
    if (!this.tooltipElement) return;
    this.tooltipElement.hide(x, y);
  }

  private initTooltip = () => {
    const { canvas } = this.context;
    const { center } = canvas.getBounds();
    const $container = canvas.getContainer() as HTMLElement;
    const { top, left } = $container.getBoundingClientRect();
    const { style, position, enterable, container = { x: -left, y: -top } } = this.options;
    const [x, y] = center;
    const [width, height] = canvas.getSize();
    const tooltipElement = new TooltipComponent({
      className: 'tooltip',
      style: {
        x,
        y,
        container,
        bounding: {
          x: 0,
          y: 0,
          width,
          height,
        },
        position,
        enterable,
        title: '',
        offset: [10, 10],
        style,
      },
    });
    this.container?.appendChild(tooltipElement.HTMLTooltipElement);
    return tooltipElement;
  };

  public destroy(): void {
    this.unbundEvents();
    if (this.tooltipElement) {
      this.container?.removeChild(this.tooltipElement.HTMLTooltipElement);
    }
    super.destroy();
  }
}
