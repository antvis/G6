import { Group, DisplayObject } from "@antv/g";
import { clone, isFunction } from "@antv/util";
import { DisplayMapper, IItem, ItemDisplayModel, ItemModel, ItemModelData, ITEM_TYPE } from "../types/item";
import { isArrayOverlap } from "../util/array";
import { isEncode } from "../util/type";

export default abstract class Item implements IItem {
  public destroyed: boolean = false;
  // inner data model
  public model: ItemModel;
  // display data model
  public displayModel: ItemDisplayModel;
  public mapper: DisplayMapper;
  public group: Group;
  public keyShape: DisplayObject;
  // render extension for this item
  public renderExt;
  public visible: boolean = true;
  public states: {
    name: string,
    value: string | boolean
  }[] = [];
  public shapeMap: {
    keyShape: DisplayObject,
    labelShape?: DisplayObject,
    iconShape?: DisplayObject,
    [otherShapeId: string]: DisplayObject
  } = {
      keyShape: undefined
    };
  /** Set to different value in implements */
  public type: ITEM_TYPE = 'node';

  constructor(props) {
    const { model, renderExt, containerGroup, mapper } = props;
    this.group = new Group();
    containerGroup.appendChild(this.group);
    this.model = model;
    this.mapper = mapper;
    this.displayModel = this.getDisplayModelAndChanges(model).model;
    this.renderExt = renderExt;
  }

  public draw(diffData?: { oldData: ItemModelData, newData: ItemModelData }, shapesToChange?: { [shapeId: string]: boolean }) {
    const afterDrawShapes = this.renderExt.afterDraw?.(this.displayModel, this.group) || {};
    Object.keys(afterDrawShapes).forEach(id => {
      if (['keyShape', 'labelShape', 'iconShape'].includes(id)) return;
      this.shapeMap[id] = afterDrawShapes[id];
    });
    Object.keys(this.shapeMap).forEach(key => {
      const shape = this.shapeMap[key];
      if (!shape || shape.destroyed) return;
      if (['keyShape', 'labelShape', 'iconShape'].includes(key)) shape.id = key; // TODO: g allows id modification?
      this.group.appendChild(shape);
    });
  }

  public update(model: ItemModel, diffData?: { oldData: ItemModelData, newData: ItemModelData }, dataChangedFields?: string[]) {
    // 1. merge model into this model
    this.model = model;
    // 2. map new merged model to displayModel, keep prevModel and newModel for 3.
    const { model: displayModel, shapesToChange, typeChange } = this.getDisplayModelAndChanges(this.model, diffData, dataChangedFields);
    this.displayModel = displayModel;

    if (typeChange) {
      // TODO
    }
    // TODO: 3. call element update fn from useLib
    this.draw(diffData, shapesToChange);
  }

  /**
   * TODO: WIP wait for neaten
   * Maps (mapper will be function, value, or encode format) model to displayModel and find out the shapes to be update for incremental updating.
   * @param model inner model
   * @param diffData changes from graphCore changed event
   * @param dataChangedFields (may be able to discard) the changed property names in inner model's data
   * @returns 
   */
  public getDisplayModelAndChanges(
    model: ItemModel,
    diffData?: { oldData: ItemModelData, newData: ItemModelData },
    dataChangedFields?: string[]
  ): ({
    model: ItemDisplayModel,
    shapesToChange?: { [shapeId: string]: boolean }
    typeChange?: boolean
  }) {
    const { mapper } = this;
    if (!mapper) {
      // no mapper, displayModel = model, shapesToChange should compare the new model and old model
      this.displayModel = model; // TODO: need clone?
      // compare the oldData and newData to find shape changes
      let shapesToChange = {};
      let typeChange = false;
      if (diffData?.newData) {
        typeChange = Boolean(diffData.newData.type);
        Object.keys(diffData.newData).forEach(key => {
          if (this.shapeMap[key]) shapesToChange[key] = true;
        });
      }
      return { model, shapesToChange, typeChange }
    }
    if (isFunction(mapper)) return { model: mapper(model) };
    // fields' values in mapper are final value or Encode
    const shapesToChange: { [shapeId: string]: boolean } = {};
    let typeChange = false;
    const { data, ...otherProps } = model;
    const displayModelData = clone(data);
    Object.keys(mapper).forEach(fieldName => {
      const value = mapper[fieldName];
      if (fieldName === 'type') {
        if (isEncode(value)) {
          const { fields, formatter } = value;
          // data changed fields and the encode fields are overlapped, display value should be changed
          if (!dataChangedFields || isArrayOverlap(dataChangedFields, fields)) {
            typeChange = true;
            displayModel['type'] = formatter(model);
          }
        } else {
          typeChange = true;
          displayModel['type'] = value;
        }
      } else if (['keyShape', 'labelShape', 'iconShape'].includes(fieldName)) {
        Object.keys(value).forEach(shapeAttrName => {
          const attrValue = value[shapeAttrName];
          if (isEncode(attrValue)) {
            const { fields, formatter } = attrValue;
            // data changed fields and the encode fields are overlapped, display value should be changed
            if (!dataChangedFields || isArrayOverlap(dataChangedFields, fields)) {
              shapesToChange[fieldName] = true;
              displayModel[fieldName][shapeAttrName] = formatter(model);
            }
          } else {
            shapesToChange[fieldName] = true;
            displayModel[fieldName][shapeAttrName] = attrValue;
          }
        });
      } else if (fieldName === 'otherShapes') {
        Object.keys(value).forEach(shapeId => {
          const shappStyle = value[shapeId];
          Object.keys(shappStyle).forEach(shapeAttrName => {
            const attrValue = shappStyle[shapeAttrName];
            if (isEncode(attrValue)) {
              const { fields, formatter } = attrValue;
              // data changed fields and the encode fields are overlapped, display value should be changed
              if (!dataChangedFields || isArrayOverlap(dataChangedFields, fields)) {
                shapesToChange[shapeId] = true;
                displayModel[fieldName][shapeId][shapeAttrName] = formatter(model);
              }
            } else {
              shapesToChange[shapeId] = true;
              displayModel[fieldName][shapeId][shapeAttrName] = attrValue;
            }
          });
        });
      }
    });
    const displayModel = {
      ...otherProps,
      data: displayModelData
    }
    return { model: displayModel, shapesToChange, typeChange };
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

  public setState(state: string, value: string | boolean) {
    const existState = this.states.find(item => item.name === state);
    if (existState && value) {
      existState.value = value;
    } else {
      const idx = this.states.indexOf(existState);
      this.states.splice(idx, 1);
    }
    // TODO: call element setState fn from useLib
  }

  public hasState(state: string) {
    const findState = this.states.find(item => item.name === state);
    return findState || false;
  }

  public clearStates(states?: string[]) {
    const newStates = this.states.filter(state => !states.includes(state.name));
    this.states = newStates;
    states.forEach(state => {
      // TODO: call element setState fn with false from useLib
    });
  }

  public getStates() {
    return this.states;
  }

  public destroy() {
    // TODO: 1. stop animations
    // 2. clear group and remove group
    this.group.remove();
    this.model = null;
    this.displayModel = null;
    this.destroyed = true;
  }
}