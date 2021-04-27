import { IGroup, IShape } from '@antv/g-base';
import {
  registerNode,
  Item,
  NodeConfig,
  ShapeStyle,
  ShapeOptions,
  BaseGlobal as Global,
  ModelConfig,
} from '@antv/g6-core';

import { mix } from '@antv/util';

// 三角形
registerNode(
  'triangle',
  {
    // 自定义节点时的配置
    options: {
      size: 40,
      direction: 'up',
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
        offset: 15,
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
        offset: 6,
      },
      stateStyles: {
        ...Global.nodeStateStyles,
      },
    },
    shapeType: 'triangle',
    // 文本位置
    labelPosition: 'bottom',
    drawShape(cfg: NodeConfig, group: IGroup): IShape {
      const { icon = {}, direction: defaultDirection } = this.getOptions(cfg) as NodeConfig;
      const style = this.getShapeStyle!(cfg);
      const direction = cfg.direction || defaultDirection;

      const keyShape = group.addShape('path', {
        attrs: style,
        className: `${this.type}-keyShape`,
        name: `${this.type}-keyShape`,
        draggable: true,
      });

      const { width: w, height: h, show, offset, text } = icon;
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
          let iconW = -w! / 2;
          let iconH = -h! / 2;
          if (direction === 'up' || direction === 'down') {
            iconH += offset;
          }
          if (direction === 'left' || direction === 'right') {
            iconW += offset;
          }
          group.addShape('image', {
            attrs: {
              x: iconW,
              y: iconH,
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
      const { linkPoints = {}, direction: defaultDirection } = this.getOptions(cfg) as NodeConfig;

      const direction = cfg.direction || defaultDirection;

      const { top, left, right, bottom, size: markSize, r: markR, ...markStyle } = linkPoints;

      const size = (this as ShapeOptions).getSize!(cfg);
      const len = size[0];

      if (left) {
        // up down left right 四个方向的坐标均不相同
        let leftPos = null;
        const diffY = len * Math.sin((1 / 3) * Math.PI);
        const r = len * Math.sin((1 / 3) * Math.PI);
        if (direction === 'up') {
          leftPos = [-r, diffY];
        } else if (direction === 'down') {
          leftPos = [-r, -diffY];
        } else if (direction === 'left') {
          leftPos = [-r, r - diffY];
        }

        if (leftPos) {
          // left circle
          group.addShape('circle', {
            attrs: {
              ...markStyle,
              x: leftPos[0],
              y: leftPos[1],
              r: markSize / 2 || markR || 5,
            },
            className: 'link-point-left',
            name: 'link-point-left',
          });
        }
      }

      if (right) {
        // right circle
        // up down left right 四个方向的坐标均不相同
        let rightPos = null;
        const diffY = len * Math.sin((1 / 3) * Math.PI);
        const r = len * Math.sin((1 / 3) * Math.PI);
        if (direction === 'up') {
          rightPos = [r, diffY];
        } else if (direction === 'down') {
          rightPos = [r, -diffY];
        } else if (direction === 'right') {
          rightPos = [r, r - diffY];
        }

        if (rightPos) {
          group.addShape('circle', {
            attrs: {
              ...markStyle,
              x: rightPos[0],
              y: rightPos[1],
              r: markSize / 2 || markR || 5,
            },
            className: 'link-point-right',
            name: 'link-point-right',
          });
        }
      }

      if (top) {
        // up down left right 四个方向的坐标均不相同
        let topPos = null;
        const diffY = len * Math.sin((1 / 3) * Math.PI);
        const r = len * Math.sin((1 / 3) * Math.PI);
        if (direction === 'up') {
          topPos = [r - diffY, -diffY];
        } else if (direction === 'left') {
          topPos = [r, -diffY];
        } else if (direction === 'right') {
          topPos = [-r, -diffY];
        }

        if (topPos) {
          // top circle
          group.addShape('circle', {
            attrs: {
              ...markStyle,
              x: topPos[0],
              y: topPos[1],
              r: markSize / 2 || markR || 5,
            },
            className: 'link-point-top',
            name: 'link-point-top',
          });
        }
      }

      if (bottom) {
        // up down left right 四个方向的坐标均不相同
        let bottomPos = null;
        const diffY = len * Math.sin((1 / 3) * Math.PI);
        const r = len * Math.sin((1 / 3) * Math.PI);
        if (direction === 'down') {
          bottomPos = [-r + diffY, diffY];
        } else if (direction === 'left') {
          bottomPos = [r, diffY];
        } else if (direction === 'right') {
          bottomPos = [-r, diffY];
        }

        if (bottomPos) {
          // bottom circle
          group.addShape('circle', {
            attrs: {
              ...markStyle,
              x: bottomPos[0],
              y: bottomPos[1],
              r: markSize / 2 || markR || 5,
            },
            className: 'link-point-bottom',
            name: 'link-point-bottom',
          });
        }
      }
    },
    getPath(cfg: ModelConfig) {
      const { direction: defaultDirection } = this.getOptions(cfg) as NodeConfig;

      const direction = cfg.direction || defaultDirection;
      const size = (this as ShapeOptions).getSize!(cfg);
      const len = size[0];

      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);
      let path = [
        ['M', -r, diffY],
        ['L', 0, -diffY],
        ['L', r, diffY],
        ['Z'], // 封闭
      ];

      if (direction === 'down') {
        path = [
          ['M', -r, -diffY],
          ['L', r, -diffY],
          ['L', 0, diffY],
          ['Z'], // 封闭
        ];
      } else if (direction === 'left') {
        path = [
          ['M', -r, r - diffY],
          ['L', r, -r],
          ['L', r, r],
          ['Z'], // 封闭
        ];
      } else if (direction === 'right') {
        path = [
          ['M', r, r - diffY],
          ['L', -r, r],
          ['L', -r, -r],
          ['Z'], // 封闭
        ];
      }
      return path;
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle(cfg: NodeConfig) {
      const { style: defaultStyle } = this.getOptions(cfg) as NodeConfig;
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };
      // 如果设置了color，则覆盖默认的stroke属性
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
      const { linkPoints: defaultLinkPoints, direction: defaultDirection } = this.getOptions(
        {},
      ) as NodeConfig;

      const direction = cfg.direction || defaultDirection;

      const markLeft = group.find((element) => element.get('className') === 'link-point-left');
      const markRight = group.find((element) => element.get('className') === 'link-point-right');
      const markTop = group.find((element) => element.get('className') === 'link-point-top');
      const markBottom = group.find((element) => element.get('className') === 'link-point-bottom');

      let currentLinkPoints = defaultLinkPoints;
      const existLinkPoint = markLeft || markRight || markTop || markBottom;
      if (existLinkPoint) {
        currentLinkPoints = existLinkPoint.attr();
      }

      const linkPoints = mix({}, currentLinkPoints, cfg.linkPoints);

      const { fill: markFill, stroke: markStroke, lineWidth: borderWidth } = linkPoints;
      let markSize = linkPoints.size / 2;
      if (!markSize) markSize = linkPoints.r;
      const { left, right, top, bottom } = cfg.linkPoints
        ? cfg.linkPoints
        : { left: undefined, right: undefined, top: undefined, bottom: undefined };

      const size = (this as ShapeOptions).getSize!(cfg);
      const len = size[0];
      const styles = {
        r: markSize,
        fill: markFill,
        stroke: markStroke,
        lineWidth: borderWidth,
      };

      let leftPos = null;
      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);
      if (direction === 'up') {
        leftPos = [-r, diffY];
      } else if (direction === 'down') {
        leftPos = [-r, -diffY];
      } else if (direction === 'left') {
        leftPos = [-r, r - diffY];
      }
      if (leftPos) {
        if (markLeft) {
          if (!left && left !== undefined) {
            markLeft.remove();
          } else {
            markLeft.attr({
              ...styles,
              x: leftPos[0],
              y: leftPos[1],
            });
          }
        } else if (left) {
          group.addShape('circle', {
            attrs: {
              ...styles,
              x: leftPos[0],
              y: leftPos[1],
            },
            className: 'link-point-left',
            name: 'link-point-left',
            isAnchorPoint: true,
          });
        }
      }

      let rightPos = null;
      if (direction === 'up') {
        rightPos = [r, diffY];
      } else if (direction === 'down') {
        rightPos = [r, -diffY];
      } else if (direction === 'right') {
        rightPos = [r, r - diffY];
      }
      if (rightPos) {
        if (markRight) {
          if (!right && right !== undefined) {
            markRight.remove();
          } else {
            markRight.attr({
              ...styles,
              x: rightPos[0],
              y: rightPos[1],
            });
          }
        } else if (right) {
          group.addShape('circle', {
            attrs: {
              ...styles,
              x: rightPos[0],
              y: rightPos[1],
            },
            className: 'link-point-right',
            name: 'link-point-right',
            isAnchorPoint: true,
          });
        }
      }

      let topPos = null;
      if (direction === 'up') {
        topPos = [r - diffY, -diffY];
      } else if (direction === 'left') {
        topPos = [r, -diffY];
      } else if (direction === 'right') {
        topPos = [-r, -diffY];
      }
      if (topPos) {
        if (markTop) {
          if (!top && top !== undefined) {
            markTop.remove();
          } else {
            // top circle
            markTop.attr({
              ...styles,
              x: topPos[0],
              y: topPos[1],
            });
          }
        } else if (top) {
          group.addShape('circle', {
            attrs: {
              ...styles,
              x: topPos[0],
              y: topPos[1],
            },
            className: 'link-point-top',
            name: 'link-point-top',
            isAnchorPoint: true,
          });
        }
      }

      let bottomPos = null;
      if (direction === 'down') {
        bottomPos = [-r + diffY, diffY];
      } else if (direction === 'left') {
        bottomPos = [r, diffY];
      } else if (direction === 'right') {
        bottomPos = [-r, diffY];
      }
      if (bottomPos) {
        if (markBottom) {
          if (!bottom && bottom !== undefined) {
            markBottom.remove();
          } else {
            markBottom.attr({
              ...styles,
              x: bottomPos[0],
              y: bottomPos[1],
            });
          }
        } else if (bottom) {
          group.addShape('circle', {
            attrs: {
              ...styles,
              x: bottomPos[0],
              y: bottomPos[1],
            },
            className: 'link-point-bottom',
            name: 'link-point-bottom',
            isAnchorPoint: true,
          });
        }
      }
    },
  },
  'single-node',
);
