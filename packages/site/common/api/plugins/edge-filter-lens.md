```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        // 上部疏散区域
        { id: 'Myriel', style: { x: 207, y: 78, label: 'Myriel' } },
        { id: 'Napoleon', style: { x: 127, y: 62, label: 'Napoleon' } },
        { id: 'CountessdeLo', style: { x: 171, y: 47, label: 'CountessdeLo' } },
        { id: 'Geborand', style: { x: 106, y: 81, label: 'Geborand' } },
        { id: 'Champtercier', style: { x: 247, y: 58, label: 'Champtercier' } },
        { id: 'Cravatte', style: { x: 152, y: 50, label: 'Cravatte' } },

        // 中上部区域
        { id: 'Mlle.Baptistine', style: { x: 205, y: 141, label: 'Mlle.Baptistine' } },
        { id: 'Mme.Magloire', style: { x: 275, y: 120, label: 'Mme.Magloire' } },
        { id: 'Labarre', style: { x: 246, y: 183, label: 'Labarre' } },
        { id: 'Valjean', style: { x: 342, y: 221, label: 'Valjean' } },
        { id: 'Marguerite', style: { x: 285, y: 171, label: 'Marguerite' } },

        // 中部密集区域
        { id: 'Tholomyes', style: { x: 379, y: 158, label: 'Tholomyes' } },
        { id: 'Listolier', style: { x: 288, y: 80, label: 'Listolier' } },
        { id: 'Fameuil', style: { x: 349, y: 89, label: 'Fameuil' } },
        { id: 'Blacheville', style: { x: 381, y: 95, label: 'Blacheville' } },
        { id: 'Favourite', style: { x: 264, y: 153, label: 'Favourite' } },
        { id: 'Dahlia', style: { x: 323, y: 170, label: 'Dahlia' } },
        { id: 'Zephine', style: { x: 306, y: 114, label: 'Zephine' } },
        { id: 'Fantine', style: { x: 357, y: 187, label: 'Fantine' } },

        // 右侧区域
        { id: 'Bamatabois', style: { x: 411, y: 156, label: 'Bamatabois' } },
        { id: 'Perpetue', style: { x: 454, y: 195, label: 'Perpetue' } },
        { id: 'Simplice', style: { x: 406, y: 227, label: 'Simplice' } },

        // 下部区域
        { id: 'Cosette', style: { x: 343, y: 248, label: 'Cosette' } },
        { id: 'Javert', style: { x: 388, y: 263, label: 'Javert' } },
        { id: 'Fauchelevent', style: { x: 397, y: 276, label: 'Fauchelevent' } },
        { id: 'Thenardier', style: { x: 317, y: 300, label: 'Thenardier' } },
        { id: 'Eponine', style: { x: 268, y: 365, label: 'Eponine' } },
        { id: 'Anzelma', style: { x: 234, y: 303, label: 'Anzelma' } },
        { id: 'Woman2', style: { x: 304, y: 254, label: 'Woman2' } },

        // 最右侧独立节点
        { id: 'Gribier', style: { x: 457, y: 160, label: 'Gribier' } },
        { id: 'Jondrette', style: { x: 510, y: 327, label: 'Jondrette' } },
      ],
      edges: [
        // 上部连接
        { id: 'e1', source: 'Myriel', target: 'CountessdeLo' },
        { id: 'e2', source: 'Napoleon', target: 'Myriel' },
        { id: 'e3', source: 'Geborand', target: 'Napoleon' },
        { id: 'e4', source: 'Champtercier', target: 'Myriel' },
        { id: 'e5', source: 'Cravatte', target: 'CountessdeLo' },

        // 中上部连接
        { id: 'e6', source: 'Mlle.Baptistine', target: 'Mme.Magloire' },
        { id: 'e7', source: 'Labarre', target: 'Valjean' },
        { id: 'e8', source: 'Valjean', target: 'Marguerite' },
        { id: 'e9', source: 'Marguerite', target: 'Mme.Magloire' },

        // 中部密集连接
        { id: 'e10', source: 'Tholomyes', target: 'Listolier' },
        { id: 'e11', source: 'Listolier', target: 'Fameuil' },
        { id: 'e12', source: 'Fameuil', target: 'Blacheville' },
        { id: 'e13', source: 'Blacheville', target: 'Favourite' },
        { id: 'e14', source: 'Favourite', target: 'Dahlia' },
        { id: 'e15', source: 'Dahlia', target: 'Zephine' },
        { id: 'e16', source: 'Zephine', target: 'Fantine' },
        { id: 'e17', source: 'Tholomyes', target: 'Fantine' },
        { id: 'e18', source: 'Valjean', target: 'Fantine' },

        // 右侧连接
        { id: 'e19', source: 'Bamatabois', target: 'Perpetue' },
        { id: 'e20', source: 'Perpetue', target: 'Simplice' },
        { id: 'e21', source: 'Bamatabois', target: 'Gribier' },

        // 下部连接
        { id: 'e22', source: 'Valjean', target: 'Cosette' },
        { id: 'e23', source: 'Cosette', target: 'Javert' },
        { id: 'e24', source: 'Javert', target: 'Fauchelevent' },
        { id: 'e25', source: 'Fauchelevent', target: 'Thenardier' },
        { id: 'e26', source: 'Thenardier', target: 'Eponine' },
        { id: 'e27', source: 'Eponine', target: 'Anzelma' },
        { id: 'e28', source: 'Woman2', target: 'Cosette' },

        // 跨区域连接
        { id: 'e29', source: 'Fantine', target: 'Bamatabois' },
        { id: 'e30', source: 'Javert', target: 'Bamatabois' },
        { id: 'e31', source: 'Simplice', target: 'Jondrette' },
        { id: 'e32', source: 'Thenardier', target: 'Jondrette' },
        { id: 'e33', source: 'Favourite', target: 'Valjean' },
        { id: 'e34', source: 'Tholomyes', target: 'Cosette' },
      ],
    },
    node: {
      style: {
        label: true,
        size: 16,
      },
      palette: {
        field: (datum) => Math.floor(datum.style?.y / 60),
      },
    },
    edge: {
      style: {
        label: true,
        labelText: (d) => d.data.value?.toString(),
        stroke: '#ccc',
        endArrow: true,
        endArrowType: 'triangle',
      },
    },
    plugins: [
      {
        type: 'edge-filter-lens',
        key: 'edge-filter-lens',
        r: 80,
        trigger: 'pointermove',
      },
    ],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const TRIGGER_TYPES = ['pointermove', 'click', 'drag'];
    const NODE_TYPES = ['both', 'source', 'target', 'either'];

    const options = {
      type: 'edge-filter-lens',
      r: 80, // 透镜半径
      trigger: 'pointermove', // 触发方式
      nodeType: 'both', // 边显示条件
      minR: 50, // 最小半径
      maxR: 150, // 最大半径
      scaleRBy: 'wheel', // 缩放方式
      style: {
        fill: '#f0f5ff',
        fillOpacity: 0.4,
        stroke: '#1d39c4',
        strokeOpacity: 0.8,
        lineWidth: 1.5,
      },
      nodeStyle: {
        size: 35,
        fill: '#d6e4ff',
        stroke: '#2f54eb',
        lineWidth: 2,
        labelFontSize: 14,
        labelFontWeight: 'bold',
        labelFill: '#1d39c4',
      },
      edgeStyle: {
        stroke: '#1d39c4',
        lineWidth: 2,
        strokeOpacity: 0.8,
      },
    };

    const optionFolder = gui.addFolder('Edge Filter Lens Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'r', 50, 150, 5);
    optionFolder.add(options, 'trigger', TRIGGER_TYPES);
    optionFolder.add(options, 'nodeType', NODE_TYPES);
    optionFolder.add(options, 'minR', 20, 100, 5);
    optionFolder.add(options, 'maxR', 100, 200, 5);

    optionFolder.onChange(({ property, value }) => {
      if (property.includes('.')) {
        const [group, prop] = property.split('.');
        graph.updatePlugin({
          key: 'edge-filter-lens',
          [group]: {
            ...options[group],
            [prop]: value,
          },
        });
      } else {
        graph.updatePlugin({
          key: 'edge-filter-lens',
          [property]: value,
        });
      }
      graph.render();
    });
  },
);
```
