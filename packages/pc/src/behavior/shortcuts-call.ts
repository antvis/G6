import { G6Event, IG6GraphEvent } from '@antv/g6-core';

const DEFAULT_TRIGGER = 'ctrl';
const ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control'];

const DEFAULT_COMBINED_KEY = '1';

export default {
  getDefaultCfg(): object {
    return {
      trigger: DEFAULT_TRIGGER,
      combinedKey: DEFAULT_COMBINED_KEY,
      functionName: 'fitView',
      functionParams: [],
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(this.trigger.toLowerCase()) > -1)) {
      this.trigger = DEFAULT_TRIGGER;
      console.warn(
        `Behavior shortcuts-fit-view 的 trigger 参数 '${this.trigger}' 不合法，请输入 'drag'、'shift'、'ctrl' 或 'alt'`,
      );
    }
    if (this.combinedKey === this.trigger) {
      this.combinedKey = undefined;
    }

    return {
      keyup: 'onKeyUp',
      keydown: 'onKeyDown',
    };
  },
  onKeyDown(e: IG6GraphEvent) {
    const code = e.key;
    if (!code) {
      return;
    }

    const triggerLowerCase = this.trigger.toLowerCase();
    const codeLowerCase = code.toLowerCase();
    // 按住 control 键时，允许用户设置 trigger 为 ctrl
    if (!this.triggerKeydown) {
      if (
        codeLowerCase === triggerLowerCase ||
        (codeLowerCase === 'control' && triggerLowerCase === 'ctrl') ||
        (codeLowerCase === 'ctrl' && triggerLowerCase === 'control')
      ) {
        this.triggerKeydown = true;
      } else {
        this.triggerKeydown = false;
      }
    }

    const { graph } = this;

    if (!graph[this.functionName]) {
      console.warn(
        `Behavior shortcuts-fit-view 的 functionName 参数 '${this.functionName}' 不合法，它不是 Graph 的一个函数名`,
      );
      return {};
    }

    // 未配置 combinedKey，直接 fitView
    if (this.triggerKeydown && !this.combinedKey) {
      if (this.functionParams && this.functionParams.length)
        graph[this.functionName](...this.functionParams);
      else graph[this.functionName]();
      return;
    }

    const combinedKeyLowerCase = this.combinedKey.toLowerCase();
    if (this.triggerKeydown) {
      if (
        codeLowerCase === combinedKeyLowerCase ||
        (codeLowerCase === 'control' && combinedKeyLowerCase === 'ctrl') ||
        (codeLowerCase === 'ctrl' && combinedKeyLowerCase === 'control')
      ) {
        if (this.functionParams && this.functionParams.length)
          graph[this.functionName](...this.functionParams);
        else graph[this.functionName]();
      }
    }
  },
  onKeyUp() {
    if (this.brush) {
      // 清除所有选中状态后，设置拖得动状态为false，并清除框选的brush
      this.brush.remove(true);
      this.brush = null;
      this.dragging = false;
    }
    this.triggerKeydown = false;
  },
};
