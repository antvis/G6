/*
 * @Author: moyee
 * @Date: 2019-07-31 14:36:15
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-22 18:43:24
 * @Description: 收起和展开群组
 */
const DEFAULT_TRIGGER = 'dblclick';
const ALLOW_EVENTS = [ 'click', 'dblclick' ];
module.exports = {
  getDefaultCfg() {
    return {
      trigger: DEFAULT_TRIGGER
    };
  },
  getEvents() {
    let trigger;
    // 检测输入是否合法
    if (ALLOW_EVENTS.includes(this.trigger)) {
      trigger = this.trigger;
    } else {
      trigger = DEFAULT_TRIGGER;
      console.warn('Behavior collapse-expand-group的trigger参数不合法，请输入click或dblclick');
    }
    return {
      [`${trigger}`]: 'onGroupClick'
    };
  },
  onGroupClick(evt) {
    const { target } = evt;

    const groupId = target.get('groupId');
    if (!groupId) {
      return false;
    }

    const graph = this.graph;

    const customGroupControll = graph.get('customGroupControll');
    customGroupControll.collapseExpandGroup(groupId);
  }
};
