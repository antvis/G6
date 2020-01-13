// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import NodeAmount from './component/node-amount'

export default { title: 'Performance' };


storiesOf('Performance', module)
  .add('with large amount of nodes', () => (  // 一个 add 表示添加一个 story
    <NodeAmount />
  ))