/**
 * Get random number(0 - 1) generator, with deterministic random number.
 * @returns Random number
 */
export function createDeterministicRandom() {
  let i = 0;
  return () => {
    i++;
    return (Math.E * i) % 1;
  };
}
