import { Group } from '@antv/g';
import { NodeModel } from '../types';
import { DisplayMapper } from '../types/item';
import { NodeModelData } from '../types/node';
import { updateShapes, getGroupSucceedMap } from '../util/shape';
import Item from './item';

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
  public draw(diffData?: { oldData: NodeModelData; newData: NodeModelData }) {
    const { group, displayModel, renderExt, shapeMap: prevShapeMap } = this;
    const { data } = displayModel;
    const { x = 0, y = 0 } = data;
    group.style.x = x;
    group.style.y = y;
    const shapeMap = renderExt.draw(displayModel, this.shapeMap, diffData);

    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(prevShapeMap, shapeMap, group);

    this.shapeMap.labelShape?.toFront();

    super.draw(diffData);
  }

  public update(
    model: NodeModel,
    diffData: { oldData: NodeModelData; newData: NodeModelData },
    isReplace?: boolean,
  ) {
    super.update(model, diffData, isReplace);
    const { data } = this.displayModel;
    const { x = 0, y = 0 } = data;
    this.group.style.x = x;
    this.group.style.y = y;
  }

  public getKeyBBox() {
    const { keyShape } = this.shapeMap;
    return keyShape?.getRenderBounds() || { center: [0, 0, 0] };
  }
}
