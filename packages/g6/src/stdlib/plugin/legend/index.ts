import { createDom } from '@antv/dom-util';
import { Canvas, Circle, DisplayObject, Line } from '@antv/g';
import { ID } from '@antv/graphlib';
import { Category } from '@antv/gui';
import { isFunction, upperFirst } from '@antv/util';
import { IGraph } from '../../../types';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { createCanvas } from '../../../util/canvas';
import { ShapeTagMap, formatPadding } from '../../../util/shape';

type ItemLegendConfig = {
  // whether show the item legend
  enable: boolean;
  // the field name of the item type
  typeField?: string;
  // title of the item legend
  title?: string;
  // number of rows
  rows?: number;
  // number of cols
  cols?: number;
  // padding between cols
  colPadding?: number;
  // padding between rows
  rowPadding?: number;
  // padding of the item legend
  padding?: number | number[];
  // formatter for the label
  labelFormatter?: (type: string) => string;
  // style for the label
  labelStyle?: {
    [shapeAttr: string]: unknown;
  };
  // style config or mapper for the marker, could be value/map/function
  markerStyle?: {
    shape?: string | { [nodeType: string]: string };
    size?: number | number[] | { [nodeType: string]: number | number[] };
    color?: string | { [nodeType: string]: string };
    [styleName: string]: unknown | { [nodeType: string]: unknown };
  };
};

export interface LegendConfig extends IPluginBaseConfig {
  // container for the legend, using graph's container by default
  container?: HTMLDivElement | null;
  // className for the DOM wrapper, "g6-category-legend" by default
  className?: string;
  // size for the legend canvas, 'fit-content', or an array of number(px) and string(percentage with %)
  size?: 'fit-content' | [number | string, number | string];
  // orientation for the legend layout
  orientation?: 'horizontal' | 'vertical';
  // Selected state name, triggered while clicking a legend item. Click will not take effect if selectedState is not assigned
  selectedState?: string;
  // Active state name, triggered while mouseenter a legend item. Mouseenter will not take effect if activeState is not assigned
  activeState?: string;
  // Inactive state name, triggered on other items while mouseenter a legend item. Mouseleave will not take effect if inactiveState is not assigned
  inactiveState?: string;
  // config for the node legend
  node?: ItemLegendConfig;
  // config for the edge legend
  edge?: ItemLegendConfig;
}

export class Legend extends Base {
  private nodeLegend: Category;
  private edgeLegend: Category;
  private wrapper: HTMLDivElement;
  private canvas: Canvas;
  private size: ('fit-content' | number)[];
  private selectedTypes: {
    node: Set<string>;
    edge: Set<string>;
  };
  private activeType: {
    node: string | undefined;
    edge: string | undefined;
  };
  private selectedIds: {
    node: Set<ID>;
    edge: Set<ID>;
  };
  private activeIds: {
    node: Set<ID>;
    edge: Set<ID>;
  };
  private styleCache: {
    node: {
      [type: string]: any;
    };
    edge: {
      [type: string]: any;
    };
  };

  constructor(options?: LegendConfig) {
    super(options);
  }

  public getDefaultCfgs(): LegendConfig {
    return {
      container: null,
      className: 'g6-category-legend',
      orientation: 'horizontal',
      selectedState: 'selected',
      activeState: 'active',
    };
  }

