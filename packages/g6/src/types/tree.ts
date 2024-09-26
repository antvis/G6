export type TreeData = {
  id: string;
  children?: TreeData[];
  depth?: number;
  [key: string]: any;
};
