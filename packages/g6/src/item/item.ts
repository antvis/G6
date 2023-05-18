import { Group, DisplayObject, AABB, IAnimation } from '@antv/g';
import { clone, isFunction, throttle } from '@antv/util';
import { OTHER_SHAPES_FIELD_NAME, RESERVED_SHAPE_IDS } from '../constant';
import { EdgeShapeMap } from '../types/edge';
import {
  DisplayMapper,
  IItem,
  ItemDisplayModel,
  ItemModel,
  ItemModelData,
  ItemShapeStyles,
  ITEM_TYPE,
  State,
  ZoomStrategyObj,
} from '../types/item';
import { NodeShapeMap } from '../types/node';
import { EdgeStyleSet, NodeStyleSet } from '../types/theme';
import { isArrayOverlap } from '../util/array';
import { mergeStyles, updateShapes } from '../util/shape';
import { isEncode } from '../util/type';
import { DEFAULT_MAPPER } from '../util/mapper';
import {
  getShapeAnimateBeginStyles,
  animateShapes,
  GROUP_ANIMATE_STYLES,
} from '../util/animate';
import { AnimateTiming, IAnimates } from '../types/animate';

export default abstract class Item implements IItem {
  public destroyed = false;
  /** Inner model. */
  public model: ItemModel;
  /** Display model, user will not touch it. */
  public displayModel: ItemDisplayModel;
  /** The mapper configured at graph with field name 'node' / 'edge' / 'combo'. */
  public mapper: DisplayMapper;
  /** The state sstyle mapper configured at traph with field name 'nodeState' / 'edgeState' / 'comboState'. */
  public stateMapper: {
    [stateName: string]: DisplayMapper;
  };
  /** The graphic group for item drawing. */
  public group: Group;
  /** The keyShape of the item. */
  public keyShape: DisplayObject;
  /** render extension for this item. */
  public renderExt;
  /** Visibility. */
  public visible = true;
  /** The states on the item. */
  public states: {
    name: string;
    value: string | boolean;
  }[] = [];
  /** The map caches the shapes of the item. The key is the shape id, the value is the g shape. */
  public shapeMap: NodeShapeMap | EdgeShapeMap = {
    keyShape: undefined,
  };
  public afterDrawShapeMap = {};
  /** Set to different value in implements. */
  public type: ITEM_TYPE;
  public renderExtensions: any; // TODO
  /** Cache the animation instances to stop at next lifecycle. */
  public animations: IAnimation[];

  public themeStyles: {
    default?: ItemShapeStyles;
    [stateName: string]: ItemShapeStyles;
  };
  /** The zoom strategy to show and hide shapes according to their showLevel. */
  public zoomStrategy: ZoomStrategyObj;
  /** Last zoom ratio. */
  public zoom: number;
  /** Cache the chaging states which are not consomed by draw  */
  public changedStates: string[];
  /** The listener for the animations frames. */
  public onframe: Function;

  private device: any; // for 3d
  /** Cache the dirty tags for states when data changed, to re-map the state styles when state changed */
  private stateDirtyMap: { [stateName: string]: boolean } = {};
  private cacheStateStyles: { [stateName: string]: ItemShapeStyles } = {};
  private cacheHiddenShape: { [shapeId: string]: boolean } = {};

  // TODO: props type
  constructor(props) {
    this.device = props.device;
    this.onframe = props.onframe;
  }

  /** Initiate the item. */
  public init(props) {
    const {
      model,
      containerGroup,
      mapper,
      stateMapper,
      renderExtensions,
      zoom = 1,
      theme = {},
    } = props;
    this.group = new Group();
    this.group.setAttribute('data-item-type', this.type);
    this.group.setAttribute('data-item-id', props.model.id);
    containerGroup.appendChild(this.group);
    this.model = model;
    this.mapper = mapper;
    this.zoom = zoom;
    this.stateMapper = stateMapper;
    this.displayModel = this.getDisplayModelAndChanges(model).model;
    this.renderExtensions = renderExtensions;
    const { type = this.type === 'node' ? 'circle-node' : 'line-edge' } =
      this.displayModel.data;
    const RenderExtension = renderExtensions.find((ext) => ext.type === type);
    this.themeStyles = theme.styles;
    this.renderExt = new RenderExtension({
      themeStyles: this.themeStyles.default,
      zoomStrategy: theme.zoomStrategy,
      device: this.device,
    });
  }

