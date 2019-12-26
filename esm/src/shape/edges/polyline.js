import { deepMix, each } from '@antv/util';
import { pointsToPolygon } from '@g6/util/path';
import Global from '../../global';
import Shape from '../shape';
import { getPathWithBorderRadiusByPolyline, getPolylinePoints, simplifyPolyline } from './polyline-util';
var CLS_SHAPE_SUFFIX = '-shape';
var CLS_LABEL_SUFFIX = '-label';
// 折线
Shape.registerEdge('polyline', {
    options: {
        color: '#999',
        style: {
            stroke: '#333',
            lineWidth: 1,
            radius: 0,
            offset: 5,
            x: 0,
            y: 0
        },
        // 文本样式配置
        labelCfg: {
            style: {
                fill: '#595959'
            }
        }
    },
    shapeType: 'polyline',
    // 文本位置
    labelPosition: 'center',
    drawShape: function (cfg, group) {
        var shapeStyle = this.getShapeStyle(cfg);
        var keyShape = group.addShape('path', {
            className: 'edge-shape',
            attrs: shapeStyle
        });
        return keyShape;
    },
    getShapeStyle: function (cfg) {
        var defaultStyle = this.options.style;
        var strokeStyle = {
            stroke: cfg.color
        };
        var style = deepMix({}, defaultStyle, strokeStyle, cfg.style);
        cfg = this.getPathPoints(cfg);
        this.radius = style.radius;
        this.offset = style.offset;
        var startPoint = cfg.startPoint;
        var endPoint = cfg.endPoint;
        var controlPoints = this.getControlPoints(cfg);
        var points = [startPoint]; // 添加起始点
        // 添加控制点
        if (controlPoints) {
            points = points.concat(controlPoints);
        }
        // 添加结束点
        points.push(endPoint);
        var source = cfg.sourceNode;
        var target = cfg.targetNode;
        var routeCfg = { radius: style.radius };
        if (!controlPoints) {
            routeCfg = { source: source, target: target, offset: style.offset, radius: style.radius };
        }
        var path = this.getPath(points, routeCfg);
        var attrs = deepMix({}, Global.defaultEdge.style, style, {
            lineWidth: cfg.size
        }, { path: path });
        return attrs;
    },
    getPath: function (points, routeCfg) {
        var source = routeCfg.source, target = routeCfg.target, offset = routeCfg.offset, radius = routeCfg.radius;
        if (!offset) {
            if (radius) {
                return getPathWithBorderRadiusByPolyline(points, radius);
            }
            else {
                var pathArray_1 = [];
                each(points, function (point, index) {
                    if (index === 0) {
                        pathArray_1.push(['M', point.x, point.y]);
                    }
                    else {
                        pathArray_1.push(['L', point.x, point.y]);
                    }
                });
                return pathArray_1;
            }
        }
        var polylinePoints;
        if (radius) {
            polylinePoints = simplifyPolyline(getPolylinePoints(points[0], points[points.length - 1], source, target, offset));
            return getPathWithBorderRadiusByPolyline(polylinePoints, radius);
        }
        polylinePoints = getPolylinePoints(points[0], points[points.length - 1], source, target, offset);
        return pointsToPolygon(polylinePoints);
    },
    update: function (cfg, item) {
        var group = item.getContainer();
        var shapeClassName = this.itemType + CLS_SHAPE_SUFFIX;
        var shape = group.find(function (element) { return element.get('className') === shapeClassName; });
        if (!cfg.style) {
            cfg.style = {};
        }
        var oriShapeAttrs = shape.attr();
        cfg.style.radius = cfg.style.radius || oriShapeAttrs.radius;
        cfg.style.offset = cfg.style.offset || oriShapeAttrs.offset;
        var shapeStyle = this.getShapeStyle(cfg);
        shape.attr(shapeStyle);
        var labelClassName = this.itemType + CLS_LABEL_SUFFIX;
        var label = group.find(function (element) { return element.get('className') === labelClassName; });
        // 此时需要考虑之前是否绘制了 label 的场景存在三种情况
        // 1. 更新时不需要 label，但是原先存在 label，此时需要删除
        // 2. 更新时需要 label, 但是原先不存在，创建节点
        // 3. 如果两者都存在，更新
        if (!cfg.label) {
            label && label.remove();
        }
        else {
            if (!label) {
                var newLabel = this.drawLabel(cfg, group);
                newLabel.set('className', labelClassName);
            }
            else {
                var defaultLabelCfg = this.options.labelCfg;
                var labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
                var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
                /**
                 * fixme g中shape的rotate是角度累加的，不是label的rotate想要的角度
                 * 由于现在label只有rotate操作，所以在更新label的时候如果style中有rotate就重置一下变换
                 * 后续会基于g的Text复写一个Label出来处理这一类问题
                 */
                label.resetMatrix();
                label.attr(labelStyle);
            }
        }
    },
    getControlPoints: function (cfg) {
        return cfg.controlPoints;
    }
}, 'single-line');
//# sourceMappingURL=polyline.js.map