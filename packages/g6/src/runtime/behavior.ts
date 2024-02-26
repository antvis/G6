import type { DisplayObject, FederatedPointerEvent, FederatedWheelEvent } from '@antv/g';
import type { BaseBehavior } from '../behaviors/base-behavior';
import { CanvasEvent, ContainerEvent } from '../constants';
import type { BehaviorOptions, CustomBehaviorOption } from '../spec/behavior';
import type { Target } from '../types';
import { eventTargetOf } from '../utils/event';
import { ModuleController } from '../utils/module';
import type { RuntimeContext } from './types';

export class BehaviorController extends ModuleController<BaseBehavior<CustomBehaviorOption>> {
  /** <zh/> 当前事件的目标 | <en/> The current event target */
  private currentTarget: Target | null = null;

  public category: 'widget' | 'behavior' = 'behavior';

  constructor(context: RuntimeContext) {
    super(context);
    this.forwardEvents();
    this.setBehaviors(this.context.options.behaviors || []);
  }

  public setBehaviors(behaviors: BehaviorOptions) {
    this.setModules(behaviors);
  }

  private forwardEvents() {
    const container = this.context.canvas.getContainer();
    if (container) {
      Object.values(ContainerEvent).forEach((name) => {
        container.addEventListener(name, this.forwardContainerEvents.bind(this));
      });
    }

    const canvas = this.context.canvas.document;
    if (canvas) {
      Object.values(CanvasEvent).forEach((name) => {
        canvas.addEventListener(name, this.forwardCanvasEvents.bind(this));
      });
    }
  }

  private forwardCanvasEvents(event: FederatedPointerEvent | FederatedWheelEvent) {
    const target = eventTargetOf(event.target as DisplayObject);
    if (!target) return;
    const { graph, canvas } = this.context;
    const { type: targetType, element: targetElement } = target;
    const { type, detail, button } = event;
    const stdEvent = { ...event, target: targetElement, targetType };

    if (type === CanvasEvent.POINTER_MOVE) {
      if (this.currentTarget !== targetElement) {
        if (this.currentTarget) {
          graph.emit(`${targetType}:${CanvasEvent.POINTER_LEAVE}`, { ...stdEvent, target: this.currentTarget });
        }
        if (targetElement) {
          graph.emit(`${targetType}:${CanvasEvent.POINTER_ENTER}`, stdEvent);
        }
      }
      this.currentTarget = targetElement;
    }

    // 非右键点击事件 / Click event except right click
    if (!(type === CanvasEvent.CLICK && button === 2)) {
      graph.emit(`${targetType}:${type}`, stdEvent);
      graph.emit(type, stdEvent);
    }

    // 双击事件 / Double click event
    if (type === CanvasEvent.CLICK && detail === 2) {
      graph.emit(`${targetType}:${CanvasEvent.DBLCLICK}`, stdEvent);
      graph.emit(CanvasEvent.DBLCLICK, stdEvent);
    }

    // 右键菜单 / ContextMenu
    if (type === CanvasEvent.POINTER_DOWN && button === 2) {
      const contextMenuEvent = {
        ...stdEvent,
        preventDefault: () => {
          canvas.getContainer()?.addEventListener(CanvasEvent.CONTEXT_MENU, (e) => e.preventDefault(), {
            once: true,
          });
        },
      };
      graph.emit(`${targetType}:${CanvasEvent.CONTEXT_MENU}`, contextMenuEvent);
      graph.emit(CanvasEvent.CONTEXT_MENU, contextMenuEvent);
    }
  }

  private forwardContainerEvents(event: FocusEvent | KeyboardEvent) {
    this.context.graph.emit(event.type, event);
  }
}
