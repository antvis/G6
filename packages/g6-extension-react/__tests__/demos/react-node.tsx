import { DatabaseFilled } from '@ant-design/icons';
import type { Graph as G6Graph, GraphOptions, NodeData } from '@antv/g6';
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Badge, Button, Flex, Form, Input, Layout, Select, Table, Tag, Typography } from 'antd';
import { useRef, useState } from 'react';
import { Graph } from '../graph';

const { Content, Footer } = Layout;
const { Text } = Typography;

register(ExtensionCategory.NODE, 'react', ReactNode);

type Datum = {
  name: string;
  status: 'success' | 'error' | 'warning';
  type: 'local' | 'remote';
  url: string;
};

const Node = ({ data, onChange }: { data: NodeData; onChange?: (value: string) => void }) => {
  const { status, type } = data.data as Datum;

  return (
    <Flex style={{ width: '100%', height: '100%', background: '#fff', padding: 10, borderRadius: 5 }} vertical>
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
          value={data.data?.url as string}
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
  const graphRef = useRef<G6Graph | null>(null);

  const [form] = Form.useForm();
  const isValidUrl = (url: string) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
      url,
    );
  };

  const [options, setOptions] = useState<GraphOptions>({
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
        component: (data: NodeData) => (
          <Node
            data={data}
            onChange={(url) => {
              setOptions((prev) => {
                if (!graphRef.current || graphRef.current.destroyed) return prev;
                const nodes = graphRef.current.getNodeData();
                const index = nodes.findIndex((node) => node.id === data.id);
                const node = nodes[index];
                const datum = {
                  ...node.data,
                  url,
                  status: url === '' ? 'warning' : isValidUrl(url) ? 'success' : 'error',
                } as Datum;
                nodes[index] = { ...node, data: datum };
                return { ...prev, data: { ...prev.data, nodes } };
              });
            }}
          />
        ),
      },
    },
    behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
  });

  return (
    <Layout style={{ width: 800, height: 400 }}>
      <Content style={{ minHeight: 400 }}>
        <Graph options={options} onRender={(graph) => (graphRef.current = graph)} />
      </Content>
      <Footer>
        <Form form={form} initialValues={{ serverType: 'local' }}>
          <Form.Item label="Server Type" name="serverType">
            <Select
              options={[
                { label: 'Local', value: 'local' },
                { label: 'Remote', value: 'remote' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button.Group>
              <Button
                style={{ width: '100%' }}
                type="primary"
                onClick={() => {
                  if (!graphRef.current || graphRef.current.destroyed) return;
                  const type = form.getFieldValue('serverType');
                  const status = 'warning';
                  const length = (options.data?.nodes || []).filter((node) => node?.data?.type === type).length;
                  setOptions((options) => ({
                    ...options,
                    data: {
                      ...options.data,
                      nodes: [
                        ...graphRef.current!.getNodeData(),
                        {
                          id: `${type}-server-${length + 1}`,
                          data: { type, status },
                          style: { x: type === 'local' ? 50 : 350, y: 50 + length * 120 },
                        },
                      ],
                    },
                  }));
                }}
              >
                Add Node
              </Button>
              <Button
                onClick={() => {
                  const { data } = options;
                  const nodes = data?.nodes || [];
                  setOptions((options) => ({
                    ...options,
                    data: {
                      ...options.data,
                      nodes: nodes.map((node, index) => {
                        // return node;
                        if (index === nodes.length - 1) {
                          return {
                            ...node,
                            data: {
                              ...node.data,
                              status: node.data!.status === 'success' ? 'warning' : 'success',
                            },
                          };
                        }
                        return node;
                      }),
                    },
                  }));

                  graphRef.current?.draw();
                }}
              >
                Update Node
              </Button>
              <Button
                danger
                onClick={() => {
                  const { data } = options;
                  const nodes = data?.nodes || [];
                  setOptions((options) => ({
                    ...options,
                    data: {
                      ...options.data,
                      nodes: nodes.filter((node, index) => index !== nodes.length - 1),
                    },
                  }));
                }}
              >
                Remove Node
              </Button>
            </Button.Group>
          </Form.Item>
        </Form>

        <Table
          columns={[
            { title: 'Server', key: 'server', dataIndex: 'server' },
            { title: 'URL', key: 'url', dataIndex: 'url' },
          ]}
          dataSource={(options.data?.nodes || []).map((node) => ({
            key: node.id,
            server: node.id,
            url: (node?.data as Datum).url || 'Not Configured',
          }))}
        ></Table>
      </Footer>
    </Layout>
  );
};