  /**
   * Draws the shapes.
   * @internal
   * */
  public draw(
    displayModel: ItemDisplayModel,
    diffData?: { previous: ItemModelData; current: ItemModelData },
    diffState?: { previous: State[]; current: State[] },
    onfinish: Function = () => {},
  ) {
    // call this.renderExt.draw in extend implementations
    this.afterDrawShapeMap =
      this.renderExt.afterDraw?.(displayModel, {
        ...this.shapeMap,
        ...this.afterDrawShapeMap,
      }) || {};
    this.shapeMap = updateShapes(
      this.shapeMap,
      this.afterDrawShapeMap,
      this.group,
      false,
      (id) => {
        if (RESERVED_SHAPE_IDS.includes(id)) {
          console.warn(
            `Shape with id ${id} is reserved and should be returned in draw function, if the shape with ${id} returned by afterDraw is a new one, it will not be added to the group.`,
          );
          return false;
        }
        return true;
      },
    );
    this.changedStates = [];
  }

  /**
   * Updates the shapes.
   * @internal
   * */
  public update(
    model: ItemModel,
    diffData?: { previous: ItemModelData; current: ItemModelData },
    isReplace?: boolean,
    itemTheme?: {
      styles: NodeStyleSet | EdgeStyleSet;
      zoomStrategy: ZoomStrategyObj;
    },
    onlyMove?: boolean,
    onfinish?: Function,
  ) {
    // 1. merge model into this model
    this.model = model;
    if (itemTheme) {
      this.themeStyles = itemTheme.styles;
      this.zoomStrategy = itemTheme.zoomStrategy;
    }
    // 2. map new merged model to displayModel, keep prevModel and newModel for 3.
    const { model: displayModel, typeChange } = this.getDisplayModelAndChanges(
      this.model,
      diffData,
      isReplace,
    );
    this.displayModel = displayModel;

    if (onlyMove) {
      this.updatePosition(displayModel, diffData, onfinish);
      return;
    }

    if (typeChange) {
      Object.values(this.shapeMap).forEach((child) => child.destroy());
      this.shapeMap = { keyShape: undefined };
      const { type = this.type === 'node' ? 'circle-node' : 'line-edge' } =
        displayModel.data;
      const RenderExtension = this.renderExtensions.find(
        (ext) => ext.type === type,
      );
      this.renderExt = new RenderExtension({
        themeStyles: this.themeStyles.default,
        zoomStrategy: this.zoomStrategy,
        device: this.device,
      });
    } else {
      this.renderExt.themeStyles = this.themeStyles.default;
      this.renderExt.zoomStrategy = this.zoomStrategy;
    }
    // 3. call element update fn from useLib
    if (this.states?.length) {
      this.drawWithStates(this.states, onfinish);
    } else {
      this.draw(this.displayModel, diffData, undefined, onfinish);
    }
    // 4. tag all the states with 'dirty', for state style regenerating when state changed
    this.stateDirtyMap = {};
    this.states.forEach(({ name }) => (this.stateDirtyMap[name] = true));
  }

  /**
   * Update the group's position, e.g. node, combo.
   * @param displayModel
   * @param diffData
   * @param onfinish
   * @returns
   */
  public updatePosition(
    displayModel: ItemDisplayModel,
    diffData?: { previous: ItemModelData; current: ItemModelData },
    onfinish?: Function,
  ) {}

