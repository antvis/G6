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
      relayout: true,
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
      [`combo:${trigger}`]: 'onComboClick',
    };
  },
  onComboClick(evt: IG6GraphEvent) {
    const { item } = evt;
    const { graph, relayout } = this;

    if (!item || item.destroyed || item.getType() !== 'combo') return;
    const model = item.getModel();
    const comboId = model.id;
    if (!comboId) {
      return;
    }
    graph.collapseExpandCombo(comboId);
    if (relayout && graph.get('layout')) graph.layout();
    else graph.refreshPositions();
  },
};
