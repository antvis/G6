import { mix } from '@antv/util';
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

registerNode(
  'rect',
  {
    // 自定义节点时的配置
    options: {
      size: [100, 30],
      style: {
        radius: 0,
        stroke: Global.defaultNode.style.stroke,
        fill: Global.defaultNode.style.fill,
        lineWidth: Global.defaultNode.style.lineWidth,
      },
      // 文本样式配置
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
      // 连接点，默认为左右
      // anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      stateStyles: {
        ...Global.nodeStateStyles,
      },
    },
    shapeType: 'rect',
    labelPosition: 'center',
    drawShape(cfg: NodeConfig, group: IGroup): IShape {
      const style = this.getShapeStyle!(cfg);

      const keyShape = group.addShape('rect', {
        attrs: style,
        className: `${this.type}-keyShape`,
        name: `${this.type}-keyShape`,
        draggable: true,
      });
      group['shapeMap'][`${this.type}-keyShape`] = keyShape;

      (this as any).drawLinkPoints(cfg, group);
      return keyShape;
    },
    /**
     * 绘制节点上的LinkPoints
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    drawLinkPoints(cfg: NodeConfig, group: IGroup) {
      const { linkPoints = {} } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;

      const { top, left, right, bottom, size: markSize, r: markR, ...markStyle } = linkPoints;
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = size[0];
      const height = size[1];

      if (left) {
        // left circle
        group['shapeMap']['link-point-left'] = group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: -width / 2,
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
        group['shapeMap']['link-point-right'] = group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: width / 2,
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
        group['shapeMap']['link-point-top'] = group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: 0,
            y: -height / 2,
            r: markSize / 2 || markR || 5,
          },
          className: 'link-point-top',
          name: 'link-point-top',
          isAnchorPoint: true,
        });
      }

      if (bottom) {
        // bottom circle
        group['shapeMap']['link-point-bottom'] = group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: 0,
            y: height / 2,
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
    getShapeStyle(cfg: NodeConfig) {
      const { style: defaultStyle } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };
      // 如果设置了color，则覆盖默认的stroke属性
      const style = mix({}, defaultStyle, strokeStyle);
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = style.width || size[0];
      const height = style.height || size[1];
      const styles = {
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        ...style,
      };
      return styles;
    },
    update(cfg: NodeConfig, item: Item, updateType?: UpdateType) {
      const group = item.getContainer();
      // 这里不传 cfg 参数是因为 cfg.style 需要最后覆盖样式
      const { style: defaultStyle } = this.getOptions({}) as NodeConfig;
      const size = (this as ShapeOptions).getSize!(cfg);
      const keyShape = item.get('keyShape');
      if (!cfg.size) {
        size[0] = keyShape.attr('width') || defaultStyle.width;
        size[1] = keyShape.attr('height') || defaultStyle.height;
      }
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color,
        x: -size[0] / 2,
        y: -size[1] / 2,
        width: size[0],
        height: size[1],
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      let style = mix({}, defaultStyle, keyShape.attr(), strokeStyle);
      style = mix(style, cfg.style);

      (this as any).updateShape(cfg, item, style, false, updateType);
      (this as any).updateLinkPoints(cfg, group);
    },
  },
  'single-node',
);
