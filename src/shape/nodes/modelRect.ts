import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces';
import deepMix from '@antv/util/lib/deep-mix';
import { mix, isString } from '@antv/util';
import { Item, NodeConfig, ModelConfig, ShapeStyle } from '../../types';
import Shape from '../shape';
import Global from '../../global';
import { ShapeOptions } from '../../interface/shape';

Shape.registerNode(
  'modelRect',
  {
    // 自定义节点时的配置
    options: {
      size: [185, 70],
      style: {
        radius: 5,
        stroke: '#69c0ff',
        fill: '#ffffff',
        lineWidth: Global.defaultNode.style.lineWidth,
        fillOpacity: 1,
      },
      // 文本样式配置
      labelCfg: {
        style: {
          fill: '#595959',
          fontSize: 14,
        },
        offset: 30, // 距离左侧的 offset，没有设置 y 轴上移动的配置
      },
      descriptionCfg: {
        style: {
          fontSize: 12,
          fill: '#bfbfbf',
        },
        paddingTop: 0,
      },
      preRect: {
        show: true,
        width: 4,
        fill: '#40a9ff',
        radius: 2,
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
        stroke: '#72CC4A',
      },
      // 节点中icon配置
      logoIcon: {
        // 是否显示icon，值为 false 则不渲染icon
        show: true,
        x: 0,
        y: 0,
        // icon的地址，字符串类型
        img:
          'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
        width: 16,
        height: 16,
        // 用于调整图标的左右位置
        offset: 0,
      },
      // 节点中表示状态的icon配置
      stateIcon: {
        // 是否显示icon，值为 false 则不渲染icon
        show: true,
        x: 0,
        y: 0,
        // icon的地址，字符串类型
        img:
          'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
        width: 16,
        height: 16,
        // 用于调整图标的左右位置
        offset: -5,
      },
      // 连接点，默认为左右
      // anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    shapeType: 'modelRect',
    drawShape(cfg: NodeConfig, group: GGroup): IShape {
      const { preRect: defaultPreRect } = this.options as ModelConfig;
      const style = this.getShapeStyle!(cfg);
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = size[0];
      const height = size[1];

      const keyShape = group.addShape('rect', {
        attrs: style,
        className: 'modelRect-keyShape',
        name: 'modelRect-keyShape',
        draggable: true,
      });

      const preRect = mix({}, defaultPreRect, cfg.preRect);
      const { show: preRectShow, ...preRectStyle } = preRect;
      if (preRectShow) {
        group.addShape('rect', {
          attrs: {
            x: -width / 2,
            y: -height / 2,
            height,
            ...preRectStyle,
          },
          className: 'pre-rect',
          name: 'pre-rect',
          draggable: true
        });
      }

      (this as any).drawLogoIcon(cfg, group);

      (this as any).drawStateIcon(cfg, group);

      (this as any).drawLinkPoints(cfg, group);
      return keyShape;
    },
    /**
     * 绘制模型矩形左边的logo图标
     * @param {Object} cfg 数据配置项
     * @param {Group} group Group实例
     */
    drawLogoIcon(cfg: NodeConfig, group: GGroup) {
      const { logoIcon: defaultLogoIcon } = this.options as ModelConfig;
      const logoIcon = mix({}, defaultLogoIcon, cfg.logoIcon);
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = size[0];

      if (logoIcon.show) {
        const { width: w, height: h, x, y, offset, ...logoIconStyle } = logoIcon;
        group.addShape('image', {
          attrs: {
            ...logoIconStyle,
            x: x || -width / 2 + (w as number) + (offset as number),
            y: y || -(h as number) / 2,
            width: w,
            height: h,
          },
          className: 'rect-logo-icon',
          name: 'rect-logo-icon',
          draggable: true
        });
      }
    },
    /**
     * 绘制模型矩形右边的状态图标
     * @param {Object} cfg 数据配置项
     * @param {Group} group Group实例
     */
    drawStateIcon(cfg: NodeConfig, group: GGroup) {
      const { stateIcon: defaultStateIcon } = this.options as ModelConfig;
      const stateIcon = mix({}, defaultStateIcon, cfg.stateIcon);
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = size[0];

      if (stateIcon.show) {
        const { width: w, height: h, x, y, offset, ...iconStyle } = stateIcon;
        const image = group.addShape('image', {
          attrs: {
            ...iconStyle,
            x: x || width / 2 - (w as number) + (offset as number),
            y: y || -(h as number) / 2,
            width: w,
            height: h,
          },
          className: 'rect-state-icon',
          name: 'rect-state-icon',
          draggable: true
        });
      }
    },
    /**
     * 绘制节点上的LinkPoints
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    drawLinkPoints(cfg: NodeConfig, group: GGroup) {
      const { linkPoints: defaultLinkPoints } = this.options as ModelConfig;
      const linkPoints = mix({}, defaultLinkPoints, cfg.linkPoints);

      const { top, left, right, bottom, size: markSize, ...markStyle } = linkPoints;
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = size[0];
      const height = size[1];

      if (left) {
        // left circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: -width / 2,
            y: 0,
            r: markSize,
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
            x: width / 2,
            y: 0,
            r: markSize,
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
            y: -height / 2,
            r: markSize,
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
            y: height / 2,
            r: markSize,
          },
          className: 'link-point-bottom',
          name: 'link-point-bottom',
          isAnchorPoint: true,
        });
      }
    },
    drawLabel(cfg: NodeConfig, group: GGroup): IShape {
      const {
        labelCfg: defaultLabelCfg,
        logoIcon: defaultLogoIcon,
        descriptionCfg: defaultDescritionCfg,
      } = this.options as ModelConfig;

      const logoIcon = mix({}, defaultLogoIcon, cfg.logoIcon);

      const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);

      const descriptionCfg = deepMix({}, defaultDescritionCfg, cfg.descriptionCfg);

      const size = (this as ShapeOptions).getSize!(cfg);
      const width = size[0];

      let label = null;

      const { show, width: w } = logoIcon;
      let offsetX = -width / 2 + labelCfg.offset;

      if (show) {
        offsetX = -width / 2 + (w as number) + labelCfg.offset;
      }

      const { style: fontStyle } = labelCfg;
      const { style: descriptionStyle, paddingTop: descriptionPaddingTop } = descriptionCfg;
      if (isString(cfg.description)) {
        label = group.addShape('text', {
          attrs: {
            ...fontStyle,
            x: offsetX,
            y: -5,
            text: cfg.label,
          },
          className: 'text-shape',
          name: 'text-shape',
          draggable: true
        });

        group.addShape('text', {
          attrs: {
            ...descriptionStyle,
            x: offsetX,
            y: 17 + descriptionPaddingTop,
            text: cfg.description,
          },
          className: 'rect-description',
          name: 'rect-description',
          draggable: true
        });
      } else {
        label = group.addShape('text', {
          attrs: {
            ...fontStyle,
            x: offsetX,
            y: 7,
            text: cfg.label,
            draggable: true
          },
        });
      }
      return label;
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle(cfg: NodeConfig) {
      const { style: defaultStyle } = this.options as ModelConfig;
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };
      // 如果设置了color，则覆盖默认的stroke属性
      const style: ShapeStyle = mix({}, defaultStyle, strokeStyle, cfg.style);
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = style.width || size[0];
      const height = style.height || size[1];
      const styles = Object.assign(
        {},
        {
          x: -width / 2,
          y: -height / 2,
          width,
          height,
        },
        style,
      );
      return styles;
    },
    update(cfg: NodeConfig, item: Item) {
      const {
        style: defaultStyle,
        labelCfg: defaultLabelCfg,
        descriptionCfg: defaultDescritionCfg,
      } = this.options as ModelConfig;
      const style = mix({}, defaultStyle, cfg.style);
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = size[0];
      const height = size[1];
      const keyShape = item.get('keyShape');
      keyShape.attr({
        ...style,
        x: -width / 2,
        y: -height / 2,
        width,
        height,
      });

      const group = item.getContainer();

      const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);

      const logoIconShape = group.find(element => element.get('className') === 'rect-logo-icon');
      const currentLogoIconAttr = logoIconShape ? logoIconShape.attr() : {};

      const logoIcon = mix({}, currentLogoIconAttr, cfg.logoIcon);

      let { width: w } = logoIcon;
      if (w === undefined) {
        w = (this as any).options.logoIcon.width;
      }
      const show = cfg.logoIcon ? cfg.logoIcon.show : undefined;

      const { offset } = labelCfg;
      let offsetX = -width / 2 + w + offset;

      if (!show && show !== undefined) {
        offsetX = -width / 2 + offset;
      }

      const label = group.find(element => element.get('className') === 'node-label');
      const description = group.find(element => element.get('className') === 'rect-description');
      if (cfg.label) {
        if (!label) {
          group.addShape('text', {
            attrs: {
              ...labelCfg.style,
              x: offsetX,
              y: cfg.description ? -5 : 7,
              text: cfg.label,
            },
            className: 'node-label',
            name: 'node-label',
            draggable: true
          });
        } else {
          const cfgStyle = cfg.labelCfg ? cfg.labelCfg.style : {};
          const labelStyle = mix({}, label.attr(), cfgStyle);
          if (cfg.label) labelStyle.text = cfg.label;
          labelStyle.x = offsetX;
          if (isString(cfg.description)) labelStyle.y = -5;
          if (description) {
            description.resetMatrix();
            description.attr({
              x: offsetX,
            });
          }
          label.resetMatrix();
          label.attr(labelStyle);
        }
      }
      if (isString(cfg.description)) {
        const descriptionCfg = deepMix({}, defaultDescritionCfg, cfg.descriptionCfg);
        const { paddingTop } = descriptionCfg;
        if (!description) {
          group.addShape('text', {
            attrs: {
              ...descriptionCfg.style,
              x: offsetX,
              y: 17 + paddingTop,
              text: cfg.description,
            },
            className: 'rect-description',
            name: 'rect-description',
            draggable: true
          });
        } else {
          const cfgStyle = cfg.descriptionCfg ? cfg.descriptionCfg.style : {};
          const descriptionStyle = mix({}, description.attr(), cfgStyle);
          if (isString(cfg.description)) descriptionStyle.text = cfg.description;
          descriptionStyle.x = offsetX;
          description.resetMatrix();
          description.attr({
            ...descriptionStyle,
            y: 17 + paddingTop,
          });
        }
      }

      const preRectShape = group.find(element => element.get('className') === 'pre-rect');
      if (preRectShape) {
        const preRect = mix({}, preRectShape.attr(), cfg.preRect);
        preRectShape.attr({
          ...preRect,
          x: -width / 2,
          y: -height / 2,
          height,
        });
      }

      if (logoIconShape) {
        if (!show && show !== undefined) {
          logoIconShape.remove();
        } else {
          const { width: logoW, height: h, x, y, offset: logoOffset, ...logoIconStyle } = logoIcon;
          logoIconShape.attr({
            ...logoIconStyle,
            x: x || -width / 2 + logoW + logoOffset,
            y: y || -h / 2,
            width: logoW,
            height: h,
          });
        }
      } else if (show) {
        (this as any).drawLogoIcon(cfg, group);
      }

      const stateIconShape = group.find(element => element.get('className') === 'rect-state-icon');
      const currentStateIconAttr = stateIconShape ? stateIconShape.attr() : {};
      const stateIcon = mix({}, currentStateIconAttr, cfg.stateIcon);
      if (stateIconShape) {
        if (!stateIcon.show && stateIcon.show !== undefined) {
          stateIconShape.remove();
        }
        const {
          width: stateW,
          height: h,
          x,
          y,
          offset: stateOffset,
          ...stateIconStyle
        } = stateIcon;
        stateIconShape.attr({
          ...stateIconStyle,
          x: x || width / 2 - stateW + stateOffset,
          y: y || -h / 2,
          width: stateW,
          height: h,
        });
      } else if (stateIcon.show) {
        (this as any).drawStateIcon(cfg, group);
      }

      (this as any).updateLinkPoints(cfg, group);
    },
  },
  'single-node',
);
