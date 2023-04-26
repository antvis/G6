import { Group } from '@antv/g';
import { clone } from '@antv/util';
import { EdgeDisplayModel, EdgeModel, NodeModelData } from '../types';
import { EdgeModelData } from '../types/edge';
import { DisplayMapper, State } from '../types/item';
import { updateShapes } from '../util/shape';
import Item from './item';
import Node from './node';
import { EdgeStyleSet } from 'types/theme';

interface IProps {
  model: EdgeModel;
  renderExtensions: any; // TODO: type
  containerGroup: Group;
  mapper: DisplayMapper;
  stateMapper: {
    [stateName: string]: DisplayMapper;
  };
  sourceItem: Node;
  targetItem: Node;
  themeStyles: EdgeStyleSet;
}

export default class Edge extends Item {
  public destroyed = false;
  // inner data model
  public model: EdgeModel;
  // display data model
  public displayModel: EdgeDisplayModel;
  /** Set to different value in implements */
  public type: 'edge' = 'edge';
  public sourceItem: Node;
  public targetItem: Node;

  constructor(props: IProps) {
    super(props);
    this.type = 'edge';
    this.init(props);
    const { sourceItem, targetItem } = props;
    this.sourceItem = sourceItem;
    this.targetItem = targetItem;
    this.draw(this.displayModel);
  }
  public draw(
    displayModel: EdgeDisplayModel,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ) {
    // get the end points
    const { x: sx, y: sy, z: sz } = this.sourceItem.model.data as NodeModelData;
    const { x: tx, y: ty, z: tz } = this.targetItem.model.data as NodeModelData;
    const sourcePoint = this.sourceItem.getAnchorPoint({ x: tx, y: ty, z: tz });
    const targetPoint = this.targetItem.getAnchorPoint({ x: sx, y: sy, z: sz });
    this.renderExt.mergeStyles(displayModel);
    const shapeMap = this.renderExt.draw(
      displayModel,
      sourcePoint,
      targetPoint,
      this.shapeMap,
      diffData,
      diffState,
    );

    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(this.shapeMap, shapeMap, this.group);
    const { haloShape, labelShape, labelBackgroundShape } = this.shapeMap;
    haloShape?.toBack();
    labelShape?.toFront();

    super.draw(displayModel, diffData, diffState);
  }

  /**
   * Sometimes no changes on edge data, but need to re-draw it
   * e.g. source and target nodes' position changed
   */
  public forceUpdate() {
    this.draw(this.displayModel);
  }

  /**
   * Update end item for item and re-draw the edge
   * @param type update source or target
   * @param endItem new item to ended
   */
  public updateEnd(type: 'source' | 'target', endItem: Node) {
    if (type === 'source') this.sourceItem = endItem;
    else if (type === 'target') this.targetItem = endItem;
    this.draw(this.displayModel);
  }

  // public update(model: EdgeModel) {
  //   super.update(model);
  // }

  public clone(
    containerGroup: Group,
    sourceItem: Node,
    targetItem: Node,
    onlyKeyShape?: boolean,
  ) {
    if (onlyKeyShape) {
      const clonedKeyShape = this.shapeMap.keyShape.cloneNode();
      const clonedGroup = new Group();
      clonedGroup.appendChild(clonedKeyShape);
      containerGroup.appendChild(clonedGroup);
      return clonedGroup;
    }
    return new Edge({
      model: clone(this.model),
      renderExtensions: this.renderExtensions,
      sourceItem,
      targetItem,
      containerGroup,
      mapper: this.mapper,
      stateMapper: this.stateMapper,
      themeStyles: clone(this.themeStyles),
    });
  }
}
