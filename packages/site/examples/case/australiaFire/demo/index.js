import G6 from '@antv/g6';
import insertCss from 'insert-css';

insertCss(`
  #legendContainer{
    position: absolute;
    top: 92px;
    left: 8px;
    width: 100px;
    height: 100px;
  }
  .g6-tooltip {
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background-color: #000;
    padding: 2px 8px;
    text-align: center;
  }
  #time {
    position: absolute;
    color: #fff;
    font-size: 25px;
    top: 80px;
    width: 700px;
    text-align: center;
    height: auto;
  }
`);

const LANG = 'en'; // 'zh'
const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graphDiv = document.getElementById('container');

const timeDiv = document.createElement('div');
timeDiv.id = 'time';
timeDiv.innerHTML = '11th January, 2020';
graphDiv.parentNode.appendChild(timeDiv);

const colors = ['#FD5854', '#FDA25A', '#FFD574', '#3A5A3C'];
const imgs = {
  'state-New South Wales': {
    src: 'https://gw.alipayobjects.com/zos/basement_prod/828aec79-8123-4ca7-baa8-1422a964003a.svg',
    width: 183,
    height: 146,
  },
  'state-Victoria': {
    src: 'https://gw.alipayobjects.com/zos/basement_prod/463d3b0c-b03f-40b3-b6e9-6309b5d637cf.svg',
    width: 116,
    height: 88,
  },
  'state-Queensland': {
    src: 'https://gw.alipayobjects.com/zos/basement_prod/617bc829-50e5-4537-978e-81bf424cb8fd.svg',
    width: 215,
    height: 311,
  },
  'state-Western Australia': {
    src: 'https://gw.alipayobjects.com/zos/basement_prod/c8b4cbb0-57fd-4c18-bbd1-4993b52e5048.svg',
    width: 221,
    height: 357,
  },
  'state-South Australia': {
    src: 'https://gw.alipayobjects.com/zos/basement_prod/6582ef8e-e5ce-4815-9183-b6a70caeb1db.svg',
    width: 169,
    height: 198,
  },
  'state-Tasmania': {
    src: 'https://gw.alipayobjects.com/zos/basement_prod/056fb079-58c1-4697-bb66-15f08512cfb8.svg',
    width: 50,
    height: 45,
  },
  'state-Northern Territory': {
    src: 'https://gw.alipayobjects.com/zos/basement_prod/a616ae60-ebe6-4e61-b085-1a207237e193.svg',
    width: 140,
    height: 243,
  },
  'country-australia': {
    src: 'https://gw.alipayobjects.com/zos/basement_prod/85c5e2e2-c015-495a-8710-3c881c49a3ed.svg',
    width: 559,
    height: 464,
  },
};
const mapImgScale = 0.2;
let minPop = Infinity;
let maxPop = -Infinity;
let minBrightness = Infinity;
let maxBrightness = -Infinity;
const leafSizeRange = [10, 100];

