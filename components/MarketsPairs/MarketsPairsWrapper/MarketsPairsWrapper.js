import { useState, useEffect, useRef } from 'react';
import _noop from 'lodash/noop';
import { useSelector } from 'react-redux';

import { MenuMarketsPairsMobile } from '../MenuMarketsPairsMobile/MenuMarketsPairsMobile';
import { MenuMarketsPairsDesktop } from '../MenuMarketsPairsDesktop/MenuMarketsPairsDesktop';

import storeSelector from './selectors';

import { getMarkets, getPairs } from './helpers';

import './style.scss';

export const MarketsPairsWrapper = (props) => {
  const { marketsData, isMobile } = useSelector(storeSelector);

  const markets = getMarkets(marketsData, props.chosenMarkets);
  const pairs = getPairs(marketsData, props.chosenPair, props.chosenMarkets);

  const getmarketsPairsMenu = () => {
    const allProps = {
        ...props,
      markets,
      pairs,
    };
    if (isMobile) return <MenuMarketsPairsMobile {...allProps} />;

    return <MenuMarketsPairsDesktop {...allProps} />;
  };

  return (
    <div className="markets-pairs-wrapper">

      {getmarketsPairsMenu()}

    </div>
  );
};

MarketsPairsWrapper.defaultProps = {
  onClose: _noop,
};
