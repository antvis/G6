import { Extensions, IG6GraphEvent } from '../../src';
import { getPlugin, getPlugins, register } from '../../src/plugin/register';

class CustomBehavior extends Extensions.BaseBehavior {
  getEvents(): { [eventName: string]: (event: IG6GraphEvent) => void } {
    throw new Error('Method not implemented.');
  }
}

class NewCustomBehavior extends Extensions.BaseBehavior {
  getEvents(): { [eventName: string]: (event: IG6GraphEvent) => void } {
    throw new Error('Method not implemented.');
  }
}

const category = 'behavior';
const type = 'customBehavior';

describe('Plugin Registration', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe('register and getPlugin function', () => {
    it('should register a new plugin', () => {
      register(category, type, CustomBehavior);
      const registeredPlugin = getPlugin(category, type);
      expect(registeredPlugin).toEqual(CustomBehavior);
    });

    it('should overwrite an existing plugin and warn', () => {
      register(category, type, CustomBehavior);
      register(category, type, NewCustomBehavior);
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('registered'));
      const registeredPlugin = getPlugin(category, type);
      expect(registeredPlugin).toEqual(NewCustomBehavior);
    });
  });

  describe('getPlugins function', () => {
    it('should retrieve all plugins for a given category', () => {
      register(category, type, CustomBehavior);
      const plugins = getPlugins(category);
      expect(plugins[type]).toBe(CustomBehavior);
    });
  });
});
