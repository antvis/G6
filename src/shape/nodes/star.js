const Shape = require('../shape');
const deepMix = require('@antv/util/lib/deep-mix');
const Global = require('../../global');

// 五角星shape
Shape.registerNode('star', {
  // 自定义节点时的配置
  options: {
    size: 60,
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
      offset: 0
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
  shapeType: 'star',
  // 文本位置
  labelPosition: 'center',
  drawShape(cfg, group) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { icon: defaultIcon } = this.options;
    const { icon: customIcon } = customOptions;
    const style = this.getShapeStyle(cfg);
    const icon = deepMix({}, defaultIcon, customIcon, cfg.icon);

    const keyShape = group.addShape('path', {
      attrs: style
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

    const { top, left, right, leftBottom, rightBottom, size: markSize,
      ...markStyle } = linkPoints;
    const size = this.getSize(cfg);
    const outerR = size[0];

    if (right) {
      // right circle
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 0) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 0) / 180 * Math.PI) * outerR;

      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: x1,
          y: -y1,
          r: markSize
        },
        className: 'star-mark-right'
      });
    }

    if (top) {
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 1) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 1) / 180 * Math.PI) * outerR;

      // top circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: x1,
          y: -y1,
          r: markSize
        },
        className: 'star-mark-top'
      });
    }

    if (left) {
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 2) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 2) / 180 * Math.PI) * outerR;

      // left circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: x1,
          y: -y1,
          r: markSize
        },
        className: 'star-mark-left'
      });
    }

    if (leftBottom) {
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 3) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 3) / 180 * Math.PI) * outerR;

      // left bottom circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: x1,
          y: -y1,
          r: markSize
        },
        className: 'star-mark-left-bottom'
      });
    }

    if (rightBottom) {
      // up down left right 四个方向的坐标均不相同
      const x1 = Math.cos((18 + 72 * 4) / 180 * Math.PI) * outerR;
      const y1 = Math.sin((18 + 72 * 4) / 180 * Math.PI) * outerR;

      // left bottom circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: x1,
          y: -y1,
          r: markSize
        },
        className: 'star-mark-right-bottom'
      });
    }
  },
  getPath(cfg) {
    const customOptions = this.getCustomConfig(cfg) || {};
    const { innerR: customInnerR } = customOptions;
    const size = this.getSize(cfg);
    const outerR = size[0];
    const defaultInnerR = outerR * 3 / 8;
    const innerR = cfg.innerR || customInnerR || defaultInnerR;
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

    const starIcon = group.findByClassName('star-icon');
    if (starIcon) {
      const { width: w, height: h } = icon;
      starIcon.attr({
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

    const { size: markSize, ...markStyle } = linkPoints;

    const size = this.getSize(cfg);
    const outerR = size[0];

    const markRight = group.findByClassName('star-mark-right');
    if (markRight) {
      const x = Math.cos((18 + 72 * 0) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 0) / 180 * Math.PI) * outerR;

      markRight.attr({
        ...markStyle,
        x,
        y: -y,
        r: markSize
      });
    }

    const markTop = group.findByClassName('star-mark-top');
    if (markTop) {
      const x = Math.cos((18 + 72 * 1) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 1) / 180 * Math.PI) * outerR;

      // top circle
      markTop.attr({
        ...markStyle,
        x,
        y: -y,
        r: markSize
      });
    }

    const markLeft = group.findByClassName('star-mark-left');
    if (markLeft) {
      const x = Math.cos((18 + 72 * 2) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 2) / 180 * Math.PI) * outerR;

      // left circle
      markLeft.attr({
        ...markStyle,
        x,
        y: -y,
        r: markSize
      });
    }

    const markLeftBottom = group.findByClassName('star-mark-left-bottom');
    if (markLeftBottom) {
      const x = Math.cos((18 + 72 * 3) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 3) / 180 * Math.PI) * outerR;

      // bottom circle
      markLeftBottom.attr({
        ...markStyle,
        x,
        y: -y,
        r: markSize
      });
    }

    const markRightBottom = group.findByClassName('star-mark-right-bottom');
    if (markRightBottom) {
      const x = Math.cos((18 + 72 * 4) / 180 * Math.PI) * outerR;
      const y = Math.sin((18 + 72 * 4) / 180 * Math.PI) * outerR;

      // bottom circle
      markRightBottom.attr({
        ...markStyle,
        x,
        y: -y,
        r: markSize
      });
    }
  }
}, 'single-shape');
