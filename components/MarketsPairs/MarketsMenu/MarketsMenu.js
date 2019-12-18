import { Menu, Segment } from 'semantic-ui-react';
import { MenuItem } from '../../Menu/MenuItem/MenuItem';

import './style.scss';

export const MarketsMenu = ({ list = [], onItemChange, header, icon, emptyText }) => {
  return (
  <Segment className="main-menu-markets">
    <Menu
      vertical
      secondary
      pointing
    >
      <Menu.Item className="main-menu-markets__header">
        <Menu.Header>{header}</Menu.Header>
        {icon}
      </Menu.Item>

      {!list.length && <Menu.Item>{emptyText}</Menu.Item>}

      {list.map(({ name, checked, disabled }) => (
        <MenuItem
          key={name}
          name={name}
          checked={checked}
          onItemChange={onItemChange}
          disabled={disabled}
        />
      ))}

    </Menu>
  </Segment>
  );
};
