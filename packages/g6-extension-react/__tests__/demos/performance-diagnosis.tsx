import { BugOutlined } from '@ant-design/icons';
import type { EdgeData, Element, GraphData, GraphOptions, IPointerEvent, NodeData } from '@antv/g6';
import { ExtensionCategory, HoverActivate, idOf, register } from '@antv/g6';
import { Flex, Typography } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { Graph } from '../../src/graph';

const { Text } = Typography;

const ACTIVE_COLOR = '#ffa500';
const COLOR_MAP: Record<string, string> = {
  'pre-inspection': '#a7b99e',
  problem: '#8983f3',
  inspection: '#ff98da',
  solution: '#6bd5e1',
};

class HoverElement extends HoverActivate {
  protected getActiveIds(event: IPointerEvent<Element>) {
    const { model, graph } = this.context;
    const { targetType, target } = event;
    const targetId = target.id;

    const ids = [targetId];
    if (targetType === 'edge') {
      const edge = model.getEdgeDatum(targetId);
      ids.push(edge.source, edge.target);
    } else if (targetType === 'node') {
      ids.push(...model.getRelatedEdgesData(targetId).map(idOf));
    }

    graph.frontElement(ids);

    return ids;
  }
}

register(ExtensionCategory.BEHAVIOR, 'hover-element', HoverElement);

const Node = ({ data }: { data: NodeData }) => {
  const { text, type } = data.data as { text: string; type: string };

  const isHovered = data.states?.includes('active');

  const containerStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    background: isHovered ? ACTIVE_COLOR : COLOR_MAP[type],
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '8px',
    cursor: 'pointer',
  };

  return (
    <Flex style={containerStyle} vertical>
      {type === 'problem' && <BugOutlined style={{ color: '#fff', fontSize: 24, marginBottom: 8 }} />}
      <Text style={{ color: '#fff', fontWeight: 500 }}>{text}</Text>
    </Flex>
  );
};

export const PerformanceDiagnosis = () => {
  const [data, setData] = useState<GraphData>();

  useEffect(() => {
    fetch('https://assets.antv.antgroup.com/g6/performance-diagnosis.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const options: GraphOptions = {
    data,
    animation: false,
    width: 800,
    height: 600,
    autoFit: 'view',
    node: {
      type: 'react',
      style: (d: NodeData) => {
        const style: NodeData['style'] = {
          component: <Node data={d} />,
          ports: [{ placement: 'left' }, { placement: 'right' }],
        };

        const size = {
          'pre-inspection': [200, 40],
          problem: [200, 80],
          inspection: [200, 100],
          solution: [200, 60],
        }[(d.data!.type || 'default') as string] || [200, 80];

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
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 2,
        radius: 12,
        stroke: '#8b9baf',
        endArrow: true,
        labelText: (d: EdgeData) => d.data!.text as string,
        labelBackground: true,
        labelBackgroundFill: '#f8f8f8',
        labelBackgroundOpacity: 1,
        labelBackgroundLineWidth: 2,
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
      nodeSize: [200, 80],
      rankdir: 'LR',
      nodesep: 20,
      ranksep: 40,
    },
    behaviors: ['zoom-canvas', 'drag-canvas', 'hover-element', 'click-select'],
  };

  return <Graph options={options} />;
};
