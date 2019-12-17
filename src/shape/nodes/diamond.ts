import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces'
import deepMix from '@antv/util/lib/deep-mix';
import { Item, NodeConfig, ShapeStyle } from '@g6/types'
import Global from '../../global'
import Shape from '../shape'


// 菱形shape
Shape.registerNode('diamond', {
  // 自定义节点时的配置
  options: {
    size: [ 100, 100 ],
    style: {
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
      width: 16,
      height: 16
    }
  },
  shapeType: 'circle',
  // 文本位置
  labelPosition: 'center',
  drawShape(cfg: NodeConfig, group: GGroup): IShape {
    const { icon: defaultIcon } = this.options;
    const style = this.getShapeStyle(cfg);
    const icon = deepMix({}, defaultIcon, cfg.icon);

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
        className: 'diamond-icon'
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
  drawLinkPoints(cfg: NodeConfig, group: GGroup) {
    const { linkPoints: defaultLinkPoints } = this.options;
    const linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);

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
        className: 'diamond-mark-left',
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
        className: 'diamond-mark-right',
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
        className: 'diamond-mark-top',
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
        className: 'diamond-mark-bottom',
        isAnchorPoint: true
      });
    }
  },
  getPath(cfg: NodeConfig): Array<Array<string | number>> {
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
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
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getShapeStyle(cfg: NodeConfig): ShapeStyle {
    const { style: defaultStyle } = this.options;
    const strokeStyle = {
      stroke: cfg.color
    };
    // 如果设置了color，则覆盖默认的stroke属性
    const style = deepMix({}, defaultStyle, strokeStyle, cfg.style);
    const path = this.getPath(cfg);
    const styles = { path, ...style };
    return styles;
  },
  update(cfg: NodeConfig, item: Item) {

    // TODO: after findByClassName is defined by G

    // const group = item.getContainer();
    // const { style: defaultStyle, icon: defaultIcon, labelCfg: defaultLabelCfg } = this.options;
    // const style = deepMix({}, defaultStyle, cfg.style);
    // const icon = deepMix({}, defaultIcon, cfg.icon);

    // const keyShape: G.Shape = item.get('keyShape');
    // const path = this.getPath(cfg);
    // keyShape.attr({
    //   path,
    //   ...style
    // });

    // const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    // const labelStyle = this.getLabelStyle(cfg, labelCfg, group);

    // const text: G.Shape = group.findByClassName('node-label');
    // if (text) {
    //   text.attr({
    //     ...labelStyle
    //   });
    // }

    // const diamondIcon: G.Shape = group.findByClassName('diamond-icon');
    // if (diamondIcon) {
    //   const { width: w, height: h } = icon;
    //   diamondIcon.attr({
    //     x: -w / 2,
    //     y: -h / 2,
    //     ...icon
    //   });
    // }

    // this.updateLinkPoints(cfg, group);
  },

  // TODO: after findByClassName is defined by G
  
  /**
   * 更新linkPoints
   * @param {Object} cfg 节点数据配置项
   * @param {Group} group Item所在的group
   */
  // updateLinkPoints(cfg: NodeConfig, group: GGroup) {
  //   const { linkPoints: defaultLinkPoints } = this.options;
  //   const linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);

  //   const { size: markSize, fill: markFill, stroke: markStroke, lineWidth: borderWidth } = linkPoints;

  //   const size = this.getSize(cfg);
  //   const width = size[0];
  //   const height = size[1];

  //   const markLeft: IShape = group.findByClassName('diamond-mark-left');
  //   if (markLeft) {
  //     markLeft.attr({
  //       x: -width / 2,
  //       y: 0,
  //       r: markSize,
  //       fill: markFill,
  //       stroke: markStroke,
  //       lineWidth: borderWidth
  //     });
  //   }

  //   const markRight: IShape = group.findByClassName('diamond-mark-right');
  //   if (markRight) {
  //     markRight.attr({
  //       x: width / 2,
  //       y: 0,
  //       r: markSize,
  //       fill: markFill,
  //       stroke: markStroke,
  //       lineWidth: borderWidth
  //     });
  //   }

  //   const markTop: IShape = group.findByClassName('diamond-mark-top');
  //   if (markTop) {
  //     markTop.attr({
  //       x: 0,
  //       y: -height / 2,
  //       r: markSize,
  //       fill: markFill,
  //       stroke: markStroke,
  //       lineWidth: borderWidth
  //     });
  //   }

  //   const markBottom: IShape = group.findByClassName('diamond-mark-bottom');
  //   if (markBottom) {
  //     markBottom.attr({
  //       x: 0,
  //       y: height / 2,
  //       r: markSize,
  //       fill: markFill,
  //       stroke: markStroke,
  //       lineWidth: borderWidth
  //     });
  //   }
  // }
}, 'single-node');
