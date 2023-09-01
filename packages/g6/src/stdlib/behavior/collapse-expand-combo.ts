import { ID } from '@antv/graphlib';
import { throttle, uniq } from '@antv/util';
import { ComboModel, EdgeModel, NodeModel } from '../../types';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';
import { Point } from '../../types/common';
import { graphComboTreeDfs } from '../../util/data';

const ALLOWED_TRIGGERS = ['dblclick', 'click'] as const;
type Trigger = (typeof ALLOWED_TRIGGERS)[number];

export interface CollapseExpandComboOptions {
  /**
   * The key to pressed with mouse click to apply multiple selection.
   * Defaults to `"dblclick"`.
   * Could be "dblclick", "click".
   */
  trigger: Trigger;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: Required<CollapseExpandComboOptions> = {
  trigger: 'dblclick',
  shouldBegin: () => true,
};

export class CollapseExpandCombo extends Behavior {
  constructor(options: Partial<CollapseExpandComboOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    super(finalOptions);
  }

  getEvents = () => {
    if (this.options.trigger === 'dblclick') {
      return {
        'combo:dblclick': this.collapseExpandCombo,
      };
    }
    return {
      'combo:click': this.collapseExpandCombo,
    };
  };

  public collapseExpandCombo(event: IG6GraphEvent) {
    if (!this.options.shouldBegin(event)) return;
    const { itemId } = event;
    const model = this.graph.getComboData(itemId);
    if (model.data.collapsed) {
      this.graph.expandCombo(itemId);
    } else {
      this.graph.collapseCombo(itemId);
    }
  }
}
