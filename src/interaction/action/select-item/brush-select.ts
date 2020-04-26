import ActionBase from '../base'
import { IGraph } from '../../../interface/graph';

const { min, max } = Math;

export default class BrushSelect extends ActionBase {
  protected originPoint = null

  start() {
    const event = this.context.event
    this.originPoint = {
      x: event.x,
      y: event.y
    }
  }

  select() {
    if (!this.originPoint) {
      return
    }
    const graph: IGraph = this.getGraph()

    const event = this.context.event
   
    const p1 = { x: event.x, y: event.y };
    const p2 = graph.getPointByCanvas(this.originPoint.x, this.originPoint.y);
    const left = min(p1.x, p2.x);
    const right = max(p1.x, p2.x);
    const top = min(p1.y, p2.y);
    const bottom = max(p1.y, p2.y);
    const selectedNodes = [];
    const selectedIds = [];
    graph.getNodes().forEach(node => {
      const bbox = node.getBBox();
      if (
        bbox.centerX >= left &&
        bbox.centerX <= right &&
        bbox.centerY >= top &&
        bbox.centerY <= bottom
      ) {
        selectedNodes.push(node);
        const model = node.getModel();
        selectedIds.push(model.id);
        graph.setItemState(node, 'selected', true);
      }
    });
    
    const selectedEdges = [];

    // 选中边，边的source和target都在选中的节点中时才选中
    selectedNodes.forEach(node => {
      const edges = node.getEdges();
      edges.forEach(edge => {
        const model = edge.getModel();
        const { source, target } = model;
        if (
          selectedIds.includes(source) &&
          selectedIds.includes(target)
        ) {
          selectedEdges.push(edge);
          graph.setItemState(edge, 'selected', true);
        }
      });
    });

    graph.emit('nodeselectchange', {
      selectedItems: {
        nodes: selectedNodes,
        edges: selectedEdges,
      },
      select: true,
    });
  }
}