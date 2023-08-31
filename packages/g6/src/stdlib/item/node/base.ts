import { AABB, DisplayObject } from '@antv/g';
import { OTHER_SHAPES_FIELD_NAME, RESERVED_SHAPE_IDS } from '../../../constant';
import { NodeDisplayModel } from '../../../types';
import {
  BadgePosition,
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
  LOCAL_BOUNDS_DIRTY_FLAG_KEY,
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
  boundsCache: {
    keyShapeLocal?: AABB;
    labelShapeGeometry?: AABB;
  };
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
    const { themeStyles, lodStrategy, zoom } = props;
    if (themeStyles) this.themeStyles = themeStyles;
    this.lodStrategy = lodStrategy;
    this.boundsCache = {};
    this.zoomCache.zoom = zoom;
    this.zoomCache.balanceRatio = 1 / zoom;
    this.zoomCache.animateConfig = {
      ...DEFAULT_ANIMATE_CFG.zoom,
      ...lodStrategy?.animateCfg,
    };
  }

  /**
   * Merge default style with the style Customized by users
   */
  public mergeStyles(model: NodeDisplayModel | ComboDisplayModel) {
    this.mergedStyles = this.getMergedStyles(model);
  }
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
   */
  public updateCache(shapeMap) {
    ['keyShape', 'labelShape']
      .concat(Object.keys(BadgePosition))
      .map((pos) => `${pos}BadgeShape`)
      .forEach((id) => {
        const shape = shapeMap[id];
        if (shape?.getAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY)) {
          if (id === 'labelShape') {
            this.boundsCache[`${id}Geometry`] = shape.getGeometryBounds();
          } else {
            this.boundsCache[`${id}Local`] = shape.getLocalBounds();
          }
          shape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, false);
        }
      });

    const levelShapes = {};
    Object.keys(shapeMap).forEach((shapeId) => {
      const { lod } = shapeMap[shapeId].attributes;
      if (lod !== undefined) {
        levelShapes[lod] = levelShapes[lod] || [];
        levelShapes[lod].push(shapeId);
      }
    });
    this.zoomCache.levelShapes = levelShapes;

    if (shapeMap.labelShape && this.boundsCache.keyShapeLocal) {
      const { maxWidth = '200%' } = this.mergedStyles.labelShape || {};
      this.zoomCache.wordWrapWidth = getWordWrapWidthByBox(
        this.boundsCache.keyShapeLocal,
        maxWidth,
        1,
      );
    }
  }
  /**
   * Draw all elements related to the graphic.
   * You should call `drawKeyShape` and `drawAnchorShape`,`drawLabelShape`,`drawIconShape`...as you like.
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

  public afterDraw(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    shapesChanged?: string[],
  ): { [otherShapeId: string]: DisplayObject } {
    return {};
  }
  // shouldUpdate: (model: NodeDisplayModel, prevModel: NodeDisplayModel) => boolean = () => true;
  public setState: (
    name: string,
    value: boolean,
    shapeMap: { [shapeId: string]: DisplayObject },
  ) => void;

  /**
   * The key function of drawing shape.
   * Defined the basic shape of the node.
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
   * Draw the label of the node
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
    if (!shapeStyle) return;
    const { keyShape } = shapeMap;
    this.boundsCache.keyShapeLocal =
      this.boundsCache.keyShapeLocal || keyShape.getLocalBounds();
    const keyShapeBox = getShapeLocalBoundsByStyle(
      keyShape,
      this.mergedStyles.keyShape,
      this.boundsCache.keyShapeLocal,
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
   * Draw the label background of the node
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
    if (!labelShape || !model.data.labelShape) return;
    if (
      !this.boundsCache.labelShapeGeometry ||
      labelShape.getAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY)
    ) {
      this.boundsCache.labelShapeGeometry = labelShape.getGeometryBounds();
      labelShape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, false);
    }
    // label's local bounds, will take scale into acount
    const { labelShapeGeometry: textBBoxGeo } = this.boundsCache;
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
    this.balanceShapeSize(shapeMap, this.zoomCache.zoom);

    return bgShape;
  }

  /**
   * Draw the icon of the node
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
   * Draw the halo of the node
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
   * Draw the anchors of the node
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
    this.boundsCache.keyShapeLocal =
      this.boundsCache.keyShapeLocal || shapeMap.keyShape.getLocalBounds();
    const shapes = {};
    const anchorPositionMap = this.calculateAnchorPosition(keyShapeStyle);
    individualConfigs.forEach((config, i) => {
      const { position, fill = keyShapeStyle.fill, ...style } = config;
      const [cx, cy] = this.getAnchorPosition(position, anchorPositionMap);
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
  ): [number, number] {
    const keyShapeBBox = this.boundsCache.keyShapeLocal;
    const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
    const keyShapeHeight = keyShapeBBox.max[1] - keyShapeBBox.min[1];
    const defaultPosition: [number, number] = [
      keyShapeBBox.max[0],
      keyShapeBBox.min[1],
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
   * Configure anchor position by keyShapeStyle. return the configuration.
   * e.g CircleNode `return {"right":keyShapeStyle.x+keyShapeStyle.r, keyShapeStyle.y}`
   * @param {*} keyShapeStyle
   * @return {IAnchorPositionMap} anchorpositionMap
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
   * Draw the badges of the node
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
    this.boundsCache.keyShapeLocal =
      this.boundsCache.keyShapeLocal || shapeMap.keyShape.getLocalBounds();
    const keyShapeBBox = getShapeLocalBoundsByStyle(
      shapeMap.keyShape,
      keyShapeStyle,
      this.boundsCache.keyShapeLocal,
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
      this.boundsCache[`${id}Local`] = shapes[id].getLocalBounds();
      const bbox = this.boundsCache[`${id}Local`];

      const bgShapeId = `${position}BadgeBackgroundShape`;
      const bgWidth =
        (text as string).length <= 1
          ? bgHeight
          : Math.max(bgHeight, bbox.max[0] - bbox.min[0]) + 8;
      let bgX = isLeft ? pos.x - bgWidth : pos.x;
      if (isCenter) bgX = pos.x - bgWidth / 2;
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
          x: bgX,
          y: pos.y,
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
   * @param shapeMap
   * @param zoom
   */
  public onZoom = (shapeMap: NodeShapeMap | ComboShapeMap, zoom: number) => {
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
              if (!shapeMap[id]) return;
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
    this.balanceShapeSize(shapeMap, zoom);
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
    // balance the size for label, badges
    const { keyShape, labelShape, labelBackgroundShape } = shapeMap;
    const balanceRatio = 1 / zoom || 1;
    this.zoomCache.balanceRatio = balanceRatio;
    if (!labelShape || !labelShape.isVisible()) return;
    const { labelShape: labelStyle } = this.mergedStyles;
    const { position = 'bottom' } = labelStyle;

    const keyShapeLocal = keyShape.getLocalBounds();
    if (zoom < 1) {
      // if it is zoom-out, do not scale the gap between keyShape and labelShape, differentiate from zoom-in by adjusting transformOrigin
      if (position === 'bottom') labelShape.style.transformOrigin = '0';
      else labelShape.style.transformOrigin = '';
    } else {
      switch (position) {
        case 'bottom':
          labelShape.style.transformOrigin = `0 ${keyShapeLocal.max[1] - labelShape.attributes.y
            }`;
          break;
        case 'right':
          labelShape.style.transformOrigin = `${keyShapeLocal.max[0] - labelShape.attributes.x
            } 0`;
          break;
        case 'top':
          labelShape.style.transformOrigin = `0 ${keyShapeLocal.min[1] - labelShape.attributes.y
            }`;
          break;
        case 'left':
          labelShape.style.transformOrigin = `${keyShapeLocal.min[0] - labelShape.attributes.x
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
    const wordWrapWidth = this.zoomCache.wordWrapWidth * zoom;
    labelShape.style.wordWrapWidth = wordWrapWidth;

    if (!labelBackgroundShape || !labelBackgroundShape.isVisible()) return;

    const { padding } = this.mergedStyles.labelBackgroundShape;
    const { width, height, x, y } = labelBackgroundShape.attributes;
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] =
      padding as number[];

    switch (position) {
      case 'top':
        // if it is zoom-out, do not scale the gap between keyShape and labelShape, differentiate from zoom-in by adjusting transformOrigin
        labelBackgroundShape.style.transformOrigin = `${paddingLeft + (width - paddingLeft - paddingRight) / 2
          } ${zoom < 1 ? height - paddingBottom : keyShapeLocal.min[1] - y}`;
        break;
      case 'left':
        labelBackgroundShape.style.transformOrigin = `${zoom < 1 ? width - paddingRight : keyShapeLocal.min[0] - x
          } ${paddingTop + (height - paddingTop - paddingBottom) / 2}`;
        break;
      case 'right':
        labelBackgroundShape.style.transformOrigin = `${zoom < 1 ? paddingLeft : keyShapeLocal.max[0] - x
          } ${paddingTop + (height - paddingTop - paddingBottom) / 2}`;
        break;
      case 'bottom':
        labelBackgroundShape.style.transformOrigin = `${paddingLeft + (width - paddingLeft - paddingRight) / 2
          } ${zoom < 1
            ? paddingTop + (height - paddingTop - paddingBottom) / 2
            : keyShapeLocal.max[1] - y
          }`;
        break;
      default:
        // center
        labelBackgroundShape.style.transformOrigin = `${paddingLeft + (width - paddingLeft - paddingRight) / 2
          } ${paddingTop + (height - paddingTop - paddingBottom) / 2}`;
    }

    const { labelShapeGeometry: labelBBox } = this.boundsCache;
    const labelWidth = labelBBox.max[0] - labelBBox.min[0];
    const xAxistRatio =
      (labelWidth * balanceRatio + paddingLeft + paddingRight) / width;

    labelBackgroundShape.style.transform = `scale(${xAxistRatio}, ${balanceRatio})`;
  }

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
