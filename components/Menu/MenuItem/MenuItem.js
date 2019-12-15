import { Checkbox, Menu } from 'semantic-ui-react';

import './style.scss';

export const MenuItem = ({ name, checked, onItemChange, disabled }) => {
  const onChange = () => !disabled && onItemChange(name);

  return (
    <Menu.Item
      className="main-menu-item"
      onClick={onChange}
      active={checked}
      disabled={disabled}
    >
      <Checkbox
        label={name.toUpperCase()}
        checked={checked}
        disabled={disabled}
      />
    </Menu.Item>
  );
};