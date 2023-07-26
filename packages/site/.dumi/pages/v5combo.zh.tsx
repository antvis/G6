import React, { useEffect, useRef, useState } from 'react';

const isBrowser = typeof window !== 'undefined';
const G6 = isBrowser ? window.g6v5 : null;

let graph;

const V5Combo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [updateComboStructure, setUpdateComboStructure] = useState(false);
  useEffect(() => {
    graph = new G6.Graph({
      container: ref.current,
      width: 1000,
      height: 1000,
      type: 'graph',
      node: {
        labelShape: {
          position: 'bottom',
          text: {
            fields: ['id'],
            formatter: (model) => model.id,
          },
        },
        labelBackgroundShape: {},
        animates: {
          update: [
            {
              fields: ['opacity'],
              shapeId: 'haloShape',
            },
          ],
        },
      },
      combo: (model) => {
        return {
          id: model.id,
          data: {
            ...model.data,
            keyShape: {
              padding: [10, 10, 10, 10],
              r: 50,
            },
            labelShape: {
              text: model.id,
            },

            animates: {
              buildIn: [
                {
                  fields: ['opacity'],
                  duration: 500,
                  delay: 500 + Math.random() * 500,
                },
              ],
              buildOut: [
                {
                  fields: ['opacity'],
                  duration: 200,
                },
              ],
              update: [
                {
                  fields: ['lineWidth', 'r'],
                  shapeId: 'keyShape',
                  duration: 800,
                },
                {
                  fields: ['opacity'],
                  shapeId: 'haloShape',
                  duration: 500,
                },
              ],
            },
          },
        };
      },
      data: {
        nodes: [
          { id: 'node1', data: { parentId: 'combo1', x: 250, y: 100 } },
          { id: 'node2', data: { parentId: 'combo1', x: 350, y: 100 } },
          { id: 'node3', data: { parentId: 'combo2', x: 100, y: 300 } },
          { id: 'node4', data: { parentId: 'combo1', x: 350, y: 200 } },
          { id: 'node5', data: { x: 600, y: 300} },
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: {} },
          { id: 'edge2', source: 'node1', target: 'node3', data: {} },
          { id: 'edge3', source: 'node1', target: 'node4', data: {} },
          { id: 'edge4', source: 'node2', target: 'node4', data: {} },
          { id: 'edge5', source: 'node3', target: 'node4', data: {} },
          { id: 'edge6', source: 'node4', target: 'node5', data: {} },
        ],
        combos: [
          { id: 'combo1', data: { parentId: 'combo2' } },
          { id: 'combo2', data: {} },
        ],
      },
      modes: {
        default: [
          'collapse-expand-combo',
          {
            type: 'drag-node',
            key: 'drag-node-behavior',
            enableTransient: false
          },
          'drag-canvas',
          'zoom-canvas',
          {
            type: 'click-select',
            itemTypes: ['node', 'edge', 'combo'],
          },
          {
            type: 'hover-activate',
            itemTypes: ['node', 'edge'],
          },
          {
            type: 'drag-combo',
            key: 'drag-combo-behavior',
            enableTransient: false
          }
        ],
      },
    });
  }, []);

  useEffect(() => {
    if (!graph) return;
    debugger
    graph.updateBehavior({
      type: 'drag-combo',
      key: 'drag-node-behavior',
      updateComboStructure
    }, 'default');
    graph.updateBehavior({
      type: 'drag-combo',
      key: 'drag-combo-behavior',
      updateComboStructure
    }, 'default');
  }, [updateComboStructure])

  return (
    <div ref={ref}>
      <div style={{ display: 'inline-flex', position: 'absolute', left: '16px', top: '16px', zIndex: 1 }}>
        <div>拖拽 combo 时：</div>
        <select
          className='update-combo-structure'
          onChange={val => setUpdateComboStructure(val.target?.value === 'structure')}
        >
          <option value='structure'>更新结构</option>
          <option value='size'>更新大小</option>
        </select>
      </div>
    </div>
  );
};

export default V5Combo;