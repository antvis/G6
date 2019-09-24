const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');
const Util = require('../../util');

Shape.registerNode('modelRect', {
  // labelPosition: 'center',
  // 自定义节点时的配置
  options: {
    // 默认配置
    default: {
      width: 185,
      height: 70,
      radius: 5,
      stroke: '#69c0ff',
      fill: '#ffffff',
      lineWidth: 1,
      fillOpacity: 1,
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
        height: 16
      },
      // 节点中表示状态的icon配置
      stateIcon: {
        // 是否显示icon，值为 false 则不渲染icon
        show: true,
        // icon的地址，字符串类型
        img: 'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
        width: 16,
        height: 16
      },
      // 连接点，默认为左右
      anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
    },
    // hover状态下的配置
    hover: {
      lineWidth: 2,
      stroke: '#1890ff',
      fill: '#e6f7ff'
    },
    // 节点选中状态下的配置
    select: {
      lineWidth: 3,
      stroke: '#1890ff',
      fill: '#e6f7ff'
    }
  },
  drawShape(cfg, group) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { width, height, linkPoints, preRect,
      logoIcon, stateIcon, ...rectStyle } = style;

    const keyShape = group.addShape('rect', {
      attrs: {
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        ...rectStyle
      }
    });

    const { show: preRectShow, ...preRectStyle } = preRect;
    if (preRectShow) {
      group.addShape('rect', {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          height,
          ...preRectStyle
        },
        className: 'pre-rect'
      });
    }

    if (logoIcon.show) {
      const { width: w, height: h, x, y, ...logoIconStyle } = logoIcon;
      const image = group.addShape('image', {
        attrs: {
          ...logoIconStyle,
          x: x || -width / 2 + w,
          y: y || -h / 2
          // width: w,
          // height: h
        },
        className: 'rect-logo-icon'
      });

      image.set('capture', false);
    }

    if (stateIcon.show) {
      const { width: w, height: h, x, y } = stateIcon;
      const image = group.addShape('image', {
        attrs: {
          ...stateIcon,
          x: x || width / 2 - w * 2 + 8,
          y: y || -h / 2
        },
        className: 'rect-state-icon'
      });

      image.set('capture', false);
    }

    const { top, left, right, bottom, size,
      fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;
    if (left) {
      // left circle
      group.addShape('circle', {
        attrs: {
          x: -width / 2,
          y: 0,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'rect-anchor-left'
      });
    }

    if (right) {
      // right circle
      group.addShape('circle', {
        attrs: {
          x: width / 2,
          y: 0,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'rect-anchor-right'
      });
    }

    if (top) {
      // top circle
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: -height / 2,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'rect-anchor-top'
      });
    }

    if (bottom) {
      // bottom circle
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: height / 2,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'rect-anchor-bottom'
      });
    }
    return keyShape;
  },
  drawLabel(cfg, group) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default || {};
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const labelCfg = deepMix({}, style.labelCfg, cfg.labelCfg);
    let label = null;

    const { logoIcon, width } = style;
    const { show, width: w } = logoIcon;
    let offsetX = -width / 2 + labelCfg.offset;

    if (show) {
      offsetX = -width / 2 + w + labelCfg.offset;
    }

    const { style: fontStyle } = labelCfg;
    if (cfg.description) {
      label = group.addShape('text', {
        attrs: {
          ...fontStyle,
          y: -5,
          x: offsetX,
          text: Util.fittingString(cfg.label, 70, 14)
        }
      });

      group.addShape('text', {
        attrs: {
          text: Util.fittingString(cfg.description, 80, 12),
          fontSize: 12,
          x: offsetX,
          y: 17,
          fill: '#bfbfbf'
        },
        className: 'rect-description'
      });
    } else {
      label = group.addShape('text', {
        attrs: {
          ...fontStyle,
          x: offsetX,
          y: 7,
          text: Util.fittingString(cfg.label, 70, 14)
        }
      });
    }
    return label;
  },
  getAnchorPoints() {
    const defaultOptions = this.options;
    return defaultOptions.anchorPoints;
  },
  getSize(cfg) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { width, height } = style;

    return [ width, height ];
  },
  update(cfg, item) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { width, height, linkPoints, logoIcon, stateIcon,
      labelCfg: defaultLabelCfg, ...rectStyle } = style;

    const keyShape = item.get('keyShape');
    keyShape.attr({
      x: -width / 2,
      y: -height / 2,
      width,
      height,
      ...rectStyle
    });

    const group = item.getContainer();

    const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    // const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    const text = group.findByClassName('node-label');

    const { show, width: w } = logoIcon;

    const { offset, style: fontStyle } = labelCfg;
    let offsetX = -width / 2 + offset;

    if (show) {
      offsetX = -width / 2 + w + offset;
    }

    const descriptionText = group.findByClassName('rect-description');
    if (descriptionText) {
      // 正常情况下，如果descriptionText存在，text一定会存在，为了保证起见，多加一层判断
      if (text) {
        text.attr({
          ...fontStyle,
          y: -5,
          x: offsetX
        });
      }
      descriptionText.attr({
        x: offsetX,
        y: 17
      });
    } else {
      if (text) {
        text.attr({
          ...fontStyle,
          x: offsetX,
          y: -5
        });
      }
    }

    const preRectShape = group.findByClassName('pre-rect');
    if (preRectShape) {
      preRectShape.attr({
        x: -width / 2,
        y: -height / 2,
        height
      });
    }

    const logoIconShape = group.findByClassName('rect-logo-icon');
    if (logoIconShape) {
      const { width: w, height: h, x, y } = logoIcon;
      logoIconShape.attr({
        x: x || -width / 2 + w,
        y: y || -h / 2,
        width: w,
        height: h
      });
    }

    const stateIconShape = group.findByClassName('rect-state-icon');
    if (stateIconShape) {
      const { width: w, height: h, x, y } = stateIcon;
      stateIconShape.attr({
        x: x || width / 2 - w * 2 + 8,
        y: y || -h / 2,
        width: w,
        height: h
      });
    }

    const { size, fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;

    const anchorLeft = group.findByClassName('rect-anchor-left');
    if (anchorLeft) {
      anchorLeft.attr({
        x: -width / 2,
        y: 0,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorRight = group.findByClassName('rect-anchor-right');
    if (anchorRight) {
      anchorRight.attr({
        x: width / 2,
        y: 0,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorTop = group.findByClassName('rect-anchor-top');
    if (anchorTop) {
      anchorTop.attr({
        x: 0,
        y: -height / 2,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorBottom = group.findByClassName('rect-anchor-bottom');
    if (anchorBottom) {
      anchorBottom.attr({
        x: 0,
        y: height / 2,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }
  }
}, 'single-shape');
