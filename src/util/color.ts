import color from 'color';
import { generate } from '@ant-design/colors';

/**
 * get the mix color of backColor and frontColor with alpah
 * @param backColor background color
 * @param frontColor foreground color
 * @param frontAlpha the opacity of foreground color
 */
export const mixColor = (backColor, frontColor, frontAlpha) => {
  const bc = color(backColor);
  const fc = color(frontColor);
  return color([
    (1 - frontAlpha) * bc.color[0] + frontAlpha * fc.color[0],
    (1 - frontAlpha) * bc.color[1] + frontAlpha * fc.color[1],
    (1 - frontAlpha) * bc.color[2] + frontAlpha * fc.color[2],
  ]).rgb();
}

/**
 * get the set of colors according to the subject color and background color
 * @param subjectColor the subject color
 * @param backColor background color
 * @param disableColor the color for disable state
 */
export const getColorsWithSubjectColor = (subjectColor, backColor = '#fff', theme: 'default' | 'dark' = 'default', disableColor = 'rgb(150, 150, 150)') => {
  const lightSubject = mixColor(backColor, subjectColor, 0.05).rgb().toString();

  const lightestDisable = mixColor(backColor, disableColor, 0.02).rgb().toString();
  const lightDisable = mixColor(backColor, disableColor, 0.05).rgb().toString();
  const middleDisable = mixColor(backColor, disableColor, 0.1).rgb().toString();
  const deepDisable = mixColor(backColor, disableColor, 0.2).rgb().toString();
  const deepestDisable = mixColor(backColor, disableColor, 0.3).rgb().toString();

  const paletteFromSubject = generate(subjectColor, { theme, backgroundColor: backColor });
  const subjectHex = color(subjectColor).hex().toLowerCase();
  const subjectIdx = paletteFromSubject.indexOf(subjectHex);
  let deeperSubject = subjectColor;
  if (subjectIdx !== -1) {
    deeperSubject = paletteFromSubject[subjectIdx + 1];
  }
  return {
    // for nodes
    mainStroke: subjectColor,
    mainFill: mixColor(backColor, subjectColor, 0.1).rgb().toString(),

    activeStroke: subjectColor,
    activeFill: lightSubject,

    inactiveStroke: mixColor(backColor, subjectColor, 0.4).rgb().toString(),
    inactiveFill: lightSubject,

    selectedStroke: subjectColor,
    selectedFill: backColor,

    highlightStroke: deeperSubject,
    highlightFill: mixColor(backColor, subjectColor, 0.2).rgb().toString(),

    disableStroke: deepestDisable,
    disableFill: lightDisable,

    // for edges
    edgeMainStroke: deepestDisable,
    edgeActiveStroke: subjectColor,
    edgeInactiveStroke: deepDisable,
    edgeSelectedStroke: subjectColor,
    edgeHighlightStroke: subjectColor,
    edgeDisableStroke: middleDisable,

    // for combos
    comboMainStroke: deepestDisable,
    comboMainFill: lightestDisable,

    comboActiveStroke: subjectColor,
    comboActiveFill: lightSubject,

    comboInactiveStroke: deepestDisable,
    comboInactiveFill: lightestDisable,

    comboSelectedStroke: subjectColor,
    comboSelectedFill: lightestDisable,

    comboHighlightStroke: deeperSubject, // 'rgb(53, 119, 222)', // TODO: how to generate it ???
    comboHighlightFill: lightestDisable,

    comboDisableStroke: deepDisable,
    comboDisableFill: lightDisable,

  }
}