import { storiesOf } from '@storybook/react';
import React from 'react';
import Hull from './component/hull';
import InteractiveHull from './component/interactiveHull';

export default { title: 'Hull' };

storiesOf('Hull', module)
  .add('Hull', () => (
    <Hull />
  ))
  .add('Interactive hull', () => (
    <InteractiveHull />
  ))
