import { Group, DisplayObject, AABB, IAnimation } from '@antv/g';
import { isFunction, isObject, throttle } from '@antv/util';
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
  LodLevelRanges,
} from '../types/item';
import { NodeShapeMap } from '../types/node';
import { EdgeStyleSet, NodeStyleSet } from '../types/theme';
import { isArrayOverlap } from '../util/array';
import {
  combineBounds,
  getShapeLocalBoundsByStyle,
  mergeStyles,
  updateShapes,
} from '../util/shape';
import { isEncode } from '../util/type';
import { DEFAULT_MAPPER } from '../util/mapper';
import { cloneJSON } from '../util/data';
import {
  getShapeAnimateBeginStyles,
  animateShapes,
  GROUP_ANIMATE_STYLES,
  stopAnimate,
} from '../util/animate';
import { AnimateTiming, IAnimates, IStateAnimate } from '../types/animate';
import { formatLodLevels } from '../util/zoom';
import { IGraph } from '../types';

export default abstract class Item implements IItem {
  public graph: IGraph;
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
  /** The graphic group for item'label drawing. */
  public labelGroup: Group;
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
  public afterDrawShapeMap: {
    [otherShapeId: string]: DisplayObject;
  } = {};
  /** Set to different value in implements. */
  public type: ITEM_TYPE;
  /** The flag of transient item. */
  public transient = false;
  public renderExtensions: any; // TODO
  /** Cache the shape animation instances to stop at next lifecycle. */
  public animations: IAnimation[];
  /** Cache the group animation instances to stop at next lifecycle. */
  public groupAnimations: IAnimation[];

  public themeStyles: {
    default: ItemShapeStyles;
    [stateName: string]: ItemShapeStyles;
  };
  /** The zoom strategy to show and hide shapes according to their lod. */
  public lodLevels: LodLevelRanges;
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
  private cacheNotHiddenByItem: { [shapeId: string]: boolean } = {};
  private cacheHiddenByItem: { [shapeId: string]: boolean } = {};

  // TODO: props type
  constructor(props) {
    this.device = props.device;
    this.onframe = props.onframe;
  }

