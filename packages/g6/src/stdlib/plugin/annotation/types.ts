export type EditPosition = 'title' | 'content'

export type AnnotationData = Array<{
    id: string;
    x?: number;
    y?: number;
    collapsed?: boolean;
    title?: string;
    content?: string;
    visible?: boolean;
}>