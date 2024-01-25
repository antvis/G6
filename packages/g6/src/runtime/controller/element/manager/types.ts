import type { ComboData, EdgeData, NodeData } from '../../../../spec/data';
import type { ComboOptions, EdgeOptions, NodeOptions } from '../../../../spec/element';
import type { StaticComboOptions } from '../../../../spec/element/combo';
import type { StaticEdgeOptions } from '../../../../spec/element/edge';
import type { StaticNodeOptions } from '../../../../spec/element/node';

export type ElementDatum = NodeData | EdgeData | ComboData;

export type ElementData = NodeData[] | EdgeData[] | ComboData[];

export type ElementOptions = NodeOptions | EdgeOptions | ComboOptions;

export type StaticElementOptions = StaticNodeOptions | StaticEdgeOptions | StaticComboOptions;
