import data from '@@/dataset/organization-chart.json';
import type { RectStyleProps as GRectStyleProps, Group } from '@antv/g';
import type { BaseBehaviorOptions, IViewportEvent, LabelStyleProps, RectStyleProps, RuntimeContext } from '@antv/g6';
import { Badge, BaseBehavior, ExtensionCategory, Graph, GraphEvent, Label, Rect, register } from '@antv/g6';
enum ZoomLevel {
  OVERVIEW = 'overview',
  DETAILED = 'detailed',
}

const statusColors: Record<string, string> = {
  online: '#17BEBB',
  busy: '#E36397',
  offline: '#B7AD99',
};

const DEFAULT_LEVEL = ZoomLevel.DETAILED;

export const caseOrgChart: TestCase = async (context) => {
  /**
   * Draw a chart node with different ui based on the zoom level.
   */
  class ChartNode extends Rect {
    protected get data() {
      return this.context.model.getElementDataById(this.id).data as Record<string, string>;
    }

    protected get level() {
      return this.data.level || DEFAULT_LEVEL;
    }

    protected getLabelStyle(): false | LabelStyleProps {
      const text = this.data.name as string;
      const labelStyle =
        this.level === ZoomLevel.OVERVIEW
          ? {
              fill: '#fff',
              fontSize: 20,
              fontWeight: 600,
              textAlign: 'center',
              transform: [['translate', 0, 0]],
            }
          : {
              fill: '#2078B4',
              fontSize: 14,
              fontWeight: 400,
              textAlign: 'left',
              transform: [['translate', -65, -15]],
            };
      return { text, ...labelStyle } as LabelStyleProps;
    }

    protected getKeyStyle(attributes: Required<RectStyleProps>): GRectStyleProps {
      return {
        ...super.getKeyStyle(attributes),
        fill: this.level === ZoomLevel.OVERVIEW ? statusColors[this.data.status] : '#fff',
      };
    }

    protected getPositionStyle(attributes: Required<RectStyleProps>): false | LabelStyleProps {
      if (this.level === ZoomLevel.OVERVIEW) return false;
      return {
        text: this.data.position,
        fontSize: 8,
        fontWeight: 400,
        textTransform: 'uppercase',
        fill: '#343f4a',
        textAlign: 'left',
        transform: [['translate', -65, 0]],
      };
    }

    protected drawPositionShape(attributes: Required<RectStyleProps>, container: Group) {
      const positionStyle = this.getPositionStyle(attributes);
      this.upsert('position', Label, positionStyle, container);
    }

    protected getStatusStyle(attributes: Required<RectStyleProps>): false | LabelStyleProps {
      if (this.level === ZoomLevel.OVERVIEW) return false;
      return {
        text: this.data.status,
        fontSize: 8,
        textAlign: 'left',
        transform: [['translate', 40, -16]],
        padding: [0, 4],
        fill: '#fff',
        backgroundFill: statusColors[this.data.status as string],
      };
    }

    protected drawStatusShape(attributes: Required<RectStyleProps>, container: Group) {
      const statusStyle = this.getStatusStyle(attributes);
      this.upsert('status', Badge, statusStyle, container);
    }

    protected getPhoneStyle(attributes: Required<RectStyleProps>): false | LabelStyleProps {
      if (this.level === ZoomLevel.OVERVIEW) return false;
      return {
        text: this.data.phone,
        fontSize: 8,
        fontWeight: 300,
        textAlign: 'left',
        transform: [['translate', -65, 20]],
      };
    }

    protected drawPhoneShape(attributes: Required<RectStyleProps>, container: Group) {
      const style = this.getPhoneStyle(attributes);
      this.upsert('phone', Label, style, container);
    }

    public render(attributes: Required<RectStyleProps> = this.parsedAttributes, container: Group = this): void {
      super.render(attributes, container);

      this.drawPositionShape(attributes, container);

      this.drawStatusShape(attributes, container);

      this.drawPhoneShape(attributes, container);
    }
  }

  /**
   * Implement a level of detail rendering, which will show different details based on the zoom level.
   */
  class LevelOfDetail extends BaseBehavior {
    private prevLevel: ZoomLevel = DEFAULT_LEVEL;
    private levels: Record<ZoomLevel, [number, number]> = {
      [ZoomLevel.OVERVIEW]: [0, 0.6],
      [ZoomLevel.DETAILED]: [0.6, Infinity],
    };

    constructor(context: RuntimeContext, options: BaseBehaviorOptions) {
      super(context, options);
      this.bindEvents();
    }

    private updateZoomLevel = async (e: IViewportEvent) => {
      if ('scale' in e.data) {
        const scale = e.data.scale!;
        const level = Object.entries(this.levels).find(
          ([key, [min, max]]) => scale > min && scale <= max,
        )?.[0] as ZoomLevel;
        if (level && this.prevLevel !== level) {
          const { graph } = this.context;
          graph.updateNodeData((prev) => prev.map((node) => ({ ...node, data: { ...node.data, level } })));
          await graph.draw();
          this.prevLevel = level;
        }
      }
    };

    private bindEvents() {
      const { graph } = this.context;
      graph.on(GraphEvent.AFTER_TRANSFORM, this.updateZoomLevel);
    }

    private unbindEvents() {
      const { graph } = this.context;
      graph.off(GraphEvent.AFTER_TRANSFORM, this.updateZoomLevel);
    }

    public destroy() {
      this.unbindEvents();
      super.destroy();
    }
  }

  register(ExtensionCategory.NODE, 'chart-node', ChartNode);
  register(ExtensionCategory.BEHAVIOR, 'level-of-detail', LevelOfDetail);

  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'chart-node',
      style: {
        labelPlacement: 'center',
        lineWidth: 1,
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
        radius: 2,
        shadowBlur: 10,
        shadowColor: '#e0e0e0',
        shadowOffsetX: 3,
        size: [150, 60],
        stroke: '#C0C0C0',
      },
    },
    edge: {
      type: 'polyline',
      style: {
        router: {
          type: 'orth',
        },
        stroke: '#C0C0C0',
      },
    },
    layout: {
      type: 'dagre',
    },
    autoFit: 'view',
    behaviors: ['level-of-detail', 'zoom-canvas', 'drag-canvas'],
  });

  await graph.render();

  return graph;
};
