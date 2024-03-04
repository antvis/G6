export type TreeData = {
  id: string;
  children?: TreeData[];
  [key: string]: any;
};
