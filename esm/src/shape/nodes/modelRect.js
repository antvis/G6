import { __assign, __rest } from "tslib";
import deepMix from '@antv/util/lib/deep-mix';
import Shape from '../shape';
Shape.registerNode('modelRect', {
    // labelPosition: 'center',
    // 自定义节点时的配置
    options: {
        size: [185, 70],
        style: {
            radius: 5,
            stroke: '#69c0ff',
            fill: '#ffffff',
            lineWidth: 1,
            fillOpacity: 1
        },
        // 文本样式配置
        labelCfg: {
            style: {
                fill: '#595959',
                fontSize: 14
            },
            offset: 30
        },
        preRect: {
            show: true,
            width: 4,
            fill: '#40a9ff',
            radius: 2
        },
        // 节点上左右上下四个方向上的链接circle配置
        linkPoints: {
            top: false,
            right: false,
            bottom: false,
            left: false,
            // circle的大小
            size: 3,
            lineWidth: 1,
            fill: '#72CC4A',
            stroke: '#72CC4A'
        },
        // 节点中icon配置
        logoIcon: {
            // 是否显示icon，值为 false 则不渲染icon
            show: true,
            x: 0,
            y: 0,
            // icon的地址，字符串类型
            img: 'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
            width: 16,
            height: 16,
            // 用于调整图标的左右位置
            offset: 0
        },
        // 节点中表示状态的icon配置
        stateIcon: {
            // 是否显示icon，值为 false 则不渲染icon
            show: true,
            x: 0,
            y: 0,
            // icon的地址，字符串类型
            img: 'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
            width: 16,
            height: 16,
            // 用于调整图标的左右位置
            offset: -5
        },
        // 连接点，默认为左右
        anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
    },
    shapeType: 'modelRect',
    drawShape: function (cfg, group) {
        var defaultPreRect = this.options.preRect;
        var style = this.getShapeStyle(cfg);
        var size = this.getSize(cfg);
        var width = size[0];
        var height = size[1];
        var keyShape = group.addShape('rect', {
            attrs: style
        });
        var preRect = deepMix({}, defaultPreRect, cfg.preRect);
        var preRectShow = preRect.show, preRectStyle = __rest(preRect, ["show"]);
        if (preRectShow) {
            group.addShape('rect', {
                attrs: __assign({ x: -width / 2, y: -height / 2, height: height }, preRectStyle),
                className: 'pre-rect'
            });
        }
        this.drawLogoIcon(cfg, group);
        this.drawStateIcon(cfg, group);
        this.drawLinkPoints(cfg, group);
        return keyShape;
    },
    /**
     * 绘制模型矩形左边的logo图标
     * @param {Object} cfg 数据配置项
     * @param {Group} group Group实例
     */
    drawLogoIcon: function (cfg, group) {
        var defaultLogoIcon = this.options.logoIcon;
        var logoIcon = deepMix({}, defaultLogoIcon, cfg.logoIcon);
        var size = this.getSize(cfg);
        var width = size[0];
        if (logoIcon.show) {
            var w = logoIcon.width, h = logoIcon.height, x = logoIcon.x, y = logoIcon.y, offset = logoIcon.offset, logoIconStyle = __rest(logoIcon, ["width", "height", "x", "y", "offset"]);
            var image = group.addShape('image', {
                attrs: __assign(__assign({}, logoIconStyle), { x: x || -width / 2 + w + offset, y: y || -h / 2, width: w, height: h }),
                className: 'rect-logo-icon'
            });
            image.set('capture', false);
        }
    },
    /**
     * 绘制模型矩形右边的状态图标
     * @param {Object} cfg 数据配置项
     * @param {Group} group Group实例
     */
    drawStateIcon: function (cfg, group) {
        var defaultStateIcon = this.options.stateIcon;
        var stateIcon = deepMix({}, defaultStateIcon, cfg.stateIcon);
        var size = this.getSize(cfg);
        var width = size[0];
        if (stateIcon.show) {
            var w = stateIcon.width, h = stateIcon.height, x = stateIcon.x, y = stateIcon.y, offset = stateIcon.offset, iconStyle = __rest(stateIcon, ["width", "height", "x", "y", "offset"]);
            var image = group.addShape('image', {
                attrs: __assign(__assign({}, iconStyle), { x: x || width / 2 - w + offset, y: y || -h / 2, width: w, height: h }),
                className: 'rect-state-icon'
            });
            image.set('capture', false);
        }
    },
    /**
     * 绘制节点上的LinkPoints
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    drawLinkPoints: function (cfg, group) {
        var defaultLinkPoints = this.options.linkPoints;
        var linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);
        var top = linkPoints.top, left = linkPoints.left, right = linkPoints.right, bottom = linkPoints.bottom, markSize = linkPoints.size, markStyle = __rest(linkPoints, ["top", "left", "right", "bottom", "size"]);
        var size = this.getSize(cfg);
        var width = size[0];
        var height = size[1];
        if (left) {
            // left circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: -width / 2, y: 0, r: markSize }),
                className: 'rect-mark-left',
                isAnchorPoint: true
            });
        }
        if (right) {
            // right circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: width / 2, y: 0, r: markSize }),
                className: 'rect-mark-right',
                isAnchorPoint: true
            });
        }
        if (top) {
            // top circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: 0, y: -height / 2, r: markSize }),
                className: 'rect-mark-top',
                isAnchorPoint: true
            });
        }
        if (bottom) {
            // bottom circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: 0, y: height / 2, r: markSize }),
                className: 'rect-mark-bottom',
                isAnchorPoint: true
            });
        }
    },
    drawLabel: function (cfg, group) {
        var _a = this.options, defaultLabelCfg = _a.labelCfg, defaultLogoIcon = _a.logoIcon;
        var logoIcon = deepMix({}, defaultLogoIcon, cfg.logoIcon);
        var labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
        var size = this.getSize(cfg);
        var width = size[0];
        var label = null;
        var show = logoIcon.show, w = logoIcon.width;
        var offsetX = -width / 2 + labelCfg.offset;
        if (show) {
            offsetX = -width / 2 + w + labelCfg.offset;
        }
        var fontStyle = labelCfg.style;
        if (cfg.description) {
            label = group.addShape('text', {
                attrs: __assign(__assign({}, fontStyle), { y: -5, x: offsetX, text: cfg.label })
            });
            group.addShape('text', {
                attrs: {
                    text: cfg.description,
                    fontSize: 12,
                    x: offsetX,
                    y: 17,
                    fill: '#bfbfbf'
                },
                className: 'rect-description'
            });
        }
        else {
            label = group.addShape('text', {
                attrs: __assign(__assign({}, fontStyle), { x: offsetX, y: 7, text: cfg.label })
            });
        }
        return label;
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
        var size = this.getSize(cfg);
        var width = size[0];
        var height = size[1];
        var styles = Object.assign({}, {
            x: -width / 2,
            y: -height / 2,
            width: width,
            height: height
        }, style);
        return styles;
    },
    update: function (cfg, item) {
        var _a = this.options, defaultStyle = _a.style, defaultLabelCfg = _a.labelCfg, defaultPreRect = _a.preRect, defaultLogoIcon = _a.logoIcon, defaultStateIcon = _a.stateIcon;
        var style = deepMix({}, defaultStyle, cfg.style);
        var size = this.getSize(cfg);
        var width = size[0];
        var height = size[1];
        var keyShape = item.get('keyShape');
        keyShape.attr(__assign(__assign({}, style), { x: -width / 2, y: -height / 2, width: width,
            height: height }));
        var group = item.getContainer();
        var labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
        var text = group.find(function (element) { return element.get('className') === 'node-label'; });
        var logoIcon = deepMix({}, defaultLogoIcon, cfg.logoIcon);
        var show = logoIcon.show, w = logoIcon.width;
        var offset = labelCfg.offset, fontStyle = labelCfg.style;
        var offsetX = -width / 2 + offset;
        if (show) {
            offsetX = -width / 2 + w + offset;
        }
        var descriptionText = group.find(function (element) { return element.get('className') === 'rect-description'; });
        if (descriptionText) {
            // 正常情况下，如果descriptionText存在，text一定会存在，为了保证起见，多加一层判断
            if (text) {
                text.attr(__assign(__assign({}, fontStyle), { y: -5, x: offsetX }));
            }
            descriptionText.attr({
                x: offsetX,
                y: 17
            });
        }
        else {
            if (text) {
                text.attr(__assign(__assign({}, fontStyle), { x: offsetX, y: -5 }));
            }
        }
        var preRectShape = group.find(function (element) { return element.get('className') === 'pre-rect'; });
        if (preRectShape) {
            var preRect = deepMix({}, defaultPreRect, cfg.preRect);
            preRectShape.attr(__assign(__assign({}, preRect), { x: -width / 2, y: -height / 2, height: height }));
        }
        var logoIconShape = group.find(function (element) { return element.get('className') === 'rect-logo-icon'; });
        if (logoIconShape) {
            var w_1 = logoIcon.width, h = logoIcon.height, x = logoIcon.x, y = logoIcon.y, offset_1 = logoIcon.offset, logoIconStyle = __rest(logoIcon, ["width", "height", "x", "y", "offset"]);
            logoIconShape.attr(__assign(__assign({}, logoIconStyle), { x: x || -width / 2 + w_1 + offset_1, y: y || -h / 2, width: w_1, height: h }));
        }
        var stateIconShape = group.find(function (element) { return element.get('className') === 'rect-state-icon'; });
        if (stateIconShape) {
            var stateIcon = deepMix({}, defaultStateIcon, cfg.stateIcon);
            var w_2 = stateIcon.width, h = stateIcon.height, x = stateIcon.x, y = stateIcon.y, offset_2 = stateIcon.offset, stateIconStyle = __rest(stateIcon, ["width", "height", "x", "y", "offset"]);
            stateIconShape.attr(__assign(__assign({}, stateIconStyle), { x: x || width / 2 - w_2 + offset_2, y: y || -h / 2, width: w_2, height: h }));
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
        var markSize = linkPoints.size, markFill = linkPoints.fill, markStroke = linkPoints.stroke, borderWidth = linkPoints.lineWidth;
        var size = this.getSize(cfg);
        var width = size[0];
        var height = size[1];
        var markLeft = group.find(function (element) { return element.get('className') === 'rect-mark-left'; });
        if (markLeft) {
            markLeft.attr({
                x: -width / 2,
                y: 0,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
        var markRight = group.find(function (element) { return element.get('className') === 'rect-mark-right'; });
        if (markRight) {
            markRight.attr({
                x: width / 2,
                y: 0,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
        var markTop = group.find(function (element) { return element.get('className') === 'rect-mark-top'; });
        if (markTop) {
            markTop.attr({
                x: 0,
                y: -height / 2,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
        var markBottom = group.find(function (element) { return element.get('className') === 'rect-mark-bottom'; });
        if (markBottom) {
            markBottom.attr({
                x: 0,
                y: height / 2,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
    }
}, 'single-node');
//# sourceMappingURL=modelRect.js.map