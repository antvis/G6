import { GroupedChanges } from 'util/event';
import type { IGraph } from '../../../types';
import { Command } from './command';

export class PositionUpdatedCommand implements Command {
  private diffData: GroupedChanges['NodeDataUpdated'];

  constructor(options) {
    this.diffData = options;
  }

  undo(graph: IGraph) {
    const models = this.diffData.map((data) => ({
      id: data.id,
      data: data.oldValue,
    }));
    graph.updatePosition('node', models, false, false);
  }

  redo(graph: IGraph) {
    const models = this.diffData.map((data) => ({
      id: data.id,
      data: data.newValue,
    }));
    graph.updatePosition('node', models, false, false);
  }
}
