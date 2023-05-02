import { AABB, DisplayObject, ImageStyleProps, TextStyleProps } from '@antv/g';
import {
  DEFAULT_LABEL_BG_PADDING,
  OTHER_SHAPES_FIELD_NAME,
  RESERVED_SHAPE_IDS,
} from '../../../constant';
import { NodeDisplayModel } from '../../../types';
import {
  GShapeStyle,
  SHAPE_TYPE,
  SHAPE_TYPE_3D,
  ShapeStyle,
  State,
  ZoomStrategy,
  ZoomStrategyObj,
} from '../../../types/item';
import {
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
} from '../../../types/node';
import {
  LOCAL_BOUNDS_DIRTY_FLAG_KEY,
  formatPadding,
  mergeStyles,
  upsertShape,
} from '../../../util/shape';
import { getWordWrapWidthByBox } from 'util/text';
import { DEFAULT_ANIMATE_CFG, fadeIn, fadeOut } from 'util/animate';
import { getZoomLevel } from 'util/zoom';
import { AnimateCfg } from 'types/animate';

export abstract class BaseNode {
  type: string;
  defaultStyles: NodeShapeStyles;
  themeStyles: NodeShapeStyles;
  mergedStyles: NodeShapeStyles;
  zoomStrategy?: ZoomStrategyObj;
  boundsCache: {
    keyShapeLocal?: AABB;
    labelShapeLocal?: AABB;
  };
  // cache the zoom level infomations
  private zoomCache: {
    // the id of shapes which are hidden by zoom changing.
    hiddenShape: { [shapeId: string]: boolean };
    // timeout timer for scaling shapes with to keep the visual size, simulates debounce in function.
    balanceTimer: NodeJS.Timeout;
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
  } = {
    hiddenShape: {},
    zoom: 1,
    zoomLevel: 0,
    balanceTimer: undefined,
    balanceRatio: 1,
    levelShapes: {},
    wordWrapWidth: 32,
    animateConfig: DEFAULT_ANIMATE_CFG.zoom,
  };

