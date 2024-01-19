import { Label } from '../../../src/shape';
import { createGCanvas } from '../../integration/utils/createGCanvas';
import { TestCaseContext } from '../interface';

export default ({ container, renderer, width, height }: Required<TestCaseContext>) => {
  const canvas = createGCanvas({ container, renderer, width, height });

  canvas.appendChild(
    new Label({
      style: {
        labelText: 'Label Text',
        x: 10,
        y: 10,
        labelTextBaseline: 'top',
        backgroundFill: '#eaebed',
      },
    }),
  );

  canvas.appendChild(
    new Label({
      style: {
        labelText: 'Label Text',
        x: 100,
        y: 10,
        fill: '#e36209',
        labelTextBaseline: 'top',
        padding: [5, 10],
        backgroundRadius: 5,
        backgroundFill: '#fff1e4',
      },
    }),
  );

  const updateLabel = canvas.appendChild(
    new Label({
      style: {
        labelText: 'Label Text',
        x: 200,
        y: 10,
        labelTextBaseline: 'top',
        backgroundFill: '#eaebed',
      },
    }),
  );

  setTimeout(() => {
    updateLabel.update({
      labelText: 'Update Label Text',
      backgroundFill: '#e45454',
    });
  }, 200);

  const animateLabel = canvas.appendChild(
    new Label({
      style: {
        labelText: 'Label Text',
        x: 350,
        y: 10,
        labelTextBaseline: 'top',
        backgroundFill: '#eaebed',
      },
    }),
  );

  setTimeout(() => {
    const result = animateLabel.animate(
      [
        {
          x: 350,
          labelFill: '#000000',
          backgroundFill: '#eaebed',
        },
        {
          x: 400,
          labelFill: '#e45454',
          backgroundFill: '#fce9e9',
        },
      ],
      {
        duration: 1000,
        easing: 'easeLinear',
        fill: 'both',
      },
    );

    setTimeout(() => {
      result?.cancel();

      setTimeout(() => {
        if (result) result.currentTime = 1000;
      }, 200);
    }, 500);
  }, 16);

  canvas.appendChild(
    new Label({
      style: {
        labelText: 'Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text...',
        x: 10,
        y: 45,
        labelWordWrap: true,
        labelMaxLines: 1,
        labelWordWrapWidth: 200,
        labelTextOverflow: '...',
        labelTextBaseline: 'top',
        backgroundFill: '#eaebed',
      },
    }),
  );

  canvas.appendChild(
    new Label({
      style: {
        labelText: 'Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text...',
        x: 10,
        y: 100,
        fill: '#e45454',
        labelWordWrap: true,
        labelMaxLines: 2,
        cursor: 'pointer',
        labelWordWrapWidth: 250,
        labelTextOverflow: '...',
        labelTextBaseline: 'middle',
        backgroundFill: '#fce9e9',
        backgroundLineCap: 'butt',
        backgroundLineDash: [5, 5],
        backgroundStroke: '#e45454',
      },
    }),
  );
};
