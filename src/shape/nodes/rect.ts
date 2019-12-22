import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces'
import deepMix from '@antv/util/lib/deep-mix';
import { Item, NodeConfig } from '@g6/types'
import Global from '../../global'
import Shape from '../shape'

Shape.registerNode('rect', {
  // 自定义节点时的配置
  options: {
    size: [ 100, 30 ],
    style: {
      radius: 0,
      stroke: Global.defaultShapeStrokeColor,
      fill: Global.defaultShapeFillColor,
      lineWidth: 1,
      fillOpacity: 1
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: '#595959',
        fontSize: 12
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
    // 连接点，默认为左右
    anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
  },
  shapeType: 'rect',
  labelPosition: 'center',
  drawShape(cfg: NodeConfig, group: GGroup): IShape {
    const style = this.getShapeStyle(cfg);

    const keyShape = group.addShape('rect', {
      attrs: style,
      className: 'rect-keyShape'
    });

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
    const width = size[0];
    const height = size[1];
    const styles = Object.assign({}, {
      x: -width / 2,
      y: -height / 2,
      width,
      height
    }, style);
    return styles;
  },
  update(cfg: NodeConfig, item: Item) {
    const { style: defaultStyle, labelCfg: defaultLabelCfg } = this.options;
    const style = deepMix({}, defaultStyle, cfg.style);
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
    const keyShape = item.get('keyShape');
    keyShape.attr({
      x: -width / 2,
      y: -height / 2,
      width,
      height,
      ...style
    });

    const group = item.getContainer();

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
    this.updateLinkPoints(cfg, group);
  }
}, 'single-node');

