import { IGroup, IShape } from '@antv/g-base';
import {
  registerNode,
  Item,
  NodeConfig,
  ShapeStyle,
  ShapeOptions,
  BaseGlobal as Global,
  UpdateType,
} from '@antv/g6-core';
import { deepMix } from '@antv/util';

// 带有图标的圆，可用于拓扑图中
registerNode(
  'circle',
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
          fontFamily: Global.windowFontFamily
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
      const { icon: defaultIcon = {} } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
      const style = this.getShapeStyle!(cfg);
      const icon = deepMix({}, defaultIcon, cfg.icon);
      const name = `${this.type}-keyShape`;
      const keyShape: IShape = group.addShape('circle', {
        attrs: style,
        className: name,
        name,
        draggable: true,
      });
      group['shapeMap'][name] = keyShape;

      const { width, height, show, text } = icon;
      if (show) {
        const iconName = `${this.type}-icon`;
        if (text) {
          group['shapeMap'][iconName] = group.addShape('text', {
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
            className: iconName,
            name: iconName,
            draggable: true,
          });
        } else {
          group['shapeMap'][iconName] = group.addShape('image', {
            attrs: {
              x: -width / 2,
              y: -height / 2,
              ...icon,
            },
            className: iconName,
            name: iconName,
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
      const { linkPoints } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
      if (!linkPoints) return;

      const { top, left, right, bottom, size: markSize, r: markR, ...markStyle } = linkPoints || {};
      const size = this.getSize!(cfg);
      const r = size[0] / 2;
      if (left) {
        // left circle
        const name = 'link-point-left';
        group['shapeMap'][name] = group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: -r,
            y: 0,
            r: markSize / 2 || markR || 5,
          },
          className: name,
          name,
          isAnchorPoint: true,
        });
      }

      if (right) {
        // right circle
        const name = 'link-point-right';
        group['shapeMap'][name] = group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: r,
            y: 0,
            r: markSize / 2 || markR || 5,
          },
          className: name,
          name,
          isAnchorPoint: true,
        });
      }

      if (top) {
        // top circle
        const name = 'link-point-top';
        group['shapeMap'][name] = group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: 0,
            y: -r,
            r: markSize / 2 || markR || 5,
          },
          className: name,
          name,
          isAnchorPoint: true,
        });
      }

      if (bottom) {
        // bottom circle
        const name = 'link-point-bottom';
        group['shapeMap'][name] = group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: 0,
            y: r,
            r: markSize / 2 || markR || 5,
          },
          className: name,
          name,
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
      const { style: defaultStyle } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
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
    update(cfg: NodeConfig, item: Item, updateType?: UpdateType) {
      const group = item.getContainer();
      const size = (this as ShapeOptions).getSize!(cfg);
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      // const strokeStyle = {
      //   stroke: cfg.color,
      //   r: size[0] / 2,
      // };
      // // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      // const keyShape = item.get('keyShape');

      // TODO: performance
      // const style = deepMix({}, keyShape.attr(), strokeStyle, cfg.style);
      // const style = deepMix({}, keyShape.attr(), cfg.style);
      const style = {...cfg.style};
      if (cfg.style.stroke === undefined && cfg.color) {
        style.stroke = cfg.color;
      }
      if (cfg.style.r === undefined && !isNaN(size[0])) {
        style.r = size[0] / 2
      }

      (this as any).updateShape(cfg, item, style, true, updateType);
      // (this as any).updateShape(cfg, item, style, true, updateType);
      (this as any).updateLinkPoints(cfg, group);
    },
  },
  'single-node',
);
