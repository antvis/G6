// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import MoveTo from './component/moveTo';

export default { title: 'Translate' };

storiesOf('Translate', module)
.add('MoveTo', () => (
  <MoveTo />
))