  constructor(props) {
    const { themeStyles, zoomStrategy } = props;
    if (themeStyles) this.themeStyles = themeStyles;
    this.zoomStrategy = zoomStrategy;
    this.boundsCache = {};
    this.zoomCache.animateConfig = {
      ...DEFAULT_ANIMATE_CFG.zoom,
      ...zoomStrategy?.animateCfg,
    };
  }
  public mergeStyles(model: NodeDisplayModel) {
    this.mergedStyles = this.getMergedStyles(model);
  }
  public getMergedStyles(model: NodeDisplayModel) {
    const { data } = model;
    const dataStyles = {} as NodeShapeStyles;
    Object.keys(data).forEach((fieldName) => {
      if (RESERVED_SHAPE_IDS.includes(fieldName)) {
        if (fieldName === 'badgeShapes') {
          Object.keys(data[fieldName]).forEach((idx) => {
            const { position } = data[fieldName][idx];
            dataStyles[`${position}BadgeShape`] = {
              ...data[fieldName][idx],
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
    ['keyShape', 'labelShape'].forEach((id) => {
      const shape = shapeMap[id];
      if (shape?.getAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY)) {
        this.boundsCache[`${id}Local`] = shape.getLocalBounds();
        shape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, false);
      }
    });

    const { levelShapes } = this.zoomCache;
    Object.keys(shapeMap).forEach((shapeId) => {
      const { showLevel } = shapeMap[shapeId].attributes;
      if (showLevel !== undefined) {
        levelShapes[showLevel] = levelShapes[showLevel] || [];
        levelShapes[showLevel].push(shapeId);
      }
    });

    const { maxWidth = '200%' } = this.mergedStyles.labelShape || {};
    this.zoomCache.wordWrapWidth = getWordWrapWidthByBox(
      this.boundsCache.keyShapeLocal,
      maxWidth,
      1,
    );
  }
  abstract draw(
    model: NodeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    keyShape: DisplayObject;
    labelShape?: DisplayObject;
    iconShape?: DisplayObject;
    [otherShapeId: string]: DisplayObject;
  };

  public afterDraw(
    model: NodeDisplayModel,
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

  abstract drawKeyShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject;

  public drawLabelShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    this.boundsCache.keyShapeLocal =
      this.boundsCache.keyShapeLocal || keyShape.getLocalBounds();
    const keyShapeBox = this.boundsCache.keyShapeLocal;
    const { labelShape: shapeStyle } = this.mergedStyles;
    const {
      position,
      offsetX: propsOffsetX,
      offsetY: propsOffsetY,
      maxWidth,
      ...otherStyle
    } = shapeStyle;

    const wordWrapWidth = getWordWrapWidthByBox(
      keyShapeBox,
      maxWidth,
      this.zoomCache.zoom,
    );

    const positionPreset = {
      x: keyShapeBox.center[0],
      y: keyShapeBox.max[1],
      textBaseline: 'top',
      textAlign: 'center',
      offsetX: 0,
      offsetY: 0,
      wordWrapWidth,
    };
    switch (position) {
      case 'center':
        positionPreset.y = keyShapeBox.center[1];
        break;
      case 'top':
        positionPreset.y = keyShapeBox.min[1];
        positionPreset.textBaseline = 'bottom';
        positionPreset.offsetY = -4;
        break;
      case 'left':
        positionPreset.x = keyShapeBox.min[0];
        positionPreset.y = keyShapeBox.center[1];
        positionPreset.textAlign = 'right';
        positionPreset.textBaseline = 'middle';
        positionPreset.offsetX = -8;
        break;
      case 'right':
        positionPreset.x = keyShapeBox.max[0];
        positionPreset.y = keyShapeBox.center[1];
        positionPreset.textAlign = 'left';
        positionPreset.textBaseline = 'middle';
        positionPreset.offsetX = 8;
        break;
      default: // at bottom by default
        positionPreset.offsetY = 4;
        break;
    }
    const offsetX = (
      propsOffsetX === undefined ? positionPreset.offsetX : propsOffsetX
    ) as number;
    const offsetY = (
      propsOffsetY === undefined ? positionPreset.offsetY : propsOffsetY
    ) as number;
    positionPreset.x += offsetX;
    positionPreset.y += offsetY;

    const style: any = {
      ...this.defaultStyles.labelShape,
      ...positionPreset,
      ...otherStyle,
    };
    return this.upsertShape('text', 'labelShape', style, shapeMap, model);
  }

  public drawLabelBackgroundShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { oldState: State[]; newState: State[] },
  ): DisplayObject {
    const { labelShape } = shapeMap;
    if (!labelShape || !model.data.labelShape) return;
    if (
      !this.boundsCache.labelShapeLocal ||
      labelShape.getAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY)
    ) {
      this.boundsCache.labelShapeLocal = labelShape.getLocalBounds();
      labelShape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, false);
    }
    const { labelShapeLocal: textBBox } = this.boundsCache;

    const { padding, ...backgroundStyle } =
      this.mergedStyles.labelBackgroundShape;
    const { balanceRatio = 1 } = this.zoomCache;
    const bgStyle: any = {
      fill: '#fff',
      ...backgroundStyle,
      x: textBBox.min[0] - padding[3],
      y: textBBox.min[1] - padding[0] / balanceRatio,
      width: textBBox.max[0] - textBBox.min[0] + padding[1] + padding[3],
      height:
        textBBox.max[1] -
        textBBox.min[1] +
        (padding[0] + padding[2]) / balanceRatio,
    };

    return this.upsertShape(
      'rect',
      'labelBackgroundShape',
      bgStyle,
      shapeMap,
      model,
    );
  }

  public drawIconShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
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

  public drawHaloShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    const { haloShape: haloShapeStyle } = this.mergedStyles;
    const { nodeName, attributes } = keyShape;
    return this.upsertShape(
      nodeName as SHAPE_TYPE,
      'haloShape',
      {
        ...attributes,
        ...haloShapeStyle,
        isBillboard: true,
      },
      shapeMap,
      model,
    );
  }

  public drawAnchorShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
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
    const keyShapeBBox = this.boundsCache.keyShapeLocal;
    const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
    const keyShapeHeight = keyShapeBBox.max[1] - keyShapeBBox.min[1];

    const shapes = {};
    individualConfigs.forEach((config, i) => {
      const { position, fill = keyShapeStyle.fill, ...style } = config;
      const id = `anchorShape${i}`;
      shapes[id] = this.upsertShape(
        'circle',
        id,
        {
          cx: keyShapeWidth * (position[0] - 0.5),
          cy: keyShapeHeight * (position[1] - 0.5),
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

  public drawBadgeShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    [shapeId: string]: DisplayObject;
  } {
    const commonStyle = this.mergedStyles.badgeShapes;
    const individualConfigs = Object.values(this.mergedStyles).filter(
      (style) => style.tag === 'badgeShape',
    );
    if (!individualConfigs.length) return {};
    this.boundsCache.keyShapeLocal =
      this.boundsCache.keyShapeLocal || shapeMap.keyShape.getLocalBounds();
    const { keyShapeLocal: keyShapeBBox } = this.boundsCache;
    const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
    const shapes = {};
    individualConfigs.forEach((config) => {
      const { position, ...individualStyle } = config;
      const id = `${position}BadgeShape`;
      const style = {
        ...commonStyle,
        ...individualStyle,
      };
      const {
        text = '',
        type,
        color,
        size = keyShapeWidth / 3,
        textColor,
        zIndex = 2,
        offsetX = 0,
        offsetY = 0,
        ...otherStyles
      } = style;

      const bgHeight = size as number;

      let pos = { x: 0, y: 0 };
      switch (position) {
        case 'rightTop':
          pos.x = keyShapeBBox.max[0] - bgHeight / 2 + offsetX;
          pos.y = keyShapeBBox.min[1] + size / 4 + offsetY;
          break;
        case 'right':
          pos.x = keyShapeBBox.max[0] - bgHeight / 2 + offsetX;
          pos.y = offsetY;
          break;
        case 'rightBottom':
        case 'bottomRight':
          pos.x = keyShapeBBox.max[0] - bgHeight / 2 + offsetX;
          pos.y = keyShapeBBox.max[1] - size / 4 + offsetY;
          break;
        case 'leftTop':
        case 'topLeft':
          pos.x = keyShapeBBox.min[0] + bgHeight / 2 + offsetX;
          pos.y = keyShapeBBox.min[1] + size / 4 + offsetY;
          break;
        case 'left':
          pos.x = keyShapeBBox.min[0] + bgHeight / 2 + offsetX;
          pos.y = offsetY;
          break;
        case 'leftBottom':
        case 'bottomLeft':
          pos.x = keyShapeBBox.min[0] + bgHeight / 2 + offsetX;
          pos.y = keyShapeBBox.max[1] - size / 4 + offsetY;
          break;
        case 'top':
          pos.x = offsetX;
          pos.y = keyShapeBBox.min[1] + size / 4;
          break;
        default:
          // bottom
          pos.x = offsetX;
          pos.y = keyShapeBBox.max[1] - size / 4;
          break;
      }

      // a radius rect (as container) + a text / icon
      shapes[id] = this.upsertShape(
        'text',
        id,
        {
          text,
          fill: textColor,
          fontSize: bgHeight - 2,
          x: pos.x,
          y: pos.y,
          ...otherStyles,
          textAlign: position.includes('right') ? 'left' : 'right',
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
          x: bbox.min[0] - 3, // begin at the border, minus half height
          y: bbox.min[1],
          radius: bgHeight / 2,
          zIndex,
          ...otherStyles,
        } as GShapeStyle,
        shapeMap,
        model,
      );
    });

    return shapes;
  }

  public drawOtherShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
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
  public onZoom = (shapeMap: NodeShapeMap, zoom: number) => {
    this.balanceShapeSize(shapeMap, zoom);
    // zoomLevel changed
    if (!this.zoomStrategy) return;
    const { levels } = this.zoomStrategy;
    // last zoom ratio responsed by zoom changing, which might not equal to zoom.previous in props since the function is debounced.
    const {
      levelShapes,
      hiddenShape,
      animateConfig,
      zoomLevel: previousLevel,
    } = this.zoomCache;
    const currentLevel = getZoomLevel(levels, zoom);
    if (currentLevel < previousLevel) {
      // zoomLevel changed, from higher to lower, hide something
      levelShapes[currentLevel + 1]?.forEach((id) =>
        fadeOut(id, shapeMap[id], hiddenShape, animateConfig),
      );
    } else if (currentLevel > previousLevel) {
      // zoomLevel changed, from lower to higher, show something
      levelShapes[String(currentLevel)]?.forEach((id) =>
        fadeIn(
          id,
          shapeMap[id],
          this.mergedStyles[id] ||
            this.mergedStyles[id.replace('Background', '')],
          hiddenShape,
          animateConfig,
        ),
      );
    }
    this.zoomCache.zoomLevel = currentLevel;
    this.zoomCache.zoom = zoom;
  };

  /**
   * Update the shapes' sizes e.g. labelShape, labelBackgroundShape, to keep the visual size while zooming.
   * @param shapeMap
   * @param zoom
   * @returns
   */
  private balanceShapeSize(shapeMap: NodeShapeMap, zoom: number) {
    // balance the size for label, badges
    const { labelShape, labelBackgroundShape } = shapeMap;
    const balanceRatio = 1 / zoom || 1;
    this.zoomCache.balanceRatio = balanceRatio;
    const { labelShape: labelStyle } = this.mergedStyles;
    const { position = 'bottom' } = labelStyle;
    if (!labelShape) return;

    if (position === 'bottom') labelShape.style.transformOrigin = '0';
    else labelShape.style.transformOrigin = '';
    labelShape.style.transform = `scale(${balanceRatio}, ${balanceRatio})`;
    const wordWrapWidth = this.zoomCache.wordWrapWidth * zoom;
    labelShape.style.wordWrapWidth = wordWrapWidth;

    if (!labelBackgroundShape) return;

    const { padding } = this.mergedStyles.labelBackgroundShape;
    const { width, height } = labelBackgroundShape.attributes;
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] =
      padding as number[];

    switch (position) {
      case 'top':
        labelBackgroundShape.style.transformOrigin = `${
          paddingLeft + (width - paddingLeft - paddingRight) / 2
        } ${height - paddingBottom}`;
        break;
      case 'left':
        labelBackgroundShape.style.transformOrigin = `${width - paddingRight} ${
          paddingTop + (height - paddingTop - paddingBottom) / 2
        }`;
        break;
      case 'right':
        labelBackgroundShape.style.transformOrigin = `${paddingLeft} ${
          paddingTop + (height - paddingTop - paddingBottom) / 2
        }`;
        break;
      case 'bottom':
      default:
        labelBackgroundShape.style.transformOrigin = `${
          paddingLeft + (width - paddingLeft - paddingRight) / 2
        } ${paddingTop + (height - paddingTop - paddingBottom) / 2}`;
    }
    // only scale y-asix, to expand the text range while zoom-in
    labelBackgroundShape.style.transform = `scale(1, ${balanceRatio})`;
  }

  public upsertShape(
    type: SHAPE_TYPE | SHAPE_TYPE_3D,
    id: string,
    style: ShapeStyle,
    shapeMap: NodeShapeMap,
    model: NodeDisplayModel,
  ): DisplayObject {
    debugger;
    return upsertShape(
      type as SHAPE_TYPE,
      id,
      style as GShapeStyle,
      shapeMap,
      model,
    );
  }
}
