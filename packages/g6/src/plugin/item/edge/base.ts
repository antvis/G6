import { DisplayObject, Line, Polyline } from '@antv/g';
import { isBoolean } from '@antv/util';
import { ID } from 'types';
import { DEFAULT_LABEL_BG_PADDING, OTHER_SHAPES_FIELD_NAME, RESERVED_SHAPE_IDS } from '../../../constant';
import Node from '../../../item/node';
import { Point } from '../../../types/common';
import { ArrowStyle, EdgeDisplayModel, EdgeModelData, EdgeShapeMap, EdgeShapeStyles } from '../../../types/edge';
import { GShapeStyle, LodLevelRanges, SHAPE_TYPE, ShapeStyle, State } from '../../../types/item';
import { DEFAULT_ARROW_CONFIG, getArrowPath } from '../../../utils/arrow';
import { formatPadding, mergeStyles, upsertShape } from '../../../utils/shape';
import { getWordWrapWidthByEnds } from '../../../utils/text';

export abstract class BaseEdge {
  type: string;
  defaultStyles: EdgeShapeStyles = {};
  themeStyles: EdgeShapeStyles;
  mergedStyles: EdgeShapeStyles;
  sourcePoint: Point;
  targetPoint: Point;
  nodeMap: Map<ID, Node>;
  lodLevels?: LodLevelRanges;
  labelPosition: {
    x: number;
    y: number;
    transform: string;
    isRevert: boolean;
  };
  transformCache: {
    labelShapeTransform?: string;
    labelBackgroundShapeTransform?: string;
  };
  // cache the zoom level infomations
  #zoomCache: {
    // last responsed zoom ratio.
    zoom: number;
    // wordWrapWidth of labelShape according to the maxWidth
    wordWrapWidth: number;
  } = {
    zoom: 1,
    wordWrapWidth: 50,
  };
  constructor(props) {
    const { themeStyles, lodLevels, zoom } = props;
    if (themeStyles) this.themeStyles = themeStyles;
    this.lodLevels = lodLevels;
    this.transformCache = {};
    this.#zoomCache.zoom = zoom;
  }

  /**
   * Get merged styles from `getMergedStyles` and assigns the merged styles to the 'mergedStyles' property.
   * @param model - The EdgeDisplayModel to merge the styles from.
   */
  public mergeStyles(model: EdgeDisplayModel) {
    this.mergedStyles = this.getMergedStyles(model);
  }

  /**
   * Merge style
   * @param model - The EdgeDisplayModel to retrieve the merged styles from.
   * @returns The merged styles as a EdgeShapeStyles object.
   */
  public getMergedStyles(model: EdgeDisplayModel) {
    const { data } = model;
    const dataStyles = {} as EdgeShapeStyles;
    Object.keys(data).forEach((fieldName) => {
      if (RESERVED_SHAPE_IDS.includes(fieldName)) {
        dataStyles[fieldName] = data[fieldName] as ShapeStyle;
      } else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
        Object.keys(data[fieldName]).forEach(
          (otherShapeId) => (dataStyles[otherShapeId] = data[fieldName][otherShapeId]),
        );
      }
    });
    const merged = mergeStyles([this.themeStyles, this.defaultStyles, dataStyles]) as EdgeShapeStyles;

    const padding = merged.labelBackgroundShape?.padding;
    if (padding) {
      merged.labelBackgroundShape.padding = formatPadding(padding, DEFAULT_LABEL_BG_PADDING);
    }
    return merged;
  }

  /**
   * Call it after calling draw function to update cache about bounds and zoom levels.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   */
  public updateCache(shapeMap) {
    ['labelShape', 'labelBackgroundShape'].forEach((id) => {
      const shape = shapeMap[id];
      if (shape) {
        this.transformCache[`${id}Transform`] = shape.style.transform;
      }
    });

    const { zoom } = this.#zoomCache;

    const { maxWidth = '60%' } = this.mergedStyles.labelShape || {};
    this.#zoomCache.wordWrapWidth = getWordWrapWidthByEnds([this.sourcePoint, this.targetPoint], maxWidth, 1);

    this.#zoomCache.zoom = 1;
    if (zoom !== 1) this.onZoom(shapeMap, zoom);
  }

  /**
   * Draw all elements related to the edge.
   * You should call `drawKeyShape` and `drawAnchorShape`,`drawLabelShape`,`drawIconShape`...as you like.
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current edge's state.
   * @returns An object containing the keyShape and optional labelShape, iconShape, and some otherShapes properties
   */
  abstract draw(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: { [shapeId: string]: DisplayObject },
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    keyShape: DisplayObject;
    labelShape?: DisplayObject;
    iconShape?: DisplayObject;
    [otherShapeId: string]: DisplayObject;
  };

  /**
   * Perform additional drawing operations or add custom shapes after drawing edge.
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param shapesChanged An array of shape IDs that have changed and need to be updated.
   * @param diffData
   * @param diffData.previous
   * @param diffData.current
   * @param diffState
   * @param diffState.previous
   * @param diffState.current
   * @returns An object that contains some new shapes to be added to the edge.
   */
  public afterDraw(
    model: EdgeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    // shapesChanged?: string[],
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): { [otherShapeId: string]: DisplayObject } {
    return {};
  }
  // shouldUpdate: (model: EdgeDisplayModel, prevModel: EdgeDisplayModel) => boolean = () => true;

  /**
   * Set the state for the edge.
   * @param state state name
   * @param value state value
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   */
  public setState: (name: string, value: boolean, shapeMap: { [shapeId: string]: DisplayObject }) => void;

  /**
   * Draw the label shape of the edge
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current edge's state.
   * @param diffData.previous
   * @param diffData.current
   * @param diffState.previous
   * @param diffState.current
   * @returns The display object representing the label shape of the edge.
   */
  public drawLabelShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;

    const { labelShape: shapeStyle } = this.mergedStyles;
    if (!shapeStyle || !shapeStyle.text || !model.data.labelShape) return;

    const {
      position,
      offsetX: propsOffsetX,
      offsetY: propsOffsetY,
      autoRotate = true,
      maxWidth,
      ...otherStyle
    } = shapeStyle;

    const positionPreset = {
      textAlign: 'center',
      offsetX: 0,
      offsetY: 0,
      pointRatio: [0.5, 0.501],
    };
    if (typeof position === 'number') {
      positionPreset.pointRatio = [position, position + 0.01];
    }
    switch (position) {
      case 'start':
        positionPreset.pointRatio = [0, 0.01];
        positionPreset.textAlign = 'left';
        positionPreset.offsetX = 4;
        break;
      case 'end':
        positionPreset.pointRatio = [0.99, 1];
        positionPreset.textAlign = 'right';
        positionPreset.offsetX = -4;
        break;
      default: // at middle by default
        break;
    }

    const point = (keyShape as Line | Polyline).getPoint(positionPreset.pointRatio[0]);
    let positionStyle: any = { x: point.x, y: point.y };
    let isRevert = false;
    if (autoRotate) {
      const pointOffset = (keyShape as Line | Polyline).getPoint(positionPreset.pointRatio[1]);
      let angle = Math.atan((point.y - pointOffset.y) / (point.x - pointOffset.x));
      if (isNaN(angle)) angle = 0;

      // revert
      isRevert = pointOffset.x < point.x;
      if (isRevert) {
        if (position === 'start') {
          positionPreset.textAlign = 'right';
          positionPreset.offsetX = -4;
        } else if (position === 'end') {
          positionPreset.textAlign = 'left';
          positionPreset.offsetX = 4;
        }
      }
      const offsetX = (propsOffsetX === undefined ? positionPreset.offsetX : propsOffsetX) as number;
      const offsetY = (propsOffsetY === undefined ? positionPreset.offsetY : propsOffsetY) as number;
      // the projection is |offsetX| away from point, along the tangent line of the keyShape's path at point
      const projection = {
        x: point.x + offsetX * Math.cos(angle),
        y: point.y + offsetX * Math.sin(angle),
      };
      // the position of the text is |offsetY| away from projection, along the vertical line of the tangent line at point
      positionStyle = {
        x: projection.x + offsetY * Math.cos(Math.PI - angle),
        y: projection.y + offsetY * Math.sin(Math.PI - angle),
        transform: `rotate(${(angle / Math.PI) * 180}deg)`,
      };
    }
    this.labelPosition = {
      ...positionStyle,
      isRevert,
    };
    const wordWrapWidth = getWordWrapWidthByEnds([this.sourcePoint, this.targetPoint], maxWidth, this.#zoomCache.zoom);
    this.#zoomCache.wordWrapWidth = wordWrapWidth;
    const style = {
      ...this.defaultStyles.labelShape,
      textAlign: positionPreset.textAlign,
      wordWrapWidth,
      isBillboard: true,
      ...positionStyle,
      ...otherStyle,
    };
    this.transformCache.labelShapeTransform = style.transform;
    return this.upsertShape('text', 'labelShape', style, {
      model,
      shapeMap,
      diffData,
      diffState,
    });
  }

  /**
   * Draw the label background shape of the edge
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current edge's state.
   * @param diffData.previous
   * @param diffData.current
   * @param diffState.previous
   * @param diffState.current
   * @returns The display object representing the label background shape of the edge.
   */
  public drawLabelBackgroundShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { labelShape } = shapeMap;
    if (!labelShape || !labelShape.style.text || !model.data.labelShape) return;

    const { labelBackgroundShape, labelShape: labelShapeStyle } = this.mergedStyles;

    const textGeoBBox = labelShape.getGeometryBounds();
    const { x, y, transform, isRevert } = this.labelPosition;
    const { padding, ...backgroundStyle } = labelBackgroundShape;
    const textWidth = textGeoBBox.max[0] - textGeoBBox.min[0];
    const textHeight = textGeoBBox.max[1] - textGeoBBox.min[1];
    const bgStyle = {
      fill: '#fff',
      ...backgroundStyle,
      x: textGeoBBox.min[0] - padding[3] + labelShape.style.x,
      y: textGeoBBox.min[1] - padding[0] + labelShape.style.y,
      width: textWidth + padding[1] + padding[3],
      height: textHeight + padding[0] + padding[2],
    };
    if (transform) bgStyle.transform = transform;
    if (labelShapeStyle.position === 'start') {
      if (isRevert) {
        bgStyle.transformOrigin = `${bgStyle.width - padding[1]} ${bgStyle.height / 2}`;
      } else {
        bgStyle.transformOrigin = `${padding[3]} ${bgStyle.height / 2}`;
      }
    } else if (labelShapeStyle.position === 'end') {
      if (isRevert) {
        bgStyle.transformOrigin = `${padding[3]} ${bgStyle.height / 2}`;
      } else {
        bgStyle.transformOrigin = `${bgStyle.width - padding[1]} ${bgStyle.height / 2}`;
      }
    } else {
      bgStyle.transformOrigin = `${textWidth / 2 + padding[3]} ${textHeight / 2 + padding[0]}`;
    }

    return this.upsertShape('rect', 'labelBackgroundShape', bgStyle, {
      model,
      shapeMap,
      diffData,
      diffState,
    });
  }

  /**
   * Draw the icon shape of the edge
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current edge's state.
   * @param diffData.previous
   * @param diffData.current
   * @param diffState.previous
   * @param diffState.current
   * @returns The display object representing the icon shape of the edge.
   */
  public drawIconShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { labelShape, labelBackgroundShape, keyShape } = shapeMap;
    const { iconShape: shapeStyle, labelShape: labelShapeProps } = this.mergedStyles;

    const { width, height, fontSize, text, offsetX = 0, offsetY = 0 } = shapeStyle;
    const w = (width || fontSize) as number;
    const h = (height || fontSize) as number;

    const iconShapeType = text ? 'text' : 'image';
    if (iconShapeType === 'text') {
      shapeStyle.textAlign = 'left';
      shapeStyle.textBaseline = 'top';
      shapeStyle.fontSize = w;
    } else {
      shapeStyle.width = w;
      shapeStyle.height = h;
    }

    if (labelShapeProps) {
      const referShape = labelBackgroundShape || labelShape;
      const referBounds = referShape.getGeometryBounds();
      const { min: referMin, max: referMax, halfExtents: referHalExtents } = referBounds;
      const referHeight = referMax[1] - referMin[1];
      const referWidth = referMax[0] - referMin[0];
      const { x: referX, y: referY, transform: referTransform } = referShape.attributes;
      const { textAlign: labelAlign } = labelShape.attributes;
      shapeStyle.x = referMin[0] - w + 4 + referX + offsetX;
      shapeStyle.y = referMin[1] + (referHeight - h) / 2 + referY + offsetY;
      if (referTransform) {
        shapeStyle.transform = referTransform;
        if (labelAlign === 'right') {
          shapeStyle.transformOrigin = `${referWidth / 2 - w / 2 + 4 + referHalExtents[0] - offsetX} ${
            h / 2 - offsetY
          }`;
        } else if (labelAlign === 'left') {
          shapeStyle.transformOrigin = `${w + 4 - offsetX} ${h / 2 - offsetY}`;
        } else {
          // labelShape align 'center'
          shapeStyle.transformOrigin = `${(w + referWidth) / 2 - offsetX} ${h / 2 - offsetY}`;
        }
      }
    } else {
      const midPoint = (keyShape as Line | Polyline).getPoint(0.5);
      shapeStyle.x = midPoint.x + offsetX;
      shapeStyle.y = midPoint.y + offsetY;
      // TODO: rotate
    }

    return this.upsertShape(iconShapeType, 'iconShape', shapeStyle as GShapeStyle, {
      model,
      shapeMap,
      diffData,
      diffState,
    });
  }

  /**
   * Draw the halo shape of the edge
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current edge's state.
   * @param diffData.previous
   * @param diffData.current
   * @param diffState.previous
   * @param diffState.current
   * @returns The display object representing the halo shape of the edge.
   */
  public drawHaloShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    const { haloShape: haloShapeStyle } = this.mergedStyles;
    if (haloShapeStyle.visible === false) return;
    const { nodeName, attributes } = keyShape;
    return this.upsertShape(
      nodeName as SHAPE_TYPE,
      'haloShape',
      {
        ...attributes,
        stroke: attributes.stroke,
        ...haloShapeStyle,
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );
  }

  public drawOtherShapes(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): { [id: string]: DisplayObject } {
    return {};
  }

  /**
   * The listener for graph zooming.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param zoom The zoom level of the graph.
   * @param cacheHiddenShape
   */
  public onZoom = (shapeMap: EdgeShapeMap, zoom: number, cacheHiddenShape = {}) => {};

  /**
   * Update the source point { x, y } for the edge. Called in item's draw func.
   * @param point source point
   */
  public setSourcePoint(point: Point) {
    this.sourcePoint = point;
  }

  /**
   * Update the target point { x, y } for the edge. Called in item's draw func.
   * @param point target point
   */
  public setTargetPoint(point: Point) {
    this.targetPoint = point;
  }

  /**
   * Update all visible nodes on the canvas to be aware of obstacles. Called in item's draw func.
   * @param nodeMap The Map object representing the node map, where keys are node IDs and values are nodes.
   */
  public setNodeMap(nodeMap: Map<ID, Node>) {
    this.nodeMap = nodeMap;
  }

  /**
   * Adds or updates an arrow marker on the specified position of an edge.
   * @param position - The position where the arrow marker should be added or updated. Can be either 'start' or 'end'.
   * @param arrowConfig - The configuration for the arrow marker. Can be a boolean indicating whether to use the default arrow configuration, or an ArrowStyle object with custom arrow properties.
   * @param bodyStyle - The style of the edge body.
   * @param model - The EdgeDisplayModel that contains the data and style information for the edge.
   * @param resultStyle - The style object where the arrow marker properties will be added or updated.
   */
  public upsertArrow(
    position: 'start' | 'end',
    arrowConfig: boolean | ArrowStyle,
    bodyStyle: ShapeStyle,
    model: EdgeDisplayModel,
    resultStyle: ShapeStyle,
  ) {
    const markerField = `marker${position === 'start' ? 'Start' : 'End'}`;
    if (!arrowConfig) {
      resultStyle[markerField] = null;
      resultStyle[`${markerField}Offset`] = 0;
      return;
    }
    const arrowStyle = isBoolean(arrowConfig) ? ({ ...DEFAULT_ARROW_CONFIG } as ArrowStyle) : arrowConfig;
    const { type = 'triangle', width = 10, height = 10, path: propPath, offset = 0, ...others } = arrowStyle;
    resultStyle[markerField] = this.upsertShape(
      'path',
      `${markerField}Shape`,
      {
        ...bodyStyle,
        fill: type === 'simple' ? '' : bodyStyle.stroke,
        path: propPath || getArrowPath(type, width, height),
        anchor: '0.5 0.5',
        transformOrigin: 'center',
        ...others,
      },
      {
        model,
        shapeMap: {},
      },
    );
    resultStyle[`${markerField}Offset`] = width / 2 + offset;
  }

  /**
   * Create (if does not exit in shapeMap) or update the shape according to the configurations.
   * @param type shape's type
   * @param id unique string to indicates the shape
   * @param style style to be updated
   * @param config
   * @param shapeMap the shape map of a edge
   * @param model data model of the edge
   * @param config.model
   * @param config.shapeMap
   * @param config.diffData
   * @param config.diffData.previous
   * @param config.diffData.current
   * @param config.diffState
   * @param config.diffState.previous
   * @param config.diffState.current
   * @returns The display object representing the shape.
   */
  public upsertShape(
    type: SHAPE_TYPE,
    id: string,
    style: ShapeStyle,
    config: {
      model: EdgeDisplayModel;
      shapeMap?: { [k: string]: DisplayObject<any, any> };
      diffData?: { previous: EdgeModelData; current: EdgeModelData };
      diffState?: { previous: State[]; current: State[] };
    },
  ): DisplayObject {
    return upsertShape(type, id, style as GShapeStyle, config);
  }
}
