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
  lodStrategyObj,
} from '../../../types/item';
import {
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
} from '../../../types/node';
import {
  LOCAL_BOUNDS_DIRTY_FLAG_KEY,
  formatPadding,
  getShapeLocalBoundsByStyle,
  mergeStyles,
  upsertShape,
} from '../../../util/shape';
import { getWordWrapWidthByBox } from '../../../util/text';
import { DEFAULT_ANIMATE_CFG, fadeIn, fadeOut } from '../../../util/animate';
import { getZoomLevel } from '../../../util/zoom';
import { AnimateCfg } from '../../../types/animate';

export abstract class BaseNode {
  type: string;
  defaultStyles: NodeShapeStyles;
  themeStyles: NodeShapeStyles;
  mergedStyles: NodeShapeStyles;
  lodStrategy?: lodStrategyObj;
  boundsCache: {
    keyShapeLocal?: AABB;
    labelShapeLocal?: AABB;
  };
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
  public mergeStyles(model: NodeDisplayModel) {
    this.mergedStyles = this.getMergedStyles(model);
  }
  public getMergedStyles(model: NodeDisplayModel) {
    const { data } = model;
    const dataStyles = {} as NodeShapeStyles;
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
          this.boundsCache[`${id}Local`] =
            id === 'labelShape'
              ? shape.getGeometryBounds()
              : shape.getLocalBounds();
          shape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, false);
        }
      });

    const { levelShapes } = this.zoomCache;
    Object.keys(shapeMap).forEach((shapeId) => {
      const { lod } = shapeMap[shapeId].attributes;
      if (lod !== undefined) {
        levelShapes[lod] = levelShapes[lod] || [];
        levelShapes[lod].push(shapeId);
      }
    });

    if (shapeMap.labelShape && this.boundsCache.keyShapeLocal) {
      const { maxWidth = '200%' } = this.mergedStyles.labelShape || {};
      this.zoomCache.wordWrapWidth = getWordWrapWidthByBox(
        this.boundsCache.keyShapeLocal,
        maxWidth,
        1,
      );
    }
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
    const keyShapeBox = getShapeLocalBoundsByStyle(
      keyShape,
      this.mergedStyles.keyShape,
      this.boundsCache.keyShapeLocal,
    );
    const { labelShape: shapeStyle } = this.mergedStyles;
    const {
      position,
      offsetX: propsOffsetX,
      offsetY: propsOffsetY,
      offsetZ: propsOffsetZ,
      maxWidth,
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
    const offsetZ = (
      propsOffsetZ === undefined ? positionPreset.offsetZ : propsOffsetZ
    ) as number;
    positionPreset.x += offsetX;
    positionPreset.y += offsetY;
    positionPreset.z += offsetZ;

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
      this.boundsCache.labelShapeLocal = labelShape.getGeometryBounds();
      labelShape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, false);
    }
    // label's local bounds, will take scale into acount
    const { labelShapeLocal: textBBox } = this.boundsCache;
    const labelWidth = Math.min(
      textBBox.max[0] - textBBox.min[0],
      labelShape.attributes.wordWrapWidth,
    );
    const height = textBBox.max[1] - textBBox.min[1];
    const labelAspectRatio = labelWidth / (textBBox.max[1] - textBBox.min[1]);
    const width = labelAspectRatio * height;

    const { padding, ...backgroundStyle } =
      this.mergedStyles.labelBackgroundShape;
    const y =
      labelShape.attributes.y -
      (labelShape.attributes.textBaseline === 'top'
        ? padding[0]
        : height / 2 + padding[0]);
    const bgStyle: any = {
      fill: '#fff',
      ...backgroundStyle,
      x: textBBox.center[0] - width / 2 - padding[3],
      y,
      width: width + padding[1] + padding[3],
      height: height + padding[0] + padding[2],
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
    if (haloShapeStyle.visible === false) return;
    const { nodeName, attributes } = keyShape;
    return this.upsertShape(
      nodeName as SHAPE_TYPE,
      'haloShape',
      {
        ...attributes,
        stroke: attributes.fill,
        ...haloShapeStyle,
        batchKey: 'halo',
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

      const pos = { x: 0, y: 0 };
      switch (position) {
        case 'rightTop':
        case 'topRight':
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
          fontSize: bgHeight - 3,
          x: pos.x,
          y: pos.y,
          ...otherStyles,
          textAlign: position.toLowerCase().includes('right') ? 'left' : 'right',
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
  private balanceShapeSize(shapeMap: NodeShapeMap, zoom: number) {
    // balance the size for label, badges
    const { labelShape, labelBackgroundShape } = shapeMap;
    const balanceRatio = 1 / zoom || 1;
    this.zoomCache.balanceRatio = balanceRatio;
    const { labelShape: labelStyle } = this.mergedStyles;
    const { position = 'bottom' } = labelStyle;
    if (!labelShape || !labelShape.isVisible()) return;

    if (position === 'bottom') labelShape.style.transformOrigin = '0';
    else labelShape.style.transformOrigin = '';
    labelShape.style.transform = `scale(${balanceRatio}, ${balanceRatio})`;
    const wordWrapWidth = this.zoomCache.wordWrapWidth * zoom;
    labelShape.style.wordWrapWidth = wordWrapWidth;

    if (!labelBackgroundShape || !labelBackgroundShape.isVisible()) return;

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

    const labelBBox = labelShape.getGeometryBounds();
    const labelWidth = Math.min(
      labelBBox.max[0] - labelBBox.min[0],
      this.zoomCache.wordWrapWidth,
    );
    const xAxistRatio =
      ((labelWidth + paddingLeft + paddingRight) * balanceRatio) / width;

    labelBackgroundShape.style.transform = `scale(${xAxistRatio}, ${balanceRatio})`;
  }

  public upsertShape(
    type: SHAPE_TYPE | SHAPE_TYPE_3D,
    id: string,
    style: ShapeStyle,
    shapeMap: NodeShapeMap,
    model: NodeDisplayModel,
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
