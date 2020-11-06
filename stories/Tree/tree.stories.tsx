// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import FlowTree from './component/flow-tree';
import TreeData from './component/tree-data';
import SlefTree from './component/self-tree';
import FlowComponent from './component/flow-component';

export default { title: 'Tree' };

storiesOf('Tree', module)
  .add('flow-tree', () => <FlowTree />)
  .add('tree-data', () => <TreeData />)
  .add('register flow tree', () => <SlefTree />)
  .add('FlowComponent', () => <FlowComponent />)
