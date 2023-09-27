import { Graph } from '../../../src/index';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: '1', data: {} },
        { id: '2', data: {} },
        { id: '3', data: {} },
      ],
      edges: [
        { id: 'edge1', source: '1', target: '2', data: {} },
        { id: 'edge2', source: '1', target: '3', data: {} },
        { id: 'edge4', source: '2', target: '3', data: {} },
      ],
    },
    layout: {
      type: 'grid',
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
  });

  const { container } = context;
  const jsonNodeMapperBtn = document.createElement('button');
  container.parentNode?.appendChild(jsonNodeMapperBtn);
  jsonNodeMapperBtn.innerHTML = '更改节点JSON映射';
  jsonNodeMapperBtn.id = 'change-node-json-mapper';
  jsonNodeMapperBtn.style.zIndex = 10;
  jsonNodeMapperBtn.addEventListener('click', (e) => {
    graph.updateMapper('node', {
      labelShape: {
        text: 'xxx',
        fontWeight: 800,
        fill: '#f00',
      },
    });
  });

  const funcNodeMapperBtn = document.createElement('button');
  container.parentNode?.appendChild(funcNodeMapperBtn);
  funcNodeMapperBtn.innerHTML = '更改节点函数映射';
  funcNodeMapperBtn.id = 'change-node-func-mapper';
  funcNodeMapperBtn.style.zIndex = 10;
  funcNodeMapperBtn.addEventListener('click', (e) => {
    graph.updateMapper('node', (model) => ({
      id: model.id,
      data: {
        labelShape: {
          text: `new-${model.id}`,
          fontWeight: 800,
          fill: '#0f0',
        },
      },
    }));
  });

  const jsonEdgeMapperBtn = document.createElement('button');
  container.parentNode?.appendChild(jsonEdgeMapperBtn);
  jsonEdgeMapperBtn.innerHTML = '更改边JSON映射';
  jsonEdgeMapperBtn.id = 'change-edge-json-mapper';
  jsonEdgeMapperBtn.style.zIndex = 10;
  jsonEdgeMapperBtn.addEventListener('click', (e) => {
    graph.updateMapper('edge', {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
        fontWeight: 800,
        fill: '#f00',
      },
    });
  });

  const funcEdgeMapperBtn = document.createElement('button');
  container.parentNode?.appendChild(funcEdgeMapperBtn);
  funcEdgeMapperBtn.innerHTML = '更改边函数映射';
  funcEdgeMapperBtn.id = 'change-edge-func-mapper';
  funcEdgeMapperBtn.style.zIndex = 10;
  funcEdgeMapperBtn.addEventListener('click', (e) => {
    graph.updateMapper('edge', (model) => ({
      id: model.id,
      data: {
        labelShape: {
          text: `new-${model.id}`,
          fontWeight: 800,
          fill: '#0f0',
        },
      },
    }));
  });

  return graph;
};
