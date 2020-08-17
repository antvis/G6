import G6 from '@antv/g6';

/**
 * 该案例演示以下功能：
 * 1、使用G6如何自定义列表节点；
 * 2、列表节点中如何包括详情信息；
 * 3、点击节点，可展开详情列表信息。
 *
 */
G6.registerNode('expandNode', {
  draw: function draw(cfg, group) {
    const mainGroup = group.addGroup({
      id: 'main-group',
    });
    const keyShape = mainGroup.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 100 + 60 * cfg.values.length,
        height: 50,
        fill: '#C6E5FF',
      },
      name: 'key-rect-shape',
    });

    // name text
    mainGroup.addShape('text', {
      attrs: {
        text: cfg.name,
        fill: '#000',
        width: 130,
        x: 10,
        y: 32,
      },
      name: 'name-text-shape',
    });

    const subGroup = group.addGroup({
      id: 'sub-group',
    });
    cfg.values.forEach(function (data, index) {
      subGroup.addShape('rect', {
        attrs: {
          x: 110 + index * 60,
          y: 0,
          width: 50,
          height: 50,
        },
        name: 'rect-shape',
      });

      subGroup.addShape('text', {
        attrs: {
          text: data.key,
          fill: '#000',
          x: 130 + index * 60,
          y: 20,
          fontSize: 10,
          textBaseline: 'middle',
          className: 'sub-group-text',
        },
        name: 'sub-text-shape1',
      });

      subGroup.addShape('text', {
        attrs: {
          text: data.value,
          fill: '#000',
          x: 130 + index * 60,
          y: 30,
          fontSize: 10,
          textBaseline: 'middle',
          textAlign: 'left',
          className: 'sub-group-text',
        },
        name: 'name-text-shape2',
      });
    });

    const listGroup = group.addGroup({
      id: 'detail-list-group',
    });

    listGroup.addShape('rect', {
      attrs: {
        width: 100 + 60 * cfg.values.length - 70,
        height: 30 * cfg.properties.length + 20,
        fill: '#fff',
        x: 70,
        y: 30,
      },
      name: 'list-rect-shape1',
    });

    const rectWidth = 100 + 60 * cfg.values.length - 80;
    cfg.properties.forEach(function (property, index) {
      listGroup.addShape('rect', {
        attrs: {
          width: rectWidth,
          height: 30,
          fill: '#9EC9FF',
          x: 80,
          y: 40 * index + 40,
        },
        name: 'list-rect-shape2',
      });
      let count = 0;
      for (const p in property) {
        // 每个rect中添加5个文本
        listGroup.addShape('text', {
          attrs: {
            text: property[p],
            fill: '#000',
            x: 85 + count * (rectWidth / cfg.values.length) - count * 10,
            y: 40 * index + 40 + 15,
            fontSize: 10,
            textBaseline: 'middle',
            textAlign: 'left',
          },
          name: 'text-shape',
        });
        count++;
      }
    });
    listGroup.hide();
    return keyShape;
  },
});

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas'],
  },
  fitView: true,
});

const data = {
  nodes: [
    {
      id: 'shape2',
      x: 0,
      y: 0,
      type: 'expandNode',
      name: '网站引流',
      values: [
        {
          key: '曝光率',
          value: '19.09',
        },
        {
          key: '流入UV',
          value: '910',
        },
        {
          key: '点击率',
          value: '90',
        },
        {
          key: '占比',
          value: '90',
        },
      ],
      properties: [
        {
          name: '搜索',
          value1: '102',
          value2: '102',
          value3: '102',
          value4: '102',
        },
        {
          name: '扫一扫',
          value1: '102',
          value2: '102',
          value3: '102',
          value4: '102',
        },
      ],
    },
  ],
};
graph.data(data);
graph.render();

// 点击node，展开详情
graph.on('node:click', function (evt) {
  const target = evt.target;

  const parentGroup = target.get('parent').get('parent');
  const detailGroup = parentGroup.findById('detail-list-group');
  // 将sub-group中的内容网上移动一段距离
  const subGroup = parentGroup.findById('sub-group');
  const keyTexts = subGroup.findAll(function (item) {
    return item.attr('className') === 'sub-group-text';
  });
  const isVisible = detailGroup.get('visible');
  if (isVisible) {
    detailGroup.hide();
    keyTexts.forEach(function (text) {
      const top = text.attr('y');
      text.attr('y', top + 10);
    });
  } else {
    keyTexts.forEach(function (text) {
      const top = text.attr('y');
      text.attr('y', top - 10);
    });
    detailGroup.show();
  }
  graph.paint();
});
