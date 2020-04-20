/*
 * @Author: Shiwu
 * @Description: 收起和展开 Combo
 */

import { G6Event, IG6GraphEvent } from '../types';

const DEFAULT_TRIGGER = 'dblclick';
const ALLOW_EVENTS = ['click', 'dblclick'];
export default {
  getDefaultCfg(): object {
    return {
      trigger: DEFAULT_TRIGGER,
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    let trigger: string;
    // 检测输入是否合法
    if (ALLOW_EVENTS.includes(this.trigger)) {
      trigger = this.trigger;
    } else {
      trigger = DEFAULT_TRIGGER;
      // eslint-disable-next-line no-console
      console.warn(
        "Behavior collapse-expand-group 的 trigger 参数不合法，请输入 'click' 或 'dblclick'",
      );
    }
    return {
      [`${trigger}`]: 'onComboClick',
    };
  },
  onComboClick(evt: IG6GraphEvent) {
    const { item } = evt;
    const { graph } = this;

    if (item.getType() !== 'combo') return;
    const comboId = item.getModel().id;
    console.log(item.getModel());
    console.log('click combo', comboId)
    if (!comboId) {
      return;
    }

    graph.collapseExpandCombo(comboId);
  },
};
