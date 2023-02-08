import { Group, IElement } from "@antv/g";
import { clone } from "@antv/util";
import { DisplayMapper, IItem, ItemDisplayModel, ItemModel, ITEM_TYPE } from "../types/item";

export default abstract class Item implements IItem {
  public destroyed: boolean = false;
  // inner data model
  public model: ItemModel;
  // display data model
  public displayModel: ItemDisplayModel;
  public mapper: DisplayMapper;
  public group: Group;
  public keyShape: IElement;
  // render extension for this item
  public renderExt;
  public visible: boolean = true;
  public states: {
    name: string,
    value: string | boolean
  }[] = [];
  /** Set to different value in implements */
  public type: ITEM_TYPE = 'node';

  constructor(props) {
    const { model, renderExt, containerGroup, mapper } = props;
    this.group = new Group();
    containerGroup.appendChild(this.group);
    this.model = model;
    this.mapper = mapper;
    this.displayModel = mapper?.(model) || model;
    this.renderExt = renderExt;
  }

  abstract draw(): void;

  public update(model: ItemModel) {
    // 1. merge model into this model
    this.model = Object.assign(this.model, model);
    // 2. map new merged model to displayModel, keep prevModel and newModel for 3.
    const prevDisplayModel = clone(this.displayModel);
    this.displayModel = this.mapper?.(this.model) || this.model;
    const shouldUpdate = this.renderExt(this.displayModel, prevDisplayModel);
    if (shouldUpdate) {
      const { data } = this.displayModel;
      const { x = 0, y = 0 } = data;
      this.group.style.x = x;
      this.group.style.y = y;
      // TODO: 3. call element update fn from useLib
      this.draw()
    }
  }

  // public getModel() {
  //   return this.model;
  // }

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
    // TODO: 2. clear group and remove group
    this.model = null;
    this.displayModel = null;
    this.destroyed = true;
  }
}