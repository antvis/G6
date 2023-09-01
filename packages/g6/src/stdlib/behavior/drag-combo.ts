import { ID } from '@antv/graphlib';
import { debounce, throttle, uniq } from '@antv/util';
import { ComboModel, EdgeModel, NodeModel } from '../../types';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';
import { Point } from '../../types/common';
import { graphComboTreeDfs } from '../../util/data';

const DELEGATE_SHAPE_ID = 'g6-drag-combo-delegate-shape';

export interface DragComboOptions {
  /**
   * Whether to draw dragging nodes in transient layer.
   * Ignored when enableDelegate is true.
   * Defaults to true.
   */
  enableTransient?: boolean;
  /**
   * Whether to use a virtual rect moved with the dragging mouse instead of the node.
   * Defaults to false.
   */
  enableDelegate?: boolean;
  /**
   * The drawing properties when the nodes are dragged.
   * Only used when enableDelegate is true.
   */
  delegateStyle?: {
    fill?: string;
    stroke?: string;
    fillOpacity?: number;
    strokeOpacity?: number;
    lineWidth?: number;
    lineDash?: [number, number];
    [key: string]: unknown;
  };
  /**
   * The time in milliseconds to throttle moving. Useful to avoid the frequent calculation.
   * Defaults to 0.
   */
  throttle?: number;
  /**
   * Whether to hide the related edges to avoid calculation while dragging nodes.
   * Ignored when enableTransient or enableDelegate is true.
   * Defaults to false.
   */
  hideRelatedEdges?: boolean;
  /**
   * The state name to be considered as "selected".
   * Defaults to "selected".
   */
  selectedState?: string;
  /**
   * The event name to trigger when drag end.
   */
  eventName?: string;
  /**
   * Whether change the combo hierarchy structure or only change size.
   */
  updateComboStructure?: boolean;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: Required<DragComboOptions> = {
  enableTransient: true,
  enableDelegate: false,
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [5, 5],
  },
  throttle: 16,
  hideRelatedEdges: false,
  selectedState: 'selected',
  eventName: '',
  updateComboStructure: true,
  shouldBegin: () => true,
};

type Position = {
  id: ID;
  x: number;
  y: number;
  // The following fields only have values when delegate is enabled.
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
};

export class DragCombo extends Behavior {
  // Private states
  private hiddenEdges: EdgeModel[] = [];
  private hiddenComboTreeRoots: (ComboModel | NodeModel)[] = [];
  private originX: number;
  private originY: number;
  private previousX: number;
  private previousY: number;
  private originPositions: Array<Position> = [];
  private selectedComboIds: ID[];
  private pointerDown: Point | undefined = undefined;
  private dragging = false;

  constructor(options: Partial<DragComboOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    if (finalOptions.enableDelegate) {
      finalOptions.enableTransient = false;
    }
    if (finalOptions.enableDelegate || finalOptions.enableTransient) {
      finalOptions.hideRelatedEdges = false;
    }
    super(finalOptions);
  }

  getEvents = () => {
    const events = {
      'combo:pointerdown': this.onPointerDown,
      pointermove: this.onPointerMove,
      click: this.onPointerUp,
      // FIXME: IG6Event -> keyboard event
      keydown: this.onKeydown as any,
    };
    if (this.options.updateComboStructure) {
      return {
        'node:drop': this.onDropNode,
        'combo:drop': this.onDropCombo,
        'canvas:drop': this.onDropCanvas,
        ...events,
      };
    } else {
      return {
        pointerup: this.onPointerUp,
        ...events,
      };
    }
  };

  /** Given selected node ids, get their related visible edges. */
  private getRelatedEdges(
    selectedComboIds: ID[],
    comboTreeRoots: (ComboModel | NodeModel)[],
  ) {
    let edges = selectedComboIds.flatMap((comboId) =>
      this.graph.getRelatedEdgesData(comboId),
    );
    graphComboTreeDfs(this.graph, comboTreeRoots, (child) => {
      edges = edges.concat(this.graph.getRelatedEdgesData(child.id));
    });
    return uniq(edges).filter((edgeData) => {
      return this.graph.getItemVisible(edgeData.id);
    });
  }

