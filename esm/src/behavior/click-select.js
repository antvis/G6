import each from '@antv/util/lib/each';
import { isString } from '@antv/util';
var DEFAULT_TRIGGER = 'shift';
var ALLOW_EVENTS = ['shift', 16, 'ctrl', 17, 'alt', 18];
export default {
    getDefaultCfg: function () {
        return {
            multiple: true,
            trigger: DEFAULT_TRIGGER
        };
    },
    getEvents: function () {
        if (!this.multiple) {
            return {
                'node:click': 'onClick',
                'canvas:click': 'onCanvasClick'
            };
        }
        return {
            'node:click': 'onClick',
            'canvas:click': 'onCanvasClick',
            keyup: 'onKeyUp',
            keydown: 'onKeyDown'
        };
    },
    onClick: function (e) {
        var self = this;
        var item = e.item;
        var graph = self.graph;
        var autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        // allow to select multiple nodes but did not press a key || do not allow the select multiple nodes
        if (!self.keydown || !self.multiple) {
            var selected = graph.findAllByState('node', 'selected');
            each(selected, function (node) {
                if (node !== item) {
                    graph.setItemState(node, 'selected', false);
                }
            });
        }
        if (item.hasState('selected')) {
            if (self.shouldUpdate.call(self, e)) {
                graph.setItemState(item, 'selected', false);
            }
            graph.emit('nodeselectchange', { target: item, select: false });
        }
        else {
            if (self.shouldUpdate.call(self, e)) {
                graph.setItemState(item, 'selected', true);
            }
            graph.emit('nodeselectchange', { target: item, select: true });
        }
        graph.setAutoPaint(autoPaint);
        graph.paint();
    },
    onCanvasClick: function () {
        var graph = this.graph;
        var autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        var selected = graph.findAllByState('node', 'selected');
        each(selected, function (node) {
            graph.setItemState(node, 'selected', false);
        });
        var selectedEdges = graph.findAllByState('edge', 'selected');
        each(selectedEdges, function (edge) { return graph.setItemState(edge, 'selected', false); });
        graph.paint();
        graph.setAutoPaint(autoPaint);
    },
    onKeyDown: function (e) {
        var code = e.key;
        if (!code) {
            return;
        }
        code = isString(code) ? code.toLowerCase() : code;
        if (ALLOW_EVENTS.indexOf(code) > -1) {
            this.keydown = true;
        }
        else {
            this.keydown = false;
        }
    },
    onKeyUp: function () {
        this.keydown = false;
    }
};
//# sourceMappingURL=click-select.js.map