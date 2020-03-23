import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces';
import { mix } from '@antv/util';
import { LabelStyle, Item, NodeConfig, ModelConfig, ShapeStyle } from '../../types';
import Global from '../../global';
import Shape from '../shape';
import { ILabelConfig, ShapeOptions } from '../../interface/shape';
import { isNil } from '@antv/util';

const collapseIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
  ];
};
const expandIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};

Shape.registerCombo(
  'rect',
  {
    // 自定义 Combo 时的配置
    options: {
      size: [100, 30],
      style: {
        radius: 0,
        stroke: Global.defaultCombo.style.stroke,
        fill: Global.defaultCombo.style.fill,
        lineWidth: Global.defaultCombo.style.lineWidth,
        fillOpacity: 1,
      },
      // 文本样式配置
      labelCfg: {
        style: {
          fill: '#595959',
          fontSize: 16,
        },
      },
      // 连接点，默认为左右
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      collapseIcon: {
        show: true,
        collapseSymbol: collapseIcon,
        expandSymbol: expandIcon,
        r: 6,
        lineWidth: 1,
        stroke: '#595959',
        offsetX: 10,
        offsetY: 10
      }
    },
    shapeType: 'rect',
    labelPosition: 'top',
    drawShape(cfg: NodeConfig, group: GGroup): IShape {
      const style = this.getShapeStyle!(cfg);
      const keyShape = group.addShape('rect', {
        attrs: style,
        className: 'rect-combo',
        name: 'rect-combo',
        draggable: true,
      });
      (this as any).drawCollapseIcon(cfg, group, style);
      return keyShape;
    },
    // 私有方法，不希望扩展的 Combo 复写这个方法
    getLabelStyleByPosition(cfg: NodeConfig, labelCfg: ILabelConfig): LabelStyle {
      const labelPosition = labelCfg.position || this.labelPosition;
  
      let { offset } = labelCfg;
      if (isNil(offset)) {
        // 考虑 offset = 0 的场景，不用用 labelCfg.offset || Global.nodeLabel.offset
        offset = this.offset as number; // 不居中时的偏移量
      }
  
      const size = this.getSize!(cfg as ModelConfig);
  
      const width = size[0];
      const height = size[1];
  
      let style: any;
      switch (labelPosition) {
        case 'top':
          style = {
            x: 0 - width / 2 - (offset as number),
            y: 0 - height / 2 - (offset as number),
            textBaseline: 'top', // 文本在图形的上方
            textAlign: 'left',
          };
          break;
        case 'bottom':
          style = {
            x: 0,
            y: height / 2 + (offset as number),
            textBaseline: 'bottom',
            textAlign: 'center',
          };
          break;
        case 'left':
          style = {
            x: 0 - width / 2 - (offset as number),
            y: 0,
            textAlign: 'left',
          };
          break;
        case 'center':
          style = {
            x: 0, y: 0, text: cfg!.label,
            textAlign: 'center',
          };
          break;
        default:
          style = {
            x: width / 2 + (offset as number),
            y: 0,
            textAlign: 'right',
          };
          break;
      }
      style.text = cfg.label;
      return style;
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle(cfg: NodeConfig) {
      const { style: defaultStyle } = this.options as ModelConfig;
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };
      // 如果设置了color，则覆盖默认的stroke属性
      const style = mix({}, defaultStyle, strokeStyle, cfg.style);
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = style.width || size[0];
      const height = style.height || size[1];
      const styles = Object.assign(
        {},
        {
          x: -width / 2,
          y: -height / 2,
          width,
          height,
        },
        style,
      );
      return styles;
    },
    /**
     * 绘制节点上的LinkPoints
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    drawCollapseIcon(cfg: NodeConfig, group: GGroup, style: any) {
      const { collapseIcon: defaultCollapseIcon } = this.options as any;
      const collapseIcon = mix({}, defaultCollapseIcon, cfg.collapseIcon);

      const { show, collapseSymbol, expandSymbol, offsetX, offsetY } = collapseIcon;
      delete collapseIcon.collapseSymbol;
      delete collapseIcon.expandSymbol;
      const size = this.getSize!(cfg);
      const r = collapseIcon.r || size[0] / 2;
      delete collapseIcon.r;
      if (show) {
        // left circle
        const attrs = {
          r,
          x: style.width / 2 - r - offsetX,
          y: -style.height / 2 + r + offsetY,
          ...collapseIcon,
          symbol: collapseSymbol,
        };

        group.addShape('marker', {
          attrs,
          className: 'collapse-icon',
          name: 'collapse-icon'
        });
      }
    },
    update(cfg: NodeConfig, item: Item) {
      const { style: defaultStyle } = this.options as ModelConfig;
      let size = (this as ShapeOptions).getSize!(cfg);
      const keyShape = item.get('keyShape');
      if (!cfg.size) {
        size[0] = keyShape.attr('width') || defaultStyle.width;
        size[1] = keyShape.attr('height') || defaultStyle.height;
      }
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color,
        x: -size[0] / 2,
        y: -size[1] / 2,
        width: size[0],
        height: size[1],
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      let style = mix({}, defaultStyle, keyShape.attr(), strokeStyle);
      style = mix(style, cfg.style);

      (this as any).updateShape(cfg, item, style, false);
    },
  },
  'single-combo',
);
