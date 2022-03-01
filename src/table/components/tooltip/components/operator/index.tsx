// import { Menu, Dropdown, MenuProps } from 'antd';
import { isEmpty, map } from 'lodash';
import React from 'react';
import {
  TooltipOperatorMenu,
  TooltipOperatorOptions,
} from '@antv/s2';
import { Icon } from '../TooltipIcon';
import './index.less';
import { TOOLTIP_PREFIX_CLS } from '../../../../common'
import { usePrefixCls } from '@gio-design/utils';
interface TooltipOperatorProps extends TooltipOperatorOptions {
  onlyMenu?: boolean;
  // onClick: (...args: unknown[]) => void;
}

/**
 * tooltip menu
 *  - UI
 *  - actions
 *    delay 300ms show
 */

export const TooltipOperator = (props: TooltipOperatorProps) => {
  const { menus, onlyMenu, onClick: onMenuClick } = props;
  const tooltipPrefixCls = usePrefixCls(TOOLTIP_PREFIX_CLS);

  const renderTitle = (menu: TooltipOperatorMenu) => {
    return (
      <span onClick={menu.onClick}>
        <Icon
          icon={menu.icon}
          className={`${tooltipPrefixCls}-operator-icon`}
        />
        {menu.text}
      </span>
    );
  };

  const renderMenu = (menu: TooltipOperatorMenu) => {
    const { key, text, children, onClick } = menu;

    // if (!isEmpty(children)) {
    //   return (
    //     <Menu.SubMenu
    //       title={renderTitle(menu)}
    //       key={key}
    //       popupClassName={`${TOOLTIP_PREFIX_CLS}-operator-submenu-popup`}
    //       onTitleClick={onClick}
    //     >
    //       {map(children, (subMenu: TooltipOperatorMenu) => renderMenu(subMenu))}
    //     </Menu.SubMenu>
    //   );
    // }

    return (
      <li title={text} key={key}>
        {renderTitle(menu)}
      </li>
    );
  };

  const renderMenus = () => {
    if (onlyMenu) {
      return (
        <ul
          className={`${tooltipPrefixCls}-operator-menus`}
          onClick={onMenuClick}
        >
          {map(menus, (subMenu: TooltipOperatorMenu) => renderMenu(subMenu))}
        </ul>
      );
    }

    return <></>
  };

  if (isEmpty(menus)) {
    return null;
  }
  return <div className={`${tooltipPrefixCls}-operator`}>{renderMenus()}</div>

};
