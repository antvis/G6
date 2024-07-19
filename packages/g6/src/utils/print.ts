/* global console */
/* eslint no-console: "off" */
import { version } from '../version';

const BRAND = 'G6';

/**
 * <zh/> 格式化打印
 *
 * <en/> Format print
 * @param message - <zh/> 消息 | <en/> Message
 * @returns <zh/> 格式化后的消息 | <en/> Formatted message
 */
export function format(message: string) {
  return `[${BRAND} v${version}] ${message}`;
}

export const print = {
  mute: false,
  debug: (message: string): void => {
    !print.mute && console.debug(format(message));
  },
  info: (message: string): void => {
    !print.mute && console.info(format(message));
  },
  warn: (message: string): void => {
    !print.mute && console.warn(format(message));
  },
  error: (message: string): void => {
    !print.mute && console.error(format(message));
  },
};
