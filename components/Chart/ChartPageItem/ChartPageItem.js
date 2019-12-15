import { useState, useEffect } from 'react';

import shortId from 'short-id';

import { addChart, updateChart } from 'redux/actions';
import { Loader } from 'components/UI/Loader/Loader';

import { MarketsPairsWrapper } from 'components/MarketsPairs/MarketsPairsWrapper/MarketsPairsWrapper';
import { ChartListDesktop } from '../ChartListDesktop/ChartListDesktop';
import { useSelector, useDispatch } from 'react-redux';
import { deleteChartAction } from 'redux/actions';
import { gfCharts } from 'goldfish';
import storeSelector from './selectors';
import { ChartItself } from '../ChartItself/ChartItself';

import './style.scss';

export const ChartPageItem = ({ className }) => {
  const dispatch = useDispatch();
  const { chartsStore = [], prices, isMobile, token } = useSelector(storeSelector);

  const [state, setState] = useState({
    loading: false,
    isMenuVisible: false,
    chosenMarkets: [],
    chosenPair: '',
    editableChartId: '',
    isPairsOpen: false,
  });

  useEffect(() => {
    if (!isMenuVisible) clearMenuData();
  }, [state.isMenuVisible]);

  const handleMarketCheck = (market) => {
    const { chosenMarkets } = state;
    const isExistInList = chosenMarkets.includes(market);
    if (isExistInList) {
      setState({
        ...state,
        chosenMarkets: chosenMarkets.filter(item => item !== market),
      });
    } else {
      setState({
        ...state,
        chosenMarkets: [...chosenMarkets, market],
      });
    }
  };

  const handlePairCheck = pair => {
    setState({
      ...state,
      chosenPair: state.chosenPair === pair ? '' : pair,
    });
  };
  const handlePairsClose = () => setState({ ...state, isPairsOpen: false });
  const handlePairsOpen = () => setState({ ...state, isPairsOpen: true });
    const handleShowNewClose = () => setState({ ...state, isMenuVisible: false });

  const handleShowNewToggle = () => {
    setState({
      ...state,
      editableChartId: '',
      chosenMarkets: [],
      chosenPair: '',
      isMenuVisible: !state.isMenuVisible,
    });
  };


  const clearMenuData = () => {
    setState({
      ...state,
      editableChartId: '',
      chosenMarkets: [],
      chosenPair: '',
      isMenuVisible: false,
      isPairsOpen: false,
    });
  };

  const handleDeleteChart = chartId => () => {
    dispatch(deleteChartAction(chartId));
  };
  const handleEditChart = chartId => () => {
    const chart = chartsStore.find(item => item.chartId === chartId);
    if (!chart) return;

    setState({
      ...state,
      editableChartId: chartId,
      chosenMarkets: chart.markets,
      chosenPair: chart.pair,
      isMenuVisible: true,
    });
  };

  const onSubmit = async () => {
    const { editableChartId, chosenMarkets, chosenPair } = state;

    const marketsPairs = {
      chartId: editableChartId || shortId.generate(),
      markets: chosenMarkets,
      pair: chosenPair,
    };

    setState({ ...state, loading: true });

    editableChartId ?
      await updateChart({ dispatch, marketsPairs, prices, token }) :
      await addChart({ dispatch, marketsPairs, prices, token });

    setState({ ...state, loading: false });

    clearMenuData();
  };

  const { isMenuVisible, chosenMarkets, chosenPair, isPairsOpen, editableChartId, loading } = state;

  return (
    <div className={classnames('chart-page-item', className)}>
      {loading && <Loader />}

      {isMobile &&
        <button className="chart-page__show-new" onClick={handleShowNewToggle}>{gfCharts.addNewChart.en}</button>
      }

      <MarketsPairsWrapper
        visible={isMenuVisible}
        chosenMarkets={chosenMarkets}
        chosenPair={chosenPair}
        onSubmit={onSubmit}
        handleMarketCheck={handleMarketCheck}
        handlePairsOpen={handlePairsOpen}
        isPairsOpen={isPairsOpen}
        handlePairCheck={handlePairCheck}
        handlePairsClose={handlePairsClose}
        onClose={handleShowNewClose}
        editableChartId={editableChartId}
        clearMenuData={clearMenuData}
    />

      {!!isMobile && chartsStore.map((item, i) => (
        <div
          className="chart-page-item__elem"
          key={item.chartId}
        >
          <ChartItself
            handleDelete={handleDeleteChart(item.chartId)}
            handleEdit={handleEditChart(item.chartId)}
            {...item}
          />
        </div>
      ))}

      {!isMobile &&
        <ChartListDesktop
          handleDelete={handleDeleteChart}
          handleEdit={handleEditChart}
          clearMenuData={clearMenuData}
        />
      }
    </div>
  );
};