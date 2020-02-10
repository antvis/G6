// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DecisionTree from './component/decision-tree';
import CustomFlow from './component/flow'
import Tutorial from './component/tutorial'

export default { title: 'Case' };


storiesOf('Case', module)
  .add('decision tree bubble', () => (  // 一个 add 表示添加一个 story
    <DecisionTree />
  ))
  .add('custom flow', () => (  // 一个 add 表示添加一个 story
    <CustomFlow />
  ))
  .add('tutorial', () => (  // 一个 add 表示添加一个 story
    <Tutorial />
  ))