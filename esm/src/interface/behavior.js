import { __extends } from "tslib";
import GraphEvent from '@antv/g-base/lib/event/graph-event';
var G6GraphEvent = /** @class */ (function (_super) {
    __extends(G6GraphEvent, _super);
    function G6GraphEvent(type, event) {
        var _this = _super.call(this, type, event) || this;
        _this.item = event.item;
        _this.canvasX = event.canvasX;
        _this.canvasY = event.canvasY;
        _this.wheelDelta = event.wheelDelta;
        _this.detail = event.detail;
        return _this;
    }
    return G6GraphEvent;
}(GraphEvent));
export { G6GraphEvent };
//# sourceMappingURL=behavior.js.map