import { Group } from '@antv/g';
import { clone } from '@antv/util';
import { NodeModel } from '../types';
import { DisplayMapper } from "../types/item";
import { NodeModelData } from '../types/node';
import { getGroupSucceedMap } from '../util/shape';
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
  public draw(diffData?: { oldData: NodeModelData, newData: NodeModelData }, shapesToChange?: { [shapeId: string]: boolean }) {
    const { data } = this.displayModel;
    const { x = 0, y = 0 } = data;
    this.group.style.x = x;
    this.group.style.y = y;
    const shapeMap = this.renderExt.draw(this.displayModel, this.group, diffData, shapesToChange);

    // TODO: be util
    Object.keys(shapeMap).forEach(key => {
      if (['keyShape', 'labelShape', 'iconShape'].includes(key)) {
        if (shapeMap[key]) this.shapeMap[key] = shapeMap[key];
        return;
      }
      if (!shapeMap[key]) {
        delete this.shapeMap[key];
      } else {
        this.shapeMap[key] = shapeMap[key];
      }
    });

    super.draw(diffData, shapesToChange);;
  }

  public update(model: NodeModel, diffData: { oldData: NodeModelData, newData: NodeModelData }, dataChangedFields?: string[]) {
    super.update(model, diffData, dataChangedFields);
    const { data } = this.displayModel;
    const { x = 0, y = 0 } = data;
    this.group.style.x = x;
    this.group.style.y = y;
  }

  public getKeyBBox() {
    const { keyShape } = this.shapeMap;
    return keyShape?.getRenderBounds() || { center: [0, 0, 0] }
  }
}