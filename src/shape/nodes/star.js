const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');

// 菱形shape
Shape.registerNode('star', {
  // 自定义节点时的配置
  options: {
    // 默认配置
    default: {
      outerR: 60,
      innerR: 20,
      stroke: '#69c0ff',
      fill: '#e6f7ff',
      lineWidth: 1,
      // 文本样式配置
      labelCfg: {
        style: {
          fill: '#595959'
        },
        offset: 0
      },
      // 节点上左右上下四个方向上的链接circle配置
      linkPoints: {
        top: false,
        right: false,
        left: false,
        leftBottom: false,
        rightBottom: false,
        // circle的大小
        size: 3,
        lineWidth: 1,
        fill: '#fff',
        stroke: '#72CC4A'
      },
      // 节点中icon配置
      icon: {
        // 是否显示icon，值为 false 则不渲染icon
        show: false,
        // icon的地址，字符串类型
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
  shapeType: 'star',
  // 文本位置
  labelPosition: 'center',
  drawShape(cfg, group) {
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default;
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    const { icon, linkPoints, outerR, ...starStyle } = style;
    const path = this.getPath(cfg);
    const keyShape = group.addShape('path', {
      attrs: {
        path,
        ...starStyle
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
        className: 'star-icon'
      });

      image.set('capture', false);
    }

    const { top, left, right, leftBottom, rightBottom, size,
      fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;

    if (right) {
      // right circle
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 0) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 0) / 180 * Math.PI) * outerR;

      group.addShape('circle', {
        attrs: {
          x: x1,
          y: -y1,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'star-anchor-right'
      });
    }

    if (top) {
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 1) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 1) / 180 * Math.PI) * outerR;

      // top circle
      group.addShape('circle', {
        attrs: {
          x: x1,
          y: -y1,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'star-anchor-top'
      });
    }

    if (left) {
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 2) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 2) / 180 * Math.PI) * outerR;

      // left circle
      group.addShape('circle', {
        attrs: {
          x: x1,
          y: -y1,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'star-anchor-left'
      });
    }

    if (leftBottom) {
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 3) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 3) / 180 * Math.PI) * outerR;

      // left bottom circle
      group.addShape('circle', {
        attrs: {
          x: x1,
          y: -y1,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'star-anchor-left-bottom'
      });
    }

    if (rightBottom) {
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 4) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 4) / 180 * Math.PI) * outerR;

      // left bottom circle
      group.addShape('circle', {
        attrs: {
          x: x1,
          y: -y1,
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        },
        className: 'star-anchor-right-bottom'
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
    const { outerR, innerR } = style;
    const path = [];
    for (let i = 0; i < 5; i++) {
      const x1 = Math.cos((18 + 72 * i) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * i) / 180 * Math.PI) * outerR;
      const x2 = Math.cos((54 + 72 * i) / 180 * Math.PI) * innerR;
      const y2 = Math.sin((54 + 72 * i) / 180 * Math.PI) * innerR;

      if (i === 0) {
        path.push([
          'M', x1, -y1
        ]);
      } else {
        path.push([
          'L', x1, -y1
        ]);
      }
      path.push([
        'L', x2, -y2
      ]);
    }

    path.push([
      'Z'
    ]);

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
    const { outerR } = style;

    return [ outerR, outerR ];
  },
  update(cfg, item) {
    const group = item.getContainer();
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default || {};
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);

    const { icon, linkPoints, outerR,
      labelCfg: defaultLabelCfg, ...starStyle } = style;
    const keyShape = item.get('keyShape');
    const path = this.getPath(cfg);
    keyShape.attr({
      path,
      ...starStyle
    });

    const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group);

    const text = group.findByClassName('node-label');
    if (text) {
      text.attr({
        ...labelStyle
      });
    }

    const starIcon = group.findByClassName('star-icon');
    if (starIcon) {
      const { width: w, height: h } = icon;
      starIcon.attr({
        x: -w / 2,
        y: -h / 2,
        ...icon
      });
    }

    const { size, fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;

    const anchorRight = group.findByClassName('star-anchor-right');
    if (anchorRight) {
      const x = Math.cos((18 + 72 * 0) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 0) / 180 * Math.PI) * outerR;

      anchorRight.attr({
        x,
        y: -y,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorTop = group.findByClassName('star-anchor-top');
    if (anchorTop) {
      const x = Math.cos((18 + 72 * 1) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 1) / 180 * Math.PI) * outerR;

      // top circle
      anchorTop.attr({
        x,
        y: -y,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorLeft = group.findByClassName('star-anchor-left');
    if (anchorLeft) {
      const x = Math.cos((18 + 72 * 2) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 2) / 180 * Math.PI) * outerR;

      // left circle
      anchorLeft.attr({
        x,
        y: -y,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorLeftBottom = group.findByClassName('star-anchor-left-bottom');
    if (anchorLeftBottom) {
      const x = Math.cos((18 + 72 * 3) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 3) / 180 * Math.PI) * outerR;

      // bottom circle
      anchorLeftBottom.attr({
        x,
        y: -y,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }

    const anchorRightBottom = group.findByClassName('star-anchor-right-bottom');
    if (anchorRightBottom) {
      const x = Math.cos((18 + 72 * 4) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 4) / 180 * Math.PI) * outerR;

      // bottom circle
      anchorRightBottom.attr({
        x,
        y: -y,
        r: size,
        fill: anchorFill,
        stroke: anchorStroke,
        lineWidth: borderWidth
      });
    }
  }
}, 'single-shape');
