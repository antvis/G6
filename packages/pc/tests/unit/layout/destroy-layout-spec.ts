import G6 from '../../../src';
import { NodeConfig, EdgeConfig } from '@antv/g6-core';
import { mathEqual } from './util';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

const data: { nodes: NodeConfig[]; edges: EdgeConfig[] } = {
  nodes: [
    {
      id: '0',
    },
    {
      id: '1',
    },
  ],
  edges: [{ source: '0', target: '1' }],
};

const data2: { nodes: NodeConfig[]; edges: EdgeConfig[] } = {
  nodes: [
    {
      id: 'new0',
      x: 100,
      y: 100,
    },
    {
      id: 'new1',
    },
    {
      id: 'new2',
    },
    {
      id: 'new3',
      x: 150,
      y: 250,
    },
  ],
  edges: [
    { source: 'new0', target: 'new1' },
    { source: 'new1', target: 'new2' },
    { source: 'new0', target: 'new3' },
  ],
};

describe('destroy circular layout', () => {
  it('new graph without layout, random by default', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: { type: 'circular' },
    });

    graph.on('canvas:click', e => {

      graph.getNodes().forEach((node, i) => {
        console.log('node', i, node.getModel().x, node.getModel().y);
      })
    })

    graph.once('afterlayout', () => {
      expect(mathEqual(graph.getNodes()[0].getModel().x, 500)).toEqual(true);
      expect(mathEqual(graph.getNodes()[0].getModel().y, 250)).toEqual(true);
      expect(mathEqual(graph.getNodes()[1].getModel().x, 0)).toEqual(true);
      expect(mathEqual(graph.getNodes()[1].getModel().y, 250)).toEqual(true);

      graph.destroyLayout();
      graph.changeData(data2);

      // destroy circular layout 之后，将会使用初始化布局，若节点无坐标信息则自动计算网格状分布
      expect(mathEqual(graph.getNodes()[0].getModel().x, 100)).toEqual(true);
      expect(mathEqual(graph.getNodes()[0].getModel().y, 100)).toEqual(true);
      expect(mathEqual(graph.getNodes()[1].getModel().x, 462.5)).toEqual(true);
      expect(mathEqual(graph.getNodes()[1].getModel().y, 37.5)).toEqual(true);
      expect(mathEqual(graph.getNodes()[2].getModel().x, 37.5)).toEqual(true);
      expect(mathEqual(graph.getNodes()[2].getModel().y, 462.5)).toEqual(true);
      expect(mathEqual(graph.getNodes()[3].getModel().x, 150)).toEqual(true);
      expect(mathEqual(graph.getNodes()[3].getModel().y, 250)).toEqual(true);


      graph.once('afterlayout', () => {
        console.log('graph.getNodes()[0].getModel().x', graph.getNodes());
        graph.getNodes().forEach((node, i) => {
          console.log('node', i, node.getModel().x, node.getModel().y);
        })
        expect(mathEqual(graph.getNodes()[0].getModel().x, 165)).toEqual(true);
        expect(mathEqual(graph.getNodes()[0].getModel().y, 70)).toEqual(true);
        expect(mathEqual(graph.getNodes()[1].getModel().x, 70)).toEqual(true);
        expect(mathEqual(graph.getNodes()[1].getModel().y, 260)).toEqual(true);
        expect(mathEqual(graph.getNodes()[2].getModel().x, 70)).toEqual(true);
        expect(mathEqual(graph.getNodes()[2].getModel().y, 450)).toEqual(true);
        expect(mathEqual(graph.getNodes()[3].getModel().x, 260)).toEqual(true);
        expect(mathEqual(graph.getNodes()[3].getModel().y, 260)).toEqual(true);

        // 不销毁布局 changeData，使用现有布局计算
        graph.changeData(data);
        expect(mathEqual(graph.getNodes()[0].getModel().x, 70)).toEqual(true);
        expect(mathEqual(graph.getNodes()[0].getModel().y, 70)).toEqual(true);
        expect(mathEqual(graph.getNodes()[1].getModel().x, 70)).toEqual(true);
        expect(mathEqual(graph.getNodes()[1].getModel().y, 260)).toEqual(true);

        graph.destroy();
      });
      // update layout 后，根据新的布局计算
      graph.updateLayout({
        type: 'dagre',
      });
      graph.fitView();
    });

    graph.data(data);
    graph.render();
  });
});
