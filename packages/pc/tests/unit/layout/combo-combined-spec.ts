import G6 from '../../../src';
import dataset from './data';
import { ConcentricLayout } from '@antv/layout';
import * as d3Force from 'd3-force';
import { isFunction } from 'util';

const data = dataset.comboData;

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

xdescribe('no node and one node', () => {
  it('layout without node', (done) => {
    const testData = {};
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboCombined',
      },
      width: 500,
      height: 500,
    });
    graph.data(testData);
    graph.render();
    done();
  });
  it('layout with one node', (done) => {
    const testData = {
      nodes: [
        {
          id: 'node',
          x: 0,
          y: 0,
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboCombined',
      },
      width: 500,
      height: 500,
    });
    graph.on('afterlayout', () => {
      expect(testData.nodes[0].x).toBe(250);
      expect(testData.nodes[0].y).toBe(250);
      done();
    });
    graph.data(testData);
    graph.render();
  });
});

xdescribe('combo force layout', () => {
  it('combo force layout with default configs, emit afterlayout', (done) => {
    const node = data.nodes[0];
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboCombined',
        innerLayout: new ConcentricLayout({ sortBy: 'degree' })
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-combo', 'collapse-expand-combo'] // 'collapse-expand-combo', 
      },
      animate: true,
      animateCfg: {
        duration: 100
      }
    });

    graph.on('canvas:click', e => {
      graph.layout();
    })
    // graph.on('combo:click', e => {
    //   graph.uncombo(e.item.getID());
    //   // graph.layout();
    // })

    graph.on('afterlayout', () => {
      console.log('data.nodes', data.nodes);
      expect(node.x).not.toEqual(undefined);
      expect(node.y).not.toEqual(undefined);
      expect(node.x).not.toEqual(NaN);
      expect(node.y).not.toEqual(NaN);
      done();
    });
    graph.data(data);
    graph.render();
  });
});

