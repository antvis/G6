import { uniqueId } from '@antv/util';
import { Behavior, BehaviorOption, BehaviorSpecification } from '../../types/behavior';
// TODO: definition of drag-canvas behavior 

interface DragCanvasOptions { key?: string, assistKey?: 'ctrl' | 'shift' };
export default class DragCanvas extends Behavior {
  protected key: string;
  protected options: DragCanvasOptions;
  constructor(options: DragCanvasOptions) {
    super(options);
  }
  public getKey: () => string = () => {
    return this.key;
  }
  public getSpec: () => BehaviorSpecification = () => {
    return {} as BehaviorSpecification
  };
  public getEvents() {
    return {}
  }
  public destroy() { }
}
