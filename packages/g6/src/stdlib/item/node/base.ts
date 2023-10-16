import { AABB, DisplayObject } from '@antv/g';
import { OTHER_SHAPES_FIELD_NAME, RESERVED_SHAPE_IDS } from '../../../constant';
import { NodeDisplayModel } from '../../../types';
import {
  GShapeStyle,
  SHAPE_TYPE,
  SHAPE_TYPE_3D,
  ShapeStyle,
  State,
  LodStrategyObj,
} from '../../../types/item';
import {
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
  IAnchorPositionMap,
} from '../../../types/node';
import {
  ComboDisplayModel,
  ComboModelData,
  ComboShapeStyles,
  ComboShapeMap,
} from '../../../types/combo';
import {
  formatPadding,
  getShapeLocalBoundsByStyle,
  mergeStyles,
  upsertShape,
} from '../../../util/shape';
import { getWordWrapWidthByBox } from '../../../util/text';
import { convertToNumber } from '../../../util/type';
import { DEFAULT_ANIMATE_CFG, fadeIn, fadeOut } from '../../../util/animate';
import { getZoomLevel } from '../../../util/zoom';
import { AnimateCfg } from '../../../types/animate';

export abstract class BaseNode {
  type: string;
  defaultStyles: NodeShapeStyles | ComboShapeStyles;
  themeStyles: NodeShapeStyles | ComboShapeStyles;
  mergedStyles: NodeShapeStyles | ComboShapeStyles;
  lodStrategy?: LodStrategyObj;
  enableBalanceShape?: boolean;
  //vertex coordinate

  /**
   * Cache the scale transform calculated by balancing size, for restoring.
   */
  protected scaleTransformCache = '';

  // cache the zoom level infomations
  protected zoomCache: {
    // the id of shapes which are hidden by zoom changing.
    hiddenShape: { [shapeId: string]: boolean };
    // the ratio to scale the shapes (e.g. labelShape, labelBackgroundShape) to keep to visual size while zooming.
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
    zoom: 1,
    zoomLevel: 0,
    balanceRatio: 1,
    levelShapes: {},
    wordWrapWidth: 32,
    animateConfig: DEFAULT_ANIMATE_CFG.zoom,
    firstRender: true,
  };

  constructor(props) {
    const { themeStyles, lodStrategy, enableBalanceShape, zoom } = props;
    if (themeStyles) this.themeStyles = themeStyles;
    this.lodStrategy = lodStrategy;
    this.enableBalanceShape = enableBalanceShape;
    this.zoomCache.zoom = zoom;
    this.zoomCache.balanceRatio = 1 / zoom;
    this.zoomCache.animateConfig = {
      ...DEFAULT_ANIMATE_CFG.zoom,
      ...lodStrategy?.animateCfg,
    };
  }

  /**
   * Get merged styles from `getMergedStyles` and assigns the merged styles to the 'mergedStyles' property.
   * @param model - The NodeDisplayModel or ComboDisplayModel to merge the styles from.
   */
  public mergeStyles(model: NodeDisplayModel | ComboDisplayModel) {
    this.mergedStyles = this.getMergedStyles(model);
  }

