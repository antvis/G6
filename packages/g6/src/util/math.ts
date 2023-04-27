/**
 * Whether the value is begween the range of [min, max]
 * @param   {number}       value  the value to be judged
 * @param   {number}       min    the min of the range
 * @param   {number}       max    the max of the range
 * @return  {boolean}      bool   the result boolean
 */
export const isBetween = (value: number, min: number, max: number) =>
  value >= min && value <= max;
