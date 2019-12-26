/*
 * @Author: moyee
 * @Date: 2019-07-31 14:36:15
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-22 18:43:24
 * @Description: 收起和展开群组
 */
var DEFAULT_TRIGGER = 'dblclick';
var ALLOW_EVENTS = ['click', 'dblclick'];
export default {
    getDefaultCfg: function () {
        return {
            trigger: DEFAULT_TRIGGER
        };
    },
    getEvents: function () {
        var _a;
        var trigger;
        // 检测输入是否合法
        if (ALLOW_EVENTS.includes(this.trigger)) {
            trigger = this.trigger;
        }
        else {
            trigger = DEFAULT_TRIGGER;
            console.warn('Behavior collapse-expand-group的trigger参数不合法，请输入click或dblclick');
        }
        return _a = {},
            _a["" + trigger] = 'onGroupClick',
            _a;
    },
    onGroupClick: function (evt) {
        var target = evt.target;
        var groupId = target.get('groupId');
        if (!groupId) {
            return false;
        }
        var graph = this.graph;
        var customGroupControll = graph.get('customGroupControll');
        customGroupControll.collapseExpandGroup(groupId);
    }
};
//# sourceMappingURL=collapse-expand-group.js.map