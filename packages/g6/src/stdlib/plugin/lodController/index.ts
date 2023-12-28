import { AABB } from '@antv/g';
import { debounce, isArray, throttle, uniqueId } from '@antv/util';
import {
  ComboDisplayModel,
  ComboModel,
  EdgeDisplayModel,
  EdgeModel,
  ID,
  IGraph,
  NodeDisplayModel,
  NodeModel,
} from '../../../types';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { GraphTransformOptions } from '../../../types/view';
import { intersectBBox } from '../../../utils/shape';
import { getZoomLevel } from '../../../utils/zoom';

/**
 * This is an interface named `LodControllerConfig`, which extends the `IPluginBaseConfig` interface. It contains the following properties:
 * cellSize
 * numberPerCell
 */
export interface LodControllerConfig extends IPluginBaseConfig {
  cellSize?: number;
  numberPerCell?: number;
  disableLod?: boolean;
  debounce?: number | 'auto';
}

export class LodController extends Base {
  static required: boolean = true;
  private shownIds = new Map();
  private cacheViewModels: {
    inView: (NodeModel | EdgeModel | ComboModel)[];
    outView: (NodeModel | EdgeModel | ComboModel)[];
    newlyOutView: (NodeModel | EdgeModel | ComboModel)[];
    newlyInView: (NodeModel | EdgeModel | ComboModel)[];
  };
  private displayModelCache: Map<ID, NodeDisplayModel | EdgeDisplayModel | ComboDisplayModel> = new Map();
  private renderBoundsCache: Map<ID, AABB | false> = new Map();
  private canvasCellDirty: boolean = true;
  private canvasCellSize = 100;
  private modelCanvasIdxMap: Map<ID, { rowIdx: number; colIdx: number }>;
  private labelPositionDirty: Map<ID, boolean> = new Map();
  private debounce = 16;
  private animationUpdateTimer: number = 0;

  constructor(options?: LodControllerConfig) {
    super(options);
  }

