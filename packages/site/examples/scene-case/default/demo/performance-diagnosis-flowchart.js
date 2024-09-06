import { BugOutlined } from '@ant-design/icons';
import { ExtensionCategory, Graph, HoverActivate, idOf, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Flex, Typography } from 'antd';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const { Text } = Typography;

const ACTIVE_COLOR = '#ffa500';
const COLOR_MAP = {
  'pre-inspection': '#a7b99e',
  problem: '#8983f3',
  inspection: '#ff98da',
  solution: '#6bd5e1',
};

class HoverElement extends HoverActivate {
  getActiveIds(event) {
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

register(ExtensionCategory.NODE, 'react', ReactNode);
register(ExtensionCategory.BEHAVIOR, 'hover-element', HoverElement);

const Node = ({ data }) => {
  const { text, type } = data.data;

  const isHovered = data.states?.includes('active');

  const containerStyle = {
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

export const PerformanceDiagnosisFlowchart = () => {
  const containerRef = useRef();

  useEffect(() => {
    fetch('https://assets.antv.antgroup.com/g6/performance-diagnosis.json')
      .then((res) => res.json())
      .then((data) => {
        const graph = new Graph({
          container: containerRef.current,
          data,
          animation: false,
          autoFit: 'view',
          node: {
            type: 'react',
            style: (d) => {
              const style = {
                component: <Node data={d} />,
                ports: [{ placement: 'top' }, { placement: 'bottom' }],
              };

              const size = {
                'pre-inspection': [200, 40],
                problem: [200, 80],
                inspection: [200, 100],
                solution: [200, 60],
              }[d.data.type || 'default'] || [200, 80];

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
              labelText: (d) => d.data.text,
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
            nodesep: 20,
            ranksep: 5,
          },
          behaviors: ['zoom-canvas', 'drag-canvas', 'hover-element', 'click-select'],
        });

        graph.render();
      });
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>;
};

const root = createRoot(document.getElementById('container'));
root.render(<PerformanceDiagnosisFlowchart />);
