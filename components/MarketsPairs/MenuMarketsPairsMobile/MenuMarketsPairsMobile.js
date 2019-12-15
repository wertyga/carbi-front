import { useRef } from 'react';

import { Icon } from 'semantic-ui-react';
import { gfMenu } from 'goldfish';
import { MarketsMenu } from '../MarketsMenu/MarketsMenu';
import { PairsMenu } from '../PairsMenu/PairsMenu';

import { UISidebar } from 'components/UI';

import './style.scss';

export const MenuMarketsPairsMobile = ({
  markets, handleMarketCheck, handlePairsOpen,
                                         isPairsOpen, visible, onClose, chosenPair, handlePairCheck,
                                         handlePairsClose, editableChartId, clearMenuData, onSubmit,
  pairs,
                                       }) => {
  const chosenMarkets = markets.filter(({ checked }) => !!checked);

  return (
    <UISidebar
      visible={visible}
      onClose={onClose}
    >

      <MarketsMenu
        list={markets}
        chosenList={chosenMarkets}
        onItemChange={handleMarketCheck}
        isMobile
        icon={chosenMarkets.length > 1 && <Icon name="angle right" size="large" onClick={handlePairsOpen} />}
        header={gfMenu.markets.en}
      />

      <UISidebar
        visible={isPairsOpen}
        className="markets-pairs-wrapper__pairs-content"
      >
        <PairsMenu
          pairs={pairs}
          chosenPair={chosenPair}
          handleCheck={handlePairCheck}
          onClose={handlePairsClose}
          onSubmit={onSubmit}
          editableChartId={editableChartId}
          clearMenuData={clearMenuData}
          isMobile
        />
      </UISidebar>

    </UISidebar>
  );
};