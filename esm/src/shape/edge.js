/**
 * @fileOverview 自定义边
 * @description 自定义边中有大量逻辑同自定义节点重复，虽然可以提取成为 mixin ，但是考虑到代码的可读性，还是单独实现。
 * @author dxq613@gmail.com
 */
import Shape from './shape';
import { shapeBase } from './shapeBase';
import { each, deepMix, isNil } from '@antv/util';
import { getLabelPosition, getLoopCfgs } from '@g6/util/graphic';
import { getSpline, getControlPoint } from '@g6/util/path';
import { getCircleCenterByPoints, distance } from '@g6/util/math';
import Global from '../global';
var CLS_SHAPE = 'edge-shape';
// start,end 倒置，center 不变
function revertAlign(labelPosition) {
    var textAlign = labelPosition;
    if (labelPosition === 'start') {
        textAlign = 'end';
    }
    else if (labelPosition === 'end') {
        textAlign = 'start';
    }
    return textAlign;
}
var singleEdge = {
    itemType: 'edge',
    /**
     * 文本的位置
     * @type {String}
     */
    labelPosition: 'center',
    /**
     * 文本是否跟着线自动旋转，默认 false
     * @type {Boolean}
     */
    labelAutoRotate: false,
    /**
     * 获取边的 path
     * @internal 供扩展的边覆盖
     * @param  {Array} points 构成边的点的集合
     * @return {Array} 构成 path 的数组
     */
    getPath: function (points) {
        var path = [];
        each(points, function (point, index) {
            if (index === 0) {
                path.push(['M', point.x, point.y]);
            }
            else {
                path.push(['L', point.x, point.y]);
            }
        });
        return path;
    },
    getShapeStyle: function (cfg) {
        var defaultStyle = this.options.style;
        var strokeStyle = {
            stroke: cfg.color
        };
        // 如果设置了color，则覆盖默认的stroke属性
        var style = deepMix({}, defaultStyle, strokeStyle, cfg.style);
        var size = cfg.size || Global.defaultEdge.size;
        cfg = this.getPathPoints(cfg);
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
        var path = this.getPath(points);
        var styles = Object.assign({}, Global.defaultEdge.style, {
            stroke: Global.defaultEdge.color,
            lineWidth: size,
            path: path
        }, style);
        return styles;
    },
    getLabelStyleByPosition: function (cfg, labelCfg, group) {
        var labelPosition = labelCfg.position || this.labelPosition; // 文本的位置用户可以传入
        var style = {};
        // TODO: wait for findByClassName defined by G
        // const pathShape = group.findAllByName(CLS_SHAPE)[0];
        // const pathShape = group.find(element => { return element.get('className') === CLS_SHAPE})
        var pathShape = group.get('children')[0];
        // 不对 pathShape 进行判空，如果线不存在，说明有问题了
        var pointPercent;
        if (labelPosition === 'start') {
            pointPercent = 0;
        }
        else if (labelPosition === 'end') {
            pointPercent = 1;
        }
        else {
            pointPercent = 0.5;
        }
        var refX = labelCfg.refX, refY = labelCfg.refY; // 默认的偏移量
        // 如果两个节点重叠，线就变成了一个点，这时候label的位置，就是这个点 + 绝对偏移
        if (cfg.startPoint.x === cfg.endPoint.x && cfg.startPoint.y === cfg.endPoint.y) {
            style.x = cfg.startPoint.x + refX ? refX : 0;
            style.y = cfg.endPoint.y + refY ? refY : 0;
            return style;
        }
        var autoRotate = isNil(labelCfg.autoRotate) ? this.labelAutoRotate : labelCfg.autoRotate;
        var offsetStyle = getLabelPosition(pathShape, pointPercent, refX, refY, autoRotate);
        style.x = offsetStyle.x;
        style.y = offsetStyle.y;
        style.rotate = offsetStyle.rotate;
        style.textAlign = this._getTextAlign(labelPosition, offsetStyle.angle);
        return style;
    },
    // 获取文本对齐方式
    _getTextAlign: function (labelPosition, angle) {
        var textAlign = 'center';
        if (!angle) {
            return labelPosition;
        }
        angle = angle % (Math.PI * 2); // 取模
        if (labelPosition !== 'center') {
            if ((angle >= 0 && angle <= Math.PI / 2) || (angle >= 3 / 2 * Math.PI && angle < 2 * Math.PI)) {
                textAlign = labelPosition;
            }
            else {
                textAlign = revertAlign(labelPosition);
            }
        }
        return textAlign;
    },
    /**
     * @internal 获取边的控制点
     * @param  {Object} cfg 边的配置项
     * @return {Array} 控制点的数组
     */
    getControlPoints: function (cfg) {
        return cfg.controlPoints;
    },
    /**
     * @internal 处理需要重计算点和边的情况
     * @param {Object} cfg 边的配置项
     * @return {Object} 边的配置项
     */
    getPathPoints: function (cfg) {
        return cfg;
    },
    /**
     * 绘制边
     * @override
     * @param  {Object} cfg   边的配置项
     * @param  {G.Group} group 边的容器
     * @return {G.Shape} 图形
     */
    drawShape: function (cfg, group) {
        var shapeStyle = this.getShapeStyle(cfg);
        var shape = group.addShape('path', {
            className: CLS_SHAPE,
            attrs: shapeStyle
        });
        return shape;
    },
    drawLabel: function (cfg, group) {
        var labelCfg = deepMix({}, this.options.labelCfg, cfg.labelCfg);
        var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
        var label = group.addShape('text', {
            attrs: labelStyle
        });
        return label;
    }
};
var singleEdgeDef = Object.assign({}, shapeBase, singleEdge);
Shape.registerEdge('single-edge', singleEdgeDef);
// // 直线, 不支持控制点
Shape.registerEdge('line', {
    // 控制点不生效
    getControlPoints: function () {
        return undefined;
    }
});
// 直线
Shape.registerEdge('spline', {
    getPath: function (points) {
        var path = getSpline(points);
        return path;
    }
});
Shape.registerEdge('arc', {
    curveOffset: 20,
    clockwise: 1,
    getControlPoints: function (cfg) {
        var startPoint = cfg.startPoint;
        var endPoint = cfg.endPoint;
        var midPoint = {
            x: (startPoint.x + endPoint.x) / 2,
            y: (startPoint.y + endPoint.y) / 2
        };
        var center;
        var arcPoint;
        // 根据给定点计算圆弧
        if (cfg.controlPoints !== undefined) {
            arcPoint = cfg.controlPoints[0];
            center = getCircleCenterByPoints(startPoint, arcPoint, endPoint);
            // 根据控制点和直线关系决定 clockwise值
            if (startPoint.x <= endPoint.x && startPoint.y > endPoint.y) {
                this.clockwise = center.x > midPoint.x ? 1 : 0;
            }
            else if (startPoint.x <= endPoint.x && startPoint.y < endPoint.y) {
                this.clockwise = center.x > midPoint.x ? 0 : 1;
            }
            else if (startPoint.x > endPoint.x && startPoint.y <= endPoint.y) {
                this.clockwise = center.y < midPoint.y ? 1 : 0;
            }
            else {
                this.clockwise = center.y < midPoint.y ? 1 : 0;
            }
            // 若给定点和两端点共线，无法生成圆弧，绘制直线
            if ((arcPoint.x - startPoint.x) / (arcPoint.y - startPoint.y)
                === (endPoint.x - startPoint.x) / (endPoint.y - startPoint.y)) {
                return [];
            }
        }
        else { // 根据直线连线中点的的偏移计算圆弧
            // 若用户给定偏移量则根据其计算，否则按照默认偏移值计算
            if (cfg.curveOffset !== undefined) {
                this.curveOffset = cfg.curveOffset;
            }
            if (this.curveOffset < 0)
                this.clockwise = 0;
            else
                this.clockwise = 1;
            var vec = {
                x: endPoint.x - startPoint.x,
                y: endPoint.y - startPoint.y
            };
            var edgeAngle = Math.atan2(vec.y, vec.x);
            arcPoint = {
                x: this.curveOffset * Math.cos((-Math.PI / 2 + edgeAngle)) + midPoint.x,
                y: this.curveOffset * Math.sin((-Math.PI / 2 + edgeAngle)) + midPoint.y
            };
            center = getCircleCenterByPoints(startPoint, arcPoint, endPoint);
        }
        var radius = distance(startPoint, center);
        var controlPoints = [{ x: radius, y: radius }];
        return controlPoints;
    },
    getPath: function (points) {
        var path = [];
        path.push(['M', points[0].x, points[0].y]);
        // 控制点与端点共线
        if (points.length === 2) {
            path.push(['L', points[1].x, points[1].y]);
        }
        else {
            path.push(['A', points[1].x, points[1].y, 0, 0, this.clockwise, points[2].x, points[2].y]);
        }
        return path;
    }
});
Shape.registerEdge('quadratic', {
    curvePosition: 0.5,
    curveOffset: -20,
    getControlPoints: function (cfg) {
        var controlPoints = cfg.controlPoints; // 指定controlPoints
        if (!controlPoints || !controlPoints.length) {
            var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
            var innerPoint = getControlPoint(startPoint, endPoint, this.curvePosition, this.curveOffset);
            controlPoints = [innerPoint];
        }
        return controlPoints;
    },
    getPath: function (points) {
        var path = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push(['Q', points[1].x, points[1].y, points[2].x, points[2].y]);
        return path;
    }
});
Shape.registerEdge('cubic', {
    curvePosition: [1 / 2, 1 / 2],
    curveOffset: [-20, 20],
    getControlPoints: function (cfg) {
        var controlPoints = cfg.controlPoints; // 指定controlPoints
        if (!controlPoints || !controlPoints.length) {
            var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
            var innerPoint1 = getControlPoint(startPoint, endPoint, this.curvePosition[0], this.curveOffset[0]);
            var innerPoint2 = getControlPoint(startPoint, endPoint, this.curvePosition[1], this.curveOffset[1]);
            controlPoints = [innerPoint1, innerPoint2];
        }
        return controlPoints;
    },
    getPath: function (points) {
        var path = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push(['C', points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y]);
        return path;
    }
});
// 垂直方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点
Shape.registerEdge('cubic-vertical', {
    curvePosition: [1 / 2, 1 / 2],
    getControlPoints: function (cfg) {
        var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
        var innerPoint1 = {
            x: startPoint.x,
            y: (endPoint.y - startPoint.y) * this.curvePosition[0] + startPoint.y
        };
        var innerPoint2 = {
            x: endPoint.x,
            y: (endPoint.y - startPoint.y) * this.curvePosition[1] + startPoint.y
        };
        var controlPoints = [innerPoint1, innerPoint2];
        return controlPoints;
    }
}, 'cubic');
// 水平方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点
Shape.registerEdge('cubic-horizontal', {
    curvePosition: [1 / 2, 1 / 2],
    getControlPoints: function (cfg) {
        var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
        var innerPoint1 = {
            x: (endPoint.x - startPoint.x) * this.curvePosition[0] + startPoint.x,
            y: startPoint.y
        };
        var innerPoint2 = {
            x: (endPoint.x - startPoint.x) * this.curvePosition[1] + startPoint.x,
            y: endPoint.y
        };
        var controlPoints = [innerPoint1, innerPoint2];
        return controlPoints;
    }
}, 'cubic');
Shape.registerEdge('loop', {
    getPathPoints: function (cfg) {
        return getLoopCfgs(cfg);
    },
    getControlPoints: function (cfg) {
        return cfg.controlPoints;
    },
    afterDraw: function (cfg) {
        cfg.controlPoints = null;
    },
    afterUpdate: function (cfg) {
        cfg.controlPoints = null;
    }
}, 'cubic');
//# sourceMappingURL=edge.js.map