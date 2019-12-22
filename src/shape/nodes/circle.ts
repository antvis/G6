import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces'
import deepMix from '@antv/util/lib/deep-mix';
import { Item, NodeConfig } from '@g6/types'
import Global from '../../global'
import Shape from '../shape'


// 带有图标的圆，可用于拓扑图中
Shape.registerNode('circle', {
  // 自定义节点时的配置
  options: {
    size: 60,
    style: {
      x: 0,
      y: 0,
      stroke: Global.defaultShapeStrokeColor,
      fill: Global.defaultShapeFillColor,
      lineWidth: 1
    },
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
    const keyShape: IShape = group.addShape('circle', {
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
        className: 'circle-icon'
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
    const r = size[0] / 2;
    if (left) {
      // left circle
      group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: -r,
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
          x: r,
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
          y: -r,
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
          y: r,
          r: markSize
        },
        className: 'link-point-bottom',
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
    const r = size[0] / 2;
    const styles = Object.assign({}, {
      x: 0,
      y: 0,
      r
    }, style);
    return styles;
  },
  update(cfg: NodeConfig, item: Item) {

    const { style: defaultStyle, icon: defaultIcon, labelCfg: defaultLabelCfg } = this.options;
    const style = deepMix({}, defaultStyle, cfg.style);
    const icon = deepMix({}, defaultIcon, cfg.icon);
    const size = this.getSize(cfg);
    const r = size[0] / 2;

    const group = item.getContainer();

    const keyShape: IShape = item.get('keyShape');
    keyShape.attr({
      ...style,
      r
    });

    const label = group.find(element => { return element.get('className') === 'node-label'})
    if (cfg.label) {
      if (!label) {
        const newLabel = this.drawLabel(cfg, group)
        newLabel.set('className', 'node-label')
      } else {
        const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
        const labelStyle = this.getLabelStyle(cfg, labelCfg, group)
        /**
         * fixme g中shape的rotate是角度累加的，不是label的rotate想要的角度
         * 由于现在label只有rotate操作，所以在更新label的时候如果style中有rotate就重置一下变换
         * 后续会基于g的Text复写一个Label出来处理这一类问题
         */
        label.resetMatrix()
        label.attr(labelStyle)
      }
    }

    const circleIcon = group.find(element => { return element.get('className') === 'circle-icon'})
    const { width: w, height: h } = icon;
    if (circleIcon) {
      circleIcon.attr({
        x: -w / 2,
        y: -h / 2,
        ...icon
      });
    }

    this.updateLinkPoints(cfg, group);
  }
}, 'single-node');