  /**
   * Merge style
   * @param model - The NodeDisplayModel or ComboDisplayModel to retrieve the merged styles from.
   * @returns The merged styles as a NodeShapeStyles object.
   */
  public getMergedStyles(model: NodeDisplayModel | ComboDisplayModel) {
    const { data } = model;
    const dataStyles = {} as NodeShapeStyles | ComboShapeStyles;
    Object.keys(data).forEach((fieldName) => {
      if (RESERVED_SHAPE_IDS.includes(fieldName)) {
        if (fieldName === 'badgeShapes') {
          dataStyles[fieldName] = {};
          Object.keys(data[fieldName]).forEach((key) => {
            if (isNaN(Number(key))) {
              // key is not a number, it is a common style
              dataStyles[fieldName][key] = data[fieldName][key];
              return;
            }
            const { position } = data[fieldName][key];
            dataStyles[`${position}BadgeShape`] = {
              ...data[fieldName][key],
              tag: 'badgeShape',
            };
          });
        } else if (fieldName === 'anchorShapes') {
          Object.keys(data[fieldName]).forEach((idx) => {
            dataStyles[`anchorShape${idx}`] = {
              ...data[fieldName][idx],
              tag: 'anchorShape',
            };
          });
        } else {
          dataStyles[fieldName] = data[fieldName] as ShapeStyle;
        }
      } else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
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
    ]) as NodeShapeStyles;
    const padding = merged.labelBackgroundShape?.padding;
    if (padding) {
      merged.labelBackgroundShape.padding = formatPadding(padding);
    }
    return merged;
  }
  /**
   * Call it after calling draw function to update cache about bounds and zoom levels.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   */
  public updateCache(shapeMap) {
    const levelShapes = {};
    Object.keys(shapeMap).forEach((shapeId) => {
      const { lod } = shapeMap[shapeId].attributes;
      if (lod !== undefined) {
        levelShapes[lod] = levelShapes[lod] || [];
        levelShapes[lod].push(shapeId);
      }
    });
    this.zoomCache.levelShapes = levelShapes;

    if (shapeMap.labelShape) {
      const { maxWidth = '200%' } = this.mergedStyles.labelShape || {};
      this.zoomCache.wordWrapWidth = getWordWrapWidthByBox(
        shapeMap.keyShape.getLocalBounds(),
        maxWidth,
        1,
      );
    }
  }
  /**
   * Draw all elements related to the node.
   * You should call `drawKeyShape` and `drawAnchorShape`,`drawLabelShape`,`drawIconShape`...as you like.
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current node's state.
   * @returns An object containing the keyShape and optional labelShape, iconShape, and some otherShapes properties
   */
  abstract draw(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): {
    keyShape: DisplayObject;
    labelShape?: DisplayObject;
    iconShape?: DisplayObject;
    [otherShapeId: string]: DisplayObject;
  };

  /**
   * Perform additional drawing operations or add custom shapes after drawing node.
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param shapesChanged An array of shape IDs that have changed and need to be updated.
   * @returns An object that contains some new shapes to be added to the node.
   */
  public afterDraw(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    shapesChanged?: string[],
  ): { [otherShapeId: string]: DisplayObject } {
    return {};
  }
  // shouldUpdate: (model: NodeDisplayModel, prevModel: NodeDisplayModel) => boolean = () => true;

  /**
   * Set the state for the node.
   * @param state state name
   * @param value state value
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   */
  public setState: (
    name: string,
    value: boolean,
    shapeMap: { [shapeId: string]: DisplayObject },
  ) => void;

