const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');

// 带有图标的圆，可用于拓扑图中
Shape.registerNode('circle', {
  // 自定义节点时的配置
  options: {
    // 默认配置
    default: {
      r: 20,
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
      icon: {
        // 是否显示icon，值为 false 则不渲染icon
        show: false,
        // icon的地址，可以是字符串或Image
        img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        width: 16,
        height: 16
      }
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
  shapeType: 'circle',
  // 文本位置
  labelPosition: 'bottom',
  drawShape(cfg, group) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { icon, linkPoints, ...circleStyle } = style;
    const keyShape = group.addShape('circle', {
      attrs: circleStyle
    });

    const { r } = circleStyle;
    const { width, height, show } = icon;
    if (show) {
      const image = group.addShape('image', {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          ...icon
        },
        className: 'circle-icon'
      });

      image.set('capture', false);
    }

    const { top, left, right, bottom, size,
      fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;
    if (left) {
      // left circle
      group.addShape('circle', {
        attrs: {
          x: -r,
          y: 0,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'circle-anchor-left'
      });
    }

    if (right) {
      // right circle
      group.addShape('circle', {
        attrs: {
          x: r,
          y: 0,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'circle-anchor-right'
      });
    }

    if (top) {
      // top circle
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: -r,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'circle-anchor-top'
      });
    }

    if (bottom) {
      // bottom circle
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: r,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'circle-anchor-bottom'
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
    const { r } = style;

    return [ 2 * r, 2 * r ];
  },
  update(cfg, item) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default || {};
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { icon, linkPoints, labelCfg: defaultLabelCfg, ...circleStyle } = style;
    const { r } = circleStyle;

    const group = item.getContainer();

    const keyShape = item.get('keyShape');
    keyShape.attr(circleStyle);

    const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group);

    const text = group.findByClassName('node-label');
    if (text) {
      text.attr({
        ...labelStyle
      });
    }

    const circleIcon = group.findByClassName('circle-icon');
    const { width: w, height: h } = icon;
    if (circleIcon) {
      circleIcon.attr({
        x: -w / 2,
        y: -h / 2,
        ...icon
      });
    }

    const { size, fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;

    const anchorLeft = group.findByClassName('circle-anchor-left');
    if (anchorLeft) {
      anchorLeft.attr({
        x: -r,
        y: 0,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorRight = group.findByClassName('circle-anchor-right');
    if (anchorRight) {
      anchorRight.attr({
        x: r,
        y: 0,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorTop = group.findByClassName('circle-anchor-top');
    if (anchorTop) {
      anchorTop.attr({
        x: 0,
        y: -r,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorBottom = group.findByClassName('circle-anchor-bottom');
    if (anchorBottom) {
      anchorBottom.attr({
        x: 0,
        y: r,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }
  }
}, 'single-shape');
