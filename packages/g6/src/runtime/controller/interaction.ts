import { IElement } from '@antv/g';
import { IGraph } from "../../types";
import { registery } from '../../stdlib';
import { getExtension } from "../../util/extension";
import { Behavior } from "../../types/behavior";
import { CANVAS_EVENT_TYPE, DOM_EVENT_TYPE, IG6GraphEvent } from '../../types/event';
import { getItemInfoFromElement, ItemInfo } from '../../util/event';

type Listener = (event: IG6GraphEvent) => void;

/**
 * Wraps the listener with error logging.
 * @returns a new listener with error logging.
 */
const wrapListener = (type: string, eventName: string, listener: Listener): Listener => {
  return (event: any) => {
    try {
      listener(event);
    } catch (error) {
      console.error(`G6: Error occurred in "${eventName}" phase of the behavior "${type}"!`)
      throw error;
    }
  };
}

/**
 * Manages the interaction extensions and graph modes;
 * Storage related data.
 */
export class InteractionController {
  private graph: IGraph;
  private mode: string;

  /**
   * Available behaviors of current mode.
   * @example
   * { 'drag-node': DragNode, 'drag-canvas': DragCanvas }
   */
  private behaviorMap: Map<string, Behavior> = new Map();

  /**
   * Listeners added by all current behaviors.
   * @example
   * {
   *   'drag-node': { 'node:pointerEnter': function },
   * }
   */
  private listenersMap: Record<string, Record<string, Listener>> = {};

  private prevItemInfo: ItemInfo;

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    this.initEvents();
    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap(): void {
    this.graph.hooks.init.tap(() => this.onModeChange({ mode: 'default' }));
    this.onModeChange({ mode: 'default' });
    this.graph.hooks.modechange.tap(params => this.onModeChange(params));
    this.graph.hooks.behaviorchange.tap(params => this.onBehaviorChange(params));
  }

  private validateMode(mode: string): boolean {
    if (mode === 'default') return true;
    const modes = this.graph.getSpecification().modes || {};
    return Object.keys(modes).includes(mode);
  }

  private initBehavior(config: string | { type: string }): Behavior | null {
    const type = typeof config === 'string' ? config : (config as any).type;
    if (this.behaviorMap.has(type)) {
      console.error(`G6: Failed to add behavior "${type}"! It was already added.`);
      return;
    }
    try {
      // Get behavior extensions from useLib.
      const BehaviorClass = getExtension(config, registery.useLib, 'behavior');
      const options = typeof config === 'string' ? {} : config;
      const behavior = new BehaviorClass(options);
      behavior.graph = this.graph;
      if (behavior) {
        this.behaviorMap.set(type, behavior);
      }
      return behavior;
    } catch (error) {
      console.error(`G6: Failed to initialize behavior "${type}"!`, error);
      return null;
    }
  }

  private destroyBehavior(type: string, behavior: Behavior) {
    try {
      behavior.destroy();
    } catch (error) {
      console.error(`G6: Failed to destroy behavior "${type}"!`, error);
    }
  }

  private addListeners(type: string, behavior: Behavior) {
    const events = behavior.getEvents();
    this.listenersMap[type] = {};
    Object.keys(events).forEach(eventName => {
      // Wrap the listener with error logging.
      const listener = wrapListener(type, eventName, events[eventName]);
      this.graph.on(eventName, listener);
      this.listenersMap[type][eventName] = listener;
    });
  }

  private removeListeners(type: string) {
    Object.keys(this.listenersMap[type] || {}).forEach(eventName => {
      const listener = this.listenersMap[type][eventName];
      this.graph.off(eventName, listener);
    });
  }

  /**
   * Listener of graph's init hook. Add listeners from behaviors to graph.
   * @param param contains the mode to switch to
   */
  private onModeChange(param: { mode: string }) {
    const { mode } = param;

    // Skip if set to same mode.
    if (this.mode === mode) {
      return;
    }

    if (!this.validateMode(mode)) {
      console.warn(`G6: Mode "${mode}" was not specified in current graph.`);
    }

    this.mode = mode;

    // 1. Remove listeners && destroy current behaviors.
    this.behaviorMap.forEach((behavior, type) => {
      this.removeListeners(type);
      this.destroyBehavior(type, behavior);
    });

    // 2. Initialize new behaviors.
    this.behaviorMap.clear();
    const behaviorConfigs = this.graph.getSpecification().modes?.[mode] || [];
    behaviorConfigs.forEach(config => {
      this.initBehavior(config);
    });

    // 3. Add listeners for each behavior.
    this.listenersMap = {};
    this.behaviorMap.forEach((behavior, type) => {
      this.addListeners(type, behavior);
    });
  }

