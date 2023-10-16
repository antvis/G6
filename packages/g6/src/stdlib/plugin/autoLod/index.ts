import { debounce, isEmpty, uniqueId } from '@antv/util';
import { ID, IGraph } from '../../../types';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { intersectBBox } from '../../../util/shape';
import { getZoomLevel } from '../../../util/zoom';

/**
 * This is an interface named `AutoLodConfig`, which extends the `IPluginBaseConfig` interface. It contains the following properties:
 * cellSize
 * numberPerCell
 */
export interface AutoLodConfig extends IPluginBaseConfig {
  cellSize?: number;
  numberPerCell?: number;
}

export class AutoLod extends Base {
  private shownIds = [];
  private offset = [0, 0];
  constructor(options?: AutoLodConfig) {
    super(options);
  }

  public getDefaultCfgs(): AutoLodConfig {
    return {
      key: `labelAotuLod-${uniqueId()}`,
      cellSize: 100,
      numberPerCell: 1,
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
  }

  public getEvents() {
    return {
      afterrender: this.updateCells,
      aftersetsize: this.updateCells,
      viewportchange: this.updateCells,
    };
  }

  /**
   * Update grid.
   * @param param
   */
  protected updateCells = (transform) => {
    if (transform && !transform.zoom) {
      const { dx, dy } = transform.translate;
      this.offset[0] += dx;
      this.offset[1] += dy;
    }
    console.log('offset11', this.offset);
    this.debounceUpdate();
  };
  private debounceUpdate = debounce(
    () => {
      const { graph } = this;
      const { cellSize, numberPerCell } = this.options;
      const range = this.graph.getCanvasRange();
      const graphZoom = graph.getZoom();

      const cells = new Map<string, ID[]>();
      const candidateShapeMap = new Map<
        ID,
        {
          lodVisibleShapeIds: string[];
          autoVisibleShapeIds: string[];
          invisibleShapeIds: string[];
        }
      >();
      const lodVisibleIds = [];
      const lodInvisibleIds = new Map<ID, string[]>();
      graph.getAllNodesData().forEach((model) => {
        const { lodStrategy, ...others } = graph.getDisplayModel(model.id).data;
        const autoVisibleShapeIds = [];
        const lodVisibleShapeIds = [];
        const invisibleShapeIds = [];
        Object.keys(others).forEach((key) => {
          const val = others[key];
          if (typeof val !== 'object' || key === 'keyShape') return;
          const { lod, visible } = val;
          if (visible === false) return;
          if (isEmpty(lodStrategy) || lod === 'auto') {
            autoVisibleShapeIds.push(key);
          } else if (lod >= getZoomLevel(lodStrategy.levels, graphZoom)) {
            lodVisibleShapeIds.push(key);
          } else {
            invisibleShapeIds.push(key);
          }
        });

        if (!lodVisibleShapeIds.length && !autoVisibleShapeIds.length) {
          lodInvisibleIds.set(model.id, invisibleShapeIds);
          return;
        }

        const bounds = graph.getRenderBBox(model.id, true);
        if (!bounds || !graph.getItemVisible(model.id)) {
          lodInvisibleIds.set(model.id, invisibleShapeIds);
          return;
        }

        if (!autoVisibleShapeIds.length) {
          lodVisibleIds.push(model.id);
        }

        if (intersectBBox(range, bounds)) {
          const { center } = bounds;
          const viewport = graph.getViewportByCanvas({
            x: center[0],
            y: center[1],
            z: center[2],
          });
          const rowIdx = Math.floor((viewport.x - this.offset[0]) / cellSize);
          const colIdx = Math.floor((viewport.y - this.offset[1]) / cellSize);
          const cellIdx = `${rowIdx}-${colIdx}`;
          const cellNodeIds = cells.get(cellIdx) || [];
          cellNodeIds.push(model.id);
          cells.set(cellIdx, cellNodeIds);
          candidateShapeMap.set(model.id, {
            lodVisibleShapeIds,
            autoVisibleShapeIds,
            invisibleShapeIds,
          });
          return;
        }
        lodInvisibleIds.set(model.id, invisibleShapeIds);
      });
      const shownIds = [];
      cells.forEach((cell) => {
        // priority: lod Visible > shown last time > rest auto
        cell.sort((a, b) => {
          const { lodVisibleShapeIds: aLodVisibleShapeIds } =
            candidateShapeMap.get(a);
          const { lodVisibleShapeIds: bLodVisibleShapeIds } =
            candidateShapeMap.get(b);
          if (lodVisibleIds.includes(a) && aLodVisibleShapeIds.length)
            return -1;
          if (lodVisibleIds.includes(b) && bLodVisibleShapeIds.length) return 1;
          const aShownLastTime =
            this.shownIds.includes(a) && !lodInvisibleIds.has(a);
          if (aShownLastTime) return -1;
          const bShownLastTime =
            this.shownIds.includes(b) && !lodInvisibleIds.has(b);
          if (bShownLastTime) return 1;
          return 0;
        });
        let rest = numberPerCell;
        cell.forEach((id) => {
          const { lodVisibleShapeIds, autoVisibleShapeIds, invisibleShapeIds } =
            candidateShapeMap.get(id);

          if (invisibleShapeIds.length) {
            graph.hideItemShapes(id, invisibleShapeIds);
            return;
          }
          if (rest > 0) {
            graph.showItemShapes(
              id,
              lodVisibleShapeIds.concat(autoVisibleShapeIds),
            );
            shownIds.push(id);
            rest--;
          } else {
            graph.hideItemShapes(id, autoVisibleShapeIds);
          }
        });
      });
      lodInvisibleIds.forEach((shapeIds, id) => {
        graph.hideItemShapes(id, shapeIds);
      });
      this.shownIds = shownIds;
    },
    16,
    false,
  );

  public destroy() {
    super.destroy();
  }
}
