import { Graph } from '../../../src';
import '../../../src/behavior';
const width = 500, height = 500;
const div = document.createElement('div');
div.id = 'root';
div.style.width = width + 'px';
div.style.height = height + 'px';
document.body.appendChild(div);
setTimeout(() => {
  document.querySelector('#root canvas').style.background = '#525252'
});

const button = document.createElement('button');
button.innerHTML = '点击截图下载';
document.body.appendChild(button);


describe('before', function () {
  draw();
});


function draw() {
  // 定义数据源
  const data = {
    // 点集
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200
    }, {
      id: 'node2',
      x: 300,
      y: 200
    }, {
      id: 'node3',
      x: 500,
      y: 200
    }, {
      id: 'node4',
      x: 700,
      y: 200
    }, {
      id: 'node5',
      x: 200,
      y: 100
    }, {
      id: 'node6',
      x: 100,
      y: 950
    }],
    // 边集
    edges: [
      // 表示一条从 node1 节点连接到 node2 节点的边
      {
        source: 'node1',
        target: 'node2'
      }
    ]
  };



  // 创建 G6 图实例
  const graph = new Graph({
    container: 'root', // 指定图画布的容器 id，与第 9 行的容器对应
    // 画布宽高
    width,
    height,
  });

  graph.setTextWaterMarker('tiger.wang', {
    width: 50,
    height: 390,
    text: {
      x: 0,
      y: 0,
      lineHeight: 20,
      rotate: 0,
      fontSize: 22,
      fontFamily: 'Microsoft YaHei',
      fill: '#55f95d',
      baseline: 'Middle'
    }
  })
  test('Whether to add watermark successfully', () => {
    expect(!!graph.cfg.graphWaterMarker).toBe(true);
  });
  // 读取数据
  graph.data(data);
  // 渲染图
  graph.render();


  button.onclick = () => {
    graph.downloadImage('123', 'image/png', '#525252');
    // graph.downloadFullImage('123', 'image/jpeg', {
    //   backgroundColor: '#525252',
    // });
  }
}