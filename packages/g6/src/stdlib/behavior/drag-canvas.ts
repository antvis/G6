import { uniqueId } from '@antv/util';
import Graph from '../../runtime/graph';
import { Behavior, BehaviorOption, BehaviorSpecification } from '../../types/behavior';
// TODO: definition of drag-canvas behavior

interface BehaviorInstance {
  destroy(): void;
}

interface DragCanvasOptions { key?: string, assistKey?: 'ctrl' | 'shift' };
export default class DragCanvas extends Behavior {
  constructor(options: DragCanvasOptions) {
    super(options);
  }

  getEvents() {
    return {
      'node:pointerdown': this.onPointerDown,
      'node:pointermove': this.onPointerMove,
      'node:pointerup': this.onPointerUp,
      'combo:dragenter': this.onDragEnter,
      'combo:dragleave': this.onDragLeave,
      'combo:drop': this.onDropCombo,
      'node:drop': this.onDropNode,
      'canvas:drop': this.onDropCanvas,
      'touchstart': this.onTouchStart,
      'touchmove': this.onTouchMove,
      'touchend': this.onDragEnd,
    };
  }


}

const Highlight = (options) => {
  // Initialize.
  return (on) => {
    on('node:mouseenter', (graph: Graph<{}>, event) => {
      graph.setItemState(event.item, 'highlighted', true);
    });
    on('node:mouseleave', (graph, event) => {
      graph.setItemState(event.item, 'highlighted', false);
    });

    return () => {
      // Dispose.
    };
  }
};

const DragNode = () => {
  return {

  };
}
