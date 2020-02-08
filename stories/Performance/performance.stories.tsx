import { storiesOf } from '@storybook/react';
import React from 'react';
import NodeAmount from './component/node-amount'
import Erdos from './component/erdos'
import NetScience from './component/netscience'
import Eva from './component/eva'
import RtOccupy from './component/rt-occupy'
import ComplexTree from './component/complex-tree'

export default { title: 'Performance' };


storiesOf('Performance', module)
  .add('with large amount of nodes', () => (  // 一个 add 表示添加一个 story
    <NodeAmount />
  ))
  .add('net science data', () => (  // 一个 add 表示添加一个 story
    <NetScience />
  ))
  .add('erdos data', () => (  // 一个 add 表示添加一个 story
    <Erdos />
  ))
  .add('eva data', () => (  // 一个 add 表示添加一个 story
    <Eva />
  ))
  .add('rt occupy data', () => (  // 一个 add 表示添加一个 story
    <RtOccupy />
  ))
  .add('complex tree', () => (  // 一个 add 表示添加一个 story
    <ComplexTree />
  )) 