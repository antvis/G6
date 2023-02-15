import { Group, DisplayObject } from '@antv/g';
import { clone, isFunction } from '@antv/util';
import { EdgeShapeMap } from '../types/edge';
import {
  DisplayMapper,
  IItem,
  ItemDisplayModel,
  ItemModel,
  ItemModelData,
  ITEM_TYPE,
} from '../types/item';
import { NodeShapeMap } from '../types/node';
import { isArrayOverlap } from '../util/array';
import { updateShapes } from '../util/shape';
import { isEncode } from '../util/type';

export const RESERVED_SHAPE_IDS = ['keyShape', 'labelShape', 'iconShape'];

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
    name: string;
    value: string | boolean;
  }[] = [];
  public shapeMap: NodeShapeMap | EdgeShapeMap = {
    keyShape: undefined,
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

  public draw(
    diffData?: { oldData: ItemModelData; newData: ItemModelData },
    shapesToChange?: { [shapeId: string]: boolean },
  ) {
    // call this.renderExt.draw in extend implementations
    const afterDrawShapes = this.renderExt.afterDraw?.(this.displayModel, this.group) || {};
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
    diffData?: { oldData: ItemModelData; newData: ItemModelData },
    dataChangedFields?: string[],
  ) {
    // 1. merge model into this model
    this.model = model;
    // 2. map new merged model to displayModel, keep prevModel and newModel for 3.
    const {
      model: displayModel,
      shapesToChange,
      typeChange,
    } = this.getDisplayModelAndChanges(this.model, diffData, dataChangedFields);
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
    innerModel: ItemModel,
    diffData?: { oldData: ItemModelData; newData: ItemModelData },
    dataChangedFields?: string[],
  ): {
    model: ItemDisplayModel;
    shapesToChange?: { [shapeId: string]: boolean };
    typeChange?: boolean;
  } {
    const { mapper } = this;
    let shapesToChange: { [shapeId: string]: boolean } = {};

    // no mapper, displayModel = model, shapesToChange should compare the new model and old model
    if (!mapper) {
      this.displayModel = innerModel; // TODO: need clone?
      // compare the oldData and newData to find shape changes
      let typeChange = false;
      if (diffData?.newData) {
        typeChange = Boolean(diffData.newData.type);
        Object.keys(diffData.newData).forEach((key) => {
          if (this.shapeMap[key]) {
            shapesToChange[key] = true;
          }
        });
      }
      const hasShapeChange = Object.keys(shapesToChange)?.length;
      return {
        model: innerModel,
        shapesToChange: hasShapeChange ? shapesToChange : undefined,
        typeChange,
      };
    }

    // mapper is function, displayModel is mapper(model), cannot diff the displayModel, so all the shapes need to be updated
    if (isFunction(mapper)) return { model: mapper(innerModel) };

    // fields' values in mapper are final value or Encode
    let typeChange = false;
    const { data, ...otherProps } = innerModel;
    const displayModelData = clone(data);
    Object.keys(mapper).forEach((fieldName) => {
      const subMapper = mapper[fieldName];

      if (RESERVED_SHAPE_IDS.includes(fieldName)) {
        // reserved shapes
        updateShapeChange({
          innerModel,
          subMapper,
          shapeId: fieldName,
          shapeConfig: displayModelData[fieldName],
          shapesToChange,
          dataChangedFields,
        });
      } else if (fieldName === 'otherShapes') {
        // other shapes
        Object.keys(subMapper).forEach((shapeId) => {
          const shappStyle = subMapper[shapeId];
          updateShapeChange({
            innerModel,
            subMapper: shappStyle,
            shapeId,
            shapeConfig: displayModelData[fieldName][shapeId],
            shapesToChange,
            dataChangedFields,
          });
        });
      } else {
        // fields not about shape
        const { changed, value: mappedValue } = updateChange({
          innerModel,
          shapeId: undefined,
          subMapper: mapper,
          fieldName,
          shapesToChange,
          dataChangedFields,
        });
        displayModelData[fieldName] = mappedValue;
        if (changed && fieldName === 'type') typeChange = true;
      }
    });
    const displayModel = {
      ...otherProps,
      data: displayModelData,
    };
    const hasShapeChange = Object.keys(shapesToChange)?.length;
    return {
      model: displayModel,
      shapesToChange: hasShapeChange ? shapesToChange : undefined,
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

  public setState(state: string, value: string | boolean) {
    const existState = this.states.find((item) => item.name === state);
    if (existState && value) {
      existState.value = value;
    } else {
      const idx = this.states.indexOf(existState);
      this.states.splice(idx, 1);
    }
    // TODO: call element setState fn from useLib
  }

  public hasState(state: string) {
    const findState = this.states.find((item) => item.name === state);
    return findState || false;
  }

  public clearStates(states?: string[]) {
    const newStates = this.states.filter((state) => !states.includes(state.name));
    this.states = newStates;
    states.forEach((state) => {
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

const updateChange = ({
  innerModel,
  shapeId,
  subMapper,
  fieldName,
  shapesToChange,
  dataChangedFields,
}): {
  changed: boolean;
  value?: unknown;
} => {
  const value = subMapper[fieldName];
  if (isEncode(value)) {
    const { fields, formatter } = value;
    // data changed fields and the encode fields are overlapped, display value should be changed
    if (!dataChangedFields || isArrayOverlap(dataChangedFields, fields)) {
      if (shapeId) shapesToChange[shapeId] = true;
      return {
        changed: true,
        value: formatter(innerModel),
      };
    }
    return { changed: false };
  } else {
    if (shapeId) shapesToChange[shapeId] = true;
    return {
      changed: true,
      value,
    };
  }
};

const updateShapeChange = ({
  innerModel,
  subMapper,
  shapeId,
  shapesToChange,
  dataChangedFields,
  shapeConfig,
}) => {
  Object.keys(subMapper).forEach((shapeAttrName) => {
    const { value: mappedValue } = updateChange({
      innerModel,
      shapeId,
      subMapper,
      fieldName: shapeAttrName,
      shapesToChange,
      dataChangedFields,
    });
    shapeConfig[shapeAttrName] = mappedValue;
  });
};
