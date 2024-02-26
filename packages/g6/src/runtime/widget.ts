import type { CustomWidgetOption, WidgetOptions } from '../spec/widget';
import { ModuleController } from '../utils/module';
import type { BaseWidget } from '../widgets/base-widget';
import type { RuntimeContext } from './types';

export class WidgetController extends ModuleController<BaseWidget<CustomWidgetOption>> {
  public category: 'widget' | 'behavior' = 'widget';

  constructor(context: RuntimeContext) {
    super(context);
    this.setWidgets(this.context.options.widgets || []);
  }

  public setWidgets(widgets: WidgetOptions) {
    this.setModules(widgets);
  }
}
