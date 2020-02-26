/*
 * @Author: moyee
 * @Date: 2019-07-31 14:36:15
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-22 18:43:24
 * @Description: 收起和展开群组
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
      (trigger = this.trigger);
    } else {
      trigger = DEFAULT_TRIGGER;
      // eslint-disable-next-line no-console
      console.warn(
        "Behavior collapse-expand-group 的 trigger 参数不合法，请输入 'click' 或 'dblclick'",
      );
    }
    return {
      [`${trigger}`]: 'onGroupClick',
    };
  },
  onGroupClick(evt: IG6GraphEvent) {
    const { target } = evt;
    const { graph } = this;

    const groupId = target.get('groupId');
    if (!groupId) {
      return;
    }

    const customGroupControll = graph.get('customGroupControll');
    customGroupControll.collapseExpandGroup(groupId);
  },
};
