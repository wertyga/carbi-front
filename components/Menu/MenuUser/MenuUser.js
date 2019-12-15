import { Icon, Menu } from 'semantic-ui-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { gfMenu } from 'goldfish';
import storeSelector from './selectors';

import './style.scss';

export const MenuUser = () => {
  const { userStore, cookiesStore } = useSelector(storeSelector);

  const isUserLogged = cookiesStore.token;
  return (
    <Menu.Menu className="menu-user" position="right">

      <Menu.Item>
        <Link href="/user/sign-in">
          <a className="menu-user__item">{gfMenu.signin.en}</a>
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
