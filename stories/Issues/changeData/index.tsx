import React, { useRef, useEffect } from 'react';
import G6 from '../../../src';
import isArray from '@antv/util/lib/is-array';
import { data } from './data';
// import "./styles.css";

/**
 * 【问题】！！！
 * 当我点击“隐藏节点”后，节点正常隐藏
 * 但是点击“改变数据”调用changeData方法后，节点能隐藏，但是边又显示出来了。
 */
export default () => {
  const graphContainer = useRef(null);
  let graph = useRef(null);

  // 图初始化
  useEffect(() => {
    if (!graph.current) {
      graph.current = new G6.Graph({
        container: graphContainer.current,
        width: 1580,
        height: 1080,
        defaultNode: {
          type: 'circle',
          size: 50,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          controlPoints: true,
        },
        modes: {
          default: [
            'drag-canvas',
            {
              type: 'zoom-canvas',
              minZoom: 0.5,
              maxZoom: 2,
            },
          ],
        },
        animate: true,
      });
    }

    graph.current && graph.current.data(data);
    graph.current && graph.current.render();
  }, []);

  /**
   * 手动合并数据，达到异步加载的效果
   * @param {*} data  后端返回的新数据
   */
  const handleChangeData = (data) => {
    const prevData = graph.current && graph.current.save();
    // mergeWith
    const newData = Object.assign({}, prevData, data, (objValue, srcValue) => {
      if (isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    });

    console.log('newData', prevData, data, newData);
    graph.current && graph.current.changeData(newData);
  };

  /**
   * 模拟点击加载数据
   * 模拟点击AoJc4qPcWeOL7NJwOh6[加工输出表]节点后，后端返回异步加载的数据
   */
  const handleLoadData = () => {
    const mockData = {
      nodes: [
        {
          id: 'node6',
          label: '新增报告',
        },
        {
          id: 'node5',
          label: '新增报告1',
        },
      ],
      edges: [
        {
          source: 'node5',
          target: 'node6',
        },
      ],
    };
    handleChangeData(mockData);
  };

  /**
   * 递归隐藏节点和边
   */
  const collapsePrev = (node) => {
    const edges = node.getInEdges();
    edges.forEach((edge) => {
      edge.hide();
      const sourceNode = edge.getSource();
      if (sourceNode.getOutEdges().length === 1) {
        sourceNode.hide();
        collapsePrev(sourceNode);
      }
    });
  };

  /**
   * 模拟折叠node2节点
   */
  const handleHideNode = () => {
    const node = graph.current.findById('node2');
    collapsePrev(node);
  };

  return (
    <div>
      <button onClick={handleHideNode}>隐藏节点</button>
      <button onClick={handleLoadData}>改变数据</button>
      <div ref={graphContainer} className={'graph-container'} />
    </div>
  );
};
