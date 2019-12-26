import { __assign } from "tslib";
/*
 * @Author: moyee
 * @Date: 2019-07-31 14:36:15
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 11:13:43
 * @Description: 拖动群组
 */
import deepMix from '@antv/util/lib/deep-mix';
var body = document.body;
var delegateStyle = {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [5, 5]
};
export default {
    getDefaultCfg: function () {
        return {
            delegate: true,
            delegateStyle: {},
            delegateShapes: {},
            delegateShapeBBoxs: {}
        };
    },
    getEvents: function () {
        return {
            dragstart: 'onDragStart',
            drag: 'onDrag',
            dragend: 'onDragEnd',
            'canvas:mouseleave': 'onOutOfRange'
        };
    },
    onDragStart: function (evt) {
        var target = evt.target;
        // 获取拖动的group的ID，如果拖动的不是group，则直接return
        var groupId = target.get('groupId');
        if (!groupId) {
            return false;
        }
        var graph = this.graph;
        var customGroupControll = graph.get('customGroupControll');
        var customGroup = customGroupControll.customGroup;
        var currentGroup = customGroup[groupId].nodeGroup;
        this.targetGroup = currentGroup;
        this.mouseOrigin = {
            x: evt.canvasX,
            y: evt.canvasY
        };
        // 获取groupId的父Group的ID
        var groups = graph.save().groups;
        var parentGroupId = null;
        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
            var group = groups_1[_i];
            if (groupId !== group.id) {
                continue;
            }
            parentGroupId = group.parentId;
            break;
        }
        if (parentGroupId) {
            var parentGroup = customGroup[parentGroupId].nodeGroup;
            customGroupControll.setGroupStyle(parentGroup.get('keyShape'), 'hover');
        }
    },
    onDrag: function (evt) {
        if (!this.mouseOrigin) {
            return false;
        }
        this._updateDelegate(evt);
    },
    onDragEnd: function (evt) {
        // 删除delegate shape
        var groupId = evt.target.get('groupId');
        if (this.delegateShapes[groupId]) {
            this.delegateShapeBBox = this.delegateShapes[groupId].getBBox();
            this.delegateShapes[groupId].remove();
            delete this.delegateShapes[groupId];
        }
        if (!this.delegateShapeBBox) {
            return false;
        }
        var graph = this.graph;
        var autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        // 修改群组位置
        var customGroupControll = graph.get('customGroupControll');
        var delegateShapeBBoxs = this.delegateShapeBBoxs[groupId];
        customGroupControll.updateGroup(groupId, delegateShapeBBoxs);
        graph.setAutoPaint(autoPaint);
        graph.paint();
        this.mouseOrigin = null;
        this.shapeOrigin = null;
        customGroupControll.resetNodePoint();
        this.delegateShapeBBox = null;
    },
    _updateDelegate: function (evt) {
        var self = this;
        var groupId = evt.target.get('groupId');
        var item = this.targetGroup.get('keyShape');
        var graph = this.graph;
        var autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        var delegateShape = self.delegateShapes[groupId];
        var groupBbox = item.getBBox();
        var delegateType = item.get('type');
        if (!delegateShape) {
            var delegateGroup = graph.get('delegateGroup');
            var width = groupBbox.width, height = groupBbox.height;
            var x = evt.canvasX - width / 2;
            var y = evt.canvasY - height / 2;
            var attrs = __assign({ width: width,
                height: height,
                x: x,
                y: y }, deepMix({}, delegateStyle, this.delegateStyle));
            // 如果delegate是circle
            if (delegateType === 'circle') {
                var cx = evt.canvasX; // (width + 2 * x) / 2;
                var cy = evt.canvasY; // (height + 2 * y) / 2;
                var r = width > height ? width / 2 : height / 2;
                delegateShape = delegateGroup.addShape('circle', {
                    attrs: __assign({ x: cx, y: cy, r: r }, deepMix({}, delegateStyle, this.delegateStyle))
                });
                self.shapeOrigin = { x: cx, y: cy };
            }
            else {
                delegateShape = delegateGroup.addShape('rect', {
                    attrs: attrs
                });
                self.shapeOrigin = { x: attrs.x, y: attrs.y };
            }
            // delegateShape.set('capture', false);
            self.delegateShapes[groupId] = delegateShape;
            self.delegateShapeBBoxs[groupId] = delegateShape.getBBox();
        }
        else {
            var mouseOrigin = self.mouseOrigin, shapeOrigin = self.shapeOrigin;
            var deltaX = evt.canvasX - mouseOrigin.x;
            var deltaY = evt.canvasY - mouseOrigin.y;
            var x = deltaX + shapeOrigin.x;
            var y = deltaY + shapeOrigin.y;
            // 将Canvas坐标转成视口坐标
            var point = graph.getPointByCanvas(x, y);
            delegateShape.attr({ x: point.x, y: point.y });
            self.delegateShapeBBoxs[groupId] = delegateShape.getBBox();
        }
        graph.paint();
        graph.setAutoPaint(autoPaint);
    },
    onOutOfRange: function (e) {
        var self = this;
        if (this.origin) {
            var canvasElement_1 = self.graph.get('canvas').get('el');
            var fn = function (ev) {
                if (ev.target !== canvasElement_1) {
                    self.onDragEnd(e);
                }
            };
            this.fn = fn;
            body.addEventListener('mouseup', fn, false);
        }
    }
};
//# sourceMappingURL=drag-group.js.map