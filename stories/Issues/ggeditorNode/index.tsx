import React, { useRef, useEffect } from 'react';
import G6 from '../../../src';
import './baseNode';
// import "./styles.css";

function getNodeSide(item): 'left' | 'right' {
  const model = item.getModel();

  if (model.side) {
    return model.side as 'left' | 'right';
  }

  const parent = item.get('parent');

  if (parent) {
    return getNodeSide(parent);
  }

  return 'right';
}

function getRectPath(x: number, y: number, w: number, h: number, r: number) {
  if (r) {
    return [
      ['M', +x + +r, y],
      ['l', w - r * 2, 0],
      ['a', r, r, 0, 0, 1, r, r],
      ['l', 0, h - r * 2],
      ['a', r, r, 0, 0, 1, -r, r],
      ['l', r * 2 - w, 0],
      ['a', r, r, 0, 0, 1, -r, -r],
      ['l', 0, r * 2 - h],
      ['a', r, r, 0, 0, 1, r, -r],
      ['z'],
    ];
  }

  const res = [['M', x, y], ['l', w, 0], ['l', 0, h], ['l', -w, 0], ['z']];

  res.toString = toString;

  return res;
}

function getUnfoldButtonPath() {
  const w = 14;
  const h = 14;
  const rect = getRectPath(0, 0, w, h, 2);
  const hp = `M${(w * 3) / 14},${h / 2}L${(w * 11) / 14},${h / 2}`;
  const vp = `M${w / 2},${(h * 3) / 14}L${w / 2},${(h * 11) / 14}`;

  return rect + hp + vp;
}

function getFoldButtonPath() {
  const w = 14;
  const h = 14;
  const rect = getRectPath(0, 0, w, h, 2);
  const hp = `M${(w * 3) / 14},${h / 2}L${(w * 11) / 14},${h / 2}`;
  const vp = '';

  return rect + hp + vp;
}

export const FOLD_BUTTON_CLASS_NAME = 'node-fold-button';
export const UNFOLD_BUTTON_CLASS_NAME = 'node-unfold-button';

const bizMindNode = {
  afterDraw(model, group) {
    this.drawButton(model, group);
  },

  afterUpdate(model, item) {
    const group = item.getContainer();

    this.drawButton(model, group);
    this.adjustButton(model, item);
  },

  drawButton(model, group) {
    const { children, collapsed } = model;

    [FOLD_BUTTON_CLASS_NAME, UNFOLD_BUTTON_CLASS_NAME].forEach((className) => {
      const shape = group.findByClassName(className);

      if (shape) {
        shape.destroy();
      }
    });

    if (!children || !children.length) {
      return;
    }

    if (!collapsed) {
      group.addShape('path', {
        className: FOLD_BUTTON_CLASS_NAME,
        attrs: {
          path: getFoldButtonPath(),
          fill: 'red',
          stroke: '#ccc1d8',
        },
      });
    } else {
      group.addShape('path', {
        className: UNFOLD_BUTTON_CLASS_NAME,
        attrs: {
          path: getUnfoldButtonPath(),
          fill: 'blue',
          stroke: '#ccc1d8',
        },
      });
    }
  },

  adjustButton(model, item) {
    const { children, collapsed } = model;

    if (!children || !children.length) {
      return;
    }

    const group = item.getContainer();
    const shape = group.findByClassName(
      !collapsed ? FOLD_BUTTON_CLASS_NAME : UNFOLD_BUTTON_CLASS_NAME,
    );

    const [width, height] = this.getSize(model);

    const x = getNodeSide(item) === 'left' ? -24 : width + 10;
    const y = height / 2 - 9;

    shape.translate(x, y);
  },

  getAnchorPoints() {
    return [
      [0, 0.5],
      [1, 0.5],
    ];
  },
};

G6.registerNode('bizMindNode', bizMindNode, 'bizNode');

G6.registerNode('pathNode', {
  draw(cfg, group) {
    return group.addShape('path', {
      className: FOLD_BUTTON_CLASS_NAME,
      attrs: {
        path: getFoldButtonPath(),
        fill: 'red',
        stroke: '#ccc1d8',
      },
    });
  },
});

export default () => {
  const graphContainer = useRef(null);
  let graph = null;

  // 图初始化
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: graphContainer.current,
        width: 500,
        height: 500,
        // layout: {
        //   type: 'mindmap',
        //   direction: 'H',
        //   getHeight: () => {
        //     return 16;
        //   },
        //   getWidth: () => {
        //     return 16;
        //   },
        //   getVGap: () => {
        //     return 180;
        //   },
        //   getHGap: () => {
        //     return 150;
        //   },
        // },
        defaultNode: {
          type: 'pathNode',
        },

        defaultEdge: {
          type: 'cubic-vertical',
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: '#C2C8D5',
          },
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'click-select'],
        },
        fitView: true,
      });
    }

    // const data = {
    //   id: '0',
    //   label: 'Central Topic',
    //   children: [
    //     {
    //       id: '1',
    //       side: 'left',
    //       label: 'Main Topic 1',
    //     },
    //     {
    //       id: '2',
    //       side: 'right',
    //       label: 'Main Topic 2',
    //     },
    //     {
    //       id: '3',
    //       side: 'right',
    //       label: 'Main Topic 3',
    //     },
    //   ],
    // };

    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
      ],
    };

    graph.data(data);
    graph.render();

    graph.on('click', (evt) => {
      console.log(evt);
    });
  }, []);

  return (
    <div>
      <div ref={graphContainer} />
    </div>
  );
};
