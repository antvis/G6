import { __assign } from "tslib";
import Shape from '../shape';
import { Circle, Rect, Ellipse, Polygon, Path } from '@antv/g-canvas/lib/shape';
/**
 * 基本的图片，可以添加文本，默认文本在图片的下面
 */
Shape.registerNode('image', {
    options: {
        img: 'https://img2.bosszhipin.com/boss/avatar/avatar_13.png',
        size: 200,
        clipCfg: {
            show: false,
            type: 'circle',
            // circle
            r: 50,
            // ellipse
            rx: 50,
            ry: 35,
            // rect
            width: 50,
            height: 35,
            // polygon
            points: [
                [30, 12],
                [12, 30],
                [30, 48],
                [48, 30]
            ],
            // path
            path: [
                ['M', 25, 25],
                ['L', 50, 25],
                ['A', 12.5, 12.5, 0, 1, 1, 50, 50],
                ['A', 12.5, 12.5, 0, 1, 0, 50, 50],
                ['L', 25, 75],
                ['Z']
            ],
            // 坐标
            x: 0,
            y: 0,
            // clip 的属性样式
            style: {
                lineWidth: 1
            }
        }
    },
    shapeType: 'image',
    labelPosition: 'bottom',
    drawShape: function (cfg, group) {
        var shapeType = this.shapeType; // || this.type，都已经加了 shapeType
        var style = this.getShapeStyle(cfg);
        var shape = group.addShape(shapeType, {
            attrs: style
        });
        this.drawClip(cfg, shape);
        return shape;
    },
    drawClip: function (cfg, shape) {
        var clip = Object.assign({}, this.options.clipCfg, cfg.clipCfg);
        if (!clip.show) {
            return;
        }
        // 支持circle、rect、ellipse、Polygon及自定义path clip
        var type = clip.type, x = clip.x, y = clip.y, style = clip.style;
        var clipShape = null;
        if (type === 'circle') {
            var r = clip.r;
            clipShape = new Circle({
                attrs: __assign({ r: r,
                    x: x,
                    y: y }, style)
            });
        }
        else if (type === 'rect') {
            var width = clip.width, height = clip.height;
            clipShape = new Rect({
                attrs: __assign({ x: x,
                    y: y,
                    width: width,
                    height: height }, style)
            });
        }
        else if (type === 'ellipse') {
            var rx = clip.rx, ry = clip.ry;
            clipShape = new Ellipse({
                attrs: __assign({ x: x,
                    y: y,
                    rx: rx,
                    ry: ry }, style)
            });
        }
        else if (type === 'polygon') {
            var points = clip.points;
            clipShape = new Polygon({
                attrs: __assign({ points: points }, style)
            });
        }
        else if (type === 'path') {
            var path = clip.path;
            clipShape = new Path({
                attrs: __assign({ path: path }, style)
            });
        }
        if (clipShape) {
            shape.attr('clip', clipShape);
        }
    },
    getShapeStyle: function (cfg) {
        var size = this.getSize(cfg);
        var img = cfg.img || this.options.img;
        var width = size[0];
        var height = size[1];
        var style = Object.assign({}, {
            x: 0 - width / 2,
            y: 0 - height / 2,
            width: width,
            height: height,
            img: img
        }, cfg.style);
        return style;
    }
}, 'single-node');
//# sourceMappingURL=image.js.map