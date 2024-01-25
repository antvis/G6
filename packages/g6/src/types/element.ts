import type { BaseElement } from '../plugin/element/base';

export type ElementRegistry = Record<string, { new (options: any): BaseElement<any> }>;
