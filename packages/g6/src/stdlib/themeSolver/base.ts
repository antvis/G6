import { ThemeSpecification } from '../../types/theme';

interface ThemeSolverOptions {};
export default abstract class BaseThemeSolver {
  protected specification: ThemeSpecification;
  protected options: ThemeSolverOptions;
  constructor(options: ThemeSolverOptions) {
    this.specification = this.solver(options);
  }
  abstract solver(options: ThemeSolverOptions): ThemeSpecification;
  public getSpecification: () => ThemeSpecification = () => {
    return this.specification;
  };
  public destroy() { }
}
