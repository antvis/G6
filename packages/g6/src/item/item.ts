import { Group } from "@antv/g";
import { IItem, ItemDisplayModel, ItemModel } from "../types/item";

export default class Item implements IItem {
  public destroyed: boolean = false;
  public model: ItemModel;
  private displayModel: ItemDisplayModel;
  private group: Group;
  private visible: boolean = true;
  private states: {
    name: string,
    value: string | boolean
  }[] = [];
  /** Set to different value in implements */
  private type: 'node' | 'edge' | 'combo' = 'node';

  constructor(model: ItemModel) {
    this.group = new Group();
    this.model = model;
    this.draw();
  }

  public draw() {
    // TODO: 1. map this.model to displayModel
    // TODO: 2. call element draw fn from useLib
  }

  public update(model: ItemModel) {
    // TODO: 1. merge model into this model
    // TODO: 2. map new merged model to displayModel, keep prevModel and newModel for 3.
    // TODO: 3. call element update fn from useLib
  }

  public getModel() {
    return this.model;
  }

  public getID() {
    return this.model.id;
  }

  public getType() {
    return this.type;
  }

  public show() {
    this.group.style.visibility = 'visible';
    this.visible = true;
  }

  public hide() {
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