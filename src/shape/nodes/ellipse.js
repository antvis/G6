const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');

/**
 * 基本的椭圆，可以添加文本，默认文本居中
 */
Shape.registerNode('ellipse', {
  // 自定义节点时的配置
  options: {
    // 默认配置
    default: {
      rx: 60,
      ry: 30,
      stroke: '#69c0ff',
      fill: '#e6f7ff',
      lineWidth: 1,
      x: 0,
      y: 0,
      // 文本样式配置
      labelCfg: {
        style: {
          fill: '#595959'
        }
      },
      // 节点中icon配置
      icon: {
        // 是否显示icon，值为 false 则不渲染icon
        show: false,
        // icon的地址，字符串类型
        img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        width: 36,
        height: 36
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
    // 鼠标hover状态下的配置
    hover: {
      lineWidth: 3
    },
    // 选中节点状态下的配置
    select: {
      lineWidth: 5
    }
  },
  shapeType: 'ellipse',
  // 文本位置
  labelPosition: 'center',
  drawShape(cfg, group) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);

    // 使用用户配置的size大小
    const { linkPoints, icon, ...ellipseStyle } = style;

    const { rx, ry } = ellipseStyle;
    const keyShape = group.addShape('ellipse', {
      attrs: ellipseStyle
    });

    const { width, height, show } = icon;
    if (show) {
      const image = group.addShape('image', {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          ...icon
        },
        className: 'ellipse-icon'
      });

      image.set('capture', false);
    }

    const { top, left, right, bottom, size,
      fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;
    if (left) {
      // left circle
      group.addShape('circle', {
        attrs: {
          x: -rx,
          y: 0,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'ellipse-anchor-left'
      });
    }

    if (right) {
      // right circle
      group.addShape('circle', {
        attrs: {
          x: rx,
          y: 0,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'ellipse-anchor-right'
      });
    }

    if (top) {
      // top circle
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: -ry,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'ellipse-anchor-top'
      });
    }

    if (bottom) {
      // bottom circle
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: ry,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'ellipse-anchor-bottom'
      });
    }

    return keyShape;
  },
  /**
   * 获取节点宽高
   * @internal 返回节点的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg 节点的配置项
   * @return {Array} 宽高
   */
  getSize(cfg) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { rx, ry } = style;

    return [ 2 * rx, 2 * ry ];
  },
  update(cfg, item) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default || {};
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { icon, linkPoints, labelCfg: defaultLabelCfg, ...ellipseStyle } = style;

    const { rx, ry } = ellipseStyle;
    const keyShape = item.get('keyShape');

    keyShape.attr(ellipseStyle);

    const group = item.getContainer();

    const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    const text = group.findByClassName('node-label');
    if (text) {
      text.attr({
        ...labelStyle
      });
    }

    const ellipseIcon = group.findByClassName('ellipse-icon');
    const { width: w, height: h } = icon;
    if (ellipseIcon) {
      ellipseIcon.attr({
        x: -w / 2,
        y: -h / 2,
        ...icon
      });
    }

    const { size, fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;

    const anchorLeft = group.findByClassName('ellipse-anchor-left');
    if (anchorLeft) {
      anchorLeft.attr({
        x: -rx,
        y: 0,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorRight = group.findByClassName('ellipse-anchor-right');
    if (anchorRight) {
      anchorRight.attr({
        x: rx,
        y: 0,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorTop = group.findByClassName('ellipse-anchor-top');
    if (anchorTop) {
      anchorTop.attr({
        x: 0,
        y: -ry,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorBottom = group.findByClassName('ellipse-anchor-bottom');
    if (anchorBottom) {
      anchorBottom.attr({
        x: 0,
        y: ry,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }
  }
}, 'single-shape');