G6.registerNode(
  'circle-bar',
  {
    drawShape(cfg, group) {
      const dist2Ori = Math.sqrt(cfg.x * cfg.x + cfg.y * cfg.y);
      const vecToOrin = [cfg.x / dist2Ori, cfg.y / dist2Ori];
      const startPoint = [(vecToOrin[0] * cfg.size) / 2, (vecToOrin[1] * cfg.size) / 2];
      const scale = Math.sqrt(cfg.data.firePointNums[0]);
      const path = [
        ['M', startPoint[0], startPoint[1]],
        ['L', vecToOrin[0] * scale + startPoint[0], vecToOrin[1] * scale + startPoint[1]],
      ];

      let fillColor = colors[3];
      if (cfg.data.fireBrightnesses[0]) {
        const normalizedBrightness =
          (cfg.data.fireBrightnesses[0] - minBrightness) / (maxBrightness - minBrightness); // [0, 1];
        const colorIdx = Math.floor(normalizedBrightness * 2);
        fillColor = colors[colorIdx];
      }
      let count = 0;
      const timeDiv = document.getElementById('time');

      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: cfg.size / 2,
          fill: fillColor,
          shadowColor: fillColor,
          shadowBlur: 20,
        },
      });
      const bar = group.addShape('path', {
        attrs: {
          path,
          lineWidth: 2,
          fill: fillColor,
          stroke: fillColor,
          shadowColor: fillColor,
          shadowBlur: 20,
        },
      });

      setInterval(
        () => {
          // if (count >= 7) return;
          bar.stopAnimate();
          count++;
          if (cfg.id === 'city-Sydney') {
            timeDiv.innerHTML = `${(count % 8) + 11}th January, 2020`;
          }
          const firePointNum = cfg.data.firePointNums[count % 8] || 0;
          const targetScale = Math.sqrt(firePointNum);
          const targetPath = [
            ['M', startPoint[0], startPoint[1]],
            [
              'L',
              vecToOrin[0] * targetScale + startPoint[0],
              vecToOrin[1] * targetScale + startPoint[1],
            ],
          ];

          fillColor = colors[3];
          if (cfg.data.fireBrightnesses[count % 8]) {
            const normalizedBrightness =
              (cfg.data.fireBrightnesses[count % 8] - minBrightness) /
              (maxBrightness - minBrightness); // [0, 1];
            const colorIdx = Math.floor(normalizedBrightness * 2);
            fillColor = colors[colorIdx];
          }
          bar.animate(
            {
              path: targetPath,
              stroke: fillColor,
              fill: fillColor,
              shadowColor: fillColor,
            },
            {
              repeat: false,
              duration: 300,
            },
          );

          keyShape.stopAnimate();
          keyShape.animate(
            {
              fill: fillColor,
              shadowColor: fillColor,
            },
            {
              repeat: false,
              duration: 300,
            },
          );
        },
        1300,
        'easeCubic',
      );

      return keyShape;
    },
  },
  'circle',
);

const tooltip = new G6.Tooltip({
  // offsetX and offsetY include the padding of the parent container
  offsetX: 10,
  offsetY: 10,
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const outDiv = document.createElement('div');
    const populationDes = LANG === 'en' ? 'Population' : '人口总数';
    const model = e.item.getModel();
    const name = `${model.xlabel}</br>${populationDes}: ${model.population}`;
    outDiv.style.width = 'fit-content';
    //outDiv.style.padding = '0px 0px 20px 0px';
    outDiv.innerHTML = `<div>${name}</div>`;
    return outDiv;
  },
});

fetch('https://gw.alipayobjects.com/os/basement_prod/d676014a-0a11-4ea9-9af4-4038bae3c0a1.json')
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById('container');
    container.style.backgroundColor = '#000';
    container.style.textAlign = 'center';
    const graph = new G6.TreeGraph({
      container: 'container',
      width: height < width ? height : width,
      height: height < width ? height : width,
      fitView: true,
      fitViewPadding: 80,
      linkCenter: true,
      defaultNode: {
        size: 30,
        style: {
          lineWidth: 0,
          fill: '#3A5A3C',
        },
      },
      defaultEdge: {
        color: '#FEAB58',
        style: {
          lineWidth: 0.3,
          shadowBlur: 100,
          shadowColor: '#FF4654',
        },
      },
      nodeStateStyles: {
        hover: {
          stroke: '#fff',
          lineWidth: 1,
        },
      },
      modes: {
        default: ['drag-canvas'],
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR',
        radial: true,
        nodeSep: 10,
        rankSep: 100,
      },
      plugins: [tooltip],
    });

    graph.node((node) => {
      const xlabel = node.label;
      let type = 'circle';
      if (node.isLeaf) type = 'circle-bar';
      else if (node.img) type = 'image';
      let label = node.isLeaf ? '' : node.label;
      switch (label) {
        case 'Australian Capital Territory':
          label = 'Australian\nCapital Territory';
          break;
        case 'South Australia':
          label = 'South\nAustralia';
          break;
        case 'New South Wales':
          label = 'New South\nWales';
          break;
        case 'Northern Territory':
          label = 'Northern\nTerritory';
          break;
        default:
          break;
      }
      return {
        type,
        xlabel,
        label,
        labelCfg: {
          position: 'center',
          style: {
            fill: '#fff',
            fontSize: 10,
          },
        },
      };
    });

    G6.Util.traverseTree(data, (item) => {
      if (minPop > item.population) minPop = item.population;
      if (maxPop < item.population) maxPop = item.population;
      if (item.data && item.data.fireBrightnesses) {
        item.data.fireBrightnesses.forEach((b) => {
          if (minBrightness > b && b) minBrightness = b;
          if (maxBrightness < b) maxBrightness = b;
        });
      }
    });
    const sizeScale = leafSizeRange[1] - leafSizeRange[0];
    G6.Util.traverseTree(data, (item) => {
      if (!item.isLeaf) {
        if (imgs[item.id]) {
          item.img = imgs[item.id].src;
          item.size = [imgs[item.id].width * mapImgScale, imgs[item.id].height * mapImgScale];
        } else {
          item.size = 10;
        }
        item.style = {
          shadowColor: '#FF4654',
          shadowBlur: 200,
        };
      } else {
        item.size = ((item.population - minPop) / (maxPop - minPop)) * sizeScale + leafSizeRange[0];
      }
      if (item.id === 'country-australia') {
        item.size = [559 * mapImgScale, 464 * mapImgScale];
        item.style.shadowBlur = 200;
      }
    });

    graph.data(data);
    graph.render();

    graph.on('node:mouseenter', (e) => {
      graph.setItemState(e.item, 'hover', true);
    });
    graph.on('node:mouseleave', () => {
      graph.getNodes().forEach((node) => {
        graph.setItemState(node, 'hover', false);
      });
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  });

