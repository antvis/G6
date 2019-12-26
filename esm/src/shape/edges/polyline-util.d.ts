import { BBox } from '@antv/g-canvas/lib/types';
import { IShapeBase } from '@g6/types';
interface PolyPoint {
    x: number;
    y: number;
    id?: string;
}
export declare const getBBoxFromPoint: (point: PolyPoint) => BBox;
export declare const getBBoxFromPoints: (points?: PolyPoint[]) => BBox;
export declare const isBBoxesOverlapping: (b1: BBox, b2: BBox) => boolean;
export declare const filterConnectPoints: (points: PolyPoint[]) => PolyPoint[];
export declare const simplifyPolyline: (points: PolyPoint[]) => PolyPoint[];
export declare const getSimplePolyline: (sPoint: PolyPoint, tPoint: PolyPoint) => PolyPoint[];
export declare const getExpandedBBox: (bbox: any, offset: number) => BBox;
export declare const isHorizontalPort: (port: PolyPoint, bbox: BBox) => boolean;
export declare const getExpandedBBoxPoint: (bbox: any, point: PolyPoint) => PolyPoint;
/**
 *
 * @param b1
 * @param b2
 */
export declare const mergeBBox: (b1: BBox, b2: BBox) => BBox;
export declare const getPointsFromBBox: (bbox: BBox) => PolyPoint[];
export declare const isPointOutsideBBox: (point: PolyPoint, bbox: BBox) => boolean;
export declare const getBBoxXCrossPoints: (bbox: BBox, x: number) => PolyPoint[];
export declare const getBBoxYCrossPoints: (bbox: BBox, y: number) => PolyPoint[];
export declare const getBBoxCrossPointsByPoint: (bbox: BBox, point: PolyPoint) => PolyPoint[];
export declare const distance: (p1: PolyPoint, p2: PolyPoint) => number;
export declare const _costByPoints: (p: PolyPoint, points: PolyPoint[]) => number;
export declare const heuristicCostEstimate: (p: PolyPoint, ps: PolyPoint, pt: PolyPoint, source?: PolyPoint, target?: PolyPoint) => number;
export declare const reconstructPath: (pathPoints: PolyPoint[], pointById: any, cameFrom: any, currentId: any, iterator?: number) => void;
export declare const removeFrom: (arr: PolyPoint[], item: PolyPoint) => void;
export declare const isSegmentsIntersected: (p0: PolyPoint, p1: PolyPoint, p2: PolyPoint, p3: PolyPoint) => boolean;
export declare const isSegmentCrossingBBox: (p1: PolyPoint, p2: PolyPoint, bbox: BBox) => boolean;
export declare const getNeighborPoints: (points: PolyPoint[], point: PolyPoint, bbox1: any, bbox2: any) => PolyPoint[];
export declare const pathFinder: (points: PolyPoint[], start: PolyPoint, goal: any, sBBox: any, tBBox: any, os: any, ot: any) => PolyPoint[];
export declare const isBending: (p0: PolyPoint, p1: PolyPoint, p2: PolyPoint) => boolean;
export declare const getBorderRadiusPoints: (p0: PolyPoint, p1: PolyPoint, p2: PolyPoint, r: number) => PolyPoint[];
export declare const getPathWithBorderRadiusByPolyline: (points: PolyPoint[], borderRadius: number) => string;
export declare const getPolylinePoints: (start: PolyPoint, end: PolyPoint, sNode: IShapeBase, tNode: IShapeBase, offset: number) => PolyPoint[];
export {};
