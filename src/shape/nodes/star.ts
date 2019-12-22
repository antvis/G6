import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces'
import deepMix from '@antv/util/lib/deep-mix';
import { Item, NodeConfig } from '@g6/types'
import Global from '../../global'
import Shape from '../shape'

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
  drawLinkPoints(cfg: NodeConfig, group: GGroup) {
    const { linkPoints: defaultLinkPoints } = this.options;
    const linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);

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
        className: 'link-point-right'
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
        className: 'link-point-top'
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
        className: 'link-point-left'
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
        className: 'link-point-left-bottom'
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
        className: 'link-point-right-bottom'
      });
    }
  },
  getPath(cfg: NodeConfig) {
    const size = this.getSize(cfg);
    const outerR = size[0];
    const defaultInnerR = outerR * 3 / 8;
    const innerR = cfg.innerR || defaultInnerR;
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
  getShapeStyle(cfg: NodeConfig) {
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
    const { style: defaultStyle, icon: defaultIcon, labelCfg: defaultLabelCfg } = this.options;
    const style = deepMix({}, defaultStyle, cfg.style);
    const icon = deepMix({}, defaultIcon, cfg.icon);

    const keyShape = item.get('keyShape');
    const path = this.getPath(cfg);
    keyShape.attr({
      path,
      ...style
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

    const starIcon = group.find(element => { return element.get('className') === 'star-icon'})
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
  updateLinkPoints(cfg: NodeConfig, group: GGroup) {
    const { linkPoints: defaultLinkPoints } = this.options;
    
    const markLeft = group.find(element => { return element.get('className') === 'link-point-left'})
    const markRight= group.find(element => { return element.get('className') === 'link-point-right'})
    const markTop = group.find(element => { return element.get('className') === 'link-point-top'})
    const markLeftBottom = group.find(element => { return element.get('className') === 'link-point-left-bottom'})
    const markRightBottom = group.find(element => { return element.get('className') === 'link-point-right-bottom'})
    

    let currentLinkPoints = undefined;
    if (markLeft) {
      currentLinkPoints = markLeft.get('attrs');
    }
    if (markRight && !currentLinkPoints) {
      currentLinkPoints = markRight.get('attrs');
    }
    if (markTop && !currentLinkPoints) {
      currentLinkPoints = markTop.get('attrs');
    }
    if (markLeftBottom && !currentLinkPoints) {
      currentLinkPoints = markLeftBottom.get('attrs');
    }
    if (markRightBottom && !currentLinkPoints) {
      currentLinkPoints = markRightBottom.get('attrs');
    }
    if (!currentLinkPoints) currentLinkPoints = defaultLinkPoints;

    const linkPoints = deepMix({}, currentLinkPoints, cfg.linkPoints);


    const { fill: markFill, stroke: markStroke, lineWidth: borderWidth } = linkPoints;
    let markSize = linkPoints.size;
    if (!markSize) markSize = linkPoints.r;
    const { left, right, top, leftBottom, rightBottom } = cfg.linkPoints ? cfg.linkPoints : { left: undefined, right: undefined, top: undefined, leftBottom: undefined, rightBottom: undefined };


    const size = this.getSize(cfg);
    const outerR = size[0];
    const styles = {
      r: markSize,
      fill: markFill,
      stroke: markStroke,
      lineWidth: borderWidth
    }

    let x = Math.cos((18 + 72 * 0) / 180 * Math.PI) * outerR;
    let y = Math.sin((18 + 72 * 0) / 180 * Math.PI) * outerR;
    if (markRight) {
      if (!right && right !== undefined) {
        markRight.remove();
      } else {
        markRight.attr({
          x,
          y: -y,
          ...styles
        });
      }
    } else if (right) {
      group.addShape('circle', {
        attrs: {
          x,
          y: -y,
          ...styles
        },
        className: 'link-point-right',
        isAnchorPoint: true
      });
    }

    x = Math.cos((18 + 72 * 1) / 180 * Math.PI) * outerR;
    y = Math.sin((18 + 72 * 1) / 180 * Math.PI) * outerR;
    if (markTop) {
      if (!top && top !== undefined) {
        markTop.remove();
      } else {
        markTop.attr({
          x,
          y: -y,
          ...styles
        });
      }
    } else if (top) {
      group.addShape('circle', {
        attrs: {
          x,
          y: -y,
          ...styles
        },
        className: 'link-point-top',
        isAnchorPoint: true
      });
    }

    x = Math.cos((18 + 72 * 2) / 180 * Math.PI) * outerR;
    y = Math.sin((18 + 72 * 2) / 180 * Math.PI) * outerR;
    if (markLeft) {
      if (!left && left !== undefined) {
        markLeft.remove();
      } else {
        markLeft.attr({
          x,
          y: -y,
          ...styles
        });
      }
    } else if (left) {
      group.addShape('circle', {
        attrs: {
          x,
          y: -y,
          ...styles
        },
        className: 'link-point-left',
        isAnchorPoint: true
      });
    }

    x = Math.cos((18 + 72 * 3) / 180 * Math.PI) * outerR;
    y = Math.sin((18 + 72 * 3) / 180 * Math.PI) * outerR;
    if (markLeftBottom) {
      if (!leftBottom && leftBottom !== undefined) {
        markLeftBottom.remove();
      } else {
        markLeftBottom.attr({
          x,
          y: -y,
          ...styles
        });
      }
    } else if (leftBottom) {
      group.addShape('circle', {
        attrs: {
          x,
          y: -y,
          ...styles
        },
        className: 'link-point-left-bottom',
        isAnchorPoint: true
      });
    }

    x = Math.cos((18 + 72 * 4) / 180 * Math.PI) * outerR;
    y = Math.sin((18 + 72 * 4) / 180 * Math.PI) * outerR;
    if (markRightBottom) {
      if (!rightBottom && rightBottom !== undefined) {
        markLeftBottom.remove();
      } else {
        markRightBottom.attr({
          x,
          y: -y,
          ...styles
        });
      }
    } else if (rightBottom) {
      group.addShape('circle', {
        attrs: {
          x,
          y: -y,
          ...styles
        },
        className: 'link-point-right-bottom',
        isAnchorPoint: true
      });
    }
  }
}, 'single-node');
