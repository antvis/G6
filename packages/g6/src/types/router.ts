import type { Padding } from './padding';
import type { CardinalPlacement } from './placement';
import { Point } from './point';

export type Direction = CardinalPlacement;

export type PolylineRouter = false | OrthRouter | ShortestPathRouter;

export interface OrthRouter extends OrthRouterOptions {
  /**
   * <zh/> 正交路由，通过在路径上添加额外的控制点，使得边的每一段都保持水平或垂直
   *
   * <en/> Orthogonal routing that adds additional control points on the path to ensure each segment of the edge horizontal or vertical
   * @remarks
   * <zh/> 采用基于节点的相对位置和专家经验得出的寻径算法来模糊计算控制点，非最优解但计算速度快。该路由支持 `controlPoints` 来作为额外的控制点，但不支持自动避障。
   *
   * <en/> It uses a pathfinding algorithm based on the relative position of the nodes and expert experience to calculate the control points, which is not the optimal solution but is fast to calculate. This routing supports `controlPoints` as additional control points, but does not support automatic obstacle avoidance.
   */
  type: 'orth';
}

export interface ShortestPathRouter extends ShortestPathRouterOptions {
  /**
   * <zh/> 最短路径路由，是正交路由 `'orth'` 的智能版本。该路由由水平或垂直的正交线段组成。采用 A* 算法计算最短路径，并支持自动避开路径上的其他节点（障碍）
   *
   * <en/> The shortest path routing is an intelligent version of the orthogonal routing `'orth'`. The routing consists of horizontal or vertical orthogonal line segments. It uses the A* algorithm to calculate the shortest path and supports automatic avoidance of other nodes (obstacles) on the path.
   */
  type: 'shortest-path';
}

export type RouterOptions = OrthRouterOptions | ShortestPathRouterOptions;

export interface OrthRouterOptions {
  /**
   * <zh/> 指定节点连接点与转角的最小距离
   *
   * <en/> The minimum distance between the node connection point and the corner
   */
  padding?: Padding;
}

export interface ShortestPathRouterOptions {
  /**
   * <zh/> 节点锚点与转角的最小距离
   *
   * <en/> The minimum distance between the node anchor point and the corner
   */
  offset?: Padding;
  /**
   * <zh/> grid 格子大小
   *
   * <en/> grid size
   */
  gridSize?: number;
  /**
   * <zh/> 支持的最大旋转角度（弧度）
   *
   * <en/> Maximum allowable rotation angle (radian)
   */
  maxAllowedDirectionChange?: number;
  /**
   * <zh/> 节点的可能起始方向
   *
   * <en/> Possible starting directions from a node
   */
  startDirections?: Direction[];
  /**
   * <zh/> 节点的可能结束方向
   *
   * <en/> Possible ending directions from a node
   */
  endDirections?: Direction[];
  /**
   * <zh/> 指定可移动的方向
   *
   * <en/> Allowed edge directions
   */
  directionMap?: {
    [key in Direction]: { stepX: number; stepY: number };
  };
  /**
   * <zh/> 表示在路径搜索过程中某些路径的额外代价。key 为弧度值，value 为代价
   *
   * <en/> Penalties for direction changes. Key is the radian value, value is the penalty
   */
  penalties?: {
    [key: string]: number;
  };
  /**
   * <zh/> 指定计算两点之间距离的函数
   *
   * <en/> Function to calculate the distance between two points
   */
  distFunc?: (p1: Point, p2: Point) => number;
  /**
   * <zh/> 最大迭代次数
   *
   * <en/> Maximum loops
   */
  maximumLoops?: number;
  /**
   * <zh/> 是否开启避障
   *
   * <en/> Whether to enable obstacle avoidance while computing the path
   */
  enableObstacleAvoidance?: boolean;
}
