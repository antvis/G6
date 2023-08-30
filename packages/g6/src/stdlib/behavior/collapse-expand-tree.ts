import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';

const ALLOWED_TRIGGERS = ['click', 'dblclick'] as const;
type Trigger = (typeof ALLOWED_TRIGGERS)[number];

interface Options {
  /**
   * The key to pressed with mouse click to apply multiple selection.
   * Defaults to `"shift"`.
   * Could be "shift", "ctrl", "alt", or "meta".
   */
  trigger: Trigger;
  /**
   * The event name to trigger when select/unselect an item.
   */
  eventName: string;
  /**
   * Whether disable the collapse / expand animation triggered by this behavior.
   */
  disableAnimate: boolean;
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

const DEFAULT_OPTIONS: Options = {
  trigger: 'click',
  eventName: '',
  disableAnimate: false,
  shouldBegin: () => true,
  shouldUpdate: () => true,
};

export class CollapseExpandTree extends Behavior {
  private timeout: ReturnType<typeof setTimeout> = undefined;

  constructor(options: Partial<Options>) {
    super(Object.assign({}, DEFAULT_OPTIONS, options));
    // Validate options
    if (options.trigger && !ALLOWED_TRIGGERS.includes(options.trigger)) {
      console.warn(
        `G6: Invalid trigger option "${options.trigger}" for collapse-expand-tree behavior!`,
      );
      this.options.trigger = DEFAULT_OPTIONS.trigger;
    }
  }

  getEvents = () => {
    return this.options.trigger === 'dblclick'
      ? {
          'node:dblclick': this.onClick,
        }
      : {
          'node:click': this.onClickBesideDblClick,
        };
  };

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
    const { itemId, itemType } = event;
    const { disableAnimate } = this.options;

    const model = this.graph.getNodeData(itemId);
    if (!model) {
      console.warn(`Node with id ${itemId} is not exist`);
      return;
    }
    this.graph.frontItem(itemId);
    let action = 'expand';
    if (model.data.collapsed) {
      this.graph.expand(itemId, disableAnimate);
    } else {
      this.graph.collapse(itemId, disableAnimate);
      action = 'collapse';
    }

    // Emit an event.
    if (this.options.eventName) {
      this.graph.emit(this.options.eventName, {
        action,
        itemId,
        itemType,
      });
    }
  }
}
