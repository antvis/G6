import { GraphEvent } from '../constants';
import type { BaseEvent } from '../utils/event';
import { GraphLifeCycleEvent } from '../utils/event';
import type { RuntimeContext } from './types';

export class BatchController {
  private context: RuntimeContext;

  private batchCount: number = 0;

  constructor(context: RuntimeContext) {
    this.context = context;
  }

  private emit(event: BaseEvent) {
    const { graph } = this.context;
    graph.emit(event.type, event);
  }

  public startBatch(initiate = true) {
    this.batchCount++;
    if (this.batchCount === 1) this.emit(new GraphLifeCycleEvent(GraphEvent.BATCH_START, { initiate }));
  }

  public endBatch() {
    this.batchCount--;
    if (this.batchCount === 0) this.emit(new GraphLifeCycleEvent(GraphEvent.BATCH_END));
  }

  public get isBatching() {
    return this.batchCount > 0;
  }

  public destroy() {
    // @ts-ignore
    this.context = null;
  }
}