describe('scenario', () => {
  const scenarioData = {
    nodes: [...data.nodes],
    edges: [...data.edges],
    combos: [...data.combos]
  };
  // 模拟 combo 节点和其他部分的边
  const comboNodeEdges = [
    { source: 'a', target: '14' },
    { source: 'a', target: '16' },
    { source: '13', target: 'a' },
    { source: 'b', target: '18' },
    { source: 'b', target: '19' },
    { source: 'b', target: '4' },
    { source: 'c', target: '30' },
    { source: 'c', target: '13' },
    { source: '15', target: 'c' },
    { source: 'c', target: 'c' },
  ]
  const nodeMap = {};
  const oriItemComboMap = {};
  const oriComboItemMap = {};
  scenarioData.nodes.forEach(node => {
    nodeMap[node.id] = node;
    oriItemComboMap[node.id] = node.comboId;
    if (!oriComboItemMap[node.comboId]) oriComboItemMap[node.comboId] = []
    oriComboItemMap[node.comboId].push(node.id);
    // 移除 combo d
    if (node.id === '32' || node.id === '31' || node.id === '33') delete node.comboId
  });
  scenarioData.combos.forEach((combo, i) => {
    oriItemComboMap[combo.id] = combo.parentId;
    if (!oriComboItemMap[combo.parentId]) oriComboItemMap[combo.parentId] = []
    oriComboItemMap[combo.parentId].push(combo.id);
    // 移除 combo d
    if (combo.id === 'd') scenarioData.combos.splice(i, 1)
  })
  // 删除跨越 combo 的边，替代为 comboEdges（无论边数量、方向，均用一条虚线边代替）
  const comboEdgesMap = {};
  const removedEdges = [];
  for (let i = scenarioData.edges.length - 1; i >= 0; i--) {
    const edge = scenarioData.edges[i];
    delete edge.style;
    const sourceParentId = nodeMap[edge.source]?.comboId || nodeMap[edge.source]?.parentId;
    const targetParentId = nodeMap[edge.target]?.comboId || nodeMap[edge.target]?.parentId;
    if (sourceParentId !== targetParentId) {
      removedEdges.push(edge);
      scenarioData.edges.splice(i, 1);
      const key = edge.source < edge.target ? `${edge.source}-${edge.target}` : `${edge.target}-${edge.source}`;
      comboEdgesMap[key] = {
        source: sourceParentId,
        target: targetParentId,
        style: {
          lineDash: [5, 5]
        }
      }
    }
  }
  const comboEdges = Object.values(comboEdgesMap);
  scenarioData.edges = scenarioData.edges.concat(comboEdges);
  const graph = new G6.Graph({
    container: div,
    layout: {
      type: 'comboCombined',
      innerLayout: new ConcentricLayout({ sortBy: 'degree' })
    },
    width: 500,
    height: 500,
    defaultCombo: {
      comboPadding: 1,
      style: {
        fillOpacity: 0.7
      },
      labelCfg: {
        style: {
          fill: '#fff'
        }
      }
    },
    modes: {
      default: ['drag-canvas', 'zoom-canvas', {
        type: 'drag-combo',
        onlyChangeComboSize: true
      }, {
          type: 'drag-node',
          onlyChangeComboSize: true
        }] // 'collapse-expand-combo', 
    },
    animate: true,
    animateCfg: { duration: 100 },
    groupByTypes: false
  });
  graph.data(scenarioData);
  graph.render();
  // 点击 combo 时，uncombo，并加入一个代表被解散 combo 的节点，恢复相关的边（包括内部元素到其他 combo 的边，以及新节点相关的边(random)）
  graph.on('combo:click', e => {
    const combo = e.item;
    console.log('combo', combo, combo.getBBox());
    debugger
    const comboChildren = combo.getChildren();
    const children = comboChildren.nodes.concat(comboChildren.combos);
    const newEdges = [];
    const comboId = combo.getID();

    // 代替 combo 的节点 id
    const comboNodeId = 'combo-node-' + comboId
    const comboBBox = { ...combo.getBBox() };
    // 增加代替 combo 的节点
    graph.addItem('node', {
      id: comboNodeId,
      label: combo.getModel().label,
      x: comboBBox.centerX,
      y: comboBBox.minY
    });
    // 恢复该节点和其他元素的连接
    comboNodeEdges.forEach(cEdge => {
      const sourceModel = graph.findById(cEdge.source)?.getModel();
      const targetModel = graph.findById(cEdge.target)?.getModel();
      if (!sourceModel || !targetModel) return;
      newEdges.push(graph.addItem('edge', {
        source: cEdge.source === comboId ? comboNodeId : sourceModel.comboId || sourceModel.parentId || cEdge.source,
        target: cEdge.target === comboId ? comboNodeId : targetModel.comboId || targetModel.parentId || cEdge.target,
      }))
    });

    children.forEach((child, i) => {
      const childId = child.getID();
      // 恢复所有子节点与其他元素的连接
      removedEdges.forEach(rEdge => {
        const isSource = rEdge.source === childId;
        const otherEndItem = isSource ? graph.findById(rEdge.target) : graph.findById(rEdge.source);
        if (!otherEndItem) return;
        const otherEndModel = otherEndItem.getModel();
        const otherEndCurrentParent = otherEndModel.comboId || otherEndModel.parentId;
        newEdges.push(graph.addItem('edge', {
          source: isSource ? childId : otherEndCurrentParent || rEdge.source,
          target: isSource ? otherEndCurrentParent || rEdge.target : childId,
          style: otherEndCurrentParent ? {
            lineDash: [5, 5]
          } : {}
        }));
      });
    });

    console.log('====', graph.findById('test0'), graph.findById('test1'))
    debugger

    // uncombo
    // 增加动画
    combo.getKeyShape().animate({ y: -comboBBox.height / 2, r: 10 }, { duration: 300 });
    setTimeout(() => {
      graph.uncombo(combo.getID());
    }, 350);

    // 标记新增的边，用于观察
    console.log('newEdges.leng', newEdges.length);
    newEdges.forEach(nEdge => {
      if (nEdge.destroyed) return;
      graph.updateItem(nEdge, {
        style: {
          stroke: '#f00'
        }
      })
    })
  });
  // graph.on('combo:dragend', e => {
  //   const model = e.item.getModel()
  //   model.fx = model.x;
  //   model.fy = model.y;
  //   graph.layout();
  // })

  graph.on('node:click', e => {
    const nodeId = e.item.getID();
    const oriComboId = oriItemComboMap[nodeId]
    const meanCenter = { x: 0, y: 0, count: 0 };
    Object.keys(oriItemComboMap).forEach(nodeId => {
      if (oriItemComboMap[nodeId] === oriComboId) {
        const nodeModel = graph.findById(nodeId)?.getModel()
        if (nodeModel) {
          meanCenter.x += (nodeModel.x || 0);
          meanCenter.y += (nodeModel.y || 0);
          meanCenter.count++;
        }
      }
    });
    meanCenter.x /= meanCenter.count;
    meanCenter.y /= meanCenter.count;

    if (oriComboId && !e.item.getModel().comboId) {
      console.log('add combo', oriComboId);
      graph.addItem('combo', {
        id: oriComboId,
        label: oriComboId,
        x: meanCenter.x,
        y: meanCenter.y
      });
      const childIds = oriComboItemMap[oriComboId];
      childIds.forEach(childId => {
        console.log('update children', childId)
        const childItem = graph.findById(childId);
        if (!childItem) return;
        graph.updateComboTree(childId, oriComboId);
      })
      graph.removeItem('combo-node-' + oriComboId);
      const edgeItems = graph.getEdges();
      const virtualEdgeToBeAdded = {}
      for (let i = edgeItems.length - 1; i >= 0; i--) {
        graph.getEdges().forEach(edge => {
          const model = edge.getModel();
          const isRelated = childIds.includes(model.source) || childIds.includes(model.target);
          const sourceRelated = isRelated && childIds.includes(model.source);
          if (isRelated) {
            const key = model.source < model.target ? `${model.source}-${model.target}` : `${model.target}-${model.source}`;
            const sourceModel = graph.findById(model.source)?.getModel();
            const targetModel = graph.findById(model.target)?.getModel();
            if (!sourceModel || !targetModel) return;
            const sourceParentId = sourceModel.comboId || sourceModel.parentId;
            const targetParentId = targetModel.comboId || targetModel.parentId;
            if (sourceParentId === targetParentId) return;
            graph.removeItem(edge);
            virtualEdgeToBeAdded[key] = {
              source: sourceRelated ? oriComboId : sourceParentId || sourceModel.id,
              target: sourceRelated ? targetParentId || targetModel.id : oriComboId,
              style: {
                lineDash: [5, 5]
              }
            }
          }
        })
      }
      Object.values(virtualEdgeToBeAdded).map(edgeInfo => graph.addItem('edge', edgeInfo));
      graph.layout();
    }
  });

  it('scenario', () => {

  });
});