  /**
   * Maps (mapper will be function, value, or encode format) model to displayModel and find out the shapes to be update for incremental updating.
   * @param model inner model
   * @param diffData changes from graphCore changed event
   * @param isReplace whether replace the whole data or partial update
   * @returns
   */
  public getDisplayModelAndChanges(
    innerModel: ItemModel,
    diffData?: { previous: ItemModelData; current: ItemModelData },
    isReplace?: boolean,
  ): {
    model: ItemDisplayModel;
    typeChange?: boolean;
  } {
    const { mapper, type } = this;
    const defaultMapper = DEFAULT_MAPPER[type];

    const { data: innerModelData, ...otherFields } = innerModel;
    const { current = innerModelData, previous } = diffData || {};

    // === no mapper, displayModel = model ===
    if (!mapper) {
      this.displayModel = defaultMapper(innerModel);
      // compare the previous data and current data to find shape changes
      let typeChange = false;
      if (current) {
        typeChange = Boolean(current.type);
      }
      return {
        model: this.displayModel,
        typeChange,
      };
    }

    // === mapper is function, displayModel is mapper(model), cannot diff the displayModel, so all the shapes need to be updated ===
    if (isFunction(mapper))
      return {
        model: {
          ...defaultMapper(innerModel),
          ...(mapper as Function)(innerModel),
        },
      };

    // === fields' values in mapper are final value or Encode ===
    const dataChangedFields = isReplace
      ? undefined
      : Object.keys(current).concat(Object.keys(otherFields)); // only fields in current data for partial updating

    let typeChange = false;
    const { data, ...otherProps } = innerModel;
    const displayModelData = defaultMapper(innerModel).data; //clone(data);
    // const defaultMappedModel = defaultMapper(innerModel);
    Object.keys(mapper).forEach((fieldName) => {
      let subMapper = mapper[fieldName];
      const isReservedShapeId = RESERVED_SHAPE_IDS.includes(fieldName);
      const isShapeId =
        RESERVED_SHAPE_IDS.includes(fieldName) ||
        fieldName === OTHER_SHAPES_FIELD_NAME;

      if ((isShapeId && isEncode(subMapper)) || !isShapeId) {
        // fields not about shape
        if (!displayModelData.hasOwnProperty(fieldName)) {
          const { changed, value: mappedValue } = updateChange({
            innerModel,
            mapper,
            fieldName,
            dataChangedFields,
          });
          if (isShapeId) {
            if (!mappedValue) return;
            subMapper = mappedValue;
          } else {
            displayModelData[fieldName] = mappedValue;
          }
          if (changed && fieldName === 'type') typeChange = true;
        } else if (
          fieldName === 'type' &&
          (!dataChangedFields || dataChangedFields.includes('type'))
        ) {
          typeChange = true;
        }
      }

      if (isReservedShapeId) {
        // reserved shapes, fieldName is shapeId
        displayModelData[fieldName] = displayModelData[fieldName] || {};
        updateShapeChange({
          innerModel,
          mapper: subMapper,
          dataChangedFields,
          shapeConfig: displayModelData[fieldName],
        });
      } else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
        // other shapes
        displayModelData[fieldName] = displayModelData[fieldName] || {};
        Object.keys(subMapper).forEach((shapeId) => {
          if (!displayModelData[fieldName]?.hasOwnProperty(shapeId)) {
            displayModelData[fieldName][shapeId] =
              displayModelData[fieldName][shapeId] || {};
            const shappStyle = subMapper[shapeId];
            updateShapeChange({
              innerModel,
              mapper: shappStyle,
              dataChangedFields,
              shapeConfig: displayModelData[fieldName][shapeId],
            });
          }
        });
      }
    });
    const displayModel = {
      ...otherProps,
      data: displayModelData,
    };
    return {
      model: displayModel,
      typeChange,
    };
  }

  public getID() {
    return this.model.id;
  }

  public getType() {
    return this.type;
  }

  /** Show the item. */
  public show(animate = true) {
    // TODO: utilize graphcore's view
    this.stopAnimations();

    const { animates = {} } = this.displayModel.data;
    if (animate && animates.show?.length) {
      const showAnimateFieldsMap: any = {};
      Object.values(animates.show).forEach((animate) => {
        const { shapeId = 'group' } = animate;
        showAnimateFieldsMap[shapeId] = (
          showAnimateFieldsMap[shapeId] || []
        ).concat(animate.fields);
      });
      const targetStyleMap = {};
      Object.keys(this.shapeMap).forEach((id) => {
        const shape = this.shapeMap[id];
        if (!this.cacheHiddenShape[id]) {
          // set the animate fields to initial value
          if (showAnimateFieldsMap[id]) {
            targetStyleMap[id] = targetStyleMap[id] || {};
            const beginStyle = getShapeAnimateBeginStyles(shape);
            showAnimateFieldsMap[id].forEach((field) => {
              if (beginStyle.hasOwnProperty(field)) {
                targetStyleMap[id][field] = shape.style[field];
                shape.style[field] = beginStyle[field];
              }
            });
          }
          shape.show();
        }
      });
      if (showAnimateFieldsMap.group) {
        showAnimateFieldsMap.group.forEach((field) => {
          const usingField = field === 'size' ? 'transform' : field;
          if (GROUP_ANIMATE_STYLES[0].hasOwnProperty(usingField)) {
            this.group.style[usingField] = GROUP_ANIMATE_STYLES[0][usingField];
          }
        });
      }

      this.animations = this.runWithAnimates(animates, 'show', targetStyleMap);
    } else {
      Object.keys(this.shapeMap).forEach((id) => {
        const shape = this.shapeMap[id];
        if (!this.cacheHiddenShape[id]) shape.show();
      });
    }

    this.visible = true;
  }

  /** Hides the item. */
  public hide(animate = true) {
    // TODO: utilize graphcore's view
    this.stopAnimations();
    const func = () => {
      Object.keys(this.shapeMap).forEach((id) => {
        const shape = this.shapeMap[id];
        if (this.visible && !shape.isVisible())
          this.cacheHiddenShape[id] = true;
        shape.hide();
      });
    };
    const { animates = {} } = this.displayModel.data;
    if (animate && animates.hide?.length) {
      this.animations = this.runWithAnimates(animates, 'hide', undefined, func);
    } else {
      // 2. clear group and remove group
      func();
    }

    this.visible = false;
  }

  /** Returns the visibility of the item. */
  public isVisible() {
    return this.visible;
  }

  /** Puts the item to the front in its graphic group. */
  public toFront() {
    this.group.toFront();
  }

  /** Puts the item to the back in its graphic group. */
  public toBack() {
    this.group.toBack();
  }

  /**
   * The state value for the item, false if the item does not have the state.
   * @param state state name
   * @returns { boolean | string } the state value
   */
  public hasState(state: string) {
    const findState = this.states.find((item) => item.name === state);
    return findState?.value || false;
  }

  /**
   * Set the state for the item.
   * @param state state name
   * @param value state value
   */
  public setState(state: string, value: string | boolean) {
    const previousStates = clone(this.states);
    const existState = this.states.find((item) => item.name === state);
    if (value) {
      if (existState) existState.value = value;
      else
        this.states.push({
          name: state,
          value,
        });
    } else {
      const idx = this.states.indexOf(existState);
      this.states.splice(idx, 1);
    }

    // if the renderExt overwrote the setState, run the custom setState instead of the default
    if (this.renderExt.constructor.prototype.hasOwnProperty('setState')) {
      this.renderExt.setState(state, value, this.shapeMap);
      return;
    }
    this.changedStates = [state];
    this.drawWithStates(previousStates);
  }

  /**
   * Clear the states for the item.
   * @param states the states to be cleared. All the states will be cleared if the states is not assigned
   */
  public clearStates(states?: string[]) {
    // if states is not assigned, clear all the states on the item
    const previousStates = clone(this.states);
    const newStates = [];
    let changedStates = [];
    if (states) {
      this.states.filter((state) => {
        if (!states.includes(state.name)) {
          newStates.push(state);
        } else {
          changedStates.push(state);
        }
      });
    } else {
      changedStates = this.states.map(({ name, value }) => ({
        name,
        value: false,
      }));
    }
    this.states = newStates;
    this.changedStates = changedStates.map((state) => state.name);
    // if the renderExt overwrote the setState, run the custom setState instead of the default
    if (this.renderExt.constructor.prototype.hasOwnProperty('setState')) {
      changedStates.forEach(({ name, value }) =>
        this.renderExt.setState(name, value, this.shapeMap),
      );
      return;
    }
    this.drawWithStates(previousStates);
  }

  /**
   * Get all the states of the item.
   * @retruns states array with has { name: string, value: string | boolean } format item
   */
  public getStates() {
    return this.states;
  }

  /**
   * Run some thing with animations, e.g. hide, show, destroy.
   * @param animates
   * @param timing
   * @param targetStyleMap
   * @param callback
   * @returns
   */
  private runWithAnimates(
    animates: IAnimates,
    timing: AnimateTiming,
    targetStyleMap: Object,
    callback: Function = () => {},
  ) {
    let targetStyle = {};
    if (!targetStyleMap) {
      Object.keys(this.shapeMap).forEach((shapeId) => {
        targetStyle[shapeId] = getShapeAnimateBeginStyles(
          this.shapeMap[shapeId],
        );
      });
    } else {
      targetStyle = targetStyleMap;
    }
    return animateShapes(
      animates,
      targetStyle, // targetStylesMap
      this.shapeMap, // shapeMap
      this.group,
      timing,
      [],
      () => {},
      callback,
    );
  }

  /**
   * Re-draw the item with merged state styles.
   * @param previousStates previous states
   * @returns
   */
  private drawWithStates(previousStates: State[], onfinish?: Function) {
    const { default: _, ...themeStateStyles } = this.themeStyles;
    const { data: displayModelData } = this.displayModel;
    let styles = {}; // merged styles
    this.states.forEach(({ name: stateName, value }) => {
      const stateStyles = this.cacheStateStyles[stateName] || {};
      const mapper = this.stateMapper?.[stateName];
      if (!mapper && !themeStateStyles?.[stateName]) return;
      // re-mapper the state styles for states if they have dirty tags
      if (
        mapper &&
        value &&
        (!this.stateDirtyMap.hasOwnProperty(stateName) ||
          this.stateDirtyMap[stateName])
      ) {
        this.stateDirtyMap[stateName] = false;
        Object.keys(mapper).forEach((shapeId) => {
          stateStyles[shapeId] = {
            ...(displayModelData[shapeId] as Object),
          };
          if (RESERVED_SHAPE_IDS.includes(shapeId)) {
            // reserved shapes, fieldName is shapeId
            updateShapeChange({
              innerModel: this.model,
              mapper: mapper[shapeId],
              dataChangedFields: undefined,
              shapeConfig: stateStyles[shapeId],
            });
          } else if (shapeId === OTHER_SHAPES_FIELD_NAME && mapper[shapeId]) {
            // other shapes
            Object.keys(mapper[shapeId]).forEach((otherShapeId) => {
              stateStyles[shapeId] = stateStyles[shapeId] || {};
              stateStyles[shapeId][otherShapeId] =
                stateStyles[shapeId][otherShapeId] || {};
              updateShapeChange({
                innerModel: this.model,
                mapper: mapper[shapeId][otherShapeId],
                dataChangedFields: undefined,
                shapeConfig: stateStyles[shapeId][otherShapeId],
              });
            });
          }
        });
      }
      this.cacheStateStyles[stateName] = stateStyles;
      // merge the theme state styles
      const mergedStateStyles = mergeStyles([
        themeStateStyles[stateName],
        stateStyles,
      ]);

      // merge the states' styles into drawing style
      styles = mergeStyles([styles, mergedStateStyles]);
    });

    // apply the merged styles
    this.draw(
      // displayModel
      {
        ...this.displayModel,
        data: mergeStyles([displayModelData, styles]),
      } as ItemDisplayModel,
      // diffData
      undefined,
      // diffState
      {
        previous: previousStates,
        current: this.states,
      },
      onfinish,
    );
  }

  /**
   * Get the rendering bouding box of the keyShape.
   * @returns keyShape's rendering bounding box
   */
  public getKeyBBox(): AABB {
    const { keyShape } = this.shapeMap;
    return keyShape?.getRenderBounds() || ({ center: [0, 0, 0] } as AABB);
  }

  /**
   * Get the local bounding box for the keyShape.
   * */
  public getLocalKeyBBox(): AABB {
    const { keyShape } = this.shapeMap;
    return keyShape?.getLocalBounds() || ({ center: [0, 0, 0] } as AABB);
  }

  /**
   * Get the rendering bouding box of the whole item.
   * @returns item's rendering bounding box
   */
  public getBBox(): AABB {
    return this.group.getRenderBounds();
  }

  /**
   * Stop all the animations on the item.
   */
  public stopAnimations() {
    this.animations?.forEach((animation) => {
      const timing = animation.effect.getTiming();
      if (animation.playState !== 'running') return;
      animation.currentTime =
        Number(timing.duration) + Number(timing.delay || 0);
      animation.cancel();
    });
    this.animations = [];
  }

  /**
   * Animations' frame listemer.
   */
  public animateFrameListener = throttle(
    (e) => {
      this.onframe?.(e);
    },
    16,
    {
      trailing: true,
      leading: true,
    },
  );

  /**
   * Call render extension's onZoom to response the graph zooming.
   * @param zoom
   */
  public updateZoom(zoom) {
    this.zoom = zoom;
    this.renderExt.onZoom(this.shapeMap, zoom);
  }

  /** Destroy the item. */
  public destroy() {
    const func = () => {
      this.group.destroy();
      this.model = null;
      this.displayModel = null;
      this.destroyed = true;
    };
    // 1. stop animations, run buildOut animations
    this.stopAnimations();
    const { animates } = this.displayModel.data;
    if (animates?.buildOut?.length) {
      this.animations = this.runWithAnimates(
        animates,
        'buildOut',
        undefined,
        func,
      );
    } else {
      // 2. clear group and remove group
      func();
    }
  }
}

