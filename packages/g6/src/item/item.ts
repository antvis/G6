import { Group, DisplayObject } from '@antv/g';
import { clone, isFunction } from '@antv/util';
import { EdgeLabelShapeStyle, EdgeShapeMap } from '../types/edge';
import {
  DisplayMapper,
  IItem,
  ItemDisplayModel,
  ItemModel,
  ItemModelData,
  ITEM_TYPE,
  ShapeStyle,
  State,
} from '../types/item';
import { NodeShapeMap, NodeLabelShapeStyle } from '../types/node';
import { isArrayOverlap } from '../util/array';
import { updateShapes } from '../util/shape';
import { isEncode } from '../util/type';

export const RESERVED_SHAPE_IDS = ['keyShape', 'labelShape', 'iconShape'];
const OTHER_SHAPES_FIELD_NAME = 'otherShapes';

export default abstract class Item implements IItem {
  public destroyed: boolean = false;
  // inner data model
  public model: ItemModel;
  // display data model
  public displayModel: ItemDisplayModel;
  public mapper: DisplayMapper;
  public stateMapper: {
    [stateName: string]: DisplayMapper
  };
  public group: Group;
  public keyShape: DisplayObject;
  // render extension for this item
  public renderExt;
  public visible: boolean = true;
  public states: {
    name: string;
    value: string | boolean;
  }[] = [];
  public shapeMap: NodeShapeMap | EdgeShapeMap = {
    keyShape: undefined,
  };
  /** Set to different value in implements */
  public type: ITEM_TYPE;
  public renderExtensions: any; // TODO

  /** Cache the dirty tags for states when data changed, to re-map the state styles when state changed */
  private stateDirtyMap: { [stateName: string]: boolean } = {};
  private cacheStateStyles: {
    keyShape?: ShapeStyle;
    labelShape?: NodeLabelShapeStyle | EdgeLabelShapeStyle;
    iconShape?: ShapeStyle;
    [shapeId: string]: ShapeStyle
  } = {}
  private renderExtClass;

  constructor(props) {}

  public init(props) {
    const { model, containerGroup, mapper, stateMapper, renderExtensions} = props;
    this.group = new Group();
    containerGroup.appendChild(this.group);
    this.model = model;
    this.mapper = mapper;
    this.stateMapper = stateMapper;
    this.displayModel = this.getDisplayModelAndChanges(model).model;
    this.renderExtensions = renderExtensions;
    const { type = this.type === 'node' ? 'circle-node' : 'line-edge' } = this.displayModel.data;
    const RenderExtension = renderExtensions.find((ext) => ext.type === type);
    this.renderExtClass = RenderExtension;
    this.renderExt = new RenderExtension();
  }

  public draw(displayModel: ItemDisplayModel, diffData?: { previous: ItemModelData; current: ItemModelData }, diffState?: { previous: State[], current: State[] }) {
    // call this.renderExt.draw in extend implementations
    const afterDrawShapes = this.renderExt.afterDraw?.(displayModel, this.shapeMap) || {};
    this.shapeMap = updateShapes(this.shapeMap, afterDrawShapes, this.group, false, (id) => {
      if (RESERVED_SHAPE_IDS.includes(id)) {
        console.warn(
          `Shape with id ${id} is reserved and should be returned in draw function, if the shape with ${id} returned by afterDraw is a new one, it will not be added to the group.`,
        );
        return false;
      }
      return true;
    });
  }

  public update(
    model: ItemModel,
    diffData?: { previous: ItemModelData; current: ItemModelData },
    isReplace?: boolean,
  ) {
    // 1. merge model into this model
    this.model = model;
    // 2. map new merged model to displayModel, keep prevModel and newModel for 3.
    const { model: displayModel, typeChange } = this.getDisplayModelAndChanges(
      this.model,
      diffData,
      isReplace,
    );
    this.displayModel = displayModel;

    if (typeChange) {
      Object.values(this.shapeMap).forEach(child => child.remove(true));
      this.shapeMap = { keyShape: undefined };
      const { type = this.type === 'node' ? 'circle-node' : 'line-edge' } = displayModel.data;
      const extension = this.renderExtensions.find((ext) => ext.type === type);
      this.renderExt = new extension();
    }
    // 3. call element update fn from useLib
    this.draw(this.displayModel, diffData);
    // 4. tag all the states with 'dirty', for state style regenerating when state changed
    this.stateDirtyMap = {}
    this.states.forEach(({ name }) => this.stateDirtyMap[name] = true);
  }

