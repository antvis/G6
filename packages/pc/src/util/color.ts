import color from 'color';
import { generate } from '@ant-design/colors';

/**
 * get the mix color of backColor and frontColor with alpha
 * @param backColor background color
 * @param frontColor foreground color
 * @param frontAlpha the opacity of foreground color
 */
export const mixColor = (backColor, frontColor, frontAlpha) => {
  const bc = color(backColor);
  const fc = color(frontColor);
  return color([
    (1 - frontAlpha) * bc.red() + frontAlpha * fc.red(),
    (1 - frontAlpha) * bc.green() + frontAlpha * fc.green(),
    (1 - frontAlpha) * bc.blue() + frontAlpha * fc.blue(),
  ]).rgb();
};

const getColorsWithDefaultTheme = (
  subjectColor,
  backColor = '#fff',
  disableColor = 'rgb(150, 150, 150)',
) => {
  const subjectColor005 = mixColor(backColor, subjectColor, 0.05).rgb().toString();
  const subjectColor01 = mixColor(backColor, subjectColor, 0.1).rgb().toString();
  const subjectColor02 = mixColor(backColor, subjectColor, 0.2).rgb().toString();
  const subjectColor04 = mixColor(backColor, subjectColor, 0.4).rgb().toString();

  const disableColor002 = mixColor(backColor, disableColor, 0.02).rgb().toString();
  const disableColor005 = mixColor(backColor, disableColor, 0.05).rgb().toString();
  const disableColor01 = mixColor(backColor, disableColor, 0.1).rgb().toString();
  const disableColor02 = mixColor(backColor, disableColor, 0.2).rgb().toString();
  const disableColor03 = mixColor(backColor, disableColor, 0.3).rgb().toString();

  const paletteFromSubject = generate(subjectColor, {
    theme: 'default',
    backgroundColor: backColor,
  });
  const subjectHex = color(subjectColor).hex().toLowerCase();
  const subjectIdx = paletteFromSubject.indexOf(subjectHex);
  let deeperSubject = subjectColor;
  if (subjectIdx !== -1) {
    deeperSubject = paletteFromSubject[subjectIdx + 1];
  }
  return {
    // for nodes
    mainStroke: subjectColor,
    mainFill: subjectColor01,

    activeStroke: subjectColor,
    activeFill: subjectColor005,

    inactiveStroke: subjectColor04,
    inactiveFill: subjectColor005,

    selectedStroke: subjectColor,
    selectedFill: backColor,

    highlightStroke: deeperSubject,
    highlightFill: subjectColor02,

    disableStroke: disableColor03,
    disableFill: disableColor005,

    // for edges
    edgeMainStroke: disableColor03,
    edgeActiveStroke: subjectColor,
    edgeInactiveStroke: disableColor02,
    edgeSelectedStroke: subjectColor,
    edgeHighlightStroke: subjectColor,
    edgeDisableStroke: disableColor01,

    // for combos
    comboMainStroke: disableColor03,
    comboMainFill: disableColor002,

    comboActiveStroke: subjectColor,
    comboActiveFill: subjectColor005,

    comboInactiveStroke: disableColor03,
    comboInactiveFill: disableColor002,

    comboSelectedStroke: subjectColor,
    comboSelectedFill: disableColor002,

    comboHighlightStroke: deeperSubject, // 'rgb(53, 119, 222)', // TODO: how to generate it ???
    comboHighlightFill: disableColor002,

    comboDisableStroke: disableColor02,
    comboDisableFill: disableColor005,
  };
};

const getColorsWithDarkTheme = (subjectColor, backColor = '#fff', disableColor = '#777') => {
  const subjectColor02 = mixColor(backColor, subjectColor, 0.2).rgb().toString();
  const subjectColor03 = mixColor(backColor, subjectColor, 0.3).rgb().toString();
  const subjectColor06 = mixColor(backColor, subjectColor, 0.6).rgb().toString();
  const subjectColor08 = mixColor(backColor, subjectColor, 0.8).rgb().toString();

  const disableColor02 = mixColor(backColor, disableColor, 0.2).rgb().toString();
  const disableColor025 = mixColor(backColor, disableColor, 0.25).rgb().toString();
  const disableColor03 = mixColor(backColor, disableColor, 0.3).rgb().toString();
  const disableColor04 = mixColor(backColor, disableColor, 0.4).rgb().toString();
  const disableColor05 = mixColor(backColor, disableColor, 0.5).rgb().toString();

  const paletteFromSubject = generate(subjectColor, { theme: 'dark', backgroundColor: backColor });
  const subjectHex = color(subjectColor).hex().toLowerCase();
  const subjectIdx = paletteFromSubject.indexOf(subjectHex);
  let deeperSubject = subjectColor;
  if (subjectIdx !== -1) {
    deeperSubject = paletteFromSubject[subjectIdx + 1];
  }
  return {
    // for nodes
    mainStroke: subjectColor08,
    mainFill: subjectColor02,

    activeStroke: subjectColor,
    activeFill: subjectColor03,

    inactiveStroke: subjectColor08,
    inactiveFill: subjectColor02,

    selectedStroke: subjectColor,
    selectedFill: subjectColor02,

    highlightStroke: subjectColor,
    highlightFill: subjectColor06,

    disableStroke: disableColor05,
    disableFill: disableColor025,

    // for edges
    edgeMainStroke: disableColor,
    edgeActiveStroke: subjectColor,
    edgeInactiveStroke: disableColor,
    edgeSelectedStroke: subjectColor,
    edgeHighlightStroke: subjectColor,
    edgeDisableStroke: disableColor03,

    // for combos
    comboMainStroke: disableColor04,
    comboMainFill: disableColor025,

    comboActiveStroke: subjectColor,
    comboActiveFill: disableColor02,

    comboInactiveStroke: disableColor04,
    comboInactiveFill: disableColor025,

    comboSelectedStroke: subjectColor,
    comboSelectedFill: disableColor02,

    comboHighlightStroke: deeperSubject, // 'rgb(53, 119, 222)', // TODO: how to generate it ???
    comboHighlightFill: disableColor025,

    comboDisableStroke: disableColor04,
    comboDisableFill: disableColor02,
  };
};

/**
 * get the set of colors according to the subject color and background color
 * @param subjectColor the subject color
 * @param backColor background color
 * @param disableColor the color for disable state
 */
export const getColorsWithSubjectColor = (
  subjectColor,
  backColor = '#fff',
  theme: 'default' | 'dark' = 'default',
  disableColor = 'rgb(150, 150, 150)',
) => {
  if (theme === 'default')
    return getColorsWithDefaultTheme(subjectColor, backColor, 'rgb(150, 150, 150)');
  return getColorsWithDarkTheme(subjectColor, backColor, '#777');
};

export const getColorSetsBySubjectColors = (
  subjectColors,
  backColor = '#fff',
  theme: 'default' | 'dark' = 'default',
  disableColor = 'rgb(150, 150, 150)',
) => {
  const sets = [];
  subjectColors.forEach((sColor) => {
    sets.push(getColorsWithSubjectColor(sColor, backColor, theme, disableColor));
  });
  return sets;
};
