export type CardID = number | string;

export type EditPosition = 'title' | 'content';

export type AnnotationData = Array<{
  id: CardID;
  x?: number;
  y?: number;
  collapsed?: boolean;
  title?: string;
  content?: string;
  visible?: boolean;
}>;
