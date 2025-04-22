```js | ob { pin: false }
(async () => {
  const { Graph, BaseTransform, register, ExtensionCategory } = window.g6;

  // 目前circular布局没有暴露方法可以获取布局中心，这里简单处理先固定一个
  const circularCenter = [300, 300];

  // 下面的函数 G6 没有暴露出来，先自行声明
  function subtract(a, b) {
    return a.map((v, i) => v - b[i]);
  }
  function rad(a) {
    const [x, y] = a;
    if (!x && !y) return 0;
    return Math.atan2(y, x);
  }
  function rad2deg(rad) {
    return rad * (180 / Math.PI);
  }

  class CircularRadialLabels extends BaseTransform {
    static defaultOptions = {
      offset: 5,
    };
    constructor(context, options) {
      super(context, Object.assign({}, CircularRadialLabels.defaultOptions, options));
    }
    get center() {
      return circularCenter;
    }
    afterLayout() {
      const { graph, model } = this.context;
      const data = model.getData();
      data.nodes?.forEach((datum) => {
        const radian = rad(subtract([datum.style.x, datum.style.y], this.center));
        const isLeft = Math.abs(radian) > Math.PI / 2;
        const isLeaf = !datum.children || datum.children.length === 0;
        const nodeId = datum.id;
        const node = this.context.element?.getElement(nodeId);
        if (!node || !node.isVisible()) return;

        const nodeHalfWidth = graph.getElementRenderStyle(nodeId).size / 2;
        const offset = (isLeaf ? 1 : -1) * (nodeHalfWidth + this.options.offset);

        const labelTransform = [
          ['translate', offset * Math.cos(radian), offset * Math.sin(radian)],
          ['rotate', isLeft ? rad2deg(radian) + 180 : rad2deg(radian)],
        ];

        model.updateNodeData([
          {
            id: datum.id,
            style: {
              labelTextAlign: isLeft === isLeaf ? 'right' : 'left',
              labelTextBaseline: 'middle',
              labelTransform,
            },
          },
        ]);
      });

      graph.draw();
    }
  }

  register(ExtensionCategory.TRANSFORM, 'circular-radial-labels', CircularRadialLabels);

  const data = {
    nodes: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }],
    edges: [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '3', target: '4' },
      { source: '4', target: '5' },
      { source: '5', target: '6' },
      { source: '6', target: '1' },
    ],
  };

  const container = window.createContainer({ width: 600, height: 400 });

  const graph = new Graph({
    container,
    autoFit: 'center',
    data,
    node: {
      style: {
        labelText: (d) => 'label' + d.id,
        size: 30,
      },
    },
    layout: {
      type: 'circular',
      width: 200,
      center: circularCenter,
      preLayout: false, // 不能是渲染前布局，否则不生效
    },
    transforms: ['circular-radial-labels'],
  });

  graph.render();

  return container;
})();
```