  public getEvents() {
    return {
      afterrender: this.updateLegend,
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
    const { size = 'fit-content', orientation } = this.options;
    const graphSize = graph.getSize();
    this.size = size;
    this.selectedTypes = {
      node: new Set<string>(),
      edge: new Set<string>(),
    };
    this.activeType = {
      node: undefined,
      edge: undefined,
    };
    this.selectedIds = {
      node: new Set<string>(),
      edge: new Set<string>(),
    };
    this.activeIds = {
      node: new Set<string>(),
      edge: new Set<string>(),
    };
    this.styleCache = {
      node: {},
      edge: {},
    };
    // If size is set to "fit-content", sets the size of the legend canvas to fit the content.
    if (size === 'fit-content') {
      this.size = [
        orientation === 'horizontal' ? graphSize[0] : 'fit-content',
        orientation === 'horizontal' ? 'fit-content' : graphSize[1],
      ];
    }
    // If size is set to "100%", sets the size of the legend canvas to match the size of the graph.
    if (size[0].includes('%')) {
      const ratio = Number(size[0].replace('%')) / 100 || 1;
      this.size[0] = graphSize[0] * ratio;
    } else if (typeof size[0] === 'number') {
      // Otherwise, sets the size of the legend canvas to the specified size.
      this.size[0] = size[0];
    }
    // If size is set to "100%", sets the size of the legend canvas to match the size of the graph.
    if (size[1] === '100%') {
      const ratio = Number(size[0].replace('%')) / 100 || 1;
      this.size[1] = graphSize[1] * ratio;
    } else if (typeof size[1] === 'number') {
      // Otherwise, sets the size of the legend canvas to the specified size.
      this.size[1] = size[1];
    }
  }

  /**
   * Update or create the legend including node and edge legend.
   */
  private updateLegend() {
    const { size } = this;

    // If wrapper does not exist, create it
    if (!this.wrapper) {
      this.wrapper = this.createWrapper();
    }
    // If canvas does not exist, create it
    if (!this.canvas) {
      const canvasSize = [
        size[0] === 'fit-content' ? 0 : size[0],
        size[1] === 'fit-content' ? 0 : size[1],
      ];
      this.canvas = createCanvas(
        'canvas',
        this.wrapper,
        canvasSize[0],
        canvasSize[1],
      );
      // Set canvas background color
      // TODO: update type define.
      // @ts-ignore
      this.canvas.context.config.canvas.style.backgroundColor =
        'rgba(255, 255, 255, 0.8)';

      // Add click event listener to canvas
      this.canvas.addEventListener('click', (evt) => {
        // If the click target is not canvas, return
        if (evt.target?.nodeName !== 'document') return;

        // Clear relevant states on the graph
        const { graph, options } = this;
        const { activeState, selectedState } = options;
        if (this.activeIds.node.size)
          graph.clearItemState(Array.from(this.activeIds.node), activeState);
        if (this.activeIds.edge.size)
          graph.clearItemState(Array.from(this.activeIds.edge), activeState);
        this.activeIds = {
          node: new Set<ID>(),
          edge: new Set<ID>(),
        };
        if (selectedState) {
          const { node: selectedNodes, edge: selectedEdges } = this.selectedIds;
          graph.clearItemState(Array.from(selectedNodes), selectedState);
          graph.clearItemState(Array.from(selectedEdges), selectedState);
          this.selectedIds = {
            node: new Set<ID>(),
            edge: new Set<ID>(),
          };
        }

        // Clear legend states
        this.selectedTypes.node.forEach((nodeType) => {
          const marker = this.canvas
            .getRoot()
            .querySelector(`#marker-node-${nodeType}`);
          if (!marker) return;
          const lineWidth = this.styleCache.node[nodeType].lineWidth;
          marker.style.lineWidth = lineWidth;
        });
        this.selectedTypes.edge.forEach((edgeType) => {
          const marker = this.canvas
            .getRoot()
            .querySelector(`#marker-edge-${edgeType}`);
          if (!marker) return;
          const lineWidth = this.styleCache.edge[edgeType].lineWidth;
          marker.style.lineWidth = lineWidth;
        });
        this.selectedTypes = {
          node: new Set<string>(),
          edge: new Set<string>(),
        };
        this.activeType = {
          node: undefined,
          edge: undefined,
        };
      });
    }

    const promise = this.canvas.ready;
    promise.then(() => {
      this.nodeLegend = this.upsertLegend('node');
      this.edgeLegend = this.upsertLegend('edge');
      this.updateLayout();
    });
  }

  /**
   * Creates a wrapper div element for the graph and appends it to the container.
   * @returns {HTMLDivElement} - The created wrapper div element.
   */
  private createWrapper() {
    const { options, graph, size } = this;
    const { container: propContainer, className } = options;
    let container: any = propContainer;
    // If the container is a string, it will find the corresponding element in the document.
    if (typeof propContainer === 'string') {
      container = document.getElementById(propContainer);
    }
    // If the container is not found, it will use the graph's container.
    if (!container) {
      container = graph.container;
    }

    const wrapperSize = [
      size[0] === 'fit-content' ? 0 : size[0],
      size[1] === 'fit-content' ? 0 : size[1],
    ];
    const wrapper = (HTMLDivElement = createDom(
      `<div class='${className}' style='width: ${wrapperSize[0]}px; height: ${wrapperSize[1]}px; overflow: hidden;'></div>`,
    ));
    container.appendChild(wrapper);
    return wrapper;
  }

  /**
   * Creates a legend for the graph based on the given item type (node or edge).
   * @param {string} itemType - The type of item for which the legend is being created (node or edge).
   * @returns {Category} - The created legend.
   */
  private upsertLegend(itemType: 'node' | 'edge' = 'node') {
    const { graph, options, canvas } = this;
    const { node, edge, orientation } = options;

    // Checks if the legend is enabled for the given item type. If not, it returns.
    const itemLegendConfig = itemType === 'node' ? node : edge;
    if (!itemLegendConfig?.enable) return;

    // Extracts the necessary configuration options from the options object.
    const {
      title,
      typeField,
      labelFormatter,
      rows = 1,
      cols = 4,
      colPadding = 5,
      rowPadding = 8,
      padding: propsPadding = [0, 0, 0, 0],
      labelStyle = {},
      markerStyle: propsMarkerStyle,
    } = itemLegendConfig;
    const defaultStyle = {
      shape: itemType === 'node' ? 'circle' : 'line',
      size: 10,
      color: '#ccc',
      fillOpacity: 0.3,
    };

    // Calculates the necessary padding, spacing, and size for the legend.
    const padding = formatPadding(propsPadding);
    const labelRelatedStyle: any = {};
    Object.keys(labelStyle).forEach((key) => {
      labelRelatedStyle[`itemLabel${upperFirst(key)}`] = labelStyle[key];
    });
    const itemSpacing = labelRelatedStyle.itemLabelSpacing;
    const { size: legendSize, grid } = this.getLegendSize(rows, cols, padding);

    // Gets all the data for the given item type and extracts the unique types based on the typeField.
    const datas =
      itemType === 'node' ? graph.getAllNodesData() : graph.getAllEdgesData();
    const typeSet = new Set<string>();
    const typeModelMap = {};
    datas.map((model) => {
      if (model.data[typeField]) {
        const type = model.data[typeField];
        typeSet.add(type);
        if (!typeModelMap[type]) typeModelMap[type] = model;
      }
    });
    const types = Array.from(typeSet);

    // Creates the legend data based on the unique types and labelFormatter function.
    const legendData = types.map((type) => ({
      typeValue: type,
      label: labelFormatter ? labelFormatter(type) : type,
    }));

    const markerStyleKeys = [
      'fill',
      'stroke',
      'fillOpacity',
      'opacity',
      'lineWidth',
      'shadow',
      'shadowBlur',
      'size',
    ];

    // Creates the marker style for the legend based on the propsMarkerStyle or the style of the corresponding element on the graph.
    const markerRelatedStyle: any = {};
    let getShape;
    if (!propsMarkerStyle) {
      // 使用图上对应元素的样式
      const graphGroup = graph.canvas.getRoot();
      const itemTypeGroup =
        graphGroup.getElementById(`${itemType}-group`) || graphGroup;
      const typeStyleMap = {};
      const formatStyles = {
        x1: -10,
        y1: 0,
        x2: 10,
        y2: 0,
      };
      types.forEach((type) => {
        const itemGroup = itemTypeGroup.find(
          (ele) => ele.getAttribute('data-item-id') === typeModelMap[type].id,
        );
        const keyShape = itemGroup.querySelector('#keyShape');
        typeStyleMap[type] = {
          shape: keyShape.nodeName,
          style: {
            ...keyShape.attributes,
            ...formatStyles,
          },
        };
      });

      markerStyleKeys.forEach((key) => {
        markerRelatedStyle[`itemMarker${upperFirstLetter(key)}`] = (item) => {
          const { typeValue } = item;
          let markerStyleKey = key;
          if (key === 'size') {
            if (typeStyleMap[typeValue].style.r) markerStyleKey = 'r';
            markerStyleKey = 'width';
          }
          return (
            typeStyleMap[typeValue].style[markerStyleKey] || defaultStyle[key]
          );
        };
      });
      getShape = (item) => {
        const { typeValue } = item;
        const shape = typeStyleMap[typeValue].shape || defaultStyle.shape;
        return {
          Shape: ShapeTagMap[shape],
          style: typeStyleMap[typeValue].style,
        };
      };
    } else {
      // 使用 markerStyle 中的样式映射
      const { shape: markerShape, ...markerStyle } = Object.assign(
        {},
        defaultStyle,
        propsMarkerStyle || {},
      );
      getShape = this.getShapeConfig(itemType, markerShape);
      Object.keys(markerStyle).forEach((key) => {
        const styleValue = markerStyle[key];
        let value = styleValue;
        if (typeof styleValue === 'object') {
          value = (item) => {
            return (
              styleValue[item.typeValue] ||
              styleValue[item.typeValue].size ||
              10
            );
          };
        } else if (isFunction(styleValue)) {
          value = (item) => styleValue(item.typeValue);
        }
        if (key === 'color') {
          markerRelatedStyle['itemMarkerFill'] =
            markerRelatedStyle['itemMarkerFill'] || value;
          markerRelatedStyle['itemMarkerStroke'] =
            markerRelatedStyle['itemMarkerStroke'] || value;
        } else {
          markerRelatedStyle[`itemMarker${upperFirstLetter(key)}`] = value;
        }
      });
    }

    // Creates the legend using the Category component and appends it to the canvas.
    const legend = new Category({
      style: {
        x: padding[3],
        y: padding[0],
        data: legendData,
        layout: 'flex',
        orientation,
        gridRow: grid[0],
        gridCol: grid[1],
        colPadding,
        rowPadding,
        width: legendSize[0],
        height: legendSize[1],
        titleText: title,
        itemSpacing,
        ...labelRelatedStyle,
        ...markerRelatedStyle,
        // itemMarkerFillOpacity: 0.5,
        itemMarker: (item) => {
          const { Shape, style } = getShape(item as any);
          const { typeValue } = item;
          this.styleCache[itemType][typeValue] = style;
          return () =>
            new Shape({ style, id: `marker-${itemType}-${typeValue}` });
        },
        mouseenter: (ele) =>
          this.handleMouseEnter(ele, types, typeField, itemType, datas),
        mouseleave: (ele) =>
          this.handleMouseLeave(ele, types, typeField, itemType),
        click: (ele) =>
          this.handleClick(ele, types, typeField, itemType, datas),
      },
    });

    // TODO: update type define.
    // @ts-ignore
    canvas.appendChild(legend);
    return legend;
  }

  /**
   * Updates the layout by positioning the node and edge legends.
   */
  private updateLayout() {
    const { nodeLegend, edgeLegend, options, size } = this;
    // If both node and edge legends exist, it determines the order of the legends based on their respective orders in the options object.
    if (nodeLegend && edgeLegend) {
      const { node, edge, orientation } = options;
      const { order: nodeOrder = 1, padding: nodePadding } = node;
      const { order: edgeOrder = 2, padding: edgePadding } = edge;
      let firstItem;
      let secondItem;
      if (nodeOrder < edgeOrder) {
        firstItem = {
          padding: formatPadding(nodePadding),
          legend: nodeLegend,
        };
        secondItem = {
          padding: formatPadding(edgePadding),
          legend: edgeLegend,
        };
      } else {
        secondItem = {
          padding: formatPadding(nodePadding),
          legend: nodeLegend,
        };
        firstItem = {
          padding: formatPadding(edgePadding),
          legend: edgeLegend,
        };
      }
      const bbox = firstItem.legend.getRenderBounds();

      // Positions the legends based on their orientation and padding values.
      if (orientation === 'horizontal') {
        firstItem.legend.translateLocal([
          0,
          -bbox.min[1] + firstItem.padding[0],
        ]);

        const firstItemBounds =
          firstItem.legend.childNodes[1].childNodes[0].childNodes[0].getRenderBounds();
        const firstBottom = firstItemBounds.max[1] + firstItem.padding[2];

        secondItem.legend.translateLocal([0, firstBottom]);
      } else {
        firstItem.legend.translateLocal([
          -bbox.min[0] + firstItem.padding[3],
          0,
        ]);
        const firstRight =
          firstItem.legend.childNodes[1].childNodes[0].childNodes[0].childNodes[1].getRenderBounds()
            .max[0] + firstItem.padding[1];
        secondItem.legend.translateLocal([firstRight, 0]);
      }
    }

    // If the size of the canvas is set to "fit-content", it resizes the canvas to fit the total bounding box of the legend.
    if (size[0] === 'fit-content' || size[1] === 'fit-content') {
      const totalBBox = this.canvas.getRoot().getRenderBounds();
      const canvasSize = [
        size[0] === 'fit-content'
          ? totalBBox.max[0] - totalBBox.min[0]
          : size[0],
        size[1] === 'fit-content'
          ? totalBBox.max[1] - totalBBox.min[1]
          : size[1],
      ];
      this.canvas.resize(canvasSize[0], canvasSize[1]);
      this.wrapper.style.width = `${canvasSize[1]}px`;
      this.wrapper.style.height = `${canvasSize[0]}px`;
    }
  }

  /**
   * generate a function that takes an legend's item object and returns an object with Shape and style properties for the item marker rendering.
   * @param itemType specifies whether the item is a node or an edge.
   * @param markerShape
   * @returns
   */
  private getShapeConfig(
    itemType: 'node' | 'edge',
    markerShape,
  ): (item: { typeValue: string }) => { Shape: DisplayObject; style: any } {
    const DefaultShape: typeof Circle | typeof Line =
      itemType === 'node' ? Circle : Line;
    const defaultStyle =
      itemType === 'node'
        ? { r: 10, width: 20, height: 20, lineWidth: 1 }
        : { lineWidth: 4, x1: -10, y1: 0, x2: 10, y2: 0 };

    if (typeof markerShape === 'string') {
      // If markerShape is a string, it is used as a key to look up a shape in the ShapeTagMap object. If the key is not found, the DefaultShape is used.
      const Shape = ShapeTagMap[markerShape] || DefaultShape;
      return () => ({
        Shape: Shape,
        style: defaultStyle,
      });
    } else {
      // If markerShape is an object, it is used to look up a shape configuration based on the item's typeValue property.
      return (item) => {
        const shapeConfig = markerShape[item.typeValue];
        if (typeof shapeConfig === 'string') {
          // If the configuration is a string, it is used as a key to look up a shape in the ShapeTagMap object. If the key is not found, the DefaultShape is used.
          const Shape = ShapeTagMap[shapeConfig];
          return {
            Shape,
            style: defaultStyle,
          };
        } else {
          // If the configuration is an object, it is used to determine the shape type and style. The shape type is looked up in the ShapeTagMap object. If the key is not found, the DefaultShape is used. The style is a combination of the defaultStyle and the style property of the configuration object.
          const { type: shapeType, style } = shapeConfig;
          const Shape = ShapeTagMap[shapeType] || DefaultShape;
          return {
            Shape,
            style: { ...defaultStyle, ...style },
          };
        }
      };
    }
  }

  /**
   * Calculates the size of the legend based on the number of rows and columns, padding, and the orientation of the legend.
   * @param rows
   * @param cols
   * @param padding
   * @returns
   */
  private getLegendSize(rows, cols, padding) {
    const { graph, options, size } = this;
    const { orientation } = options;
    let [width, height] = size;
    let grid = [rows, cols];
    const [graphWidth, graphHeight] = graph.getSize();

    if (orientation === 'horizontal') {
      // If the orientation is horizontal, it checks if the first value in the size array is "fit-content" and sets the width to the graphWidth if it is.
      if (size[0] === 'fit-content') width = graphWidth;
      if (size[1] === 'fit-content') height = 50;
    } else {
      // If the orientation is not horizontal, it checks if the first value in the size array is "fit-content" and sets the width to 50 if it is.
      if (size[0] === 'fit-content') width = 50;
      if (size[1] === 'fit-content') height = graphHeight;
      // Swaps the values of rows and cols in the grid array.
      grid = [cols, rows];
    }
    // Adds the padding to the width and height.
    width += padding[1] + padding[3];
    height += padding[0] + padding[2];
    return {
      size: [width, height],
      grid,
    };
  }

  /**
   * Handles the mouse enter event for a given element.
   * @param {Object} ele - The element (legend item marker) that triggered the event.
   * @param {Array} types - An array of all the types on the legend.
   * @param {string} typeField - The field that contains the type information.
   * @param {string} itemType - The type of item, node or edge.
   * @param {Array} datas - An array of data models.
   */
  private handleMouseEnter(ele, types, typeField, itemType, datas) {
    const { graph, options } = this;
    const { activeState } = options;
    if (!activeState) return;
    const { index } = ele.__data__;
    const type = types[index];
    this.activeType[typeField] = type;
    const activeIds = datas
      .filter((model) => model.data[typeField] === type)
      .map((model) => model.id);
    graph.setItemState(activeIds, activeState, true);
    activeIds.forEach((id) => this.activeIds[itemType].add(id));

    // Update legend style.
    ele.querySelector('.legend-category-item-marker').style.lineWidth =
      this.styleCache[itemType][type].lineWidth + 2 || 4;
  }

  /**
   * Handles mouse leave event for a given element.
   * @param {HTMLElement} ele - The element (legend item marker) that triggered the event.
   * @param {Array} types - An array of all the types on the legend.
   * @param {string} typeField - The field that contains the type information.
   * @param {string} itemType - The type of the item, node or edge.
   */
  private handleMouseLeave(ele, types, typeField, itemType) {
    const { graph, options } = this;
    const { activeState } = options;
    if (!activeState) return;
    this.activeType[typeField] = undefined;
    const currentActiveIds = graph.findIdByState(itemType, activeState, true);
    const { index } = ele.__data__;
    const type = types[index];
    if (this.selectedTypes[itemType].has(type)) {
      ele.querySelector('.legend-category-item-marker').style.lineWidth =
        this.styleCache[itemType][type].lineWidth + 4 || 6;
    } else {
      ele.querySelector('.legend-category-item-marker').style.lineWidth =
        this.styleCache[itemType][type].lineWidth || 1;
    }
    graph.setItemState(currentActiveIds, activeState, false);
    currentActiveIds.forEach((id) => this.activeIds[itemType].delete(id));
  }

  /**
   * Handles the click event on a legend category item.
   * @param {HTMLElement} ele - The legend category item element that was clicked.
   * @param {Array} types - An array of all the types on the legend.
   * @param {string} typeField - The field in the data model that contains the type of the data.
   * @param {string} itemType - The type of the item, node or edge.
   * @param {Array} datas - An array of data models.
   */
  private handleClick(ele, types, typeField, itemType, datas) {
    const { graph, options } = this;
    const { selectedState } = options;
    if (!selectedState) return;
    const { index } = ele.__data__;
    const type = types[index];
    const ids = datas
      .filter((model) => model.data[typeField] === type)
      .map((model) => model.id);
    if (this.selectedTypes[itemType].has(type)) {
      this.selectedTypes[itemType].delete(type);
      ids.forEach((id) => this.selectedIds[itemType].delete(id));
      graph.setItemState(ids, selectedState, false);
      ele.querySelector('.legend-category-item-marker').style.lineWidth = 4;
    } else {
      this.selectedTypes[itemType].add(type);
      ids.forEach((id) => this.selectedIds[itemType].add(id));
      graph.setItemState(ids, selectedState, true);
      ele.querySelector('.legend-category-item-marker').style.lineWidth =
        this.styleCache[itemType][type].lineWidth + 4 || 6;
    }
  }

  public destroy() {
    super.destroy();
    this.canvas.destroy();
  }
}

/**
 * Takes a string as input and returns the same string with the first letter capitalized.
 * @param str
 * @returns
 */
const upperFirstLetter = (str: string) => {
  if (!str) return '';
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
};