  private getComboTreeItems(selectedComboIds: ID[]) {
    let begins = [];
    if (!this.options.updateComboStructure) {
      // do not change the combo structure, begins are the roots
      selectedComboIds.forEach((id) => {
        const comboData = this.graph.getComboData(id);
        let rootAncestor = comboData;
        let parentId = comboData.data.parentId;
        while (parentId) {
          const parentData = this.graph.getComboData(parentId);
          if (!parentData) break;
          parentId = parentData.data.parentId;
          rootAncestor = parentData;
        }
        begins.push(rootAncestor);
      });
    } else {
      begins = selectedComboIds.map((id) => this.graph.getComboData(id));
    }

    const items = begins;
    graphComboTreeDfs(this.graph, begins, (child) => items.push(child), 'TB');
    return uniq(items).filter(
      (item) =>
        !selectedComboIds.includes(item.id) &&
        this.graph.getItemVisible(item.id),
    );
  }

  public onPointerDown(event: IG6GraphEvent) {
    if (!this.options.shouldBegin(event)) return;
    this.pointerDown = { x: event.canvas.x, y: event.canvas.y };
    this.dragging = false;
  }

  public onPointerMove(event: IG6GraphEvent) {
    if (!this.pointerDown) return;

    const beginDeltaX = Math.abs(this.pointerDown.x - event.canvas.x);
    const beginDeltaY = Math.abs(this.pointerDown.y - event.canvas.y);
    if (beginDeltaX < 1 && beginDeltaY < 1) return;

    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';

    if (this.dragging) {
      this.originPositions = this.selectedComboIds
        .map((id) => {
          if (!this.graph.getComboData(id)) {
            console.warn('combo does not exist', id);
            return;
          }
          const bounds = this.graph.getRenderBBox(id, true, enableTransient);
          if (!bounds) return;
          const [x, y] = bounds.center;
          // If delegate is enabled, record bbox together.
          if (this.options.enableDelegate) {
            const [minX, minY] = bounds.min;
            const [maxX, maxY] = bounds.max;
            return { id, x, y, minX, minY, maxX, maxY };
          }
          return { id, x, y };
        })
        .filter(Boolean);
    }

    // pointerDown + first move = dragstart
    if (!this.dragging) {
      this.dragging = true;

      const currentComboId = event.itemId;
      let selectedComboIds = this.graph.findIdByState(
        'combo',
        this.options.selectedState,
        true,
      );

      // If current node is selected, drag all the selected nodes together.
      // Otherwise drag current node.
      if (
        currentComboId &&
        event.itemType === 'combo' &&
        !selectedComboIds.includes(currentComboId)
      ) {
        selectedComboIds = [currentComboId];
      }
      this.selectedComboIds = selectedComboIds;

      // Hide related edge.
      if (this.options.hideRelatedEdges && !enableTransient) {
        this.hiddenComboTreeRoots = this.getComboTreeItems(selectedComboIds);
        this.hiddenEdges = this.getRelatedEdges(
          selectedComboIds,
          this.hiddenComboTreeRoots,
        );
        this.graph.executeWithoutStacking(() => {
          this.graph.hideItem(
            this.hiddenEdges.map((edge) => edge.id),
            true,
          );
          this.graph.hideItem(
            this.hiddenComboTreeRoots.map((child) => child.id),
            true,
          );
        });
      }

      // Draw transient nodes and edges.
      if (enableTransient) {
        // Draw transient edges and nodes.
        this.hiddenComboTreeRoots = this.getComboTreeItems(selectedComboIds);
        this.hiddenEdges = this.getRelatedEdges(
          selectedComboIds,
          this.hiddenComboTreeRoots,
        );
        selectedComboIds.forEach((comboId) => {
          this.graph.drawTransient('combo', comboId, {
            upsertAncestors: !this.options.updateComboStructure,
          });
        });
        this.hiddenEdges.forEach((edge) => {
          this.graph.drawTransient('edge', edge.id, {});
        });

        // Hide original edges and nodes. They will be restored when pointerup.
        this.graph.executeWithoutStacking(() => {
          this.graph.hideItem(selectedComboIds, true);
          this.graph.hideItem(
            this.hiddenEdges.map((edge) => edge.id),
            true,
          );
          this.graph.hideItem(
            this.hiddenComboTreeRoots.map((child) => child.id),
            true,
          );
        });
      } else {
        this.graph.frontItem(selectedComboIds);
      }

      // Throttle moving.
      if (this.options.throttle > 0) {
        this.throttledMoveCombos = throttle(
          this.moveCombos,
          this.options.throttle,
          { leading: true, trailing: true },
        );
      } else {
        this.throttledMoveCombos = this.moveCombos;
      }

      this.originX = event.canvas.x;
      this.originY = event.canvas.y;
      this.previousX = event.canvas.x;
      this.previousY = event.canvas.y;
    }

    if (!this.originPositions.length || !this.dragging) {
      return;
    }

    // @ts-ignore FIXME: type
    const pointerEvent = event as PointerEvent;
    // @ts-ignore FIXME: Type
    const deltaX = pointerEvent.canvas.x - this.previousX;
    // @ts-ignore FIXME: Type
    const deltaY = pointerEvent.canvas.y - this.previousY;

    if (this.options.enableDelegate) {
      this.moveDelegate(deltaX, deltaY);
    } else {
      const enableTransient =
        this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
      this.throttledMoveCombos(
        deltaX,
        deltaY,
        enableTransient,
        !this.options.updateComboStructure,
      );
    }
  }

