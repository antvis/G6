import { EventAttrs } from '../Register/event';
import React from 'react';

interface GroupProps {
  /**
   * @description.en-US The unique id of this group
   * @description.zh-CN 唯一id
   */
  id?: string;
  /**
   * @description.en-US The name of the shape which can be not unique.
   * @description.zh-CN 图形名字，可以不唯一
   */
  name?: string;
  /**
   * @description.en-US Whether the group/shape is visible
   * @description.zh-CN 图形/组是否可见
   */
  visible?: boolean;
  /**
   * @description.en-US Whether the group is capturable
   * @description.zh-CN 图形/组是否捕捉事件
   */
  capture?: boolean;
  /**
   * @description.en-US Whether the group is allowed to response dragstart, drag, and dragend events.
   * @description.zh-CN 图形/组是否响应拖拽事件
   */
  draggable?: boolean;
  /**
   * @description.en-US The visual layer index of the group
   * @description.zh-CN 图形/组的层级
   */
  zIndex?: number;
}

export type CommonProps = GroupProps & EventAttrs;

const Group: React.FC<GroupProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <div
      data-attr={{
        ...rest,
        type: 'group',
      }}
    >
      {children}
    </div>
  );
};

export default Group;
