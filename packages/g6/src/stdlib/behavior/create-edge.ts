import type { ID, IG6GraphEvent, EdgeModel } from '../../types';
import { warn } from '../../util/warn';
import { generateEdgeID } from '../../util/item';
import { Behavior } from '../../types/behavior';

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
  shouldEnd: () => false,
  edgeConfig: {},
};

export default class CreateEdge extends Behavior {
  isKeyDown = false;
  addingEdge = null;
  dummyNode = null;

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
            'node:click': this.handleCreateEdge,
            mousemove: this.updateEndPoint,
            'edge:click': this.cancelCreating,
            'canvas:click': this.cancelCreating,
            'combo:click': this.handleCreateEdge,
          }
        : {
            'node:dragstart': this.handleCreateEdge,
            'combo:dragstart': this.handleCreateEdge,
            drag: this.updateEndPoint,
            'node:drop': this.handleCreateEdge,
            'combo:drop': this.handleCreateEdge,
            dragend: this.onDragEnd,
          };

    const keyboardEvents = key
      ? {
          keydown: this.onKeyDown,
          keyup: this.onKeyUp,
        }
      : {};

    return { ...triggerEvents, ...keyboardEvents } as Record<
      string,
      (e: IG6GraphEvent) => void
    >;
  };

  handleCreateEdge = (e: IG6GraphEvent) => {
    if (this.options.shouldEnd(e)) {
      return;
    }

    const { graph, options, addingEdge } = this;
    const currentNodeId = e.itemId;

    const edgeConfig = options.edgeConfig;
    const isDragTrigger = options.trigger === 'drag';

    if (addingEdge) {
      const updateConfig = {
        id: addingEdge.id,
        source: addingEdge.source,
        target: currentNodeId,
        data: {
          type: currentNodeId === addingEdge.source ? 'loop' : edgeConfig.type,
          ...edgeConfig,
        },
      };

      graph.emit(Events.BEFORE_ADDING_EDGE);
      graph.updateData('edge', updateConfig);
      graph.emit(Events.AFTER_ADDING_EDGE, { edge: addingEdge });
      if (!isDragTrigger) {
        // this.cancelCreating();
        this.addingEdge = null;
      }

      return;
    }

    if (isDragTrigger) {
      this.dummyNode = graph.addData('node', {
        id: 'dummy',
        data: {
          // type: 'circle-node',
          r: 1,
          label: '',
        },
      });
    }

    this.addingEdge = graph.addData('edge', {
      id: generateEdgeID(currentNodeId, currentNodeId),
      source: currentNodeId,
      target: isDragTrigger ? 'dummy' : currentNodeId,
      data: {
        ...edgeConfig,
      },
    } as EdgeModel);
  };

  onDragEnd = (e: IG6GraphEvent) => {
    const { addingEdge, options, graph } = this;

    const { edgeConfig, key } = options;
    if (key && !this.isKeyDown) {
      return;
    }

    if (addingEdge) {
      return;
    }

    const { itemId, itemType } = e;

    if (
      !itemId ||
      itemId === addingEdge.source ||
      itemType !== 'node' ||
      itemId === 'dummy'
    ) {
      this.cancelCreating();
    }

    const updateConfig = {
      id: addingEdge.id,
      source: addingEdge.source,
      target: itemId,
      data: {
        type: itemId === addingEdge.source ? 'loop' : edgeConfig.type,
        ...edgeConfig,
      },
    };

    graph.emit(Events.BEFORE_ADDING_EDGE);
    graph.updateData('edge', updateConfig);
    graph.emit(Events.AFTER_ADDING_EDGE, { edge: addingEdge });
    this.cancelCreating();
  };

  updateEndPoint = (e: IG6GraphEvent) => {
    const { options, graph, addingEdge, isKeyDown } = this;
    if (options.key && !isKeyDown) {
      return;
    }

    if (!addingEdge) {
      return;
    }

    const sourceId = addingEdge.source,
      targetId = addingEdge.target;

    if (!graph.getItemById(sourceId)) {
      this.addingEdge = null;
      return;
    }

    graph.updatePosition('node', {
      id: targetId,
      data: {
        x: e.offset.x,
        y: e.offset.y,
      },
    });
  };

  cancelCreating = () => {
    this.removeAddingEdge();
    this.removeDummyNode();
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

  onKeyUp = (e: IG6GraphEvent) => {
    if (this.addingEdge) {
      this.cancelCreating();
    }
    this.isKeyDown = false;
  };

  removeAddingEdge() {
    if (this.addingEdge) {
      this.graph.removeData('edge', this.addingEdge.id);
      this.addingEdge = null;
    }
  }

  removeDummyNode() {
    if (this.dummyNode) {
      this.graph.removeData('node', this.dummyNode.id);
      this.dummyNode = null;
    }
  }
}
