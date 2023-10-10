import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { createDom, modifyCSS } from '@antv/dom-util';
import { debounce, isArray, isString, uniqueId } from '@antv/util';
import { IGraph, PluginBase, IPluginBaseConfig } from '@antv/g6';

export interface MapViewConfig extends IPluginBaseConfig {
  key?: string;
  /** Container for map's container. */
  container?: HTMLDivElement | null;
  /** Class name of map's container. */
  className?: string;
  /** Size of map view. */
  size?: number[];
  /** Theme of the map, 'auto' means follow the graph. */
  theme?: 'light' | 'dark' | 'auto';
  /** Whether enable the brush select on map. */
  enableBrushSelect?: boolean;
  /** Whether enable the hover to activate nodes/edges on map. */
  enableHoverActivate?: boolean;
  /** Whether enable the click to select nodes/edges on map. */
  enableSelect?: boolean;
  /** The activate state name of graph items. */
  activateState?: string;
  /** The select state name of graph items. */
  selectState?: string;
  /** The key on keyboard as assistance of brush. Drag without the key down means drag map. */
  brushKey?: string;
  /** The initial zoom of the map. */
  initialMapZoom?: number;
  /** The initial view center of the map. Initially focus on China.*/
  initialMapCenter?: [number, number];
  /** The css style of the brush DOM. */
  brushCSS?: Partial<CSSStyleDeclaration>;
  /** Gaode's token, we provide a default token but it is not stable, you should replace it in your system. */
  token?: string;
}

export class MapView extends PluginBase {
  private scene: Scene;
  private container: HTMLDivElement;
  private lineLayer: LineLayer;
  private pointLayer: PointLayer;
  private labelLayer: PointLayer;
  private transientLineActiveLayer: LineLayer;
  private transientPointActiveLayer: PointLayer;
  private transientLineSelectLayer: LineLayer;
  private transientPointSelectLayer: PointLayer;
  private inited: boolean;

  constructor(options?: MapViewConfig) {
    super(options);
  }

  public getDefaultCfgs(): MapViewConfig {
    return {
      key: `mapview-${uniqueId()}`,
      container: null,
      lngPropertyName: 'lng',
      latPropertyName: 'lat',
      containerStyle: {
        position: 'absolute',
      },
      className: 'g6-map-view',
      size: [500, 500],
      theme: 'auto',
      enableBrushSelect: true,
      enableHoverActivate: true,
      activateState: 'active',
      enableSelect: true,
      selectState: 'selected',
      brushKey: 'shift',
      initialMapCenter: [101.94365594271085, 40.46139674355291],
      initialMapZoom: 2.7484264183323437,
      brushCSS: {
        border: '1px dashed #227EFF',
      },
      token: 'ff533602d57df6f8ab3b0fea226ae52f',
    };
  }

