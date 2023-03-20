import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';

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
   * Defaults to `["nodes"]`.
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

const DEFAULT_OPTIONS: ClickSelectOptions ={
  multiple: true,
  trigger: 'shift',
  selectedState: 'selected',
  itemTypes: ['node'],
  eventName: '',
  shouldBegin: () => true,
  shouldUpdate: () => true,
};

export default class ClickSelect extends Behavior {
  options: ClickSelectOptions;

  constructor(options: Partial<ClickSelectOptions>) {
    super(Object.assign({}, DEFAULT_OPTIONS, options));
    // Validate options
    if (options.trigger && !ALLOWED_TRIGGERS.includes(options.trigger)) {
      console.warn(`G6: Invalid trigger option "${options.trigger}" for click-select behavior!`);
      this.options.trigger = DEFAULT_OPTIONS.trigger;
    }
  }

  getEvents = () => {
    return {
      'node:click': this.onClick,
      'canvas:click': this.onCanvasClick,
    }
  }

  private isMultipleSelect = (event: MouseEvent) => {
    if (!this.options.multiple) return false;
    const key = this.options.trigger;
    const keyMap: Record<Trigger, boolean> = {
      shift: event.shiftKey,
      ctrl: event.ctrlKey,
      alt: event.altKey,
      meta: event.metaKey,
    };
    return keyMap[this.options.trigger];
  };

  onClick = (event: IG6GraphEvent) => {
    if (!this.options.shouldBegin(event)) return;

    // Will not be 'canvas' because this method is listened on node and edge click.
    const itemType = event.itemType as 'node' | 'edge' | 'combo';
    const itemId = event.itemId;

    const selectable = this.options.itemTypes.includes(itemType);
    if (!selectable) return;

    const state = this.options.selectedState;
    const multiple = this.isMultipleSelect(event as any);
    // FIXME: should use graph.getItemState() instead
    const isSelectAction = this.graph.findIdByState(itemType, state).includes(itemId);
    const action: 'select' | 'unselect' = isSelectAction ? 'unselect' : 'select';

    // Select/Unselect item.
    if (this.options.shouldUpdate(event)) {
      if (multiple) {
        this.graph.setItemState(itemId, state, isSelectAction);
      } else {
        // Not multiple, clear all currently selected items
        const selectedItemIds = [
          ...this.graph.findIdByState('node', state),
          ...this.graph.findIdByState('edge', state),
          ...this.graph.findIdByState('combo', state),
        ];
        this.graph.setItemState(selectedItemIds, state, false);
        this.graph.setItemState(itemId, state, isSelectAction);
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
  };

  onCanvasClick = (event: IG6GraphEvent) => {
    if (!this.options.shouldBegin(event)) return;

    // Find current selected items.
    const state = this.options.selectedState;
    const selectedItemIds = [
      ...this.graph.findIdByState('node', state),
      ...this.graph.findIdByState('edge', state),
      ...this.graph.findIdByState('combo', state),
    ];
    if (!selectedItemIds.length) return;

    // Unselect all items.
    if (this.options.shouldUpdate(event)) {
      this.graph.setItemState(selectedItemIds, state, false);
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
};
