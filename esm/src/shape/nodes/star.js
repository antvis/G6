import { __assign, __rest } from "tslib";
import deepMix from '@antv/util/lib/deep-mix';
import Global from '../../global';
import Shape from '../shape';
// 五角星shape
Shape.registerNode('star', {
    // 自定义节点时的配置
    options: {
        size: 60,
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
            offset: 0
        },
        // 节点上左右上下四个方向上的链接circle配置
        linkPoints: {
            top: false,
            right: false,
            left: false,
            leftBottom: false,
            rightBottom: false,
            // circle的大小
            size: 3,
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
            height: 16
        }
    },
    shapeType: 'star',
    // 文本位置
    labelPosition: 'center',
    drawShape: function (cfg, group) {
        var defaultIcon = this.options.icon;
        var style = this.getShapeStyle(cfg);
        var icon = deepMix({}, defaultIcon, cfg.icon);
        var keyShape = group.addShape('path', {
            attrs: style
        });
        var w = icon.width, h = icon.height, show = icon.show;
        if (show) {
            var image = group.addShape('image', {
                attrs: __assign({ x: -w / 2, y: -h / 2 }, icon),
                className: 'star-icon'
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
        var defaultLinkPoints = this.options.linkPoints;
        var linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);
        var top = linkPoints.top, left = linkPoints.left, right = linkPoints.right, leftBottom = linkPoints.leftBottom, rightBottom = linkPoints.rightBottom, markSize = linkPoints.size, markStyle = __rest(linkPoints, ["top", "left", "right", "leftBottom", "rightBottom", "size"]);
        var size = this.getSize(cfg);
        var outerR = size[0];
        if (right) {
            // right circle
            // up down left right 四个方向的坐标均不相同
            var x1 = Math.cos((18 + 72 * 0) / 180 * Math.PI) * outerR;
            var y1 = Math.sin((18 + 72 * 0) / 180 * Math.PI) * outerR;
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: x1, y: -y1, r: markSize }),
                className: 'star-mark-right'
            });
        }
        if (top) {
            // up down left right 四个方向的坐标均不相同
            var x1 = Math.cos((18 + 72 * 1) / 180 * Math.PI) * outerR;
            var y1 = Math.sin((18 + 72 * 1) / 180 * Math.PI) * outerR;
            // top circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: x1, y: -y1, r: markSize }),
                className: 'star-mark-top'
            });
        }
        if (left) {
            // up down left right 四个方向的坐标均不相同
            var x1 = Math.cos((18 + 72 * 2) / 180 * Math.PI) * outerR;
            var y1 = Math.sin((18 + 72 * 2) / 180 * Math.PI) * outerR;
            // left circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: x1, y: -y1, r: markSize }),
                className: 'star-mark-left'
            });
        }
        if (leftBottom) {
            // up down left right 四个方向的坐标均不相同
            var x1 = Math.cos((18 + 72 * 3) / 180 * Math.PI) * outerR;
            var y1 = Math.sin((18 + 72 * 3) / 180 * Math.PI) * outerR;
            // left bottom circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: x1, y: -y1, r: markSize }),
                className: 'star-mark-left-bottom'
            });
        }
        if (rightBottom) {
            // up down left right 四个方向的坐标均不相同
            var x1 = Math.cos((18 + 72 * 4) / 180 * Math.PI) * outerR;
            var y1 = Math.sin((18 + 72 * 4) / 180 * Math.PI) * outerR;
            // left bottom circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: x1, y: -y1, r: markSize }),
                className: 'star-mark-right-bottom'
            });
        }
    },
    getPath: function (cfg) {
        var size = this.getSize(cfg);
        var outerR = size[0];
        var defaultInnerR = outerR * 3 / 8;
        var innerR = cfg.innerR || defaultInnerR;
        var path = [];
        for (var i = 0; i < 5; i++) {
            var x1 = Math.cos((18 + 72 * i) / 180 * Math.PI) * outerR;
            var y1 = Math.sin((18 + 72 * i) / 180 * Math.PI) * outerR;
            var x2 = Math.cos((54 + 72 * i) / 180 * Math.PI) * innerR;
            var y2 = Math.sin((54 + 72 * i) / 180 * Math.PI) * innerR;
            if (i === 0) {
                path.push([
                    'M', x1, -y1
                ]);
            }
            else {
                path.push([
                    'L', x1, -y1
                ]);
            }
            path.push([
                'L', x2, -y2
            ]);
        }
        path.push([
            'Z'
        ]);
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
        var starIcon = group.find(function (element) { return element.get('className') === 'star-icon'; });
        if (starIcon) {
            var w = icon.width, h = icon.height;
            starIcon.attr(__assign({ x: -w / 2, y: -h / 2 }, icon));
        }
        this.updateLinkPoints(cfg, group);
    },
    /**
     * 更新linkPoints
     * @param {Object} cfg 节点数据配置项
     * @param {Group} group Item所在的group
     */
    updateLinkPoints: function (cfg, group) {
        var defaultLinkPoints = this.options.linkPoints;
        var linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);
        var markSize = linkPoints.size, markStyle = __rest(linkPoints, ["size"]);
        var size = this.getSize(cfg);
        var outerR = size[0];
        var markRight = group.find(function (element) { return element.get('className') === 'star-mark-right'; });
        if (markRight) {
            var x = Math.cos((18 + 72 * 0) / 180 * Math.PI) * outerR;
            var y = Math.sin((18 + 72 * 0) / 180 * Math.PI) * outerR;
            markRight.attr(__assign(__assign({}, markStyle), { x: x, y: -y, r: markSize }));
        }
        var markTop = group.find(function (element) { return element.get('className') === 'star-mark-top'; });
        if (markTop) {
            var x = Math.cos((18 + 72 * 1) / 180 * Math.PI) * outerR;
            var y = Math.sin((18 + 72 * 1) / 180 * Math.PI) * outerR;
            // top circle
            markTop.attr(__assign(__assign({}, markStyle), { x: x, y: -y, r: markSize }));
        }
        var markLeft = group.find(function (element) { return element.get('className') === 'star-mark-left'; });
        if (markLeft) {
            var x = Math.cos((18 + 72 * 2) / 180 * Math.PI) * outerR;
            var y = Math.sin((18 + 72 * 2) / 180 * Math.PI) * outerR;
            // left circle
            markLeft.attr(__assign(__assign({}, markStyle), { x: x, y: -y, r: markSize }));
        }
        var markLeftBottom = group.find(function (element) { return element.get('className') === 'star-mark-left-bottom'; });
        if (markLeftBottom) {
            var x = Math.cos((18 + 72 * 3) / 180 * Math.PI) * outerR;
            var y = Math.sin((18 + 72 * 3) / 180 * Math.PI) * outerR;
            // bottom circle
            markLeftBottom.attr(__assign(__assign({}, markStyle), { x: x, y: -y, r: markSize }));
        }
        var markRightBottom = group.find(function (element) { return element.get('className') === 'star-mark-right-bottom'; });
        if (markRightBottom) {
            var x = Math.cos((18 + 72 * 4) / 180 * Math.PI) * outerR;
            var y = Math.sin((18 + 72 * 4) / 180 * Math.PI) * outerR;
            // bottom circle
            markRightBottom.attr(__assign(__assign({}, markStyle), { x: x, y: -y, r: markSize }));
        }
    }
}, 'single-node');
//# sourceMappingURL=star.js.map