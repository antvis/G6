import each from '@antv/util/lib/each';
import wrapBehavior from '@antv/util/lib/wrap-behavior';
var Behavior = /** @class */ (function () {
    function Behavior() {
    }
    Behavior.prototype.registerBehavior = function (type, behavior) {
        if (!behavior) {
            throw new Error("please specify handler for this behavior: " + type);
        }
        var getEvents = behavior.getEvents;
        var events = getEvents();
        var eventsToBind = {};
        if (events) {
            each(events, function (handle, event) {
                eventsToBind[event] = wrapBehavior(events, handle);
            });
            this._events = eventsToBind;
        }
    };
    Behavior.prototype.bind = function (graph) {
        var events = this._events;
        each(events, function (handler, event) {
            graph.on(event, handler);
        });
    };
    /**
     *
     * @param cfg 默认的配置项
     */
    Behavior.prototype.getDefaultCfg = function (cfg) {
        return {};
    };
    return Behavior;
}());
export default Behavior;
//# sourceMappingURL=index.js.map