// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import LargeGraph from './component/large-graph';

export default { title: 'Large Graph' };

storiesOf('LargeGraph', module)
  .add('large graph 1', () => (
    // 一个 add 表示添加一个 story
    <LargeGraph />
  ))
