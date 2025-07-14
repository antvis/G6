import { BugOutlined } from '@ant-design/icons-vue';
import type { EdgeData, Element, GraphData, GraphOptions, IPointerEvent, NodeData } from '@antv/g6';
import { ExtensionCategory, HoverActivate, idOf, register } from '@antv/g6';
import { Flex, Typography } from 'ant-design-vue';
import { computed, ComputedRef, CSSProperties, defineComponent, onMounted, ref } from 'vue-demi';
import { Graph } from '../graph';

const { Text } = Typography;

const ACTIVE_COLOR = '#f6c523';
const COLOR_MAP: Record<string, string> = {
  'pre-inspection': '#3fc1c9',
  problem: '#8983f3',
  inspection: '#f48db4',
  solution: '#ffaa64',
};

class HoverElement extends HoverActivate {
  protected getActiveIds(event: IPointerEvent<Element>) {
    const { model, graph } = this.context;
    const elementId = event.target.id;
    const { targetType: elementType } = event;

    const ids = [elementId];
    if (elementType === 'edge') {
      const edge = model.getEdgeDatum(elementId);
      ids.push(edge.source, edge.target);
    } else if (elementType === 'node') {
      ids.push(...model.getRelatedEdgesData(elementId).map(idOf));
    }

    graph.frontElement(ids);

    return ids;
  }
}

register(ExtensionCategory.BEHAVIOR, 'hover-element', HoverElement);

const Node = ({ data }: { data: NodeData }) => {
  const { text, type } = data.data as { text: string; type: string };
  const isHovered = data.states?.includes('active');
  const isSelected = data.states?.includes('selected');
  const color = isHovered ? ACTIVE_COLOR : COLOR_MAP[type];

  const containerStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    background: color,
    border: `3px solid ${color}`,
    borderRadius: 16,
    cursor: 'pointer',
  };

  if (isSelected) {
    Object.assign(containerStyle, { border: `3px solid #000` });
  }

  return (
    <Flex style={containerStyle} align="center" justify="center">
      <Flex vertical style={{ padding: '8px 16px', textAlign: 'center' }} align="center" justify="center">
        {type === 'problem' && <BugOutlined style={{ color: '#fff', fontSize: 24, marginBottom: 8 }} />}
        <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{text}</Text>
      </Flex>
    </Flex>
  );
};

export const PerformanceDiagnosis = defineComponent({
  setup() {
    const data = ref<GraphData>();
    function setData(json) {
      data.value = json;
    }
    onMounted(() => {
      fetch('https://assets.antv.antgroup.com/g6/performance-diagnosis.json')
        .then((res) => res.json())
        .then(setData);
    });

    const options: ComputedRef<GraphOptions> = computed(() => {
      return {
        data: data.value,
        animation: false,
        width: 800,
        height: 600,
        autoFit: 'view',
        node: {
          type: 'vue',
          style: (d: NodeData) => {
            const style: NodeData['style'] = {
              component: <Node data={d} />,
              ports: [{ placement: 'top' }, { placement: 'bottom' }],
            };

            const size = {
              'pre-inspection': [240, 120],
              problem: [200, 120],
              inspection: [330, 100],
              solution: [200, 120],
            }[d.data!.type as string] || [200, 80];

            Object.assign(style, {
              size,
              dx: -size[0] / 2,
              dy: -size[1] / 2,
            });
            return style;
          },
          state: {
            active: {
              halo: false,
            },
            selected: {
              halo: false,
            },
          },
        },
        edge: {
          type: 'polyline',
          style: {
            lineWidth: 3,
            radius: 20,
            stroke: '#8b9baf',
            endArrow: true,
            labelText: (d: EdgeData) => d.data!.text as string,
            labelFill: '#8b9baf',
            labelFontWeight: 600,
            labelBackground: true,
            labelBackgroundFill: '#f8f8f8',
            labelBackgroundOpacity: 1,
            labelBackgroundLineWidth: 3,
            labelBackgroundStroke: '#8b9baf',
            labelPadding: [1, 10],
            labelBackgroundRadius: 4,
            router: {
              type: 'orth',
            },
          },
          state: {
            active: {
              stroke: ACTIVE_COLOR,
              labelBackgroundStroke: ACTIVE_COLOR,
              halo: false,
            },
          },
        },
        layout: {
          type: 'antv-dagre',
        },
        behaviors: ['zoom-canvas', 'drag-canvas', 'hover-element', 'click-select'],
      };
    });
    return () => {
      return <Graph options={options.value} key={'PerformanceDiagnosis'} />;
    };
  },
});
