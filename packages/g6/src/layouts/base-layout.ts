import type { RuntimeContext } from '../runtime/types';
import type { GraphData } from '../spec';
import type { BaseLayoutOptions } from './types';

/**
 * <zh/> 布局的基类
 *
 * <en/> Base class for layout
 */
export abstract class BaseLayout<O extends BaseLayoutOptions = any> {
  public abstract id: string;

  public options: O;

  protected context: RuntimeContext;

  constructor(context: RuntimeContext, options?: O) {
    this.context = context;
    this.options = options || ({} as O);
  }

  public stop?: () => void;

  public tick?: (iterations?: number) => GraphData;

  public abstract execute(model: GraphData, options?: O): Promise<GraphData>;
}
