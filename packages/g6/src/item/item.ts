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
const OTHER_SHAPES_FIELD_NAME = 'otherShapes';

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

  public draw(diffData?: { oldData: ItemModelData; newData: ItemModelData }) {
    // call this.renderExt.draw in extend implementations
    const afterDrawShapes = this.renderExt.afterDraw?.(this.displayModel, this.shapeMap) || {};
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
      // TODO
    }
    // TODO: 3. call element update fn from useLib
    this.draw(diffData);
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
    diffData?: { oldData: ItemModelData; newData: ItemModelData },
    isReplace?: boolean,
  ): {
    model: ItemDisplayModel;
    typeChange?: boolean;
  } {
    const { mapper } = this;
    const { newData = innerModel.data, oldData } = diffData || {};

    // === no mapper, displayModel = model ===
    if (!mapper) {
      this.displayModel = innerModel; // TODO: need clone?
      // compare the oldData and newData to find shape changes
      let typeChange = false;
      if (newData) {
        typeChange = Boolean(newData.type);
      }
      return {
        model: innerModel,
        typeChange,
      };
    }

    // === mapper is function, displayModel is mapper(model), cannot diff the displayModel, so all the shapes need to be updated ===
    if (isFunction(mapper)) return { model: mapper(innerModel) };

    // === fields' values in mapper are final value or Encode ===
    const dataChangedFields = isReplace
      ? Array.from(new Set(Object.keys(newData).concat(Object.keys(oldData)))) // all the fields for replacing all data
      : Object.keys(newData); // only fields in newData for partial updating

    let typeChange = false;
    const { data, ...otherProps } = innerModel;
    const displayModelData = clone(data);
    Object.keys(mapper).forEach((fieldName) => {
      const subMapper = mapper[fieldName];
      displayModelData[fieldName] = displayModelData[fieldName] || {};

      if (RESERVED_SHAPE_IDS.includes(fieldName)) {
        // reserved shapes, fieldName is shapeId
        updateShapeChange({
          innerModel,
          mapper: subMapper,
          dataChangedFields,
          shapeConfig: displayModelData[fieldName],
        });
      } else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
        // other shapes
        Object.keys(subMapper).forEach((shapeId) => {
          displayModelData[fieldName][shapeId] = displayModelData[fieldName][shapeId] || {};
          const shappStyle = subMapper[shapeId];
          updateShapeChange({
            innerModel,
            mapper: shappStyle,
            dataChangedFields,
            shapeConfig: displayModelData[fieldName][shapeId],
          });
        });
      } else {
        // fields not about shape
        const { changed, value: mappedValue } = updateChange({
          innerModel,
          mapper,
          fieldName,
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

/**
 * Get the mapped value of a field on innerModel
 * @param param0: {
 *  innerModel, // find unmapped field value from innerModel
 *  fieldName, // name of the field to read from innerModel
 *  mapper, // mapper object, contains the field's mapper
 *  shapeId, // id of the shape where the fieldName belong to
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
    if (isArrayOverlap(dataChangedFields, fields)) {
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
 * Update a shape's config according to the mapper
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
