import { Group } from "@antv/g";
import { EdgeDisplayModel, EdgeModel } from "../types";
import { DisplayMapper, ITEM_TYPE } from "../types/item";
import Item from "./item";
import Node from "./node";

interface IProps {
  model: EdgeModel;
  renderExt: any; // TODO: type
  containerGroup: Group;
  mapper: DisplayMapper;
  sourceItem: Node;
  targetItem: Node;
}

export default class Edge extends Item {
  public destroyed: boolean = false;
  // inner data model
  public model: EdgeModel;
  // display data model
  public displayModel: EdgeDisplayModel;
  /** Set to different value in implements */
  public type: ITEM_TYPE = 'edge';
  public sourceItem: Node;
  public targetItem: Node;

  constructor(props: IProps) {
    super(props);
    const { sourceItem, targetItem } = props;
    this.sourceItem = sourceItem;
    this.targetItem = targetItem;
    this.draw();
  }
  public draw() {
    // get the end points
    const sourceBBox = this.sourceItem.getKeyBBox();
    const targetBBox = this.targetItem.getKeyBBox();
    const sourcePoint = {
      x: sourceBBox.center[0],
      y: sourceBBox.center[1]
    }
    const targetPoint = {
      x: targetBBox.center[0],
      y: targetBBox.center[1]
    }
    this.renderExt.draw(this.displayModel, sourcePoint, targetPoint, this.group);
    this.renderExt.afterDraw?.(this.displayModel, this.group);
  }

  public update(model: EdgeModel) {
    super.update(model);
  }
}