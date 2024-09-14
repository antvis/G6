import type { Graph as G6Graph, NodeData } from '@antv/g6';
import { ExtensionCategory, register } from '@antv/g6';
import { GNode, Group, Image, Rect, Text } from '@antv/g6-extension-react';
import { Graph } from '../graph';

register(ExtensionCategory.NODE, 'g', GNode);

type Datum = {
  name: string;
  type: 'module' | 'process';
  status: 'success' | 'error';
  success: number;
  time: number;
  failure: number;
};

const Node = ({ graph, data, size }: { graph: G6Graph; data: NodeData; size: [number, number] }) => {
  const [width, height] = size;
  const { lineWidth = 1 } = graph.getElementRenderStyle(data.id);

  const { name, type, status, success, time, failure } = data.data as Datum;
  const color = status === 'success' ? '#30BF78' : '#F4664A';
  const radius = 4;

  const titleMap = {
    success: 'Success',
    time: 'Time',
    failure: 'Failure',
  };

  const format = (cat: string, value: number) => {
    if (cat === 'success') return `${value}%`;
    if (cat === 'time') return `${value}min`;
    return value.toString();
  };

  const highlight = (cat: string, value: number) => {
    if (cat === 'success') {
      if (value >= 90) return 'green';
      if (value < 60) return 'red';
      return 'gray';
    }
    if (cat === 'time') {
      if (value <= 10) return 'green';
      if (value >= 30) return 'red';
      return 'gray';
    }
    if (value >= 20) return 'red';
    if (value >= 5) return 'orange';
    return 'gray';
  };

  return (
    <Group>
      <Rect
        width={width}
        height={height}
        stroke={color}
        fill={'white'}
        radius={radius}
        lineWidth={lineWidth ? lineWidth : 1}
      >
        <Rect width={width} height={20} fill={color} radius={[radius, radius, 0, 0]}>
          <Image
            src={
              type === 'module'
                ? 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*0HC-SawWYUoAAAAAAAAAAABkARQnAQ'
                : 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*sxK0RJ1UhNkAAAAAAAAAAABkARQnAQ'
            }
            x={2}
            y={2}
            width={16}
            height={16}
          />
          <Text text={name} textBaseline="top" fill="#fff" fontSize={14} dx={20} dy={2} />
        </Rect>
        <Group transform="translate(5,40)">
          {Object.entries({ success, time, failure }).map(([key, value], index) => (
            <Group key={index} transform={`translate(${(index * width) / 3}, 0)`}>
              <Text text={titleMap[key as keyof typeof titleMap]} fontSize={12} fill="gray" />
              <Text text={format(key, value)} fontSize={12} dy={16} fill={highlight(key, value)} />
            </Group>
          ))}
        </Group>
      </Rect>
    </Group>
  );
};

export const GNodeDemo = () => {
  return (
    <Graph
      options={{
        data: {
          nodes: [
            {
              id: 'node-1',
              data: { name: 'Module', type: 'module', status: 'success', success: 90, time: 58, failure: 8 },
              style: { x: 100, y: 100 },
            },
            {
              id: 'node-2',
              data: { name: 'Process', type: 'process', status: 'error', success: 11, time: 12, failure: 26 },
              style: { x: 300, y: 100 },
            },
          ],
          edges: [{ source: 'node-1', target: 'node-2' }],
        },
        node: {
          type: 'g',
          style: {
            size: [180, 60],
            component: function (this: G6Graph, data: NodeData) {
              return <Node graph={this} data={data} size={[180, 60]} />;
            },
          },
        },
        behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas', 'click-select'],
      }}
    />
  );
};
