import type { DisplayObject, FederatedPointerEvent, FederatedWheelEvent } from '@antv/g';
import type { BaseBehavior } from '../behaviors/base-behavior';
import { CommonEvent, ContainerEvent } from '../constants';
import { ExtensionController } from '../registry/extension';
import type { BehaviorOptions, CustomBehaviorOption } from '../spec/behavior';
import type { Target } from '../types';
import { isToBeDestroyed } from '../utils/element';
import { eventTargetOf } from '../utils/event';
import type { RuntimeContext } from './types';

export class BehaviorController extends ExtensionController<BaseBehavior<CustomBehaviorOption>> {
  /**
   * <zh/> 当前事件的目标
   *
   *  <en/> The current event target
   */
  private currentTarget: Target | null = null;

  private currentTargetType: string | null = null;

  public category = 'behavior' as const;

  constructor(context: RuntimeContext) {
    super(context);
    this.forwardEvents();
    this.setBehaviors(this.context.options.behaviors || []);
  }

  public setBehaviors(behaviors: BehaviorOptions) {
    this.setExtensions(behaviors);
  }

  private forwardEvents() {
    const container = this.context.canvas.getContainer();
    if (container) {
      [ContainerEvent.KEY_DOWN, ContainerEvent.KEY_UP].forEach((name) => {
        container.addEventListener(name, this.forwardContainerEvents);
      });
    }

    const canvas = this.context.canvas.document;
    if (canvas) {
      [
        CommonEvent.CLICK,
        CommonEvent.DBLCLICK,
        CommonEvent.POINTER_OVER,
        CommonEvent.POINTER_LEAVE,
        CommonEvent.POINTER_ENTER,
        CommonEvent.POINTER_MOVE,
        CommonEvent.POINTER_OUT,
        CommonEvent.POINTER_DOWN,
        CommonEvent.POINTER_UP,
        CommonEvent.CONTEXT_MENU,
        CommonEvent.DRAG_START,
        CommonEvent.DRAG,
        CommonEvent.DRAG_END,
        CommonEvent.DRAG_ENTER,
        CommonEvent.DRAG_OVER,
        CommonEvent.DRAG_LEAVE,
        CommonEvent.DROP,
        CommonEvent.WHEEL,
      ].forEach((name) => {
        canvas.addEventListener(name, this.forwardCanvasEvents);
      });
    }
  }

  private forwardCanvasEvents = (event: FederatedPointerEvent | FederatedWheelEvent) => {
    const { target: originalTarget } = event;
    const target = eventTargetOf(originalTarget as DisplayObject);
    if (!target) return;
    const { graph, canvas } = this.context;
    const { type: targetType, element: targetElement } = target;
    // 即将销毁或已销毁的元素不再触发事件
    // Elements that are about to be destroyed or have been destroyed no longer trigger events
    if ('destroyed' in targetElement && (isToBeDestroyed(targetElement) || targetElement.destroyed)) return;

    const { type, detail, button } = event;
    const stdEvent = { ...event, target: targetElement, targetType, originalTarget };

    if (type === CommonEvent.POINTER_MOVE) {
      if (this.currentTarget !== targetElement) {
        if (this.currentTarget) {
          graph.emit(`${this.currentTargetType}:${CommonEvent.POINTER_LEAVE}`, {
            ...stdEvent,
            type: CommonEvent.POINTER_LEAVE,
            target: this.currentTarget,
            targetType: this.currentTargetType,
          });
        }
        if (targetElement) {
          Object.assign(stdEvent, { type: CommonEvent.POINTER_ENTER });
          graph.emit(`${targetType}:${CommonEvent.POINTER_ENTER}`, stdEvent);
        }
      }
      this.currentTarget = targetElement;
      this.currentTargetType = targetType;
    }

    // 非右键点击事件 / Click event except right click
    if (!(type === CommonEvent.CLICK && button === 2)) {
      graph.emit(`${targetType}:${type}`, stdEvent);
      graph.emit(type, stdEvent);
    }

    // 双击事件 / Double click event
    if (type === CommonEvent.CLICK && detail === 2) {
      Object.assign(stdEvent, { type: CommonEvent.DBLCLICK });
      graph.emit(`${targetType}:${CommonEvent.DBLCLICK}`, stdEvent);
      graph.emit(CommonEvent.DBLCLICK, stdEvent);
    }

    // 右键菜单 / Contextmenu
    if (type === CommonEvent.POINTER_DOWN && button === 2) {
      Object.assign(stdEvent, {
        type: CommonEvent.CONTEXT_MENU,
        preventDefault: () => {
          canvas.getContainer()?.addEventListener(CommonEvent.CONTEXT_MENU, (e) => e.preventDefault(), {
            once: true,
          });
        },
      });
      graph.emit(`${targetType}:${CommonEvent.CONTEXT_MENU}`, stdEvent);
      graph.emit(CommonEvent.CONTEXT_MENU, stdEvent);
    }
  };

  private forwardContainerEvents = (event: FocusEvent | KeyboardEvent) => {
    this.context.graph.emit(event.type, event);
  };

  public destroy(): void {
    const container = this.context.canvas.getContainer();
    if (container) {
      [ContainerEvent.KEY_DOWN, ContainerEvent.KEY_UP].forEach((name) => {
        container.removeEventListener(name, this.forwardContainerEvents);
      });
    }
    this.context.canvas.document.removeAllEventListeners();
    super.destroy();
  }
}
