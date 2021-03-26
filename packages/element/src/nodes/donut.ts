import { IGroup, IShape } from '@antv/g-base';
import {
  registerNode,
  Item,
  NodeConfig,
  ShapeStyle,
  ShapeOptions,
  BaseGlobal as Global,
  Util
} from '@antv/g6-core';
import { deepMix, isNumber, isArray } from '@antv/util';

const { defaultSubjectColors } = Util;

// 饼图节点
registerNode(
  'donut',
  {
    // 自定义节点时的配置
    options: {
      size: Global.defaultNode.size,
      style: {
        x: 0,
        y: 0,
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
    shapeType: 'circle',
    // 文本位置
    labelPosition: 'center',
    drawShape(cfg: NodeConfig, group: IGroup): IShape {
      const { icon: defaultIcon = {} } = this.getOptions(cfg) as NodeConfig;
      const style = this.getShapeStyle!(cfg);
      const icon = deepMix({}, defaultIcon, cfg.icon);
      const keyShape: IShape = group.addShape('circle', {
        attrs: style,
        className: `${this.type}-keyShape`,
        draggable: true,
      });

      const { width, height, show } = icon;
      if (show) {
        group.addShape('image', {
          attrs: {
            x: -width / 2,
            y: -height / 2,
            ...icon,
          },
          className: `${this.type}-icon`,
          name: `${this.type}-icon`,
          draggable: true,
        });
      }

      let donutR = keyShape.attr('r');
      let innerR = 0.6 * donutR; // 甜甜圈的内环半径
      const arcR = (donutR + innerR) / 2; // 内环半径与外环半径的平均值

      const { donutAttrs, donutColorMap = {} } = cfg as any;
      console.log('donutAttrs', donutAttrs)
      const attrNum = Object.keys(donutAttrs).length;
      if (donutAttrs && attrNum > 1) {
        const attrs: any[] = [];
        let totalValue = 0;
        Object.keys(donutAttrs).forEach((name) => {
          const value = donutAttrs[name] || 0;
          if (!isNumber(value)) return;
          attrs.push({
            key: name,
            value,
            color: donutColorMap[name],
          });
          totalValue += value;
        });
        if (totalValue) {
          const lineWidth = donutR - innerR;
          if (attrNum === 1) {
            group.addShape('circle', {
              attrs: {
                r: arcR,
                x: 0,
                y: 0,
                stroke: attrs[0].color || defaultSubjectColors[0],
                lineWidth,
              },
              name: 'fan-shape',
            });
            return;
          }
          let arcBegin = [arcR, 0];
          let beginAngle = 0;
          attrs.forEach((attr, i) => {
            let percent = attr.value / totalValue;
            if (percent < 0.001) return;
            if (percent > 0.999) percent = 1;
            if (percent === 1) {
              group.addShape('circle', {
                attrs: {
                  r: arcR,
                  x: 0,
                  y: 0,
                  stroke: attr.color || defaultSubjectColors[i],
                  lineWidth,
                },
                name: 'fan-shape',
              });
              return;
            }
            attr.percent = percent;
            attr.angle = percent * Math.PI * 2;
            attr.beginAgnle = beginAngle;
            beginAngle += attr.angle;
            attr.endAngle = beginAngle;
            attr.arcBegin = arcBegin;
            attr.arcEnd = [
              arcR * Math.cos(attr.endAngle),
              -arcR * Math.sin(attr.endAngle),
            ];
            const isBig = attr.angle > Math.PI ? 1 : 0;
            const path = [
              ['M', attr.arcBegin[0], attr.arcBegin[1]],
              ['A', arcR, arcR, 0, isBig, 0, attr.arcEnd[0], attr.arcEnd[1]],
              ['L', attr.arcEnd[0], attr.arcEnd[1]],
            ];
            group.addShape('path', {
              attrs: {
                path,
                lineWidth,
                stroke: attr.color || defaultSubjectColors[i],
              },
              name: 'fan-shape',
            });
            arcBegin = attr.arcEnd;
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

      const { top, left, right, bottom, size: markSize, r: markR, ...markStyle } = linkPoints;
      const size = this.getSize!(cfg);
      const r = size[0] / 2;
      if (left) {
        // left circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: -r,
            y: 0,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-left',
          name: 'link-point-left',
          isAnchorPoint: true,
        });
      }

      if (right) {
        // right circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: r,
            y: 0,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-right',
          name: 'link-point-right',
          isAnchorPoint: true,
        });
      }

      if (top) {
        // top circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: 0,
            y: -r,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-top',
          name: 'link-point-top',
          isAnchorPoint: true,
        });
      }

      if (bottom) {
        // bottom circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: 0,
            y: r,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-bottom',
          name: 'link-point-bottom',
          isAnchorPoint: true,
        });
      }
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle(cfg: NodeConfig): ShapeStyle {
      const { style: defaultStyle } = this.getOptions(cfg) as NodeConfig;
      const strokeStyle = {
        stroke: cfg.color,
      };
      // 如果设置了color，则覆盖默认的stroke属性
      const style = deepMix({}, defaultStyle, strokeStyle);
      const size = (this as ShapeOptions).getSize!(cfg);
      const r = size[0] / 2;
      const styles = {
        x: 0,
        y: 0,
        r,
        ...style,
      };
      return styles;
    },
    update: undefined
    // update(cfg: NodeConfig, item: Item) {
    //   const group = item.getContainer();
    //   const size = (this as ShapeOptions).getSize!(cfg);
    //   // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
    //   const strokeStyle = {
    //     stroke: cfg.color,
    //     r: size[0] / 2,
    //   };
    //   // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
    //   const keyShape = item.get('keyShape');
    //   const style = deepMix({}, keyShape.attr(), strokeStyle, cfg.style);

    //   (this as any).updateShape(cfg, item, style, true);
    //   (this as any).updateLinkPoints(cfg, group);
    // },
  },
  'single-node',
);
