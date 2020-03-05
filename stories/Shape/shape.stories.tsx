// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DefaultShape from './component/default-shape';
import Image from './component/image';

export default { title: 'Shape' };

storiesOf('Shape', module)
.add('default node', () => (
  // 一个 add 表示添加一个 story
  <DefaultShape />
))
.add('image node', () => (
  // 一个 add 表示添加一个 story
  <Image />
))
