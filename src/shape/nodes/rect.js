const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');

Shape.registerNode('rect', {
  // 自定义节点时的配置
  options: {
    // 默认配置
    default: {
      width: 100,
      height: 30,
      radius: 0,
      stroke: '#69c0ff',
      fill: '#e6f7ff',
      lineWidth: 1,
      fillOpacity: 1,
      // 文本样式配置
      labelCfg: {
        style: {
          fill: '#595959',
          fontSize: 12
        }
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
      // 连接点，默认为左右
      anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
    },
    // hover状态下的配置
    hover: {
      lineWidth: 2,
      stroke: '#1890ff'
    },
    // 节点选中状态下的配置
    select: {
      lineWidth: 3,
      stroke: '#1890ff',
      fill: '#91d5ff'
    }
  },
  shapeType: 'rect',
  drawShape(cfg, group) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { width, height, linkPoints, ...rectStyle } = style;

    const keyShape = group.addShape('rect', {
      attrs: {
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        ...rectStyle
      },
      className: 'rect-keyShape'
    });

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
    const { width, height, linkPoints, labelCfg: defaultLabelCfg, ...rectStyle } = style;

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
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    const text = group.findByClassName('node-label');
    if (text) {
      text.attr({
        ...labelStyle
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
