import type { GraphData } from '../spec';
import type { BaseLayoutOptions } from './types';

export abstract class BaseLayout<O extends BaseLayoutOptions = any> {
  public abstract id: string;

  public options: O;

  constructor(options?: O) {
    this.options = options || ({} as O);
  }

  public stop?: () => void;

  public tick?: (iterations?: number) => GraphData;

  public abstract execute(model: GraphData, options?: O): Promise<GraphData>;
}
