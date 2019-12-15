import Link from 'next/link';
import _noop from 'lodash/noop';
import { Card } from 'semantic-ui-react';
import { gfMenu } from 'goldfish';

import './style.scss';

export const MenuMobileContent = ({ opened, onItemClick }) => {
  const handleClick = () => {
    onItemClick()
  };

  return (
    <Card className={classnames('menu-mobile-content', { opened })}>
      <Card.Content>
        {gfMenu.fistLevelMenu.map(({ name, href }) => (
          <Link key={href} href={href}>
            <a className="menu-mobile-content__item" onClick={handleClick}>
              {name.en}
            </a>
          </Link>
        ))}
      </Card.Content>
    </Card>
  );
};

MenuMobileContent.defaultProps = {
  onItemClick: _noop,
};
