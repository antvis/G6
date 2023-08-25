import { each } from '@antv/util';
import type { ID, IGraph } from '../../../types';
import { Command } from './command';

interface Option {
  ids: ID[];
  visible: boolean;
}

export class VisibilityUpdatedCommand implements Command {
  private changes: {
    newValue: Option[];
    oldValue: Option[];
  };
  private disableAnimate?: boolean;

  constructor(changes, disableAnimate) {
    this.changes = changes;
    this.disableAnimate = disableAnimate;
  }

  private toggleItemsVisible(graph: IGraph, values) {
    graph.pauseStacking();
    each(values, (value) =>
      value.visible
        ? graph.showItem(value.ids, this.disableAnimate)
        : graph.hideItem(value.ids, this.disableAnimate),
    );
    graph.resumeStacking();
  }

  undo(graph: IGraph) {
    const { oldValue } = this.changes;
    this.toggleItemsVisible(graph, oldValue);
  }

  redo(graph: IGraph) {
    const { newValue } = this.changes;
    this.toggleItemsVisible(graph, newValue);
  }
}
