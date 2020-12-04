import testData from './test-data-1';
import comboTestData from './combo-test-data';

export interface TestNode {
  id: string;
  comboId?: string;
  [key: string]: any;
}

interface TestEdge {
  id?: string;
  source: string;
  target: string;
  [key: string]: any;
}

interface TestCombo {
  id: string;
  parentId?: string;
  [key: string]: any;
}

interface TestData {
  nodes: TestNode[];
  edges: TestEdge[];
  combos?: TestCombo[];
}

const typeData: TestData = testData;
const comboData: TestData = comboTestData;

export default {
  data: typeData,
  comboData,
};
