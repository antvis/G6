import { __assign, __rest } from "tslib";
import Shape from '../shape';
import deepMix from '@antv/util/lib/deep-mix';
import Global from '../../global';
// 菱形shape
Shape.registerNode('triangle', {
    // 自定义节点时的配置
    options: {
        size: 40,
        direction: 'up',
        style: {
            stroke: Global.defaultShapeStrokeColor,
            fill: Global.defaultShapeFillColor,
            lineWidth: 1
        },
        // 文本样式配置
        labelCfg: {
            style: {
                fill: '#595959'
            },
            offset: 15
        },
        // 节点上左右上下四个方向上的链接circle配置
        linkPoints: {
            top: false,
            right: false,
            bottom: false,
            left: false,
            // circle的大小
            size: 5,
            lineWidth: 1,
            fill: '#fff',
            stroke: '#72CC4A'
        },
        // 节点中icon配置
        icon: {
            // 是否显示icon，值为 false 则不渲染icon
            show: false,
            // icon的地址，字符串类型
            img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            width: 16,
            height: 16,
            offset: 6
        }
    },
    shapeType: 'triangle',
    // 文本位置
    labelPosition: 'bottom',
    drawShape: function (cfg, group) {
        var _a = this.options, defaultIcon = _a.icon, defaultDirection = _a.direction;
        var style = this.getShapeStyle(cfg);
        var icon = deepMix({}, defaultIcon, cfg.icon);
        var direction = cfg.direction || defaultDirection;
        var keyShape = group.addShape('path', {
            attrs: style
        });
        var w = icon.width, h = icon.height, show = icon.show, offset = icon.offset;
        if (show) {
            var iconW = -w / 2;
            var iconH = -h / 2;
            if (direction === 'up' || direction === 'down') {
                iconH += offset;
            }
            if (direction === 'left' || direction === 'right') {
                iconW += offset;
            }
            var image = group.addShape('image', {
                attrs: __assign({ x: iconW, y: iconH }, icon),
                className: 'triangle-icon'
            });
            image.set('capture', false);
        }
        this.drawLinkPoints(cfg, group);
        return keyShape;
    },
    /**
     * 绘制节点上的LinkPoints
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    drawLinkPoints: function (cfg, group) {
        var _a = this.options, defaultLinkPoints = _a.linkPoints, defaultDirection = _a.direction;
        var linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);
        var direction = cfg.direction || defaultDirection;
        var top = linkPoints.top, left = linkPoints.left, right = linkPoints.right, bottom = linkPoints.bottom, markSize = linkPoints.size, markStyle = __rest(linkPoints, ["top", "left", "right", "bottom", "size"]);
        var size = this.getSize(cfg);
        var len = size[0];
        if (left) {
            // up down left right 四个方向的坐标均不相同
            var leftPos = null;
            var diffY = len * Math.sin((1 / 3) * Math.PI);
            var r = len * Math.sin((1 / 3) * Math.PI);
            if (direction === 'up') {
                leftPos = [-r, diffY];
            }
            else if (direction === 'down') {
                leftPos = [-r, -diffY];
            }
            else if (direction === 'left') {
                leftPos = [-r, r - diffY];
            }
            if (leftPos) {
                // left circle
                group.addShape('circle', {
                    attrs: __assign(__assign({}, markStyle), { x: leftPos[0], y: leftPos[1], r: markSize }),
                    className: 'triangle-mark-left'
                });
            }
        }
        if (right) {
            // right circle
            // up down left right 四个方向的坐标均不相同
            var rightPos = null;
            var diffY = len * Math.sin((1 / 3) * Math.PI);
            var r = len * Math.sin((1 / 3) * Math.PI);
            if (direction === 'up') {
                rightPos = [r, diffY];
            }
            else if (direction === 'down') {
                rightPos = [r, -diffY];
            }
            else if (direction === 'right') {
                rightPos = [r, r - diffY];
            }
            if (rightPos) {
                group.addShape('circle', {
                    attrs: __assign(__assign({}, markStyle), { x: rightPos[0], y: rightPos[1], r: markSize }),
                    className: 'triangle-mark-right'
                });
            }
        }
        if (top) {
            // up down left right 四个方向的坐标均不相同
            var topPos = null;
            var diffY = len * Math.sin((1 / 3) * Math.PI);
            var r = len * Math.sin((1 / 3) * Math.PI);
            if (direction === 'up') {
                topPos = [r - diffY, -diffY];
            }
            else if (direction === 'left') {
                topPos = [r, -diffY];
            }
            else if (direction === 'right') {
                topPos = [-r, -diffY];
            }
            if (topPos) {
                // top circle
                group.addShape('circle', {
                    attrs: __assign(__assign({}, markStyle), { x: topPos[0], y: topPos[1], r: markSize }),
                    className: 'triangle-mark-top'
                });
            }
        }
        if (bottom) {
            // up down left right 四个方向的坐标均不相同
            var bottomPos = null;
            var diffY = len * Math.sin((1 / 3) * Math.PI);
            var r = len * Math.sin((1 / 3) * Math.PI);
            if (direction === 'down') {
                bottomPos = [-r + diffY, diffY];
            }
            else if (direction === 'left') {
                bottomPos = [r, diffY];
            }
            else if (direction === 'right') {
                bottomPos = [-r, diffY];
            }
            if (bottomPos) {
                // bottom circle
                group.addShape('circle', {
                    attrs: __assign(__assign({}, markStyle), { x: bottomPos[0], y: bottomPos[1], r: markSize }),
                    className: 'triangle-mark-bottom'
                });
            }
        }
    },
    getPath: function (cfg) {
        var defaultDirection = this.options.direction;
        var direction = cfg.direction || defaultDirection;
        var size = this.getSize(cfg);
        var len = size[0];
        var diffY = len * Math.sin((1 / 3) * Math.PI);
        var r = len * Math.sin((1 / 3) * Math.PI);
        var path = [
            ['M', -r, diffY],
            ['L', 0, -diffY],
            ['L', r, diffY],
            ['Z'] // 封闭
        ];
        if (direction === 'down') {
            path = [
                ['M', -r, -diffY],
                ['L', r, -diffY],
                ['L', 0, diffY],
                ['Z'] // 封闭
            ];
        }
        else if (direction === 'left') {
            path = [
                ['M', -r, r - diffY],
                ['L', r, -r],
                ['L', r, r],
                ['Z'] // 封闭
            ];
        }
        else if (direction === 'right') {
            path = [
                ['M', r, r - diffY],
                ['L', -r, r],
                ['L', -r, -r],
                ['Z'] // 封闭
            ];
        }
        return path;
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle: function (cfg) {
        var defaultStyle = this.options.style;
        var strokeStyle = {
            stroke: cfg.color
        };
        // 如果设置了color，则覆盖默认的stroke属性
        var style = deepMix({}, defaultStyle, strokeStyle, cfg.style);
        var path = this.getPath(cfg);
        var styles = __assign({ path: path }, style);
        return styles;
    },
    update: function (cfg, item) {
        var group = item.getContainer();
        var _a = this.options, defaultStyle = _a.style, defaultIcon = _a.icon, defaultLabelCfg = _a.labelCfg;
        var style = deepMix({}, defaultStyle, cfg.style);
        var icon = deepMix({}, defaultIcon, cfg.icon);
        var keyShape = item.get('keyShape');
        var path = this.getPath(cfg);
        keyShape.attr(__assign({ path: path }, style));
        var labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
        var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
        var text = group.find(function (element) { return element.get('className') === 'node-label'; });
        if (text) {
            text.attr(__assign({}, labelStyle));
        }
        var triangleIcon = group.find(function (element) { return element.get('className') === 'triangle-icon'; });
        if (triangleIcon) {
            var w = icon.width, h = icon.height;
            triangleIcon.attr(__assign({ x: -w / 2, y: -h / 2 }, icon));
        }
        this.updateLinkPoints(cfg, group);
    },
    /**
     * 更新linkPoints
     * @param {Object} cfg 节点数据配置项
     * @param {Group} group Item所在的group
     */
    updateLinkPoints: function (cfg, group) {
        var _a = this.options, defaultLinkPoints = _a.linkPoints, defaultDirection = _a.direction;
        var linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);
        var direction = cfg.direction || defaultDirection;
        var markSize = linkPoints.size, markStyle = __rest(linkPoints, ["size"]);
        var size = this.getSize(cfg);
        var len = size[0];
        var markLeft = group.findByClassName('triangle-mark-left');
        if (markLeft) {
            var leftPos = null;
            var diffY = len * Math.sin((1 / 3) * Math.PI);
            var r = len * Math.sin((1 / 3) * Math.PI);
            if (direction === 'up') {
                leftPos = [-r, diffY];
            }
            else if (direction === 'down') {
                leftPos = [-r, -diffY];
            }
            else if (direction === 'left') {
                leftPos = [-r, r - diffY];
            }
            if (leftPos) {
                // left circle
                markLeft.attr(__assign(__assign({}, markStyle), { x: leftPos[0], y: leftPos[1], r: markSize }));
            }
        }
        var markRight = group.findByClassName('triangle-mark-right');
        if (markRight) {
            var rightPos = null;
            var diffY = len * Math.sin((1 / 3) * Math.PI);
            var r = len * Math.sin((1 / 3) * Math.PI);
            if (direction === 'up') {
                rightPos = [r, diffY];
            }
            else if (direction === 'down') {
                rightPos = [r, -diffY];
            }
            else if (direction === 'right') {
                rightPos = [r, r - diffY];
            }
            if (rightPos) {
                markRight.attr(__assign(__assign({}, markStyle), { x: rightPos[0], y: rightPos[1], r: markSize }));
            }
        }
        var markTop = group.findByClassName('triangle-mark-top');
        if (markTop) {
            var topPos = null;
            var diffY = len * Math.sin((1 / 3) * Math.PI);
            var r = len * Math.sin((1 / 3) * Math.PI);
            if (direction === 'up') {
                topPos = [r - diffY, -diffY];
            }
            else if (direction === 'left') {
                topPos = [r, -diffY];
            }
            else if (direction === 'right') {
                topPos = [-r, -diffY];
            }
            if (topPos) {
                // top circle
                markTop.attr(__assign(__assign({}, markStyle), { x: topPos[0], y: topPos[1], r: markSize }));
            }
        }
        var markBottom = group.findByClassName('triangle-mark-bottom');
        if (markBottom) {
            var bottomPos = null;
            var diffY = len * Math.sin((1 / 3) * Math.PI);
            var r = len * Math.sin((1 / 3) * Math.PI);
            if (direction === 'down') {
                bottomPos = [-r + diffY, diffY];
            }
            else if (direction === 'left') {
                bottomPos = [r, diffY];
            }
            else if (direction === 'right') {
                bottomPos = [-r, diffY];
            }
            if (bottomPos) {
                // bottom circle
                markBottom.attr(__assign(__assign({}, markStyle), { x: bottomPos[0], y: bottomPos[1], r: markSize }));
            }
        }
    }
}, 'single-node');
//# sourceMappingURL=triangle.js.map