// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import MoveViewPort from './component/view-port';

export default { title: 'Interaction' };

storiesOf('Interaction', module).add('move view port', () => (
  // 一个 add 表示添加一个 story
  <MoveViewPort />
));
