import each from '@antv/util/lib/each';
import isArray from '@antv/util/lib/is-array';
import isString from '@antv/util/lib/is-string';
import Behavior from '../../behavior/behavior';
import { IBehavior } from '../../interface/behavior';
import { IGraph } from '../../interface/graph';
import { ModeType, Modes } from '../../types';
import Graph from '../graph';

export default class ModeController {
  private graph: Graph;

  public destroyed: boolean;

  /**
   * modes = {
   *  default: [ 'drag-node', 'zoom-canvas' ],
   *  edit: [ 'drag-canvas', {
   *    type: 'brush-select',
   *    trigger: 'ctrl'
   *  }]
   * }
   *
   * @private
   * @type {Modes}
   * @memberof Mode
   */
  public modes: Modes;

  /**
   * mode = 'drag-node'
   *
   * @private
   * @type {string}
   * @memberof Mode
   */
  public mode: string;

  private currentBehaves: IBehavior[];

  constructor(graph: Graph) {
    this.graph = graph;
    this.destroyed = false;
    this.modes = graph.get('modes') || {
      default: [],
    };
    this.formatModes();

    this.mode = graph.get('defaultMode') || 'default';
    this.currentBehaves = [];

    this.setMode(this.mode);
  }

  private formatModes() {
    const { modes } = this;
    each(modes, (mode) => {
      each(mode, (behavior, i) => {
        if (isString(behavior)) {
          mode[i] = { type: behavior };
        }
      });
    });
  }

  private setBehaviors(mode: string) {
    const { graph } = this;
    const behaviors = this.modes[mode];
    const behaves: IBehavior[] = [];
    let behave: IBehavior;
    each(behaviors || [], (behavior) => {
      const BehaviorInstance = Behavior.getBehavior(behavior.type);
      if (!BehaviorInstance) {
        return;
      }

      behave = new BehaviorInstance(behavior);
      if (behave) {
        behave.bind(graph as IGraph);
        behaves.push(behave);
      }
    });
    this.currentBehaves = behaves;
  }

  private static mergeBehaviors(modeBehaviors: ModeType[], behaviors: ModeType[]): ModeType[] {
    each(behaviors, (behavior) => {
      if (modeBehaviors.indexOf(behavior) < 0) {
        if (isString(behavior)) {
          behavior = { type: behavior };
        }
        modeBehaviors.push(behavior);
      }
    });
    return modeBehaviors;
  }

  private static filterBehaviors(modeBehaviors: ModeType[], behaviors: ModeType[]): ModeType[] {
    const result: ModeType[] = [];
    modeBehaviors.forEach((behavior) => {
      let type: string = '';
      if (isString(behavior)) {
        type = behavior;
      } else {
        // eslint-disable-next-line prefer-destructuring
        type = behavior.type;
      }
      if (behaviors.indexOf(type) < 0) {
        result.push(behavior);
      }
    });
    return result;
  }

  public setMode(mode: string) {
    const { modes, graph } = this;

    const current = mode;

    const behaviors = modes[current];
    if (!behaviors) {
      return;
    }
    graph.emit('beforemodechange', { mode });

    each(this.currentBehaves, (behave) => {
      behave.unbind(graph);
    });

    this.setBehaviors(current);

    graph.emit('aftermodechange', { mode });
    this.mode = mode;
  }

  public getMode(): string {
    return this.mode;
  }

  /**
   * 动态增加或删除 Behavior
   *
   * @param {ModeType[]} behaviors
   * @param {(ModeType[] | ModeType)} modes
   * @param {boolean} isAdd
   * @returns {Mode}
   * @memberof Mode
   */
  public manipulateBehaviors(
    behaviors: ModeType[] | ModeType,
    modes: string[] | string,
    isAdd: boolean,
  ): ModeController {
    let behaves: ModeType[];
    if (!isArray(behaviors)) {
      behaves = [behaviors];
    } else {
      behaves = behaviors;
    }

    if (isArray(modes)) {
      each(modes, (mode) => {
        if (!this.modes[mode]) {
          if (isAdd) {
            this.modes[mode] = behaves;
          }
        } else if (isAdd) {
          this.modes[mode] = ModeController.mergeBehaviors(this.modes[mode] || [], behaves);
        } else {
          this.modes[mode] = ModeController.filterBehaviors(this.modes[mode] || [], behaves);
        }
      });

      return this;
    }

    let currentMode = modes;
    if (!modes) {
      currentMode = this.mode; // isString(this.mode) ? this.mode : this.mode.type
    }

    if (!this.modes[currentMode]) {
      if (isAdd) {
        this.modes[currentMode] = behaves;
      }
    }

    if (isAdd) {
      this.modes[currentMode] = ModeController.mergeBehaviors(
        this.modes[currentMode] || [],
        behaves,
      );
    } else {
      this.modes[currentMode] = ModeController.filterBehaviors(
        this.modes[currentMode] || [],
        behaves,
      );
    }

    this.setMode(this.mode);

    return this;
  }

  public destroy() {
    (this.graph as Graph | null) = null;
    (this.modes as Modes | null) = null;
    (this.currentBehaves as IBehavior[] | null) = null;
    this.destroyed = true;
  }
}