  public moveCombos(
    deltaX: number,
    deltaY: number,
    transient: boolean,
    upsertAncestors = true,
    callback?: (positions: Position[]) => void,
  ) {
    if (transient) {
      // Move transient nodes
      this.originPositions.forEach(({ id, x, y }) => {
        this.graph.drawTransient('combo', id, {
          data: {
            x: x + deltaX,
            y: y + deltaY,
          },
          upsertAncestors,
        });
      });
      // Update transient edges.
      this.hiddenEdges.forEach((edge) => {
        this.graph.drawTransient('edge', edge.id, {});
      });
    } else {
      const positions = [...this.originPositions];
      this.graph.moveCombo(
        this.originPositions.map(({ id }) => id),
        deltaX,
        deltaY,
        upsertAncestors,
        () => callback?.(positions),
      );
    }

    this.previousX += deltaX;
    this.previousY += deltaY;
  }

  public throttledMoveCombos: Function = (
    deltaX: number,
    deltaY: number,
    transient: boolean,
    upsertAncestors = true,
  ) => {
    // Should be overrided when drag start.
  };

  public moveDelegate(deltaX: number, deltaY: number) {
    const x1 = Math.min(
      ...this.originPositions.map((position) => position.minX),
    );
    const y1 = Math.min(
      ...this.originPositions.map((position) => position.minY),
    );
    const x2 = Math.max(
      ...this.originPositions.map((position) => position.maxX),
    );
    const y2 = Math.max(
      ...this.originPositions.map((position) => position.maxY),
    );
    this.graph.drawTransient('rect', DELEGATE_SHAPE_ID, {
      style: {
        x: x1 + deltaX,
        y: y1 + deltaY,
        width: x2 - x1,
        height: y2 - y1,
        ...this.options.delegateStyle,
      },
    });
  }

  public clearDelegate() {
    this.graph.drawTransient('rect', DELEGATE_SHAPE_ID, { action: 'remove' });
  }

  public clearTransientItems() {
    this.hiddenEdges.forEach((edge) => {
      this.graph.drawTransient('combo', edge.source, { action: 'remove' });
      this.graph.drawTransient('combo', edge.target, { action: 'remove' });
      this.graph.drawTransient('edge', edge.id, { action: 'remove' });
    });
    this.hiddenComboTreeRoots.forEach((item) => {
      const isCombo = item.data._isCombo;
      this.graph.drawTransient(isCombo ? 'combo' : 'node', item.id, {
        action: 'remove',
      });
    });
    this.originPositions.forEach(({ id }) => {
      this.graph.drawTransient('combo', id, { action: 'remove' });
    });
  }

  public restoreHiddenItems(positions?: Position[]) {
    this.graph.pauseStacking();
    if (this.hiddenEdges.length) {
      this.graph.showItem(
        this.hiddenEdges.map((edge) => edge.id),
        true,
      );
      this.hiddenEdges = [];
    }
    if (this.hiddenComboTreeRoots.length) {
      this.graph.showItem(
        this.hiddenComboTreeRoots.map((model) => model.id),
        true,
      );
      this.hiddenComboTreeRoots = [];
    }
    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
    if (enableTransient) {
      this.graph.showItem(
        this.originPositions.concat(positions).map((position) => position.id),
        true,
      );
    }
    this.graph.resumeStacking();
  }

