import type { IDocNodeParameters } from '@microsoft/tsdoc';
import { DocNode, DocSection } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

type ContainerStatus = 'info' | 'success' | 'warning' | 'error';
/**
 * Constructor parameters for {@link DocContainer}.
 */
export interface IDocContainerParameters extends IDocNodeParameters {
  status?: ContainerStatus;
  title?: string;
}

/**
 * Represents a note box, which is typically displayed as a bordered box containing informational text.
 */
export class DocContainer extends DocNode {
  public readonly content: DocSection;
  public readonly status: 'info' | 'success' | 'warning' | 'error';
  public readonly title: string | undefined;

  public constructor(parameters: IDocContainerParameters, sectionChildNodes?: ReadonlyArray<DocNode>) {
    super(parameters);
    this.content = new DocSection({ configuration: this.configuration }, sectionChildNodes);
    this.status = parameters.status || 'info';
    this.title = parameters.title;
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.Container;
  }

  /** @override */
  protected onGetChildNodes(): ReadonlyArray<DocNode | undefined> {
    return [this.content];
  }
}
