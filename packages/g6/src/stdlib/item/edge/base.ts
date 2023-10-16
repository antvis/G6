import { AABB, DisplayObject, Line, Polyline } from '@antv/g';
import { isNumber, isBoolean } from '@antv/util';
import { ID } from 'types';
import {
  DEFAULT_LABEL_BG_PADDING,
  OTHER_SHAPES_FIELD_NAME,
  RESERVED_SHAPE_IDS,
} from '../../../constant';
import { Point } from '../../../types/common';
import {
  ArrowStyle,
  EdgeDisplayModel,
  EdgeModelData,
  EdgeShapeMap,
  EdgeShapeStyles,
} from '../../../types/edge';
import {
  GShapeStyle,
  SHAPE_TYPE,
  ShapeStyle,
  State,
  LodStrategyObj,
} from '../../../types/item';
import { formatPadding, mergeStyles, upsertShape } from '../../../util/shape';
import { DEFAULT_ANIMATE_CFG, fadeIn, fadeOut } from '../../../util/animate';
import { getWordWrapWidthByEnds } from '../../../util/text';
import { AnimateCfg } from '../../../types/animate';
import { getZoomLevel } from '../../../util/zoom';
import { DEFAULT_ARROW_CONFIG, getArrowPath } from '../../../util/arrow';
import Node from '../../../item/node';

