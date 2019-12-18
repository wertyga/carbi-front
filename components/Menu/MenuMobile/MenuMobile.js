import { useState, useRef } from 'react';
import { useOnClickOutside } from 'hooks';
import { Segment } from 'semantic-ui-react';
import { ButterMenu } from 'components/UI/ButterMenu/ButterMenu';
import { MenuMobileContent } from './MenuMobileContent/MenuMobileContent';
import { MenuUser } from '../MenuUser/MenuUser';

import './style.scss';

export const MenuMobile = () => {
  const mainRef = useRef();

  const [isOpen, setOpen] = useState(false);

  const handleOpenToggle = () => setOpen(!isOpen);
  const closeMenu = () => setOpen(false);

  useOnClickOutside(mainRef, closeMenu);

  return (
    <Segment className="menu-mobile" ref={mainRef}>
      <ButterMenu
        open={isOpen}
        onClick={handleOpenToggle}
        menu={<MenuMobileContent opened={isOpen} onItemClick={closeMenu}/>}
      />
      <MenuUser />
    </Segment>
  );
};