import { IGroup, IShape } from '@antv/g-base';
import {
  registerNode,
  Item,
  NodeConfig,
  ShapeStyle,
  ShapeOptions,
  BaseGlobal as Global,
} from '@antv/g6-core';

import { mix } from '@antv/util';

// 五角星shape
registerNode(
  'star',
  {
    // 自定义节点时的配置
    options: {
      size: 60,
      style: {
        stroke: Global.defaultNode.style.stroke,
        fill: Global.defaultNode.style.fill,
        lineWidth: Global.defaultNode.style.lineWidth,
      },
      labelCfg: {
        style: {
          fill: Global.nodeLabel.style.fill,
          fontSize: Global.nodeLabel.style.fontSize,
        },
      },
      // 节点上左右上下四个方向上的链接circle配置
      linkPoints: {
        top: false,
        right: false,
        bottom: false,
        left: false,
        // circle的大小
        size: Global.defaultNode.linkPoints.size,
        lineWidth: Global.defaultNode.linkPoints.lineWidth,
        fill: Global.defaultNode.linkPoints.fill,
        stroke: Global.defaultNode.linkPoints.stroke,
      },
      // 节点中icon配置
      icon: {
        // 是否显示icon，值为 false 则不渲染icon
        show: false,
        // icon的地址，字符串类型
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg',
        width: 20,
        height: 20,
      },
      stateStyles: {
        ...Global.nodeStateStyles,
      },
    },
    shapeType: 'star',
    // 文本位置
    labelPosition: 'center',
    drawShape(cfg: NodeConfig, group: IGroup): IShape {
      const { icon = {} } = this.getOptions(cfg) as NodeConfig;
      const style = this.getShapeStyle!(cfg);

      const keyShape = group.addShape('path', {
        attrs: style,
        className: `${this.type}-keyShape`,
        name: `${this.type}-keyShape`,
        draggable: true,
      });

      const { width: w, height: h, show, text } = icon;
      if (show) {
        if (text) {
          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              fontSize: 12,
              fill: '#000',
              stroke: '#000',
              textBaseline: 'middle',
              textAlign: 'center',
              ...icon,
            },
            className: `${this.type}-icon`,
            name: `${this.type}-icon`,
            draggable: true,
          });
        } else {
          group.addShape('image', {
            attrs: {
              x: -w! / 2,
              y: -h! / 2,
              ...icon,
            },
            className: `${this.type}-icon`,
            name: `${this.type}-icon`,
            draggable: true,
          });
        }
      }

      (this as any).drawLinkPoints(cfg, group);

      return keyShape;
    },
    /**
     * 绘制节点上的LinkPoints
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    drawLinkPoints(cfg: NodeConfig, group: IGroup) {
      const { linkPoints = {} } = this.getOptions(cfg) as NodeConfig;

      const {
        top,
        left,
        right,
        leftBottom,
        rightBottom,
        size: markSize,
        r: markR,
        ...markStyle
      } = linkPoints;
      const size = (this as ShapeOptions).getSize!(cfg);
      const outerR = size[0];

      if (right) {
        // right circle
        // up down left right 四个方向的坐标均不相同
        const x1 = Math.cos(((18 + 72 * 0) / 180) * Math.PI) * outerR;
        const y1 = Math.sin(((18 + 72 * 0) / 180) * Math.PI) * outerR;

        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: x1,
            y: -y1,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-right',
          name: 'link-point-right',
        });
      }

      if (top) {
        // up down left right 四个方向的坐标均不相同
        const x1 = Math.cos(((18 + 72 * 1) / 180) * Math.PI) * outerR;
        const y1 = Math.sin(((18 + 72 * 1) / 180) * Math.PI) * outerR;

        // top circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: x1,
            y: -y1,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-top',
          name: 'link-point-top',
        });
      }

      if (left) {
        // up down left right 四个方向的坐标均不相同
        const x1 = Math.cos(((18 + 72 * 2) / 180) * Math.PI) * outerR;
        const y1 = Math.sin(((18 + 72 * 2) / 180) * Math.PI) * outerR;

        // left circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: x1,
            y: -y1,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-left',
          name: 'link-point-left',
        });
      }

      if (leftBottom) {
        // up down left right 四个方向的坐标均不相同
        const x1 = Math.cos(((18 + 72 * 3) / 180) * Math.PI) * outerR;
        const y1 = Math.sin(((18 + 72 * 3) / 180) * Math.PI) * outerR;

        // left bottom circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: x1,
            y: -y1,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-left-bottom',
          name: 'link-point-left-bottom',
        });
      }

      if (rightBottom) {
        // up down left right 四个方向的坐标均不相同
        const x1 = Math.cos(((18 + 72 * 4) / 180) * Math.PI) * outerR;
        const y1 = Math.sin(((18 + 72 * 4) / 180) * Math.PI) * outerR;

        // left bottom circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: x1,
            y: -y1,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-right-bottom',
          name: 'link-point-right-bottom',
        });
      }
    },
    getPath(cfg: NodeConfig) {
      const size = (this as ShapeOptions).getSize!(cfg);
      const outerR = size[0];
      const defaultInnerR = (outerR * 3) / 8;
      const innerR = cfg.innerR || defaultInnerR;
      const path = [];
      for (let i = 0; i < 5; i++) {
        const x1 = Math.cos(((18 + 72 * i) / 180) * Math.PI) * outerR;
        const y1 = Math.sin(((18 + 72 * i) / 180) * Math.PI) * outerR;
        const x2 = Math.cos(((54 + 72 * i) / 180) * Math.PI) * innerR;
        const y2 = Math.sin(((54 + 72 * i) / 180) * Math.PI) * innerR;

        if (i === 0) {
          path.push(['M', x1, -y1]);
        } else {
          path.push(['L', x1, -y1]);
        }
        path.push(['L', x2, -y2]);
      }

      path.push(['Z']);

      return path;
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle(cfg: NodeConfig): ShapeStyle {
      const { style: defaultStyle } = this.getOptions(cfg) as NodeConfig;
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };
      // 如果设置了color，则覆盖原来默认的 stroke 属性。但 cfg 中但 stroke 属性优先级更高
      const style = mix({}, defaultStyle, strokeStyle);
      const path = (this as any).getPath(cfg);
      const styles = { path, ...style };
      return styles;
    },
    update(cfg: NodeConfig, item: Item) {
      const group = item.getContainer();
      // 这里不传 cfg 参数是因为 cfg.style 需要最后覆盖样式
      const { style: defaultStyle } = this.getOptions({}) as NodeConfig;
      const path = (this as any).getPath(cfg);
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color,
        path,
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      const keyShape = item.get('keyShape');
      let style = mix({}, defaultStyle, keyShape.attr(), strokeStyle);
      style = mix(style, cfg.style);

      (this as any).updateShape(cfg, item, style, true);
      (this as any).updateLinkPoints(cfg, group);
    },

    /**
     * 更新linkPoints
     * @param {Object} cfg 节点数据配置项
     * @param {Group} group Item所在的group
     */
    updateLinkPoints(cfg: NodeConfig, group: IGroup) {
      const { linkPoints: defaultLinkPoints } = this.getOptions({}) as NodeConfig;
      const markLeft = group.find((element) => element.get('className') === 'link-point-left');
      const markRight = group.find((element) => element.get('className') === 'link-point-right');
      const markTop = group.find((element) => element.get('className') === 'link-point-top');
      const markLeftBottom = group.find(
        (element) => element.get('className') === 'link-point-left-bottom',
      );
      const markRightBottom = group.find(
        (element) => element.get('className') === 'link-point-right-bottom',
      );

      let currentLinkPoints = defaultLinkPoints;
      const existLinkPoint = markLeft || markRight || markTop || markLeftBottom || markRightBottom;
      if (existLinkPoint) {
        currentLinkPoints = existLinkPoint.attr();
      }

      const linkPoints = mix({}, currentLinkPoints, cfg.linkPoints);

      const { fill: markFill, stroke: markStroke, lineWidth: borderWidth } = linkPoints;
      let markSize = linkPoints.size / 2;
      if (!markSize) markSize = linkPoints.r;
      const { left, right, top, leftBottom, rightBottom } = cfg.linkPoints
        ? cfg.linkPoints
        : {
            left: undefined,
            right: undefined,
            top: undefined,
            leftBottom: undefined,
            rightBottom: undefined,
          };

      const size = (this as ShapeOptions).getSize!(cfg);
      const outerR = size[0];
      const styles = {
        r: markSize,
        fill: markFill,
        stroke: markStroke,
        lineWidth: borderWidth,
      };

      let x = Math.cos(((18 + 72 * 0) / 180) * Math.PI) * outerR;
      let y = Math.sin(((18 + 72 * 0) / 180) * Math.PI) * outerR;
      if (markRight) {
        if (!right && right !== undefined) {
          markRight.remove();
        } else {
          markRight.attr({
            ...styles,
            x,
            y: -y,
          });
        }
      } else if (right) {
        group.addShape('circle', {
          attrs: {
            ...styles,
            x,
            y: -y,
          },
          className: 'link-point-right',
          name: 'link-point-right',
          isAnchorPoint: true,
        });
      }

      x = Math.cos(((18 + 72 * 1) / 180) * Math.PI) * outerR;
      y = Math.sin(((18 + 72 * 1) / 180) * Math.PI) * outerR;
      if (markTop) {
        if (!top && top !== undefined) {
          markTop.remove();
        } else {
          markTop.attr({
            ...styles,
            x,
            y: -y,
          });
        }
      } else if (top) {
        group.addShape('circle', {
          attrs: {
            ...styles,
            x,
            y: -y,
          },
          className: 'link-point-top',
          name: 'link-point-top',
          isAnchorPoint: true,
        });
      }

      x = Math.cos(((18 + 72 * 2) / 180) * Math.PI) * outerR;
      y = Math.sin(((18 + 72 * 2) / 180) * Math.PI) * outerR;
      if (markLeft) {
        if (!left && left !== undefined) {
          markLeft.remove();
        } else {
          markLeft.attr({
            ...styles,
            x,
            y: -y,
          });
        }
      } else if (left) {
        group.addShape('circle', {
          attrs: {
            ...styles,
            x,
            y: -y,
          },
          className: 'link-point-left',
          name: 'link-point-left',
          isAnchorPoint: true,
        });
      }

      x = Math.cos(((18 + 72 * 3) / 180) * Math.PI) * outerR;
      y = Math.sin(((18 + 72 * 3) / 180) * Math.PI) * outerR;
      if (markLeftBottom) {
        if (!leftBottom && leftBottom !== undefined) {
          markLeftBottom.remove();
        } else {
          markLeftBottom.attr({
            ...styles,
            x,
            y: -y,
          });
        }
      } else if (leftBottom) {
        group.addShape('circle', {
          attrs: {
            ...styles,
            x,
            y: -y,
          },
          className: 'link-point-left-bottom',
          name: 'link-point-left-bottom',
          isAnchorPoint: true,
        });
      }

      x = Math.cos(((18 + 72 * 4) / 180) * Math.PI) * outerR;
      y = Math.sin(((18 + 72 * 4) / 180) * Math.PI) * outerR;
      if (markRightBottom) {
        if (!rightBottom && rightBottom !== undefined) {
          markLeftBottom.remove();
        } else {
          markRightBottom.attr({
            ...styles,
            x,
            y: -y,
          });
        }
      } else if (rightBottom) {
        group.addShape('circle', {
          attrs: {
            ...styles,
            x,
            y: -y,
          },
          className: 'link-point-right-bottom',
          name: 'link-point-right-bottom',
          isAnchorPoint: true,
        });
      }
    },
  },
  'single-node',
);
