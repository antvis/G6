// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import FileSystem from './component/file-system';
import FlowTree from './component/flow-tree'
import TreeData from './component/tree-data';

export default { title: 'Tree' };

storiesOf('Tree', module)
  .add('indented tree file system', () => <FileSystem />)
  .add('flow-tree', () => <FlowTree />)
  .add('tree-data', () => <TreeData />)
