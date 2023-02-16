import { Group } from '@antv/g';
import { ID } from '@antv/graphlib';
import { EdgeDisplayModel, EdgeModel } from '../types';
import { EdgeModelData } from '../types/edge';
import { DisplayMapper, ITEM_TYPE } from '../types/item';
import { updateShapes } from '../util/shape';
import Item from './item';
import Node from './node';

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
  public draw(diffData?: { oldData: EdgeModelData; newData: EdgeModelData }) {
    // get the end points
    const sourceBBox = this.sourceItem.getKeyBBox();
    const targetBBox = this.targetItem.getKeyBBox();
    const sourcePoint = {
      x: sourceBBox.center[0],
      y: sourceBBox.center[1],
    };
    const targetPoint = {
      x: targetBBox.center[0],
      y: targetBBox.center[1],
    };
    const shapeMap = this.renderExt.draw(
      this.displayModel,
      sourcePoint,
      targetPoint,
      this.shapeMap,
    );

    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(this.shapeMap, shapeMap, this.group);

    super.draw(diffData);
  }

  /**
   * Sometimes no changes on edge data, but need to re-draw it
   * e.g. source and target nodes' position changed
   */
  public forceUpdate() {
    this.draw();
  }

  /**
   * Update end item for item and re-draw the edge
   * @param type update source or target
   * @param endItem new item to ended
   */
  public updateEnd(type: 'source' | 'target', endItem: Node) {
    if (type === 'source') this.sourceItem = endItem;
    else if (type === 'target') this.targetItem = endItem;
    this.draw();
  }

  // public update(model: EdgeModel) {
  //   super.update(model);
  // }
}
