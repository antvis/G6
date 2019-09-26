const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');

/**
 * 基本的椭圆，可以添加文本，默认文本居中
 */
Shape.registerNode('ellipse', {
  // 自定义节点时的配置
  options: {
    size: [ 60, 30 ],
    style: {
      x: 0,
      y: 0,
      stroke: '#87e8de',
      fill: '#36cfc9',
      lineWidth: 1
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: '#595959'
      }
    },
    stateStyles: {
      // 鼠标hover状态下的配置
      hover: {
        lineWidth: 3
      },
      // 选中节点状态下的配置
      select: {
        lineWidth: 5
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
      // icon的地址，字符串类型
      img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      width: 36,
      height: 36
    },
    // 连接点，默认为左右
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  },
  shapeType: 'ellipse',
  // 文本位置
  labelPosition: 'center',
  drawShape(cfg, group) {
    // const customStyle = this.getCustomConfig(cfg) || {};
    // const defaultConfig = customStyle.default;
    // const style = deepMix({}, this.options.default, defaultConfig, cfg.style);

    const customOptions = this.getCustomConfig(cfg) || {};
    const { style: defaultStyle, icon: defaultIcon } = this.options;
    const { style: customStyle, icon: customIcon } = customOptions;
    const style = deepMix({}, defaultStyle, customStyle, cfg.style);
    const icon = deepMix({}, defaultIcon, customIcon, cfg.icon);
    const size = this.getSize(cfg);

    const rx = size[0];
    const ry = size[1];

    const keyShape = group.addShape('ellipse', {
      attrs: {
        ...style,
        rx,
        ry
      }
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
    const { linkPoints: defaultLinkPoints } = this.options;
    const { linkPoints: customLinkPoints } = customOptions;
    const linkPoints = deepMix({}, defaultLinkPoints, customLinkPoints, cfg.linkPoints);

    const { top, left, right, bottom, size: markSize,
      ...markStyle } = linkPoints;
    const size = this.getSize(cfg);
    const rx = size[0];
    const ry = size[1];

    if (left) {
      // left circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: -rx,
          y: 0,
          r: markSize
        },
        className: 'ellipse-mark-left'
      });
    }

    if (right) {
      // right circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: rx,
          y: 0,
          r: markSize
        },
        className: 'ellipse-mark-right'
      });
    }

    if (top) {
      // top circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: 0,
          y: -ry,
          r: markSize
        },
        className: 'ellipse-mark-top'
      });
    }

    if (bottom) {
      // bottom circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: 0,
          y: ry,
          r: markSize
        },
        className: 'ellipse-mark-bottom'
      });
    }
  },
  update(cfg, item) {
    // const customStyle = this.getCustomConfig(cfg) || {};
    // const defaultConfig = customStyle.default || {};
    // const style = deepMix({}, this.options.default, defaultConfig, cfg.style);
    // const { icon, linkPoints, labelCfg: defaultLabelCfg, ...ellipseStyle } = style;

    // const { rx, ry } = ellipseStyle;

    const customOptions = this.getCustomConfig(cfg) || {};
    const { style: defaultStyle, icon: defaultIcon, labelCfg: defaultLabelCfg } = this.options;
    const { style: customStyle, icon: customIcon, labelCfg: customLabelCfg } = customOptions;
    const style = deepMix({}, defaultStyle, customStyle, cfg.style);
    const icon = deepMix({}, defaultIcon, customIcon, cfg.icon);
    const size = this.getSize(cfg);

    const rx = size[0];
    const ry = size[1];

    const keyShape = item.get('keyShape');

    keyShape.attr({
      ...style,
      rx,
      ry
    });

    const group = item.getContainer();

    const labelCfg = deepMix({}, defaultLabelCfg, customLabelCfg, cfg.labelCfg);
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

    this.updateLinkPoints(cfg, group);
  },
  /**
   * 更新linkPoints
   * @param {Object} cfg 节点数据配置项
   * @param {Group} group Item所在的group
   */
  updateLinkPoints(cfg, group) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { linkPoints: defaultLinkPoints } = this.options;
    const { linkPoints: customLinkPoints } = customOptions;
    const linkPoints = deepMix({}, defaultLinkPoints, customLinkPoints, cfg.linkPoints);

    const { size: markSize, ...markStyles } = linkPoints;

    const size = this.getSize(cfg);
    const rx = size[0];
    const ry = size[1];

    const markLeft = group.findByClassName('ellipse-mark-left');
    if (markLeft) {
      markLeft.attr({
        ...markStyles,
        x: -rx,
        y: 0,
        r: markSize
      });
    }

    const markRight = group.findByClassName('ellipse-mark-right');
    if (markRight) {
      markRight.attr({
        ...markStyles,
        x: rx,
        y: 0,
        r: markSize
      });
    }

    const markTop = group.findByClassName('ellipse-mark-top');
    if (markTop) {
      markTop.attr({
        ...markStyles,
        x: 0,
        y: -ry,
        r: markSize
      });
    }

    const markBottom = group.findByClassName('ellipse-mark-bottom');
    if (markBottom) {
      markBottom.attr({
        ...markStyles,
        x: 0,
        y: ry,
        r: markSize
      });
    }
  }
}, 'single-shape');
