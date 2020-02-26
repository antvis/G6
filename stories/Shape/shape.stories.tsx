// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DefaultShape from './component/default-shape';
<<<<<<< HEAD
import Image from './component/image';
=======
import CustomNode from './component/custom-node';
>>>>>>> test: svg custom group

export default { title: 'Shape' };

storiesOf('Shape', module)
<<<<<<< HEAD
.add('default node', () => (
  // 一个 add 表示添加一个 story
  <DefaultShape />
))
.add('image node', () => (
  // 一个 add 表示添加一个 story
  <Image />
))
=======
  .add('default node', () => (
    <DefaultShape />
  ))
  .add('custom node', () => (
    <CustomNode />
  ))
>>>>>>> test: svg custom group
