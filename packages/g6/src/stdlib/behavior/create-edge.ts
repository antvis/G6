import { warn } from 'util/warn';
import { Behavior } from 'types/behavior';
import type { ID, IG6GraphEvent, EdgeModel } from 'types';

const KEYBOARD_TRIGGERS = ['shift', 'ctrl', 'control', 'alt', 'meta'] as const;
const EVENT_TRIGGERS = ['click', 'drag'] as const;

enum Events {
  BEFORE_ADDING_EDGE = 'beforeaddingedge',
  AFTER_ADDING_EDGE = 'afteraddingedge',
}

// type Trigger = (typeof EVENT_TRIGGERS)[number];

interface CreateEdgeOptions {
  /**
   * The triggering conditions for this interaction can be either 'click' or 'drag'.
   * Default to `click`.
   */
  trigger: (typeof EVENT_TRIGGERS)[number];

  /**
   * Keyboard keys serve as auxiliary triggers for this interaction.
   * cound be 'shift', 'ctrl', 'control', 'alt', 'meta', undefined.
   */
  key?: (typeof KEYBOARD_TRIGGERS)[number];

  /**
   * Config of the created edge.
   */
  edgeConfig: any;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin: (event: IG6GraphEvent) => boolean;
  /**
   *
   *  Whether it is allowed to end the creation of edges under the current conditions being operated.
   */
  shouldEnd: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: CreateEdgeOptions = {
  trigger: 'click',
  key: undefined,
  shouldBegin: () => true,
  shouldEnd: () => true,
  edgeConfig: {},
};

export default class CreateEdge extends Behavior {
  isKeyDown = false;

  addingEdge = null;

  constructor(options: Partial<CreateEdgeOptions>) {
    super(Object.assign({}, DEFAULT_OPTIONS, options));
    this.validateOptions(options);
  }

  validateOptions(options: Partial<CreateEdgeOptions>) {
    if (options.trigger && !EVENT_TRIGGERS.includes(options.trigger)) {
      warn({
        optionName: `create-edge.trigger`,
        shouldBe: EVENT_TRIGGERS,
        now: options.trigger,
        scope: 'behavior',
      });

      this.options.trigger = DEFAULT_OPTIONS.trigger;
    }

    if (options.key && !KEYBOARD_TRIGGERS.includes(options.key)) {
      warn({
        optionName: `create-edge.key`,
        shouldBe: KEYBOARD_TRIGGERS,
        now: options.key,
        scope: 'behavior',
      });
      this.options.key = DEFAULT_OPTIONS.key;
    }
  }

  getEvents = () => {
    const { trigger, key } = this.options;
    const [CLICK_NAME] = EVENT_TRIGGERS;

    const triggerEvents =
      trigger === CLICK_NAME
        ? {
            'node:click': this.onClick,
            mousemove: this.updateEndPoint,
            'edge:click': this.cancelCreating,
            'canvas:click': this.cancelCreating,
            'combo:click': this.onClick,
          }
        : {
            'node:dragstart': this.onClick,
            'combo:dragstart': this.onClick,
            drag: this.updateEndPoint,
            'node:drop': this.onClick,
            'combo:drop': this.onClick,
            dragend: this.onDragEnd,
          };

    const keyboardEvents = key
      ? {
          keydown: this.onKeyDown,
          keyup: this.onKeyUp,
        }
      : {};

    return { ...triggerEvents, ...keyboardEvents };
  };

  onClick = (e: IG6GraphEvent) => {
    if (this.options.shouldEnd(e)) {
      return;
    }

    const { graph, options, addingEdge } = this;
    const currentNodeId = e.itemId;

    const edgeConfig = options.edgeConfig;

    if (addingEdge) {
      const updateConfig = {
        target: currentNodeId,
        ...edgeConfig,
        type: currentNodeId === addingEdge.source ? 'loop' : edgeConfig.type,
      };

      graph.emit(Events.BEFORE_ADDING_EDGE);
      graph.updateData('edge', updateConfig);
      graph.emit(Events.AFTER_ADDING_EDGE, { edge: addingEdge });

      addingEdge.getKeyShape().set('capture', true);

      this.addingEdge = null;
    } else {
      this.addingEdge = graph.addData('edge', {
        source: currentNodeId,
        target: currentNodeId,
        ...edgeConfig,
      });

      this.addingEdge.getKeyShape().set('capture', false);
    }
  };

  onDragEnd = (e: IG6GraphEvent) => {
    if (this.options.key && !this.isKeyDown) {
      return;
    }

    if (this.addingEdge) {
      return;
    }

    const { itemId, itemType } = e;

    if (!itemId || itemId === this.addingEdge.source || itemType !== 'node') {
      this.cancelCreating();
    }
  };

  updateEndPoint = (e: IG6GraphEvent) => {
    const { options, graph, addingEdge, isKeyDown } = this;
    if (options.key && !isKeyDown) {
      return;
    }

    if (!addingEdge) {
      return;
    }

    const point = { x: e.x, y: e.y };
    const sourceId = addingEdge.source;
    if (!graph.findById(sourceId)) {
      this.addingEdge = null;
      return;
    }

    graph.updateItem(
      addingEdge,
      {
        target: point,
      },
      false,
    );
  };

  cancelCreating = () => {
    if (!this.addingEdge) {
      return;
    }

    this.removeAddingEdge();
  };

  onKeyDown = (e: KeyboardEvent) => {
    const code = e.key;

    if (!code) {
      return;
    }

    if (code.toLocaleLowerCase() === this.options.key) {
      this.isKeyDown = true;
    }
  };

  onKeyUp() {
    if (this.addingEdge) {
      this.graph.removeItem(this.addingEdge);
    }
    this.isKeyDown = false;
  }

  removeAddingEdge() {
    if (this.addingEdge) {
      this.graph.removeItem(this.addingEdge);
      this.addingEdge = null;
    }
  }
}
