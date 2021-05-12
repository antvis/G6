import G6 from '@antv/g6';
// import by this way in your project. 在您的项目中请这样引入
// import { GraphLayoutPredict } from '@antv/vis-predict-engine';

const { GraphLayoutPredict } = window.GraphLayoutPredict

const data = {
  nodes: [
    {
      id: 'node-0',
      label: '0',
    },
    {
      id: 'node-1',
      label: '1',
    },
    {
      id: 'node-2',
      label: '2',
    },
    {
      id: 'node-3',
      label: '3',
    },
    {
      id: 'node-4',
      label: '4',
    },
    {
      id: 'node-5',
      label: '5',
    },
    {
      id: 'node-6',
      label: '6',
    },
    {
      id: 'node-7',
      label: '7',
    },
    {
      id: 'node-8',
      label: '8',
    },
    {
      id: 'node-9',
      label: '9',
    },
  ],
  edges: [
    {
      id: 'edge-0',
      source: 'node-0',
      target: 'node-1',
    },
    {
      id: 'edge-1',
      source: 'node-0',
      target: 'node-2',
    },
    {
      id: 'edge-2',
      source: 'node-0',
      target: 'node-3',
    },
    {
      id: 'edge-4',
      source: 'node-0',
      target: 'node-4',
    },
    {
      id: 'edge-5',
      source: 'node-0',
      target: 'node-5',
    },
    {
      id: 'edge-6',
      source: 'node-1',
      target: 'node-6',
    },
    {
      id: 'edge-7',
      source: 'node-6',
      target: 'node-7',
    },
    {
      id: 'edge-8',
      source: 'node-5',
      target: 'node-7',
    },
    {
      id: 'edge-9',
      source: 'node-1',
      target: 'node-4',
    },
    {
      id: 'edge-10',
      source: 'node-4',
      target: 'node-5',
    },
    {
      id: 'edge-11',
      source: 'node-3',
      target: 'node-7',
    },
    {
      id: 'edge-12',
      source: 'node-2',
      target: 'node-5',
    },
    {
      id: 'edge-13',
      source: 'node-2',
      target: 'node-1',
    },
  ],
};


async function layoutPredict() {
  return await GraphLayoutPredict.predict(data);
}

(async function () {
  // predictLayout 表示预测的布局
  // confidence 表示预测的可信度
  const { predictLayout, confidence } = await layoutPredict();
  console.log("----predictLayout---", predictLayout);
  console.log("----confidence---", confidence);
  const container = document.getElementById("container");
  const graph = new G6.Graph({
    container,
    width: container.scrollWidth,
    height: container.scrollHeight || 500,
    layout: {
      type: predictLayout,
      nodeSize: 50,
      preventOverlap: true
    },
    modes: {
      default: ["drag-canvas", "zoom-canvas", "drag-node"]
    }
  });

  graph.data(data);
  graph.render();
  graph.on("afterlayout", () => {
    graph.fitView();
  });

  if (typeof window !== "undefined") {
    window.onresize = () => {
      if (!graph || graph.get("destroyed")) return;
      if (!container || !container.scrollWidth || !container.scrollHeight)
        return;
      graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
  }
})();
