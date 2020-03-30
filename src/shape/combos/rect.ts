import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces';
import { mix, clone } from '@antv/util';
import { LabelStyle, Item, NodeConfig, ModelConfig, ShapeStyle } from '../../types';
import Global from '../../global';
import Shape from '../shape';
import { ILabelConfig, ShapeOptions } from '../../interface/shape';
import { isNil } from '@antv/util';
import global from '../../global';

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
      padding: 25,
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
      const { style: cfgStyle } = cfg;
      const padding = this.options.padding;

      let { refX, refY } = labelCfg;
      // 考虑 refX 和 refY = 0 的场景，不用用 labelCfg.refX || Global.nodeLabel.refY
      if (isNil(refX)) {
        refX = this.refX as number; // 不居中时的偏移量
      }
      if (isNil(refY)) {
        refY = this.refY as number; // 不居中时的偏移量
      }
  
      const width = cfgStyle.width + 2 * padding;
      const height = cfgStyle.height + 2 * padding;
  
      let style: any;
      switch (labelPosition) {
        case 'top':
          style = {
            x: 0 - width / 2 + refX,
            y: 0 - height / 2 + refY,
            textBaseline: 'top', // 文本在图形的上方
            textAlign: 'left',
          };
          break;
        case 'bottom':
          style = {
            x: 0,
            y: height / 2 + refY,
            textBaseline: 'bottom',
            textAlign: 'center',
          };
          break;
        case 'left':
          style = {
            x: 0 - width / 2 + refY,
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
            x: width / 2 + refX,
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
      const padding: number = this.options.padding;
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };

      // 如果设置了color，则覆盖默认的stroke属性
      const style = mix({}, defaultStyle, strokeStyle, cfg.style);
      const defaultSize = global.defaultCombo.size;
      const width: number = Math.max(style.width, defaultSize[0]) + padding * 2 || defaultSize[0] + padding * 2;
      const height: number = Math.max(style.height, defaultSize[1]) + padding * 2 || defaultSize[1] + padding * 2;
      delete style.width;
      delete style.height;
      cfg.style.width = width - padding * 2;
      cfg.style.height = height - padding * 2;
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
      const r = collapseIcon.r;
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
    /**
     * 更新 rect combo 的 collapse/expand icon
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    updateCollapseIcon(cfg: NodeConfig, item: Item, style: any) {
      const { collapseIcon: defaultCollapseIcon } = this.options as any;
      const collapseIcon = mix({}, defaultCollapseIcon, cfg.collapseIcon);

      const { show, collapseSymbol, expandSymbol, offsetX, offsetY } = collapseIcon;
      delete collapseIcon.collapseSymbol;
      delete collapseIcon.expandSymbol;
      const r = collapseIcon.r;
      delete collapseIcon.r;
      
      const group = item.getContainer();
      const icon = group.find(element => element.get('name') === 'collapse-icon');
      const attrs = {
        r,
        x: style.width / 2 - r - offsetX,
        y: -style.height / 2 + r + offsetY,
        ...collapseIcon,
        symbol: collapseSymbol,
      }
      if (!icon && show) {
        // left circle
        group.addShape('marker', {
          attrs,
          className: 'collapse-icon',
          name: 'collapse-icon'
        });
      } else if (show) {
        icon.attr({ ...attrs });
      }
    },
    update(cfg: NodeConfig, item: Item) {
      const { style: defaultStyle } = this.options as ModelConfig;
      const defaultSize = global.defaultCombo.size;
      const keyShape = item.get('keyShape');
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      let style = mix({}, defaultStyle, keyShape.attr(), strokeStyle);
      style = mix(style, cfg.style);

      const padding: number = this.options.padding;
      style.width = Math.max(style.width, defaultSize[0]) + padding * 2 || defaultSize[0] + padding * 2;
      style.height = Math.max(style.height, defaultSize[1]) + padding * 2 || defaultSize[1] + padding * 2;
      style.x = -style.width / 2;
      style.y = -style.height / 2;
      cfg.style.width = style.width - padding * 2;
      cfg.style.height = style.height - padding * 2;


      (this as any).updateShape(cfg, item, style, false);
    },
    updateShape(cfg: NodeConfig, item: Item, keyShapeStyle: object) {
      const keyShape = item.get('keyShape');
      keyShape.attr({
        ...keyShapeStyle,
      });
  
      (this as any).updateLabel(cfg, item);
      (this as any).updateCollapseIcon(cfg, item, keyShapeStyle)
    }
  },
  'single-combo',
);