export abstract class BaseEdge {
  type: string;
  defaultStyles: EdgeShapeStyles = {};
  themeStyles: EdgeShapeStyles;
  mergedStyles: EdgeShapeStyles;
  sourcePoint: Point;
  targetPoint: Point;
  nodeMap: Map<ID, Node>;
  lodStrategy?: LodStrategyObj;
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
  private zoomCache: {
    // the id of shapes which are hidden by zoom changing.
    hiddenShape: { [shapeId: string]: boolean };
    // the ratio to scale the size of shapes whose visual size should be kept, e.g. label and badges.
    balanceRatio: number;
    // last responsed zoom ratio.
    zoom: number;
    // last responsed zoom level where the zoom ratio at. Zoom ratio 1 at level 0.
    zoomLevel: number;
    // shape ids in different zoom levels.
    levelShapes: {
      [level: string]: string[];
    };
    // wordWrapWidth of labelShape according to the maxWidth
    wordWrapWidth: number;
    // animate configurations for zoom level changing
    animateConfig: AnimateCfg;
    // the tag of first rendering
    firstRender: boolean;
  } = {
    hiddenShape: {},
    balanceRatio: 1,
    zoom: 1,
    zoomLevel: 0,
    levelShapes: {},
    wordWrapWidth: 50,
    animateConfig: DEFAULT_ANIMATE_CFG.zoom,
    firstRender: true,
  };
  constructor(props) {
    const { themeStyles, lodStrategy, zoom } = props;
    if (themeStyles) this.themeStyles = themeStyles;
    this.lodStrategy = lodStrategy;
    this.transformCache = {};
    this.zoomCache.zoom = zoom;
    this.zoomCache.balanceRatio = 1 / zoom;
    this.zoomCache.animateConfig = {
      ...DEFAULT_ANIMATE_CFG.zoom,
      ...lodStrategy?.animateCfg,
    };
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
      if (RESERVED_SHAPE_IDS.includes(fieldName))
        dataStyles[fieldName] = data[fieldName] as ShapeStyle;
      else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
        Object.keys(data[fieldName]).forEach(
          (otherShapeId) =>
            (dataStyles[otherShapeId] = data[fieldName][otherShapeId]),
        );
      }
    });
    const merged = mergeStyles([
      this.themeStyles,
      this.defaultStyles,
      dataStyles,
    ]) as EdgeShapeStyles;

    const padding = merged.labelBackgroundShape?.padding;
    if (padding) {
      merged.labelBackgroundShape.padding = formatPadding(
        padding,
        DEFAULT_LABEL_BG_PADDING,
      );
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

    const { zoom } = this.zoomCache;
    const levelShapes = {};
    Object.keys(shapeMap).forEach((shapeId) => {
      const { lod } = shapeMap[shapeId].attributes;
      if (lod !== undefined) {
        levelShapes[lod] = levelShapes[lod] || [];
        levelShapes[lod].push(shapeId);
      }
    });
    this.zoomCache.levelShapes = levelShapes;

    const { maxWidth = '60%' } = this.mergedStyles.labelShape || {};
    this.zoomCache.wordWrapWidth = getWordWrapWidthByEnds(
      [this.sourcePoint, this.targetPoint],
      maxWidth,
      1,
    );

    this.zoomCache.zoom = 1;
    this.zoomCache.zoomLevel = 0;
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
   * @returns An object that contains some new shapes to be added to the edge.
   */
  public afterDraw(
    model: EdgeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    shapesChanged?: string[],
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
  public setState: (
    name: string,
    value: boolean,
    shapeMap: { [shapeId: string]: DisplayObject },
  ) => void;

  /**
   * Draw the label shape of the edge
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current edge's state.
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

    const point = (keyShape as Line | Polyline).getPoint(
      positionPreset.pointRatio[0],
    );
    let positionStyle: any = { x: point.x, y: point.y };
    let isRevert = false;
    if (autoRotate) {
      const pointOffset = (keyShape as Line | Polyline).getPoint(
        positionPreset.pointRatio[1],
      );
      let angle = Math.atan(
        (point.y - pointOffset.y) / (point.x - pointOffset.x),
      );
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
      const offsetX = (
        propsOffsetX === undefined ? positionPreset.offsetX : propsOffsetX
      ) as number;
      const offsetY = (
        propsOffsetY === undefined ? positionPreset.offsetY : propsOffsetY
      ) as number;
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
    const wordWrapWidth = getWordWrapWidthByEnds(
      [this.sourcePoint, this.targetPoint],
      maxWidth,
      this.zoomCache.zoom,
    );
    this.zoomCache.wordWrapWidth = wordWrapWidth;
    const style = {
      ...this.defaultStyles.labelShape,
      textAlign: positionPreset.textAlign,
      wordWrapWidth,
      isBillboard: true,
      ...positionStyle,
      ...otherStyle,
    };
    this.transformCache.labelShapeTransform = style.transform;
    return this.upsertShape('text', 'labelShape', style, shapeMap, model);
  }

  /**
   * Draw the label background shape of the edge
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current edge's state.
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

    const { labelBackgroundShape, labelShape: labelShapeStyle } =
      this.mergedStyles;

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
        bgStyle.transformOrigin = `${bgStyle.width - padding[1]} ${
          bgStyle.height / 2
        }`;
      } else {
        bgStyle.transformOrigin = `${padding[3]} ${bgStyle.height / 2}`;
      }
    } else if (labelShapeStyle.position === 'end') {
      if (isRevert) {
        bgStyle.transformOrigin = `${padding[3]} ${bgStyle.height / 2}`;
      } else {
        bgStyle.transformOrigin = `${bgStyle.width - padding[1]} ${
          bgStyle.height / 2
        }`;
      }
    } else {
      bgStyle.transformOrigin = `${textWidth / 2 + padding[3]} ${
        textHeight / 2 + padding[0]
      }`;
    }

    return this.upsertShape(
      'rect',
      'labelBackgroundShape',
      bgStyle,
      shapeMap,
      model,
    );
  }

  /**
   * Draw the icon shape of the edge
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current edge's state.
   * @returns The display object representing the icon shape of the edge.
   */
  public drawIconShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { labelShape, labelBackgroundShape, keyShape } = shapeMap;
    const { iconShape: shapeStyle, labelShape: labelShapeProps } =
      this.mergedStyles;

    const {
      width,
      height,
      fontSize,
      text,
      offsetX = 0,
      offsetY = 0,
    } = shapeStyle;
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
      const {
        min: referMin,
        max: referMax,
        halfExtents: referHalExtents,
      } = referBounds;
      const referHeight = referMax[1] - referMin[1];
      const referWidth = referMax[0] - referMin[0];
      const {
        x: referX,
        y: referY,
        transform: referTransform,
      } = referShape.attributes;
      const { textAlign: labelAlign } = labelShape.attributes;
      shapeStyle.x = referMin[0] - w + 4 + referX + offsetX;
      shapeStyle.y = referMin[1] + (referHeight - h) / 2 + referY + offsetY;
      if (referTransform) {
        shapeStyle.transform = referTransform;
        if (labelAlign === 'right') {
          shapeStyle.transformOrigin = `${
            referWidth / 2 - w / 2 + 4 + referHalExtents[0] - offsetX
          } ${h / 2 - offsetY}`;
        } else if (labelAlign === 'left') {
          shapeStyle.transformOrigin = `${w + 4 - offsetX} ${h / 2 - offsetY}`;
        } else {
          // labelShape align 'center'
          shapeStyle.transformOrigin = `${(w + referWidth) / 2 - offsetX} ${
            h / 2 - offsetY
          }`;
        }
      }
    } else {
      const midPoint = (keyShape as Line | Polyline).getPoint(0.5);
      shapeStyle.x = midPoint.x + offsetX;
      shapeStyle.y = midPoint.y + offsetY;
      // TODO: rotate
    }

    return this.upsertShape(
      iconShapeType,
      'iconShape',
      shapeStyle as GShapeStyle,
      shapeMap,
      model,
    );
  }

  /**
   * Draw the halo shape of the edge
   * @param model The displayed model of this edge, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current edge's state.
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
      shapeMap,
      model,
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
   * 1. show / hide some shapes while zoom level changed;
   * 2. change the shapes' sizes to make them have same visual size while zooming, e.g. labelShape, labelBackgroundShape.
   * @param shapeMap The shape map that contains all of the elements to show on the edge.
   * @param zoom The zoom level of the graph.
   */
  public onZoom = (
    shapeMap: EdgeShapeMap,
    zoom: number,
    cacheHiddenShape = {},
  ) => {
    // balance the size for label, badges
    // this.balanceShapeSize(shapeMap, zoom);

    // zoomLevel changed
    if (!this.lodStrategy) return;
    const { levels } = this.lodStrategy;
    const {
      levelShapes,
      hiddenShape,
      animateConfig,
      firstRender = true,
      zoomLevel: previousLevel,
    } = this.zoomCache;

    // last zoom ratio responsed by zoom changing, which might not equal to zoom.previous in props since the function is debounced.
    const currentLevel = getZoomLevel(levels, zoom);
    const levelNums = Object.keys(levelShapes).map(Number);
    const maxLevel = Math.max(...levelNums);
    const minLevel = Math.min(...levelNums);
    if (currentLevel < previousLevel) {
      // zoomLevel changed, from higher to lower, hide something
      if (firstRender) {
        for (let i = currentLevel + 1; i <= maxLevel; i++) {
          levelShapes[String(i)]?.forEach((id) => {
            if (!shapeMap[id] || cacheHiddenShape[id]) return;
            shapeMap[id]?.hide();
          });
        }
      } else {
        for (let i = currentLevel + 1; i <= maxLevel; i++) {
          levelShapes[String(i)]?.forEach((id) =>
            fadeOut(id, shapeMap[id], hiddenShape, animateConfig),
          );
        }
      }
    } else if (currentLevel > previousLevel) {
      // zoomLevel changed, from lower to higher, show something
      for (let i = currentLevel; i >= minLevel; i--) {
        levelShapes[String(i)]?.forEach((id) => {
          if (hiddenShape[id]) return;
          fadeIn(
            id,
            shapeMap[id],
            this.mergedStyles[id] ||
              this.mergedStyles[id.replace('Background', '')],
            hiddenShape,
            animateConfig,
          );
        });
      }
    }

    this.zoomCache.zoom = zoom;
    this.zoomCache.zoomLevel = currentLevel;
    this.zoomCache.firstRender = false;
  };

  /**
   * Update the shapes' sizes e.g. labelShape, labelBackgroundShape, to keep the visual size while zooming.
   * @param shapeMap
   * @param zoom
   * @returns
   */
  private balanceShapeSize(shapeMap, zoom) {
    const { labelShape, labelBackgroundShape } = shapeMap;
    const balanceRatio = 1 / zoom || 1;
    this.zoomCache.balanceRatio = balanceRatio;
    const { labelShape: labelStyle = {} } = this.mergedStyles;
    const { position = 'bottom' } = labelStyle;
    if (!labelShape) return;

    if (position === 'bottom') labelShape.style.transformOrigin = '0';
    else labelShape.style.transformOrigin = '';

    const oriTransform = this.transformCache.labelShapeTransform;
    labelShape.style.transform = `${oriTransform} scale(${balanceRatio}, ${balanceRatio})`;

    const wordWrapWidth = this.zoomCache.wordWrapWidth * zoom;
    labelShape.style.wordWrapWidth = wordWrapWidth;

    if (!labelBackgroundShape) return;

    const oriBgTransform = this.transformCache.labelBackgroundShapeTransform;
    labelBackgroundShape.style.transform = `${oriBgTransform} scale(${balanceRatio}, ${balanceRatio})`;
  }

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
    const arrowStyle = isBoolean(arrowConfig)
      ? ({ ...DEFAULT_ARROW_CONFIG } as ArrowStyle)
      : arrowConfig;
    const {
      type = 'triangle',
      width = 10,
      height = 10,
      path: propPath,
      offset = 0,
      ...others
    } = arrowStyle;
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
      {},
      model,
    );
    resultStyle[`${markerField}Offset`] = width / 2 + offset;
  }

  /**
   * Create (if does not exit in shapeMap) or update the shape according to the configurations.
   * @param type shape's type
   * @param id unique string to indicates the shape
   * @param style style to be updated
   * @param shapeMap the shape map of a edge
   * @param model data model of the edge
   * @returns The display object representing the shape.
   */
  public upsertShape(
    type: SHAPE_TYPE,
    id: string,
    style: ShapeStyle,
    shapeMap: { [shapeId: string]: DisplayObject },
    model: EdgeDisplayModel,
  ): DisplayObject {
    return upsertShape(type, id, style as GShapeStyle, shapeMap, model);
  }
}
