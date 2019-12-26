import each from '@antv/util/lib/each';
import isArray from '@antv/util/lib/is-array';
import isString from '@antv/util/lib/is-string';
import Behavior from '@g6/behavior/behavior';
var ModeController = /** @class */ (function () {
    function ModeController(graph) {
        this.graph = graph;
        this.destroyed = false;
        this.modes = graph.get('modes') || {
            default: []
        };
        this.formatModes();
        this.mode = graph.get('defaultMode') || 'default';
        this.currentBehaves = [];
        this.setMode(this.mode);
    }
    ModeController.prototype.formatModes = function () {
        var modes = this.modes;
        each(modes, function (mode) {
            each(mode, function (behavior, i) {
                if (isString(behavior)) {
                    mode[i] = { type: behavior };
                }
            });
        });
    };
    ModeController.prototype.setBehaviors = function (mode) {
        var graph = this.graph;
        var behaviors = this.modes[mode];
        var behaves = [];
        var behave;
        each(behaviors, function (behavior) {
            var BehaviorInstance = Behavior.getBehavior(behavior.type);
            if (!BehaviorInstance) {
                return;
            }
            behave = new BehaviorInstance(behavior);
            if (behave) {
                behave.bind(graph);
                behaves.push(behave);
            }
        });
        this.currentBehaves = behaves;
    };
    ModeController.prototype.mergeBehaviors = function (modeBehaviors, behaviors) {
        each(behaviors, function (behavior) {
            if (modeBehaviors.indexOf(behavior) < 0) {
                if (isString(behavior)) {
                    behavior = { type: behavior };
                }
                modeBehaviors.push(behavior);
            }
        });
        return modeBehaviors;
    };
    ModeController.prototype.filterBehaviors = function (modeBehaviors, behaviors) {
        var result = [];
        modeBehaviors.forEach(function (behavior) {
            var type = '';
            if (isString(behavior)) {
                type = behavior;
            }
            else {
                type = behavior.type;
            }
            if (behaviors.indexOf(type) < 0) {
                result.push(behavior);
            }
        });
        return result;
    };
    ModeController.prototype.setMode = function (mode) {
        var modes = this.modes;
        var graph = this.graph;
        var current = mode;
        var behaviors = modes[current];
        if (!behaviors) {
            return;
        }
        graph.emit('beforemodechange', { mode: mode });
        each(this.currentBehaves, function (behave) {
            behave.unbind(graph);
        });
        this.setBehaviors(current);
        graph.emit('aftermodechange', { mode: mode });
        this.mode = mode;
        return this;
    };
    /**
     * 动态增加或删除 Behavior
     *
     * @param {IModeType[]} behaviors
     * @param {(IModeType[] | IModeType)} modes
     * @param {boolean} isAdd
     * @returns {Mode}
     * @memberof Mode
     */
    ModeController.prototype.manipulateBehaviors = function (behaviors, modes, isAdd) {
        var _this = this;
        var self = this;
        var behaves = behaviors;
        if (!isArray(behaviors)) {
            behaves = [behaviors];
        }
        if (isArray(modes)) {
            each(modes, function (mode) {
                if (!self.modes[mode]) {
                    if (isAdd) {
                        self.modes[mode] = [].concat(behaves);
                    }
                }
                else {
                    if (isAdd) {
                        self.modes[mode] = _this.mergeBehaviors(self.modes[mode], behaves);
                    }
                    else {
                        self.modes[mode] = _this.filterBehaviors(self.modes[mode], behaves);
                    }
                }
            });
            return this;
        }
        var currentMode = modes;
        if (!modes) {
            currentMode = this.mode; // isString(this.mode) ? this.mode : this.mode.type
        }
        if (!this.modes[currentMode]) {
            if (isAdd) {
                self.modes[currentMode] = [].concat(behaves);
            }
        }
        if (isAdd) {
            self.modes[currentMode] = this.mergeBehaviors(self.modes[currentMode], behaves);
        }
        else {
            self.modes[currentMode] = this.filterBehaviors(self.modes[currentMode], behaves);
        }
        self.setMode(this.mode);
        return this;
    };
    ModeController.prototype.destroy = function () {
        this.graph = null;
        this.modes = null;
        this.currentBehaves = null;
        this.destroyed = true;
    };
    return ModeController;
}());
export default ModeController;
//# sourceMappingURL=mode.js.map