  /** Initiate the item. */
  public init(props) {
    const {
      graph,
      model,
      containerGroup,
      labelContainerGroup,
      mapper,
      stateMapper,
      renderExtensions,
      zoom = 1,
      theme = {},
      type: itemType,
    } = props;
    this.type = itemType;
    this.graph = graph;
    this.group = new Group({ style: { zIndex: 0 } });
    this.labelGroup = new Group({ style: { zIndex: 0 } });
    this.group.setAttribute('data-item-type', this.type);
    this.group.setAttribute('data-item-id', props.model.id);
    this.labelGroup.setAttribute('data-item-type', this.type);
    this.labelGroup.setAttribute('data-item-id', props.model.id);
    containerGroup.appendChild(this.group);
    labelContainerGroup.appendChild(this.labelGroup);
    this.model = model;
    this.mapper = mapper;
    this.zoom = zoom;
    this.stateMapper = stateMapper;
    this.displayModel = this.getDisplayModelAndChanges(model).model;
    this.renderExtensions = renderExtensions;
    const {
      type = this.type === 'edge' ? 'line-edge' : `circle-${this.type}`,
      lodLevels: modelLodLevels,
      enableBalanceShape,
    } = this.displayModel.data;
    const RenderExtension = renderExtensions.find((ext) => ext.type === type);
    this.themeStyles = theme.styles;
    this.lodLevels = modelLodLevels
      ? formatLodLevels(modelLodLevels)
      : theme.lodLevels;
    if (!RenderExtension) {
      if (this.type === 'node') {
        throw new Error(
          `TypeError: RenderExtension is not a constructor. The '${type}' in your data haven't been registered. You can use built-in node types like 'rect-node', 'circle-node' or create a custom node type as you like.`,
        );
      } else if (this.type == 'edge') {
        throw new Error(
          `TypeError: RenderExtension is not a constructor. The '${type}' in your data haven't been registered. You can use built-in edge types like 'line-edge', 'quadratic-edge','cubic-edge' or create a custom edge type as you like.`,
        );
      } else {
        throw new Error(
          `TypeError: RenderExtension is not a constructor. The '${type}' haven't been registered.`,
        );
      }
    }
    this.renderExt = new RenderExtension({
      themeStyles: this.themeStyles?.default,
      lodLevels: this.lodLevels,
      enableBalanceShape,
      device: this.device,
      zoom: this.zoom,
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
    animate = true,
    onfinish: Function = () => {},
  ) {
    // call this.renderExt.draw in extend implementations
    const afterDrawShapeMap =
      this.renderExt.afterDraw?.(displayModel, {
        ...this.shapeMap,
        ...this.afterDrawShapeMap,
      }) || {};
    if (this.afterDrawShapeMap.labelShape) {
      this.afterDrawShapeMap.labelShape.attributes.dataIsLabel = true;
    }
    if (this.afterDrawShapeMap.labelBackgroundShape) {
      this.afterDrawShapeMap.labelBackgroundShape.attributes.dataIsLabelBackground =
        true;
    }
    const shapeMap = updateShapes(
      this.afterDrawShapeMap,
      afterDrawShapeMap,
      this.group,
      this.labelGroup,
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
    this.shapeMap = {
      ...this.shapeMap,
      ...shapeMap,
    };
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
      lodLevels: LodLevelRanges;
    },
    onlyMove?: boolean,
    animate = true,
    onfinish?: Function,
  ) {
    // 1. merge model into this model
    this.model = model;
    if (itemTheme) {
      this.themeStyles = itemTheme.styles;
    }
    // 2. map new merged model to displayModel, keep prevModel and newModel for 3.
    const { model: displayModel, typeChange } = this.getDisplayModelAndChanges(
      this.model,
      diffData,
      isReplace,
    );
    this.displayModel = displayModel;

    this.lodLevels = displayModel.data.lodLevels
      ? formatLodLevels(displayModel.data.lodLevels)
      : itemTheme?.lodLevels || this.lodLevels;

    if (onlyMove) {
      this.updatePosition(displayModel, diffData, animate, onfinish);
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
        lodLevels: this.lodLevels,
        device: this.device,
        zoom: this.zoom,
      });
    } else {
      this.renderExt.themeStyles = this.themeStyles.default;
      this.renderExt.lodLevels = this.lodLevels;
    }
    // 3. call element update fn from useLib
    if (this.states?.length) {
      this.drawWithStates(this.states, animate, onfinish);
    } else {
      this.draw(this.displayModel, diffData, undefined, animate, onfinish);
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
    animate?: boolean,
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
    const { current = innerModelData } = diffData || {};

    // === no mapper, displayModel = model ===
    if (!mapper) {
      // compare the previous data and current data to find shape changes
      let typeChange = false;
      if (current) {
        typeChange = Boolean(current.type);
      }
      return {
        model: defaultMapper(innerModel),
        typeChange,
      };
    }

    // === mapper is function, displayModel is mapper(model), cannot diff the displayModel, so all the shapes need to be updated ===
    if (isFunction(mapper)) {
      const mappedModel = {
        ...defaultMapper(innerModel),
        ...(mapper as Function)(innerModel),
      };
      return {
        model: mappedModel,
        typeChange: this.displayModel?.data?.type !== mappedModel.data.type,
      };
    }

    // === fields' values in mapper are final value or Encode ===
    const dataChangedFields = isReplace
      ? undefined
      : Object.keys(current || {}).concat(Object.keys(otherFields)); // only fields in current data for partial updating

    let typeChange = false;
    const { data, ...otherProps } = innerModel;
    const displayModelData = defaultMapper(innerModel).data; //clone(data);
    // const defaultMappedModel = defaultMapper(innerModel);
    Object.keys(mapper).forEach((fieldName) => {
      let subMapper = mapper[fieldName];
      const isReservedShapeId = RESERVED_SHAPE_IDS.includes(fieldName);
      const isShapeId =
        isReservedShapeId || fieldName === OTHER_SHAPES_FIELD_NAME;

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
        displayModelData[fieldName] =
          displayModelData[fieldName] ||
          isObject(innerModel.data[fieldName]) ||
          isObject(this.displayModel?.data[fieldName])
            ? {
                ...(innerModel.data[fieldName] as object),
                ...(this.displayModel?.data[fieldName] as object),
              }
            : {};
        updateShapeChange({
          innerModel,
          mapper: subMapper,
          dataChangedFields,
          shapeConfig: displayModelData[fieldName],
          fieldPath: [fieldName],
        });
      } else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
        // other shapes
        displayModelData[fieldName] =
          displayModelData[fieldName] || isObject(innerModel.data[fieldName])
            ? {
                ...(innerModel.data[fieldName] as object),
              }
            : {};
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
              fieldPath: [fieldName, shapeId],
            });
          }
        });
      }
    });
    return {
      model: {
        ...otherProps,
        data: displayModelData,
      },
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
  public show(animate = true, shapeIds = undefined) {
    const shapeIdsToStop = shapeIds?.filter((id) => {
      const shape = this.shapeMap[id];
      return shape && shape.style.visibility === 'hidden';
    });
    if (shapeIds?.length && !shapeIdsToStop?.length) return;
    if (!shapeIdsToStop || shapeIdsToStop.includes('labelShape')) {
      this.labelGroup.style.visibility = 'visible';
    }
    Promise.all(this.stopAnimations(shapeIdsToStop)).finally(() => {
      if (this.destroyed) return;
      const { animates = {} } = this.displayModel.data;
      const shapeIdsToShow =
        shapeIdsToStop ||
        Object.keys(this.shapeMap).filter(
          (shapeId) => this.cacheHiddenByItem[shapeId],
        );
      if (animate && animates.show?.length) {
        const showAnimateFieldsMap: any = {};
        Object.values(animates.show).forEach((animate) => {
          const { shapeId = 'group' } = animate;
          showAnimateFieldsMap[shapeId] = (
            showAnimateFieldsMap[shapeId] || []
          ).concat(animate.fields);
        });
        const targetStyleMap = {};
        shapeIdsToShow.forEach((id) => {
          const shape = this.shapeMap[id];
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
          delete this.cacheHiddenByItem[id];
        });
        if (
          showAnimateFieldsMap.group &&
          this.shapeMap.keyShape.attributes.visibility === 'hidden'
        ) {
          showAnimateFieldsMap.group.forEach((field) => {
            const usingField = field === 'size' ? 'transform' : field;
            if (GROUP_ANIMATE_STYLES[0].hasOwnProperty(usingField)) {
              this.group.style[usingField] =
                GROUP_ANIMATE_STYLES[0][usingField];
            }
          });
        }
        if (Object.keys(targetStyleMap).length) {
          this.animations = this.runWithAnimates(
            animates,
            'show',
            targetStyleMap,
            shapeIdsToShow,
          );
        }
      } else {
        shapeIdsToShow.forEach((id) => {
          const shape = this.shapeMap[id];
          shape.show();
          delete this.cacheHiddenByItem[id];
        });
      }

      this.visible = true;
      if (!shapeIds) this.cacheHiddenByItem = {};
      // restore the states
      if (this.states?.length) {
        this.drawWithStates([]);
      }
    });
  }

  /** Hides the item. */
  public hide(animate = true, keepKeyShape = false, shapeIds = undefined) {
    const shapeIdsToHide =
      shapeIds?.filter((id) => {
        const shape = this.shapeMap[id];
        return (
          shape &&
          (shape.attributes.visibility !== 'hidden' ||
            this.cacheNotHiddenByItem[id])
        );
      }) || Object.keys(this.shapeMap);
    if (!shapeIdsToHide.length) return;
    this.cacheNotHiddenByItem = {};
    const func = () => {
      shapeIdsToHide.forEach((id) => {
        if (keepKeyShape && id === 'keyShape') return;
        const shape = this.shapeMap[id];
        if (!shape || shape.attributes.visibility === 'hidden') {
          this.cacheNotHiddenByItem[id] = true;
          return;
        }
        shape.hide();
        this.cacheHiddenByItem[id] = true;
        if (!shapeIds) this.visible = false;
      });
    };
    Promise.all(this.stopAnimations(shapeIdsToHide)).then(() => {
      if (this.destroyed) return;
      const { animates = {} } = this.displayModel.data;
      if (animate && animates.hide?.length) {
        this.animations = this.runWithAnimates(
          animates,
          'hide',
          undefined,
          shapeIdsToHide,
          func,
        );
      } else {
        // 2. clear group and remove group
        func();
      }
    });
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
    const previousStates = cloneJSON(this.states);
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
    const previousStates = cloneJSON(this.states);
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
    shapeIdsToShow: string[] | undefined,
    callback: Function = () => {},
  ) {
    let targetStyle = {};
    if (!targetStyleMap) {
      shapeIdsToShow?.forEach((shapeId) => {
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
      shapeIdsToShow,
      [this.group, this.labelGroup],
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
  private drawWithStates(
    previousStates: State[],
    animate = true,
    onfinish?: Function,
  ) {
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
              fieldPath: [shapeId],
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
                fieldPath: [shapeId, otherShapeId],
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
    const mergedData = mergeStyles([displayModelData, styles]);
    const { animates } = mergedData;
    const displayUpdateAnimates = [];
    const stateNames = previousStates
      .concat(this.states)
      .map((state) => state.name);
    animates?.update?.forEach((animateCfg) => {
      const { states } = animateCfg as IStateAnimate;
      if (states && isArrayOverlap(states, stateNames)) {
        displayUpdateAnimates.push(animateCfg);
      }
    });

    // apply the merged styles
    this.draw(
      // displayModel
      {
        ...this.displayModel,
        data: {
          ...mergedData,
          animates: {
            ...animates,
            update: displayUpdateAnimates,
          },
        },
      } as ItemDisplayModel,
      // diffData
      undefined,
      // diffState
      {
        previous: previousStates,
        current: this.states,
      },
      animate,
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
    if (this.animations?.length) {
      // during animations, estimate the final bounds by the styles in displayModel
      const { keyShape, labelShape } = this.shapeMap;
      const { x = 0, y = 0, z = 0 } = this.displayModel.data;
      const { keyShape: keyShapeStyle, labelShape: labelShapeStyle } =
        this.renderExt.mergedStyles;
      const estimateBounds = labelShape
        ? combineBounds([
            getShapeLocalBoundsByStyle(keyShape, keyShapeStyle),
            getShapeLocalBoundsByStyle(labelShape, labelShapeStyle),
          ])
        : getShapeLocalBoundsByStyle(keyShape, keyShapeStyle);
      [x, y, z].forEach((val: number, i) => {
        estimateBounds.max[i] += val;
        estimateBounds.min[i] += val;
        estimateBounds.center[i] += val;
      });

      estimateBounds.halfExtents = [
        (estimateBounds.max[0] - estimateBounds.min[0]) / 2,
        (estimateBounds.max[1] - estimateBounds.min[1]) / 2,
        (estimateBounds.max[2] - estimateBounds.min[2]) / 2,
      ];
      return estimateBounds as AABB;
    }
    return this.group.getRenderBounds();
  }

  /**
   * Stop all the animations on the item.
   */
  public stopAnimations(shapeIds?: string[]) {
    const promises = [];
    if (this.animations?.length) {
      for (let i = 0; i < this.animations.length; i++) {
        const animate = this.animations[i];
        if (!shapeIds?.length || shapeIds.includes(animate.effect.target.id)) {
          this.animations.pop();
          if (animate.playState !== 'running') break;
          promises.push(stopAnimate(animate));
          // @ts-ignore
          animate.onManualCancel?.();
        }
      }
    }
    if (this.groupAnimations?.length) {
      while (this.groupAnimations.length) {
        const groupAnimate = this.groupAnimations.pop();
        if (groupAnimate.playState !== 'running') break;
        promises.push(stopAnimate(groupAnimate));
        // @ts-ignore
        groupAnimate.onManualCancel?.();
      }
      this.groupAnimations = [];
    }
    return promises;
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
    this.renderExt.onZoom(this.shapeMap, zoom, this.cacheHiddenByItem);
  }

  /**
   * Update label positions on label canvas by getting viewport position from transformed canvas position.
   */
  public updateLabelPosition(ignoreVisibility: boolean = false) {}

  /** Destroy the item. */
  public destroy() {
    const func = () => {
      this.group.destroy();
      this.labelGroup.destroy();
      this.model = null;
      this.displayModel = null;
      this.destroyed = true;
    };
    // 1. stop animations, run buildOut animations
    this.stopAnimations();
    const { animates } = this.displayModel.data;
    if (animates?.buildOut?.length && !this.transient) {
      this.animations = this.runWithAnimates(
        animates,
        'buildOut',
        undefined,
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
  fieldPath,
}) => {
  if (!mapper) return;
  let innerModelValue = innerModel.data;
  fieldPath?.forEach((field) => {
    innerModelValue = innerModelValue[field] || {};
  });
  Object.keys(mapper).forEach((shapeAttrName) => {
    if (innerModelValue?.hasOwnProperty(shapeAttrName)) return;
    const { value: mappedValue, changed } = updateChange({
      innerModel,
      mapper,
      fieldName: shapeAttrName,
      dataChangedFields,
    });
    if (changed) shapeConfig[shapeAttrName] = mappedValue;
  });
};
