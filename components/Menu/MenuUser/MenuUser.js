import { Icon, Menu } from 'semantic-ui-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { gfMenu } from 'goldfish';
import storeSelector from './selectors';

import './style.scss';

export const MenuUser = ({ active }) => {
  const { username } = useSelector(storeSelector);

  const isUserLogged = !!username;
  return (
    <Menu.Menu className="menu-user" position="right">

      <Menu.Item active={active}>
        <Link href="/user/sign-in">
          <a className="menu-user__item">{username || gfMenu.signin.en}</a>
        </Link>

        <Link href="/user/profile">
          {!isUserLogged ?
            <Icon name="user outline" size="large" /> :
            <Icon name="user" size="large" />
          }
        </Link>
      </Menu.Item>

    </Menu.Menu>
  );
};
