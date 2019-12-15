import { useState, useRef } from 'react';
import { useOnClickOutside } from 'hooks';
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
    <div className="menu-mobile" ref={mainRef}>
      <ButterMenu
        open={isOpen}
        onClick={handleOpenToggle}
        menu={<MenuMobileContent opened={isOpen} onItemClick={closeMenu}/>}
      />
      <MenuUser />
    </div>
  );
};