import { useRef } from 'react';
import _noop from 'lodash/noop';

import { useOnClickOutside } from 'hooks';

import './style.scss';

export const UISidebar = ({ children, visible, onClose, className }) => {
  const sidebarRef = useRef();

  useOnClickOutside(sidebarRef, onClose);

  return (
    <div className={classnames('ui-sidebar', className, { visible })} ref={sidebarRef}>
      {children}
    </div>
  );
};

UISidebar.defaultProps = {
  onClose: _noop,
};