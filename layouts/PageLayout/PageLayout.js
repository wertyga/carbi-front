import _isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';

import { Segment } from 'semantic-ui-react';
import { Helmet } from 'components/Common/Helmet/Helmet';
import { MenuMobile } from 'components/Menu/MenuMobile/MenuMobile';
import { MenuFirstLevel } from 'components/Menu/MenuFirstLevel/MenuFirstLevel';
import { useSelector } from 'react-redux';
import storeSelector from './selectors';

import './style.scss';

export const PageLayout = ({ children, className, meta = {}, header }) => {
  const { isMobile } = useSelector(storeSelector);

  return (
    <div className={classnames('page-layout', className)}>
      {!_isEmpty(meta) && <Helmet {...meta} />}
      {!isMobile && <MenuFirstLevel />}
      {isMobile && <MenuMobile />}

      <Segment className="page-layout__content">
        {header && <h1>{header}</h1>}
        {children}
      </Segment>
    </div>
  );
};
