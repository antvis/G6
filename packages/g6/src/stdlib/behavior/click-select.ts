import { ID } from '@antv/graphlib';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';
import { Point } from '../../types/common';

const ALLOWED_TRIGGERS = ['shift', 'ctrl', 'alt', 'meta'] as const;
type Trigger = (typeof ALLOWED_TRIGGERS)[number];

interface ClickSelectOptions {
  /**
   * Whether to allow multiple selection.
   * Defaults to true.
   * If set to false, `trigger` options will be ignored.
   */
  multiple: boolean;
  /**
   * The key to pressed with mouse click to apply multiple selection.
   * Defaults to `"shift"`.
   * Could be "shift", "ctrl", "alt", or "meta".
   */
  trigger: Trigger;
  /**
   * Item types to be able to select.
   * Defaults to `["node"]`.
   * Should be an array of "node", "edge", or "combo".
   */
  itemTypes: Array<'node' | 'edge' | 'combo'>;
  /**
   * The state to be applied when select.
   * Defaults to `"selected"`.
   * Can be set to "active", "highlighted", etc.
   */
  selectedState: 'selected'; // TODO: Enum
  /**
   * The event name to trigger when select/unselect an item.
   */
  eventName: string;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin: (event: IG6GraphEvent) => boolean;
  /**
   * Whether to update item state.
   * If it returns false, you may probably listen to `eventName` and
   * manage states or data manually
   */
  shouldUpdate: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: ClickSelectOptions = {
  multiple: true,
  trigger: 'shift',
  selectedState: 'selected',
  itemTypes: ['node', 'edge'],
  eventName: '',
  shouldBegin: () => true,
  shouldUpdate: () => true,
};

export class ClickSelect extends Behavior {
  /**
   * Cache the ids of items selected by this behavior
   */
  private selectedIds: ID[] = [];
  /**
   * Two flag to avoid onCanvasClick triggered while dragging canvas
   */
  private canvasPointerDown: Point | undefined = undefined;
  private canvasPointerMove = false;
  private timeout: ReturnType<typeof setTimeout> = undefined;

  constructor(options: Partial<ClickSelectOptions>) {
    super(Object.assign({}, DEFAULT_OPTIONS, options));
    // Validate options
    if (options.trigger && !ALLOWED_TRIGGERS.includes(options.trigger)) {
      console.warn(
        `G6: Invalid trigger option "${options.trigger}" for click-select behavior!`,
      );
      this.options.trigger = DEFAULT_OPTIONS.trigger;
    }
  }

  getEvents = () => {
    return {
      'node:click': this.onClick,
      'edge:click': this.onClick,
      'combo:click': this.onClickBesideDblClick,
      'canvas:pointerdown': this.onCanvasPointerDown,
      'canvas:pointermove': this.onCanvasPointerMove,
      'canvas:pointerup': this.onCanvasPointerUp,
    };
  };

  private isMultipleSelect(event: MouseEvent) {
    if (!this.options.multiple) return false;
    const keyMap: Record<Trigger, boolean> = {
      shift: event.shiftKey,
      ctrl: event.ctrlKey,
      alt: event.altKey,
      meta: event.metaKey,
    };
    return keyMap[this.options.trigger];
  }

  public onClickBesideDblClick(event: IG6GraphEvent) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
      return;
    }
    this.timeout = setTimeout(() => {
      this.timeout = undefined;
      this.onClick(event);
    }, 200);
  }

  public onClick(event: IG6GraphEvent) {
    if (!this.options.shouldBegin(event)) return;

    // Will not be 'canvas' because this method is listened on node and edge click.
    const itemType = event.itemType as 'node' | 'edge' | 'combo';
    const itemId = event.itemId;

    const selectable = this.options.itemTypes.includes(itemType);
    if (!selectable) return;

    const state = this.options.selectedState;
    const multiple = this.isMultipleSelect(event as any);
    // FIXME: should use graph.getItemState() instead
    const isSelectAction = !this.graph
      .findIdByState(itemType, state)
      .includes(itemId);
    const action: 'select' | 'unselect' = isSelectAction
      ? 'select'
      : 'unselect';

    // Select/Unselect item.
    if (this.options.shouldUpdate(event)) {
      this.graph.batch(() => {
        if (!multiple) {
          // Not multiple, clear all currently selected items
          this.graph.setItemState(this.selectedIds, state, false);
        }
        this.graph.setItemState(itemId, state, isSelectAction);
      });

      if (isSelectAction) {
        this.selectedIds.push(itemId);
      } else {
        this.selectedIds.filter((id) => id !== itemId);
      }
    }

    // Emit an event.
    if (this.options.eventName) {
      const selectedNodeIds = this.graph.findIdByState('node', state);
      const selectedEdgeIds = this.graph.findIdByState('edge', state);
      const selectedComboIds = this.graph.findIdByState('combo', state);
      this.graph.emit(this.options.eventName, {
        action,
        itemId,
        itemType,
        selectedNodeIds,
        selectedEdgeIds,
        selectedComboIds,
      });
    }
  }

  public onCanvasPointerDown(event: IG6GraphEvent) {
    this.canvasPointerDown = {
      x: event.canvas.x,
      y: event.canvas.y,
    };
    this.canvasPointerMove = false;
  }
  public onCanvasPointerMove(event: IG6GraphEvent) {
    if (this.canvasPointerDown) {
      const deltaX = Math.abs(this.canvasPointerDown.x - event.canvas.x);
      const deltaY = Math.abs(this.canvasPointerDown.y - event.canvas.y);
      if (deltaX > 1 || deltaY > 1) this.canvasPointerMove = true;
    }
  }

  public onCanvasPointerUp(event: IG6GraphEvent) {
    if (this.canvasPointerDown && !this.canvasPointerMove)
      this.onCanvasClick(event);
    this.canvasPointerDown = undefined;
    this.canvasPointerMove = false;
  }

  public onCanvasClick(event: IG6GraphEvent) {
    if (!this.options.shouldBegin(event)) return;

    // Find current selected items.
    const state = this.options.selectedState;
    if (!this.selectedIds.length) return;

    // Unselect all items.
    if (this.options.shouldUpdate(event)) {
      this.graph.setItemState(this.selectedIds, state, false);
    }

    // Emit an event.
    if (this.options.eventName) {
      this.graph.emit(this.options.eventName, {
        action: 'unselect',
        itemId: '',
        itemType: '',
        selectedNodeIds: [],
        selectedEdgeIds: [],
        selectedComboIds: [],
      });
    }
  }
}
