import { Button, Icon } from 'semantic-ui-react';

import { MarketsMenu } from 'components/MarketsPairs/MarketsMenu/MarketsMenu';

import { gfMenu, gfCommon } from 'goldfish/index';

import './style.scss';

export const PairsMenu = ({
                            pairs, onClose,
                            handleCheck, onSubmit, isMobile,
                            editableChartId, clearMenuData,
                          }) => {
  const isHaveChosenPair = pairs.find(({ checked }) => !!checked);
  return (
    <div className="pairs-menu">
      <MarketsMenu
        list={pairs}
        onItemChange={handleCheck}
        emptyText={gfMenu.emptyPairs.en}
        isMobile={isMobile}
        header={gfMenu.pairs.en}
        icon={isMobile && <Icon name="close" onClick={onClose} size="large" />}
      />
      {isHaveChosenPair &&
        <div className="pairs-menu__footer">
          <Button
            primary
            onClick={onSubmit}
          >
            {editableChartId ? gfMenu.updateChart.en : gfMenu.getCharts.en}
          </Button>
          {/*{editableChartId &&*/}
            {/*<Button*/}
              {/*primary*/}
              {/*onClick={clearMenuData}*/}
              {/*color="red"*/}
            {/*>*/}
              {/*{gfCommon.clear.en}*/}
            {/*</Button>*/}
          {/*}*/}
        </div>
      }
    </div>
  );
};
