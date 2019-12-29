import testData from './test-data-1';

export interface TestNode {
  id: string;
  [key: string]: any;
}

interface TestEdge {
  id: string;
  source: string;
  target: string;
  [key: string]: any;
}

interface TestData {
  nodes: TestNode[];
  edges: TestEdge[];
}

const typeData: TestData = testData;

export default typeData;
