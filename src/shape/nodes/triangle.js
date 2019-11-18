const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');
const Global = require('../../global');

// 菱形shape
Shape.registerNode('triangle', {
  // 自定义节点时的配置
  options: {
    size: 40,
    direction: 'up',
    style: {
      stroke: Global.defaultShapeStrokeColor,
      fill: Global.defaultShapeFillColor,
      lineWidth: 1
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: '#595959'
      },
      offset: 15
    },
    stateStyles: {
      // 鼠标hover状态下的配置
      hover: {
        fillOpacity: 0.8
      },
      // 选中节点状态下的配置
      selected: {
        lineWidth: 3
      }
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
      offset: 6
    }
  },
  shapeType: 'triangle',
  // 文本位置
  labelPosition: 'bottom',
  drawShape(cfg, group) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { icon: defaultIcon, direction: defaultDirection } = this.options;
    const { icon: customIcon, direction: customDirection } = customOptions;
    const style = this.getShapeStyle(cfg);
    const icon = deepMix({}, defaultIcon, customIcon, cfg.icon);

    const direction = cfg.direction || customDirection || defaultDirection;

    const keyShape = group.addShape('path', {
      attrs: style
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

    this.drawLinkPoints(cfg, group);

    return keyShape;
  },
  /**
   * 绘制节点上的LinkPoints
   * @param {Object} cfg data数据配置项
   * @param {Group} group Group实例
   */
  drawLinkPoints(cfg, group) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { linkPoints: defaultLinkPoints, direction: defaultDirection } = this.options;
    const { linkPoints: customLinkPoints, direction: customDirection } = customOptions;
    const linkPoints = deepMix({}, defaultLinkPoints, customLinkPoints, cfg.linkPoints);

    const direction = cfg.direction || customDirection || defaultDirection;

    const { top, left, right, bottom, size: markSize,
      ...markStyle } = linkPoints;
    const size = this.getSize(cfg);
    const len = size[0];

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
            ...markStyle,
            x: leftPos[0],
            y: leftPos[1],
            r: markSize
          },
          className: 'triangle-mark-left'
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
            ...markStyle,
            x: rightPos[0],
            y: rightPos[1],
            r: markSize
          },
          className: 'triangle-mark-right'
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
            ...markStyle,
            x: topPos[0],
            y: topPos[1],
            r: markSize
          },
          className: 'triangle-mark-top'
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
            ...markStyle,
            x: bottomPos[0],
            y: bottomPos[1],
            r: markSize
          },
          className: 'triangle-mark-bottom'
        });
      }
    }
  },
  getPath(cfg) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { direction: defaultDirection } = this.options;
    const { direction: customDirection } = customOptions;

    const direction = cfg.direction || customDirection || defaultDirection;
    const size = this.getSize(cfg);
    const len = size[0];

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
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getShapeStyle(cfg) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { style: defaultStyle } = this.options;
    const { style: customStyle } = customOptions;
    const strokeStyle = {
      stroke: cfg.color
    };
    // 如果设置了color，则覆盖默认的stroke属性
    const style = deepMix({}, defaultStyle, customStyle, strokeStyle, cfg.style);
    const path = this.getPath(cfg);
    const styles = { path, ...style };
    return styles;
  },
  update(cfg, item) {
    const group = item.getContainer();
    const customOptions = this.getCustomConfig(cfg) || {};
    const { style: defaultStyle, icon: defaultIcon, labelCfg: defaultLabelCfg } = this.options;
    const { style: customStyle, icon: customIcon, labelCfg: customLabelCfg } = customOptions;
    const style = deepMix({}, defaultStyle, customStyle, cfg.style);
    const icon = deepMix({}, defaultIcon, customIcon, cfg.icon);
    const keyShape = item.get('keyShape');
    const path = this.getPath(cfg);
    keyShape.attr({
      path,
      ...style
    });

    const labelCfg = deepMix({}, defaultLabelCfg, customLabelCfg, cfg.labelCfg);
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

    this.updateLinkPoints(cfg, group);
  },
  /**
   * 更新linkPoints
   * @param {Object} cfg 节点数据配置项
   * @param {Group} group Item所在的group
   */
  updateLinkPoints(cfg, group) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { linkPoints: defaultLinkPoints, direction: defaultDirection } = this.options;
    const { linkPoints: customLinkPoints, direction: customDirection } = customOptions;
    const linkPoints = deepMix({}, defaultLinkPoints, customLinkPoints, cfg.linkPoints);

    const direction = cfg.direction || customDirection || defaultDirection;


    const { size: markSize, ...markStyle } = linkPoints;

    const size = this.getSize(cfg);
    const len = size[0];

    const markLeft = group.findByClassName('triangle-mark-left');
    if (markLeft) {
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
        markLeft.attr({
          ...markStyle,
          x: leftPos[0],
          y: leftPos[1],
          r: markSize
        });
      }
    }

    const markRight = group.findByClassName('triangle-mark-right');
    if (markRight) {
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
        markRight.attr({
          ...markStyle,
          x: rightPos[0],
          y: rightPos[1],
          r: markSize
        });
      }
    }

    const markTop = group.findByClassName('triangle-mark-top');
    if (markTop) {
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
        markTop.attr({
          ...markStyle,
          x: topPos[0],
          y: topPos[1],
          r: markSize
        });
      }
    }

    const markBottom = group.findByClassName('triangle-mark-bottom');
    if (markBottom) {
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
        markBottom.attr({
          ...markStyle,
          x: bottomPos[0],
          y: bottomPos[1],
          r: markSize
        });
      }
    }
  }
}, 'single-shape');
