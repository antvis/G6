import G6 from '@antv/g6';

// TODO: do not add this demo, onTick cannot assign the original layout data

const graphDiv = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Constrians the nodes to be layed in the gray area with force-directed layout';
graphDiv.appendChild(descriptionDiv);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    // 灰色区域
    const constrainBox = { x: 60, y: 50, width: 500, height: 150 };

    const backrect = document.createElement('div');
    backrect.style.backgroundColor = '#666';
    backrect.style.opacity = 0.1;
    backrect.style.marginLeft = `${constrainBox.x}px`;
    backrect.style.marginTop = `${constrainBox.y}px`;
    backrect.style.width = `${constrainBox.width}px`;
    backrect.style.height = `${constrainBox.height}px`;
    backrect.style.position = 'absolute';
    graphDiv.appendChild(backrect);

    const onTick = (nodes) => {
      let minx = 99999999;
      let maxx = -99999999;
      let miny = 99999999;
      let maxy = -99999999;
      let maxsize = -9999999;
      nodes.forEach((node) => {
        if (minx > node.data.x) {
          minx = node.data.x;
        }
        if (maxx < node.data.x) {
          maxx = node.data.x;
        }
        if (miny > node.data.y) {
          miny = node.data.y;
        }
        if (maxy < node.data.y) {
          maxy = node.data.y;
        }
        if (maxsize < node.size) {
          maxsize = node.size;
        }
      });
      const scalex = (constrainBox.width - maxsize) / (maxx - minx);
      const scaley = (constrainBox.height - maxsize) / (maxy - miny);
      nodes.forEach((node) => {
        node.data.x = (node.data.x - minx) * scalex + constrainBox.x;
        node.data.y = (node.data.y - miny) * scaley + constrainBox.y;
      });
    };

    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      transforms: [
    {
      type: 'transform-v4-data',
      activeLifecycle: ['read'],
    },
  ],
      layout: {
        type: 'force',
        animated: true,
        onTick,
      },
      data,
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });
