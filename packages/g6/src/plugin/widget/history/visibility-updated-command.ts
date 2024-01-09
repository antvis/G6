import { each } from '@antv/util';
import type { Graph, ID } from '../../../types';
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

  private toggleItemsVisible(graph: Graph, values) {
    graph.pauseStack();
    each(values, (value) =>
      value.visible
        ? graph.showItem(value.ids, { disableAnimate: this.disableAnimate })
        : graph.hideItem(value.ids, { disableAnimate: this.disableAnimate }),
    );
    graph.resumeStack();
  }

  undo(graph: Graph) {
    const { oldValue } = this.changes;
    this.toggleItemsVisible(graph, oldValue);
  }

  redo(graph: Graph) {
    const { newValue } = this.changes;
    this.toggleItemsVisible(graph, newValue);
  }
}
