import Shape from '../shape'
import deepMix from '@antv/util/lib/deep-mix';
import Global from '../../global'
import { NodeConfig } from '@g6/types'
import { G } from '@antv/g/lib'
import { IItem } from '@g6/interface/item';

/**
 * 基本的椭圆，可以添加文本，默认文本居中
 */
Shape.registerNode('ellipse', {
  // 自定义节点时的配置
  options: {
    size: [ 120, 60 ],
    style: {
      x: 0,
      y: 0,
      stroke: Global.defaultShapeStrokeColor,
      fill: Global.defaultShapeFillColor,
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
    }
  },
  shapeType: 'ellipse',
  // 文本位置
  labelPosition: 'center',
  drawShape(cfg: NodeConfig, group: G.Group): G.Shape {
    const { icon: defaultIcon } = this.options;
    const style = this.getShapeStyle(cfg);
    const icon = deepMix({}, defaultIcon, cfg.icon);

    const keyShape = group.addShape('ellipse', {
      attrs: style
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
  drawLinkPoints(cfg: NodeConfig, group: G.Group) {
    const { linkPoints: defaultLinkPoints } = this.options;
    const linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);

    const { top, left, right, bottom, size: markSize,
      ...markStyle } = linkPoints;
    const size = this.getSize(cfg);
    const rx = size[0] / 2;
    const ry = size[1] / 2;

    if (left) {
      // left circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: -rx,
          y: 0,
          r: markSize
        },
        className: 'ellipse-mark-left',
        isAnchorPoint: true
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
        className: 'ellipse-mark-right',
        isAnchorPoint: true
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
        className: 'ellipse-mark-top',
        isAnchorPoint: true
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
        className: 'ellipse-mark-bottom',
        isAnchorPoint: true
      });
    }
  },
  /**
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getShapeStyle(cfg: NodeConfig) {
    const { style: defaultStyle } = this.options;
    const strokeStyle = {
      stroke: cfg.color
    };
    // 如果设置了color，则覆盖默认的stroke属性
    const style = deepMix({}, defaultStyle, strokeStyle, cfg.style);
    const size = this.getSize(cfg);
    const rx = size[0] / 2;
    const ry = size[1] / 2;
    const styles = Object.assign({}, {
      x: 0,
      y: 0,
      rx,
      ry
    }, style);
    return styles;
  },
  update(cfg: NodeConfig, item: IItem) {

    // TODO: after findByClassName is defined by G

    // const { style: defaultStyle, icon: defaultIcon, labelCfg: defaultLabelCfg } = this.options;
    // const style = deepMix({}, defaultStyle, cfg.style);
    // const icon = deepMix({}, defaultIcon, cfg.icon);
    // const size = this.getSize(cfg);

    // const rx = size[0] / 2;
    // const ry = size[1] / 2;

    // const keyShape: G.Shape = item.get('keyShape');

    // keyShape.attr({
    //   ...style,
    //   rx,
    //   ry
    // });

    // const group = item.getContainer();

    // const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    // const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    // const text: G.Shape = group.findByClassName('node-label');
    // if (text) {
    //   text.attr({
    //     ...labelStyle
    //   });
    // }

    // const ellipseIcon = group.findByClassName('ellipse-icon');
    // const { width: w, height: h } = icon;
    // if (ellipseIcon) {
    //   ellipseIcon.attr({
    //     x: -w / 2,
    //     y: -h / 2,
    //     ...icon
    //   });
    // }

    // this.updateLinkPoints(cfg, group);
  },
  /**
   * 更新linkPoints
   * @param {Object} cfg 节点数据配置项
   * @param {Group} group Item所在的group
   */
  updateLinkPoints(cfg: NodeConfig, group: G.Group) {
    const { linkPoints: defaultLinkPoints } = this.options;
    const linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);

    const { size: markSize, ...markStyles } = linkPoints;

    const size = this.getSize(cfg);
    const rx = size[0] / 2;
    const ry = size[1] / 2;

    const markLeft: G.Shape = group.findByClassName('ellipse-mark-left');
    if (markLeft) {
      markLeft.attr({
        ...markStyles,
        x: -rx,
        y: 0,
        r: markSize
      });
    }

    const markRight: G.Shape = group.findByClassName('ellipse-mark-right');
    if (markRight) {
      markRight.attr({
        ...markStyles,
        x: rx,
        y: 0,
        r: markSize
      });
    }

    const markTop: G.Shape = group.findByClassName('ellipse-mark-top');
    if (markTop) {
      markTop.attr({
        ...markStyles,
        x: 0,
        y: -ry,
        r: markSize
      });
    }

    const markBottom: G.Shape = group.findByClassName('ellipse-mark-bottom');
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

// Shape.registerNode('ellipse', Ellipse);
