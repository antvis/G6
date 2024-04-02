import { GraphEvent } from '../constants';
import { BaseEvent, BatchEvent } from '../utils/event';
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
    this.emit(new BatchEvent(GraphEvent.BATCH_START, initiate));
  }

  public endBatch() {
    this.batchCount--;
    this.emit(new BatchEvent(GraphEvent.BATCH_END));
  }

  public get isBatching() {
    return this.batchCount > 0;
  }

  public destroy() {
    // @ts-expect-error force delete
    delete this.batches;
    // @ts-expect-error force delete
    delete this.context;
  }
}
