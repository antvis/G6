import { Group } from '@antv/g';
import { clone } from '@antv/util';
import { NodeModel } from '../types';
import { DisplayMapper } from "../types/item";
import { NodeModelData } from '../types/node';
import { updateShapes, getGroupSucceedMap } from '../util/shape';
import Item, { RESERVED_SHAPE_IDS } from "./item";

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
    const { group, displayModel, renderExt, shapeMap: prevShapeMap } = this;
    const { data } = displayModel;
    const { x = 0, y = 0 } = data;
    group.style.x = x;
    group.style.y = y;
    let changeShapes = shapesToChange || {};
    if (!shapesToChange) {
      Object.keys(prevShapeMap).forEach(id => changeShapes[id] = true);
    }
    const shapeMap = renderExt.draw(displayModel, this.shapeMap, diffData, changeShapes);

    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(prevShapeMap, shapeMap, group);

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