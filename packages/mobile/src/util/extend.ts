import { IExtender } from '../interface/extend';

export function getExtender(extenderFn: any): IExtender {
  let extender = extenderFn;
  extender.installed = false;
  return extender;
}
