import { each } from '@antv/util';
import type { ID, IGraph } from '../../../types';
import { Command } from './command';

interface Option {
  ids: ID[];
  visible: boolean;
}

export class VisibilityUpdatedCommand implements Command {
  private diffState: {
    newValue: Option[];
    oldValue: Option[];
    params: {
      disableAnimate?: boolean;
    };
  };

  constructor(options) {
    this.diffState = options;
  }

  undo(graph: IGraph) {
    const {
      oldValue,
      params: { disableAnimate },
    } = this.diffState;

    each(oldValue, (value) =>
      value.visible
        ? graph.showItem(value.ids, disableAnimate, false)
        : graph.hideItem(value.ids, disableAnimate, false),
    );
  }

  redo(graph: IGraph) {
    const {
      newValue,
      params: { disableAnimate },
    } = this.diffState;

    each(newValue, (value) =>
      value.visible
        ? graph.showItem(value.ids, disableAnimate, false)
        : graph.hideItem(value.ids, disableAnimate, false),
    );
  }
}
