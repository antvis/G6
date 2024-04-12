import { BaseExtension } from '../registry/extension';
import type { FlowData } from '../runtime/element';
import type { CustomBehaviorOption } from '../spec/behavior';

export type BaseTransformOptions = CustomBehaviorOption;

export abstract class BaseTransform<T extends BaseTransformOptions = BaseTransformOptions> extends BaseExtension<T> {
  public beforeDraw(data: FlowData): FlowData {
    return data;
  }
}
