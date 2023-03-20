import { ThemeSpecification } from '../../types/theme';

interface ThemeSolverOptions {};
export interface ThemeSpecificationMap {
  [themeName: string]: ThemeSpecification
}
export default abstract class BaseThemeSolver {
  protected specification: ThemeSpecification;
  protected options: ThemeSolverOptions;
  constructor(
    options: ThemeSolverOptions,
    themes: ThemeSpecificationMap) {
    this.specification = this.solver(options, themes);
  }
  abstract solver(options: ThemeSolverOptions, themes: ThemeSpecificationMap): ThemeSpecification;
  public getSpecification: () => ThemeSpecification = () => {
    return this.specification;
  };
  public destroy() { }
}