const legendContainer = document.createElement('div');
legendContainer.id = 'legendContainer';
const legendGraphDiv = document.createElement('div');
legendGraphDiv.id = 'legend';
legendContainer.appendChild(legendGraphDiv);
graphDiv.parentNode.appendChild(legendContainer);
const legendGraph = new G6.Graph({
  container: 'legend',
  width: 200,
  height: 200,
  defaultNode: {
    size: 10,
    type: 'circle',
    labelCfg: {
      position: 'right',
      offset: 10,
      style: {
        fill: '#fff',
      },
    },
  },
});
const legendX = 20;
const legendBeginY = 50;
const legendYPadding = 25;
const legendData = {
  nodes: [
    {
      id: 'level1',
      x: legendX,
      y: legendBeginY,
      label: '受灾情况严重',
      label_en: 'Severely Affected',
      style: {
        fill: '#FD5854',
        lineWidth: 0,
      },
    },
    {
      id: 'level2',
      x: legendX,
      y: legendBeginY + legendYPadding,
      label_en: 'Affected',
      label: '受灾情况一般',
      style: {
        fill: '#FDA25A',
        lineWidth: 0,
      },
    },
    {
      id: 'level3',
      label: '受灾情况较轻',
      label_en: 'Lightly Affected',
      x: legendX,
      y: legendBeginY + legendYPadding * 2,
      style: {
        fill: '#FFD574',
        lineWidth: 0,
      },
    },
    {
      id: 'level4',
      label: '火灾未涉及',
      label_en: 'Not Affected',
      x: legendX,
      y: legendBeginY + legendYPadding * 3,
      style: {
        fill: '#3A5A3C',
        lineWidth: 0,
      },
    },
    {
      id: 'legendSize',
      label: '圆面积代表城市人口总数',
      label_en: 'Node Size - Population',
      x: legendX,
      y: legendBeginY + legendYPadding * 4,
      size: 15,
      style: {
        fill: '#3A5A3C',
        lineWidth: 0,
      },
    },
    {
      id: 'legendBar',
      label: '受灾点数量',
      label_en: 'Bar Height - # Fire Points',
      x: legendX,
      y: legendBeginY + legendYPadding * 5 + 10,
      type: 'rect',
      size: [2, 30],
      style: {
        fill: '#3A5A3C',
        lineWidth: 0,
      },
    },
  ],
};
if (LANG === 'en') {
  legendData.nodes.forEach((node) => {
    node.label = node.label_en;
  });
}
legendGraph.data(legendData);
legendGraph.render();
