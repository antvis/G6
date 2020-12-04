import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

export default {
  title: 'Button',
  decorators: [withKnobs],
};
// const passions = array('Passions', ['Fishing', 'Skiing']);

export const withText = () => {
  const passions = text('Name', 'aaa');
  return <div>{passions}</div>;
};

// export const withEmoji = () => (
//   <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
// );

// Knobs for React props
export const withAButton = () => (
  <button disabled={boolean('Disabled', false)}>{text('Label', 'Hello Storybook')}</button>
);

// Knobs as dynamic variables.
export const asDynamicVariables = () => {
  const name = text('Name', 'Arunoda Susiripala');
  const age = number('Age', 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return <div>{content}</div>;
};
