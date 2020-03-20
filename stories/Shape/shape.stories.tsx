// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DefaultShape from './component/default-shape';
import Image from './component/image';
import CustomNode from './component/custom-node';
import Polyline from './component/polyline';

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
.add('custom node', () => (
  <CustomNode />
))
.add('polyline', () => (
  <Polyline />
))
