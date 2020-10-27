import React, { useRef, useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { G6Event } from '../../../src/types';

G6.registerNode(
  "card-node",
  {
    drawShape: function drawShape(cfg, group) {
      const shape = group.addShape("rect", {
        attrs: {
          x: 0,
          y: 0,
          width: 200,
          height: 100,
          fill: "#f00",
        }
      });
      group.addGroup();
      return shape;
    },
    update: undefined
  }
);

export default () => {
  const graphContainer = useRef(null);
  let graph: IGraph = null;

  // 图初始化
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: graphContainer.current,
        width: 500,
        height: 500,
      });
    }

    const data = {
      nodes: [
        {
          id: "node1", // String，该节点存在则必须，节点的唯一标识
          type: "card-node",
          placeholder: "暂无内容请",
          title: "节点1",
          x: 100,
          y: 100
        },
        {
          id: "node2",
          type: "card-node",
          placeholder: "暂无内容请",
          title: "节点2",
          x: 3000,
          y: -100
        }
      ]
    };

    graph.data(data);
    graph.render();

    graph.on('canvas:click', (evt) => {
      const node = graph.findById("node2");
      graph.update(node, { placeholder: "new placeholder" });
    });
  }, []);


  return (
    <div>
      <div ref={graphContainer} className={'graph-container'} />
    </div>
  );
};
