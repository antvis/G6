import { FederatedPointerEvent, IElement } from '@antv/g';
import { getPlugin } from '../../plugin/register';
import { Graph } from '../../types';
import { Behavior } from '../../types/behavior';
import { CANVAS_EVENT_TYPE, DOM_EVENT_TYPE, IG6GraphEvent } from '../../types/event';
import { ItemInfo, getContextMenuEventProps, getItemInfoFromElement } from '../../utils/event';
import { warn } from '../../utils/invariant';

type Listener = (event: IG6GraphEvent) => void;

/**
 * Wraps the listener with error logging.
 * @param type
 * @param eventName
 * @param listener
 * @returns a new listener with error logging.
 */
const wrapListener = (type: string, eventName: string, listener: Listener): Listener => {
  return (event: any) => {
    try {
      listener(event);
    } catch (error) {
      error(`G6: Error occurred in "${eventName}" phase of the behavior "${type}"!`);
      throw error;
    }
  };
};

/**
 * Manages the interaction extensions and graph modes;
 * Storage related data.
 */
export class InteractionController {
  private graph: Graph;
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

  constructor(graph: Graph<any, any>) {
    this.graph = graph;
    this.initEvents();
    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap = (): void => {
    this.graph.hooks.init.tap(() => this.onModeChange({ mode: 'default' }));
    this.onModeChange({ mode: 'default' });
    this.graph.hooks.modechange.tap(this.onModeChange);
    this.graph.hooks.behaviorchange.tap(this.onBehaviorChange);
  };

  private validateMode = (mode: string): boolean => {
    if (mode === 'default') return true;
    const modes = this.graph.getSpecification().modes || {};
    return Object.keys(modes).includes(mode);
  };

  private initBehavior = (config: string | { type: string; key: string }): Behavior | null => {
    const key = typeof config === 'string' ? config : (config as any).key || (config as any).type;
    if (this.behaviorMap.has(key)) {
      error(`G6: Failed to add behavior with key or type "${key}"! It was already added.`);
      return;
    }
    try {
      // Get behavior extensions from useLib.
      const type = typeof config === 'string' ? config : (config as any).type;
      const BehaviorClass = getPlugin('behavior', type);
      const options = typeof config === 'string' ? {} : config;
      // @ts-ignore
      const behavior = new BehaviorClass(options);
      behavior.graph = this.graph;
      if (behavior) {
        this.behaviorMap.set(key, behavior);
      }
      return behavior;
    } catch (error) {
      error(`G6: Failed to initialize behavior with key or type "${key}"!`, error);
      return null;
    }
  };

  private destroyBehavior = (key: string, behavior: Behavior) => {
    try {
      this.behaviorMap.delete(key);
      behavior.destroy();
    } catch (error) {
      error(`G6: Failed to destroy behavior with key or type "${key}"!`, error);
    }
  };

  private addListeners = (key: string, behavior: Behavior) => {
    const events = behavior.getEvents();
    this.listenersMap[key] = {};
    Object.keys(events).forEach((eventName) => {
      // Wrap the listener with error logging.
      const listener = wrapListener(key, eventName, events[eventName].bind(behavior));
      this.graph.on(eventName, listener);
      this.listenersMap[key][eventName] = listener;
    });
  };

  private removeListeners = (key: string) => {
    Object.keys(this.listenersMap[key] || {}).forEach((eventName) => {
      const listener = this.listenersMap[key][eventName];
      this.graph.off(eventName, listener);
    });
  };

  /**
   * Listener of graph's init hook. Add listeners from behaviors to graph.
   * @param param contains the mode to switch to
   * @param param.mode
   */
  private onModeChange = (param: { mode: string }) => {
    const { mode } = param;

    // Skip if set to same mode.
    if (this.mode === mode) {
      return;
    }

    if (!this.validateMode(mode)) {
      warn(`G6: Mode "${mode}" was not specified in current graph.`);
    }

    this.mode = mode;

    // 1. Remove listeners && destroy current behaviors.
    this.behaviorMap.forEach((behavior, key) => {
      this.removeListeners(key);
      this.destroyBehavior(key, behavior);
    });

    // 2. Initialize new behaviors.
    this.behaviorMap.clear();
    const behaviorConfigs = this.graph.getSpecification().modes?.[mode] || [];
    behaviorConfigs.forEach((config) => {
      this.initBehavior(config);
    });

    // 3. Add listeners for each behavior.
    this.listenersMap = {};
    this.behaviorMap.forEach((behavior, key) => {
      this.addListeners(key, behavior);
    });
  };

  public getMode() {
    return this.mode;
  }

  /**
   * Listener of graph's behaviorchange hook. Update, add, or remove behaviors from modes.
   * @param param contains action, modes, and behaviors
   * @param param.action
   * @param param.modes
   * @param param.behaviors
   */
  private onBehaviorChange = (param: {
    action: 'update' | 'add' | 'remove';
    modes: string[];
    behaviors: (string | { type: string; key: string })[];
  }) => {
    const { action, modes, behaviors } = param;
    modes.forEach((mode) => {
      // Do nothing if it's not the current mode.
      // Changes are recorded in `graph.specification`. They are applied in onModeChange.
      if (mode !== this.mode) {
        return;
      }

      if (action === 'add') {
        behaviors.forEach((config) => {
          const key = typeof config === 'string' ? config : (config as any).key || (config as any).type;
          const behavior = this.initBehavior(config);
          if (behavior) {
            this.addListeners(key, behavior);
          }
        });
        return;
      }

      if (action === 'remove') {
        behaviors.forEach((config) => {
          const key = typeof config === 'string' ? config : (config as any).key || (config as any).type;
          const behavior = this.behaviorMap.get(key);
          if (behavior) {
            this.removeListeners(key);
            this.destroyBehavior(key, behavior);
          }
        });
        return;
      }

      if (action === 'update') {
        behaviors.forEach((config) => {
          const key = typeof config === 'string' ? config : (config as any).key || (config as any).type;
          const behavior = this.behaviorMap.get(key);
          if (behavior) {
            behavior.updateConfig(config);
          }
        });
      }
    });
  };

  private initEvents = () => {
    Object.values(CANVAS_EVENT_TYPE).forEach((eventName) => {
      this.graph.canvas.document.addEventListener(eventName, this.handleCanvasEvent);
    });
    const $dom = this.graph.canvas.getContextService().getDomElement();
    Object.values(DOM_EVENT_TYPE).forEach((eventName) => {
      if ($dom && $dom.addEventListener) {
        $dom.addEventListener(eventName, this.handleDOMEvent);
      }
    });
  };

  private handleCanvasEvent = (gEvent: FederatedPointerEvent) => {
    const itemInfo = getItemInfoFromElement(gEvent.target as IElement);

    if (!itemInfo) {
      // This event was triggered from an element which belongs to none of the nodes/edges/canvas.
      return;
    }

    // GEvent => G6Event
    const { itemType, itemId } = itemInfo;
    const event = {
      ...gEvent,
      itemType,
      itemId,
      gEvent,
      stopPropagation: gEvent.stopPropagation,
      // Set currentTarget to this.graph instead of canvas.
      // Because we add listeners like this: `graph.on('node:click', listener)`.
      currentTarget: this.graph,
    } as unknown as IG6GraphEvent;

    // Trigger a dblclick event.
    if (event.type === 'click' && (event as any as MouseEvent).detail === 2) {
      this.handleCanvasEvent({
        ...gEvent,
        type: 'dblclick',
      } as FederatedPointerEvent);
    }

    const isRightClick = event.type === 'click' && event.button === 2;

    // Canvas Events
    if (event.itemType === 'canvas') {
      if (event.type === 'pointermove') {
        this.handlePointerMove(event);
      }
      if (!isRightClick) {
        this.graph.emit(`canvas:${gEvent.type}`, event);
        this.graph.emit(`${gEvent.type}`, event);
      }

      // contextmenu event for canvas
      if (event.type === 'pointerdown' && event.button === 2) {
        const contextMenuEvent = getContextMenuEventProps(event, this.graph);
        this.graph.emit(`canvas:contextmenu`, contextMenuEvent);
        this.graph.emit('contextmenu', contextMenuEvent);
      }
      // debug(`Canvas ${event.type} :`, event);
      return;
    }

    // Item Events (Node/Edge/Combo)
    if (itemType === 'node' || itemType === 'edge' || itemType === 'combo') {
      if (event.type === 'pointermove' || event.type === 'pointerleave') {
        this.handlePointerMove(event);
      }
      if (!isRightClick) {
        this.graph.emit(`${itemType}:${gEvent.type}`, event);
        this.graph.emit(`${gEvent.type}`, event);
      }

      // contextmenu event for node, edge, or combo
      if (event.type === 'pointerdown' && event.button === 2) {
        const contextMenuEvent = getContextMenuEventProps(event, this.graph);
        this.graph.emit(`${itemType}:contextmenu`, contextMenuEvent);
        this.graph.emit('contextmenu', contextMenuEvent);
      }
    }
  };

  /**
   * Emit item's pointerleave/pointerenter events when pointer moves on the canvas.
   * @param event
   */
  private handlePointerMove = (event: IG6GraphEvent) => {
    const prevItemInfo = this.prevItemInfo;
    const curItemInfo = getItemInfoFromElement(event.target as IElement);
    if (prevItemInfo?.itemId !== curItemInfo?.itemId) {
      if (prevItemInfo) {
        const preType = prevItemInfo.itemType;
        this.graph.emit(`${preType}:pointerleave`, {
          ...event,
          itemId: prevItemInfo.itemId,
          itemType: prevItemInfo.itemType,
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
      }
    }
    this.prevItemInfo = curItemInfo;
  };

  private handleDOMEvent = (event: Event) => {
    this.graph.emit(event.type, event);
  };
}
