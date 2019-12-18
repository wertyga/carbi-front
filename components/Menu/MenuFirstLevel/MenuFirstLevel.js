import Link from 'next/link';
import { withRouter } from 'next/router';
import { Menu, Segment } from 'semantic-ui-react';

import { gfMenu } from 'goldfish';

import { MenuUser } from '../MenuUser/MenuUser';

import './style.scss';

export const MenuFirstLevelComponent = ({ router: { pathname } }) => {
  return (
    <Menu className="menu-first-level" stackable pointing>
      <Menu.Item>
        <img src="/static/favicon.png" />
      </Menu.Item>
      {gfMenu.fistLevelMenu.map(({ name, href }) => (
        <Menu.Item key={href} active={pathname === href}>
          <Link href={href} >
            <a className="menu-first-level__item">{name.en}</a>
          </Link>
        </Menu.Item>
      ))}

      <MenuUser active={pathname === '/user/sign-in'} />
    </Menu>
  );
};

export const MenuFirstLevel = withRouter(MenuFirstLevelComponent);