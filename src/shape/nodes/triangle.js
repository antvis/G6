const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');

// 菱形shape
Shape.registerNode('triangle', {
  // 自定义节点时的配置
  options: {
    // 默认配置
    default: {
      len: 40,
      direction: 'up',
      stroke: '#69c0ff',
      fill: '#e6f7ff',
      lineWidth: 1,
      // 文本样式配置
      labelCfg: {
        style: {
          fill: '#595959'
        },
        offset: 15
      },
      // 节点上左右上下四个方向上的链接circle配置
      linkPoints: {
        top: false,
        right: false,
        bottom: false,
        left: false,
        // circle的大小
        size: 5,
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
        height: 16,
        offset: 0
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
    const { icon, linkPoints,
      direction, len, ...triangleStyle } = style;
    const path = this.getPath(cfg);
    const keyShape = group.addShape('path', {
      attrs: {
        path,
        ...triangleStyle
      }
    });

    const { width: w, height: h, show, offset } = icon;
    if (show) {
      let iconW = -w / 2;
      let iconH = -h / 2;
      if (direction === 'up' || direction === 'down') {
        iconH += offset;
      }
      if (direction === 'left' || direction === 'right') {
        iconW += offset;
      }
      const image = group.addShape('image', {
        attrs: {
          x: iconW,
          y: iconH,
          ...icon
        },
        className: 'triangle-icon'
      });

      image.set('capture', false);
    }

    const { top, left, right, bottom, size,
      fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;
    if (left) {
      // up down left right 四个方向的坐标均不相同
      let leftPos = null;
      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);
      if (direction === 'up') {
        leftPos = [ -r, diffY ];
      } else if (direction === 'down') {
        leftPos = [ -r, -diffY ];
      } else if (direction === 'left') {
        leftPos = [ -r, r - diffY ];
      }

      if (leftPos) {
        // left circle
        group.addShape('circle', {
          attrs: {
            x: leftPos[0],
            y: leftPos[1],
            r: size,
            fill: anchorFill,
            stroke: anchorStroke,
            lineWidth: borderWidth
          },
          className: 'triangle-anchor-left'
        });
      }
    }

    if (right) {
      // right circle
      // up down left right 四个方向的坐标均不相同
      let rightPos = null;
      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);
      if (direction === 'up') {
        rightPos = [ r, diffY ];
      } else if (direction === 'down') {
        rightPos = [ r, -diffY ];
      } else if (direction === 'right') {
        rightPos = [ r, r - diffY ];
      }

      if (rightPos) {
        group.addShape('circle', {
          attrs: {
            x: rightPos[0],
            y: rightPos[1],
            r: size,
            fill: anchorFill,
            stroke: anchorStroke,
            lineWidth: borderWidth
          },
          className: 'triangle-anchor-right'
        });
      }
    }

    if (top) {
      // up down left right 四个方向的坐标均不相同
      let topPos = null;
      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);
      if (direction === 'up') {
        topPos = [ r - diffY, -diffY ];
      } else if (direction === 'left') {
        topPos = [ r, -diffY ];
      } else if (direction === 'right') {
        topPos = [ -r, -diffY ];
      }

      if (topPos) {
        // top circle
        group.addShape('circle', {
          attrs: {
            x: topPos[0],
            y: topPos[1],
            r: size,
            fill: anchorFill,
            stroke: anchorStroke,
            lineWidth: borderWidth
          },
          className: 'triangle-anchor-top'
        });
      }
    }

    if (bottom) {
      // up down left right 四个方向的坐标均不相同
      let bottomPos = null;
      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);
      if (direction === 'down') {
        bottomPos = [ -r + diffY, diffY ];
      } else if (direction === 'left') {
        bottomPos = [ r, diffY ];
      } else if (direction === 'right') {
        bottomPos = [ -r, diffY ];
      }

      if (bottomPos) {
        // bottom circle
        group.addShape('circle', {
          attrs: {
            x: bottomPos[0],
            y: bottomPos[1],
            r: size,
            fill: anchorFill,
            stroke: anchorStroke,
            lineWidth: borderWidth
          },
          className: 'triangle-anchor-bottom'
        });
      }
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
    const { len, direction } = style;
    const diffY = len * Math.sin((1 / 3) * Math.PI);
    const r = len * Math.sin((1 / 3) * Math.PI);
    let path = [
      [ 'M', -r, diffY ],
      [ 'L', 0, -diffY ],
      [ 'L', r, diffY ],
      [ 'Z' ] // 封闭
    ];

    if (direction === 'down') {
      path = [
        [ 'M', -r, -diffY ],
        [ 'L', r, -diffY ],
        [ 'L', 0, diffY ],
        [ 'Z' ] // 封闭
      ];
    } else if (direction === 'left') {
      path = [
        [ 'M', -r, r - diffY ],
        [ 'L', r, -r ],
        [ 'L', r, r ],
        [ 'Z' ] // 封闭
      ];
    } else if (direction === 'right') {
      path = [
        [ 'M', r, r - diffY ],
        [ 'L', -r, r ],
        [ 'L', -r, -r ],
        [ 'Z' ] // 封闭
      ];
    }
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
    const { len } = style;

    return [ len, len ];
  },
  update(cfg, item) {
    const group = item.getContainer();
    const customStyle = this.getCustomConfig(cfg) || {};
    const defaultConfig = customStyle.default || {};
    const style = deepMix({}, this.options.default, defaultConfig, cfg.style);

    const { icon, linkPoints, direction, len,
      labelCfg: defaultLabelCfg, ...triangleStyle } = style;
    const keyShape = item.get('keyShape');
    const path = this.getPath(cfg);
    keyShape.attr({
      path,
      ...triangleStyle
    });

    const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group);

    const text = group.findByClassName('node-label');
    if (text) {
      text.attr({
        ...labelStyle
      });
    }

    const triangleIcon = group.findByClassName('triangle-icon');
    if (triangleIcon) {
      const { width: w, height: h } = icon;
      triangleIcon.attr({
        x: -w / 2,
        y: -h / 2,
        ...icon
      });
    }

    const { size, fill: anchorFill, stroke: anchorStroke, lineWidth: borderWidth } = linkPoints;

    const anchorLeft = group.findByClassName('triangle-anchor-left');
    if (anchorLeft) {
      let leftPos = null;
      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);
      if (direction === 'up') {
        leftPos = [ -r, diffY ];
      } else if (direction === 'down') {
        leftPos = [ -r, -diffY ];
      } else if (direction === 'left') {
        leftPos = [ -r, r - diffY ];
      }

      if (leftPos) {
        // left circle
        anchorLeft.attr({
          x: leftPos[0],
          y: leftPos[1],
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        });
      }
    }

    const anchorRight = group.findByClassName('triangle-anchor-right');
    if (anchorRight) {
      let rightPos = null;
      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);
      if (direction === 'up') {
        rightPos = [ r, diffY ];
      } else if (direction === 'down') {
        rightPos = [ r, -diffY ];
      } else if (direction === 'right') {
        rightPos = [ r, r - diffY ];
      }

      if (rightPos) {
        anchorRight.attr({
          x: rightPos[0],
          y: rightPos[1],
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        });
      }
    }

    const anchorTop = group.findByClassName('triangle-anchor-top');
    if (anchorTop) {
      let topPos = null;
      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);
      if (direction === 'up') {
        topPos = [ r - diffY, -diffY ];
      } else if (direction === 'left') {
        topPos = [ r, -diffY ];
      } else if (direction === 'right') {
        topPos = [ -r, -diffY ];
      }

      if (topPos) {
        // top circle
        anchorTop.attr({
          x: topPos[0],
          y: topPos[1],
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        });
      }
    }

    const anchorBottom = group.findByClassName('triangle-anchor-bottom');
    if (anchorBottom) {
      let bottomPos = null;
      const diffY = len * Math.sin((1 / 3) * Math.PI);
      const r = len * Math.sin((1 / 3) * Math.PI);

      if (direction === 'down') {
        bottomPos = [ -r + diffY, diffY ];
      } else if (direction === 'left') {
        bottomPos = [ r, diffY ];
      } else if (direction === 'right') {
        bottomPos = [ -r, diffY ];
      }

      if (bottomPos) {
        // bottom circle
        anchorBottom.attr({
          x: bottomPos[0],
          y: bottomPos[1],
          r: size,
          fill: anchorFill,
          stroke: anchorStroke,
          lineWidth: borderWidth
        });
      }
    }
  }
}, 'single-shape');