  /**
   * Maps (mapper will be function, value, or encode format) model to displayModel and find out the shapes to be update for incremental updating.
   * @param model inner model
   * @param diffData changes from graphCore changed event
   * @param isReplace whether replace the whole data or partial udpate
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
    const { mapper } = this;
    const { current = innerModel.data, previous } = diffData || {};

    // === no mapper, displayModel = model ===
    if (!mapper) {
      this.displayModel = innerModel; // TODO: need clone?
      // compare the previous data and current data to find shape changes
      let typeChange = false;
      if (current) {
        typeChange = Boolean(current.type);
      }
      return {
        model: innerModel,
        typeChange,
      };
    }

    // === mapper is function, displayModel is mapper(model), cannot diff the displayModel, so all the shapes need to be updated ===
    if (isFunction(mapper)) return { model: (mapper as Function)(innerModel) };

    // === fields' values in mapper are final value or Encode ===
    const dataChangedFields = isReplace
      ? undefined
      // ? Array.from(new Set(Object.keys(current).concat(Object.keys(previous)))) // all the fields for replacing all data
      : Object.keys(current); // only fields in current data for partial updating

    let typeChange = false;
    const { data, ...otherProps } = innerModel;
    const displayModelData = clone(data);
    Object.keys(mapper).forEach((fieldName) => {
      const subMapper = mapper[fieldName];
      if (RESERVED_SHAPE_IDS.includes(fieldName)) {
        // reserved shapes, fieldName is shapeId
        if (!displayModelData.hasOwnProperty(fieldName)) {
          displayModelData[fieldName] = {};
          updateShapeChange({
            innerModel,
            mapper: subMapper,
            dataChangedFields,
            shapeConfig: displayModelData[fieldName],
          });
        }
      } else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
        // other shapes
        displayModelData[fieldName] = displayModelData[fieldName] || {};
        Object.keys(subMapper).forEach((shapeId) => {
          if (!displayModelData[fieldName]?.hasOwnProperty(shapeId)) {
            displayModelData[fieldName][shapeId] = displayModelData[fieldName][shapeId] || {};
            const shappStyle = subMapper[shapeId];
            updateShapeChange({
              innerModel,
              mapper: shappStyle,
              dataChangedFields,
              shapeConfig: displayModelData[fieldName][shapeId],
            });
          }
        });
      } else {
        // fields not about shape
        if (!displayModelData.hasOwnProperty(fieldName)) {
          const { changed, value: mappedValue } = updateChange({
            innerModel,
            mapper,
            fieldName,
            dataChangedFields,
          });
          displayModelData[fieldName] = mappedValue;
          if (changed && fieldName === 'type') typeChange = true;
        } else if (fieldName === 'type' && (!dataChangedFields || dataChangedFields.includes('type'))) {
          typeChange = true;
        }
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

  public show() {
    // TODO: utilize graphcore's view
    this.group.style.visibility = 'visible';
    this.visible = true;
  }

  public hide() {
    // TODO: utilize graphcore's view
    this.group.style.visibility = 'hidden';
    this.visible = false;
  }

  public isVisible() {
    return this.visible;
  }

  public toBack() {
    this.group.toBack();
  }

  public toFront() {
    this.group.toFront();
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
      else this.states.push({
        name: state,
        value
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
      this.states.filter(state => {
        if (!states.includes(state.name)) {
          newStates.push(state);
        } else {
          changedStates.push(state);
        }
      });
    } else {
      changedStates = this.states.map(({ name, value }) => ({ name, value: false }));
    }
    this.states = newStates;
    // if the renderExt overwrote the setState, run the custom setState instead of the default
    if (this.renderExt.constructor.prototype.hasOwnProperty('setState')) {
      changedStates.forEach(({ name, value }) => this.renderExt.setState(name, value, this.shapeMap));
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

  public destroy() {
    // TODO: 1. stop animations
    // 2. clear group and remove group
    this.group.remove(true);
    this.model = null;
    this.displayModel = null;
    this.destroyed = true;
  }

  /**
   * Re-draw the item with merged state styles.
   * @param previousStates previous states
   * @returns 
   */
  private drawWithStates(previousStates: State[]) {
    if (!this.stateMapper) return;

    const { data: displayModelData } = this.displayModel;
    const styles = {}; // merged styles
    this.states.forEach(({ name: stateName, value }) => {
      let stateStyles = this.cacheStateStyles[stateName] || {};
      // re-mapper the state styles for states if they has dirty tag
      if (value && (!this.stateDirtyMap.hasOwnProperty(stateName) || this.stateDirtyMap[stateName])) {
        this.stateDirtyMap[stateName] = false;
        const mapper = this.stateMapper[stateName];
        if (!mapper) return;
        Object.keys(mapper).forEach(shapeId => {
          stateStyles[shapeId] = {
            ...(displayModelData[shapeId] as Object)
          }
          if (RESERVED_SHAPE_IDS.includes(shapeId)) {
            // reserved shapes, fieldName is shapeId
            if (!displayModelData.hasOwnProperty(shapeId)) {
              updateShapeChange({
                innerModel: this.model,
                mapper: mapper[shapeId],
                dataChangedFields: undefined,
                shapeConfig: stateStyles[shapeId],
              });
            }
          } else if (shapeId === OTHER_SHAPES_FIELD_NAME) {
            // other shapes
            Object.keys(mapper).forEach((otherShapeId) => {
              if (!displayModelData[shapeId]?.hasOwnProperty(otherShapeId)) {
                stateStyles[shapeId] = stateStyles[shapeId] || {};
                updateShapeChange({
                  innerModel: this.model,
                  mapper: mapper[shapeId][otherShapeId],
                  dataChangedFields: undefined,
                  shapeConfig: stateStyles[shapeId],
                });
              }
            });
          }
        });
      }
      // merge the state styles
      Object.keys(stateStyles).forEach(shapeId => {
        styles[shapeId] = Object.assign({}, styles[shapeId], stateStyles[shapeId]);
      });
      this.cacheStateStyles[stateName] = stateStyles;
    });

    // apply the merged styles
    this.draw(
      // displayModel
      {
        ...this.displayModel,
        data: {
          ...displayModelData,
          ...styles
        },
      } as ItemDisplayModel,
      // diffData
      undefined,
      // diffState
      { 
        previous: previousStates,
        current: this.states,
      }
    );
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
const updateShapeChange = ({ innerModel, mapper, dataChangedFields, shapeConfig }) => {
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
