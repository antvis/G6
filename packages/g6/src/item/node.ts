import { Group } from '@antv/g';
import { clone } from '@antv/util';
import { NodeModel } from '../types';
import { DisplayMapper } from "../types/item";
import Item from "./item";

interface IProps {
  model: NodeModel;
  renderExt: any; // TODO: type
  containerGroup: Group;
  mapper: DisplayMapper;
}
export default class Node extends Item {
  constructor(props: IProps) {
    super(props);
    this.draw();
  }
  public draw() {
    const { data } = this.displayModel;
    const { x = 0, y = 0 } = data;
    this.group.style.x = x;
    this.group.style.y = y;
    this.keyShape = this.renderExt.draw(this.displayModel, this.group);
    this.renderExt.afterDraw?.(this.displayModel, this.group);
  }

  public update(model: NodeModel) {
    super.update(model);
  }

  public getKeyBBox() {
    return this.keyShape?.getRenderBounds() || { center: [0, 0, 0] }
  }
}