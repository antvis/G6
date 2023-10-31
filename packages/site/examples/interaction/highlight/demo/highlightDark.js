import { Graph, extend, Extensions } from '@antv/g6';

insertCss(`
  .g6-component-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  plugins: {
    tooltip: Extensions.Tooltip,
  },
  behaviors: {
    'activate-relations': Extensions.ActivateRelations,
  },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    console.log('data', data);
    const graph = new ExtGraph({
      container: 'container',
      width,
      height,
      autoFit: 'view',
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 32,
        workerEnabled: true,
      },
      plugins: [
        {
          key: 'tooltip1',
          type: 'tooltip',
          trigger: 'pointerenter',
          getContent: (e) => {
            let innerHTML;
            const getNodeNameById = (id) => data.nodes.find((node) => node.id === id).name;
            if (e.itemType === 'node') {
              innerHTML = getNodeNameById(e.itemId);
            } else {
              const { source, target } = data.edges.find((edge) => edge.id === e.itemId);
              innerHTML = `来源：${getNodeNameById(source)}<br/>去向：${getNodeNameById(target)}`;
            }
            return `
        <div class='g6-component-tooltip'>
          ${innerHTML}
        </div>
            `;
          },
        },
      ],
      modes: {
        default: ['drag-canvas'],
      },
      data,
      node: {
        keyShape: {
          r: 10,
          opacity: 1,
        },
        animates: {
          update: [
            {
              fields: ['opacity'],
              shapeId: 'keyShape',
              states: ['dark'],
              duration: 300,
            },
          ],
        },
      },
      nodeState: {
        highlight: {
          keyShape: {
            opacity: 1,
            fill: '#0f0',
          },
        },
        dark: {
          keyShape: {
            opacity: 0.2,
          },
        },
      },
      edge: {
        keyShape: {
          stroke: '#aaa',
          lineAppendWidth: 2,
          opacity: 0.5,
        },
      },
      edgeState: {
        highlight: {
          keyShape: {
            stroke: '#999',
          },
        },
        dark: {
          keyshape: {
            stroke: '#aaa',
            opacity: 0.3,
          },
        },
      },
    });

    graph.on('node:pointerenter', function (e) {
      const { itemId } = e;
      const allNodesId = graph.getAllNodesData().map((node) => node.id);
      const highlightIds = [itemId];
      graph.clearItemState(allNodesId);
      graph.setItemState(itemId, 'dark', false);
      graph.setItemState(itemId, 'highlight', true);
      graph.getAllEdgesData().forEach(function (edge) {
        const sourceId = edge.source;
        const targetId = edge.target;
        if (sourceId === itemId) {
          graph.setItemState(targetId, 'dark', false);
          graph.setItemState(targetId, 'highlight', true);
          graph.setItemState(edge.id, 'highlight', true);
          highlightIds.push(edge.id);
          highlightIds.push(targetId);
        } else if (targetId === itemId) {
          graph.setItemState(sourceId, 'dark', false);
          graph.setItemState(sourceId, 'highlight', true);
          graph.setItemState(edge.id, 'highlight', true);
          highlightIds.push(edge.id);
          highlightIds.push(sourceId);
        } else {
          graph.setItemState(edge.id, 'highlight', false);
        }
      });
      graph.setItemState(
        allNodesId.filter((id) => !highlightIds.includes(id)),
        'dark',
        true,
      );
    });

    graph.on('node:pointerleave', function (e) {
      const allNodesIds = graph.getAllNodesData().map((node) => node.id);
      const allEdgesIds = graph.getAllEdgesData().map((edge) => edge.id);
      graph.clearItemState([...allNodesIds, ...allEdgesIds]);
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });
