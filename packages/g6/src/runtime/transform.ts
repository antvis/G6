import { ExtensionController } from '../registry/extension';
import type { ExtensionCategory } from '../registry/extension/types';
import type { CustomTransformOption, TransformOptions } from '../spec/transform';
import { BaseTransform } from '../transforms';
import type { RuntimeContext } from './types';

export const REQUIRED_TRANSFORMS: TransformOptions = [
  'update-related-edges',
  'arrange-draw-order',
  'collapse-expand-combo',
];

export class TransformController extends ExtensionController<BaseTransform<CustomTransformOption>> {
  public category: ExtensionCategory = 'transform';

  constructor(context: RuntimeContext) {
    super(context);
    this.setTransforms(this.context.options.transforms || []);
  }

  public setTransforms(transforms: TransformOptions) {
    this.setExtensions(transforms.concat(REQUIRED_TRANSFORMS));
  }

  public getTransformInstance(key?: string) {
    return key ? this.extensionMap[key] : this.extensionMap;
  }
}
