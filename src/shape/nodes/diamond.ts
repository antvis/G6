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
      attrs: style,
      className: 'diamond-keyShape',
      draggable: true
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
        className: 'link-point-left',
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
        className: 'link-point-right',
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
        className: 'link-point-top',
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
        className: 'link-point-bottom',
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
    const group = item.getContainer();
    const { style: defaultStyle } = this.options;
    const path = this.getPath(cfg);
    // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
    const strokeStyle = {
      stroke: cfg.color,
      path
    };
    // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
    const keyShape = item.get('keyShape');
    const style = deepMix({}, defaultStyle, keyShape.attr(), strokeStyle, cfg.style);

    this.updateShape(cfg, item, style, true);
    this.updateLinkPoints(cfg, group);
  }
}, 'single-node');
