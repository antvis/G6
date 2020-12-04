// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Fruchterman from './component/fruchterman';

export default { title: 'Label' };

storiesOf('Label', module)
  .add('node label rotate', () => (
    // 一个 add 表示添加一个 story
    <Fruchterman />
  ))