  public getDefaultCfgs(): LodControllerConfig {
    return {
      key: `lodController-${uniqueId()}`,
      cellSize: 200,
      numberPerCell: 1,
      disableLod: false,
      disableAnimate: true,
      debounce: 'auto',
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
  }

  public getEvents() {
    if (this.graph.rendererType === 'webgl-3d') return {};
    return {
      afterrender: this.onAfterRender,
      afterlayout: this.onAfterLayout,
      aftersetsize: this.updateCells,
      viewportchange: this.updateCells,
      afteritemchange: this.updateCacheModels,
      beforeviewportanimation: this.beforeViewportAnimation,
      afterviewportanimation: this.afterViewportAnimation,
      cancelviewportanimation: this.afterViewportAnimation,
    };
  }

  protected onAfterRender = () => {
    // show the shapes with lod when disableLod is true
    const { graph, options } = this;

    this.clearCache();

    this.debounce = 80;
    if (options?.debounce === undefined || options.debounce === 'auto') {
      const nodes = graph.getAllNodesData();
      this.debounce = Math.min(Math.floor(nodes.length / 100), 80);
    }
    this.debounceUpdateVisible = this.getDebounceFn(this.updateVisible.bind(this));
  };

  protected onAfterLayout = () => {
    this.canvasCellDirty = true;
    this.updateLabelPositions(1);
    this.updateCells();
  };
  /**
   * Update grid.
   * @param params
   */
  protected updateCells = (params?: GraphTransformOptions) => {
    if (!this.graph.canvasReady) return;
    const { zoom } = params || {};
    if (params) {
      this.updateLabelPositions(zoom?.ratio);
    }
    // @ts-ignore
    if (!this.options?.disableLod) this.debounceUpdateVisible(zoom?.ratio);
  };

  private getDebounceFn = (fn) => {
    return debounce(fn, this.debounce, false);
  };

  private updateVisible = (zoomRatio = 1) => {
    const { graph, cacheViewModels, options } = this;
    const { cellSize, numberPerCell, disableAnimate, disableLod } = options || {};
    const graphZoom = graph.getZoom();
    const { inView } = cacheViewModels || this.groupItemsByView(1);

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
    inView.forEach((model) => {
      const displayModel = this.getDisplayModel(model.id);
      const { lodLevels, x, y, z, ...others } = displayModel.data;
      const lodLevelsEmpty = isEmptyObj(lodLevels);
      const currentZoomLevel = lodLevelsEmpty ? 0 : getZoomLevel(lodLevels as any, graphZoom);
      const autoVisibleShapeIds = [];
      const lodVisibleShapeIds = [];
      const invisibleShapeIds = [];
      Object.keys(others).forEach((shapeId) => {
        if (shapeId === 'keyShape') return;
        const val = others[shapeId] as any;
        if (!val || typeof val !== 'object' || !Object.keys(val).length || isArray(val)) {
          return;
        }
        const { lod, visible } = val;
        if (visible === false) return;
        if (lodLevelsEmpty || lod === 'auto') {
          autoVisibleShapeIds.push(shapeId);
        } else if (lod <= currentZoomLevel) {
          lodVisibleShapeIds.push(shapeId);
        } else {
          invisibleShapeIds.push(shapeId);
        }
      });

      if (!lodVisibleShapeIds.length && !autoVisibleShapeIds.length) {
        lodInvisibleIds.set(model.id, invisibleShapeIds);
        return;
      }

      const bounds = this.getRenderBBox(model.id);
      if (!bounds || !graph.getItemVisible(model.id)) {
        lodInvisibleIds.set(model.id, invisibleShapeIds);
        return;
      }

      if (!autoVisibleShapeIds.length) {
        lodVisibleIds.push(model.id);
      }

      const { center } = bounds;
      const param = graphZoom / cellSize;
      // rowIdx = (center[i] * graphZoom + offset[i]) - offset[i] / cellSize = center[i] * param
      const rowIdx = Math.floor((center[0] || x) * param);
      const colIdx = Math.floor((center[1] || y) * param);
      const cellIdx = `${rowIdx}-${colIdx}`;
      const cellNodeIds = cells.get(cellIdx) || [];
      cellNodeIds.push(model.id);
      cells.set(cellIdx, cellNodeIds);
      candidateShapeMap.set(model.id, {
        lodVisibleShapeIds,
        autoVisibleShapeIds,
        invisibleShapeIds,
      });
    });
    const shownIds = new Map();
    cells.forEach((cell) => {
      // priority: lod Visible > shown last time > rest auto
      cell.sort((a, b) => {
        const { lodVisibleShapeIds: aLodVisibleShapeIds } = candidateShapeMap.get(a);
        const { lodVisibleShapeIds: bLodVisibleShapeIds } = candidateShapeMap.get(b);
        if (lodVisibleIds.includes(b) && bLodVisibleShapeIds.length) return 1;
        if (lodVisibleIds.includes(a) && aLodVisibleShapeIds.length) return -1;
        const bShownLastTime = this.shownIds.has(b) && !lodInvisibleIds.has(b);
        if (bShownLastTime) return 1;
        const aShownLastTime = this.shownIds.has(a) && !lodInvisibleIds.has(a);
        if (aShownLastTime) return -1;
        return 0;
      });
      let rest = numberPerCell;
      cell.forEach((id) => {
        const { lodVisibleShapeIds, autoVisibleShapeIds, invisibleShapeIds } = candidateShapeMap.get(id);

        if (!disableLod && invisibleShapeIds.length) {
          graph.hideItem(id, { shapeIds: invisibleShapeIds, disableAnimate });
        }
        const item = graph.itemController.itemMap.get(id);
        if (
          disableLod ||
          (item.labelGroup.children.length && (rest > 0 || (zoomRatio >= 1 && this.shownIds.has(id))))
        ) {
          const shapeIdsToShow = lodVisibleShapeIds.concat(autoVisibleShapeIds);
          if (shapeIdsToShow.length) {
            graph.showItem(id, {
              shapeIds: lodVisibleShapeIds.concat(autoVisibleShapeIds),
              disableAnimate,
            });
          }
          if (this.labelPositionDirty.has(id)) {
            item.updateLabelPosition(disableLod);
            this.labelPositionDirty.delete(id);
          }
          shownIds.set(id, 1);
          rest--;
        } else {
          if (lodVisibleShapeIds.includes('labelShape') && this.labelPositionDirty.has(id)) {
            item.updateLabelPosition(disableLod);
            this.labelPositionDirty.delete(id);
          }
          lodVisibleShapeIds.length &&
            graph.showItem(id, {
              shapeIds: lodVisibleShapeIds,
              disableAnimate,
            });
          if (!disableLod && autoVisibleShapeIds.length) {
            graph.hideItem(id, {
              shapeIds: autoVisibleShapeIds,
              disableAnimate,
            });
          }
        }
      });
    });
    if (!disableLod) {
      lodInvisibleIds.forEach((shapeIds, id) => {
        shapeIds.length && graph.hideItem(id, { shapeIds, disableAnimate });
      });
    }
    this.shownIds = shownIds;
  };

  private debounceUpdateVisible = this.getDebounceFn(this.updateVisible.bind(this));

  private updateLabelPositions = throttle(
    (zoomRatio) => {
      const { graph, options } = this;
      const { inView, newlyOutView, newlyInView } = this.groupItemsByView(zoomRatio);
      const graphZoom = graph.getZoom();
      const levelCache = {};
      this.labelPositionDirty.clear();

      // 1. inside current view &&
      // 2. lod is number and matches the current zoom ratio
      // 3. lod is 'auto' and filtered by cells)
      // 1 && (2 || 3)
      inView.forEach((model) => {
        this.labelPositionDirty.set(model.id, true);
        const item = graph.itemController.itemMap.get(model.id);
        if (
          !item ||
          !item.labelGroup.children.length ||
          !item.shapeMap.labelShape ||
          (!options?.disableLod &&
            (item.labelGroup.style.visibility === 'hidden' || item.shapeMap.labelShape.style.visibility === 'hidden'))
        ) {
          return;
        }
        const displayModel = this.getDisplayModel(model.id);
        const { labelShape, lodLevels } = displayModel.data;
        if (!labelShape) return;
        const updatePosition = () => {
          // adjust labels'positions for visible items
          item.updateLabelPosition(options?.disableLod);
          this.labelPositionDirty.delete(model.id);
        };
        const { visible, lod } = labelShape;
        if (visible === false) return;
        if (lod === undefined) {
          updatePosition();
          return;
        }
        if (lod === 'auto') {
          updatePosition();
          return;
        }
        if (typeof lod !== 'number' || item.animations?.length) {
          // lod is 'auto' / lod is not defined / during animating
          updatePosition();
          return;
        }
        const lodLevelsEmpty = isEmptyObj(lodLevels);
        if (lodLevelsEmpty) {
          updatePosition();
          return;
        }
        const levelsKey = JSON.stringify(lodLevels);
        const currentZoomLevel =
          levelCache[levelsKey] || lodLevelsEmpty ? 0 : getZoomLevel(lodLevels as any, graphZoom);
        levelCache[levelsKey] = currentZoomLevel;
        if (lod <= currentZoomLevel) {
          // lod visible
          updatePosition();
        }
      });
      newlyOutView.forEach((model) => {
        graph.hideItem(model.id, {
          shapeIds: ['labelShape', 'labelBackgroundShape'],
          disableAnimate: true,
        });
      });
      if (options?.disableLod) {
        newlyInView.forEach((model) => {
          graph.showItem(model.id, {
            shapeIds: ['labelShape', 'labelBackgroundShape'],
            disableAnimate: true,
          });
        });
      }
    },
    16,
    {
      leading: true,
      trailing: true,
    },
  );

  /**
   * get the items inside viewport
   * @param ratio
   * @returns
   */
  private groupItemsByView = (ratio: number = 1) => {
    const { graph } = this;
    const range = graph.getCanvasRange();
    const models = graph.getAllNodesData().concat(graph.getAllEdgesData());
    let { inView, outView } = this.cacheViewModels || {};
    if (this.canvasCellDirty) this.updateCanvasCells();
    const canvasCellRowRange = [
      Math.floor(range.min[0] / this.canvasCellSize),
      Math.ceil(range.max[0] / this.canvasCellSize),
    ];
    const canvasCellColRange = [
      Math.floor(range.min[1] / this.canvasCellSize),
      Math.ceil(range.max[1] / this.canvasCellSize),
    ];
    const atBoundary = (rowIdx, colIdx) => {
      if (
        rowIdx > canvasCellRowRange[0] &&
        rowIdx < canvasCellRowRange[1] &&
        (Math.abs(colIdx - canvasCellColRange[0]) < 2 || Math.abs(colIdx - canvasCellColRange[1]) < 2)
      ) {
        return true;
      } else if (
        colIdx > canvasCellColRange[0] &&
        colIdx < canvasCellColRange[1] &&
        (Math.abs(rowIdx - canvasCellRowRange[0]) < 2 || Math.abs(rowIdx - canvasCellRowRange[1]) < 2)
      ) {
        return true;
      }
      return false;
    };
    const outBoundary = (rowIdx, colIdx) => {
      return (
        rowIdx <= canvasCellRowRange[0] ||
        rowIdx >= canvasCellRowRange[1] ||
        colIdx <= canvasCellColRange[0] ||
        colIdx >= canvasCellColRange[1]
      );
    };
    const newlyOutView = [];
    const newlyInView = [];
    const cacheIsEmpty = !this.cacheViewModels || (!inView.length && !outView.length);
    if (!ratio || ratio === 1 || cacheIsEmpty) {
      const previousOutView = new Map();
      const previousInView = new Map();
      outView?.forEach((model) => previousOutView.set(model.id, true));
      inView?.forEach((model) => previousInView.set(model.id, true));
      inView = [];
      outView = [];
      models.forEach((model) => {
        if (!this.modelCanvasIdxMap.get(model.id)) {
          outView.push(model);
          if (!previousOutView.has(model.id)) newlyOutView.push(model);
          return;
        }
        const { rowIdx, colIdx } = this.modelCanvasIdxMap.get(model.id);
        if (atBoundary(rowIdx, colIdx)) {
          const renderBounds = this.getRenderBBox(model.id);
          if (!renderBounds) return;
          if (intersectBBox(renderBounds, range)) {
            inView.push(model);
            if (!previousInView.has(model.id)) newlyInView.push(model);
          } else {
            outView.push(model);
            if (!previousOutView.has(model.id)) newlyOutView.push(model);
          }
        } else if (outBoundary(rowIdx, colIdx)) {
          outView.push(model);
          if (!previousOutView.has(model.id)) newlyOutView.push(model);
        } else {
          inView.push(model);
          if (!previousInView.has(model.id)) newlyInView.push(model);
        }
      });
    } else if (ratio < 1) {
      // zoom-out
      const outViewNew = [];
      outView.forEach((model) => {
        if (!this.modelCanvasIdxMap.get(model.id)) {
          outViewNew.push(model);
          return;
        }
        const { rowIdx, colIdx } = this.modelCanvasIdxMap.get(model.id);
        if (atBoundary(rowIdx, colIdx)) {
          const renderBounds = this.getRenderBBox(model.id);
          if (!renderBounds) return;
          if (intersectBBox(renderBounds, range)) {
            inView.push(model);
            newlyInView.push(model);
          } else {
            outViewNew.push(model);
          }
        } else if (outBoundary(rowIdx, colIdx)) {
          outViewNew.push(model);
        } else {
          inView.push(model);
          newlyInView.push(model);
        }
      });
      outView = outViewNew;
    } else if (ratio > 1) {
      // zoom-in
      const inViewNew = [];
      inView.forEach((model) => {
        if (!this.modelCanvasIdxMap.get(model.id)) {
          outView.push(model);
          newlyOutView.push(model);
          return;
        }
        const { rowIdx, colIdx } = this.modelCanvasIdxMap.get(model.id);
        if (atBoundary(rowIdx, colIdx)) {
          const renderBounds = this.getRenderBBox(model.id);
          if (!renderBounds) return;
          if (!intersectBBox(renderBounds, range)) {
            outView.push(model);
            newlyOutView.push(model);
          } else {
            inViewNew.push(model);
          }
        } else if (outBoundary(rowIdx, colIdx)) {
          outView.push(model);
          newlyOutView.push(model);
        } else {
          inViewNew.push(model);
        }
      });
      inView = inViewNew;
    }
    this.cacheViewModels = { inView, outView, newlyOutView, newlyInView };
    return this.cacheViewModels;
  };

  private updateCanvasCells = () => {
    const canvasCells = new Map();
    const idxMap = new Map();
    const { graph, canvasCellSize } = this;
    graph.getAllNodesData().forEach((model) => {
      const { x, y } = model.data;
      const rowIdx = Math.floor(x / canvasCellSize);
      const colIdx = Math.floor(y / canvasCellSize);
      const cellIdx = `${rowIdx}-${colIdx}`;
      const cell = canvasCells.get(cellIdx) || [];
      cell.push(model.id);
      canvasCells.set(cellIdx, cell);
      idxMap.set(model.id, { rowIdx, colIdx });
    });
    graph.getAllEdgesData().forEach((model) => {
      const { source, target } = model;
      const { rowIdx: sourceRowIdx, colIdx: sourceColIdx } = idxMap.get(source);
      const { rowIdx: targetRowIdx, colIdx: targetColIdx } = idxMap.get(target);
      const centerRowIdx = Math.round((sourceRowIdx + targetRowIdx) / 2);
      const centerColIdx = Math.round((sourceColIdx + targetColIdx) / 2);
      const cellIdx = `${centerRowIdx}-${centerColIdx}`;
      const cell = canvasCells.get(cellIdx) || [];
      cell.push(model.id);
      canvasCells.set(cellIdx, cell);
      idxMap.set(model.id, { rowIdx: centerRowIdx, colIdx: centerColIdx });
    });
    this.modelCanvasIdxMap = idxMap;
    this.canvasCellDirty = false;
  };

  protected updateCacheModels = (params) => {
    const { models, action } = params;
    this.canvasCellDirty = true;
    models?.forEach((model) => {
      this.renderBoundsCache.delete(model.id);
      if (action !== 'updatePosition') {
        this.displayModelCache.delete(model.id);
      }
      if (this.options?.disableLod) {
        this.graph.showItem(model.id, {
          shapeIds: ['labelShape', 'labelBackgroundShape'],
          disableAnimate: true,
        });
      }
    });
  };

  protected beforeViewportAnimation = () => {
    if (this.animationUpdateTimer) return;
    this.animationUpdateTimer = window.setInterval(() => {
      this.updateLabelPositions();
    }, 16);
  };

  protected afterViewportAnimation = () => {
    if (this.animationUpdateTimer) {
      clearInterval(this.animationUpdateTimer);
      this.animationUpdateTimer = 0;
    }
  };

  protected clearCache = () => {
    this.displayModelCache.clear();
    this.renderBoundsCache.clear();
    this.cacheViewModels = {
      inView: [],
      outView: [],
      newlyOutView: [],
      newlyInView: [],
    };
  };
  private getDisplayModel = (id) => {
    let displayModel = this.displayModelCache.get(id);
    if (!displayModel) {
      displayModel = this.graph.getDisplayModel(id);
      this.displayModelCache.set(id, displayModel);
    }
    return displayModel;
  };
  private getRenderBBox = (id) => {
    let renderBounds;
    if (!this.renderBoundsCache.has(id)) {
      renderBounds = this.graph.getRenderBBox(id, true);
      this.renderBoundsCache.set(id, renderBounds);
    } else {
      renderBounds = this.renderBoundsCache.get(id);
    }
    return renderBounds;
  };

  public destroy() {
    super.destroy();
  }
}

const isEmptyObj = (obj) => {
  if (!obj) return true;
  return !Object.keys(obj).length;
};
