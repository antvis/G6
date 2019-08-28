/*
 * @Author: moyee
 * @Date: 2019-07-31 14:36:15
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-22 18:43:24
 * @Description: 收起和展开群组
 */

module.exports = {
  getDefaultCfg() {
    return {
      delegateShapeBBoxs: {}
    };
  },
  getEvents() {
    return {
      dblclick: 'onDblClick'
    };
  },
  onDblClick(evt) {
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
