import { G6Event, IG6GraphEvent } from '@antv/g6-core';
import { ext } from '@antv/matrix-util';
import { clone } from '@antv/util';

const { transform } = ext;
const DELTA = 0.05;

export default {
  getDefaultCfg(): object {
    return {
      sensitivity: 2,
      minZoom: undefined,
      maxZoom: undefined,
      enableOptimize: false,
      optimizeZoom: 0.1,
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
      touchstart: 'onTouchStart',
      touchmove: 'onTouchMove',
      touchend: 'onTouchEnd',
    };
  },
  onTouchStart(evt) {
    const touches = evt.originalEvent.touches;
    const event1 = touches[0];
    const event2 = touches[1];
    evt.preventDefault();

    // 如果不是缩放事件则禁止继续执行
    if (!event2) {
      return;
    }

    if (this.shouldBegin && !this.shouldBegin.call(this, evt)) {
      return;
    }

    // 第一个触摸点位置
    this.startPoint = {
      pageX: event1.pageX,
      pageY: event1.pageY,
    };

    this.moveable = true;

    if (event2) {
      this.endPoint = {
        pageX: event2.pageX,
        pageY: event2.pageY,
      };
    }

    this.originScale = this.currentScale || 1;
  },
  onTouchMove(evt) {
    if (!this.moveable) {
      return;
    }

    evt.preventDefault();

    const touches = evt.originalEvent.touches;
    const event1 = touches[0];
    const event2 = touches[1];

    if (!event2) {
      return;
    }

    if (!this.endPoint) {
      this.endPoint = {
        pageX: event2.pageX,
        pageY: event2.pageY,
      };
    }

    // 获取坐标之间的距离
    const getDistance = (start, end) => Math.hypot(end.x - start.x, end.y - start.y);

    // 双指缩放比例
    const scale =
      getDistance(
        {
          x: event1.pageX,
          y: event1.pageY,
        },
        {
          x: event2.pageX,
          y: event2.pageY,
        },
      ) /
      getDistance(
        {
          x: this.startPoint.pageX,
          y: this.startPoint.pageY,
        },
        {
          x: this.endPoint.pageX,
          y: this.endPoint.pageY,
        },
      );

    // 应用到画布上的缩放比例
    const zoom = this.originScale * scale;

    // 缓存当前的缩放比例
    this.currentScale = zoom;

    const minZoom = this.get('minZoom') || this.graph.get('minZoom');
    const maxZoom = this.get('maxZoom') || this.graph.get('maxZoom');
    if (zoom > maxZoom || zoom < minZoom) {
      return;
    }

    const canvas = this.graph.get('canvas');
    const point = canvas.getPointByClient(evt.clientX, evt.clientY);
    this.graph.zoomTo(zoom, { x: point.x, y: point.y });
    this.graph.emit('wheelzoom', evt);
  },
  onTouchEnd() {
    this.moveable = false;
    this.endPoint = null;
  },
  onWheel(e: IG6GraphEvent) {
    const { graph, fixSelectedItems } = this;

    if (this.shouldBegin && !this.shouldBegin.call(this, e)) {
      return;
    }

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
                shape.set('ori-visibility', shape.get('ori-visibility') || shape.get('visible'));
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
            shape.set('ori-visibility', shape.get('ori-visibility') || shape.get('visible'));
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
              const keyShape = node.getKeyShape();
              const oriVis = keyShape.get('ori-visibility');
              if (oriVis) keyShape.show();
            } else {
              for (let c = 0; c < childrenLength; c++) {
                const shape = children[c];
                const oriVis = shape.get('ori-visibility');
                if (!shape.get('visible') && oriVis) {
                  if (oriVis) shape.show();
                }
              }
            }
          }

          for (let edgeIndex = 0; edgeIndex < edgesLength; edgeIndex++) {
            const edge = edges[edgeIndex];
            const children = edge.get('group').get('children');
            const childrenLength = children.length;
            if (currentZoom < optimizeZoom) {
              const keyShape = edge.getKeyShape();
              const oriVis = keyShape.get('ori-visibility');
              if (oriVis) keyShape.show();
            } else {
              for (let c = 0; c < childrenLength; c++) {
                const shape = children[c];
                if (!shape.get('visible')) {
                  const oriVis = shape.get('ori-visibility');
                  if (oriVis) shape.show();
                }
              }
            }
          }
        }
      }, 100);
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
            .getShape(nodeModel.type)
            .getStateStyle(fixSelectedItems.fixState, node)[fixSelectedItems.fixState];
          if (fixSelectedItems.fixAll) {
            if (zoom <= 1) {
              let groupMatrix = clone(group.getMatrix());
              if (!groupMatrix) groupMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
              const { x, y } = node.getModel();
              groupMatrix = transform(groupMatrix, [
                ['t', -x, -y],
                ['s', scale, scale],
                ['t', x, y],
              ]);
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
                  const oriLineWidth =
                    itemStateStyle.lineWidth ||
                    shapeStateStyle.lineWidth ||
                    originStyle.lineWidth ||
                    0;
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
            .getShape(nodeModel.type)
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
