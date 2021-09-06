import '../../../src/behavior';
import Graph from '../implement-graph';
import { Rect } from '@antv/g'

const div = document.createElement('div');
div.id = 'global-spec';
div.style.width = '500px';
div.style.height = '500px';
document.body.appendChild(div);

describe('graph', () => {
  const globalGraph = new Graph({
    container: 'global-spec',
    width: 500,
    height: 500,
  });
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 0,
        y: 0,
        // label: 'node1',
      },
      {
        id: 'node2',
        x: 100,
        y: 100,
        // label: 'node2',
      },
      // {
      //   id: 'node3',
      //   x: 0,
      //   y: 100,
      //   label: 'node3',
      // },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
      {
        source: 'node2',
        target: 'node3',
      },
      // {
      //   source: 'node3',
      //   target: 'node1',
      // },
    ],
  };
  globalGraph.data(data);
  globalGraph.render();

  globalGraph.getContainer().style.backgroundColor = '#eee';

  // ✅
  it('moveTo', () => {
    // globalGraph.zoomTo(2)
    setTimeout(() => {
      globalGraph.moveTo(100, 100 ,true) // ,true
      setTimeout(() => {
        globalGraph.moveTo(200, 100 ,true) // ,true
      }, 2000)
    }, 2000)
  });

  // ✅
  it('translate', () => {
    setTimeout(() => {
      globalGraph.translate(100, 100)
      setTimeout(() => {
        globalGraph.translate(100, 100)
      }, 2000)
    }, 2000)
  })

  // ✅
  it('zoomTo', () => {
    setTimeout(() => {
      globalGraph.zoomTo(2, { x: 150, y: 20 })
      setTimeout(() => {
        // should be unchanged
        globalGraph.zoomTo(2.1, { x: 150, y: 20 })
      }, 2000)
    }, 2000)
  })

  // ✅
  it('zoom', () => {
    setTimeout(() => {
      globalGraph.zoom(2, {x: 100, y: 100})
      setTimeout(() => {
        globalGraph.zoom(1.1)
      }, 2000)
    }, 2000)
  })

  // 🚫 TODO
  it('zoom and translate', () => {
    setTimeout(() => {
      globalGraph.zoom(2, {x: 0, y: 0})
      setTimeout(() => {
        globalGraph.moveTo(100, 100, true) // 无动画 pan 表现不对
      }, 2000)
    }, 2000)
  })

  // ✅
  it('translate and zoom', () => {
    setTimeout(() => {
      globalGraph.moveTo(100, 100)
      setTimeout(() => {
        globalGraph.zoom(2, {x: 0, y: 0})
      }, 2000)
    }, 2000)
  })

  // ✅
  it('focusItem', () => {
    setTimeout(() => {
      globalGraph.focusItem('node1')
      setTimeout(() => {
        globalGraph.focusItem('node2', true)
      }, 2000)
    }, 2000)
  });

  // 🚫 TODO
  it('zoom focusItem', () => {
    setTimeout(() => {
      globalGraph.zoom(2, {x: 0, y: 0})
      // globalGraph.focusItem('node1')
      setTimeout(() => {
        globalGraph.focusItem('node1') // 不带动画的 pan 有误，带动画正确
      }, 2000)
    }, 2000)
  });

  // ✅
  // getPointByCanvas: 画布视口坐标系 view port -> 画布全局坐标系 global
  // getCanvasByPoint: 反之
  // === util.math.port2Global, global2Port
  it('getPointByCanvas getCanvasByPoint', () => {
    const testCoord = { x: 50, y: 20 };
    const camera = globalGraph.get('canvas').getCamera();
    // 重置相机位置和缩放
    camera.setPosition([0, 0, 0]);
    camera.setZoom(1);

    // position [0, 0]
    const globalRes1 = globalGraph.getPointByCanvas(testCoord.x, testCoord.y);
    const portRes1 = globalGraph.getCanvasByPoint(testCoord.x, testCoord.y);
    expect(globalRes1.x).toBe(-200);
    expect(globalRes1.y).toBe(-230);
    expect(portRes1.x).toBe(300);
    expect(portRes1.y).toBe(270);

    // + zoom 2
    camera.setZoom(2);
    const globalRes2 = globalGraph.getPointByCanvas(testCoord.x, testCoord.y);
    const portRes2 = globalGraph.getCanvasByPoint(testCoord.x, testCoord.y);
    expect(globalRes2.x).toBe(-100);
    expect(globalRes2.y).toBe(-115);
    expect(portRes2.x).toBe(350);
    expect(portRes2.y).toBe(290);

    // + position [50, 100]
    camera.setPosition([50, 100, 0]);
    const globalRes3 = globalGraph.getPointByCanvas(testCoord.x, testCoord.y);
    const portRes3 = globalGraph.getCanvasByPoint(testCoord.x, testCoord.y);
    expect(globalRes3.x).toBe(-50);
    expect(globalRes3.y).toBe(-15);
    expect(portRes3.x).toBe(250);
    expect(portRes3.y).toBe(90);

    // + zoom 4
    camera.setZoom(4);
    const globalRes4 = globalGraph.getPointByCanvas(testCoord.x, testCoord.y);
    const portRes4 = globalGraph.getCanvasByPoint(testCoord.x, testCoord.y);
    expect(globalRes4.x).toBe(0);
    expect(globalRes4.y).toBe(42.5);
    expect(portRes4.x).toBe(250);
    expect(portRes4.y).toBe(-70);

  });

  // getPointByClient：页面坐标系 page  -> 画布全局坐标系 global
  // getClientByPoint: 反之
  // 🚫 TODO: 等待 G 提供 page 坐标的转换
  it('getPointByClient getClientByPoint', () => {})

  // ✅
  // 获取图内容中心全局坐标
  it('getGraphCenterPoint', () => {
    const camera = globalGraph.get('canvas').getCamera();
    // 重置相机位置和缩放
    camera.setPosition([0, 0, 0]);
    camera.setZoom(1);

    const res1 = globalGraph.getGraphCenterPoint();
    expect(res1.x).toBe(50);
    expect(res1.y).toBe(50);

    // 不应当受到平移、缩放的影响
    globalGraph.translate(100, 100);
    globalGraph.zoom(2);
    const res2 = globalGraph.getGraphCenterPoint();
    expect(res2.x).toBe(50);
    expect(res2.y).toBe(50);

    // 节点位置更新后，将受到影响
    globalGraph.updateItem('node2', {
      x: 200,
      y: 0
    })
    const res3 = globalGraph.getGraphCenterPoint();
    expect(res3.x).toBe(100);
    expect(res3.y).toBe(50);
  });

  // ✅
  // 获取视口中心全局坐标
  it.only('getViewPortCenterPoint', () => {
    const camera = globalGraph.get('canvas').getCamera();
    // 重置相机位置和缩放
    // camera.setPosition([0, 0, 0]);
    // camera.setZoom(1);

    // const res1 = globalGraph.getViewPortCenterPoint();
    // expect(res1.x).toBe(0);
    // expect(res1.y).toBe(0);

    // // 受到平移影响
    // camera.setPosition([250, 250, 0]);
    // const res2 = globalGraph.getViewPortCenterPoint();
    // expect(res2.x).toBe(250);
    // expect(res2.y).toBe(250);

    // // 受到缩放影响
    // globalGraph.zoom(2); // 以 0,0 为缩放中心，放大两倍
    // const res3 = globalGraph.getViewPortCenterPoint();
    // expect(res3.x).toBe(125);
    // expect(res3.y).toBe(125);

    // // 受到平移影响
    // camera.setPosition([300, 300, 0]);
    // const res4 = globalGraph.getViewPortCenterPoint();
    // expect(res4.x).toBe(300);
    // expect(res4.y).toBe(300);

    // // 不应当受到图内容影响
    globalGraph.updateItem('node2', {
      x: 300,
      y: 100
    })
    // const res5 = globalGraph.getViewPortCenterPoint();
    // expect(res5.x).toBe(300);
    // expect(res5.y).toBe(300);
  })

  // ✅
  it.only('fitCenter', () => {
    const camera = globalGraph.get('canvas').getCamera();
    // 重置相机位置和缩放，重置数据位置
    // camera.setPosition([250, 250, 0]);
    // camera.setZoom(1);
    console.log('camera', camera)
    // 更新有残影, 导致 bbox 错误, fitCenter 不准确
    globalGraph.updateItem('node2', {
      x: 100,
      y: 100
    });
    globalGraph.getEdges().forEach(edge => {
      console.log('edge', edge.getModel().source, edge.getModel().target, edge.getKeyShape().getBounds(), edge.getKeyShape().attr('path'), edge.getKeyShape().config.style.path)
    })
    globalGraph.getNodes().forEach(node => {
      console.log('node', node.getModel().x, node.getModel().y)
    })
    const gBBox = globalGraph.getGroup().getBounds()
    console.log('bbox', gBBox)
    console.log('globalGraph.getGroup()', globalGraph.getGroup())
    console.log('edge shape', globalGraph.getGroup().children[0].children[0].attr())
    // globalGraph.getGroup().appendChild(new Rect({
    //   attrs: {
    //     x: gBBox.min[0],
    //     y: gBBox.min[1],
    //     width: gBBox.max[0] - gBBox.min[0],
    //     height: gBBox.max[1] - gBBox.min[1],
    //     fill: "#000",
    //     opactiy: 0.3
    //   }
    // }))
    // console.log()
    // globalGraph.fitCenter();
    // expect(camera.getPosition()[0]).toBe(50);
    // expect(camera.getPosition()[1]).toBe(50);


    // // 重置相机位置，缩放 2，fitCenter 后相机位置同上
    // camera.setPosition([250, 250, 0]);
    // camera.setZoom(2);
    globalGraph.fitCenter();
    // expect(camera.getPosition()[0]).toBe(50);
    // expect(camera.getPosition()[1]).toBe(50);
  });

  // ✅
  it('fitView', () => {
    const camera = globalGraph.get('canvas').getCamera();
    // 重置相机位置和缩放
    camera.setPosition([250, 250, 0]);
    camera.setZoom(1);
    globalGraph.fitView();
    expect(camera.getPosition()[0]).toBe(50);
    expect(camera.getPosition()[1]).toBe(50);
    expect(camera.zoom).toBe(3.7115457222683683);
  });

});