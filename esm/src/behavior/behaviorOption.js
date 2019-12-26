import each from '@antv/util/lib/each';
// 自定义 Behavior 时候共有的方法
export default {
    getDefaultCfg: function () {
        return {};
    },
    /**
     * register event handler, behavior will auto bind events
     * for example:
     * return {
     *  clicl: 'onClick'
     * }
     */
    getEvents: function () {
        return {};
    },
    shouldBegin: function () {
        return true;
    },
    shouldUpdate: function () {
        return true;
    },
    shouldEnd: function () {
        return true;
    },
    /**
     * auto bind events when register behavior
     * @param graph Graph instance
     */
    bind: function (graph) {
        var events = this._events;
        this.graph = graph;
        each(events, function (handler, event) {
            graph.on(event, handler);
        });
    },
    unbind: function (graph) {
        var events = this._events;
        each(events, function (handler, event) {
            graph.off(event, handler);
        });
    },
    get: function (val) {
        return this[val];
    },
    set: function (key, val) {
        this[key] = val;
        return this;
    }
};
//# sourceMappingURL=behaviorOption.js.map