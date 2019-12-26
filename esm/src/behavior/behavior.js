import { clone, each, wrapBehavior } from '@antv/util/lib';
import behaviorOption from './behaviorOption';
var Behavior = /** @class */ (function () {
    function Behavior() {
    }
    /**
     * 自定义 Behavior
     * @param type Behavior 名称
     * @param behavior Behavior 定义的方法集合
     */
    Behavior.registerBehavior = function (type, behavior) {
        if (!behavior) {
            throw new Error("please specify handler for this behavior: " + type);
        }
        var _proptype = clone(behaviorOption);
        Object.assign(_proptype, behavior);
        var base = function (cfg) {
            var self = this;
            Object.assign(self, self.getDefaultCfg(), cfg);
            var events = self.getEvents();
            self._events = null;
            var eventsToBind = {};
            if (events) {
                each(events, function (handle, event) {
                    eventsToBind[event] = wrapBehavior(self, handle);
                });
                self._events = eventsToBind;
            }
        };
        base.prototype = _proptype;
        this.types[type] = base;
    };
    Behavior.hasBehavior = function (type) {
        return !!this.types[type];
    };
    Behavior.getBehavior = function (type) {
        return this.types[type];
    };
    // 所有自定义的 Behavior 的实例
    Behavior.types = {};
    return Behavior;
}());
export default Behavior;
//# sourceMappingURL=behavior.js.map