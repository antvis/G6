const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');

// 带有图标的圆，可用于拓扑图中
Shape.registerNode('circle', {
  // 自定义节点时的配置
  options: {
    // 默认配置
    default: {
      r: 20,
      fill: '#40a9ff',
      stroke: '#91d5ff',
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
  drawLabel(cfg, group) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default || {};
    const labelCfg = deepMix({}, this.options.default.labelCfg, defaultConfig.labelCfg, cfg.labelCfg);
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    const label = group.addShape('text', {
      attrs: labelStyle
    });
    return label;
  },
  drawShape(cfg, group) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    // const { icon, ...circleStyle } = defaultConfig;
    const attrs = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const keyShape = group.addShape('circle', {
      attrs
    });

    const { icon, linkPoints, r } = attrs;
    const { width, height, show } = icon;
    if (show) {
      const image = group.addShape('image', {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          ...icon
        }
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
        }
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
        }
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
        }
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
        }
      });
    }

    return keyShape;
  }
}, 'single-shape');
