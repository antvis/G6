import { DatabaseFilled } from '@ant-design/icons';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Badge, Flex, Input, Tag, Typography } from 'antd';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const { Text } = Typography;

register(ExtensionCategory.NODE, 'react', ReactNode);

const Node = ({ data, onChange }) => {
  const { status, type } = data.data;

  return (
    <Flex
      style={{
        width: '100%',
        height: '100%',
        background: '#fff',
        padding: 10,
        borderRadius: 5,
        border: '1px solid gray',
      }}
      vertical
    >
      <Flex align="center" justify="space-between">
        <Text>
          <DatabaseFilled />
          Server
          <Tag>{type}</Tag>
        </Text>
        <Badge status={status} />
      </Flex>
      <Text type="secondary">{data.id}</Text>
      <Flex align="center">
        <Text style={{ flexShrink: 0 }}>
          <Text type="danger">*</Text>URL:
        </Text>
        <Input
          style={{ borderRadius: 0, borderBottom: '1px solid #d9d9d9' }}
          variant="borderless"
          value={data.data?.url}
          onChange={(event) => {
            const url = event.target.value;
            onChange?.(url);
          }}
        />
      </Flex>
    </Flex>
  );
};

export const ReactNodeDemo = () => {
  const containerRef = useRef();

  useEffect(() => {
    const graph = new Graph({
      container: containerRef.current,
      data: {
        nodes: [
          {
            id: 'local-server-1',
            data: { status: 'success', type: 'local', url: 'http://localhost:3000' },
            style: { x: 50, y: 50 },
          },
          {
            id: 'remote-server-1',
            data: { status: 'warning', type: 'remote' },
            style: { x: 350, y: 50 },
          },
        ],
        edges: [{ source: 'local-server-1', target: 'remote-server-1' }],
      },
      node: {
        type: 'react',
        style: {
          size: [240, 100],
          component: (data) => <Node data={data} />,
        },
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>;
};

const root = createRoot(document.getElementById('container'));
root.render(<ReactNodeDemo />);
