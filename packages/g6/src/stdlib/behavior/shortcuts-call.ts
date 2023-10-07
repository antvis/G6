import type { IG6GraphEvent } from '../../types';
import { Behavior } from '../../types/behavior';

const DEFAULT_TRIGGER = 'ctrl';
const ALLOW_TRIGGERS = ['shift', 'ctrl', 'alt', 'control'] as const;
const DEFAULT_COMBINED_KEY = '1';
type Trigger = (typeof ALLOW_TRIGGERS)[number];

interface ShortcutsCallOptions {
  /**
   * The main key to pressed to apply shortcuts call
   * Defaults to `"ctrl"`.
   */
  trigger?: Trigger;
  /**
   * The combined key to pressed with trigger to apply shortcuts call.
   * Defaults to `"1"`.
   */
  combinedKey?: string;
  /**
   *
   * The function to be called.
   * Defaults to `"fitView"`.
   *
   */
  functionName?: string;
  /**
   * The function params.
   */
  functionParams?: any[];
}

const DEFAULT_OPTIONS: ShortcutsCallOptions = {
  trigger: DEFAULT_TRIGGER,
  combinedKey: DEFAULT_COMBINED_KEY,
  functionName: 'fitView',
  functionParams: [],
};

export class ShortcutsCall extends Behavior {
  triggerKeydown = false;

  constructor(options: Partial<ShortcutsCallOptions>) {
    super(Object.assign({}, DEFAULT_OPTIONS, options));
    // Validate options
    if (options.trigger && !ALLOW_TRIGGERS.includes(options.trigger)) {
      console.warn(
        `G6: Invalid trigger option "${options.trigger}" for shortcuts-call behavior!`,
      );
      this.options.trigger = DEFAULT_OPTIONS.trigger;
    }
    if (options.combinedKey === this.options.trigger) {
      this.options.combinedKey = undefined;
    }
  }

  getEvents = () => {
    return {
      keyup: this.onKeyUp,
      keydown: this.onKeyDown,
    };
  };

  public onKeyDown(e: IG6GraphEvent) {
    const code = e.key;
    if (!code) return;

    const { graph } = this;
    const { trigger, combinedKey, functionName, functionParams } = this.options;

    const triggerLowerCase = trigger.toLowerCase();
    const codeLowerCase = code.toLowerCase();
    // While holding down the Control key, allow users to set the trigger as "ctrl".
    if (!this.triggerKeydown) {
      if (
        codeLowerCase === triggerLowerCase ||
        (codeLowerCase === 'control' && triggerLowerCase === 'ctrl') ||
        (codeLowerCase === 'ctrl' && triggerLowerCase === 'control')
      ) {
        this.triggerKeydown = true;
      }
    }

    if (!graph[functionName]) {
      console.warn(
        `G6: Invalid functionName option: "${functionName}" for shortcuts-call behavior!`,
      );
      return {};
    }
    if (!this.triggerKeydown) return;

    if (!combinedKey) {
      if (functionParams && functionParams.length) {
        graph[functionName](...functionParams);
      } else {
        graph[functionName]();
      }
      return;
    }

    const combinedKeyLowerCase = combinedKey.toLowerCase();
    if (
      codeLowerCase === combinedKeyLowerCase ||
      (codeLowerCase === 'control' && combinedKeyLowerCase === 'ctrl') ||
      (codeLowerCase === 'ctrl' && combinedKeyLowerCase === 'control')
    ) {
      if (functionParams && functionParams.length) {
        graph[functionName](...functionParams);
      } else {
        graph[functionName]();
      }
    }
  }

  public onKeyUp(e) {
    const code = e.key;
    if (!code) return;
    const { trigger } = this.options;
    const triggerLowerCase = trigger.toLowerCase();
    const codeLowerCase = code.toLowerCase();
    if (
      codeLowerCase === triggerLowerCase ||
      (codeLowerCase === 'control' && triggerLowerCase === 'ctrl') ||
      (codeLowerCase === 'ctrl' && triggerLowerCase === 'control')
    ) {
      this.triggerKeydown = false;
    }
  }
}
