## Complex React Node

```jsx
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { List, Form, Checkbox, Button, Input, Table } from 'antd';
import { createReactNode } from '@antv/g6-react-node';
import { Graph, extend } from '@antv/g6';
import { useEffect, useRef } from 'react';
import type { ReactNodeProps } from '@antv/g6-react-node';

const ComplexNode: React.FC<ReactNodeProps> = ({ model }) => {
  const { nodeType } = model.data;

  let content = null;

  if (nodeType === 'form') {
    content = (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  } else if (nodeType === 'table') {
    content = (
      <Table
        dataSource={[{ key: '1', name: 'Table Item' }]}
        columns={[{ title: 'Title', dataIndex: 'name', key: 'name' }]}
      />
    );
  } else {
    content = (
      <List
        size="small"
        header={<div>List</div>}
        bordered
        dataSource={['List Item']}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    );
  }

  return (
    <div
      style={{
        padding: 10,
        backgroundColor: 'white',
        boxShadow:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {content}
    </div>
  );
};

export default () => {
  const ref = useRef();
  const graphRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    const reactNode = createReactNode(ComplexNode);

    const ExtendGraph = extend(Graph, {
      nodes: {
        'react-node': reactNode,
      },
    });

    graphRef.current = new ExtendGraph({
      container,
      width,
      height,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableTransient: false,
          },
        ],
      },
      data: {
        nodes: [
          { id: 'node0', data: { size: [200, 100], nodeType: 'list' } },
          { id: 'node1', data: { size: [280, 100], nodeType: 'form' } },
          { id: 'node2', data: { size: [200, 100], nodeType: 'table' } },
        ],
        edges: [
          { id: 'edge1', source: 'node0', target: 'node1', data: {} },
          { id: 'edge2', source: 'node0', target: 'node2', data: {} },
        ],
      },
      node: {
        type: 'react-node',
      },
    });

    return () => {
      graphRef.current.destroy();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: 500 }}>
      <div ref={ref}></div>
    </div>
  );
};
```
