import { gfMenu } from 'goldfish';
import { MarketsMenu } from '../MarketsMenu/MarketsMenu';
import { PairsMenu } from '../PairsMenu/PairsMenu';

import './style.scss';

export const MenuMarketsPairsDesktop = ({
                                          markets, handleMarketCheck,
                                          chosenPair, pairs,
                                          handlePairCheck, handlePairsClose, onSubmit,
                                          editableChartId, clearMenuData, chosenMarkets,
                                        }) => {
  return (
    <div className="markets-pairs-wrapper-desktop">
      <MarketsMenu
        list={markets}
        onItemChange={handleMarketCheck}
        header={gfMenu.markets.en}
      />

      {chosenMarkets.length > 1 &&
        <PairsMenu
          pairs={pairs}
          chosenPair={chosenPair}
          handleCheck={handlePairCheck}
          onClose={handlePairsClose}
          onSubmit={onSubmit}
          editableChartId={editableChartId}
          clearMenuData={clearMenuData}
        />
      }

    </div>
  );
};