  /**
   * Listener of graph's behaviorchange hook. Update, add, or remove behaviors from modes.
   * @param param contains action, modes, and behaviors
   */
  private onBehaviorChange(param: { action: 'update' | 'add' | 'remove', modes: string[], behaviors: (string | { type: string })[] }) {
    const { action, modes, behaviors } = param;
    modes.forEach(mode => {
      // Do nothing if it's not the current mode.
      // Changes are recorded in `graph.specification`. They are applied in onModeChange.
      if (mode !== this.mode) {
        return;
      }

      if (action === 'add') {
        behaviors.forEach(config => {
          const type = typeof config === 'string' ? config : (config as any).type;
          const behavior = this.initBehavior(config);
          if (behavior) {
            this.addListeners(type, behavior);
          }
        });
        return;
      }

      if (action === 'remove') {
        behaviors.forEach(config => {
          const type = typeof config === 'string' ? config : (config as any).type;
          const behavior = this.behaviorMap.get(type);
          if (behavior) {
            this.removeListeners(type);
            this.destroyBehavior(type, behavior);
          }
        });
        return;
      }

      if (action === 'update') {
        behaviors.forEach(config => {
          const type = typeof config === 'string' ? config : (config as any).type;
          const behavior = this.behaviorMap.get(type);
          if (behavior) {
            behavior.updateConfig(config);
          }
        });
      }
    });
  }

  private initEvents = () => {
    Object.values(CANVAS_EVENT_TYPE).forEach(eventName => {
      console.debug('Listen on canvas: ', eventName);
      this.graph.canvas.document.addEventListener(eventName, this.handleCanvasEvent);
    });
    Object.values(DOM_EVENT_TYPE).forEach(eventName => {
      this.graph.canvas.getContextService().getDomElement().addEventListener(eventName, this.handleDOMEvent);
    });
  }

  private handleCanvasEvent = (gEvent: Event) => {
    const debug = gEvent.type.includes('over') || gEvent.type.includes('move') ? () => {} : console.debug;

    // Find the Node/Edge/Combo group element.
    // const itemGroup = findItemGroup(gEvent.target as IElement);
    // const itemType = itemGroup?.getAttribute('data-item-type') || 'canvas';
    // const itemId = itemGroup?.getAttribute('data-item-id') || 'CANVAS';

    const itemInfo = getItemInfoFromElement(gEvent.target as IElement);
    if (!itemInfo) {
      // This event was triggered from an element which belongs to none of the nodes/edges/canvas.
      return;
    }

    // GEvent => G6Event
    const { itemType, itemId } = itemInfo;
    const event: IG6GraphEvent = {
      ...gEvent,
      itemType,
      itemId,
      gEvent,
      // Set currentTarget to this.graph instead of canvas.
      // Because we add listeners like this: `graph.on('node:click', listener)`.
      currentTarget: this.graph,
    };

    // Trigger a dblclick event.
    if (event.type === 'click' && (event as any as MouseEvent).detail === 2) {
      this.handleCanvasEvent({
        ...gEvent,
        type: 'dblclick',
      });
    }

    // Canvas Events
    if (event.itemType === 'canvas') {
      if (event.type === 'pointermove') {
        this.handlePointerMove(event);
      }
      this.graph.emit(`canvas:${gEvent.type}`, event);
      debug(`Canvas ${event.type} :`, event);
      return;
    }

    // Item Events (Node/Edge)
    if (itemType === 'node' || itemType === 'edge') {
      if (event.type === 'pointermove' || event.type === 'pointerleave') {
        this.handlePointerMove(event);
      }
      this.graph.emit(`${itemType}:${gEvent.type}`, event);
      debug(`Item ${event.type} :`, event);
    }
  }

  /**
   * Emit item's pointerleave/pointerenter events when pointer moves on the canvas.
   */
  private handlePointerMove = (event: IG6GraphEvent) => {
    const prevItemInfo = this.prevItemInfo;
    const curItemInfo = getItemInfoFromElement(event.target as IElement);
    if (prevItemInfo?.itemId !== curItemInfo?.itemId) {
      if (prevItemInfo) {
        const preType = prevItemInfo.itemType;
        this.graph.emit(`${preType}:pointerleave`, {
          ...event,
          type: 'pointerleave',
          target: prevItemInfo.groupElement,
        });
        console.debug(`${preType}:pointerleave`, {
          ...event,
          type: 'pointerleave',
          target: prevItemInfo.groupElement,
        });
      }
      if (curItemInfo) {
        const curType = curItemInfo.itemType;
        this.graph.emit(`${curType}:pointerenter`, {
          ...event,
          type: 'pointerenter',
          target: curItemInfo.groupElement,
        });
        console.debug(`${curType}:pointerenter`, {
          ...event,
          type: 'pointerenter',
          target: curItemInfo.groupElement,
        });
      }
    }
    this.prevItemInfo = curItemInfo;
  };

  private handleDOMEvent = (event: Event) => {
    this.graph.emit(event.type, event);
  };
}
