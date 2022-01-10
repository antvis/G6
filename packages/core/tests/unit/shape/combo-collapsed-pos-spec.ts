import { clone, groupBy } from '@antv/util';
import Graph from '../implement-graph';

const div = document.createElement('div');
div.id = 'combo-shape';
document.body.appendChild(div);
const graphCfg = { container: div, width: 500, height: 600, groupByTypes: false, };

describe('simple data', () => {
  const simpleData = {
    nodes: [
      { id: '0', x: 50, y: 20, comboId: 'a' },
      { id: '1', x: 100, y: 20, comboId: 'a' },
      { id: '2', x: 150, y: 30, comboId: 'b' },
      { id: '3', x: 200, y: 30, comboId: 'b' }
    ], combos: [
      { id: 'a', label: 'a', x: 100, y: 400 },
      // initially collapsed
      { id: 'b', label: 'b-initially-collapsed', collapsed: true, x: 400, y: 400 },
      // empty
      { id: 'c', label: 'c-empty', x: 300, y: 300 }
    ]
  }
  simpleData.nodes.forEach(node => {
    node.label = node.id
  });
  let graph = new Graph(graphCfg);
  graph.read(clone(simpleData));

  // 加几个测试标记圆点
  const group = graph.getGroup();
  const poses = [{ x: 100, y: 400 }, { x: 400, y: 400 }, { x: 300, y: 300 }];
  poses.forEach(pos => {
    group.addShape('circle', {
      attrs: { r: 3, x: pos.x, y: pos.y, fill: '#f00' }
    });
    group.addShape('text', {
      attrs: { text: `(${pos.x}, ${pos.y})`, fill: '#666', fontSize: 10, x: pos.x, y: pos.y + 14, textAlign: 'center' }
    });
  })
  it('render: combos and nodes with pos', () => {
    const comboModels = graph.getCombos().map(combo => combo.getModel());
    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(400);
    expect(comboModels[1].x).toBe(400);
    expect(comboModels[1].y).toBe(400);
    expect(comboModels[2].x).toBe(300);
    expect(comboModels[2].y).toBe(300);
    const nodeModels = graph.getNodes().map(node => node.getModel());
    expect(nodeModels[0].x).toBe(100 - 75 + 50);
    expect(nodeModels[0].y).toBe(400 - 20 + 20);
    expect(nodeModels[1].x).toBe(100 - 75 + 100);
    expect(nodeModels[1].y).toBe(400 - 20 + 20);
    expect(nodeModels[2].x).toBe(400 - 175 + 150);
    expect(nodeModels[2].y).toBe(400 - 30 + 30);
    expect(nodeModels[3].x).toBe(400 - 175 + 200);
    expect(nodeModels[3].y).toBe(400 - 30 + 30);
  });
  it('render: combos without pos, nodes with pos', () => {
    graph.destroy();
    const testData = clone(simpleData);
    testData.combos.forEach(combo => {
      delete combo.x;
      delete combo.y;
    });
    graph = new Graph(graphCfg);
    graph.read(testData);

    const comboModels = graph.getCombos().map(combo => combo.getModel());
    expect(comboModels[0].x).toBe(75);
    expect(comboModels[0].y).toBe(20);
    expect(comboModels[1].x).toBe(175);
    expect(comboModels[1].y).toBe(30);
    expect(comboModels[2].x).not.toBe(undefined);
    expect(comboModels[2].y).not.toBe(undefined);
    const nodeModels = graph.getNodes().map(node => node.getModel());
    expect(nodeModels[0].x).toBe(50);
    expect(nodeModels[0].y).toBe(20);
    expect(nodeModels[1].x).toBe(100);
    expect(nodeModels[1].y).toBe(20);
    expect(nodeModels[2].x).toBe(150);
    expect(nodeModels[2].y).toBe(30);
    expect(nodeModels[3].x).toBe(200);
    expect(nodeModels[3].y).toBe(30);
  });
  it('updateItem: combos from no pos update to pos', () => {
    const testData = clone(simpleData);
    testData.combos.forEach(combo => {
      delete combo.x;
      delete combo.y;
    });
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    graph.updateItem('a', { ...poses[0] })
    graph.updateItem('b', { ...poses[1] })
    graph.updateItem('c', { ...poses[2] })

    const comboModels = graph.getCombos().map(combo => combo.getModel());
    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(400);
    expect(comboModels[1].x).toBe(400);
    expect(comboModels[1].y).toBe(400);
    expect(comboModels[2].x).toBe(300);
    expect(comboModels[2].y).toBe(300);
    const nodeModels = graph.getNodes().map(node => node.getModel());
    expect(nodeModels[0].x).toBe(100 - 75 + 50);
    expect(nodeModels[0].y).toBe(400 - 20 + 20);
    expect(nodeModels[1].x).toBe(100 - 75 + 100);
    expect(nodeModels[1].y).toBe(400 - 20 + 20);
    expect(nodeModels[2].x).toBe(400 - 175 + 150);
    expect(nodeModels[2].y).toBe(400 - 30 + 30);
    expect(nodeModels[3].x).toBe(400 - 175 + 200);
    expect(nodeModels[3].y).toBe(400 - 30 + 30);
  });
  it('updateItem: update the nodes inside expanded/collapsed combo', () => {
    const nodes = graph.getNodes();
    const newNodePoses = [{ x: 50, y: 50 }, { x: 150, y: 150 }, { x: 450, y: 450 }, { x: 450, y: 400 }];
    graph.updateItem(nodes[0], newNodePoses[0]);
    graph.updateItem(nodes[1], newNodePoses[1]);
    graph.updateItem(nodes[2], newNodePoses[2]);
    graph.updateItem(nodes[3], newNodePoses[3]);
    // 上面手动更新单个节点是不会触发相关 combo 更新的，需要调用下面方法。但是下面方法是根据数据绘制的位置，如何控制根据内部元素位置还是 combo 数据位置
    // 是否加参数，内部更新 combo 或渲染 combo 时才用 combo 数据位置
    graph.updateCombos();

    const expectComboPoses = [
      {
        x: (newNodePoses[0].x + newNodePoses[1].x) / 2,
        y: (newNodePoses[0].y + newNodePoses[1].y) / 2,
      },
      {
        x: (newNodePoses[2].x + newNodePoses[3].x) / 2,
        y: (newNodePoses[2].y + newNodePoses[3].y) / 2,
      }
    ]

    const comboModels = graph.getCombos().map(combo => combo.getModel());
    expect(comboModels[0].x).toBe(expectComboPoses[0].x);
    expect(comboModels[0].y).toBe(expectComboPoses[0].y);
    expect(comboModels[1].x).toBe(expectComboPoses[1].x);
    expect(comboModels[1].y).toBe(expectComboPoses[1].y);
  });
  it('1 initial collapsed with pos, 2 expand, 3 move combo, 4 move node, 5 collapse, 6 move combo, 7 move node', (done) => {
    graph.destroy();
    const testData = clone(simpleData);
    graph = new Graph(graphCfg);
    graph.read(testData);

    // initial collapsed with pos
    const combo = graph.findById('b');
    const model = combo.getModel();
    expect(model.x).toBe(400);
    expect(model.y).toBe(400);

    setTimeout(() => {
      // 2 epxand
      graph.collapseExpandCombo('b');
      expect(model.x).toBe(400);
      expect(model.y).toBe(400);
      // 3 move combo
      graph.updateItem(combo, { x: 200, y: 100 });
      expect(model.x).toBe(200);
      expect(model.y).toBe(100);
      // 4 move node
      const node = graph.findById('2');
      graph.updateItem(node, { x: 300, y: 200 });
      graph.updateCombos();
      expect(node.getModel().x).toBe(300);
      expect(node.getModel().y).toBe(200);
      expect(model.x).toBe(262.5);
      expect(model.y).toBe(150);
      setTimeout(() => {
        expect(Math.abs(combo.getKeyShape().attr('r') - 102) < 1).toBe(true);
        // 5 collapse
        graph.collapseExpandCombo('b');
        expect(model.x).toBe(262.5);
        expect(model.y).toBe(150);
        setTimeout(() => {
          expect(Math.abs(combo.getKeyShape().attr('r') - 35) < 1).toBe(true);
          // 6 move combo
          graph.updateItem(combo, { x: 400, y: 50 });
          expect(model.x).toBe(400);
          expect(model.y).toBe(50);
          expect(Math.abs(combo.getKeyShape().attr('r') - 35) < 1).toBe(true);
          // 7 move node
          const node = graph.findById('3');
          graph.updateItem(node, { x: 150, y: 400 });
          graph.updateCombos();
          expect(node.getModel().x).toBe(150);
          expect(node.getModel().y).toBe(400);
          // 收起状态下移动内部节点，combo 不会更新位置，因为计算 bbox 的时候忽略了隐藏元素
          expect(model.x).toBe(400);
          expect(model.y).toBe(50);
          graph.collapseExpandCombo('b');
          setTimeout(() => {
            expect(model.x).toBe(293.75);
            expect(model.y).toBe(250);
            done();
          }, 500)
        }, 500)
      }, 500)
    }, 500)
  });
  it('1 initial collapsed without pos, 2 expand, 3 move combo, 4 move node, 5 collapse, 6 move combo, 7 move node', (done) => {
    const testData = clone(simpleData);
    testData.combos.forEach(combo => {
      delete combo.x;
      delete combo.y;
    });
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    // initial collapsed with pos
    const combo = graph.findById('b');
    const model = combo.getModel();
    expect(model.x).toBe(175);
    expect(model.y).toBe(30);

    setTimeout(() => {
      // 2 epxand
      graph.collapseExpandCombo('b');
      setTimeout(() => {
        expect(model.x).toBe(175);
        expect(model.y).toBe(30);
        // 3 move combo
        graph.updateItem(combo, { x: 200, y: 100 });
        expect(model.x).toBe(200);
        expect(model.y).toBe(100);
        // 4 move node
        const node = graph.findById('2');
        graph.updateItem(node, { x: 300, y: 200 });
        graph.updateCombos();
        expect(node.getModel().x).toBe(300);
        expect(node.getModel().y).toBe(200);
        expect(model.x).toBe(262.5);
        expect(model.y).toBe(150);
        setTimeout(() => {
          expect(Math.abs(combo.getKeyShape().attr('r') - 102) < 1).toBe(true);
          // 5 collapse
          graph.collapseExpandCombo('b');
          setTimeout(() => {
            expect(model.x).toBe(262.5);
            expect(model.y).toBe(150);
            expect(Math.abs(combo.getKeyShape().attr('r') - 35) < 1).toBe(true);
            // 6 7 与上一个 it 内容相同，不再重复
            done();
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  });
  it('1 initial expand with pos, 2 move node, 3 move combo, 4 collapse, 5 move node, 6 expand', (done) => {
    graph.destroy();
    const testData = clone(simpleData);
    graph = new Graph(graphCfg);
    graph.read(testData);

    // 1 initial expand with pos
    const combo = graph.findById('a');
    const model = combo.getModel();
    expect(model.x).toBe(100);
    expect(model.y).toBe(400);

    // 2 move node
    const node = graph.findById('1');
    const node1Model = node.getModel();
    const node0Model = graph.findById('0').getModel();
    graph.updateItem(node, { x: 100, y: 100 });
    graph.updateCombos();
    expect(node.getModel().x).toBe(100);
    expect(node.getModel().y).toBe(100);
    expect(model.x).toBe(87.5);
    expect(model.y).toBe(250);
    setTimeout(() => {
      expect(Math.abs(combo.getKeyShape().attr('r') - 187) < 1).toBe(true);
      // 3 move combo
      graph.updateItem(combo, { x: 300, y: 400 });
      expect(model.x).toBe(300);
      expect(model.y).toBe(400);
      expect(node1Model.x).toBe(300 - 87.5 + 100);
      expect(node1Model.y).toBe(400 - 250 + 100);
      expect(node0Model.x).toBe(287.5);
      expect(node0Model.y).toBe(550);
      // 4 collapse
      graph.collapseExpandCombo('a');
      setTimeout(() => {
        expect(Math.abs(combo.getKeyShape().attr('r') - 35) < 1).toBe(true);
        expect(model.x).toBe(300);
        expect(model.y).toBe(400);
        // 5 move node, collapse 状态下移动节点，combo 位置不变
        graph.updateItem('0', { x: 50, y: 50 });
        expect(node0Model.x).toBe(50);
        expect(node0Model.y).toBe(50);
        expect(model.x).toBe(300);
        expect(model.y).toBe(400);
        // 6 expand
        graph.collapseExpandCombo('a');
        setTimeout(() => {
          expect(Math.abs(combo.getKeyShape().attr('r') - 204) < 1).toBe(true);
          expect(model.x).toBe(181.25);
          expect(model.y).toBe(150);
          done();
        }, 500)
      }, 500)
    }, 500);
  });
  it('1 initial expand without pos, 2 move node, 3 move combo, 4 collapse, 5 move node, 6 expand', (done) => {
    const testData = clone(simpleData);
    testData.combos.forEach(combo => {
      delete combo.x;
      delete combo.y;
    });
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    // 1 initial collapsed without pos
    const combo = graph.findById('a');
    const model = combo.getModel();
    expect(model.x).toBe(75);
    expect(model.y).toBe(20);

    setTimeout(() => {
      // 2 move node
      const node = graph.findById('1');
      const node1Model = node.getModel();
      const node0Model = graph.findById('0').getModel();
      graph.updateItem(node, { x: 300, y: 200 });
      graph.updateCombos();
      expect(node1Model.x).toBe(300);
      expect(node1Model.y).toBe(200);
      expect(model.x).toBe(175);
      expect(model.y).toBe(110);
      setTimeout(() => {
        expect(Math.abs(combo.getKeyShape().attr('r') - 193) < 1).toBe(true);
        // 3 move combo
        graph.updateItem(combo, { x: 50, y: 350 });
        expect(model.x).toBe(50);
        expect(model.y).toBe(350);
        expect(node1Model.x).toBe(50 - 175 + 300);
        expect(node1Model.y).toBe(350 - 110 + 200);
        expect(node0Model.x).toBe(-75);
        expect(node0Model.y).toBe(260);
        // 4 collapse
        graph.collapseExpandCombo('a');
        setTimeout(() => {
          expect(Math.abs(combo.getKeyShape().attr('r') - 35) < 1).toBe(true);
          expect(model.x).toBe(50);
          expect(model.y).toBe(350);
          // 5 expand
          graph.collapseExpandCombo('a');
          setTimeout(() => {
            expect(Math.abs(combo.getKeyShape().attr('r') - 193) < 1).toBe(true);
            expect(model.x).toBe(50);
            expect(model.y).toBe(350);
            graph.destroy();
            done();
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  });
});

describe('hierarchy data 1: combo A has one child: an empty combo B', () => {
  const data = {
    combos: [
      { id: 'A', x: 100, y: 200, label: 'A' },
      { id: 'B', x: 300, y: 400, label: 'B', parentId: 'A' },
    ]
  }
  let graph = new Graph(graphCfg);
  graph.read(clone(data));
  let comboA = graph.findById('A');
  let comboAModel = comboA.getModel();
  let comboB = graph.findById('B');
  let comboBModel = comboB.getModel();
  it('nested combo has different initial pos', () => {
    expect(comboAModel.x).toBe(100);
    expect(comboAModel.y).toBe(200);
    // the child combo follow the parent
    expect(comboBModel.x).toBe(100);
    expect(comboBModel.y).toBe(200);
  });
  it('move child empty combo B', (done) => {
    graph.updateItem('B', { x: 330, y: 120 });
    expect(comboBModel.x).toBe(330);
    expect(comboBModel.y).toBe(120);
    // the parent combo follow the child
    graph.updateCombos();
    expect(comboAModel.x).toBe(330);
    expect(comboAModel.y).toBe(120);
    // collpase combo B
    graph.collapseExpandCombo('B');
    setTimeout(() => {
      // move combo B
      graph.updateItem('B', { x: 430, y: 200 });
      expect(comboBModel.x).toBe(430);
      expect(comboBModel.y).toBe(200);
      // the parrent follow the child
      graph.updateCombos();
      expect(comboAModel.x).toBe(430);
      expect(comboAModel.y).toBe(200);
      done()
    }, 500);
  });
  it('move parent combo A', (done) => {
    graph.updateItem('A', { x: 50, y: 50 });
    expect(comboAModel.x).toBe(50);
    expect(comboAModel.y).toBe(50);
    // the child follow the parent
    expect(comboBModel.x).toBe(50);
    expect(comboBModel.y).toBe(50);
    // expand B
    graph.collapseExpandCombo('B');
    setTimeout(() => {
      // no changes
      expect(comboAModel.x).toBe(50);
      expect(comboAModel.y).toBe(50);
      expect(comboBModel.x).toBe(50);
      expect(comboBModel.y).toBe(50);
      done();
    }, 500);
  });
  it('parent combo without pos, child combo with pos', () => {
    const testData = clone(data);
    delete testData.combos[0].x;
    delete testData.combos[0].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    comboA = graph.findById('A');
    comboAModel = comboA.getModel();
    comboB = graph.findById('B');
    comboBModel = comboB.getModel();

    expect(comboBModel.x).toBe(300);
    expect(comboBModel.y).toBe(400);
    // A has no position, follows the child
    expect(comboAModel.x).toBe(300);
    expect(comboAModel.y).toBe(400);

    // move B
    graph.updateItem('B', { x: 300, y: 100 });
    expect(comboBModel.x).toBe(300);
    expect(comboBModel.y).toBe(100);
    // A follows the child
    graph.updateCombos();
    expect(comboAModel.x).toBe(300);
    expect(comboAModel.y).toBe(100);

    // move A
    graph.updateItem('A', { x: 400, y: 120 });
    expect(comboBModel.x).toBe(400);
    expect(comboBModel.y).toBe(120);
    // B follows the parent
    expect(comboAModel.x).toBe(400);
    expect(comboAModel.y).toBe(120);
  });
  it('parent combo with pos, child combo without', () => {
    const testData = clone(data);
    delete testData.combos[1].x;
    delete testData.combos[1].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    comboA = graph.findById('A');
    comboAModel = comboA.getModel();
    comboB = graph.findById('B');
    comboBModel = comboB.getModel();

    expect(comboBModel.x).toBe(100);
    expect(comboBModel.y).toBe(200);
    // A has no position, follows the child
    expect(comboAModel.x).toBe(100);
    expect(comboAModel.y).toBe(200);
  });
  it('parent combo collapsed with pos, child combo with pos', (done) => {
    const testData = clone(data);
    testData.combos[0].collapsed = true;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    comboA = graph.findById('A');
    comboAModel = comboA.getModel();
    comboB = graph.findById('B');
    comboBModel = comboB.getModel();

    expect(comboBModel.x).toBe(100);
    expect(comboBModel.y).toBe(200);
    // A has no position, follows the child
    expect(comboAModel.x).toBe(100);
    expect(comboAModel.y).toBe(200);

    // move A
    graph.updateItem('A', { x: 300, y: 350 });
    expect(comboAModel.x).toBe(300);
    expect(comboAModel.y).toBe(350);
    // child follows A
    expect(comboBModel.x).toBe(300);
    expect(comboBModel.y).toBe(350);

    // expand A
    graph.collapseExpandCombo('A');
    setTimeout(() => {
      expect(comboAModel.x).toBe(300);
      expect(comboAModel.y).toBe(350);
      // child follows A
      expect(comboBModel.x).toBe(300);
      expect(comboBModel.y).toBe(350);
      graph.destroy();
      done()
    }, 500);
  });
});

describe('hierarchy data 2: combo A has 2 children: an empty combo B, a node', () => {
  const data = {
    nodes: [{ id: '0', x: 10, y: 20, comboId: 'A' }],
    combos: [
      { id: 'A', x: 100, y: 200, label: 'A' },
      { id: 'B', x: 300, y: 400, label: 'B', parentId: 'A' },
    ]
  }
  let graph = new Graph(graphCfg);
  graph.read(clone(data));
  let comboA = graph.findById('A');
  let comboAModel = comboA.getModel();
  let comboB = graph.findById('B');
  let comboBModel = comboB.getModel();
  let node = graph.findById('0');
  let nodeModel = node.getModel();

  it('nested combo has different initial pos', () => {
    expect(comboAModel.x).toBe(100);
    expect(comboAModel.y).toBe(200);
    // the child combo follow the parent
    expect(comboBModel.x).toBe(232.75);
    expect(comboBModel.y).toBe(377.75);
    expect(nodeModel.x).toBe(-57.25);
    expect(nodeModel.y).toBe(-2.25);
  });
  it('move child empty combo B', () => {
    graph.updateItem('B', { x: 330, y: 120 });
    expect(comboBModel.x).toBe(330);
    expect(comboBModel.y).toBe(120);
    // the sibling node is not changed
    expect(nodeModel.x).toBe(-57.25);
    expect(nodeModel.y).toBe(-2.25);
    // the parent combo follows the children
    graph.updateCombos();
    expect(comboAModel.x).toBe(148.625);
    expect(comboAModel.y).toBe(71.125);
  });
  it('move parent combo A', () => { // done
    graph.updateItem('A', { x: 450, y: 350 });
    expect(comboAModel.x).toBe(450);
    expect(comboAModel.y).toBe(350);
    // the child follow the parent
    expect(comboBModel.x).toBe(450 - 148.625 + 330);
    expect(comboBModel.y).toBe(350 - 71.125 + 120);
    expect(nodeModel.x).toBe(450 - 148.625 - 57.25);
    expect(nodeModel.y).toBe(350 - 71.125 - 2.25);
  });
  it('parent combo without pos, children with pos', () => {
    const testData = clone(data);
    delete testData.combos[0].x;
    delete testData.combos[0].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    comboA = graph.findById('A');
    comboAModel = comboA.getModel();
    comboB = graph.findById('B');
    comboBModel = comboB.getModel();
    node = graph.findById('0');
    nodeModel = node.getModel();

    expect(comboBModel.x).toBe(300);
    expect(comboBModel.y).toBe(400);
    expect(nodeModel.x).toBe(10);
    expect(nodeModel.y).toBe(20);
    // A has no position, follows the child
    expect(comboAModel.x).toBe(167.25);
    expect(comboAModel.y).toBe(222.25);
  });
  it('parent combo with pos, child combo without pos', () => {
    const testData = clone(data);
    delete testData.combos[1].x;
    delete testData.combos[1].y;
    delete testData.nodes[0].x;
    delete testData.nodes[0].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    comboA = graph.findById('A');
    comboAModel = comboA.getModel();
    comboB = graph.findById('B');
    comboBModel = comboB.getModel();
    node = graph.findById('0');
    nodeModel = node.getModel();

    expect(comboAModel.x).toBe(100);
    expect(comboAModel.y).toBe(200);
    // B and 0 have no position, follow the parent
    // the position is randomed, but inside the parent parent
    expect(comboBModel.x).not.toBe(NaN);
    expect(comboBModel.y).not.toBe(NaN);
    expect(nodeModel.x).not.toBe(NaN);
    expect(nodeModel.y).not.toBe(NaN);
  });
  it('parent combo collapsed with pos, child combo with pos', () => {
    const testData = clone(data);
    testData.combos[0].collapsed = true;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    comboA = graph.findById('A');
    comboAModel = comboA.getModel();
    comboB = graph.findById('B');
    comboBModel = comboB.getModel();

    expect(comboAModel.x).toBe(100);
    expect(comboAModel.y).toBe(200);
    expect(comboBModel.x).not.toBe(NaN);
    expect(comboBModel.y).not.toBe(NaN);
    expect(nodeModel.x).not.toBe(NaN);
    expect(nodeModel.y).not.toBe(NaN);
    graph.destroy();
  });
});


describe('hierarchy data3: combo A has 2 children: combo B with 2 nodes, 2 nodes', () => {
  const data = {
    nodes: [
      { id: '0', x: 140, y: 120, comboId: 'A' },
      { id: '1', x: 150, y: 130, comboId: 'A' },
      { id: '2', x: 180, y: 220, comboId: 'B' },
      { id: '3', x: 190, y: 230, comboId: 'B' }
    ],
    combos: [
      { id: 'A', x: 100, y: 200, label: 'A' },
      { id: 'B', x: 300, y: 400, label: 'B', parentId: 'A' },
    ]
  }
  data.nodes.forEach(node => node.label = node.id);
  let graph = new Graph(graphCfg);
  graph.read(clone(data));
  let comboA = graph.findById('A');
  let comboAModel = comboA.getModel();
  let comboB = graph.findById('B');
  let comboBModel = comboB.getModel();
  let nodes = graph.getNodes();
  let nodeModels = nodes.map(node => node.getModel());

  it('nested combo has different initial pos', () => {
    expect(comboAModel.x).toBe(100);
    expect(comboAModel.y).toBe(200);
    // the child combo follow the parent
    expect(comboBModel.x).toBe(161.7898448916085);
    expect(comboBModel.y).toBe(321.7898448916085);
    expect(nodeModels[0].x).toBe(1.7898448916085101);
    expect(nodeModels[0].y).toBe(41.78984489160848);
    expect(nodeModels[1].x).toBe(11.78984489160851);
    expect(nodeModels[1].y).toBe(51.78984489160848);
    expect(nodeModels[2].x).toBe(156.7898448916085);
    expect(nodeModels[2].y).toBe(316.7898448916085);
    expect(nodeModels[3].x).toBe(166.7898448916085);
    expect(nodeModels[3].y).toBe(326.7898448916085);
  });
  it('move child combo B', () => {
    graph.updateItem('B', { x: 330, y: 120 });
    graph.updateCombos();
    expect(comboBModel.x).toBe(330);
    expect(comboBModel.y).toBe(120);
    // the sibling node is not changed
    expect(nodeModels[0].x).toBe(1.7898448916085101);
    expect(nodeModels[0].y).toBe(41.78984489160848);
    expect(nodeModels[1].x).toBe(11.78984489160851);
    expect(nodeModels[1].y).toBe(51.78984489160848);
    // the children nodes of combo B follow B
    expect(nodeModels[2].x).toBe(325);
    expect(nodeModels[2].y).toBe(115);
    expect(nodeModels[3].x).toBe(335);
    expect(nodeModels[3].y).toBe(125);

    // the parent combo follows the children
    expect(comboAModel.x).toBe(184.10507755419576);
    expect(comboAModel.y).toBe(99.10507755419573);
  });
  it('move parent combo A', (done) => {
    graph.updateItem('A', { x: 150, y: 150 });
    expect(comboAModel.x).toBe(150);
    expect(comboAModel.y).toBe(150);
    // the child follow the parent
    const dx = 150 - 184.10507755419576, dy = 150 - 99.10507755419573;
    expect(comboBModel.x).toBe(dx + 330);
    expect(comboBModel.y).toBe(dy + 120);
    expect(nodeModels[0].x).toBe(dx + 1.7898448916085101);
    expect(nodeModels[0].y).toBe(dy + 41.78984489160848);
    expect(nodeModels[1].x).toBe(dx + 11.78984489160851);
    expect(nodeModels[1].y).toBe(dy + 51.78984489160848);
    expect(nodeModels[2].x).toBe(dx + 325);
    expect(nodeModels[2].y).toBe(dy + 115);
    expect(nodeModels[3].x).toBe(dx + 335);
    expect(nodeModels[3].y).toBe(dy + 125);
    // collapse B
    graph.collapseExpandCombo('B');
    setTimeout(() => {
      // move B
      graph.updateItem('B', { x: 50, y: 50 });
      expect(comboBModel.x).toBe(50);
      expect(comboBModel.y).toBe(50);
      graph.updateCombos();
      setTimeout(() => {
        expect(Math.abs(comboA.getKeyShape().attr('r') - 105) < 1).toBe(true);
        expect(comboAModel.x).toBe(21.092383668706375);
        expect(comboAModel.y).toBe(64.09238366870638);
        done();
      }, 500);
    }, 500);
  });
  it('parent combo without pos, children with pos', () => {
    const testData = clone(data);
    delete testData.combos[0].x;
    delete testData.combos[0].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    comboA = graph.findById('A');
    comboAModel = comboA.getModel();
    comboB = graph.findById('B');
    comboBModel = comboB.getModel();
    nodes = graph.getNodes();
    nodeModels = nodes.map(node => node.getModel());

    expect(comboBModel.x).toBe(300);
    expect(comboBModel.y).toBe(400);
    expect(nodeModels[0].x).toBe(data.nodes[0].x);
    expect(nodeModels[0].y).toBe(data.nodes[0].y);
    expect(nodeModels[1].x).toBe(data.nodes[1].x);
    expect(nodeModels[1].y).toBe(data.nodes[1].y);
    // 2 3 follows B
    expect(nodeModels[2].x).toBe(295);
    expect(nodeModels[2].y).toBe(395);
    expect(nodeModels[3].x).toBe(305);
    expect(nodeModels[3].y).toBe(405);
    // A has no position, follows the child
    expect(comboAModel.x).toBe(238.2101551083915);
    expect(comboAModel.y).toBe(278.2101551083915);
  });
  it('parent combo with pos, child combo without pos', () => {
    const testData = clone(data);
    delete testData.combos[1].x;
    delete testData.combos[1].y;
    testData.nodes.forEach(node => {
      delete node.x;
      delete node.y;
    });
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    comboA = graph.findById('A');
    comboAModel = comboA.getModel();
    comboB = graph.findById('B');
    comboBModel = comboB.getModel();
    nodes = graph.getNodes();
    nodeModels = nodes.map(node => node.getModel());

    expect(comboAModel.x).toBe(100);
    expect(comboAModel.y).toBe(200);
    // B and nodes have no position, follow the parent
    expect(comboBModel.x).toBe(100);
    expect(comboBModel.y).toBe(200);
    nodeModels.forEach(nodeModel => {
      expect(nodeModel.x).toBe(100);
      expect(nodeModel.y).toBe(200);
    });
    // move node 3
    graph.updateItem('3', { x: 300, y: 400 });
    expect(nodeModels[3].x).toBe(300);
    expect(nodeModels[3].y).toBe(400);
    graph.updateCombos();
    // B and A follow the change
    expect(comboBModel.x).toBe((100 + 300) / 2);
    expect(comboBModel.y).toBe((200 + 400) / 2);
    expect(comboAModel.x).toBe((100 + 300) / 2);
    expect(comboAModel.y).toBe((200 + 400) / 2);
  });
  it('parent combo collapsed with pos, child combo with pos', (done) => {
    const testData = clone(data);
    testData.combos[0].collapsed = true;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    comboA = graph.findById('A');
    comboAModel = comboA.getModel();
    comboB = graph.findById('B');
    comboBModel = comboB.getModel();
    nodes = graph.getNodes();
    nodeModels = nodes.map(node => node.getModel());

    expect(comboAModel.x).toBe(100);
    expect(comboAModel.y).toBe(200);
    setTimeout(() => {
      // expand A
      graph.collapseExpandCombo('A');
      setTimeout(() => {
        expect(comboB.isVisible()).toBe(true);
        // the child combo follow the parent
        expect(comboBModel.x).toBe(161.7898448916085);
        expect(comboBModel.y).toBe(321.7898448916085);
        expect(nodeModels[0].x).toBe(1.7898448916085101);
        expect(nodeModels[0].y).toBe(41.78984489160848);
        expect(nodeModels[1].x).toBe(11.78984489160851);
        expect(nodeModels[1].y).toBe(51.78984489160848);
        expect(nodeModels[2].x).toBe(156.7898448916085);
        expect(nodeModels[2].y).toBe(316.7898448916085);
        expect(nodeModels[3].x).toBe(166.7898448916085);
        expect(nodeModels[3].y).toBe(326.7898448916085);
        graph.destroy();
        done()
      }, 500)
    }, 500);
  });
});

describe('hierarchy data4: combo A has 2 children: combo B with 2 nodes, 2 nodes', () => {
  const data = {
    combos: [
      { id: 'A', x: 100, y: 200, label: 'A' },
      { id: 'B', x: 300, y: 400, label: 'B', parentId: 'A' },
      { id: 'C', x: 150, y: 100, label: 'C', parentId: 'A' },
    ]
  }
  let graph = new Graph(graphCfg);
  graph.read(clone(data));
  let combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')]; // graph.getCombos 返回的不是数据顺序
  let comboModels = combos.map(combo => combo.getModel());

  it('nested combo has different initial pos', () => {
    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(200);
    // the child combo follow the parent
    expect(comboModels[1].x).toBe(175);
    expect(comboModels[1].y).toBe(350);
    expect(comboModels[2].x).toBe(25);
    expect(comboModels[2].y).toBe(50);
  });
  it('move child combo B', () => {
    graph.updateItem('B', { x: 130, y: 120 });
    graph.updateCombos();
    expect(comboModels[1].x).toBe(130);
    expect(comboModels[1].y).toBe(120);
    // the sibling node is not changed
    expect(comboModels[2].x).toBe(25);
    expect(comboModels[2].y).toBe(50);
    // the parent combo follows the children
    expect(comboModels[0].x).toBe(77.5);
    expect(comboModels[0].y).toBe(85);
    expect(Math.abs(combos[0].getKeyShape().attr('r') - 240) < 1).toBe(true);
  });
  it('move parent combo A', () => {
    graph.updateItem('A', { x: 150, y: 150 });
    expect(comboModels[0].x).toBe(150);
    expect(comboModels[0].y).toBe(150);
    // the child follow the parent
    const dx = 150 - 77.5, dy = 150 - 85;
    expect(comboModels[1].x).toBe(dx + 130);
    expect(comboModels[1].y).toBe(dy + 120);
    expect(comboModels[2].x).toBe(dx + 25);
    expect(comboModels[2].y).toBe(dy + 50);
  });
  it('parent combo without pos, children with pos', () => {
    const testData = clone(data);
    delete testData.combos[0].x;
    delete testData.combos[0].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')];
    comboModels = combos.map(combo => combo.getModel());

    expect(comboModels[1].x).toBe(300);
    expect(comboModels[1].y).toBe(400);
    expect(comboModels[2].x).toBe(150);
    expect(comboModels[2].y).toBe(100);
    // A has no position, follows the child
    expect(comboModels[0].x).toBe((300 + 150) / 2);
    expect(comboModels[0].y).toBe((400 + 100) / 2);
  });
  it('parent combo with pos, child combo without pos', () => {
    const testData = clone(data);
    delete testData.combos[1].x;
    delete testData.combos[1].y;
    delete testData.combos[2].x;
    delete testData.combos[2].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')];
    comboModels = combos.map(combo => combo.getModel());

    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(200);
    expect(comboModels[1].x).not.toBe(NaN);
    expect(comboModels[1].y).not.toBe(NaN);
    expect(comboModels[2].x).not.toBe(NaN);
    expect(comboModels[2].y).not.toBe(NaN);
    // move node B and C
    graph.updateItem('B', { x: 300, y: 400 });
    graph.updateItem('C', { x: 200, y: 400 });
    expect(comboModels[1].x).toBe(300);
    expect(comboModels[1].y).toBe(400);
    expect(comboModels[2].x).toBe(200);
    expect(comboModels[2].y).toBe(400);
    graph.updateCombos();
    expect(comboModels[0].x).toBe((300 + 200) / 2);
    expect(comboModels[0].y).toBe((400 + 400) / 2);
  });
  it('parent combo collapsed with pos, child combo with pos', (done) => {
    const testData = clone(data);
    testData.combos[0].collapsed = true;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')];
    comboModels = combos.map(combo => combo.getModel());

    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(200);
    setTimeout(() => {
      // expand A
      graph.collapseExpandCombo('A');
      setTimeout(() => {
        expect(combos[1].isVisible()).toBe(true);
        expect(combos[2].isVisible()).toBe(true);
        // the child combo follow the parent
        expect(comboModels[1].x).toBe(175);
        expect(comboModels[1].y).toBe(350);
        expect(comboModels[2].x).toBe(25);
        expect(comboModels[2].y).toBe(50);
        graph.destroy();
        done();
      }, 500)
    }, 500);
  });
});


describe('hierarchy data5: combo A has 2 children: combo B with 2 nodes, 2 nodes', () => {
  const data = {
    nodes: [
      { id: '0', x: 50, y: 50, label: '0', comboId: 'B' },
      { id: '1', x: 150, y: 50, label: '1', comboId: 'B' },
    ],
    combos: [
      { id: 'A', x: 100, y: 200, label: 'A' },
      { id: 'B', x: 300, y: 400, label: 'B', parentId: 'A' },
      { id: 'C', x: 250, y: 300, label: 'C', parentId: 'A' },
    ]
  }
  let graph = new Graph(graphCfg);
  graph.read(clone(data));
  let combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')]; // graph.getCombos 返回的不是数据顺序
  let comboModels = combos.map(combo => combo.getModel());
  let node0Model = graph.findById('0').getModel();
  let node1Model = graph.findById('1').getModel();

  it('nested combo has different initial pos', () => {
    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(200);
    // the child combo follow the parent
    expect(comboModels[1].x).toBe(100);
    expect(comboModels[1].y).toBe(224.29780138165995);
    expect(comboModels[2].x).toBe(50);
    expect(comboModels[2].y).toBe(124.29780138165995);
    expect(node0Model.x).toBe(50);
    expect(node0Model.y).toBe(224.29780138165995);
    expect(node1Model.x).toBe(150);
    expect(node1Model.y).toBe(224.29780138165995);
  });
  it('move child combo B', (done) => {
    graph.updateItem('B', { x: 130, y: 120 });
    graph.updateCombos();
    expect(comboModels[1].x).toBe(130);
    expect(comboModels[1].y).toBe(120);
    // the sibling node is not changed
    expect(comboModels[2].x).toBe(50);
    expect(comboModels[2].y).toBe(124.29780138165995);
    // the parent combo follows the children
    setTimeout(() => {
      expect(comboModels[0].x).toBe(115.70219861834002);
      expect(comboModels[0].y).toBe(120);
      expect(Math.abs(combos[0].getKeyShape().attr('r') - 157) < 1).toBe(true);
      done();
    }, 500)
  });
  it('move parent combo A', () => {
    graph.updateItem('A', { x: 150, y: 150 });
    expect(comboModels[0].x).toBe(150);
    expect(comboModels[0].y).toBe(150);
    // the child follow the parent
    const dx = 150 - 115.70219861834002, dy = 150 - 120;
    expect(comboModels[1].x).toBe(dx + 130);
    expect(comboModels[1].y).toBe(dy + 120);
    expect(comboModels[2].x).toBe(dx + 50);
    expect(comboModels[2].y).toBe(dy + 124.29780138165995);
  });
  it('parent combo without pos, children with pos', () => {
    const testData = clone(data);
    delete testData.combos[0].x;
    delete testData.combos[0].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')];
    comboModels = combos.map(combo => combo.getModel());

    expect(comboModels[1].x).toBe(300);
    expect(comboModels[1].y).toBe(400);
    expect(comboModels[2].x).toBe(250);
    expect(comboModels[2].y).toBe(300);
    // A has no position, follows the child
    expect(comboModels[0].x).toBe(300);
    expect(comboModels[0].y).toBe(375.70219861834005);
  });
  it('parent combo with pos, child combo without pos', () => {
    const testData = clone(data);
    delete testData.combos[1].x;
    delete testData.combos[1].y;
    delete testData.combos[2].x;
    delete testData.combos[2].y;
    testData.nodes.forEach(node => {
      delete node.x;
      delete node.y;
    })
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')];
    comboModels = combos.map(combo => combo.getModel());

    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(200);
    expect(comboModels[1].x).not.toBe(NaN);
    expect(comboModels[1].y).not.toBe(NaN);
    expect(comboModels[2].x).not.toBe(NaN);
    expect(comboModels[2].y).not.toBe(NaN);
    // move node B and C
    graph.updateItem('B', { x: 300, y: 400 });
    graph.updateItem('C', { x: 200, y: 400 });
    expect(comboModels[1].x).toBe(300);
    expect(comboModels[1].y).toBe(400);
    expect(comboModels[2].x).toBe(200);
    expect(comboModels[2].y).toBe(400);
    graph.updateCombos();
    expect(comboModels[0].x).toBe(252.42462120245875);
    expect(comboModels[0].y).toBe(400);
  });
  it('parent combo collapsed with pos, child combo with pos', (done) => {
    const testData = clone(data);
    testData.combos[0].collapsed = true;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')];
    comboModels = combos.map(combo => combo.getModel());

    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(200);
    setTimeout(() => {
      // expand A
      graph.collapseExpandCombo('A');
      setTimeout(() => {
        expect(combos[1].isVisible()).toBe(true);
        expect(combos[2].isVisible()).toBe(true);
        // the child combo follow the parent
        expect(comboModels[1].x).toBe(100);
        expect(comboModels[1].y).toBe(224.29780138165995);
        expect(comboModels[2].x).toBe(50);
        expect(comboModels[2].y).toBe(124.29780138165995);
        graph.destroy();
        done()
      }, 500);
    }, 500);
  });
});


describe('hierarchy data6: combo A has 2 children: combo B with 2 nodes, 2 nodes', () => {
  const data = {
    combos: [
      { id: 'A', x: 100, y: 200, label: 'A' },
      { id: 'B', x: 300, y: 400, label: 'B', parentId: 'A' },
      { id: 'C', x: 400, y: 500, label: 'C', parentId: 'B' },
    ]
  }
  let graph = new Graph(graphCfg);
  graph.read(clone(data));
  let combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')]; // graph.getCombos 返回的不是数据顺序
  let comboModels = combos.map(combo => combo.getModel());

  it('nested combo has different initial pos', () => {
    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(200);
    // the child combo follow the parent
    expect(comboModels[1].x).toBe(100);
    expect(comboModels[1].y).toBe(200);
    expect(comboModels[2].x).toBe(100);
    expect(comboModels[2].y).toBe(200);
  });
  it('move child combo B', (done) => {
    graph.updateItem('B', { x: 130, y: 120 });
    graph.updateCombos();
    expect(comboModels[1].x).toBe(130);
    expect(comboModels[1].y).toBe(120);
    // child follows
    expect(comboModels[2].x).toBe(130);
    expect(comboModels[2].y).toBe(120);
    // the parent combo follows the children
    setTimeout(() => {
      expect(comboModels[0].x).toBe(130);
      expect(comboModels[0].y).toBe(120);
      expect(Math.abs(combos[0].getKeyShape().attr('r') - 130) < 1).toBe(true);
      done();
    }, 500)
  });
  it('move parent combo A', () => {
    graph.updateItem('A', { x: 150, y: 150 });
    expect(comboModels[0].x).toBe(150);
    expect(comboModels[0].y).toBe(150);
    // the child follow the parent
    expect(comboModels[1].x).toBe(150);
    expect(comboModels[1].y).toBe(150);
    expect(comboModels[2].x).toBe(150);
    expect(comboModels[2].y).toBe(150);
  });
  it('parent combo without pos, B and C has position', () => {
    const testData = clone(data);
    delete testData.combos[0].x;
    delete testData.combos[0].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')];
    comboModels = combos.map(combo => combo.getModel());

    // follow B
    expect(comboModels[1].x).toBe(300);
    expect(comboModels[1].y).toBe(400);
    expect(comboModels[2].x).toBe(300);
    expect(comboModels[2].y).toBe(400);
    // A has no position, follows the child
    expect(comboModels[0].x).toBe(300);
    expect(comboModels[0].y).toBe(400);
  });
  it('A and B combo without pos, C has position', () => {
    const testData = clone(data);
    delete testData.combos[0].x;
    delete testData.combos[0].y;
    delete testData.combos[1].x;
    delete testData.combos[1].y;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')];
    comboModels = combos.map(combo => combo.getModel());

    // follow C
    expect(comboModels[1].x).toBe(400);
    expect(comboModels[1].y).toBe(500);
    expect(comboModels[2].x).toBe(400);
    expect(comboModels[2].y).toBe(500);
    // A has no position, follows the child
    expect(comboModels[0].x).toBe(400);
    expect(comboModels[0].y).toBe(500);
  });
  it('parent combo collapsed with pos, child combo with pos', (done) => {
    const testData = clone(data);
    testData.combos[0].collapsed = true;
    graph.destroy();
    graph = new Graph(graphCfg);
    graph.read(testData);

    combos = [graph.findById('A'), graph.findById('B'), graph.findById('C')];
    comboModels = combos.map(combo => combo.getModel());

    expect(comboModels[0].x).toBe(100);
    expect(comboModels[0].y).toBe(200);
    setTimeout(() => {
      // expand A
      graph.collapseExpandCombo('A');
      setTimeout(() => {
        expect(combos[1].isVisible()).toBe(true);
        expect(combos[2].isVisible()).toBe(true);
        // the child combo follow the parent
        expect(comboModels[1].x).toBe(100);
        expect(comboModels[1].y).toBe(200);
        expect(comboModels[2].x).toBe(100);
        expect(comboModels[2].y).toBe(200);
        graph.destroy();
        done();
      }, 500);
    }, 500);
  });
});

describe('placea grid combo and nodes', () => {
  const data = {
    nodes: [
      {
        id: '0',
        comboId: 'a',
      },
      {
        id: '1',
        comboId: 'a',
      },
      {
        id: '2',
        comboId: 'b',
      },
      {
        id: '3',
        comboId: 'b',
      },
      {
        id: '4',
        comboId: 'b',
      },
      {
        id: '5',
        comboId: 'c',
      },
      {
        id: '6',
        comboId: 'c',
      },
    ],
    edges: [
      {
        source: '0',
        target: '1',
      },
      {
        source: '1',
        target: '2',
      },
      {
        source: '0',
        target: '3',
      },
      {
        source: '0',
        target: '4',
      },
      {
        source: '6',
        target: '5',
      }
    ],
    combos: [
      {
        id: 'a',
        label: 'Combo A',
      },
      {
        id: 'b',
        label: 'Combo B',
        parentId: 'a'
      },
      {
        id: 'c',
        label: 'Combo C',
        style: {
          fill: '#f00',
          opacity: 0.4
        }
      },
      {
        id: 'd',
        label: 'empty D'
      }
    ]
  }
  let graph = new Graph({
    ...graphCfg,
    defaultCombo: {
      type: 'rect'
    }
  });
  it('grid', () => {
    const testData = clone(data);
    const groupNodes = groupBy(testData.nodes, node => node.comboId);
    Object.keys(groupNodes).forEach(key => {
      groupNodes[key].forEach((node, i) => {
        node.x = i * 50;
        node.y = 0;
      });
    });
    testData.combos[0].x = 250;
    testData.combos[0].y = 250;

    testData.combos[1].x = 0;
    testData.combos[1].y = 100;

    testData.combos[2].x = 250;
    testData.combos[2].y = 450;

    testData.combos[3].x = 250;
    testData.combos[3].y = 550;

    graph.read(testData);

    const combos = testData.combos.map(cdata => graph.findById(cdata.id));
    const comboModels = combos.map(combo => combo.getModel());

    expect(comboModels[2].x).toBe(comboModels[0].x);
    expect(comboModels[2].x).toBe(comboModels[1].x);
    expect(comboModels[2].x).toBe(comboModels[3].x);

    graph.destroy();
  })
});