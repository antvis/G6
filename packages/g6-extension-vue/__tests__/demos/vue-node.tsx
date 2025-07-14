import { DatabaseFilled } from '@ant-design/icons-vue';
import type { Graph as G6Graph, GraphOptions, NodeData } from '@antv/g6';
import { ExtensionCategory, register } from '@antv/g6';
import { VueNode as VueNodeExtension } from '@antv/g6-extension-vue';
import { Badge, Button, Flex, Form, Input, Layout, Select, Table, Tag, Typography } from 'ant-design-vue';
import { defineComponent, onMounted, reactive, ref } from 'vue-demi';
import { Graph } from '../graph';

type Datum = {
  name: string;
  status: 'success' | 'error' | 'warning';
  type: 'local' | 'remote';
  url: string;
};
const isValidUrl = (url: string) => {
  return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
    url,
  );
};

const { Content, Footer } = Layout;
const Node = defineComponent({
  props: {
    data: {
      type: Object as () => Datum,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { Text } = Typography;
    const { status, type } = props.data as Datum;

    const onChange = (event: any) => {
      const url = event.target.value;
      emit('change', url);
    };
    return () => {
      return (
        <Flex
          style={{ width: '100%', height: '100%', background: '#fff', padding: '10px', borderRadius: '5px' }}
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
          <Text type="secondary">{props.data?.id}</Text>
          <Flex align="center">
            <span style="flex-shrink: 0">
              <Text>
                <Text type="danger">*</Text>URL:
              </Text>
            </span>
            <Input
              style={{ borderRadius: 0, borderBottom: '1px solid #d9d9d9' }}
              bordered={false}
              value={(props.data as Datum)?.url as string}
              onChange={onChange}
            />
          </Flex>
        </Flex>
      );
    };
  },
});
export const VueNode = defineComponent({
  name: 'VueNode',
  setup() {
    const graphRef = ref<G6Graph | null>(null);

    const modelRef = reactive({ serverType: 'local' });

    const options = ref<GraphOptions>({
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
        type: 'vue',
        style: {
          size: [240, 100],
          component: (data: NodeData) => {
            return (
              <Node
                data={data.data}
                onChange={(url) => {
                  const getOption = (prev) => {
                    if (!graphRef.value || graphRef.value.destroyed) return prev;
                    const nodes = graphRef.value.getNodeData();
                    const index = nodes.findIndex((node) => node.id === data.id);
                    const node = nodes[index];
                    const datum = {
                      ...node.data,
                      url,
                      status: url === '' ? 'warning' : isValidUrl(url) ? 'success' : 'error',
                    } as Datum;
                    nodes[index] = { ...node, data: datum };
                    return { ...prev, data: { ...prev.data, nodes } };
                  };
                  setOptions(getOption(options.value));
                }}
              />
            );
          },
        },
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
    });

    const onAddNode = async () => {
      if (!graphRef.value || graphRef.value.destroyed) return;
      const type = modelRef.serverType;
      const status = 'warning';
      const length = (options.value.data?.nodes || []).filter((node) => node?.data?.type === type).length;
      const getOptions = (options) => ({
        ...options,
        data: {
          ...options.data,
          nodes: [
            ...graphRef.value!.getNodeData(),
            {
              id: `${type}-server-${length + 1}`,
              data: { type, status },
              style: { x: type === 'local' ? 50 : 350, y: 50 + length * 120 },
            },
          ],
        },
      });
      setOptions(getOptions(options.value));
    };

    const onUpdateNode = () => {
      const { data } = options.value;
      const nodes = data?.nodes || [];
      const getOption = (options) => ({
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
      });
      setOptions(getOption(options.value));

      graphRef.value?.draw();
    };

    const onRemoveNode = () => {
      const { data } = options.value;
      const nodes = data?.nodes || [];
      const getOption = (options) => ({
        ...options,
        data: {
          ...options.data,
          nodes: nodes.filter((node, index) => index !== nodes.length - 1),
        },
      });
      setOptions(getOption(options.value));
    };

    function setOptions(option: GraphOptions) {
      options.value = option;
    }
    onMounted(() => {
      register(ExtensionCategory.NODE, 'vue', VueNodeExtension);
    });
    return () => {
      return (
        <Layout style={{ width: '800px', height: '400px' }}>
          <Content style={{ minHeight: '400px' }}>
            <Graph options={options.value} onRender={(graph) => (graphRef.value = graph)} key="vue-node" />
          </Content>
          <Footer>
            <Form>
              <Form.Item label="Server Type" name="serverType">
                <Select
                  value={modelRef.serverType}
                  onChange={(e) => (modelRef.serverType = e as string)}
                  options={[
                    { label: 'Local', value: 'local' },
                    { label: 'Remote', value: 'remote' },
                  ]}
                />
              </Form.Item>
              <Form.Item>
                <Button.Group>
                  <Button style={{ width: '100%' }} type="primary" onClick={() => onAddNode()}>
                    Add Node
                  </Button>
                  <Button onClick={() => onUpdateNode()}>Update Node</Button>
                  <Button danger onClick={() => onRemoveNode()}>
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
              dataSource={(options.value.data?.nodes || []).map((node) => ({
                key: node.id,
                server: node.id,
                url: (node?.data as Datum).url || 'Not Configured',
              }))}
            ></Table>
          </Footer>
        </Layout>
      );
    };
  },
});
