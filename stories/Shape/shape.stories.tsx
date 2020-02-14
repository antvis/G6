// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DefaultShape from './component/default-shape';

export default { title: 'Shape' };

storiesOf('Shape', module)
  .add('default node', () => (
    // 一个 add 表示添加一个 story
    <DefaultShape />
  ))
  .add('with some emoji', () => (
    // 这里是另一个 story
    <span>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </span>
  ));
