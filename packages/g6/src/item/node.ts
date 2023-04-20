import { Group } from '@antv/g';
import { clone } from '@antv/util';
import { NodeModel } from '../types';
import { DisplayMapper, ItemShapeStyles, State } from '../types/item';
import { NodeDisplayModel, NodeModelData } from '../types/node';
import { ItemStyleSet } from '../types/theme';
import { updateShapes } from '../util/shape';
import Item from './item';

interface IProps {
  model: NodeModel;
  renderExtensions: any; // TODO: type
  containerGroup: Group;
  mapper: DisplayMapper;
  stateMapper: {
    [stateName: string]: DisplayMapper
  };
  themeStyles: ItemShapeStyles;
}
export default class Node extends Item {
  public type: 'node';

  constructor(props: IProps) {
    super(props);
    this.type = 'node';
    this.init(props);
    this.draw(this.displayModel as NodeDisplayModel);
  }
  public draw(displayModel: NodeDisplayModel, diffData?: { previous: NodeModelData; current: NodeModelData }, diffState?: { previous: State[], current: State[] }) {
    const { group, renderExt, shapeMap: prevShapeMap, model } = this;
    const { data } = displayModel;
    const { x = 0, y = 0 } = data;
    group.style.x = x;
    group.style.y = y;
    this.group.setAttribute('data-item-type', 'node');
    this.group.setAttribute('data-item-id', model.id);
    renderExt.mergeStyles(displayModel);
    const shapeMap = renderExt.draw(displayModel, this.shapeMap, diffData, diffState);

    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(prevShapeMap, shapeMap, group);

    this.shapeMap.labelShape?.toFront();

    super.draw(displayModel, diffData, diffState);
  }

  public update(
    model: NodeModel,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    isReplace?: boolean,
    themeStyles?: ItemStyleSet,
  ) {
    super.update(model, diffData, isReplace, themeStyles);
    const { data } = this.displayModel;
    const { x = 0, y = 0 } = data;
    this.group.style.x = x;
    this.group.style.y = y;
  }

  public clone(containerGroup: Group) {
    return new Node({
      model: clone(this.model),
      renderExtensions: this.renderExtensions,
      containerGroup,
      mapper: this.mapper,
      stateMapper: this.stateMapper,
      themeStyles: clone(this.themeStyles),
    });
  }
}
