const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');
const Util = require('../../util');

Shape.registerNode('modelRect', {
  // labelPosition: 'center',
  // 自定义节点时的配置
  options: {
    size: [ 185, 70 ],
    style: {
      radius: 5,
      stroke: '#69c0ff',
      fill: '#ffffff',
      lineWidth: 1,
      fillOpacity: 1
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: '#595959',
        fontSize: 14
      },
      offset: 30
    },
    stateStyles: {
      // hover状态下的配置
      hover: {
        lineWidth: 2,
        stroke: '#1890ff',
        fill: '#e6f7ff'
      },
      // 节点选中状态下的配置
      selected: {
        lineWidth: 3,
        stroke: '#1890ff',
        fill: '#e6f7ff'
      }
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
      height: 16,
      // 用于调整图标的左右位置
      offset: 0
    },
    // 节点中表示状态的icon配置
    stateIcon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      x: 0,
      y: 0,
      // icon的地址，字符串类型
      img: 'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
      width: 16,
      height: 16,
      // 用于调整图标的左右位置
      offset: -5
    },
    // 连接点，默认为左右
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  },
  shapeType: 'modelRect',
  drawShape(cfg, group) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { preRect: defaultPreRect } = this.options;
    const { preRect: customPreRect } = customOptions;
    const style = this.getShapeStyle(cfg);
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];

    const keyShape = group.addShape('rect', {
      attrs: style
    });

    const preRect = deepMix({}, defaultPreRect, customPreRect, cfg.preRect);
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

    this.drawLogoIcon(cfg, group);

    this.drawStateIcon(cfg, group);

    this.drawLinkPoints(cfg, group);
    return keyShape;
  },
  /**
   * 绘制模型矩形左边的logo图标
   * @param {Object} cfg 数据配置项
   * @param {Group} group Group实例
   */
  drawLogoIcon(cfg, group) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { logoIcon: defaultLogoIcon } = this.options;
    const { logoIcon: customLogoIcon } = customOptions;
    const logoIcon = deepMix({}, defaultLogoIcon, customLogoIcon, cfg.logoIcon);
    const size = this.getSize(cfg);
    const width = size[0];

    if (logoIcon.show) {
      const { width: w, height: h, x, y, offset, ...logoIconStyle } = logoIcon;
      const image = group.addShape('image', {
        attrs: {
          ...logoIconStyle,
          x: x || -width / 2 + w + offset,
          y: y || -h / 2,
          width: w,
          height: h
        },
        className: 'rect-logo-icon'
      });

      image.set('capture', false);
    }
  },
  /**
   * 绘制模型矩形右边的状态图标
   * @param {Object} cfg 数据配置项
   * @param {Group} group Group实例
   */
  drawStateIcon(cfg, group) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { stateIcon: defaultStateIcon } = this.options;
    const { stateIcon: customStateIcon } = customOptions;
    const stateIcon = deepMix({}, defaultStateIcon, customStateIcon, cfg.stateIcon);
    const size = this.getSize(cfg);
    const width = size[0];

    if (stateIcon.show) {
      const { width: w, height: h, x, y, offset, ...iconStyle } = stateIcon;
      const image = group.addShape('image', {
        attrs: {
          ...iconStyle,
          x: x || width / 2 - w + offset,
          y: y || -h / 2,
          width: w,
          height: h
        },
        className: 'rect-state-icon'
      });

      image.set('capture', false);
    }
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
    const width = size[0];
    const height = size[1];

    if (left) {
      // left circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: -width / 2,
          y: 0,
          r: markSize
        },
        className: 'rect-mark-left',
        isAnchorPoint: true
      });
    }

    if (right) {
      // right circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: width / 2,
          y: 0,
          r: markSize
        },
        className: 'rect-mark-right',
        isAnchorPoint: true
      });
    }

    if (top) {
      // top circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: 0,
          y: -height / 2,
          r: markSize
        },
        className: 'rect-mark-top',
        isAnchorPoint: true
      });
    }

    if (bottom) {
      // bottom circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: 0,
          y: height / 2,
          r: markSize
        },
        className: 'rect-mark-bottom',
        isAnchorPoint: true
      });
    }
  },
  drawLabel(cfg, group) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { labelCfg: defaultLabelCfg, logoIcon: defaultLogoIcon } = this.options;
    const { labelCfg: customLabelCfg, logoIcon: customLogoIcon } = customOptions;

    const logoIcon = deepMix({}, defaultLogoIcon, customLogoIcon, cfg.logoIcon);

    const labelCfg = deepMix({}, defaultLabelCfg, customLabelCfg, cfg.labelCfg);

    const size = this.getSize(cfg);
    const width = size[0];

    let label = null;

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
          text: cfg.label
        }
      });

      group.addShape('text', {
        attrs: {
          text: cfg.description,
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
          text: cfg.label
        }
      });
    }
    return label;
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
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
    const styles = Util.mix({}, {
      x: -width / 2,
      y: -height / 2,
      width,
      height
    }, style);
    return styles;
  },
  update(cfg, item) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { style: defaultStyle, labelCfg: defaultLabelCfg, preRect: defaultPreRect,
      logoIcon: defaultLogoIcon, stateIcon: defaultStateIcon } = this.options;
    const { style: customStyle, labelCfg: customLabelCfg, preRect: customPreRect,
      logoIcon: customLogoIcon, stateIcon: customStateIcon } = customOptions;
    const style = deepMix({}, defaultStyle, customStyle, cfg.style);
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
    const keyShape = item.get('keyShape');
    keyShape.attr({
      ...style,
      x: -width / 2,
      y: -height / 2,
      width,
      height
    });

    const group = item.getContainer();

    const labelCfg = deepMix({}, defaultLabelCfg, customLabelCfg, cfg.labelCfg);
    const text = group.findByClassName('node-label');

    const logoIcon = deepMix({}, defaultLogoIcon, customLogoIcon, cfg.logoIcon);

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
      const preRect = deepMix({}, defaultPreRect, customPreRect, cfg.preRect);
      preRectShape.attr({
        ...preRect,
        x: -width / 2,
        y: -height / 2,
        height
      });
    }

    const logoIconShape = group.findByClassName('rect-logo-icon');
    if (logoIconShape) {
      const { width: w, height: h, x, y, offset, ...logoIconStyle } = logoIcon;
      logoIconShape.attr({
        ...logoIconStyle,
        x: x || -width / 2 + w + offset,
        y: y || -h / 2,
        width: w,
        height: h
      });
    }

    const stateIconShape = group.findByClassName('rect-state-icon');
    if (stateIconShape) {
      const stateIcon = deepMix({}, defaultStateIcon, customStateIcon, cfg.stateIcon);
      const { width: w, height: h, x, y, offset, ...stateIconStyle } = stateIcon;
      stateIconShape.attr({
        ...stateIconStyle,
        x: x || width / 2 - w + offset,
        y: y || -h / 2,
        width: w,
        height: h
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

    const { size: markSize, fill: markFill, stroke: markStroke, lineWidth: borderWidth } = linkPoints;

    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];

    const markLeft = group.findByClassName('rect-mark-left');
    if (markLeft) {
      markLeft.attr({
        x: -width / 2,
        y: 0,
        r: markSize,
        fill: markFill,
        stroke: markStroke,
        lineWidth: borderWidth
      });
    }

    const markRight = group.findByClassName('rect-mark-right');
    if (markRight) {
      markRight.attr({
        x: width / 2,
        y: 0,
        r: markSize,
        fill: markFill,
        stroke: markStroke,
        lineWidth: borderWidth
      });
    }

    const markTop = group.findByClassName('rect-mark-top');
    if (markTop) {
      markTop.attr({
        x: 0,
        y: -height / 2,
        r: markSize,
        fill: markFill,
        stroke: markStroke,
        lineWidth: borderWidth
      });
    }

    const markBottom = group.findByClassName('rect-mark-bottom');
    if (markBottom) {
      markBottom.attr({
        x: 0,
        y: height / 2,
        r: markSize,
        fill: markFill,
        stroke: markStroke,
        lineWidth: borderWidth
      });
    }
  }
}, 'single-shape');
