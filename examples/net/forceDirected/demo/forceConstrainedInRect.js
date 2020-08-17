import G6 from '@antv/g6';

const graphDiv = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Constrians the nodes to be layed in the gray area with force-directed layout';
graphDiv.appendChild(descriptionDiv);

const width = graphDiv.scrollWidth;
const height = graphDiv.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const nodes = data.nodes;

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

    const onTick = () => {
      let minx = 99999999;
      let maxx = -99999999;
      let miny = 99999999;
      let maxy = -99999999;
      let maxsize = -9999999;
      nodes.forEach((node) => {
        if (minx > node.x) {
          minx = node.x;
        }
        if (maxx < node.x) {
          maxx = node.x;
        }
        if (miny > node.y) {
          miny = node.y;
        }
        if (maxy < node.y) {
          maxy = node.y;
        }
        if (maxsize < node.size) {
          maxsize = node.size;
        }
      });
      const scalex = (constrainBox.width - maxsize) / (maxx - minx);
      const scaley = (constrainBox.height - maxsize) / (maxy - miny);
      nodes.forEach((node) => {
        node.x = (node.x - minx) * scalex + constrainBox.x;
        node.y = (node.y - miny) * scaley + constrainBox.y;
      });
    };

    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      layout: {
        type: 'force',
        onTick,
      },
      defaultNode: {
        size: 15,
        color: '#5B8FF9',
        style: {
          lineWidth: 2,
          fill: '#C6E5FF',
        },
      },
      defaultEdge: {
        size: 1,
        color: '#e2e2e2',
      },
    });

    graph.data({
      nodes: data.nodes,
      edges: data.edges.map(function (edge, i) {
        edge.id = 'edge' + i;
        return Object.assign({}, edge);
      }),
    });
    graph.render();
  });
