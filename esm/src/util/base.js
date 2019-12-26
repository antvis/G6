import isArray from '@antv/util/lib/is-array';
import isNil from '@antv/util/lib/is-nil';
import isNumber from "@antv/util/lib/is-number";
import isString from '@antv/util/lib/is-string';
import { G6GraphEvent } from '@g6/interface/behavior';
/**
 * turn padding into [top, right, bottom, right]
 * @param  {Number|Array} padding input padding
 * @return {array} output
 */
export var formatPadding = function (padding) {
    var top = 0;
    var left = 0;
    var right = 0;
    var bottom = 0;
    if (isNumber(padding)) {
        top = left = right = bottom = padding;
    }
    else if (isString(padding)) {
        var intPadding = parseInt(padding, 10);
        top = left = right = bottom = intPadding;
    }
    else if (isArray(padding)) {
        top = padding[0];
        right = !isNil(padding[1]) ? padding[1] : padding[0];
        bottom = !isNil(padding[2]) ? padding[2] : padding[0];
        left = !isNil(padding[3]) ? padding[3] : right;
    }
    return [top, right, bottom, left];
};
/**
 * clone event
 * @param e
 */
export var cloneEvent = function (e) {
    var event = new G6GraphEvent(e.type, e);
    event.clientX = e.clientX;
    event.clientY = e.clientY;
    event.x = e.x;
    event.y = e.y;
    event.target = e.target;
    event.currentTarget = e.currentTarget;
    event.bubbles = true;
    event.item = e.item;
    return event;
};
//# sourceMappingURL=base.js.map