  public getEvents() {
    return {
      afterrender: this.updateMap,
      afteritemchange: this.updateMap,
      afteritemstatechange: this.updateMapState,
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
    const promise = this.initMap();
    promise.then(() => {
      this.inited = true;
      this.addMapListeners();
      this.updateMap();
    });
  }

  /**
   * Init the DOM container for map.
   */
  public initMap() {
    const { graph, options } = this;
    const {
      size,
      className,
      containerStyle,
      theme,
      initialMapZoom,
      initialMapCenter,
      token,
    } = options;
    let parentNode = options.container;
    const container: HTMLDivElement = createDom(
      `<div class='${className}' style='width: ${size[0]}px; height: ${size[1]}px; overflow: hidden; position: absolute'></div>`,
    );
    const style = {
      left: `${graph.getSize()[0]}px`,
      ...containerStyle,
    };
    modifyCSS(container, style);

    if (isString(parentNode)) {
      parentNode = document.getElementById(parentNode) as HTMLDivElement;
    }

    if (parentNode) {
      parentNode.appendChild(container);
    } else {
      graph.container.appendChild(container);
    }

    if (this.container) {
      this.container.remove();
      this.scene?.destroy();
    }
    this.container = container;

    container.addEventListener('keydown', this.onKeyDown.bind(this));
    container.addEventListener('keyup', this.onKeyUp.bind(this));

    let useTheme = theme;
    if (theme === 'auto') {
      // @ts-ignore
      useTheme = graph.getSpecification().theme?.base || 'light';
    }

    this.scene = new Scene({
      id: container,
      logoVisible: false,
      map: new GaodeMap({
        style: useTheme,
        center: initialMapCenter,
        zoom: initialMapZoom,
        token,
      }),
    });
    return new Promise((resolve) => {
      this.scene.on('loaded', () => {
        const amapCopyRightDom = document.getElementsByClassName(
          'amap-copyright',
        )[0] as HTMLElement;
        amapCopyRightDom?.remove();
        this.scene.setMapStatus({
          dragEnable: true,
          zoomEnable: true,
          resizeEnable: true,
        });

        this.lineLayer = this.newLineLayer({ zIndex: 1 });
        this.pointLayer = this.newPointLayer({ zIndex: 3 });
        this.labelLayer = new PointLayer({ zIndex: 5 });
        this.labelLayer
          .source([], {
            parser: {
              type: 'json',
              x: 'lng',
              y: 'lat',
            },
          })
          .shape('label', 'text')
          .size(12)
          .color(theme === 'dark' ? '#fff' : '#000')
          .style({ textAnchor: 'center', strokeWidth: 1, stroke: '#fff' });
        this.transientLineActiveLayer = this.newLineLayer({
          zIndex: 0,
          size: 3,
        });
        this.transientPointActiveLayer = this.newPointLayer({
          zIndex: 2,
          sizeField: 'actualSize',
          sizeNeedScale: false,
          style: { opacity: 0.25 },
        });
        this.transientLineSelectLayer = this.newLineLayer({
          zIndex: 2,
          size: 2,
        });
        this.transientPointSelectLayer = this.newPointLayer({
          zIndex: 4,
          sizeField: 'actualSize',
          sizeNeedScale: false,
          style: {
            stroke: useTheme === 'dark' ? '#fff' : '#000',
            strokeWidth: 1,
          },
        });
        this.pointLayer.on('add', () => {
          resolve({
            scene: this.scene,
            pointLayer: this.pointLayer,
            lineLayer: this.lineLayer,
          });
        });

        this.scene.addLayer(this.lineLayer);
        this.scene.addLayer(this.pointLayer);
        this.scene.addLayer(this.labelLayer);
        this.scene.addLayer(this.transientLineActiveLayer);
        this.scene.addLayer(this.transientPointActiveLayer);
        this.scene.addLayer(this.transientLineSelectLayer);
        this.scene.addLayer(this.transientPointSelectLayer);
      });
    });
  }

  private newPointLayer(options: any = {}) {
    const {
      sizeField = 'keyShapeSize',
      sizeNeedScale = true,
      style,
      ...others
    } = options;
    const layer = new PointLayer(others);
    layer
      .source([], {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      })
      .shape('shape', (value) => value)
      .color('keyShapeFill')
      .style(
        style || {
          opacity: {
            field: 'keyShapeOpacity',
          },
        },
      );
    if (sizeNeedScale) {
      layer.size(sizeField, [6, 16]);
    } else {
      layer.size(sizeField, (value) => value);
    }
    return layer;
  }

  private newLineLayer(options: any = {}) {
    const { size = 1, ...others } = options;
    const layer = new LineLayer(others);
    layer
      .source([], {
        parser: {
          type: 'json',
          x: 'sourceLng',
          y: 'sourceLat',
          x1: 'targetLng',
          y1: 'targetLat',
        },
      })
      .size(size)
      .shape('arc3d')
      .color('keyShapeStroke', (value) => value)
      .animate({
        enable: true,
        interval: 0.5,
        trailLength: 1,
        duration: 2,
      })
      .style({
        stroke: {
          opacity: 'keyShapeOpacity',
        },
      });
    return layer;
  }

  private addMapListeners() {
    const { graph, options } = this;
    const {
      enableHoverActivate,
      activateState,
      enableSelect,
      selectState,
      enableBrushSelect,
    } = options;

    if (enableBrushSelect) {
      this.scene.on('selecting', this.onBrushing.bind(this));
      this.scene.on('selectend', this.onBrushEnd.bind(this));
    }
    if (enableHoverActivate) {
      this.lineLayer.on('mouseenter', (e) => {
        this.setItemState('edge', [e.feature], activateState);
      });
      this.lineLayer.on('mouseout', (e) => {
        const activeEdgeIds = graph.findIdByState('edge', activateState);
        const features = this.lineLayer
          .getSource()
          .data.dataArray.filter((model) => activeEdgeIds.includes(model.id));
        this.setItemState('edge', features, activateState, false);
      });
      this.pointLayer.on('mouseenter', (e) => {
        this.setItemState('node', [e.feature], activateState);
      });
      this.pointLayer.on('mouseout', (e) => {
        const activeNodeIds = graph.findIdByState('node', activateState);
        const features = this.pointLayer
          .getSource()
          .data.dataArray.filter((model) => activeNodeIds.includes(model.id));
        this.setItemState('node', features, activateState, false);
      });
    }
    if (enableSelect) {
      this.lineLayer.on('click', (e) => {
        this.setItemState('edge', [e.feature], selectState);
      });
      this.lineLayer.on('unclick', (e) => {
        const activeEdgeIds = graph.findIdByState('edge', selectState);
        const features = this.lineLayer
          .getSource()
          .data.dataArray.filter((model) => activeEdgeIds.includes(model.id));
        this.setItemState('edge', features, selectState, false);
        this.setItemState('edge', features, activateState, false);
      });
      this.pointLayer.on('click', (e) => {
        this.setItemState('node', [e.feature], selectState);
      });
      this.pointLayer.on('unclick', (e) => {
        const activeNodeIds = graph.findIdByState('node', selectState);
        const features = this.pointLayer
          .getSource()
          .data.dataArray.filter((model) => activeNodeIds.includes(model.id));
        this.setItemState('node', features, selectState, false);
        this.setItemState('node', features, activateState, false);
      });
    }
  }

  private updateMap = debounce((e: any = {}) => {
    const { action } = e;
    if (action === 'updatePosition') return;
    const { graph, options, inited } = this;
    if (!inited) return;

    const { lngPropertyName, latPropertyName } = options;

    const pointMap = new Map();

    const graphGroup = graph.canvas.getRoot();
    const nodesGroup = graphGroup.getElementById('node-group') || graphGroup;
    const edgesGroup = graphGroup.getElementById('edge-group') || graphGroup;

    const labels = [];
    const points = graph
      .getAllNodesData()
      .map((node) => {
        const itemGroup = nodesGroup.find(
          (ele) => ele.getAttribute('data-item-id') === node.id,
        );
        const keyShape = itemGroup.querySelector('#keyShape');
        const {
          fill: keyShapeFill,
          opacity: keyShapeOpacity = 1,
          r: keyShapeR = 16,
          width: keyShapeWidth = 32,
          height: keyShapeHeight = 32,
        } = keyShape.attributes;
        if (
          typeof node.data[lngPropertyName] !== 'number' ||
          typeof node.data[latPropertyName] !== 'number'
        )
          return false;
        const point = {
          id: node.id,
          lng: node.data[lngPropertyName],
          lat: node.data[latPropertyName],
          shape: keyShape.nodeName,
          keyShapeFill,
          keyShapeOpacity,
          keyShapeSize:
            keyShape.nodeName === 'circle'
              ? keyShapeR
              : [keyShapeWidth, keyShapeHeight],
        };
        pointMap.set(node.id, point);

        const labelShape = itemGroup.querySelector('#labelShape');
        if (labelShape) {
          const { text } = labelShape.attributes;
          text &&
            labels.push({
              id: node.id,
              label: text,
              lng: point.lng,
              lat: point.lat,
            });
        }

        return point;
      })
      .filter(Boolean);
    const lines = graph
      .getAllEdgesData()
      .map((edge) => {
        const sourcePoint = pointMap.get(edge.source);
        const targetPoint = pointMap.get(edge.target);
        if (!sourcePoint || !targetPoint) return false;
        const { lng: sourceLng, lat: sourceLat } = pointMap.get(edge.source);
        const { lng: targetLng, lat: targetLat } = pointMap.get(edge.target);
        const itemGroup = edgesGroup.find(
          (ele) => ele.getAttribute('data-item-id') === edge.id,
        );
        const keyShape = itemGroup.querySelector('#keyShape');
        const {
          lineWidth: keyShapeSize = 1,
          stroke: keyShapeStroke,
          opacity: keyShapeOpacity = 1,
        } = keyShape.attributes;
        return {
          id: edge.id,
          sourceLng,
          sourceLat,
          targetLng,
          targetLat,
          keyShapeSize,
          keyShapeStroke,
          keyShapeOpacity,
        };
      })
      .filter(Boolean);
    this.lineLayer.setData(lines);
    this.pointLayer.setData(points);
    this.labelLayer.setData(labels);
  }, 50);

  private updateMapState(e) {
    const { ids, value, states } = e;
    if (this.pointLayer) {
      const nodes = this.pointLayer
        .getSource()
        .data.dataArray.filter((nodeMapModel) => ids.includes(nodeMapModel.id));
      if (nodes.length) {
        this.setMapItemState('node', nodes, states, value);
      }
    }
    if (this.lineLayer) {
      const edges = this.lineLayer
        .getSource()
        .data.dataArray.filter((edgeMapModel) => ids.includes(edgeMapModel.id));
      if (edges.length) {
        this.setMapItemState('edge', edges, states, value);
      }
    }
  }

  private onKeyDown(e) {
    const { key } = e;
    if (this.options.brushKey === key.toLowerCase()) {
      this.scene.enableBoxSelect(true);
      const brushDOM = document.getElementsByClassName(
        'l7-select-box',
      )[0] as HTMLElement;
      modifyCSS(brushDOM, this.options.brushCSS || {});
    }
  }
  private onKeyUp(e) {
    const { key } = e;
    if (this.options.brushKey === key.toLowerCase()) {
      const brushDom = document.getElementsByClassName(
        'l7-select-box',
      )[0] as HTMLElement;
      if (brushDom) brushDom.style.display = 'none';
      this.scene.disableBoxSelect();
    }
  }

  private onBrushing(bbox, startEvent, endEvent) {
    this.onBrush(bbox, startEvent, endEvent, this.options.activateState);
  }
  private onBrushEnd(bbox, startEvent, endEvent) {
    this.onBrush(bbox, startEvent, endEvent, this.options.selectState);
  }

  private onBrush(bbox, startEvent, endEvent, state) {
    if (!bbox) return;
    const { x: x1, y: y1 } = startEvent;
    const { x: x2, y: y2 } = endEvent;
    this.pointLayer.boxSelect(
      [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)],
      (features) => {
        this.setItemState('node', features, state, true);
      },
    );
    this.lineLayer.boxSelect(
      [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)],
      (features) => {
        this.setItemState('edge', features, state, true);
      },
    );
  }

  private setMapItemState(itemType, mapNodeModels, state, value) {
    const encodedData = this.pointLayer.getEncodedData();
    const transientActiveLayer =
      itemType === 'edge'
        ? this.transientLineActiveLayer
        : this.transientPointActiveLayer;
    const transientSelectLayer =
      itemType === 'edge'
        ? this.transientLineSelectLayer
        : this.transientPointSelectLayer;
    mapNodeModels.forEach((model) => {
      if (state === this.options.activateState) {
        if (!value) {
          transientActiveLayer.setData([]);
          return;
        }
        transientActiveLayer.setData(
          mapNodeModels.map((model) => {
            const encoded = encodedData.find((data) => data.id === model._id);
            const sizeNumber = isArray(encoded.size)
              ? encoded.size[0]
              : encoded.size;
            return {
              ...model,
              actualSize: sizeNumber + 4,
            };
          }),
        );
      } else if (state === this.options.selectState) {
        if (!value) {
          transientSelectLayer.setData([]);
          return;
        }
        transientSelectLayer.setData(
          mapNodeModels.map((model) => {
            const encoded = encodedData.find((data) => data.id === model._id);
            return {
              ...model,
              actualSize: encoded.size,
            };
          }),
        );
      }
    });
  }

  private setItemState(itemType, mapNodeModels, state, value = true) {
    this.setMapItemState(itemType, mapNodeModels, state, value);
    if (value) {
      const stateItems = this.graph.findIdByState(itemType, state);
      this.graph.setItemState(stateItems, state, false);
    }
    this.graph.setItemState(
      mapNodeModels.map((model) => model.id),
      state,
      value,
    );
  }

  public destroy() {
    super.destroy();
    this.scene?.destroy();
    const container = this.container;
    if (container?.parentNode) container.parentNode.removeChild(container);
  }
}
