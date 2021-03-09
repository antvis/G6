import { IShape } from '@antv/g-base';
import {
  IG6GraphEvent,
  INode,
  IAbstractGraph as Graph,
} from '@antv/g6-core/lib';

export type ShapeEventListner = (
  event: IG6GraphEvent,
  node: INode | null,
  shape: IShape,
  graph: Graph,
) => void;

export interface EventAttrs {
  onClick?: ShapeEventListner;
  onDBClick?: ShapeEventListner;
  onMouseEnter?: ShapeEventListner;
  onMouseMove?: ShapeEventListner;
  onMouseOut?: ShapeEventListner;
  onMouseOver?: ShapeEventListner;
  onMouseLeave?: ShapeEventListner;
  onMouseDown?: ShapeEventListner;
  onMouseUp?: ShapeEventListner;
  onDragStart?: ShapeEventListner;
  onDrag?: ShapeEventListner;
  onDragEnd?: ShapeEventListner;
  onDragEnter?: ShapeEventListner;
  onDragLeave?: ShapeEventListner;
  onDragOver?: ShapeEventListner;
  onDrop?: ShapeEventListner;
  onContextMenu?: ShapeEventListner;
}

const propsToEventMap = {
  click: 'onClick',
  dbclick: 'onDBClick',
  mouseenter: 'onMouseEnter',
  mousemove: 'onMouseMove',
  mouseout: 'onMouseOut',
  mouseover: 'onMouseOver',
  mouseleave: 'onMouseLeave',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  dragstart: 'onDragStart',
  drag: 'onDrag',
  dragend: 'onDragEnd',
  dragenter: 'onDragEnter',
  dragleave: 'onDragLeave',
  dragover: 'onDragOver',
  drop: 'onDrop',
  contextmenu: 'onContextMenu',
};

export function appenAutoShapeListener(graph: Graph) {
  Object.entries(propsToEventMap).map(([eventName, propName]) => {
    graph.on(`node:${eventName}`, (evt) => {
      const shape = evt.shape;
      const item = evt.item as INode;
      const graph = evt.currentTarget as Graph;
      const func = shape?.get(propName) as ShapeEventListner;

      if (func) {
        func(evt, item, shape, graph);
      }
    });
  });
}