/**
 * Get the mapped value of a field on innerModel.
 * @param param0: {
 *  innerModel, // find unmapped field value from innerModel
 *  fieldName, // name of the field to read from innerModel
 *  mapper, // mapper object, contains the field's mapper
 *  dataChangedFields, // fields' names which are changed in data
 * }
 * @returns { changed: boolean, value: unknown } return whether the mapper affects the value, and the mapped result
 */
const updateChange = ({
  innerModel,
  fieldName,
  mapper,
  dataChangedFields,
}): {
  changed: boolean;
  value?: unknown;
} => {
  const value = mapper[fieldName] || '';
  if (isEncode(value)) {
    const { fields, formatter } = value;
    // data changed fields and the encode fields are overlapped, display value should be changed
    if (!dataChangedFields || isArrayOverlap(dataChangedFields, fields)) {
      const formatedValue = formatter(innerModel);
      return {
        changed: true,
        value: formatedValue || '',
      };
    }
    return { changed: false };
  } else {
    // not an encode, take the mapper's value as the result directly
    return {
      changed: true,
      value,
    };
  }
};

/**
 * Update a shape's config according to the mapper.
 * @param param0: {
 *  innerModel, // find unmapped field value from innerModel
 *  mapper, // mapper object, contains the field's mapper
 *  shapeId, // id of the shape where the fieldName belong to
 *  dataChangedFields, // fields' names which are changed in data
 *  shapeConfig, // the shape's config to be updated
 * }
 * @returns { changed: boolean, value: unknown } return whether the mapper affects the value, and the mapped result
 */
const updateShapeChange = ({
  innerModel,
  mapper,
  dataChangedFields,
  shapeConfig,
}) => {
  Object.keys(mapper).forEach((shapeAttrName) => {
    const { value: mappedValue } = updateChange({
      innerModel,
      mapper,
      fieldName: shapeAttrName,
      dataChangedFields,
    });
    shapeConfig[shapeAttrName] = mappedValue;
  });
};
