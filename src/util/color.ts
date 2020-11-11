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

    disableStroke: mixColor(backColor, disableColor, 0.3).rgb().toString(),
    disableFill: mixColor(backColor, disableColor, 0.05).rgb().toString(),

    // for edges
    edgeMainStroke: disableColor,
    edgeActiveStroke: subjectColor,
    edgeInactiveStroke: mixColor(backColor, disableColor, 0.2).rgb().toString(),
    edgeSelectedStroke: subjectColor,
    edgeHighlightStroke: subjectColor,
    edgeDisableStroke: mixColor(backColor, disableColor, 0.1).rgb().toString(),

    // for combos
    comboMainStroke: mixColor(backColor, disableColor, 0.3).rgb().toString(),
    comboMainFill: mixColor(backColor, disableColor, 0.02).rgb().toString(),

    comboActiveStroke: subjectColor,
    comboActiveFill: lightSubject,

    comboInactiveStroke: mixColor(backColor, disableColor, 0.3).rgb().toString(),
    comboInactiveFill: mixColor(backColor, disableColor, 0.02).rgb().toString(),

    comboSelectedStroke: subjectColor,
    comboSelectedFill: mixColor(backColor, disableColor, 0.02).rgb().toString(),

    comboHighlightStroke: deeperSubject, // 'rgb(53, 119, 222)', // TODO: how to generate it ???
    comboHighlightFill: mixColor(backColor, disableColor, 0.02).rgb().toString(),

    comboDisableStroke: mixColor(backColor, disableColor, 0.2).rgb().toString(),
    comboDisableFill: mixColor(backColor, disableColor, 0.05).rgb().toString(),

  }
}