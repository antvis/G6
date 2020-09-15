import { G6Event, IG6GraphEvent } from '../types';
import { mat3 } from '@antv/matrix-util';
import { clone } from '@antv/util';

const DELTA = 0.05;

export default {
  getDefaultCfg(): object {
    return {
      sensitivity: 2,
      minZoom: undefined,
      maxZoom: undefined,
      enableOptimize: false,
      optimizeZoom: 0.7,
      fixSelectedItems: {
        fixAll: false,
        fixLineWidth: false,
        fixLabel: false,
        fixState: 'selected',
      },
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    const { fixSelectedItems } = this;

    if (!fixSelectedItems.fixState) fixSelectedItems.fixState = 'selected';
    if (fixSelectedItems.fixAll) {
      fixSelectedItems.fixLineWidth = true;
      fixSelectedItems.fixLabel = true;
    }

    return {
      wheel: 'onWheel',
    };
  },
  onWheel(e: IG6GraphEvent) {
    const { graph, fixSelectedItems } = this;
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    e.preventDefault();
    const canvas = graph.get('canvas');
    const point = canvas.getPointByClient(e.clientX, e.clientY);
    const sensitivity = this.get('sensitivity');
    const graphZoom = graph.getZoom();
    let ratio = graphZoom;
    let zoom = graphZoom;
    // 兼容IE、Firefox及Chrome
    if (e.wheelDelta < 0) {
      ratio = 1 - DELTA * sensitivity;
    } else {
      ratio = 1 / (1 - DELTA * sensitivity);
    }
    zoom = graphZoom * ratio;
    // const zoom = ratio * graphZoom;
    const minZoom = this.get('minZoom') || graph.get('minZoom');
    const maxZoom = this.get('maxZoom') || graph.get('maxZoom');
    if (zoom > maxZoom || zoom < minZoom) {
      return;
    }

    // hide the shapes when the zoom ratio is smaller than optimizeZoom
    // hide the shapes when zoomming
    const enableOptimize = this.get('enableOptimize');
    if (enableOptimize) {
      const optimizeZoom = this.get('optimizeZoom');
      const optimized = this.get('optimized');
      const nodes = graph.getNodes();
      const edges = graph.getEdges();
      const nodesLength = nodes.length;
      const edgesLength = edges.length;

      // hiding
      if (!optimized) {
        for (let n = 0; n < nodesLength; n++) {
          const node = nodes[n];
          if (!node.destroyed) {
            const children = node.get('group').get('children');
            const childrenLength = children.length;
            for (let c = 0; c < childrenLength; c++) {
              const shape = children[c];
              if (!shape.destoryed && !shape.get('isKeyShape')) {
                shape.hide();
              }
            }
          }
        }

        for (let edgeIndex = 0; edgeIndex < edgesLength; edgeIndex++) {
          const edge = edges[edgeIndex];
          const children = edge.get('group').get('children');
          const childrenLength = children.length;
          for (let c = 0; c < childrenLength; c++) {
            const shape = children[c];
            shape.hide();
          }
        }
        this.set('optimized', true);
      }


      // showing after 100ms
      clearTimeout(this.get('timeout'));
      const timeout = setTimeout(() => {
        const currentZoom = graph.getZoom();
        const curOptimized = this.get('optimized');
        if (curOptimized) {
          this.set('optimized', false);
          for (let n = 0; n < nodesLength; n++) {
            const node = nodes[n];
            const children = node.get('group').get('children');
            const childrenLength = children.length;
            if (currentZoom < optimizeZoom) {
              node.getKeyShape().show();
            } else {
              for (let c = 0; c < childrenLength; c++) {
                const shape = children[c];
                if (!shape.get('visible')) {
                  shape.show();
                }
              }
            }
          }

          for (let edgeIndex = 0; edgeIndex < edgesLength; edgeIndex++) {
            const edge = edges[edgeIndex];
            const children = edge.get('group').get('children');
            const childrenLength = children.length;
            if (currentZoom < optimizeZoom) {
              edge.getKeyShape().show();
            } else {
              for (let c = 0; c < childrenLength; c++) {
                const shape = children[c];
                if (!shape.get('visible')) {
                  shape.show();
                }
              }
            }
          }
        }
      }, 500);
      this.set('timeout', timeout);
    }

    // fix the items when zooming
    if (graphZoom <= 1) {
      let fixNodes, fixEdges;
      if (fixSelectedItems.fixAll || fixSelectedItems.fixLineWidth || fixSelectedItems.fixLabel) {
        fixNodes = graph.findAllByState('node', fixSelectedItems.fixState);
        fixEdges = graph.findAllByState('edge', fixSelectedItems.fixState);

        const scale = graphZoom / zoom;
        const fixNodesLength = fixNodes.length;
        for (let fn = 0; fn < fixNodesLength; fn++) {
          const node = fixNodes[fn];
          const group = node.getContainer();
          const nodeModel = node.getModel();
          const originStyle = node.getOriginStyle();
          const itemStateStyle = node.getStateStyle(fixSelectedItems.fixState);
          const shapeStateStyle = node
            .get('shapeFactory')
            .getShape(nodeModel.shape || nodeModel.type)
            .getStateStyle(fixSelectedItems.fixState, node)[fixSelectedItems.fixState];
          if (fixSelectedItems.fixAll) {
            if (zoom <= 1) {
              let groupMatrix = clone(group.getMatrix());
              if (!groupMatrix) groupMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
              const { x, y } = node.getModel();
              mat3.translate(groupMatrix, groupMatrix, [-x, -y]);
              mat3.scale(groupMatrix, groupMatrix, [scale, scale]);
              mat3.translate(groupMatrix, groupMatrix, [x, y]);
              group.setMatrix(groupMatrix);
            }
          } else {
            const children = group.get('children');
            const childrenLength = children.length;
            for (let c = 0; c < childrenLength; c++) {
              const shape = children[c];
              let fontSize, lineWidth;
              if (fixSelectedItems.fixLabel) {
                const shapeType = shape.get('type');
                if (shapeType === 'text') {
                  fontSize = shape.attr('fontSize') || 12;
                  const itemStyle = itemStateStyle[shape.get('name')];
                  const shapeStyle = shapeStateStyle[shape.get('name')];
                  const itemFontSize = itemStyle ? itemStyle.fontSize : 12;
                  const shapeFontSize = shapeStyle ? shapeStyle.fontSize : 12;
                  const oriFontSize = itemFontSize || shapeFontSize || 12;
                  if (zoom <= 1) shape.attr('fontSize', oriFontSize / zoom); // * graphZoom / zoom
                  if (lineWidth) break;
                }
              }
              if (fixSelectedItems.fixLineWidth) {
                if (shape.get('isKeyShape')) {
                  lineWidth = shape.attr('lineWidth') || 0;
                  const oriLineWidth = itemStateStyle.lineWidth || shapeStateStyle.lineWidth || originStyle.lineWidth || 0;
                  if (zoom <= 1) shape.attr('lineWidth', oriLineWidth / zoom); // * graphZoom / zoom
                  if (fontSize) break;
                }
              }
            }
          }
        }

        const fixEdgesLength = fixEdges.length;
        for (let fe = 0; fe < fixEdgesLength; fe++) {
          const edge = fixEdges[fe];
          const group = edge.getContainer();
          const children = group.get('children');
          const nodeModel = edge.getModel();
          const itemStateStyle = edge.getStateStyle(fixSelectedItems.fixState);
          const shapeStateStyle = edge
            .get('shapeFactory')
            .getShape(nodeModel.shape || nodeModel.type)
            .getStateStyle(fixSelectedItems.fixState, edge)[fixSelectedItems.fixState];

          const childrenLength = children.length;
          for (let c = 0; c < childrenLength; c++) {
            const shape = children[c];
            let fontSize, lineWidth;
            if (fixSelectedItems.fixLabel || fixSelectedItems.fixAll) {
              const shapeType = shape.get('type');
              if (shapeType === 'text') {
                fontSize = shape.attr('fontSize') || 12;
                const itemStyle = itemStateStyle[shape.get('name')];
                const shapeStyle = shapeStateStyle[shape.get('name')];
                const itemFontSize = itemStyle ? itemStyle.fontSize : 12;
                const shapeFontSize = shapeStyle ? shapeStyle.fontSize : 12;
                const oriFontSize = itemFontSize || shapeFontSize || 12;
                if (zoom <= 1) shape.attr('fontSize', oriFontSize / zoom);
                if (lineWidth) break;
              }
            }
            if (fixSelectedItems.fixLineWidth || fixSelectedItems.fixAll) {
              if (shape.get('isKeyShape')) {
                lineWidth = shape.attr('lineWidth') || 0;
                const oriLineWidth = itemStateStyle.lineWidth || shapeStateStyle.lineWidth || 1;
                if (zoom <= 1) shape.attr('lineWidth', oriLineWidth / zoom);
                if (fontSize) break;
              }
            }
          }
        }
      }
    }
    graph.zoomTo(zoom, { x: point.x, y: point.y });
    graph.emit('wheelzoom', e);
  },
};
