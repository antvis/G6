const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');

// 菱形shape
Shape.registerNode('diamond', {
  // 自定义节点时的配置
  options: {
    // 默认配置
    default: {
      width: 100,
      height: 100,
      stroke: '#69c0ff',
      fill: '#e6f7ff',
      lineWidth: 1,
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
  labelPosition: 'center',
  drawShape(cfg, group) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { icon, linkPoints, width, height, ...diamondStyle } = style;
    const path = this.getPath(cfg);
    const keyShape = group.addShape('path', {
      attrs: {
        path,
        ...diamondStyle
      }
    });

    const { width: w, height: h, show } = icon;
    if (show) {
      const image = group.addShape('image', {
        attrs: {
          x: -w / 2,
          y: -h / 2,
          ...icon
        },
        className: 'diamond-icon'
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
        className: 'diamond-anchor-left'
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
        className: 'diamond-anchor-right'
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
        className: 'diamond-anchor-top'
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
        className: 'diamond-anchor-bottom'
      });
    }

    return keyShape;
  },
  shouldUpdate() {
    return false;
  },
  getPath(cfg) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { width, height } = style;
    const path = [
      [ 'M', 0, -height / 2 ], // 上部顶点
      [ 'L', width / 2, 0 ], // 右侧点
      [ 'L', 0, height / 2 ], // 下部
      [ 'L', -width / 2, 0 ], // 左侧
      [ 'Z' ] // 封闭
    ];
    return path;
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
    const { width, height } = style;

    return [ width, height ];
  },
  update(cfg, item) {
    const group = item.getContainer();
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default || {};
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);

    const { width, height, icon, linkPoints, labelCfg: defaultLabelCfg, ...diamondStyle } = style;
    const keyShape = item.get('keyShape');
    const path = this.getPath(cfg);
    keyShape.attr({
      path,
      ...diamondStyle
    });

    const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group);

    const text = group.findByClassName('node-label');
    if (text) {
      text.attr({
        ...labelStyle
      });
    }

    const diamondIcon = group.findByClassName('diamond-icon');
    if (diamondIcon) {
      const { width: w, height: h } = icon;
      diamondIcon.attr({
        x: -w / 2,
        y: -h / 2,
        ...icon
      });
    }

    const { size, fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;

    const anchorLeft = group.findByClassName('diamond-anchor-left');
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

    const anchorRight = group.findByClassName('diamond-anchor-right');
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

    const anchorTop = group.findByClassName('diamond-anchor-top');
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

    const anchorBottom = group.findByClassName('diamond-anchor-bottom');
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
