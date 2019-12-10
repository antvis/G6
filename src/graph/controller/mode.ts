import each from '@antv/util/lib/each'
import isArray from '@antv/util/lib/is-array'
import isString from '@antv/util/lib/is-string'
import Behavior from '@g6/behavior/behavior'
import { IBehavior } from '@g6/interface/behavior';
import { IGraph, IMode, IModeType } from '@g6/interface/graph';

export default class Mode {
  private graph: IGraph
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
   * @type {IMode}
   * @memberof Mode
   */
  public modes: IMode

  /**
   * mode = 'drag-node'
   *
   * @private
   * @type {string}
   * @memberof Mode
   */
  public mode: string
  private currentBehaves: IBehavior[]
  constructor(graph: IGraph) {
    this.graph = graph
    this.modes = graph.get('modes') || {
      default: []
    }
    this.formatModes()

    this.mode = graph.get('defaultMode') || 'default'
    this.currentBehaves = []

    this.setMode(this.mode)
  }

  private formatModes() {
    const modes = this.modes;
    each(modes, mode => {
      each(mode, (behavior, i) => {
        if (isString(behavior)) {
          mode[i] = { type: behavior };
        }
      });
    });
  }

  private setBehaviors(mode: string) {
    const graph = this.graph;
    const behaviors = this.modes[mode];
    const behaves: IBehavior[] = [];
    let behave: IBehavior;
    each(behaviors, behavior => {
      const BehaviorInstance = Behavior.getBehavior(behavior.type)
      if (!BehaviorInstance) {
        return;
      }
      behave = new BehaviorInstance(behavior);
      if(behave) {
        behave.bind(graph)
        behaves.push(behave);
      }
    });
    this.currentBehaves = behaves;
  }

  private mergeBehaviors(modeBehaviors: IModeType[], behaviors: IModeType[]): IModeType[] {
    each(behaviors, behavior => {
      if (modeBehaviors.indexOf(behavior) < 0) {
        if (isString(behavior)) {
          behavior = { type: behavior };
        }
        modeBehaviors.push(behavior);
      }
    });
    return modeBehaviors;
  }

  private filterBehaviors(modeBehaviors: IModeType[], behaviors: IModeType[]): IModeType[] {
    const result: IModeType[] = [];
    modeBehaviors.forEach(behavior => {
      let type: string = ''
      if(isString(behavior)) {
        type = behavior
      } else {
        type = behavior.type
      }
      if (behaviors.indexOf(type) < 0) {
        result.push(behavior);
      }
    });
    return result;
  }

  public setMode(mode: string): Mode {
    const modes = this.modes;
    const graph = this.graph;
    const behaviors = modes[mode];
    if (!behaviors) {
      return;
    }
    graph.emit('beforemodechange', { mode });

    each(this.currentBehaves, behave => {
      behave.unbind(graph);
    });

    this.setBehaviors(mode);

    graph.emit('aftermodechange', { mode });
    this.mode = mode;

    return this;
  }

  /**
   * 动态增加或删除 Behavior
   *
   * @param {IModeType[]} behaviors
   * @param {(IModeType[] | IModeType)} modes
   * @param {boolean} isAdd
   * @returns {Mode}
   * @memberof Mode
   */
  public manipulateBehaviors(behaviors: IModeType[], modes: IModeType[] | IModeType, isAdd: boolean): Mode {
    const self = this
    if(!isArray(behaviors)) {
      behaviors = [ behaviors ]
    }

    if(isArray(modes)) {
      each(modes, mode => {
        if (!self.modes[mode]) {
          if (isAdd) {
            self.modes[mode] = [].concat(behaviors);
          }
        } else {
          if (isAdd) {
            self.modes[mode] = this.mergeBehaviors(self.modes[mode], behaviors);
          } else {
            self.modes[mode] = this.filterBehaviors(self.modes[mode], behaviors);
          }
        }
      })

      return this
    }

    let currentMode: string = ''
    if(!modes) {
      currentMode = this.mode
    }

    if (isAdd) {
      self.modes[currentMode] = this.mergeBehaviors(self.modes[currentMode], behaviors);
    } else {
      self.modes[currentMode] = this.filterBehaviors(self.modes[currentMode], behaviors);
    }

    self.setMode(this.mode)

    return this
  }

}