  /**
   * The key function of drawing shape.
   * Draw the key shape of the node based on the provided model and shape map.
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current node's state.
   * @returns The display object representing the key shape of the node.
   */
  abstract drawKeyShape(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject;

  /**
   * Draw the label shape of the node
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current node's state.
   * @returns The display object representing the label shape of the node.
   */
  public drawLabelShape(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { labelShape: shapeStyle } = this.mergedStyles;
    if (!shapeStyle || !shapeStyle.text || !model.data.labelShape) return;
    const { keyShape } = shapeMap;
    const keyShapeBox = getShapeLocalBoundsByStyle(
      keyShape,
      this.mergedStyles.keyShape,
      keyShape.getLocalBounds(),
    );
    const {
      position,
      offsetX: propsOffsetX,
      offsetY: propsOffsetY,
      offsetZ: propsOffsetZ,
      maxWidth,
      // @ts-ignore
      angle,
      ...otherStyle
    } = shapeStyle;

    const wordWrapWidth = getWordWrapWidthByBox(
      keyShapeBox as AABB,
      maxWidth,
      this.zoomCache.zoom,
      this.enableBalanceShape,
    );

    const positionPreset = {
      x: keyShapeBox.center[0],
      y: keyShapeBox.max[1],
      z: keyShapeBox.center[2],
      textBaseline: 'top',
      textAlign: 'center',
      offsetX: 0,
      offsetY: 0,
      offsetZ: 0,
      wordWrapWidth,
    };
    switch (position) {
      case 'center':
        positionPreset.y = keyShapeBox.center[1];
        positionPreset.textBaseline = 'middle';
        break;
      case 'top':
        positionPreset.y = keyShapeBox.min[1];
        positionPreset.textBaseline = 'bottom';
        positionPreset.offsetY = -2;
        break;
      case 'left':
        positionPreset.x = keyShapeBox.min[0];
        positionPreset.y = keyShapeBox.center[1];
        positionPreset.textAlign = 'right';
        positionPreset.textBaseline = 'middle';
        positionPreset.offsetX = -4;
        break;
      case 'right':
        positionPreset.x = keyShapeBox.max[0];
        positionPreset.y = keyShapeBox.center[1];
        positionPreset.textAlign = 'left';
        positionPreset.textBaseline = 'middle';
        positionPreset.offsetX = 4;
        break;
      default: // at bottom by default
        positionPreset.offsetY = 2;
        break;
    }
    const offsetX = (
      propsOffsetX === undefined ? positionPreset.offsetX : propsOffsetX
    ) as number;
    const offsetY = (
      propsOffsetY === undefined ? positionPreset.offsetY : propsOffsetY
    ) as number;
    const offsetZ = (
      propsOffsetZ === undefined ? positionPreset.offsetZ : propsOffsetZ
    ) as number;
    positionPreset.x += offsetX;
    positionPreset.y += offsetY;
    positionPreset.z += offsetZ;

    const style: any = {
      ...this.defaultStyles.labelShape,
      ...positionPreset,
      isBillboard: true,
      ...otherStyle,
    };
    if (angle) {
      style.transform = `rotate(${angle}rad)`;
    }
    return this.upsertShape('text', 'labelShape', style, shapeMap, model);
  }

  /**
   * Draw the label background shape of the node
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current node's state.
   * @returns The display object representing the label background shape of the node.
   */
  public drawLabelBackgroundShape(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { oldState: State[]; newState: State[] },
  ): DisplayObject {
    const { labelShape } = shapeMap;
    if (!labelShape || !labelShape.style.text || !model.data.labelShape) return;
    // label's local bounds, will take scale into acount
    const textBBoxGeo = labelShape.getGeometryBounds();
    const height = textBBoxGeo.max[1] - textBBoxGeo.min[1];
    const width = Math.min(
      textBBoxGeo.max[0] - textBBoxGeo.min[0] + 2,
      labelShape.attributes.wordWrapWidth,
    );

    const { padding, ...backgroundStyle } =
      this.mergedStyles.labelBackgroundShape;

    const bgStyle: any = {
      fill: '#fff',
      ...backgroundStyle,
      x: labelShape.attributes.x + textBBoxGeo.min[0] - padding[3],
      y: labelShape.attributes.y + textBBoxGeo.min[1] - padding[0],
      width: width + padding[1] + padding[3],
      height: height + padding[0] + padding[2],
    };
    const bgShape = this.upsertShape(
      'rect',
      'labelBackgroundShape',
      bgStyle,
      shapeMap,
      model,
    );

    return bgShape;
  }

  /**
   * Draw the icon shape of the node
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current node's state.
   * @returns The display object representing the icon shape of the node.
   */
  public drawIconShape(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { iconShape: shapeStyle } = this.mergedStyles;
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
    if (iconShapeType === 'image') {
      shapeStyle.x = -w / 2 + offsetX;
      shapeStyle.y = -h / 2 + offsetY;
      shapeStyle.width = w;
      shapeStyle.height = h;
    } else {
      shapeStyle.textAlign = 'center';
      shapeStyle.textBaseline = 'middle';
      shapeStyle.x = offsetX;
      shapeStyle.y = offsetY;
      shapeStyle.fontSize = w;
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
   * Draw the halo shape of the node
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current node's state.
   * @returns The display object representing the halo shape of the node.
   */
  public drawHaloShape(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    const { haloShape: haloShapeStyle, keyShape: keyShapeStyle } =
      this.mergedStyles;
    if (haloShapeStyle.visible === false) return;
    const { nodeName, attributes } = keyShape;
    const { x, y, fill } = attributes;
    return this.upsertShape(
      nodeName as SHAPE_TYPE,
      'haloShape',
      {
        ...attributes,
        ...keyShapeStyle,
        x,
        y,
        stroke: fill,
        ...haloShapeStyle,
        batchKey: 'halo',
      },
      shapeMap,
      model,
    );
  }

  /**
   * Draw the anchors shape of the node
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current node's state.
   * @returns The display object representing the anchors shape of the node.
   */
  public drawAnchorShapes(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): {
    [shapeId: string]: DisplayObject;
  } {
    const { anchorShapes: commonStyle, keyShape: keyShapeStyle } =
      this.mergedStyles;

    const individualConfigs = Object.values(this.mergedStyles).filter(
      (style) => style.tag === 'anchorShape',
    );
    if (!individualConfigs.length) return;
    const shapes = {};
    const anchorPositionMap = this.calculateAnchorPosition(keyShapeStyle);
    individualConfigs.forEach((config, i) => {
      const { position, fill = keyShapeStyle.fill, ...style } = config;
      const [cx, cy] = this.getAnchorPosition(
        position,
        anchorPositionMap,
        shapeMap,
      );
      const id = `anchorShape${i}`;
      shapes[id] = this.upsertShape(
        'circle',
        id,
        {
          cx,
          cy,
          fill,
          ...commonStyle,
          ...style,
        } as GShapeStyle,
        shapeMap,
        model,
      );
    });
    return shapes;
  }

  private getAnchorPosition(
    position: string | [number, number],
    anchorPositionMap: IAnchorPositionMap,
    shapeMap: NodeShapeMap | ComboShapeMap,
  ): [number, number] {
    const keyShapeBBox = shapeMap.keyShape.getLocalBounds();
    const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
    const keyShapeHeight = keyShapeBBox.max[1] - keyShapeBBox.min[1];
    const defaultPosition: [number, number] = [
      keyShapeBBox.max[0] - keyShapeBBox.center[0],
      keyShapeBBox.min[1] - keyShapeBBox.center[1],
    ]; //topRight
    if (position instanceof Array) {
      return [
        keyShapeWidth * (position[0] - 0.5),
        keyShapeHeight * (position[1] - 0.5),
      ];
    } else if (typeof position === 'string') {
      position = position.toLowerCase();
      //receive a unknown string, remind the user.
      return (
        anchorPositionMap[position] ||
        anchorPositionMap['default'] ||
        defaultPosition
      );
    }
    //receive a position in unknown type (such as a number or undefined).
    return anchorPositionMap['default'] || defaultPosition;
  }

  /**
   * Configures the anchor positions based on the provided keyShapeStyle and returns the configuration.
   * e.g for a CircleNode, it returns: `{"right":keyShapeStyle.x+keyShapeStyle.r, keyShapeStyle.y}`
   * @param keyShapeStyle - The keyShapeStyle object that contains the style information of the key shape.
   * @returns The anchor position configuration as an IAnchorPositionMap object.
   */
  public calculateAnchorPosition(keyShapeStyle: any): IAnchorPositionMap {
    const x = convertToNumber(keyShapeStyle.x);
    const y = convertToNumber(keyShapeStyle.y);
    const r = convertToNumber(keyShapeStyle.r);
    const anchorPositionMap = {};
    anchorPositionMap['top'] = [x, y - r];
    anchorPositionMap['left'] = [x - r, y];
    anchorPositionMap['right'] = anchorPositionMap['default'] = [x + r, y];
    anchorPositionMap['bottom'] = [x, y + r];
    return anchorPositionMap;
  }

  /**
   * Draw the badges shape of the node
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current node's state.
   * @returns The display object representing the badges shape of the node.
   */
  public drawBadgeShapes(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): {
    [shapeId: string]: DisplayObject;
  } {
    const { badgeShapes: commonStyle, keyShape: keyShapeStyle } =
      this.mergedStyles;
    const individualConfigs = Object.values(this.mergedStyles).filter(
      (style) => style.tag === 'badgeShape',
    );
    if (!individualConfigs.length) return {};
    const keyShapeBBox = getShapeLocalBoundsByStyle(
      shapeMap.keyShape,
      keyShapeStyle,
      shapeMap.keyShape.getLocalBounds(),
    );
    const keyShapeSize = Math.min(
      keyShapeBBox.max[0] - keyShapeBBox.min[0],
      keyShapeBBox.max[1] - keyShapeBBox.min[1],
    );
    const shapes = {};
    individualConfigs.forEach((config, i) => {
      const { position, ...individualStyle } = config;
      const id = `${position}BadgeShape`;
      const style = {
        ...commonStyle,
        ...individualStyle,
      };
      const colorFromPalette = commonStyle.palette
        ? commonStyle.palette[i % commonStyle.palette.length]
        : '#7E92B5';
      const {
        text = '',
        type,
        color = colorFromPalette,
        size = keyShapeSize / 3,
        textColor,
        zIndex = 2,
        offsetX = 0,
        offsetY = 0,
        ...otherStyles
      } = style;

      const bgHeight = size as number;

      const pos = { x: 0, y: 0 };
      switch (position) {
        case 'rightTop':
        case 'topRight':
          pos.x = keyShapeBBox.max[0] / 2 + offsetX;
          pos.y = keyShapeBBox.min[1] * 0.44 - bgHeight + offsetY;
          break;
        case 'right':
          pos.x = keyShapeBBox.max[0] / 2 + offsetX;
          pos.y = -bgHeight / 2 + offsetY;
          break;
        case 'rightBottom':
        case 'bottomRight':
          pos.x = keyShapeBBox.max[0] / 2 + offsetX;
          pos.y = keyShapeBBox.max[1] * 0.44 + offsetY;
          break;
        case 'leftTop':
        case 'topLeft':
          pos.x = keyShapeBBox.min[0] / 2 + offsetX;
          pos.y = keyShapeBBox.min[1] * 0.44 - bgHeight + offsetY;
          break;
        case 'left':
          pos.x = keyShapeBBox.min[0] / 2 + offsetX;
          pos.y = -bgHeight / 2 + offsetY;
          break;
        case 'leftBottom':
        case 'bottomLeft':
          pos.x = keyShapeBBox.min[0] / 2 + offsetX;
          pos.y = keyShapeBBox.max[1] * 0.44 + offsetY;
          break;
        case 'top':
          pos.x = offsetX;
          pos.y = keyShapeBBox.min[1] * 0.44 - bgHeight + offsetY;
          break;
        default:
          // bottom
          pos.x = offsetX;
          pos.y = keyShapeBBox.max[1] * 0.44 + offsetY;
          break;
      }

      const positionLowerCase = position.toLowerCase();
      const isLeft = positionLowerCase.includes('left');
      const isCenter = !isLeft && !positionLowerCase.includes('right');

      // a radius rect (as container) + a text / icon
      const fontSize = bgHeight - 3;
      let textAlign = isLeft ? 'right' : 'left';
      let textX = isLeft ? pos.x - 3 : pos.x + 2;
      if (isCenter) {
        textAlign = 'center';
        textX = pos.x;
      }
      shapes[id] = this.upsertShape(
        'text',
        id,
        {
          text,
          fill: textColor,
          fontSize,
          x: textX,
          y: pos.y + bgHeight / 2,
          ...otherStyles,
          textAlign,
          textBaseline: 'middle',
          zIndex: (zIndex as number) + 1,
        } as GShapeStyle,
        shapeMap,
        model,
      );
      const bbox = shapes[id].getLocalBounds();

      const bgShapeId = `${position}BadgeBackgroundShape`;
      const bgWidth =
        (text as string).length <= 1
          ? bgHeight
          : Math.max(bgHeight, bbox.max[0] - bbox.min[0]) + 8;
      shapes[bgShapeId] = this.upsertShape(
        'rect',
        bgShapeId,
        {
          text,
          fill: color,
          height: bgHeight,
          width: bgWidth,
          radius: bgHeight / 2,
          zIndex,
          x: bbox.center[0] - bgWidth / 2,
          y: bbox.center[1] - bgHeight / 2,
          ...otherStyles,
        } as GShapeStyle,
        shapeMap,
        model,
      );
    });

    return shapes;
  }

  /**
   * Draw other shapes(such as preRect,stateIcon) of the node
   * @param model The displayed model of this node, only for drawing and not received by users.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param diffData An object that contains previous and current data.
   * @param diffState An object that contains previous and current node's state.
   * @returns The display object representing the other shapes of the node.
   */
  public drawOtherShapes(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): { [id: string]: DisplayObject } {
    return {};
  }

  /**
   * The listener for graph zooming.
   * 1. show / hide some shapes while zoom level changed;
   * 2. change the shapes' sizes to make them have same visual size while zooming, e.g. labelShape, labelBackgroundShape.
   * @param shapeMap The shape map that contains all of the elements to show on the node.
   * @param zoom The zoom level of the graph.
   */
  public onZoom = (
    shapeMap: NodeShapeMap | ComboShapeMap,
    zoom: number,
    cacheHiddenShape = {},
  ) => {
    // zoomLevel changed
    if (this.lodStrategy) {
      const { levels } = this.lodStrategy;
      // last zoom ratio responsed by zoom changing, which might not equal to zoom.previous in props since the function is debounced.
      const {
        levelShapes,
        hiddenShape,
        animateConfig,
        firstRender = true,
        zoomLevel: previousLevel,
      } = this.zoomCache;
      const currentLevel = getZoomLevel(levels, zoom);
      const levelNums = Object.keys(levelShapes).map(Number);
      const maxLevel = Math.max(...levelNums);
      const minLevel = Math.min(...levelNums);
      if (currentLevel < previousLevel) {
        if (firstRender) {
          // zoomLevel changed, from higher to lower, hide something
          for (let i = currentLevel + 1; i <= maxLevel; i++) {
            levelShapes[String(i)]?.forEach((id) => {
              if (!shapeMap[id] || cacheHiddenShape[id]) return;
              shapeMap[id].hide();
              hiddenShape[id] = true;
            });
          }
        } else {
          // zoomLevel changed, from higher to lower, hide something
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
      this.zoomCache.zoomLevel = currentLevel;
    }
    this.zoomCache.zoom = zoom;
  };

  /**
   * Update the shapes' sizes e.g. labelShape, labelBackgroundShape, to keep the visual size while zooming.
   * @param shapeMap
   * @param zoom
   * @returns
   */
  private balanceShapeSize(
    shapeMap: NodeShapeMap | ComboShapeMap,
    zoom: number,
  ) {
    if (!this.enableBalanceShape) return;
    // balance the size for label, badges
    const { keyShape, labelShape, labelBackgroundShape } = shapeMap;
    const balanceRatio = 1 / zoom || 1;
    this.zoomCache.balanceRatio = balanceRatio;
    if (!labelShape || !labelShape.isVisible()) return;
    const { position = 'bottom' } = this.mergedStyles.labelShape;

    const keyShapeLocal = keyShape.getLocalBounds();
    if (zoom < 1) {
      // if it is zoom-out, do not scale the gap between keyShape and labelShape, differentiate from zoom-in by adjusting transformOrigin
      if (position === 'bottom') labelShape.style.transformOrigin = '0';
      else labelShape.style.transformOrigin = '';
    } else {
      switch (position) {
        case 'bottom':
          labelShape.style.transformOrigin = `0 ${
            keyShapeLocal.max[1] - labelShape.attributes.y
          }`;
          break;
        case 'right':
          labelShape.style.transformOrigin = `${
            keyShapeLocal.max[0] - labelShape.attributes.x
          } 0`;
          break;
        case 'top':
          labelShape.style.transformOrigin = `0 ${
            keyShapeLocal.min[1] - labelShape.attributes.y
          }`;
          break;
        case 'left':
          labelShape.style.transformOrigin = `${
            keyShapeLocal.min[0] - labelShape.attributes.x
          } 0`;
          break;
        default:
          // center
          labelShape.style.transformOrigin = ``;
          break;
      }
    }
    const oriTransform = (labelShape.style.transform || '').replace(
      this.scaleTransformCache,
      '',
    );
    const scaleTransform = `scale(${balanceRatio}, ${balanceRatio})`;
    labelShape.style.transform = `${oriTransform} ${scaleTransform}`;
    this.scaleTransformCache = scaleTransform;
    labelShape.style.wordWrapWidth = this.zoomCache.wordWrapWidth * zoom;

    if (!labelBackgroundShape || !labelBackgroundShape.isVisible()) return;

    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = this
      .mergedStyles.labelBackgroundShape.padding as number[];
    const sidePadding = paddingRight + paddingLeft;
    const { width, height, x, y } = labelBackgroundShape.attributes;

    switch (position) {
      case 'top':
        // if it is zoom-out, do not scale the gap between keyShape and labelShape, differentiate from zoom-in by adjusting transformOrigin
        labelBackgroundShape.style.transformOrigin = `${
          paddingLeft + (width - sidePadding) / 2
        } ${zoom < 1 ? height - paddingBottom : keyShapeLocal.min[1] - y}`;
        break;
      case 'left':
        labelBackgroundShape.style.transformOrigin = `${
          zoom < 1 ? width - paddingRight : keyShapeLocal.min[0] - x
        } ${paddingTop + (height - paddingTop - paddingBottom) / 2}`;
        break;
      case 'right':
        labelBackgroundShape.style.transformOrigin = `${
          zoom < 1 ? paddingLeft : keyShapeLocal.max[0] - x
        } ${paddingTop + (height - paddingTop - paddingBottom) / 2}`;
        break;
      case 'bottom':
        labelBackgroundShape.style.transformOrigin = `${
          paddingLeft + (width - sidePadding) / 2
        } ${
          zoom < 1
            ? paddingTop + (height - paddingTop - paddingBottom) / 2
            : keyShapeLocal.max[1] - y
        }`;
        break;
      default:
        // center
        labelBackgroundShape.style.transformOrigin = `${
          paddingLeft + (width - sidePadding) / 2
        } ${paddingTop + (height - paddingTop - paddingBottom) / 2}`;
    }

    const labelBBox = labelShape.getGeometryBounds();
    const labelWidth = labelBBox.max[0] - labelBBox.min[0];
    const xAxistRatio = (labelWidth * balanceRatio + sidePadding) / width;

    labelBackgroundShape.style.transform = `scale(${xAxistRatio}, ${balanceRatio})`;
  }

  /**
   * Create (if does not exit in shapeMap) or update the shape according to the configurations.
   * @param type shape's type
   * @param id unique string to indicates the shape
   * @param style style to be updated
   * @param shapeMap the shape map of a node / combo
   * @param model data model of the node / combo
   * @returns The display object representing the shape.
   */
  public upsertShape(
    type: SHAPE_TYPE | SHAPE_TYPE_3D,
    id: string,
    style: ShapeStyle,
    shapeMap: NodeShapeMap | ComboShapeMap,
    model: NodeDisplayModel | ComboDisplayModel,
  ): DisplayObject {
    return upsertShape(
      type as SHAPE_TYPE,
      id,
      style as GShapeStyle,
      shapeMap,
      model,
    );
  }
}