  public onPointerUp(event: IG6GraphEvent) {
    this.pointerDown = undefined;
    this.dragging = false;
    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
    // If transient or delegate was enabled, move the real nodes.
    // if (enableTransient || this.options.enableDelegate) {
    // @ts-ignore FIXME: type
    const pointerEvent = event as PointerEvent;
    const baseX = enableTransient ? this.originX : this.previousX;
    const baseY = enableTransient ? this.originY : this.previousY;
    // @ts-ignore FIXME: Type
    const deltaX = pointerEvent.canvas.x - baseX + 0.01;
    // @ts-ignore FIXME: Type
    const deltaY = pointerEvent.canvas.y - baseY + 0.01;
    this.moveCombos(
      deltaX,
      deltaY,
      false,
      true,
      debounce(
        (positions) => {
          // restore the hidden items after move real combos done
          if (enableTransient) {
            this.clearTransientItems();
          }

          if (this.options.enableDelegate) {
            this.clearDelegate();
          }

          // Restore all hidden items.
          // For all hideRelatedEdges, enableTransient and enableDelegate cases.
          this.restoreHiddenItems(positions);
          // Emit event.
          if (this.options.eventName) {
            this.graph.emit(this.options.eventName, {
              itemIds: positions.map((position) => position.id),
            });
          }

          // Reset state.
          this.originPositions = [];
        },
        16,
        false,
      ),
    );
  }

  public onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' && event.key !== 'Esc') {
      return;
    }
    this.clearDelegate();
    this.clearTransientItems();
    this.restoreHiddenItems();

    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
    // Restore node positions.
    if (!enableTransient && !this.options.enableDelegate) {
      const positionChanges = this.originPositions.map(({ id, x, y }) => {
        return { id, data: { x, y } };
      });
      this.graph.updateComboPosition(positionChanges);
    }

    this.originPositions = [];
  }

  public onDropNode(event: IG6GraphEvent) {
    const elements = this.graph.canvas.document.elementsFromPointSync(
      event.canvas.x,
      event.canvas.y,
    );
    const draggingIds = this.originPositions.map(({ id }) => id);
    const currentIds = elements
      // @ts-ignore TODO: G type
      .map((ele) => ele.parentNode.getAttribute?.('data-item-id'))
      .filter((id) => id !== undefined && !draggingIds.includes(id));
    // the top item which is not in draggingIds
    const dropId = currentIds.find(
      (id) => this.graph.getComboData(id) || this.graph.getNodeData(id),
    );
    // drop on a node A, move the dragged node to the same parent of A
    const newParentId = this.graph.getNodeData(dropId)
      ? this.graph.getNodeData(dropId).data.parentId
      : dropId;

    this.originPositions.forEach(({ id }) => {
      const model = this.graph.getComboData(id);
      if (!model) return;
      const { parentId } = model.data;
      // if the parents are same, do nothing
      if (parentId === newParentId) return;

      // update data to change the structure
      // if newParentId is undefined, new parent is the canvas
      this.graph.updateData('node', { id, data: { parentId: newParentId } });
    });
    this.onPointerUp(event);
  }

  public onDropCombo(event: IG6GraphEvent) {
    const newParentId = event.itemId;
    this.graph.startBatch();
    this.originPositions.forEach(({ id }) => {
      const model = this.graph.getComboData(id);
      if (!model || model.id === newParentId) return;
      const { parentId } = model.data;
      if (parentId === newParentId) return;
      // event.stopPropagation();
      this.graph.updateData('combo', { id, data: { parentId: newParentId } });
    });
    this.graph.stopBatch();
    this.onPointerUp(event);
  }

  public onDropCanvas(event: IG6GraphEvent) {
    this.graph.startBatch();
    this.originPositions.forEach(({ id }) => {
      const model = this.graph.getComboData(id);
      if (!model) return;
      const { parentId } = model.data;
      if (!parentId) return;
      this.graph.updateData('combo', { id, data: { parentId: undefined } });
    });
    this.graph.stopBatch();
    this.onPointerUp(event);
  }
}
